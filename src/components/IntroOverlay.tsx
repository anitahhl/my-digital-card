"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
gsap.registerPlugin(MotionPathPlugin)

type Props = {
  /** 你的 SVG path d（任意曲線/折線） */
  pathD: string
  /** 總動畫秒數（只影響「跑線＋描線」段） */
  duration?: number
  /** 兩端會合位置 0~1（預設 0.5 = 路徑中點） */
  meetAtProgress?: number
  /** 是否滿版鋪滿畫面（否則就依容器大小） */
  fullscreen?: boolean
  /** 畫線外觀 */
  stroke?: string
  strokeWidth?: number
  /** 光球外觀 */
  dotColor?: string
  dotRadius?: number
  /** 光球是否沿切線旋轉（對非圓形標記時有用） */
  alignTangent?: boolean
  /** 自動置中等比縮放 path 到視框 */
  autoFit?: boolean

  onFinish?: () => void        // 換頁/卸載 overlay 的 callback
  // 覆蓋轉場
  coverColor?: string          // 圓球放大時的純色（建議填「首頁背景色」）
  coverGrowDuration?: number   // 圓球放大秒數
  fadeOutDuration?: number     // 圓球蓋滿後淡出 overlay 秒數
}

export default function IntroOverlay({
  pathD,
  duration = 3,
  meetAtProgress = 0.5,
  fullscreen = true,
  stroke = "#a3e7ff",
  strokeWidth = 10,
  dotColor = "#18dcd6",
  dotRadius = 12,
  alignTangent = false,
  autoFit = true,
  onFinish,
  coverColor = "#fff",
  coverGrowDuration = 0.8,
  fadeOutDuration = 0.35,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const svgRef  = useRef<SVGSVGElement>(null)
  const gFitRef = useRef<SVGGElement>(null)

  const pathRef = useRef<SVGPathElement>(null)   // 隱形跑道（只拿來量長/跑點）
  const drawARef = useRef<SVGPathElement>(null)  // 可見：起點→會合
  const drawBRef = useRef<SVGPathElement>(null)  // 可見：終點→會合
  const dotARef  = useRef<SVGCircleElement>(null)
  const dotBRef  = useRef<SVGCircleElement>(null)


  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // 先隱藏整組 <g>，避免還沒量好就閃一下
    gsap.set(gFitRef.current, { visibility: "hidden" })

    // 自動置中/等比縮放到視框 70%
    if (autoFit && pathRef.current && gFitRef.current && svgRef.current) {
      const vb = svgRef.current.viewBox.baseVal // 0 0 1000 1000
      gFitRef.current.removeAttribute("transform")
      const bbox = pathRef.current.getBBox()
      const target = Math.min(vb.width, vb.height) * 0.60
      const scale = Math.min(target / (bbox.width || 1), target / (bbox.height || 1)) || 1
      const cx = bbox.x + bbox.width / 2
      const cy = bbox.y + bbox.height / 2
      const tx = vb.x + vb.width / 2 - cx * scale
      const ty = vb.y + vb.height / 2 - cy * scale
      gFitRef.current.setAttribute("transform", `translate(${tx},${ty}) scale(${scale})`)

      gsap.set(gFitRef.current, { visibility: "visible" })
    }

    if (prefersReduced) {
        onFinish?.()
        return
    }

    const path = pathRef.current!
    const meet = Math.max(0, Math.min(1, meetAtProgress))

    // 主 path 透明，只作跑點依據
    gsap.set(path, { opacity: 0, attr: { pathLength: 1 } })

    // 可見描線 path：用 pathLength=1，dash 使用 0~1 正規化表示
    gsap.set([drawARef.current, drawBRef.current], {
      attr: { pathLength: 1, "stroke-dasharray": "0 1", "stroke-dashoffset": 0 },
    })

    // 動畫主軸
    const travel = Math.max(0.6, duration) // 確保不為 0
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
    })

    // 兩端光球 → 會合比例
    tl.to(dotARef.current, {
      duration: travel,
      motionPath: { path, align: alignTangent ? path : undefined, start: 0, end: meet, autoRotate: alignTangent },
    }, 0)

    tl.to(dotBRef.current, {
      duration: travel,
      motionPath: { path, align: alignTangent ? path : undefined, start: 1, end: meet, autoRotate: alignTangent },
    }, 0)

    // 同步描線：從兩端往中間長出
    tl.to(drawARef.current, {
      duration: travel,
      attr: { "stroke-dasharray": `${meet} 1` }, // 0→meet 的可見段
    }, 0)

    const dashArrayNum = 1 - meetAtProgress
    tl.to(drawBRef.current, {
      duration: travel,
      attr: {
        "stroke-dasharray": `${meet} ${dashArrayNum}`,  // 尾端可見長度
        "stroke-dashoffset": 1 - meet,    // 把可見段推到路徑尾端，往中間增長
      },
    }, 0)

    // 會合之後：用 dotA 當「轉場遮罩」放大到滿版
    tl.addLabel("coverStart", travel)
    // 隱藏另一顆（避免兩顆一起變大）
    tl.set(dotBRef.current, { opacity: 0 }, "coverStart")
    // 把 dotA 改成純色（避免漸層透明漏底）
    tl.set(dotARef.current, { fill: coverColor }, "coverStart")

    // 計算一個足夠大的 r（viewBox 1000x1000，取 1400 幾乎都能蓋滿）
    const coverR = 1400

    // 放大到滿版
    tl.to(dotARef.current, {
      duration: coverGrowDuration,
      attr: { r: coverR },
      ease: "power3.inOut",
    }, "coverStart")

    // 圓球已蓋滿 → 卸載 overlay（或先把 overlay 淡出到 0）
    tl.to(wrapRef.current, {
      duration: fadeOutDuration,
      opacity: 0,
      ease: "power2.out",
      onComplete: onFinish,
    }, `coverStart+=${coverGrowDuration - 0.1}`) // 接近放大結束時淡出

    return () => {
        tl.kill()
      }
  }, [pathD, duration, meetAtProgress, alignTangent, autoFit])

  return (
    <div
      ref={wrapRef}
      className={fullscreen ? "fixed inset-0 z-[999]" : "relative w-full h-full"}
      style={{ background: "transparent"}}
      aria-hidden
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1000 1000"
        className={fullscreen ? "w-screen h-screen" : "w-full h-full"}
        preserveAspectRatio={fullscreen ? "xMidYMid slice" : "xMidYMid meet"}
      >
        <defs>
            {/* 讓路徑有柔和外光 */}
            <filter id="pathGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
            <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
            </filter>

            {/* 讓圓球有更明顯的外光 */}
            <filter id="dotGlow" x="-75%" y="-75%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
            <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
            </filter>

            {/* 圓球本身用漸層讓中心更亮 */}
            <radialGradient id="dotGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor={dotColor} stopOpacity="0.25" />
            <stop offset="60%" stopColor={dotColor} stopOpacity="0.45" />
            <stop offset="100%" stopColor={dotColor} stopOpacity="1" />
            </radialGradient>
        </defs>
  
        <g ref={gFitRef} style={{ visibility: "hidden" }}>
          {/* 隱形跑道 */}
          <path ref={pathRef} d={pathD} fill="none" stroke="transparent" strokeWidth={strokeWidth} pathLength={1}/>

          {/* 從起點→會合 的可見描線 */}
          <path
            ref={drawARef}
            d={pathD}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#pathGlow)"
            pathLength={1}
            opacity={1}
          />

          {/* 從終點→會合 的可見描線（用 dashoffset 推到尾端） */}
          <path
            ref={drawBRef}
            d={pathD}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#pathGlow)"
            pathLength={1}
            opacity={1}
          />

          {/* 兩顆描線的圓球 */}
          <circle ref={dotARef} r={dotRadius} fill="url(#dotGrad)" filter="url(#dotGlow)"/>
          <circle ref={dotBRef} r={dotRadius} fill="url(#dotGrad)" filter="url(#dotGlow)"/>
        </g>
      </svg>
    </div>
  )
}
