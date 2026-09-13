import React from 'react'
import { Code2, Lock, LogOut, ShieldCheck, FolderGit2, BookOpen, Home } from 'lucide-react'

export default function Navbar({ activeTab, setActiveTab, user, onOpenLogin, onLogout }) {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 text-lg font-extrabold text-slate-100 hover:text-sky-400 transition-colors group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <span className="tracking-tight">
            KruJun <span className="text-sky-400 font-semibold">Dev</span>
          </span>
        </button>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'home'
                ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>หน้าแรก</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>ผลงาน</span>
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'articles'
                ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>บทความ</span>
          </button>

          {/* Admin Status / Action */}
          <div className="ml-2 pl-2 sm:ml-4 sm:pl-4 border-l border-slate-800 flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" /> Admin Mode
                </span>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-rose-500/10 text-slate-300 hover:text-rose-400 border border-slate-800 hover:border-rose-500/30 transition-all cursor-pointer"
                  title="ออกจากระบบ Admin"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">ออก</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-sky-500/10 text-slate-300 hover:text-sky-400 border border-slate-800 hover:border-sky-500/30 transition-all cursor-pointer shadow-sm"
              >
                <Lock className="w-3.5 h-3.5 text-sky-400" />
                <span>Admin Login</span>
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
