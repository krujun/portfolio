import React from 'react'
import { PlusCircle, BookOpen } from 'lucide-react'
import ArticleCard from '../components/ArticleCard'

export default function ArticlesPage({ articles, isAdmin, onOpenAdd, onEdit, onDelete }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 pb-20">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 mb-8">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs mb-1">
            <BookOpen className="w-4 h-4" />
            <span>ARTICLES & BLOGS</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">บทความและความรู้ ({articles.length})</h1>
          <p className="text-slate-400 text-sm mt-1">บทความ เทคนิค และสรุปความรู้ทางด้านการเขียนโปรแกรม</p>
        </div>

        {isAdmin && (
          <button
            onClick={onOpenAdd}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/20 transition-all cursor-pointer self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>เขียนบทความใหม่</span>
          </button>
        )}
      </div>

      {/* Articles Grid */}
      {articles.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl text-slate-400">
          <p className="text-base font-semibold mb-1">ยังไม่มีบทความในระบบ</p>
          {isAdmin && <p className="text-xs text-cyan-400">กดปุ่ม "+ เขียนบทความใหม่" เพื่อบันทึกบทความแรกได้เลย!</p>}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              isAdmin={isAdmin}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
