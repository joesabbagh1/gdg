"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Status = "idle" | "loading" | "error";

export function AdminLoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = useMemo(
    () => searchParams.get("next") ?? "/admin/events",
    [searchParams]
  );

  const [secret, setSecret] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setStatus("error");
        setMessage(data?.error ?? "Clé invalide.");
        return;
      }

      router.push(nextPath);
      router.refresh();
    } catch {
      setStatus("error");
      setMessage("Impossible de contacter le serveur.");
    } finally {
      setStatus("idle");
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-border/60 bg-background/80 p-6 shadow-lg">
      <h1 className="text-2xl font-bold mb-2">Connexion admin</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Entrez la clé admin pour accéder à la gestion des événements.
      </p>

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <Input
          type="password"
          placeholder="Clé admin"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          required
        />
        <Button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-gradient-to-r from-[#4285F4] via-[#DB4437] to-[#0F9D58] text-white shadow-lg hover:shadow-xl"
        >
          {status === "loading" ? "Connexion..." : "Se connecter"}
        </Button>
      </form>

      {message ? (
        <p className="mt-4 text-sm font-medium text-red-500">{message}</p>
      ) : null}
    </div>
  );
}

