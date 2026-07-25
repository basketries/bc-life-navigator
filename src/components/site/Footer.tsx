import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container-page py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground font-serif text-lg">
              S
            </span>
            <span className="font-serif text-lg tracking-tight">
              SettleIn<span className="text-accent">BC</span>
            </span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Helping you settle, grow &amp; invest in British Columbia — with education,
            trusted guidance, and community.
          </p>
        </div>

        <FooterCol
          title="Services"
          links={[
            { to: "/services/buy-your-home", label: "Buy Your Home" },
            { to: "/services/finance-your-home", label: "Finance Your Home" },
            { to: "/services/protect-your-family", label: "Protect Your Family" },
            { to: "/services/plan-your-future", label: "Plan Your Future" },
            { to: "/services/build-wealth", label: "Build Wealth" },
          ]}
        />
        <FooterCol
          title="Explore"
          links={[
            { to: "/resources", label: "Resources" },
            { to: "/resources/guides", label: "Guides" },
            { to: "/resources/articles", label: "Articles" },
            { to: "/community", label: "Community" },
            { to: "/community/events", label: "Events" },
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            { to: "/about", label: "About" },
            { to: "/consultation", label: "Book a Consultation" },
            { to: "/contact", label: "Contact" },
          ]}
        />
      </div>
      <div className="border-t border-border">
        <div className="container-page py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} SettleInBC. All rights reserved.</p>
          <p>
            Partner brands:{" "}
            <span className="text-foreground">Dwello.ca</span> ·{" "}
            <span className="text-foreground">BCVoice.ca</span>{" "}
            <span className="opacity-70">(independent community media)</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { to: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-foreground font-sans">{title}</h4>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
