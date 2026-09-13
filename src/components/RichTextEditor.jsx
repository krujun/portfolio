import React, { useState, useRef } from 'react'
import { 
  Bold, 
  Italic, 
  Heading1, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  Code, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Eye, 
  Edit3 
} from 'lucide-react'
import { renderMarkdown } from '../lib/markdownUtils'

export default function RichTextEditor({ value, onChange, label, placeholder, rows = 6, required = false }) {
  const [isPreview, setIsPreview] = useState(false)
  const textareaRef = useRef(null)

  // Insert formatting at cursor position or wrap selection
  const insertFormatting = (prefix, suffix = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    
    let replacement = ''
    if (selectedText) {
      replacement = `${prefix}${selectedText}${suffix}`
    } else {
      replacement = `${prefix}${suffix}`
    }

    const newValue = value.substring(0, start) + replacement + value.substring(end)
    onChange(newValue)

    // Set cursor position after edit
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + prefix.length + (selectedText ? selectedText.length : 0)
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const handleInsertPrefixLine = (prefix) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    
    // Find beginning of current line
    const lineStart = value.lastIndexOf('\n', start - 1) + 1
    const newValue = value.substring(0, lineStart) + prefix + value.substring(lineStart)
    onChange(newValue)

    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + prefix.length, end + prefix.length)
    }, 0)
  }

  return (
    <div className="space-y-1.5">
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-slate-300">
            {label} {required && <span className="text-rose-400">*</span>}
          </label>
          <span className="text-[10px] text-slate-500 font-medium">รองรับ Markdown Format</span>
        </div>
      )}

      <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 transition-all">
        {/* Editor Toolbar Header */}
        <div className="flex items-center justify-between gap-1 p-2 bg-slate-900/80 border-b border-slate-800/80 overflow-x-auto">
          {/* Formatting Buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => insertFormatting('**', '**')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
              title="ตัวหนา (Bold)"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('*', '*')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
              title="ตัวเอียง (Italic)"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>

            <div className="h-4 w-px bg-slate-800 mx-1" />

            <button
              type="button"
              onClick={() => handleInsertPrefixLine('# ')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
              title="หัวข้อขนาดใหญ่ (Heading 1)"
            >
              <Heading1 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleInsertPrefixLine('## ')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
              title="หัวข้อขนาดกลาง (Heading 2)"
            >
              <Heading2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleInsertPrefixLine('### ')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
              title="หัวข้อขนาดย่อย (Heading 3)"
            >
              <Heading3 className="w-3.5 h-3.5" />
            </button>

            <div className="h-4 w-px bg-slate-800 mx-1" />

            <button
              type="button"
              onClick={() => handleInsertPrefixLine('- ')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
              title="รายการหัวข้อ (Bullet List)"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleInsertPrefixLine('1. ')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
              title="รายการลำดับตัวเลข (Numbered List)"
            >
              <ListOrdered className="w-3.5 h-3.5" />
            </button>

            <div className="h-4 w-px bg-slate-800 mx-1" />

            <button
              type="button"
              onClick={() => insertFormatting('`', '`')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
              title="โค้ดตัวอักษร (Inline Code)"
            >
              <Code className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('[ชื่อลิงก์](', ')')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
              title="แทรกลิงก์ (Link)"
            >
              <LinkIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('![คำอธิบายรูป](', ')')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
              title="แทรกรูปภาพ (Image)"
            >
              <ImageIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Toggle Preview Button */}
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              isPreview 
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' 
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {isPreview ? (
              <>
                <Edit3 className="w-3 h-3" />
                <span>โหมดแก้ไข</span>
              </>
            ) : (
              <>
                <Eye className="w-3 h-3" />
                <span>พรีวิว</span>
              </>
            )}
          </button>
        </div>

        {/* Editor Body */}
        {isPreview ? (
          <div className="p-4 bg-slate-950/60 min-h-[160px] max-h-[300px] overflow-y-auto">
            {value ? (
              renderMarkdown(value)
            ) : (
              <p className="text-slate-600 text-xs italic">ยังไม่มีข้อความสำหรับพรีวิว</p>
            )}
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            rows={rows}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-3.5 bg-transparent text-slate-100 text-sm focus:outline-none placeholder:text-slate-600 font-sans resize-y"
            required={required}
          />
        )}
      </div>
    </div>
  )
}
