"use client";
import {
  EditorBubble,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  type JSONContent,
} from "novel";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { Dispatch, forwardRef, SetStateAction, useState } from "react";
import { Separator } from "~/components/ui/separator";
import { NodeSelector } from "./node-selector";
import { LinkSelector } from "./link-selector";
import { TextButtons } from "./text-buttons";
import { ColorSelector } from "./color-selector";
import { slashCommand, suggestionItems } from "./slash-commands";
import { defaultExtensions } from "./extensions";
import { cn } from "~/lib/utils";
import { useDebouncedCallback } from "use-debounce";
const extensions = [...defaultExtensions, slashCommand];
type Props = {
  blog: JSONContent | null;
  className?: string;
  setSaveStatus: Dispatch<SetStateAction<"Saved" | "Unsaved">>;
};

const Editor = forwardRef<EditorInstance | null, Props>(
  ({ blog, className, setSaveStatus }, ref) => {
    const [initialContent, setInitialContent] = useState<
      JSONContent | undefined
    >(blog ? blog : undefined);

    const [openNode, setOpenNode] = useState(false);
    const [openColor, setOpenColor] = useState(false);
    const [openLink, setOpenLink] = useState(false);
    const debouncedUpdates = useDebouncedCallback(
      async (editor: EditorInstance) => {
        // const json = editor.getJSON();
        // setCharsCount(editor.storage.characterCount.words());
        //   window.localStorage.setItem("novel-content", JSON.stringify(json));
        //   window.localStorage.setItem(
        //     "markdown",
        //     editor.storage.markdown.getMarkdown()
        //   );
        setSaveStatus("Unsaved");
      },
      500
    );

    return (
      <>
        <EditorRoot>
          <EditorContent
            onCreate={({ editor }) => {
              // @ts-ignore
              ref.current = editor;
            }}
            initialContent={initialContent}
            extensions={extensions}
            className={cn(
              "relative min-h-[500px] p-5 px-7   w-full  border-muted bg-background sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg",
              className
            )}
            editorProps={{
              handleDOMEvents: {
                keydown: (_view, event) => handleCommandNavigation(event),
              },
              handlePaste: (view, event) => {
                alert("paste ded for now");
                //   handleImagePaste(view, event, uploadFn);
              },
              handleDrop: (view, event, _slice, moved) => {
                alert("drop ded for now");
                //   handleImageDrop(view, event, moved, uploadFn);
              },
              attributes: {
                class:
                  "prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full",
              },
            }}
            // onUpdate={({ editor }) => {
            //   // debouncedUpdates(editor);
            // }}
            slotAfter={<ImageResizer />}
          >
            <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
              <EditorCommandEmpty className="px-2 text-muted-foreground">
                No results
              </EditorCommandEmpty>
              <EditorCommandList>
                {suggestionItems.map((item) => (
                  <EditorCommandItem
                    value={item.title}
                    onCommand={(val) => {
                      if (item?.command) item.command(val);
                    }}
                    className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                    key={item.title}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </EditorCommandItem>
                ))}
              </EditorCommandList>
            </EditorCommand>
            <EditorBubble className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl">
              <Separator orientation="vertical" />
              <NodeSelector open={openNode} onOpenChange={setOpenNode} />
              <Separator orientation="vertical" />

              <LinkSelector open={openLink} onOpenChange={setOpenLink} />
              <Separator orientation="vertical" />
              <TextButtons />
              <Separator orientation="vertical" />
              <ColorSelector open={openColor} onOpenChange={setOpenColor} />
            </EditorBubble>
          </EditorContent>
        </EditorRoot>
      </>
    );
  }
);

export default Editor;
