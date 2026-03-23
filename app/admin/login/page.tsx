import { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AdminLoginClient } from "./login-client";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-background to-muted/20">
      <Navbar />

      <main className="container mx-auto px-4 py-16 flex-1">
        <Suspense fallback={<div className="mx-auto max-w-md rounded-3xl border border-border/60 bg-background/80 p-6 shadow-lg">Chargement...</div>}>
          <AdminLoginClient />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

