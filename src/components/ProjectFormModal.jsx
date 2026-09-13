import React, { useState, useEffect } from 'react'
import { FolderPlus, Save, X } from 'lucide-react'
import RichTextEditor from './RichTextEditor'

export default function ProjectFormModal({ isOpen, onClose, onSave, editingProject }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    image_url: '',
    github_url: '',
    demo_url: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (editingProject) {
      setFormData({
        title: editingProject.title || '',
        description: editingProject.description || '',
        tags: editingProject.tags ? editingProject.tags.join(', ') : '',
        image_url: editingProject.image_url || '',
        github_url: editingProject.github_url || '',
        demo_url: editingProject.demo_url || ''
      })
    } else {
      setFormData({
        title: '',
        description: '',
        tags: '',
        image_url: '',
        github_url: '',
        demo_url: ''
      })
    }
  }, [editingProject, isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const tagsArray = formData.tags
      ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : []

    const payload = {
      ...formData,
      tags: tagsArray
    }

    try {
      await onSave(payload, editingProject?.id)
      onClose()
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการบันทึก: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div 
        className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <FolderPlus className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-100">
              {editingProject ? 'แก้ไขผลงาน (Edit Project)' : '+ เพิ่มผลงานใหม่ (Add Project)'}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">ชื่อผลงาน *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600"
              required
            />
          </div>

          {/* Rich Text Editor for Project Description */}
          <RichTextEditor
            label="รายละเอียดผลงาน"
            required={true}
            value={formData.description}
            onChange={(val) => setFormData({ ...formData, description: val })}
            placeholder="พิมพ์รายละเอียดผลงาน... สามารถใช้ปุ่มจัดตัวหนา หัวข้อ และลิสต์ได้"
            rows={4}
          />

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">แท็กเทคโนโลยี (คั่นด้วยจุลภาค เช่น React, Supabase, Tailwind)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">URL รูปภาพประกอบ</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">GitHub Repository URL</label>
              <input
                type="url"
                placeholder="https://github.com/..."
                value={formData.github_url}
                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Live Demo URL</label>
              <input
                type="url"
                placeholder="https://demo.com"
                value={formData.demo_url}
                onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-600/20 disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
