"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/admin", label: "Admin Portal" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-6">
      <nav
        className={`max-w-4xl mx-auto rounded-full transition-all duration-300 transform-gpu [backface-visibility:hidden] ${
          scrolled ? "bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" : "bg-transparent"
        }`}
      >
        <div className="px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Logo />
            <span className="font-heading font-bold text-xl tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              CivicPulse <span className="text-gradient">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors ${
                      isActive ? "text-white font-semibold" : "text-slate-400 hover:text-cyan-400"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <Link href="/report" tabIndex={-1}>
              <Button size="sm">Launch App →</Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex flex-col p-6 transform-gpu [backface-visibility:hidden]"
          >
            <div className="flex justify-end mb-8">
              <button
                className="text-white p-2"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col items-center gap-8 text-2xl font-heading font-bold">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={pathname === link.href ? "text-cyan-400" : "text-white"}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-8">
                <Link href="/report" onClick={() => setIsMobileMenuOpen(false)} tabIndex={-1}>
                  <Button size="lg">Launch App →</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
