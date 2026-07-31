import { useRef, useState, type ReactNode } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download, FileDown, Loader2 } from "lucide-react";
import logo from "@/assets/settleinbc-logo.png.asset.json";
import { activeSponsors } from "@/data/sponsors";

const SITE_URL = "https://settleinbc.com";

const COLOR_PROPS = [
  "color",
  "backgroundColor",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor",
  "outlineColor",
  "textDecorationColor",
  "fill",
  "stroke",
  "caretColor",
] as const;

/**
 * html2canvas cannot parse modern CSS colour functions (oklch/lab/color()).
 * The site's design tokens are oklch, so before capture we resolve every
 * computed colour to an rgb() string on the cloned DOM.
 */
function normalizeColors(root: HTMLElement) {
  const doc = root.ownerDocument;
  const win = doc.defaultView;
  if (!win) return;
  console.log("[export] normalizeColors running", !!doc.defaultView, doc.body && getComputedStyle(doc.body).backgroundColor);
  const canvas = doc.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const probe = canvas.getContext("2d", { willReadFrequently: true });
  const cache = new Map<string, string | null>();

  const toRgb = (value: string): string | null => {
    if (!value || !/(oklch|oklab|lch\(|lab\(|color\()/i.test(value)) return null;
    if (cache.has(value)) return cache.get(value)!;
    let out: string | null = null;
    if (probe) {
      try {
        probe.clearRect(0, 0, 1, 1);
        probe.fillStyle = "#000000";
        probe.fillStyle = value;
        probe.fillRect(0, 0, 1, 1);
        const [r, g, b, a] = probe.getImageData(0, 0, 1, 1).data;
        // fillRect composites over transparent black, so recover the source alpha.
        const alpha = a / 255;
        out =
          alpha === 0
            ? "rgba(0, 0, 0, 0)"
            : `rgba(${Math.round(r / alpha)}, ${Math.round(g / alpha)}, ${Math.round(
                b / alpha,
              )}, ${Number(alpha.toFixed(3))})`;
      } catch {
        out = null;
      }
    }
    cache.set(value, out);
    return out;
  };

  const fix = (el: HTMLElement) => {
    const computed = win.getComputedStyle(el);
    for (const prop of COLOR_PROPS) {
      const converted = toRgb(computed[prop] as string);
      if (converted) el.style.setProperty(hyphenate(prop), converted);
    }
    if (/(oklch|oklab|lch\(|lab\()/i.test(computed.backgroundImage)) {
      el.style.backgroundImage = "none";
    }
    if (/(oklch|oklab|lch\(|lab\()/i.test(computed.boxShadow)) {
      el.style.boxShadow = "none";
    }
  };

  for (const el of [doc.documentElement, doc.body]) {
    if (!el) continue;
    fix(el);
    // Belt and braces: html2canvas always parses these two backgrounds.
    el.style.setProperty("background-color", "#ffffff", "important");
    el.style.setProperty("background-image", "none", "important");
  }
  fix(root);
  root.querySelectorAll<HTMLElement>("*").forEach(fix);

}

const hyphenate = (s: string) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

async function captureCanvas(node: HTMLElement) {
  const { default: html2canvas } = await import("html2canvas");
  // html2canvas reads the live document's html/body background colours, which are
  // oklch tokens it cannot parse. Neutralise them for the duration of the capture.
  const roots = [document.documentElement, document.body].filter(Boolean) as HTMLElement[];
  const previous = roots.map((el) => el.style.backgroundColor);
  roots.forEach((el) => (el.style.backgroundColor = "#ffffff"));
  try {
    return await html2canvas(node, {
      backgroundColor: "#ffffff",
      scale: Math.min(window.devicePixelRatio || 1, 2),
      useCORS: true,
      logging: false,
      onclone: (_doc, element) => normalizeColors(element as HTMLElement),
    });
  } finally {
    roots.forEach((el, i) => (el.style.backgroundColor = previous[i]));
  }
}



export function BrandedExport({
  children,
  fileName = "settleinbc",
  title,
  className,
}: {
  children: ReactNode;
  fileName?: string;
  title?: string;
  className?: string;
}) {
  const areaRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState<"png" | "pdf" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async (kind: "png" | "pdf") => {
    if (!areaRef.current || busy) return;
    setBusy(kind);
    setError(null);
    try {
      const canvas = await captureCanvas(areaRef.current);
      if (kind === "png") {
        const link = document.createElement("a");
        link.download = `${fileName}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      } else {
        const { jsPDF } = await import("jspdf");
        const orientation: "landscape" | "portrait" =
          canvas.width >= canvas.height ? "landscape" : "portrait";
        const pdf = new jsPDF({
          orientation,
          unit: "px",
          format: [canvas.width, canvas.height],
        });

        pdf.addImage(
          canvas.toDataURL("image/png"),
          "PNG",
          0,
          0,
          canvas.width,
          canvas.height,
        );
        pdf.save(`${fileName}.pdf`);
      }
    } catch (e) {
      console.error("Branded export failed", e);
      setError("We couldn't generate that download. Please try again.");
    } finally {
      setBusy(null);
    }
  };

  const sponsors = activeSponsors();

  return (
    <div className={className}>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => run("png")}
          disabled={busy !== null}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-95 disabled:opacity-60"
        >
          {busy === "png" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {busy === "png" ? "Preparing image…" : "Download as PNG"}
        </button>
        <button
          type="button"
          onClick={() => run("pdf")}
          disabled={busy !== null}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 disabled:opacity-60"
        >
          {busy === "pdf" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <FileDown className="h-4 w-4" />
          )}
          {busy === "pdf" ? "Building PDF…" : "Download as PDF"}
        </button>
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>

      <div ref={areaRef} className="rounded-3xl bg-background p-4 md:p-6">
        {children}

        <footer className="mt-8 rounded-2xl border border-border bg-card px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src={logo.url}
                alt="SettleInBC"
                className="h-10 w-auto"
                crossOrigin="anonymous"
              />
              <div>
                <p className="text-sm text-foreground">SettleInBC</p>
                <p className="text-xs text-muted-foreground">
                  {title ?? "Helping you settle, grow & invest in British Columbia."}
                </p>
              </div>
            </div>

            {sponsors.length > 0 && (
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  With support from
                </span>
                {sponsors.map((s) => (
                  <a
                    key={s.id}
                    href={s.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="shrink-0"
                  >
                    <img
                      src={s.logoUrl}
                      alt={s.name}
                      className="h-8 w-auto"
                      crossOrigin="anonymous"
                    />
                  </a>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3">
              <QRCodeCanvas value={SITE_URL} size={64} level="M" includeMargin={false} />
              <p className="text-xs text-muted-foreground">
                Scan to explore
                <br />
                settleinbc.com
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
