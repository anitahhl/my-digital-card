"use client"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import React from "react"

export default function Providers({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={path}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="min-h-dvh"
      >
        <Nav />
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

function Nav() {
  return (
    <nav className="max-w-6xl mx-auto px-6 py-6 flex justify-between">
      <div className="flex flex-col gap-4 items-center">

        <a href="https://www.mypda.ai" className="block w-fit h-fit m-1">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 17V11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <circle cx="1" cy="1" r="1.2" transform="matrix(1 0 0 -1 11 9)" fill="currentColor"/>
        <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
        </a>

        <a href="mailto:" className="block w-fit h-fit m-1">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="style=linear">
        <g id="email">
        <path id="vector" d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z" stroke="currentColor" stroke-width="1.8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path id="vector_2" d="M18.7698 7.7688L13.2228 12.0551C12.5025 12.6116 11.4973 12.6116 10.777 12.0551L5.22998 7.7688" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </g>
        </g>
        </svg>
        </a>

        <a href="tell:" className="block w-fit h-fit m-1">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="style=linear">
        <g id="call">
        <path id="vector" d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z" 
        stroke="currentColor" stroke-width="1.8" stroke-miterlimit="10"/>
        </g>
        </g>
        </svg>
        </a>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <a href="https://www.facebook.com/Myllm.tw" className="block w-fit h-fit m-1" aria-label="Logo 2">
        <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22,3V21a1,1,0,0,1-1,1H15.8V14.255h2.6l.39-3.018H15.8V9.309c0-.874.242-1.469,1.5-1.469h1.6V5.14a21.311,21.311,0,0,0-2.329-.119A3.636,3.636,0,0,0,12.683,9.01v2.227H10.076v3.018h2.607V22H3a1,1,0,0,1-1-1V3A1,1,0,0,1,3,2H21A1,1,0,0,1,22,3Z"/></svg>
        </a>
        
        <a href="https://www.instagram.com/myllm.tw" className="block w-fit h-fit m-1" aria-label="Logo 3">
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 448 512" 
            width="24" 
            height="24" 
            fill="currentColor"
          >
            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9 
                    0 63.6 51.3 114.9 114.9 114.9 
                    63.6 0 114.9-51.3 114.9-114.9 
                    0-63.6-51.3-114.9-114.9-114.9zm0 189.6
                    c-41.3 0-74.7-33.4-74.7-74.7 
                    0-41.3 33.4-74.7 74.7-74.7 
                    41.3 0 74.7 33.4 74.7 74.7 
                    0 41.3-33.4 74.7-74.7 74.7zm146.4-194.3
                    c0 14.9-12 26.8-26.8 26.8 
                    -14.9 0-26.8-12-26.8-26.8 
                    0-14.9 12-26.8 26.8-26.8 
                    14.8 0 26.8 12 26.8 26.8zm76.1 27.2
                    c-1.7-35.9-9.9-67.7-36.2-93.9
                    -26.2-26.2-58-34.4-93.9-36.2
                    -37-2.1-147.9-2.1-184.9 0
                    -35.8 1.7-67.6 9.9-93.9 36.2
                    -26.2 26.2-34.4 58-36.2 93.9
                    -2.1 37-2.1 147.9 0 184.9
                    1.7 35.9 9.9 67.7 36.2 93.9
                    26.2 26.2 58 34.4 93.9 36.2
                    37 2.1 147.9 2.1 184.9 0
                    35.9-1.7 67.7-9.9 93.9-36.2
                    26.2-26.2 34.4-58 36.2-93.9
                    2.1-37 2.1-147.8 0-184.8zM398.8 388
                    c-7.8 19.6-22.9 34.7-42.6 42.6
                    -29.5 11.7-99.5 9-132.1 9
                    -32.6 0-102.7 2.6-132.1-9
                    -19.6-7.8-34.7-22.9-42.6-42.6
                    -11.7-29.5-9-99.5-9-132.1
                    0-32.6-2.6-102.7 9-132.1
                    7.8-19.6 22.9-34.7 42.6-42.6
                    29.5-11.7 99.5-9 132.1-9
                    32.6 0 102.7-2.6 132.1 9
                    19.6 7.8 34.7 22.9 42.6 42.6
                    11.7 29.5 9 99.5 9 132.1
                    0 32.6 2.7 102.7-9 132.1z"/>
          </svg>

        </a>
      </div>
    </nav>
  )
}
