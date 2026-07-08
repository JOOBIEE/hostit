import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* Left Column */}
        <div className="footer__col">
          <span className="footer__logo">HostIt Services</span>
          <p className="footer__tagline">Lagos based. Available nationwide.</p>
        </div>

        {/* Center Column */}
        <div className="footer__col footer__col--center">
          <nav className="footer__links">
            <Link href="#">Home</Link>
            <Link href="#services">Services</Link>
            <Link href="#gallery">Gallery</Link>
            <Link href="#contact">Contact</Link>
          </nav>
        </div>

        {/* Right Column */}
        <div className="footer__col footer__col--right">
          <div className="footer__contact-block">
            <p className="footer__contact-label">Get In Touch</p>
            
           <a   href="https://wa.me/2347082972270"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__contact-link"
            >
              <span>+234 708 297 2270</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            
            <a  href="https://instagram.com/hostit_services"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__contact-link"
            >
              <span>@hostit_services</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <p className="footer__copy">
            © 2026 HostIt Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}