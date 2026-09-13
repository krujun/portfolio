import React, { useState, useEffect } from 'react'
import { BookPlus, Save, X } from 'lucide-react'
import RichTextEditor from './RichTextEditor'

export default function ArticleFormModal({ isOpen, onClose, onSave, editingArticle }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'General',
    read_time: '3 นาที'
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (editingArticle) {
      setFormData({
        title: editingArticle.title || '',
        content: editingArticle.content || '',
        category: editingArticle.category || 'General',
        read_time: editingArticle.read_time || '3 นาที'
      })
    } else {
      setFormData({
        title: '',
        content: '',
        category: 'General',
        read_time: '3 นาที'
      })
    }
  }, [editingArticle, isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await onSave(formData, editingArticle?.id)
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
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <BookPlus className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-100">
              {editingArticle ? 'แก้ไขบทความ (Edit Article)' : '+ เขียนบทความใหม่ (New Article)'}
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
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">หัวข้อบทความ *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">หมวดหมู่ (Category)</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">เวลาอ่านโดยประมาณ</label>
              <input
                type="text"
                placeholder="เช่น 5 นาที"
                value={formData.read_time}
                onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          {/* Rich Text Editor for Article Content */}
          <RichTextEditor
            label="เนื้อหาบทความ"
            required={true}
            value={formData.content}
            onChange={(val) => setFormData({ ...formData, content: val })}
            placeholder="เขียนเนื้อหาบทความของคุณ... สามารถใช้เครื่องมือจัดตัวหนา หัวข้อ และพรีวิวดูผลลัพธ์ได้"
            rows={8}
          />

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
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition-all shadow-md shadow-cyan-600/20 disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'กำลังบันทึกบทความ...' : 'บันทึกบทความ'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
