"use client";
import React from "react";
import { motion } from "motion/react";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import Button from "./common/Button";
import Logo from "./common/Logo";

export default function ErrorPage({
  message = "An unexpected error occurred. Please try again or contact support if the problem persists.",
  retry,
}: {
  message?: string;
  retry?: () => void;
}) {
  return (
    <section className=" col-center w-full h-screen fixed inset-0 z-60 bg-white overflow-hidden font-sans">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-danger/5 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="col-center z-10 p-8 max-w-lg text-center"
      >
        <div className="mb-10">
          <Logo />
        </div>

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-6 flex-center w-24 h-24 rounded-full bg-danger/10 text-danger"
        >
          <Icon icon={ICON.ALERT} fontSize={48} />
        </motion.div>

        <h1 className="text-3xl font-bold text-dark mb-4 tracking-tight">
          Oops! Something went wrong
        </h1>

        <p className="text-grey-dark text-base mb-10 leading-relaxed px-4">
          {message}
        </p>

        <div className="flex-center gap-4 w-full">
          {retry && (
            <Button
              config={{
                onClick: retry,
              }}
              variants="outlined"
          
            >
              Try Again
            </Button>
          )}

          <Button
            link
            href="/"
            variants="primary"
          >
            Back to Home
          </Button>
        </div>
      </motion.div>

      {/* Subtle Footer or Branding */}
      <footer className="absolute bottom-8 text-placeholder text-xs font-medium uppercase tracking-widest">
        &copy; {new Date().getFullYear()} CareBond Infrastructure
      </footer>
    </section>
  );
}
