"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Intro({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {showIntro ? (
       <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        >
        <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold tracking-tight"
        >
            KirimSatSet 🚀
        </motion.h1>

        <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground"
        >
            Upload cepat. Bagikan seketika.
        </motion.p>

        <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 140, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{
            duration: 0.8,
            delay: 0.4,
            }}
            className="mt-8 h-px bg-border"
        />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}