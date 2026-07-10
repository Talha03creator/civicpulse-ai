import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <header className="p-6">
        <Link href="/">
          <Logo />
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center py-20">
        <Container className="text-center">
          <h1 className="text-7xl md:text-9xl font-heading font-bold text-primary/20 mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-6">Page Not Found</h2>
          <p className="text-lg text-text-secondary mb-10 max-w-md mx-auto">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <Link href="/">
            <Button size="lg">Back to Home</Button>
          </Link>
        </Container>
      </main>
    </div>
  );
}
