import heroRight from '../assets/veterans-bg.jpg';

export default function Home() {
  return (
    <div style={{ background: 'transparent' }}>
      <section className="hero-outer">
        <div className="hero-panel">
          <div className="hero hero-grid">
            <div className="hero-left">
              <h1 className="title title-large">Honor Haven Veterans Home</h1>
              <p className="lead">Restoring dignity, stability, and purpose to the lives of our nation’s heroes through supportive housing, case management, and community services.</p>
              <div style={{ marginTop: 22 }}>
                <a className="cta" href="/get-involved">Talk to us</a>
                <a className="cta secondary" href="/for-veterans">For Veterans</a>
              </div>
            </div>

            <div className="hero-right">
              <div className="hero-image" aria-hidden>
                <img src={heroRight} alt="Honor Haven" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 className="h2">Our Services</h2>
        <p>We provide housing, case management, mental health support, life skills training, and assistance accessing VA benefits.</p>
      </section>
    </div>
  )
}
