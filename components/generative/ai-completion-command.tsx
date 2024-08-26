import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { useEditor } from "novel";
import { Check, TextQuote, TrashIcon } from "lucide-react";

const AICompletionCommands = ({
  completion,
  onDiscard,
}: {
  completion: string;
  onDiscard: () => void;
}) => {
  const { editor } = useEditor();

  // Ensure editor is initialized
  if (!editor) {
    return <div>null geldi</div>; // or you can return a loading spinner or some placeholder content
  }

  return (
    <>
      <Command>
        <CommandGroup>
          <CommandList>
            <CommandItem
              className="gap-2 px-4"
              value="replace"
              onSelect={() => {
                const selection = editor.view.state.selection;

                editor
                  .chain()
                  .focus()
                  .insertContentAt(
                    {
                      from: selection.from,
                      to: selection.to,
                    },
                    completion
                  )
                  .run();
              }}
            >
              <Check className="h-4 w-4 text-muted-foreground" />
              Replace selection
            </CommandItem>
            <CommandItem
              className="gap-2 px-4"
              value="insert"
              onSelect={() => {
                const selection = editor.view.state.selection;
                editor
                  .chain()
                  .focus()
                  .insertContentAt(selection.to + 1, completion)
                  .run();
              }}
            >
              <TextQuote className="h-4 w-4 text-muted-foreground" />
              Insert below
            </CommandItem>
          </CommandList>
        </CommandGroup>
        <CommandSeparator />

        <CommandGroup>
          <CommandItem
            onSelect={onDiscard}
            value="thrash"
            className="gap-2 px-4"
          >
            <TrashIcon className="h-4 w-4 text-muted-foreground" />
            Discard
          </CommandItem>
        </CommandGroup>
      </Command>
    </>
  );
};

export default AICompletionCommands;
