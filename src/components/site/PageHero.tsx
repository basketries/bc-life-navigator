import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border bg-secondary/30">
      <div className="container-page py-16 md:py-24 max-w-3xl">
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <h1 className="text-4xl md:text-5xl leading-[1.05] text-foreground">{title}</h1>
        {description && (
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl">{description}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
