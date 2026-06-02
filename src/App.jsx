import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Reddit from './pages/Reddit'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Resources from './pages/Resources'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Support from './pages/Support'
import Start from './pages/Start'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reddit" element={<Reddit />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/support" element={<Support />} />
        <Route path="/start" element={<Start />} />
      </Routes>
    </BrowserRouter>
  )
}
