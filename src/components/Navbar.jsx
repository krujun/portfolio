import React, { useState } from 'react'
import { Code2, Lock, LogOut, ShieldCheck, FolderGit2, BookOpen, Home, Menu, X } from 'lucide-react'

export default function Navbar({ activeTab, setActiveTab, user, onOpenLogin, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          onClick={() => handleTabChange('home')}
          className="flex items-center gap-2.5 text-lg font-extrabold text-slate-100 hover:text-sky-400 transition-colors group cursor-pointer"
          aria-label="หน้าแรก KruJun Dev"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <span className="tracking-tight">
            KruJun <span className="text-sky-400 font-semibold">Dev</span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          <button
            onClick={() => handleTabChange('home')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'home'
                ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>หน้าแรก</span>
          </button>

          <button
            onClick={() => handleTabChange('projects')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>ผลงาน</span>
          </button>

          <button
            onClick={() => handleTabChange('articles')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'articles'
                ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>บทความ</span>
          </button>

          {/* Admin Status / Action */}
          <div className="ml-4 pl-4 border-l border-slate-800 flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" /> Admin Mode
                </span>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-rose-500/10 text-slate-300 hover:text-rose-400 border border-slate-800 hover:border-rose-500/30 transition-all cursor-pointer"
                  title="ออกจากระบบ Admin"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>ออก</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-sky-500/10 text-slate-300 hover:text-sky-400 border border-slate-800 hover:border-sky-500/30 transition-all cursor-pointer shadow-sm"
              >
                <Lock className="w-3.5 h-3.5 text-sky-400" />
                <span>Admin Login</span>
              </button>
            )}
          </div>
        </nav>

        {/* Mobile Header Actions (Admin Badge + Hamburger Button) */}
        <div className="flex md:hidden items-center gap-2">
          {user && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-3 h-3" /> Admin
            </span>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
            aria-label="เปิดเมนูนำทาง"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-2 shadow-2xl animate-fade-in">
          <button
            onClick={() => handleTabChange('home')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'home'
                ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <Home className="w-5 h-5 text-sky-400" />
            <span>หน้าแรก (Home)</span>
          </button>

          <button
            onClick={() => handleTabChange('projects')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <FolderGit2 className="w-5 h-5 text-sky-400" />
            <span>ผลงานทั้งหมด (Projects)</span>
          </button>

          <button
            onClick={() => handleTabChange('articles')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'articles'
                ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <span>บทความและความรู้ (Articles)</span>
          </button>

          {/* Admin Action Row on Mobile */}
          <div className="pt-3 border-t border-slate-900">
            {user ? (
              <button
                onClick={() => {
                  onLogout()
                  setMobileMenuOpen(false)
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>ออกจากระบบ Admin</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onOpenLogin()
                  setMobileMenuOpen(false)
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-600/20 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>เข้าสู่ระบบ Admin Login</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
