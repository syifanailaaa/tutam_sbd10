import { useState, useEffect } from "react"
import axios from "axios"
import Sidebar from "./Sidebar"

const API = "https://tutamsbd10-production-7cf3.up.railway.app"

const IconSearch = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)
const IconPlus = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)
const IconTrash = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
)
const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const IconClock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)
const IconClipboard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
    <rect x="9" y="3" width="6" height="4" rx="1"/>
    <line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/>
  </svg>
)

export default function Today() {
  const [todos, setTodos] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("medium")
  const [loading, setLoading] = useState(false)

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API}/todos`)
      console.log(res.data.data)
      setTodos(res.data.data)
    } catch (err) { console.error(err) }
  }

  useEffect(() => { fetchTodos() }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    setLoading(true)
    await axios.post(`${API}/todos`, { title, description, priority })
    setTitle(""); setDescription(""); setPriority("medium"); setShowForm(false)
    await fetchTodos()
    setLoading(false)
  }

  const handleDelete = async (id) => {
    await axios.delete(`${API}/todos/${id}`)
    await fetchTodos()
  }

  const handleComplete = async (id, completed) => {
    await axios.patch(`${API}/todos/${id}`, { completed: !completed })
    await fetchTodos()
  }

  const remaining = todos.filter(t => !t.completed).length

  const priorityColor = (p) => {
    if (p === "high") return "bg-red-50 text-red-600"
    if (p === "medium") return "bg-blue-50 text-blue-600"
    return "bg-gray-100 text-gray-500"
  }

  return (
    <div style={{ fontFamily: "Manrope, sans-serif" }} className="flex h-screen bg-[#f7f9fc] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 ml-64">
        <header className="flex justify-between items-center px-6 h-16 bg-white border-b border-[#E0E9F8] shadow-sm z-10">
          <div className="flex items-center gap-4 flex-1">
            <span className="text-xl font-bold text-blue-600">FocusFlow</span>
            <div className="relative w-full max-w-md hidden md:block">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><IconSearch /></span>
              <input className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Search tasks..." type="text"/>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">SN</div>
        </header>

        <main className="flex-1 overflow-y-auto p-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Today's Focus</h1>
                <p className="text-slate-400 text-sm mt-1">You have {remaining} task{remaining !== 1 ? "s" : ""} remaining.</p>
              </div>
              <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-semibold shadow-md hover:bg-blue-700 transition">
                <IconPlus /> New Task
              </button>
            </div>

            {showForm && (
              <div className="bg-white border border-[#E0E9F8] rounded-xl p-8 shadow-sm mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">Create New Task</h2>
                <p className="text-slate-400 text-sm mb-6">Organize your thoughts and stay productive.</p>
                <form onSubmit={handleAdd} className="space-y-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Task Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What needs to be done?" className="w-full border-0 border-b border-gray-200 focus:border-blue-500 focus:outline-none py-2 text-lg bg-transparent placeholder-gray-300" required/>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add some details..." rows={3} className="w-full border-0 border-b border-gray-200 focus:border-blue-500 focus:outline-none py-2 text-sm bg-transparent placeholder-gray-300 resize-none"/>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Priority Level</label>
                    <div className="flex gap-3">
                      {["low", "medium", "high"].map((p) => (
                        <button key={p} type="button" onClick={() => setPriority(p)}
                          className={`flex-1 py-2.5 rounded-lg border text-sm font-semibold capitalize transition ${priority === p ? "bg-blue-50 border-blue-500 text-blue-700" : "border-gray-200 text-slate-400 hover:bg-gray-50"}`}>
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-lg text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition">Cancel</button>
                    <button type="submit" disabled={loading} className="px-8 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition disabled:opacity-60">
                      {loading ? "Creating..." : "Create Task"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="space-y-3">
              {todos.length === 0 && (
                <div className="text-center py-20 text-slate-300">
                  <IconClipboard />
                  <p className="text-sm mt-3">No tasks yet. Add one above!</p>
                </div>
              )}
              {todos.map((todo) => (
                <div key={todo.id} className={`bg-white border border-[#E0E9F8] rounded-xl p-4 flex items-center gap-4 group hover:bg-blue-50/30 transition-colors ${todo.completed ? "opacity-60" : ""}`}>
                  <button onClick={() => handleComplete(todo.id, todo.completed)}
                    className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition ${todo.completed ? "bg-blue-600 border-blue-600" : "border-blue-600 hover:bg-blue-50"}`}>
                    {todo.completed && <span className="text-white"><IconCheck /></span>}
                  </button>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-semibold truncate ${todo.completed ? "line-through text-slate-400" : "text-gray-900"}`}>{todo.title}</h3>
                    {todo.description && <p className="text-xs text-slate-400 mt-0.5 truncate">{todo.description}</p>}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-slate-300 flex items-center gap-1">
                        <IconClock />
                        <span className="text-xs">{new Date(todo.created_at).toLocaleDateString("id-ID")}</span>
                      </span>
                      {todo.priority && (
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${priorityColor(todo.priority)}`}>
                          {todo.priority} priority
                        </span>
                      )}
                    </div>
                  </div>
                  <button onClick={() => handleDelete(todo.id)} className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 transition">
                    <IconTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>

        <footer className="flex justify-between items-center px-8 py-4 bg-white border-t border-[#E0E9F8]">
          <p className="text-xs text-slate-400">© 2026 FocusFlow Task Management By Syifa Naila Maulidya</p>
          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#" className="hover:text-slate-600">Privacy</a>
            <a href="#" className="hover:text-slate-600">Terms</a>
          </div>
        </footer>
      </div>
    </div>
  )
}