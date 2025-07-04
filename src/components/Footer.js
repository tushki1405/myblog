import React from 'react'

import netlify from '../../content/thumbnails/konami.webp'
import gatsby from '../assets/gatsby.png'
import github from '../assets/nav-github.png'

const links = [
  // TODO { url: 'https://taniarascia.substack.com', label: 'Email signup' },
  { url: 'https://TODO/rss.xml', label: 'RSS feed' },
  { url: 'https://ko-fi.com/guptatushar', label: 'Buy me a coffee' },
]

const madeWithLinks = [
  { url: 'https://www.gatsbyjs.org', label: 'Gatsby', icon: gatsby },
  { url: 'https://github.com/tushki1405', label: 'GitHub', icon: github },
  { url: 'https://www.netlify.com', label: 'Netlify', icon: netlify },
]

export const Footer = () => {
  return (
    <footer className="footer">
      <section className="footer-section">
        <nav className="footer-menu">
          {links.map((link) => (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              key={link.url}
              className="footer-link"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <nav className="footer-menu-buttons">
          {madeWithLinks.map((link) => (
            <a
              href={link.url}
              title={link.label}
              target="_blank"
              rel="noopener noreferrer"
              key={link.url}
              className="button small"
            >
              <img src={link.icon} alt={link.label} />
              <span>{link.label}</span>
            </a>
          ))}
        </nav>
        <div className="footer-made-by">Made with ❤️  by Tushar Gupta</div>
      </section>
    </footer>
  )
}
