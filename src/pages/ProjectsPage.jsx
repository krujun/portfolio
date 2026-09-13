import React from 'react'
import { PlusCircle, FolderGit2 } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'

export default function ProjectsPage({ projects, isAdmin, onOpenAdd, onEdit, onDelete }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 pb-20">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs mb-1">
            <FolderGit2 className="w-4 h-4" />
            <span>PROJECT PORTFOLIO</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">ผลงานทั้งหมด ({projects.length})</h1>
          <p className="text-slate-400 text-sm mt-1">รวมโปรเจกต์และการพัฒนาแอปพลิเคชัน</p>
        </div>

        {isAdmin && (
          <button
            onClick={onOpenAdd}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg shadow-sky-600/20 transition-all cursor-pointer self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>เพิ่มผลงานใหม่</span>
          </button>
        )}
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl text-slate-400">
          <p className="text-base font-semibold mb-1">ยังไม่มีผลงานในระบบ</p>
          {isAdmin && <p className="text-xs text-sky-400">กดปุ่ม "+ เพิ่มผลงานใหม่" เพื่อสร้างผลงานแรกได้เลย!</p>}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
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
