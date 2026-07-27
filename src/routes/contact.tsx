import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Mail, MessageCircle, Calendar } from "lucide-react";
import { useState } from "react";
import { useSubmitLead } from "@/lib/leads/client";
import { RevealGroup } from "@/components/site/RevealGroup";


export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SettleInBC — We'd Love to Hear From You" },
      {
        name: "description",
        content:
          "Get in touch with the SettleInBC team. Questions about moving to BC, buying a home, or planning your future — we're here to help.",
      },
      { property: "og:title", content: "Contact SettleInBC" },
      { property: "og:description", content: "Reach the SettleInBC team." },
      { property: "og:url", content: "https://settleinbc.com/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const submit = useSubmitLead();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  return (
    <RevealGroup>
      <PageHero
        eyebrow="Contact"
        title="Talk to a real person about your BC journey."
        description="Whether you have a quick question or want to plan your next step, we're happy to help — no pressure, no sales pitch."
      />

      <section className="container-page my-20 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-4">
          <InfoCard
            icon={<Mail className="h-5 w-5" />}
            title="Email us"
            body="settleinbc@gmail.com"
          />
          <InfoCard
            icon={<MessageCircle className="h-5 w-5" />}
            title="Ask a question"
            body="Use the form and we'll reply within one business day."
          />
          <Link to="/consultation" className="block">
            <div className="rounded-2xl border border-border bg-primary text-primary-foreground p-5">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5" />
                <div>
                  <p className="text-sm font-medium">Prefer a call?</p>
                  <p className="text-sm opacity-80">Book a free consultation →</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <form
          className="rounded-3xl border border-border bg-card p-8"
          onSubmit={async (e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            setState("sending");
            setError(null);
            const res = await submit({
              source: "contact_form",
              name: String(fd.get("name") || ""),
              email: String(fd.get("email") || ""),
              phone: String(fd.get("phone") || "") || undefined,
              engagement: { message: String(fd.get("message") || "") || undefined },
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
              <p className="eyebrow">Thanks</p>
              <h3 className="mt-2 font-serif text-2xl">We&rsquo;ll be in touch soon.</h3>
            </div>
          ) : (
            <div className="grid gap-4">
              <Field label="Your name">
                <input required name="name" className="input" />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Email">
                  <input required name="email" type="email" className="input" />
                </Field>
                <Field label="Phone (optional)">
                  <input name="phone" className="input" />
                </Field>
              </div>
              <Field label="How can we help?">
                <textarea required name="message" rows={5} className="input py-3 resize-none" />
              </Field>
              <button
                disabled={state === "sending"}
                className="mt-2 h-12 rounded-full bg-primary text-primary-foreground text-sm font-medium disabled:opacity-60"
              >
                {state === "sending" ? "Sending…" : "Send message"}
              </button>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
          )}
        </form>
      </section>

      <style>{`.input{height:2.75rem;border-radius:.5rem;border:1px solid var(--color-input);background:var(--color-background);padding:0 .75rem;font-size:.9rem;width:100%}.input:focus{outline:2px solid var(--color-ring);outline-offset:2px}`}</style>
    </RevealGroup>
  );
}


function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm text-foreground font-medium">{label}</span>
      {children}
    </label>
  );
}

function InfoCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex items-start gap-4">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground mt-0.5">{body}</p>
      </div>
    </div>
  );
}
