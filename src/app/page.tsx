"use client"
import { useState } from "react"

import Providers from "@/components/Providers"
import Hero from "@/components/Hero"
import Showcase from "@/components/Showcase"

import IntroOverlay from "@/components/IntroOverlay"
import FluidBG from "@/components/FluidBG"
import RibbonParticleWave from "@/components/RibbonParticleWave"

const MY_PATH = `
M109.77,2.12L16.49,95.41s-28.37,25.77-1.98,52.16c15.41,15.41,22.4,29.73,18.66,44.86-2.73,11-6.07,13.47-8.24,16.52l-22.8,22.8,94.09-94.09s31.36-39.21,66.6-3.96c31.27,31.27-5.17,63.77-5.17,63.77l-59.31,58.88-.06.06c.06-.06,36.26-35.99,36.26-35.99,0,0,32.34-33.21,63.56-1.99,32.47,32.47-2.78,62.77-2.78,62.77l-122.62,122.62
`

export default function Page() {
  const [showIntro, setShowIntro] = useState(true)

  // // 可選：只在首次進站播放
  // useEffect(() => {
  //   const played = sessionStorage.getItem("intro-played")
  //   if (played) setShowIntro(false)
  // }, [])
  // const onFinish = () => {
  //   sessionStorage.setItem("intro-played", "1")
  //   setShowIntro(false)
  // }

  return (
    <main className="relative min-h-dvh">
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
          <section className="relative z-10">
            <Providers>
              <Hero />
              <Showcase />
            </Providers>
          </section>
        </>
      )}
    </main>
  )
}
