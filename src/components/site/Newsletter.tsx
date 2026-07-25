import { useState } from "react";
import { useSubmitLead } from "@/lib/leads/client";

export function Newsletter({
  title = "Stay Connected With BC",
  description = "Monthly guides, events, and stories to help you settle, grow, and invest in British Columbia.",
  compact = false,
}: {
  title?: string;
  description?: string;
  compact?: boolean;
}) {
  const submit = useSubmitLead();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  return (
    <section
      className={
        compact
          ? "rounded-2xl border border-border bg-card p-6"
          : "container-page my-24"
      }
    >
      <div
        className={
          compact
            ? ""
            : "rounded-3xl border border-border bg-primary text-primary-foreground p-10 md:p-14 grid gap-8 md:grid-cols-2 md:items-center"
        }
      >
        <div>
          <p
            className={
              compact ? "eyebrow mb-2" : "eyebrow mb-3 text-primary-foreground/70"
            }
          >
            Newsletter
          </p>
          <h3
            className={
              compact
                ? "text-2xl text-foreground"
                : "font-serif text-3xl md:text-4xl leading-tight"
            }
          >
            {title}
          </h3>
          <p
            className={
              compact
                ? "mt-2 text-sm text-muted-foreground"
                : "mt-3 text-primary-foreground/80 max-w-md"
            }
          >
            {description}
          </p>
        </div>
        <form
          className="grid gap-3"
          onSubmit={async (e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            setState("sending");
            setError(null);
            const res = await submit({
              source: "newsletter",
              name: String(fd.get("name") || ""),
              email: String(fd.get("email") || ""),
              consent: { marketing: true },
            });
            if (res.ok) setState("done");
            else {
              setError(res.error ?? "Something went wrong.");
              setState("error");
            }
          }}
        >
          {state === "done" ? (
            <p
              className={
                compact
                  ? "text-sm text-primary"
                  : "text-primary-foreground bg-primary-foreground/10 rounded-xl p-4"
              }
            >
              Thanks — you&rsquo;re on the list. We&rsquo;ll be in touch.
            </p>
          ) : (
            <>
              <input
                required
                name="name"
                type="text"
                placeholder="Your name"
                className={inputCls(compact)}
              />
              <input
                required
                name="email"
                type="email"
                placeholder="Email address"
                className={inputCls(compact)}
              />
              <button
                type="submit"
                disabled={state === "sending"}
                className={
                  compact
                    ? "h-11 rounded-full bg-primary text-primary-foreground text-sm font-medium disabled:opacity-60"
                    : "h-12 rounded-full bg-accent text-accent-foreground font-medium hover:opacity-95 disabled:opacity-60"
                }
              >
                {state === "sending" ? "Subscribing…" : "Subscribe"}
              </button>
              {error && (
                <p className={compact ? "text-sm text-destructive" : "text-sm text-primary-foreground/90"}>
                  {error}
                </p>
              )}
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function inputCls(compact: boolean) {
  return compact
    ? "h-11 rounded-lg border border-input bg-background px-3 text-sm"
    : "h-12 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 px-4 focus:outline-none focus:ring-2 focus:ring-primary-foreground/40";
}
