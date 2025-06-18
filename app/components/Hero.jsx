"use client";

import { motion } from "motion/react";
import { PointerHighlight } from "./ui/pointer-highlight";

export default function Hero() {
  return (
    <div className="relative mx-auto mt-4 flex max-w-7xl flex-col items-center justify-center w-full">
      <div className="px-6 pt-4">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-3xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {`A marketplace built with people's generosity`
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl pt-4 text-center text-normal font-normal text-neutral-600 dark:text-neutral-400"
        >
          Got something you no longer need? <span>Share it on </span>
          <span className="text-[var(--color-primary-content)] font-bold text-xl">
            NadaMart.
          </span>
          <span className="text-[var(--color-primary-content)]">ca</span>
          <span> and</span>
          <PointerHighlight
            rectangleClassName="bg-[var(--color-primary)] dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600"
            pointerClassName="text-yellow-500 -translate-y-1.5 translate-x-1.5"
            containerClassName="inline-block"
          >
            <span className="relative z-10 text-[var(--color-primary-content)] text-[16px] lg:text-lg font-bold text-nowrap p-2">
              let your unused things find new meaning.
            </span>
          </PointerHighlight>
        </motion.div>
      </div>
    </div>
  );
}
