import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__col">
          <span className="footer__logo">HostIt Services</span>
          <p className="footer__tagline">Lagos based. Available nationwide.</p>
        </div>

        <div className="footer__col footer__col--center">
          <nav className="footer__links">
            <Link href="#">Home</Link>
            <Link href="#services">Services</Link>
            <Link href="#gallery">Gallery</Link>
            <Link href="#contact">Contact</Link>
          </nav>
        </div>

        <div className="footer__col footer__col--right">
          <p className="footer__contact-label">Get In Touch</p>
          
          <a  href="https://wa.me/2348000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__contact-link"
          >
            <span>+234 800 000 0000</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          
          <a  href="https://instagram.com/hostitservices"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__contact-link"
          >
            <span>@hostitservices</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
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