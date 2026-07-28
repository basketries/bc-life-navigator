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
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string }>({});



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
          noValidate
          onSubmit={async (e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const name = String(fd.get("name") || "").trim();
            const email = String(fd.get("email") || "").trim();

            const errs: { name?: string; email?: string } = {};
            if (!name) errs.name = "Please enter your name.";
            else if (name.length > 100) errs.name = "Name must be under 100 characters.";
            if (!email) errs.email = "Please enter your email address.";
            else if (!EMAIL_RE.test(email)) errs.email = "Please enter a valid email address.";
            else if (email.length > 255) errs.email = "Email must be under 255 characters.";

            setFieldErrors(errs);
            if (Object.keys(errs).length > 0) {
              setState("idle");
              setError(null);
              return;
            }

            setState("sending");
            setError(null);
            const res = await submit({
              source: "newsletter",
              name,
              email,
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
              <div className="grid gap-1">
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Your name"
                  aria-label="Your name"
                  aria-invalid={!!fieldErrors.name}
                  aria-describedby={fieldErrors.name ? "newsletter-name-error" : undefined}
                  onChange={() => setFieldErrors((p) => ({ ...p, name: undefined }))}
                  className={inputCls(compact, !!fieldErrors.name)}
                />
                {fieldErrors.name && (
                  <p id="newsletter-name-error" role="alert" className={errCls(compact)}>
                    {fieldErrors.name}
                  </p>
                )}
              </div>
              <div className="grid gap-1">
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="Email address"
                  aria-label="Email address"
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? "newsletter-email-error" : undefined}
                  onChange={() => setFieldErrors((p) => ({ ...p, email: undefined }))}
                  className={inputCls(compact, !!fieldErrors.email)}
                />
                {fieldErrors.email && (
                  <p id="newsletter-email-error" role="alert" className={errCls(compact)}>
                    {fieldErrors.email}
                  </p>
                )}
              </div>

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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function inputCls(compact: boolean, invalid = false) {
  const base = compact
    ? "h-11 rounded-lg border bg-background px-3 text-sm"
    : "h-12 rounded-lg bg-primary-foreground/10 border text-primary-foreground placeholder:text-primary-foreground/60 px-4 focus:outline-none focus:ring-2 focus:ring-primary-foreground/40";
  const border = invalid
    ? compact
      ? "border-destructive"
      : "border-destructive-foreground/70"
    : compact
      ? "border-input"
      : "border-primary-foreground/20";
  return `${base} ${border} w-full`;
}

function errCls(compact: boolean) {
  return compact
    ? "text-xs text-destructive"
    : "text-xs text-primary-foreground/90 font-medium";
}

