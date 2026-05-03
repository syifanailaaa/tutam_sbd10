import { useState, useEffect } from "react"
import axios from "axios"
import Sidebar from "./Sidebar"

const API = "https://tutamsbd10-production-7cf3.up.railway.app"

const IconPlus = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)
const IconClock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)
const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const IconTrash = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M9 6V4h6v2"/>
  </svg>
)

export default function Inbox() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState("")

  const fetchTodos = async () => {
    const res = await axios.get(`${API}/todos`)
    setTodos(res.data.data.filter(t => !t.completed))
  }

  useEffect(() => { fetchTodos() }, [])

  const handleQuickAdd = async (e) => {
    e.preventDefault()
    if (!input.trim()) return
    await axios.post(`${API}/todos`, { title: input, priority: "medium" })
    setInput("")
    await fetchTodos()
  }

  const handleComplete = async (id, completed) => {
    await axios.patch(`${API}/todos/${id}`, { completed: !completed })
    await fetchTodos()
  }

  const handleDelete = async (id) => {
    await axios.delete(`${API}/todos/${id}`)
    await fetchTodos()
  }

  const priorityColor = (p) => {
    if (p === "high") return "bg-red-50 text-red-600"
    if (p === "medium") return "bg-blue-50 text-blue-600"
    return "bg-gray-100 text-gray-500"
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
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Inbox</h1>
              <p className="text-slate-400 text-sm mt-1">Organize your incoming thoughts and pending tasks.</p>
            </div>

            {/* Quick Add */}
            <form onSubmit={handleQuickAdd} className="bg-white border border-[#E0E9F8] rounded-xl p-4 mb-8 flex items-center gap-4 shadow-sm">
              <button type="submit" className="text-blue-600 hover:text-blue-700 transition">
                <IconPlus />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a new task to your inbox..."
                className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-700 placeholder-gray-300"
              />
            </form>

            {/* Task List */}
            <div className="space-y-3">
              {todos.length === 0 && (
                <div className="text-center py-20 text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
                    <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/>
                  </svg>
                  <p className="text-sm">Inbox is empty. Add a task above!</p>
                </div>
              )}
              {todos.map((todo) => (
                <div key={todo.id} className="bg-white border border-[#E0E9F8] rounded-xl p-4 flex items-start gap-4 group hover:shadow-md transition">
                  <button onClick={() => handleComplete(todo.id, todo.completed)}
                    className="mt-0.5 w-6 h-6 rounded-full border-2 border-blue-600 flex-shrink-0 flex items-center justify-center hover:bg-blue-50 transition">
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition">{todo.title}</h3>
                      {todo.priority && (
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0 ${priorityColor(todo.priority)}`}>
                          {todo.priority}
                        </span>
                      )}
                    </div>
                    {todo.description && <p className="text-xs text-slate-400 mt-1">{todo.description}</p>}
                    <div className="flex items-center gap-1 mt-2 text-slate-300">
                      <IconClock />
                      <span className="text-xs">{new Date(todo.created_at).toLocaleDateString("id-ID")}</span>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(todo.id)} className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 transition mt-0.5">
                    <IconTrash />
                  </button>
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