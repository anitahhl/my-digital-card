"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

import Link from "next/link"

import IntroOverlay from "@/components/IntroOverlay"
import FluidBG from "@/components/FluidBG"
import RibbonParticleWave from "@/components/RibbonParticleWave"

const MY_PATH = `
M109.77,2.12L16.49,95.41s-28.37,25.77-1.98,52.16c15.41,15.41,22.4,29.73,18.66,44.86-2.73,11-6.07,13.47-8.24,16.52l-22.8,22.8,94.09-94.09s31.36-39.21,66.6-3.96c31.27,31.27-5.17,63.77-5.17,63.77l-59.31,58.88-.06.06c.06-.06,36.26-35.99,36.26-35.99,0,0,32.34-33.21,63.56-1.99,32.47,32.47-2.78,62.77-2.78,62.77l-122.62,122.62
`

export default function Card000Page() {
  const [showIntro, setShowIntro] = useState(true)
  const path = usePathname()
  return (
    <main className="relative min-h-dvh isolate text-white">
        <FluidBG />
      {showIntro ? (
        <IntroOverlay
          pathD={MY_PATH}
          duration={1.4}
          meetAtProgress={0.642}
          fullscreen
          stroke="rgb(255 255 255 / 0.15)"
          strokeWidth={42}
          dotColor="#fff"
          dotRadius={20}
          onFinish={() => setShowIntro(false)}
        />
      ) : (
        <>
          <RibbonParticleWave />
      {/* 內容 */}
      <div className="relative mx-auto max-w-xl px-6 pt-12 sm:pt-24 pb-8">
        {/* 電子名片卡 */}
                 <motion.section 
             key={path}
             initial={{ opacity: 0, y: 24 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -24 }}
             transition={{ duration: 0.35, ease: "easeOut" }}
             className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl overflow-hidden"
           >
          {/* Header */}
          <div className="p-8 sm:p-10 flex items-center gap-6">
            <div className="size-16 sm:size-20 rounded-2xl grid place-items-center font-semibold text-xl">
              <img src="/images/default.png" alt="avatar" className="size-16 sm:size-20 rounded-2xl border border-white/40" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Hui-Lien Huang</h1>
              <p className="text-white/70 text-sm sm:text-base mt-1">Creative Developer</p>
              <p className="text-white/70 text-sm sm:text-base mt-0">Hsinchu</p>
            </div>
          </div>

          {/* Contact 列表 */}
          <div className="px-6 sm:px-10 pb-8 sm:pb-10 space-y-4">
            <ContactRow href="mailto:hello@example.dev" label="hello@example.dev">
              <MailIcon/>
            </ContactRow>
            <ContactRow href="tel:+886900000000" label="+886 900 000 000">
              <PhoneIcon/>
            </ContactRow>
            <ContactRow href="https://facebook.com/your.page" label="facebook.com/your.page">
              <WebsiteIcon/>
            </ContactRow>
          </div>

          {/* 快速動作 */}
          <div className="px-6 sm:px-10 pb-10 grid grid-cols-2 gap-3">
            <a
              className="flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 active:bg-white/20 px-4 py-2 text-sm"
              href="#" onClick={(e)=>{e.preventDefault(); if(navigator.share){navigator.share({title:'Example', text:'Contact', url:location.href}).catch(()=>{})}}}
            >
            Share
            </a>
            <a
              className="flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 active:bg-white/20 px-4 py-2 text-sm"
              href={vcardHref}
              download="Example.vcf"
            >
            Add vCard
            </a>
          </div>
        </motion.section>
      </div>
      <footer className="fixed bottom-0 left-0 right-0 z-10 py-8 text-center">
        <a href="/"><p className="text-white/60 text-xl font-semibold">myPDA</p></a>
      </footer>
      </>
      )}
    </main>
  )
}

/* ---- 小元件 ---- */
function ContactRow({ href, label, children }: { href: string; label: string; children: React.ReactNode }){
  const isExternal = href.startsWith("http")
  const A: any = isExternal ? "a" : Link
  const props = isExternal ? { href, target: "_blank", rel: "noopener noreferrer" } : { href }
  return (
    <A {...props} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-3 transition">
      <span className="inline-grid place-items-center size-10 rounded-lg bg-white/10 border border-white/10 text-white/90">
        {children}
      </span>
      <span className="truncate text-white/90 group-hover:text-white">{label}</span>
    </A>
  )
}

/* ---- Icons（與你先前的風格一致） ---- */
function MailIcon(){
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="style=linear"><g id="email">
      <path d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.77 7.77L13.22 12.06C12.5 12.61 11.5 12.61 10.78 12.06L5.23 7.77" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </g></g>
    </svg>
  )
}
function PhoneIcon(){
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="style=linear">
        <g id="call">
        <path id="vector" d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z" 
        stroke="currentColor" stroke-width="1.8" stroke-miterlimit="10"/>
        </g>
        </g>
    </svg>
  )
}
function WebsiteIcon(){
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 15L20 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M4 9L20 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12.0004 20.8182L11.2862 21.5181C11.4742 21.7101 11.7317 21.8182 12.0004 21.8182C12.2691 21.8182 12.5265 21.7101 12.7146 21.5181L12.0004 20.8182ZM12.0004 3.18188L12.7146 2.48198C12.5265 2.29005 12.2691 2.18188 12.0004 2.18188C11.7317 2.18188 11.4742 2.29005 11.2861 2.48198L12.0004 3.18188ZM14.6004 12.0001C14.6004 15.1611 13.3373 18.0251 11.2862 20.1183L12.7146 21.5181C15.1173 19.0662 16.6004 15.7053 16.6004 12.0001H14.6004ZM11.2861 3.88178C13.3373 5.97501 14.6004 8.83903 14.6004 12.0001H16.6004C16.6004 8.29478 15.1173 4.93389 12.7146 2.48198L11.2861 3.88178ZM9.40039 12.0001C9.40039 8.83903 10.6634 5.97501 12.7146 3.88178L11.2861 2.48198C8.88347 4.93389 7.40039 8.29478 7.40039 12.0001H9.40039ZM12.7146 20.1183C10.6634 18.0251 9.40039 15.1611 9.40039 12.0001H7.40039C7.40039 15.7053 8.88348 19.0662 11.2862 21.5181L12.7146 20.1183Z" fill="currentColor"/>
         </svg>
  )
}

// 簡單 vCard 下載（可替換內容）
const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:Example;\nFN:Example\nORG:Example Studio\nTITLE:Creative Developer\nEMAIL;TYPE=INTERNET:hello@example.dev\nTEL;TYPE=CELL:+886900000000\nURL:https://Example.dev\nADR;TYPE=WORK:;;Hsinchu;;;;\nEND:VCARD\n`
const vcardHref = `data:text/vcard;charset=utf-8,${encodeURIComponent(vcard)}`
