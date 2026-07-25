import { useState } from "react";

export function Newsletter({
  title = "Stay Connected With BC",
  description = "Monthly guides, events, and stories to help you settle, grow, and invest in British Columbia.",
  compact = false,
}: {
  title?: string;
  description?: string;
  compact?: boolean;
}) {
  const [done, setDone] = useState(false);
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
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          {done ? (
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
                type="text"
                placeholder="Your name"
                className={inputCls(compact)}
              />
              <input
                required
                type="email"
                placeholder="Email address"
                className={inputCls(compact)}
              />
              <button
                type="submit"
                className={
                  compact
                    ? "h-11 rounded-full bg-primary text-primary-foreground text-sm font-medium"
                    : "h-12 rounded-full bg-accent text-accent-foreground font-medium hover:opacity-95"
                }
              >
                Subscribe
              </button>
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
