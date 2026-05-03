import { useState, useEffect } from "react"
import axios from "axios"
import Sidebar from "./Sidebar"

const API = import.meta.env.VITE_API_URL

const IconCheckCircle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M12 2a10 10 0 100 20A10 10 0 0012 2zm4.707 7.293a1 1 0 00-1.414 0L10 14.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l6-6a1 1 0 000-1.414z" clipRule="evenodd"/>
  </svg>
)
const IconClock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)
const IconTrash = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M9 6V4h6v2"/>
  </svg>
)

export default function Completed() {
  const [todos, setTodos] = useState([])

  const fetchTodos = async () => {
    const res = await axios.get(`${API}/todos`)
    setTodos(res.data.data.filter(t => t.completed))
  }

  useEffect(() => { fetchTodos() }, [])

  const handleDelete = async (id) => {
    await axios.delete(`${API}/todos/${id}`)
    await fetchTodos()
  }

  const handleUncomplete = async (id) => {
    await axios.patch(`${API}/todos/${id}`, { completed: false })
    await fetchTodos()
  }

  return (
    <div style={{ fontFamily: "Manrope, sans-serif" }} className="flex h-screen bg-[#f7f9fc] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <header className="flex justify-between items-center px-6 h-16 bg-white border-b border-[#E0E9F8] shadow-sm">
          <span className="text-xl font-bold text-blue-600">FocusFlow</span>
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">SN</div>
        </header>

        <main className="flex-1 overflow-y-auto p-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Completed Tasks</h1>
                <p className="text-slate-400 text-sm mt-1">Review your accomplishments. Total: {todos.length} tasks.</p>
              </div>
              {todos.length > 0 && (
                <button
                  onClick={async () => {
                    await Promise.all(todos.map(t => axios.delete(`${API}/todos/${t.id}`)))
                    fetchTodos()
                  }}
                  className="flex items-center gap-2 text-sm text-blue-600 font-semibold hover:bg-blue-50 px-4 py-2 rounded-full transition"
                >
                  Clear History
                </button>
              )}
            </div>

            <div className="space-y-3">
              {todos.length === 0 && (
                <div className="text-center py-20 text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <p className="text-sm">No completed tasks yet.</p>
                </div>
              )}
              {todos.map((todo) => (
                <div key={todo.id} className="bg-white border border-[#E0E9F8] rounded-xl p-4 flex items-center gap-4 group hover:bg-blue-50/20 transition">
                  <div className="flex-shrink-0">
                    <IconCheckCircle />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-400 line-through truncate">{todo.title}</h3>
                    {todo.description && <p className="text-xs text-slate-300 mt-0.5 truncate">{todo.description}</p>}
                    <div className="flex items-center gap-1 mt-1 text-slate-300">
                      <IconClock />
                      <span className="text-xs">Completed {new Date(todo.created_at).toLocaleDateString("id-ID")}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button onClick={() => handleUncomplete(todo.id)} className="text-xs text-blue-400 hover:text-blue-600 font-semibold px-2 py-1 rounded hover:bg-blue-50 transition">
                      Undo
                    </button>
                    <button onClick={() => handleDelete(todo.id)} className="text-slate-300 hover:text-red-400 transition">
                      <IconTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        <footer className="flex justify-between items-center px-8 py-4 bg-white border-t border-[#E0E9F8]">
          <p className="text-xs text-slate-400">© 2026 FocusFlow Task Management By Syifa Naila Maulidya</p>
        </footer>
      </div>
    </div>
  )
}