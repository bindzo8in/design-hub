"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Typography from "@tiptap/extension-typography";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { Link as LinkExtension } from "@tiptap/extension-link";
import "./tiptap-table.css";
import "./tiptap-plugins.css";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  Minus,
  Image as ImageIcon,
  Loader2,
  Table as TableIconLucide,
  ArrowLeftToLine,
  ArrowRightToLine,
  Trash2,
  ArrowUpToLine,
  ArrowDownToLine,
  Combine,
  Split,
  PanelTop,
  PanelLeft,
  ChevronDown,
  Link as LinkIcon,
  Code,
  SquareCode,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useRef, useState } from "react";

interface TiptapEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MenuButton = ({
  isActive = false,
  onClick,
  disabled = false,
  children,
}: {
  isActive?: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    data-state={isActive ? "on" : "off"}
    onClick={onClick}
    disabled={disabled}
    className="h-8 w-8 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-white/5 hover:text-white disabled:opacity-50 text-slate-400 data-[state=on]:bg-[#DF1B25]/20 data-[state=on]:text-[#DF1B25]"
  >
    {children}
  </button>
);

const ToolbarSeparator = () => (
  <Separator orientation="vertical" className="h-6 mx-1 bg-[#26336F]/30" />
);

const LinkPopoverMenu = ({ editor }: { editor: Editor | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");

  if (!editor) return null;

  const isActive = editor.isActive("link");

  const setLink = () => {
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
    setIsOpen(false);
  };

  const handleOpen = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setUrl(editor.getAttributes("link").href || "");
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          data-state={isActive ? "on" : "off"}
          className="h-8 px-2 inline-flex items-center justify-center gap-1 rounded-md text-sm font-medium transition-colors hover:bg-white/5 hover:text-white disabled:opacity-50 text-slate-400 data-[state=on]:bg-[#DF1B25]/20 data-[state=on]:text-[#DF1B25]"
        >
          <LinkIcon className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] bg-[#101735] border-[#26336F] text-white p-3 shadow-xl shadow-black/40 z-[100]" align="start">
        <div className="flex items-center gap-2">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste a link..."
            className="flex-1 h-9 bg-[#050711] border-[#26336F] text-white px-3 focus-visible:ring-1 focus-visible:ring-[#DF1B25]"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setLink();
              }
            }}
          />
          <button
            onClick={setLink}
            className="h-9 px-3 bg-[#DF1B25] hover:bg-[#DF1B25]/90 text-white rounded-md text-sm font-medium transition-colors"
          >
            Save
          </button>
          {isActive && (
            <button
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                setIsOpen(false);
              }}
              className="h-9 px-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-md flex items-center justify-center transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const TableDropdownMenu = ({ editor }: { editor: Editor | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  if (!editor) return null;

  const isActive = editor.isActive("table");
  const canInsertTable = editor.can().insertTable();

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          data-state={isActive ? "on" : "off"}
          disabled={!canInsertTable && !isActive}
          className="h-8 px-2 inline-flex items-center justify-center gap-1 rounded-md text-sm font-medium transition-colors hover:bg-white/5 hover:text-white disabled:opacity-50 text-slate-400 data-[state=on]:bg-[#DF1B25]/20 data-[state=on]:text-[#DF1B25]"
        >
          <TableIconLucide className="h-4 w-4" />
          <ChevronDown className="h-3 w-3" />
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="start" className="w-56 bg-[#101735] border-[#26336F] text-white z-[100]">
        <DropdownMenuGroup>
          {!isActive && (
            <DropdownMenuItem
              className="flex items-center focus:bg-white/10 cursor-pointer"
              onClick={() => {
                editor
                  .chain()
                  .focus()
                  .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                  .run();
                setIsOpen(false);
              }}
            >
              <TableIconLucide className="mr-2 h-4 w-4" />
              Insert Table
            </DropdownMenuItem>
          )}
          {isActive && (
            <>
              <DropdownMenuItem
                className="flex items-center focus:bg-white/10 cursor-pointer"
                onClick={() => { editor.chain().focus().addColumnBefore().run(); setIsOpen(false); }}
              >
                <ArrowLeftToLine className="mr-2 h-4 w-4" />
                Add Column Before
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center focus:bg-white/10 cursor-pointer"
                onClick={() => { editor.chain().focus().addColumnAfter().run(); setIsOpen(false); }}
              >
                <ArrowRightToLine className="mr-2 h-4 w-4" />
                Add Column After
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center focus:bg-white/10 cursor-pointer"
                onClick={() => { editor.chain().focus().deleteColumn().run(); setIsOpen(false); }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Column
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#26336F]" />
              <DropdownMenuItem
                className="flex items-center focus:bg-white/10 cursor-pointer"
                onClick={() => { editor.chain().focus().addRowBefore().run(); setIsOpen(false); }}
              >
                <ArrowUpToLine className="mr-2 h-4 w-4" />
                Add Row Before
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center focus:bg-white/10 cursor-pointer"
                onClick={() => { editor.chain().focus().addRowAfter().run(); setIsOpen(false); }}
              >
                <ArrowDownToLine className="mr-2 h-4 w-4" />
                Add Row After
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center focus:bg-white/10 cursor-pointer"
                onClick={() => { editor.chain().focus().deleteRow().run(); setIsOpen(false); }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Row
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#26336F]" />
              <DropdownMenuItem
                className="flex items-center focus:bg-white/10 cursor-pointer"
                onClick={() => { editor.chain().focus().mergeCells().run(); setIsOpen(false); }}
              >
                <Combine className="mr-2 h-4 w-4" />
                Merge Cells
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center focus:bg-white/10 cursor-pointer"
                onClick={() => { editor.chain().focus().splitCell().run(); setIsOpen(false); }}
              >
                <Split className="mr-2 h-4 w-4" />
                Split Cell
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center focus:bg-white/10 cursor-pointer"
                onClick={() => { editor.chain().focus().toggleHeaderRow().run(); setIsOpen(false); }}
              >
                <PanelTop className="mr-2 h-4 w-4" />
                Toggle Header Row
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center focus:bg-white/10 cursor-pointer"
                onClick={() => { editor.chain().focus().toggleHeaderColumn().run(); setIsOpen(false); }}
              >
                <PanelLeft className="mr-2 h-4 w-4" />
                Toggle Header Column
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#26336F]" />
              <DropdownMenuItem
                className="flex items-center text-red-500 focus:text-red-500 focus:bg-red-500/10 cursor-pointer"
                onClick={() => { editor.chain().focus().deleteTable().run(); setIsOpen(false); }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Table
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export function TiptapEditor({ value, onChange }: TiptapEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        link: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Subscript,
      Superscript,
      Typography,
      LinkExtension.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-[400px] w-full rounded-b-xl border border-[#26336F]/30 bg-[#101735]/40 px-6 py-5 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#DF1B25] prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-[#101735]/80 prose-img:rounded-xl",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return <div className="h-[400px] w-full rounded-xl border border-[#26336F]/30 bg-[#101735]/40 animate-pulse" />;
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "design-hub/blog/inline");

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Upload failed.");
      }

      editor.chain().focus().setImage({ src: data.url }).run();
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col w-full rounded-xl overflow-hidden border border-[#26336F]/30 bg-[#101735]/20 shadow-xl shadow-black/20">
      <div className="flex flex-wrap items-center gap-1 border-b border-[#26336F]/30 bg-[#050711]/60 backdrop-blur-md p-2 sticky top-0 z-10">
        <MenuButton
          isActive={editor.isActive("heading", { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <Heading1 className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          isActive={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          isActive={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 className="h-4 w-4" />
        </MenuButton>

        <ToolbarSeparator />

        <MenuButton
          isActive={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          isActive={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          isActive={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          isActive={editor.isActive("highlight")}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
        >
          <Highlighter className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          isActive={editor.isActive("subscript")}
          onClick={() => editor.chain().focus().toggleSubscript().run()}
        >
          <SubscriptIcon className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          isActive={editor.isActive("superscript")}
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
        >
          <SuperscriptIcon className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          isActive={editor.isActive("code")}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <Code className="h-4 w-4" />
        </MenuButton>

        <LinkPopoverMenu editor={editor} />

        <ToolbarSeparator />

        <MenuButton
          isActive={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeft className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          isActive={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenter className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          isActive={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <AlignRight className="h-4 w-4" />
        </MenuButton>

        <ToolbarSeparator />

        <MenuButton
          isActive={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          isActive={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </MenuButton>
        <TableDropdownMenu editor={editor} />
        <MenuButton
          isActive={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          isActive={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <SquareCode className="h-4 w-4" />
        </MenuButton>
        
        <ToolbarSeparator />

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <MenuButton onClick={triggerImageUpload} disabled={isUploading}>
          {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
        </MenuButton>

        <div className="flex-1" />

        <MenuButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="h-4 w-4" />
        </MenuButton>
      </div>
      <div className="relative">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
