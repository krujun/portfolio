import React from 'react'

/**
 * Parses simple Markdown strings into formatted React elements safely
 */
export function renderMarkdown(content) {
  if (!content) return null

  const lines = content.split('\n')
  return (
    <div className="space-y-2 text-slate-300 text-sm leading-relaxed">
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim()

        if (!trimmed) {
          return <div key={lineIdx} className="h-2" />
        }

        // Headings
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={lineIdx} className="text-base font-bold text-slate-100 mt-3 mb-1">
              {formatInlineText(trimmed.slice(4))}
            </h4>
          )
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={lineIdx} className="text-lg font-bold text-slate-100 mt-4 mb-1">
              {formatInlineText(trimmed.slice(3))}
            </h3>
          )
        }
        if (trimmed.startsWith('# ')) {
          return (
            <h2 key={lineIdx} className="text-xl font-extrabold text-sky-400 mt-4 mb-2">
              {formatInlineText(trimmed.slice(2))}
            </h2>
          )
        }

        // Bullet Lists
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <div key={lineIdx} className="flex items-start gap-2 pl-3">
              <span className="text-sky-400 font-bold">•</span>
              <span>{formatInlineText(trimmed.slice(2))}</span>
            </div>
          )
        }

        // Numbered Lists
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/)
        if (numMatch) {
          return (
            <div key={lineIdx} className="flex items-start gap-2 pl-3">
              <span className="text-sky-400 font-semibold">{numMatch[1]}.</span>
              <span>{formatInlineText(numMatch[2])}</span>
            </div>
          )
        }

        // Code block line
        if (trimmed.startsWith('```')) {
          return null
        }

        // Standard Paragraph
        return (
          <p key={lineIdx}>
            {formatInlineText(line)}
          </p>
        )
      })}
    </div>
  )
}

/**
 * Format inline elements like **bold**, *italic*, [link](url), `code`
 */
function formatInlineText(text) {
  if (!text) return ''

  // Split by link syntax [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts = []
  let lastIndex = 0
  let match

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(parseFormatting(text.substring(lastIndex, match.index)))
    }
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        target="_blank"
        rel="noreferrer"
        className="text-sky-400 underline font-medium hover:text-sky-300"
      >
        {match[1]}
      </a>
    )
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(parseFormatting(text.substring(lastIndex)))
  }

  return parts
}

function parseFormatting(text) {
  // Replace **bold** with <strong>
  // Replace *italic* with <em>
  // Replace `code` with <code>
  const boldRegex = /\*\*([^*]+)\*\*/g
  const italicRegex = /\*([^*]+)\*/g
  const codeRegex = /`([^`]+)`/g

  // Simple token parsing
  let processed = text

  return (
    <span key={text}>
      {text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g).map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-extrabold text-slate-100">{part.slice(2, -2)}</strong>
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={i} className="italic text-slate-200">{part.slice(1, -1)}</em>
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={i} className="px-1.5 py-0.5 rounded bg-slate-800 text-sky-300 font-mono text-xs border border-slate-700">
              {part.slice(1, -1)}
            </code>
          )
        }
        return part
      })}
    </span>
  )
}
