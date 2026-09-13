import React from 'react'
import { Clock, Tag, Edit3, Trash2 } from 'lucide-react'
import { renderMarkdown } from '../lib/markdownUtils'

export default function ArticleCard({ article, isAdmin, onEdit, onDelete }) {
  return (
    <div className="group relative bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 p-6 flex flex-col justify-between">
      <div>
        {/* Category & Read Time Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Tag className="w-3 h-3" />
            {article.category || 'ทั่วไป'}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            {article.read_time || '3 นาที'}
          </span>
        </div>

        {/* Article Title */}
        <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors mb-2.5 line-clamp-2">
          {article.title}
        </h3>

        {/* Article Content Rendered */}
        <div className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-4">
          {renderMarkdown(article.content)}
        </div>
      </div>

      {/* Footer Meta & Admin Actions */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 mt-auto">
        <span>
          {new Date(article.created_at).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </span>

        {isAdmin && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onEdit(article)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 bg-slate-800/50 hover:bg-amber-500/10 border border-slate-700/50 hover:border-amber-500/30 transition-all cursor-pointer"
              title="แก้ไขบทความ"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(article.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 bg-slate-800/50 hover:bg-rose-500/10 border border-slate-700/50 hover:border-rose-500/30 transition-all cursor-pointer"
              title="ลบบทความ"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
