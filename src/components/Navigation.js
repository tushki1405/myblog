import React, { useState } from 'react'
import { Link } from 'gatsby'
import { SocialIcon } from 'react-social-icons'

import monsteraLogo from '../assets/monstera.png'
import blog from '../assets/nav-blog.png'
import projects from '../assets/nav-projects.png'
import github from '../assets/nav-github.png'
import pizza from '../assets/nav-pizza.png'
import { Moon } from '../assets/Moon'
import { Sun } from '../assets/Sun'
import { Menu } from '../assets/Menu'
import { Close } from '../assets/Close'

// TODO: update links
const links = [
  { url: '/recipes', label: 'Recipes', image: pizza },
  { url: '/notes', label: 'Notes', image: blog },
  { url: '/blog', label: 'Blog', image: projects },
  // { url: '/experience', label: 'Work experience', image: github },
  { url: '/me', label: 'About', image: monsteraLogo },
]

const socialLinks = [
  { url: 'https://github.com/tushki1405' },
  { url: 'https://www.linkedin.com/in/tushargupta14/' },
  { url: 'https://www.instagram.com/tushki1405/' },
]

export const Navigation = ({ handleUpdateTheme, theme }) => {
  const [navOpen, setNavOpen] = useState(false)

  const handleToggleMobileNav = () => {
    setNavOpen((prev) => !prev)
  }

  const handleCloseMobileNav = () => {
    setNavOpen(false)
  }
  // TODO: update github link
  return (
    <header className="navbar">
      <div className="navbar-title">
        <div className="navbar-title-content">
          <Link to="/" className="navbar-title-link">
            <span>
              <img
                src={monsteraLogo}
                className="sidebar-logo"
                alt="https:://tushki1405.github.io"
              />
            </span>
            <span>tushki1405.github.io</span>
          </Link>
        </div>
      </div>
      <div className="navbar-wrapper">
        <div className="navbar-container">
          <section className="navbar-section navbar-section-search" />
          <section className="navbar-section">
            <button
              className={`navbar-button nav-menu-button ${
                navOpen ? 'active' : ''
              }`}
              onClick={handleToggleMobileNav}
            >
              {navOpen ? <Close /> : <Menu />}
            </button>
            <nav className={`navbar-menu nav-items ${navOpen ? 'active' : ''}`}>
              {links.map((link) => (
                <Link
                  key={link.url}
                  to={link.url}
                  activeClassName="active"
                  onClick={handleCloseMobileNav}
                >
                  <img src={link.image} alt={link.label} />
                  {link.label}
                </Link>
              ))}
            </nav>
            <nav className="navbar-menu social">
              <button
                className="navbar-button theme-switch-button"
                onClick={() => {
                  const newTheme = theme === 'dark' ? 'light' : 'dark'

                  handleUpdateTheme(newTheme)
                }}
              >
                {theme === 'dark' ? <Sun /> : <Moon />}
              </button>
              {socialLinks.map((link) => (
                <SocialIcon
                  target="_blank"
                  key={link.url}
                  url={link.url}
                  fgColor="currentColor"
                  bgColor="transparent"
                  className="navbar-icon"
                />
              ))}
            </nav>
          </section>
        </div>
      </div>
    </header>
  )
}
