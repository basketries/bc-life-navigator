import { useRef, useState, type ReactNode } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download, FileDown, Loader2 } from "lucide-react";
import logo from "@/assets/settleinbc-logo.png.asset.json";
import { activeSponsors } from "@/data/sponsors";

const SITE_URL = "https://settleinbc.com";

const MODERN_COLOR = /(oklch|oklab|lch\(|lab\(|color\()/i;

const colorCache = new Map<string, string>();

/** Resolve any CSS colour (including oklch/lab) to an rgb()/rgba() string. */
function resolveColor(value: string): string {
  const cached = colorCache.get(value);
  if (cached) return cached;
  let out = "rgba(0, 0, 0, 0)";
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (ctx) {
      ctx.fillStyle = "#000000";
      ctx.fillStyle = value;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
      const alpha = a / 255;
      out =
        alpha === 0
          ? "rgba(0, 0, 0, 0)"
          : `rgba(${Math.round(r / alpha)}, ${Math.round(g / alpha)}, ${Math.round(
              b / alpha,
            )}, ${Number(alpha.toFixed(3))})`;
    }
  } catch {
    out = "rgba(0, 0, 0, 0)";
  }
  colorCache.set(value, out);
  return out;
}

/** Rewrite any modern colour function found anywhere inside a computed value. */
function sanitizeValue(value: string): string {
  if (!value || !MODERN_COLOR.test(value)) return value;
  // Gradients / shadows can nest colours; drop what we can't safely convert.
  const single = value.trim();
  if (/^(oklch|oklab|lch|lab|color)\(/i.test(single) && single.endsWith(")")) {
    return resolveColor(single);
  }
  return value.replace(
    /(oklch|oklab|lch|lab|color)\([^()]*\)/gi,
    (match) => resolveColor(match),
  );
}

/**
 * html2canvas cannot parse modern CSS colour functions (oklch/lab/color()), which
 * every design token in this project uses. During capture we intercept
 * window.getComputedStyle and hand html2canvas rgb() equivalents instead.
 */
function patchComputedStyle() {
  const original = window.getComputedStyle.bind(window);
  const patched = (el: Element, pseudo?: string | null) => {
    const declaration = original(el, pseudo ?? undefined);
    return new Proxy(declaration, {
      get(target, prop, receiver) {
        if (prop === "getPropertyValue") {
          return (name: string) => sanitizeValue(target.getPropertyValue(name));
        }
        const value = Reflect.get(target, prop, target);
        if (typeof value === "function") return value.bind(target);
        if (typeof value === "string") return sanitizeValue(value);
        return value;
      },
    }) as CSSStyleDeclaration;
  };
  window.getComputedStyle = patched as typeof window.getComputedStyle;
  return () => {
    window.getComputedStyle = original as typeof window.getComputedStyle;
  };
}

/** Narrow viewports capture at a low pixel width, so upscale to keep text crisp. */
const EXPORT_TARGET_WIDTH = 1100;
const MAX_CAPTURE_SCALE = 3;

function captureScaleFor(width: number) {
  const dpr = window.devicePixelRatio || 1;
  const needed = width > 0 ? EXPORT_TARGET_WIDTH / width : 1;
  return Math.min(MAX_CAPTURE_SCALE, Math.max(2, dpr, needed));
}

async function captureCanvas(node: HTMLElement) {
  const { default: html2canvas } = await import("html2canvas");
  // html2canvas reads the live document's html/body background colours, which are
  // oklch tokens it cannot parse. Neutralise them for the duration of the capture.
  const roots = [document.documentElement, document.body].filter(Boolean) as HTMLElement[];
  const previous = roots.map((el) => el.style.backgroundColor);
  roots.forEach((el) => (el.style.backgroundColor = "#ffffff"));
  const restoreComputedStyle = patchComputedStyle();
  // Use the full scrollable box so nothing overflowing the viewport gets clipped.
  const width = Math.ceil(Math.max(node.scrollWidth, node.getBoundingClientRect().width));
  const height = Math.ceil(Math.max(node.scrollHeight, node.getBoundingClientRect().height));
  try {
    return await html2canvas(node, {
      backgroundColor: "#ffffff",
      scale: captureScaleFor(width),
      useCORS: true,
      logging: false,
      width,
      height,
      windowWidth: Math.max(document.documentElement.clientWidth, width),
      scrollX: 0,
      scrollY: 0,
      x: 0,
      y: 0,
    });
  } finally {
    restoreComputedStyle();
    roots.forEach((el, i) => (el.style.backgroundColor = previous[i]));
  }
}


function sanitizeFileName(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatTimestamp(date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());
  return `${yyyy}-${mm}-${dd}-${hh}${min}`;
}

function generateFileName(base: string): string {
  const clean = sanitizeFileName(base) || "settleinbc";
  return `${clean}-${formatTimestamp()}`;
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
      const downloadName = generateFileName(fileName);
      if (kind === "png") {
        const link = document.createElement("a");
        link.download = `${downloadName}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      } else {
        const { jsPDF } = await import("jspdf");
        const orientation: "landscape" | "portrait" =
          canvas.width >= canvas.height ? "landscape" : "portrait";
        const pdf = new jsPDF({ orientation, unit: "pt", format: "a4" });
        const pageW = pdf.internal.pageSize.getWidth();
        const pageH = pdf.internal.pageSize.getHeight();
        const margin = 24;
        const contentW = pageW - margin * 2;
        const contentH = pageH - margin * 2;
        // How many source pixels fit on one PDF page at the fitted scale.
        const scale = contentW / canvas.width;
        const sliceHeight = Math.floor(contentH / scale);

        if (canvas.height <= sliceHeight) {
          pdf.addImage(
            canvas.toDataURL("image/png"),
            "PNG",
            margin,
            margin,
            contentW,
            canvas.height * scale,
          );
        } else {
          const slice = document.createElement("canvas");
          slice.width = canvas.width;
          const ctx = slice.getContext("2d");
          let offset = 0;
          let first = true;
          while (offset < canvas.height) {
            const h = Math.min(sliceHeight, canvas.height - offset);
            slice.height = h;
            if (ctx) {
              ctx.fillStyle = "#ffffff";
              ctx.fillRect(0, 0, slice.width, h);
              ctx.drawImage(canvas, 0, offset, canvas.width, h, 0, 0, canvas.width, h);
            }
            if (!first) pdf.addPage();
            pdf.addImage(
              slice.toDataURL("image/png"),
              "PNG",
              margin,
              margin,
              contentW,
              h * scale,
            );
            first = false;
            offset += h;
          }
        }
        pdf.save(`${downloadName}.pdf`);
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
