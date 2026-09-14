import React from 'react'
import { ArrowRight, Code2, Database, ShieldCheck, Camera, Edit3 } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import ArticleCard from '../components/ArticleCard'

export default function Home({ profile, projects, articles, isAdmin, onNavigate, onOpenEditProfile }) {
  const defaultProfile = {
    name: 'นายธนาพล ตริสกุล',
    role: 'Full-Stack Developer & Educator',
    bio: 'เว็บไซต์ Portfolio แสดงผลงานและบทความ พัฒนาด้วย React (Vite) เชื่อมต่อฐานข้อมูล Supabase (PostgreSQL) ฟรี พร้อมระบบ Admin CMS ในตัว โฮสต์บน GitHub Pages',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
  }

  const currentProfile = profile || defaultProfile

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 overflow-hidden border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          {/* Avatar Profile with Admin Camera Overlay */}
          <div className="relative inline-block mb-6 group">
            <img
              src={currentProfile.avatar_url}
              alt={currentProfile.name}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-sky-500/30 shadow-2xl shadow-sky-500/20 mx-auto transition-transform duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
              onError={(e) => { e.target.src = defaultProfile.avatar_url }}
            />
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-slate-950 rounded-full" title="Available for projects" />

            {/* Camera Overlay button for Admin */}
            {isAdmin && (
              <button
                onClick={onOpenEditProfile}
                className="absolute inset-0 rounded-full bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer"
                title="คลิกเพื่อแก้ไขรูปโปรไฟล์"
              >
                <Camera className="w-6 h-6 text-sky-400 mb-0.5" />
                <span className="text-[10px] font-bold">แก้ไขรูปภาพ</span>
              </button>
            )}
          </div>

          {/* Heading Name */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight mb-3 leading-snug sm:leading-tight">
            สวัสดีครับ ผม <span className="inline-block bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">{currentProfile.name}</span> 👋
          </h1>
          <p className="text-sky-400 font-semibold text-base sm:text-lg md:text-xl mb-4">
            {currentProfile.role}
          </p>
          <p className="max-w-2xl mx-auto text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed mb-8 px-2">
            {currentProfile.bio}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-md sm:max-w-none mx-auto px-4 sm:px-0">
            <button
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-sky-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer min-h-[44px]"
            >
              <span>สำรวจผลงานทั้งหมด</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('articles')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-sm border border-slate-800 transition-all cursor-pointer min-h-[44px]"
            >
              <span>อ่านบทความ</span>
            </button>

            {isAdmin && (
              <button
                onClick={onOpenEditProfile}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-semibold text-sm border border-amber-500/30 transition-all cursor-pointer min-h-[44px]"
              >
                <Edit3 className="w-4 h-4" />
                <span>แก้ไขข้อมูลโปรไฟล์</span>
              </button>
            )}
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mt-14 pt-8 border-t border-slate-800/60 text-left">
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/50 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 shrink-0">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200">React + Tailwind v4</h3>
                <p className="text-xs text-slate-400 mt-1">Single Page App โหลดไวลื่นไหลบน GitHub Pages</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/50 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200">Supabase PostgreSQL</h3>
                <p className="text-xs text-slate-400 mt-1">ฐานข้อมูลฟรี พร้อม RLS Security ป้องกันการแก้ไข</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/50 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200">Admin Live CMS</h3>
                <p className="text-xs text-slate-400 mt-1">ล็อกอินผู้ดูแลเพื่อกดเพิ่ม/แก้ไขผลงานได้ผ่านหน้าเว็บ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-100 tracking-tight">🚀 ผลงานล่าสุด</h2>
            <p className="text-xs text-slate-400 mt-1">โปรเจกต์เด่นที่ได้รับการคัดสรร</p>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors cursor-pointer"
          >
            <span>ดูทั้งหมด ({projects.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl text-slate-500 text-sm">
            ยังไม่มีข้อมูลผลงานในระบบ
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} isAdmin={false} />
            ))}
          </div>
        )}
      </section>

      {/* Featured Articles Preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-100 tracking-tight">📝 บทความล่าสุด</h2>
            <p className="text-xs text-slate-400 mt-1">แบ่งปันความรู้และประสบการณ์</p>
          </div>
          <button
            onClick={() => onNavigate('articles')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <span>ดูทั้งหมด ({articles.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {articles.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl text-slate-500 text-sm">
            ยังไม่มีบทความในระบบ
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.slice(0, 2).map((article) => (
              <ArticleCard key={article.id} article={article} isAdmin={false} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
