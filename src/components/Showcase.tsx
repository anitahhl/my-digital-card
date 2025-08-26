"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

export default function Showcase() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".info-card", {
        opacity: 0, y: 24, duration: 0.6, stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: "top 80%" }
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="max-w-6xl mx-auto px-6 pt-20 grid md:grid-cols-2 md:gap-80">
      <div key="1" className="info-card md:p-6 p-2">
        <p className="text-slate-300 text-sm mt-1">myPDA 是一套全地端 GenAI 系統平台，另有提供雲地整合服務，滿足不同產業在資料隱私、運算資源與落地應用上的需求。從個人電腦至企業級 GPU 伺服器等多樣化環境，全面掌控資料與運算資源。</p>
      </div>
      <div key="2" className="info-card md:p-6 p-2">
        <p className="text-slate-300 text-sm mt-1">myPDA 能廣泛應用於工程、醫療、商業、智慧製造及通用領域，協助用戶建立專業數位分身，將專業知識轉化為可操作的 AI 智慧代理，落實企業 GenAI 轉型。</p>
      </div>
    </section>
  )
}
