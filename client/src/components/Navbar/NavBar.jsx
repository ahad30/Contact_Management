'use client'

import { useState, useEffect } from 'react'
import { Equal } from 'lucide-react'
import { NavigationModal } from '../Modal/NavigationModal'
import Link from 'next/link'

export function NavBar() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isNavOpen, setIsNavOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Show navbar when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true)
      } 
      // Hide navbar when scrolling down
      else if (currentScrollY > lastScrollY) {
        setIsVisible(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 bg-transparent backdrop-blur-sm z-40 transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="font-bold text-2xl">
              <svg 
    id="logo" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 64.06 32"
    width={64}
    height={32}
  >
    <rect
      id="line1"
      x="12.31"
      width="6.78"
      height="32"
      strokeWidth="0"
      style={{ translate: 'none', rotate: 'none', scale: 'none', transformOrigin: '0px 0px' }}
      transform="matrix(1,0,0,1,0,0)"
    />
    <polygon
      id="angle1"
      points="0 32 6.78 32 12.31 0 5.53 0 0 32"
      strokeWidth="0"
      style={{ translate: 'none', rotate: 'none', scale: 'none', transformOrigin: '0px 0px', visibility: 'visible' }}
      transform="matrix(1,0,0,1,0,0)"
    />
    <rect
      id="line2"
      x="25.88"
      width="6.78"
      height="32"
      strokeWidth="0"
      style={{ translate: 'none', rotate: 'none', scale: 'none', transformOrigin: '0px 0px' }}
      transform="matrix(1,0,0,1,0,0)"
    />
    <polygon
      id="angle2"
      points="32.66 32 39.44 32 44.97 0 38.19 0 32.66 32"
      strokeWidth="0"
      style={{ translate: 'none', rotate: 'none', scale: 'none', transformOrigin: '0px 0px', visibility: 'visible' }}
      transform="matrix(1,0,0,1,-0.25744,0)"
    />
    <rect
      id="line3"
      x="44.97"
      width="6.78"
      height="32"
      strokeWidth="0"
      style={{ translate: 'none', rotate: 'none', scale: 'none', transformOrigin: '0px 0px' }}
      transform="matrix(1,0,0,1,0,0)"
    />
    <polygon
      id="angle3"
      points="57.28 0 51.75 32 58.53 32 64.06 0 57.28 0"
      strokeWidth="0"
      style={{ translate: 'none', rotate: 'none', scale: 'none', transformOrigin: '0px 0px', visibility: 'visible' }}
      transform="matrix(1,0,0,1,-0.25744,0)"
    />
  </svg>
            </a>

            {/* Navigation Items */}
            <div className="flex items-center gap-2">
                  <Link href="/Login">
              <button className="button-wrapper rounded-full font-semibold text-lg px-7 py-2 border border-black relative overflow-hidden">
                <div className="button-text-container">
                  <span className="button-text">Login</span>
                  <span className="button-text">Login</span>
                </div>
              </button>
                  </Link>
              
              <button
                onClick={() => setIsNavOpen(true)}
                className="button-wrapper rounded-full font-semibold text-lg py-1 px-1 border border-black relative overflow-hidden"
              >
                <span className="button-text"><Equal size={30} /></span>
                <span className="button-text"><Equal size={30} /></span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Navigation Modal */}
      <NavigationModal 
        isOpen={isNavOpen} 
        onClose={() => setIsNavOpen(false)} 
      />
    </>
  )
}

