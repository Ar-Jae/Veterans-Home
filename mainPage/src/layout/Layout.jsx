import { Outlet, NavLink } from 'react-router-dom'
import logo from '../assets/Honor Haven Veterans Home Logo2.jpg'

export default function Layout() {
  const NavItem = ({ to, children }) => (
    <NavLink to={to} className={({ isActive }) => (isActive ? 'nav-active' : '')}>
      {children}
    </NavLink>
  )

  return (
    <div className="site-root" style={{ background: '#f7f9fb', minHeight: '100vh', padding: 0 }}>
      <header style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '0 0 0 0', boxShadow: '0 2px 8px rgba(16,24,40,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }} className="brand">
            <img src={logo} alt="Honor Haven logo" className="logo-img" style={{ height: 80, width: 'auto', borderRadius: 'var(--radius)', marginRight: 12 }} />
            <div>
              <h1 style={{ margin: 0, fontSize: '2.2rem', fontWeight: 800 }}>Honor Haven</h1>
              <div style={{ fontSize: 20, color: 'var(--muted)' }}>Veterans Group Home</div>
            </div>
          </div>
          <nav id="main-nav" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            <NavItem to="/">Home</NavItem>
            <NavItem to="/about">About Us</NavItem>
            <NavItem to="/get-involved">Get Involved</NavItem>
            <NavItem to="/impact">Impact Stories</NavItem>
            <NavItem to="/contact">Contact Us</NavItem>
            <a className="cta" href="/get-involved" style={{ background: '#ffd800', color: '#0f1724', fontWeight: 800, padding: '12px 20px', borderRadius: 6, display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', fontSize: '1rem', boxShadow: '0 2px 8px rgba(16,24,40,0.04)' }}>Talk to us <span style={{ fontWeight: 800, marginLeft: 6 }}>&#8250;</span></a>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer style={{ textAlign: 'center' }}>
        © {new Date().getFullYear()} Honor Haven Veterans Home
        <div style={{ marginTop: 8 }}>Designed by <a href="https://www.arjae.com" target="_blank" rel="noreferrer">Arjae</a></div>
      </footer>
    </div>
  )
}
