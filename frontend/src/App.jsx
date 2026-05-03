import { Routes, Route } from "react-router-dom"
import Today from "./pages/Today"
import Inbox from "./pages/Inbox"
import Completed from "./pages/Completed"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Today />} />
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/completed" element={<Completed />} />
    </Routes>
  )
}