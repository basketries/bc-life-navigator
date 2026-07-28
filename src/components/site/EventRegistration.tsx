import { useState } from "react";
import { useSubmitLead } from "@/lib/leads/client";

export function EventRegistration({
  eventId,
  eventTitle,
  compact = false,
}: {
  eventId: string;
  eventTitle: string;
  compact?: boolean;
}) {
  const submit = useSubmitLead();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className={compact ? "grid gap-3" : "grid gap-4 rounded-2xl border border-border bg-card p-6"}
      onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        setState("sending");
        setError(null);
        const res = await submit({
          source: "event_registration",
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          phone: String(fd.get("phone") || "") || undefined,
          engagement: {
            eventRegistered: eventId,
            message: String(fd.get("message") || "") || undefined,
          },
        });
        if (res.ok) setState("done");
        else {
          setError(res.error ?? "Something went wrong.");
          setState("error");
        }
      }}
    >
      {state === "done" ? (
        <div>
          <p className="eyebrow">You&rsquo;re registered</p>
          <p className="mt-1 text-sm text-muted-foreground">
            We&rsquo;ll send details for “{eventTitle}” to your inbox.
          </p>
        </div>
      ) : (
        <>
          {!compact && (
            <div>
              <p className="eyebrow">Register</p>
              <h4 className="mt-1 font-serif text-xl text-foreground">{eventTitle}</h4>
            </div>
          )}
          <input required name="name" placeholder="Your name" className="h-11 rounded-lg border border-input bg-background px-3 text-sm" />
          <input required name="email" type="email" placeholder="Email" className="h-11 rounded-lg border border-input bg-background px-3 text-sm" />
          <input required name="phone" placeholder="Phone" className="h-11 rounded-lg border border-input bg-background px-3 text-sm" />
          <textarea required name="message" rows={3} placeholder="Tell us more about what you'd like to know." className="rounded-lg border border-input bg-background px-3 py-2 text-sm resize-none" />
          <button
            disabled={state === "sending"}
            className="h-11 rounded-full bg-primary text-primary-foreground text-sm font-medium disabled:opacity-60"
          >
            {state === "sending" ? "Registering…" : "Save my spot"}
          </button>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </>
      )}
    </form>
  );
}
