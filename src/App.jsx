import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Reddit from './pages/Reddit'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Support from './pages/Support'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reddit" element={<Reddit />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </BrowserRouter>
  )
}
