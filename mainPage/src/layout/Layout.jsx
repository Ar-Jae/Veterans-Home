import { Outlet, Link } from 'react-router-dom'

export default function Layout() {
  return (
    <div style={{ fontFamily: 'system-ui, Arial', padding: 20 }}>
      <header style={{ marginBottom: 20 }}>
        <nav>
          <Link to="/" style={{ marginRight: 12 }}>Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer style={{ marginTop: 40, fontSize: 12, color: '#666' }}>
        © {new Date().getFullYear()} MainPage
      </footer>
    </div>
  )
}
