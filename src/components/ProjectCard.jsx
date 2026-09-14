import React from 'react'
import { ExternalLink, Github, Edit3, Trash2 } from 'lucide-react'
import { renderMarkdown } from '../lib/markdownUtils'

export default function ProjectCard({ project, isAdmin, onEdit, onDelete }) {
  const defaultImage = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80'

  return (
    <div className="group relative bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-800/80 hover:border-sky-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/5 flex flex-col overflow-hidden">
      {/* Thumbnail Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        <img
          src={project.image_url || defaultImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          onError={(e) => { e.target.src = defaultImage }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
        
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-lg font-bold text-slate-100 group-hover:text-sky-300 transition-colors line-clamp-1">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="text-slate-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-4">
          {renderMarkdown(project.description)}
        </div>

        {/* Tech Stack Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Footer */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2 mt-auto">
          <div className="flex items-center gap-2">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-all cursor-pointer"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>
            )}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-600/20 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>

          {/* Admin Controls */}
          {isAdmin && (
            <div className="flex items-center gap-1.5 pl-2 border-l border-slate-800">
              <button
                onClick={() => onEdit(project)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 bg-slate-800/50 hover:bg-amber-500/10 border border-slate-700/50 hover:border-amber-500/30 transition-all cursor-pointer"
                title="แก้ไขผลงาน"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDelete(project.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 bg-slate-800/50 hover:bg-rose-500/10 border border-slate-700/50 hover:border-rose-500/30 transition-all cursor-pointer"
                title="ลบผลงาน"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
