"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
// @ts-ignore
import { SimplexNoise } from "three/addons/math/SimplexNoise.js"

/**
 * RibbonParticleWave — 簡化版粒子波（透明背景）
 * - 透明背景：可疊在任意底圖
 * - 純噪聲波動，無滑鼠互動
 * - 可調粒子透明度 pointOpacity
 */
export type RibbonParticleWaveProps = {
  width?: number
  height?: number
  segX?: number
  segY?: number
  pointSize?: number
  amplitude?: number
  speed?: number
  /** 粒子顏色與透明度 */
  color?: string | number
  pointOpacity?: number // 0~1
  /** 是否固定鋪滿螢幕 */
  fullscreen?: boolean
  /** 初始旋轉 */
  rotation?: [number, number, number]
  zIndex?: number
}

export default function RibbonParticleWave({
  width = 12,
  height = 8,
  segX = 250,
  segY = 200,
  pointSize = 0.022,
  amplitude = 0.6,
  speed = 0.5,
  color = "#fff",
  pointOpacity = 0.3,
  fullscreen = true,
  rotation = [0, Math.PI / 1.5, Math.PI / 1.75], // Math.PI / 1
  zIndex = 0,
}: RibbonParticleWaveProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current!

    // Renderer（透明背景）
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    if (fullscreen) {
      renderer.domElement.style.position = "absolute"
      renderer.domElement.style.inset = "0"
    }
    mount.appendChild(renderer.domElement)

    // Scene（保持透明）
    const scene = new THREE.Scene()
    scene.background = null

    // Camera
    const camera = new THREE.PerspectiveCamera(30, mount.clientWidth / mount.clientHeight)
    camera.position.set(4, 2, 8)
    camera.lookAt(scene.position)

    // 旋轉群組
    const rotationGroup = new THREE.Group()
    scene.add(rotationGroup)

    // Geometry → Points
    const geometry = new THREE.PlaneGeometry(width, height, segX, segY)
    const pos = geometry.getAttribute("position") as THREE.BufferAttribute
    const material = new THREE.PointsMaterial({
      size: pointSize,
      color,
      sizeAttenuation: true,
      transparent: true,
      opacity: pointOpacity,
    })
    const points = new THREE.Points(geometry, material)
    rotationGroup.add(points)

    // 與 Points 同構的隱形 Mesh，用於 Raycaster 投射到平面
    const collider = new THREE.Mesh(
      geometry.clone(),
      new THREE.MeshBasicMaterial({ visible: false })
    )
    rotationGroup.add(collider)

    // 初始旋轉（世界是否轉 90° 就在這裡設定）
    rotationGroup.rotation.set(rotation[0], rotation[1], rotation[2])

    const simplex = new SimplexNoise()

    // Resize
    function onResize() {
      const w = mount.clientWidth
      const h = mount.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(onResize)
    ro.observe(mount)

    // Render loop
    let start = performance.now()
    renderer.setAnimationLoop(() => {
      const now = performance.now()
      const t = (now - start) / 1000

      // 更新頂點 Z：純噪聲波動
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i)
        const y = pos.getY(i)
        const z = amplitude * simplex.noise3d(x / 2, y / 2, t * (speed * 0.5))
        pos.setZ(i, z)
      }
      pos.needsUpdate = true

      renderer.render(scene, camera)
    })

    return () => {
      renderer.setAnimationLoop(null)
      ro.disconnect()
      material.dispose()
      geometry.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [width, height, segX, segY, pointSize, amplitude, speed, color as any, pointOpacity, fullscreen, JSON.stringify(rotation)])

  return (
    <div
      ref={mountRef}
      style={{ position: fullscreen ? "fixed" : "relative", inset: fullscreen ? 0 : undefined, width: "100%", height: "100%", zIndex }}
      aria-hidden
    />
  )
}
