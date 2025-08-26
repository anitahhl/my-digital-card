"use client"
import { motion, useReducedMotion } from "framer-motion"

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const fadeUp = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 12 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }
  return (
    <header className="grid place-items-center py-24 pt-36 text-center">
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-5xl md:text-6xl font-extrabold tracking-tight"
      >
        myPDA
      </motion.h1>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.1 }}
        className="mt-6 text-lg text-slate-300 max-w-prose px-6"
      >
        </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="search flex gap-3"
      >
        <button className="w-80 px-5 py-2.5 text-sm">
          BUSINESS CARD
        </button>
      </motion.div>
      
    </header>
  )
}
