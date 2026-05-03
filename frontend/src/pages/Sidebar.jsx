import { Link, useLocation } from "react-router-dom"

const IconCalendar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)
const IconInbox = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
    <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/>
  </svg>
)
const IconDone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
)
const IconHelp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
)
const IconArchive = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/>
    <line x1="10" y1="12" x2="14" y2="12"/>
  </svg>
)

export default function Sidebar() {
  const { pathname } = useLocation()

  const links = [
    { to: "/", label: "Today", icon: <IconCalendar /> },
    { to: "/inbox", label: "Inbox", icon: <IconInbox /> },
    { to: "/completed", label: "Completed", icon: <IconDone /> },
  ]

  return (
    <aside className="w-64 h-screen border-r border-[#E0E9F8] bg-slate-50 flex flex-col p-4 shrink-0 fixed left-0 top-0">
      <div className="px-4 py-6">
        <h2 className="text-lg font-bold text-gray-900">My Workspace</h2>
        <p className="text-xs text-slate-400 mt-1">Productive Day</p>
      </div>
      <nav className="flex-1 space-y-1">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition ${
              pathname === link.to
                ? "bg-blue-50 text-blue-700"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            {link.icon} {link.label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-[#E0E9F8] pt-4 space-y-1">
        <a className="flex items-center gap-3 px-4 py-2 text-slate-400 text-xs hover:text-slate-600" href="#">
          <IconHelp /> Help
        </a>
        <a className="flex items-center gap-3 px-4 py-2 text-slate-400 text-xs hover:text-slate-600" href="#">
          <IconArchive /> Archive
        </a>
      </div>
    </aside>
  )
}