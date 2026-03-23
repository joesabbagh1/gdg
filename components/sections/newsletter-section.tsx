"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        setStatus("error");
        setMessage(payload?.error ?? "Une erreur est survenue.");
        return;
      }

      setStatus("success");
      setMessage("Merci, vous etes inscrit.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Impossible de contacter le serveur.");
    }
  }

  return (
    <section className="relative w-full px-4 py-24 bg-gradient-to-br from-[#4285F4]/5 via-[#DB4437]/5 to-[#F4B400]/5 border-t border-b border-border/50">
      <div className="container mx-auto max-w-3xl text-center">
        <div className="inline-block mb-6">
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#0F9D58]/10 to-[#0F9D58]/5 text-sm font-semibold text-[#0F9D58] border border-[#0F9D58]/20 backdrop-blur-sm">
            Newsletter
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Restez informe
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
          Inscrivez-vous a notre newsletter pour ne manquer aucun evenement.
        </p>
        <form
          className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
          onSubmit={handleSubmit}
        >
          <Input
            type="email"
            placeholder="Votre adresse email"
            className="flex-1 h-12 text-base border-2 focus:border-[#0F9D58] focus:ring-2 focus:ring-[#0F9D58]/20 rounded-xl"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Button
            type="submit"
            size="lg"
            disabled={status === "loading"}
            className="bg-gradient-to-r from-[#0F9D58] to-[#0F9D58]/90 hover:from-[#0F9D58]/90 hover:to-[#0F9D58] text-white shadow-xl hover:shadow-2xl hover:shadow-[#0F9D58]/25 px-8 whitespace-nowrap"
          >
            {status === "loading" ? "Envoi..." : "S'inscrire"}
          </Button>
        </form>
        {message ? (
          <p
            className={`mt-4 text-sm font-medium ${
              status === "error" ? "text-red-500" : "text-[#0F9D58]"
            }`}
          >
            {message}
          </p>
        ) : null}
      </div>
    </section>
  );
}
