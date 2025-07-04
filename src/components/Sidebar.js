import React from 'react'
import { Link } from 'gatsby'

// TODO: revert all icons
// import react from '../../content/thumbnails/react.png'
// import css from '../../content/thumbnails/css-new.png'
// import js from '../../content/thumbnails/js.png'
// import mac from '../../content/thumbnails/apple.png'
// import mario from '../../content/thumbnails/mario.png'
// import tn from '../../content/thumbnails/tn.png'
// import accordion from '../../content/images/keyboardaccordionlogo.png'
// import animorphs from '../../content/thumbnails/animorphslogo.png'
// import pc from '../../content/thumbnails/computer.png'
// import bluesky from '../../content/thumbnails/bluesky.png'
// import rss from '../../content/thumbnails/rss.png'

import floppy from '../assets/floppylogo.png'
import linkedin from '../assets/linkedin.png'
import rss from '../assets/rss.png'

import monsteraLogo from '../assets/monstera.png'

export const Sidebar = () => {
  const guides = [
    {
      url: '/url',
      title: 'title',
      // icon: mac,
    },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-wrapper">
        <div className="sidebar-title">
          <Link to="/" className="sidebar-title-link">
            <span>
              <img
                src={monsteraLogo}
                className="sidebar-logo"
                alt="tushki1405.github.io"
                title="💾"
              />
            </span>
            <span>tushki1405.github.io</span>
          </Link>
        </div>
        <div className="sidebar-container">
          <section className="sidebar-section">
            <h2>About Me</h2>
            <div className="sidebar-content">
              <p>
                I'm <Link to="/me">Tushar</Link>, a software engineer who loves 
                code, cooking, and wandering. This is where I plant ideas and 
                stories.
              </p>
            </div>
          </section>

          <section className="sidebar-section">
            <h2>Stay Connected</h2>
            <p className="sidebar-links">
              <a
                href="https://www.linkedin.com/in/tushargupta14/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={linkedin} alt="LinkedIn" />
                LinkedIn
              </a>
              <a href="/rss.xml">
                <img src={rss} alt="RSS" />
                RSS Feed
              </a>
            </p>
          </section>

          {/* TODO: keeping this as sample for future extensions
          <section className="sidebar-section">
            <h2>Guides</h2>
            <nav className="sidebar-menu">
              {guides.map((link) => (
                <Link key={link.url} to={link.url} activeClassName="active">
                  {link.icon ? (
                    <img src={link.icon} alt={link.title} />
                  ) : (
                    <div style={{ height: '16px', width: '16px' }} />
                  )}
                  {link.title}
                </Link>
              ))}
            </nav>
          </section> */}
        </div>
      </div>
    </aside>
  )
}
