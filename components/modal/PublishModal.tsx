"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Category, User } from "@prisma/client";
import axios from "axios";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { CommandEmpty } from "cmdk";
import TopicButton from "@/app/(app)/write/components/TopicButton";
import { useFormContext } from "@/app/context/FormContext";
import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { useTheme } from "next-themes";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
}

export function PublishModal({ isOpen, onClose, user }: PublishModalProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

  const { theme } = useTheme();

  const { triggerFormSubmit, setCategoriesInContext, setThumbnailContext, setSummaryContext } =
    useFormContext();

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/category");
        setCategories(response.data.data);
        setFilteredCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Filter categories based on search input
  const handleSearch = (searchTerm: string) => {
    setFilteredCategories(
      categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleRemoveCategory = (categoryId: string) => {
    setValue(value.filter((id) => id !== categoryId));
    setCategoriesInContext(value.filter((id) => id !== categoryId));
  };

  // Handle category selection
  const handleSelectCategory = (categoryId: string) => {
    if (value.includes(categoryId)) {
      setValue(value.filter((id) => id !== categoryId)); // Remove category if already selected
      setCategoriesInContext(value.filter((id) => id !== categoryId));
    } else if (value.length < 5) {
      setValue([...value, categoryId]); // Add category if not selected and less than 5 selected
      setCategoriesInContext([...value, categoryId]);
    }
    setOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Story Preview</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 w-full space-x-2">
          <div className="flex flex-col space-y-4">
            <Label>Story Thumbnail</Label>
            <div className="flex items-center justify-center w-96 h-96  rounded-lg">
              {thumbnailUrl ? (
                <div className="relative w-full h-full">
                  <HoverCard>
                    <HoverCardTrigger className="absolute top-5 right-5 z-10">
                      <Button
                        variant={"outline"}
                        onClick={() => {
                          setThumbnailUrl("");
                          setThumbnailContext("");
                        }}
                      >
                        <MdClose />
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="text-xs">
                      Remove this thumbnail
                    </HoverCardContent>
                  </HoverCard>
                  <Image
                    src={thumbnailUrl}
                    alt="thumbnail"
                    width={1000}
                    height={1000}
                    objectFit="cover"
                  />
                </div>
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  content={{
                    label: "Upload your thumbnail",
                  }}
                  appearance={{
                    button: {
                      color: theme == "light" ? "#fff" : "#000",
                      background: theme == "light" ? "#000" : "#fff",
                      fontSize: "14px",
                      fontFamily: "Inter",
                    },
                    label: {
                      color: theme == "light" ? "#000" : "#fff",
                      fontFamily: "Inter",
                    },
                    container: {
                      borderColor: theme == "light" ? "#E9E9EC" : "#232326",
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res);
                    setThumbnailUrl(res[0].url);
                    setThumbnailContext(res[0].url);
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-6 pt-8">
            <div className="flex space-x-2">
              <Label className="font-light">Publishing to:</Label>
              <Label className="font-semibold">{user?.username}</Label>
            </div>
            <Label className="font-light text-xs">
              A brief summary highlighting the main points of your story.
            </Label>
            <Textarea className="resize-none" maxLength={100} required cols={3} placeholder="Enter a brief summary of your story..." onChange={(e) => setSummaryContext(e.target.value)}/>
            <Label className="font-light text-xs">
              Add or change topics (up to 5) so readers know what your story is
              about
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between"
                >
                  Add Topic
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search category..."
                    className="h-9"
                    onValueChange={(value) => handleSearch(value)}
                  />
                  <CommandList>
                    <CommandEmpty className="px-2 py-1 text-xs">
                      No category found.
                    </CommandEmpty>
                    <CommandGroup>
                      {filteredCategories.map((category) => (
                        <CommandItem
                          key={category.id}
                          onSelect={() => handleSelectCategory(category.id)}
                          disabled={
                            value.length >= 5 && !value.includes(category.id)
                          }
                        >
                          {category.name}
                          {value.includes(category.id) && (
                            <CheckIcon className="ml-auto h-4 w-4" />
                          )}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <div className="flex flex-wrap gap-2">
              {value.map((categoryId) => {
                const category = categories.find(
                  (cat) => cat.id === categoryId
                );
                return category ? (
                  <TopicButton
                    key={category.id}
                    topic={category.name}
                    onClick={() => handleRemoveCategory(categoryId)}
                  />
                ) : null;
              })}
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="button" variant="default" onClick={triggerFormSubmit}>
            Publish Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
