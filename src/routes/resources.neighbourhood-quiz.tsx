import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { RevealGroup } from "@/components/site/RevealGroup";
import { cities, type City } from "@/data/cities";
import { useSubmitLead } from "@/lib/leads/client";
import { ArrowLeft, ArrowRight, MapPin, RotateCcw, Sparkles } from "lucide-react";

export const Route = createFileRoute("/resources/neighbourhood-quiz")({
  head: () => ({
    meta: [
      { title: "Where in BC Should You Live? — SettleInBC Quiz" },
      {
        name: "description",
        content:
          "Answer five quick questions about budget, lifestyle, priorities, and work to see which British Columbia communities fit you best.",
      },
      { property: "og:title", content: "Where in BC Should You Live?" },
      {
        property: "og:description",
        content:
          "A short quiz that matches your budget, lifestyle, and priorities to BC communities worth exploring.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://settleinbc.com/resources/neighbourhood-quiz" },
    ],
    links: [{ rel: "canonical", href: "/resources/neighbourhood-quiz" }],
  }),
  component: NeighbourhoodQuiz,
});

type QuestionId = "budget" | "lifestyle" | "priority" | "work" | "household";
type Answers = Partial<Record<QuestionId, string>>;

interface Question {
  id: QuestionId;
  title: string;
  help: string;
  options: { value: string; label: string; hint?: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: "budget",
    title: "What monthly housing budget are you working with?",
    help: "A rough range is fine — it just helps us weigh affordability.",
    options: [
      { value: "low", label: "Under $2,000", hint: "Affordability matters most" },
      { value: "mid", label: "$2,000 – $3,000", hint: "Some flexibility" },
      { value: "high", label: "$3,000 – $4,500", hint: "Comfortable range" },
      { value: "premium", label: "$4,500+", hint: "Location over price" },
    ],
  },
  {
    id: "lifestyle",
    title: "Which day-to-day setting feels most like you?",
    help: "Think about where you'd want to spend an ordinary Saturday.",
    options: [
      { value: "urban", label: "Urban", hint: "Walkable, dense, lots going on" },
      { value: "suburban", label: "Suburban", hint: "Space, quiet streets, amenities nearby" },
      { value: "nature", label: "Nature-focused", hint: "Trails, water, and mountains out the door" },
    ],
  },
  {
    id: "priority",
    title: "What matters most in choosing where you land?",
    help: "Pick the one you'd protect if you had to compromise elsewhere.",
    options: [
      { value: "schools", label: "Schools & family life" },
      { value: "commute", label: "Commute & transit" },
      { value: "culture", label: "Culture & nightlife" },
      { value: "affordability", label: "Affordability" },
    ],
  },
  {
    id: "work",
    title: "How do you work?",
    help: "This shapes how much your commute should influence the choice.",
    options: [
      { value: "remote", label: "Fully remote" },
      { value: "hybrid", label: "Hybrid" },
      { value: "office", label: "In-office" },
    ],
  },
  {
    id: "household",
    title: "Who's moving with you?",
    help: "Household shape changes what a good fit looks like.",
    options: [
      { value: "single", label: "Just me" },
      { value: "couple", label: "My partner and me" },
      { value: "family", label: "Our family" },
    ],
  },
];

const has = (city: City, ...needles: string[]) =>
  city.bestFor.some((tag) =>
    needles.some((n) => tag.toLowerCase().includes(n.toLowerCase())),
  );

const AFFORDABLE_REGIONS = [
  "Fraser Valley",
  "Interior",
  "Northern BC",
  "Kootenays",
  "Okanagan",
  "Vancouver Island",
];

function scoreCity(city: City, a: Answers): number {
  let score = 0;

  // Budget vs. region cost pressure
  const metro = city.region === "Metro Vancouver";
  if (a.budget === "low") {
    if (AFFORDABLE_REGIONS.includes(city.region)) score += 3;
    if (metro) score -= 3;
    if (has(city, "First-time buyers")) score += 2;
  } else if (a.budget === "mid") {
    if (AFFORDABLE_REGIONS.includes(city.region)) score += 2;
    if (city.slug === "vancouver") score -= 2;
  } else if (a.budget === "high") {
    if (metro) score += 2;
  } else if (a.budget === "premium") {
    if (metro) score += 3;
    if (city.slug === "vancouver" || city.slug === "north-vancouver") score += 1;
  }

  // Lifestyle
  if (a.lifestyle === "urban") {
    if (has(city, "Urban", "Young professionals", "Students", "Condo")) score += 3;
    if (metro) score += 2;
    if (city.tier === "secondary") score -= 2;
  } else if (a.lifestyle === "suburban") {
    if (has(city, "Families", "First-time buyers", "Commuters")) score += 3;
    if (city.slug === "vancouver") score -= 2;
  } else if (a.lifestyle === "nature") {
    if (has(city, "Outdoor", "Hikers", "Skiers", "Cyclists", "Boaters", "Small-town")) score += 4;
    if (!metro) score += 2;
  }

  // Top priority
  if (a.priority === "schools" && has(city, "Families", "Young families")) score += 3;
  if (a.priority === "commute") {
    if (has(city, "Commuters", "Vancouver commuters")) score += 3;
    if (metro) score += 2;
  }
  if (a.priority === "culture") {
    if (has(city, "Young professionals", "Students", "Artists", "Food lovers", "Wine and food"))
      score += 3;
    if (city.slug === "vancouver" || city.slug === "victoria") score += 2;
  }
  if (a.priority === "affordability") {
    if (has(city, "First-time buyers", "Trades")) score += 3;
    if (AFFORDABLE_REGIONS.includes(city.region)) score += 2;
    if (metro) score -= 2;
  }

  // Work situation
  if (a.work === "remote") {
    if (has(city, "Remote workers")) score += 4;
    if (city.tier === "secondary") score += 1;
  }
  if (a.work === "hybrid" && has(city, "Commuters", "Remote workers")) score += 2;
  if (a.work === "office") {
    if (metro) score += 3;
    if (has(city, "Commuters", "Professionals")) score += 2;
    if (city.tier === "secondary") score -= 1;
  }

  // Household
  if (a.household === "family" && has(city, "Families", "Young families")) score += 3;
  if (a.household === "single" && has(city, "Young professionals", "Students", "Artists"))
    score += 3;
  if (a.household === "couple" && has(city, "Remote workers", "Professionals", "Cyclists"))
    score += 2;

  // Gentle nudge toward well-documented primary cities on ties
  if (city.tier === "primary") score += 1;

  return score;
}

function recommend(a: Answers): City[] {
  return [...cities]
    .map((c) => ({ c, s: scoreCity(c, a) }))
    .sort((x, y) => y.s - x.s || x.c.name.localeCompare(y.c.name))
    .slice(0, 3)
    .map((x) => x.c);
}

function serviceSuggestion(a: Answers) {
  if (a.budget === "low" || a.priority === "affordability")
    return {
      to: "/services/finance-your-home" as const,
      title: "Finance your home",
      desc: "Understand what you can borrow and what a realistic budget looks like before you shop.",
    };
  if (a.household === "family")
    return {
      to: "/services/protect-your-family" as const,
      title: "Protect your family",
      desc: "Coverage and planning basics for households putting down roots in BC.",
    };
  if (a.budget === "premium")
    return {
      to: "/services/build-wealth" as const,
      title: "Build wealth",
      desc: "Longer-term planning for buyers with room to invest alongside a home.",
    };
  return {
    to: "/services/buy-your-home" as const,
    title: "Buy your home",
    desc: "A plain-English walkthrough of the BC buying process, step by step.",
  };
}

const labelFor = (q: Question, value?: string) =>
  q.options.find((o) => o.value === value)?.label ?? "—";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function NeighbourhoodQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const done = step >= QUESTIONS.length;

  const results = useMemo(() => (done ? recommend(answers) : []), [done, answers]);
  const service = serviceSuggestion(answers);
  const progress = Math.round((Math.min(step, QUESTIONS.length) / QUESTIONS.length) * 100);

  const answerSummary = QUESTIONS.map((q) => `${q.title} → ${labelFor(q, answers[q.id])}`).join(
    " | ",
  );

  return (
    <RevealGroup>
      <PageHero
        eyebrow="Quiz"
        title="Where in BC should you live?"
        description="Five quick questions about budget, lifestyle, and how you work — then we'll point you to the communities worth a closer look."
      />

      <section className="container-page my-12 max-w-3xl">
        <div className="rounded-3xl border border-border bg-card p-6 md:p-10">
          <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
            <span>
              {done ? "Your results" : `Question ${step + 1} of ${QUESTIONS.length}`}
            </span>
            <span>{progress}%</span>
          </div>
          <div className="mt-3 h-1.5 w-full rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {!done ? (
            <QuestionStep
              key={QUESTIONS[step].id}
              question={QUESTIONS[step]}
              selected={answers[QUESTIONS[step].id]}
              onSelect={(value) => {
                setAnswers((p) => ({ ...p, [QUESTIONS[step].id]: value }));
                setStep((s) => s + 1);
              }}
              onBack={step > 0 ? () => setStep((s) => s - 1) : undefined}
            />
          ) : (
            <div className="mt-8">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="mt-4 font-serif text-2xl md:text-3xl text-foreground">
                Based on your answers, start here.
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                These are starting points, not verdicts — visiting is still the best test.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {results.map((c, i) => (
                  <Link
                    key={c.slug}
                    to="/cities/$citySlug"
                    params={{ citySlug: c.slug }}
                    className="rounded-2xl border border-border bg-background p-5 hover:border-primary/40 transition-colors"
                  >
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Match {i + 1}
                    </p>
                    <h3 className="mt-2 font-serif text-xl text-foreground">{c.name}</h3>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {c.region}
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">{c.tagline}</p>
                  </Link>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-primary/30 bg-primary/5 p-6">
                <p className="eyebrow">Suggested next step</p>
                <h3 className="mt-2 text-lg text-foreground">{service.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{service.desc}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    to={service.to}
                    className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground"
                  >
                    Learn more
                  </Link>
                  <Link
                    to="/consultation"
                    className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-medium text-foreground"
                  >
                    Book a conversation
                  </Link>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-background p-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Your answers
                </p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {QUESTIONS.map((q) => (
                    <li key={q.id} className="text-sm text-muted-foreground">
                      <span className="text-foreground">{labelFor(q, answers[q.id])}</span>
                      <span className="block text-xs">{q.title}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => {
                    setAnswers({});
                    setStep(0);
                  }}
                  className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <RotateCcw className="h-4 w-4" /> Start over
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {done && (
        <EmailResults
          summary={answerSummary}
          cityNames={results.map((c) => c.name)}
          locationInterest={results.map((c) => c.name).join(", ")}
        />
      )}
    </RevealGroup>
  );
}

function QuestionStep({
  question,
  selected,
  onSelect,
  onBack,
}: {
  question: Question;
  selected?: string;
  onSelect: (value: string) => void;
  onBack?: () => void;
}) {
  return (
    <div className="mt-8">
      <h2 className="font-serif text-2xl md:text-3xl text-foreground">{question.title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{question.help}</p>
      <div className="mt-6 grid gap-3">
        {question.options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onSelect(o.value)}
            aria-pressed={selected === o.value}
            className={`group flex items-center justify-between gap-4 rounded-2xl border p-5 text-left transition-colors ${
              selected === o.value
                ? "border-primary bg-primary/5"
                : "border-border bg-background hover:border-primary/40"
            }`}
          >
            <span>
              <span className="block text-base text-foreground">{o.label}</span>
              {o.hint && (
                <span className="mt-1 block text-sm text-muted-foreground">{o.hint}</span>
              )}
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
          </button>
        ))}
      </div>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
      )}
    </div>
  );
}

function EmailResults({
  summary,
  cityNames,
  locationInterest,
}: {
  summary: string;
  cityNames: string[];
  locationInterest: string;
}) {
  const submit = useSubmitLead();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string }>({});

  return (
    <section className="container-page my-16 max-w-3xl">
      <div className="rounded-3xl border border-border bg-primary text-primary-foreground p-8 md:p-12 grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="eyebrow mb-3 text-primary-foreground/70">Keep your matches</p>
          <h3 className="font-serif text-3xl leading-tight">Email me my results</h3>
          <p className="mt-3 text-primary-foreground/80 max-w-md">
            We&rsquo;ll send your matches ({cityNames.join(", ")}) with a short guide to what
            living in each is actually like.
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
            if (!email) errs.email = "Please enter your email address.";
            else if (!EMAIL_RE.test(email)) errs.email = "Please enter a valid email address.";
            setFieldErrors(errs);
            if (Object.keys(errs).length) return;

            setState("sending");
            setError(null);
            const res = await submit({
              source: "neighbourhood_quiz",
              name,
              email,
              journey: { locationInterest },
              engagement: {
                message: `Neighbourhood quiz — Recommended: ${cityNames.join(", ")}. Answers: ${summary}`,
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
            <p className="text-primary-foreground bg-primary-foreground/10 rounded-xl p-4">
              Thanks — your results are on the way.
            </p>
          ) : (
            <>
              <div className="grid gap-1">
                <input
                  name="name"
                  type="text"
                  placeholder="Your name"
                  aria-label="Your name"
                  aria-invalid={!!fieldErrors.name}
                  onChange={() => setFieldErrors((p) => ({ ...p, name: undefined }))}
                  className="h-12 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 px-4 placeholder:text-primary-foreground/50"
                />
                {fieldErrors.name && (
                  <p role="alert" className="text-sm text-primary-foreground/90">
                    {fieldErrors.name}
                  </p>
                )}
              </div>
              <div className="grid gap-1">
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  aria-label="Email address"
                  aria-invalid={!!fieldErrors.email}
                  onChange={() => setFieldErrors((p) => ({ ...p, email: undefined }))}
                  className="h-12 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 px-4 placeholder:text-primary-foreground/50"
                />
                {fieldErrors.email && (
                  <p role="alert" className="text-sm text-primary-foreground/90">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={state === "sending"}
                className="h-12 rounded-full bg-accent text-accent-foreground font-medium hover:opacity-95 disabled:opacity-60"
              >
                {state === "sending" ? "Sending…" : "Email me my results"}
              </button>
              {error && <p className="text-sm text-primary-foreground/90">{error}</p>}
            </>
          )}
        </form>
      </div>
    </section>
  );
}
