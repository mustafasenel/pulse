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
import { useEffect, useState } from "react";
import { Category, User } from "@prisma/client";
import axios from "axios";

import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { MdClose } from "react-icons/md";

import { useTheme } from "next-themes";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


interface CoverModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
}

export function CoverModal({ isOpen, onClose, user }: CoverModalProps) {
  const [open, setOpen] = useState(isOpen);
  const [coverImage, setCoverImage] = useState<string>("");

  const router = useRouter();
  const { theme } = useTheme();

  const handleSubmit = () => {
    try {
      axios.post("/api/user/cover-image",
        {data: coverImage}
      ).then(()=> {
        onClose()
        toast.success("CCover image updated successfully")
        setCoverImage("")
        router.refresh()
      })
      
    } catch (error:any) {
      console.error("Error from cover images posted", error)
      toast.error("Error during posted cover image")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Change Cover</DialogTitle>
          <DialogDescription>
            Change your profile cover image.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center w-full space-x-2">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-center rounded-lg">
              {coverImage ? (
                <div className="relative w-full h-full">
                  <HoverCard>
                    <HoverCardTrigger className="absolute top-5 right-5 z-10">
                      <Button
                        variant={"outline"}
                        onClick={() => {
                          setCoverImage("");
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
                    src={coverImage}
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
                    setCoverImage(res[0].url);
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              )}
            </div>
          </div>
          </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="button" variant="default" onClick={handleSubmit}>
            Apply Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
