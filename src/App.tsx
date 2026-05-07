import { useEffect, useRef, useState, type FC, type FormEvent, type MouseEvent as ReactMouseEvent } from 'react';
import { VIDEOS, type Video } from './data/videos';
import { QUESTS, type Quest } from './data/quests';

// ─── app-view persistence helpers (V1: client-only, localStorage) ─────────────
// when backend is ready, swap these for API calls.

const VIEW_STATE_KEY = 'retardmaxx_state_v1';
const STARTED_FLAG = 'retardmaxx_started';
const today = () => new Date().toISOString().slice(0, 10);

interface AppViewState {
  done: string[];
  current: string | null;
  rerolls: { date: string; count: number };
}

const loadAppState = (): AppViewState => {
  try {
    const raw = localStorage.getItem(VIEW_STATE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* corrupt or absent */ }
  return { done: [], current: null, rerolls: { date: today(), count: 0 } };
};

const saveAppState = (s: AppViewState) => {
  try { localStorage.setItem(VIEW_STATE_KEY, JSON.stringify(s)); } catch { /* ignore */ }
};

const pickRandomQuest = (excludeIds: string[]): string | null => {
  const available = QUESTS.filter(q => !excludeIds.includes(q.id));
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)].id;
};

const REROLLS_PER_DAY = 1;

const MILESTONES = [10, 25, 50, 100, 250, 500, 1000];


// duplicate the quest list so we can loop scrollLeft seamlessly at the halfway mark.
const MARQUEE_QUESTS = [...QUESTS, ...QUESTS];

// auto-scroll speed in pixels per second. matches the old 220s CSS animation roughly.
const MARQUEE_SPEED_PX_PER_SEC = 25;

const Marquee: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });

  // auto-scroll via requestAnimationFrame. pauses when user is interacting.
  useEffect(() => {
    if (paused) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      const el = containerRef.current;
      if (el) {
        el.scrollLeft += (MARQUEE_SPEED_PX_PER_SEC * dt) / 1000;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  // start at the middle so users can drag both directions without immediately wrapping.
  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollLeft = 0;
  }, []);

  const onMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    setPaused(true);
    drag.current = { active: true, startX: e.pageX, startScroll: el.scrollLeft };
  };
  const onMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const el = containerRef.current;
    if (!el) return;
    e.preventDefault();
    const dx = e.pageX - drag.current.startX;
    el.scrollLeft = drag.current.startScroll - dx;
  };
  const stopDrag = () => {
    drag.current.active = false;
    setPaused(false);
  };

  return (
    <div
      ref={containerRef}
      className="marquee"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      onTouchCancel={() => setPaused(false)}
    >
      <div className="marquee-track">
        {MARQUEE_QUESTS.map((q, i) => (
          <div key={i} className="marquee-card">
            <div className="q-num">quest {String((i % QUESTS.length) + 1).padStart(2, '0')}</div>
            <div className="q-name">{q.name}</div>
            <div className="q-text">{q.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── AppView ──────────────────────────────────────────────────────────────────
// the actual product. shows one quest, validate or re-roll.
// V1: client-side only (random pick from QUESTS, persistence via localStorage).

const AppView: FC = () => {
  const [state, setState] = useState<AppViewState>(loadAppState);

  // Assign a quest on first mount if none active
  useEffect(() => {
    if (!state.current) {
      const next = pickRandomQuest(state.done);
      if (next) {
        const ns = { ...state, current: next };
        setState(ns);
        saveAppState(ns);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentQuest: Quest | undefined =
    state.current ? QUESTS.find(q => q.id === state.current) : undefined;

  const todayStr = today();
  const rerollsToday = state.rerolls.date === todayStr ? state.rerolls.count : 0;
  const rerollsLeft = Math.max(0, REROLLS_PER_DAY - rerollsToday);

  const handleValidate = () => {
    if (!state.current) return;
    const next = pickRandomQuest([...state.done, state.current]);
    const ns: AppViewState = {
      ...state,
      done: [...state.done, state.current],
      current: next,
    };
    setState(ns);
    saveAppState(ns);
  };

  const handleReroll = () => {
    if (rerollsLeft <= 0 || !state.current) return;
    const next = pickRandomQuest([...state.done, state.current]);
    const ns: AppViewState = {
      ...state,
      current: next,
      rerolls: { date: todayStr, count: rerollsToday + 1 },
    };
    setState(ns);
    saveAppState(ns);
  };

  return (
    <div className="min-h-screen bg-rm-bg text-rm-text flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        <div className="text-xs text-rm-faint tracking-[0.3em] uppercase mb-4 text-center font-bold">
          quest {String(state.done.length + 1).padStart(2, '0')}
        </div>

        {currentQuest ? (
          <>
            <div className="border-2 border-rm bg-white p-6 mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold uppercase mb-3 leading-tight tracking-tight text-rm-text">
                {currentQuest.name}
              </h2>
              <p className="text-base text-rm-muted leading-relaxed">
                {currentQuest.text}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleValidate}
                className="bg-amber text-rm-bg font-bold py-4 border-2 border-amber hover:bg-rm-bg hover:text-amber transition-colors"
              >
                ✓ validate
              </button>
              <button
                type="button"
                onClick={handleReroll}
                disabled={rerollsLeft === 0}
                className="border-2 border-rm font-bold py-4 text-rm-muted hover:border-amber hover:text-amber transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-rm disabled:hover:text-rm-muted"
              >
                re-roll ({rerollsLeft})
              </button>
            </div>

            {state.done.length > 0 && (
              <div className="mt-10 text-center text-xs text-rm-faint tracking-[0.3em] uppercase">
                {state.done.length} validated
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-3xl font-bold uppercase mb-3">all done<span className="text-amber">.</span></p>
            <p className="text-rm-muted">
              you completed every free quest. unlock more soon.
            </p>
            <div className="mt-10 text-xs text-rm-faint tracking-[0.3em] uppercase">
              {state.done.length} validated
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const VideoEmbed: FC<{ video: Video }> = ({ video }) => {
  const [open, setOpen] = useState(false);
  return open ? (
    <div className="aspect-video border border-rm">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
        title={video.title}
        allow="autoplay; encrypted-media; fullscreen"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  ) : (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="block w-full aspect-video relative group border border-rm bg-rm-panel overflow-hidden text-left"
    >
      <img
        src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition"
      />
      <div className="absolute inset-0 bg-black/55 group-hover:bg-black/35 transition flex items-center justify-center">
        <div className="border border-amber text-amber px-4 py-2 font-bold tracking-[0.25em] text-sm group-hover:bg-amber group-hover:text-rm-bg transition-colors">
          ▶ PLAY
        </div>
      </div>
      <div className="absolute left-0 right-0 bottom-0 p-3 bg-gradient-to-t from-black/95 to-transparent">
        <div className="text-sm font-bold text-white leading-tight">{video.title}</div>
        <div className="text-xs text-white/60 mt-0.5">· {video.creator}</div>
      </div>
    </button>
  );
};

type Mode = 'landing' | 'app';

export default function App() {
  // landing-vs-app state machine. persists in localStorage so returning users go straight to the app.
  const [mode, setMode] = useState<Mode>(() => {
    if (typeof window === 'undefined') return 'landing';
    return localStorage.getItem(STARTED_FLAG) === 'true' ? 'app' : 'landing';
  });

  const [email, setEmail] = useState('');
  const [friends, setFriends] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [count, setCount] = useState<number | null>(null);

  const addFriend = () => setFriends(f => (f.length < 5 ? [...f, ''] : f));
  const updateFriend = (i: number, v: string) =>
    setFriends(f => f.map((x, j) => (j === i ? v : x)));
  const removeFriend = (i: number) =>
    setFriends(f => f.filter((_, j) => j !== i));

  useEffect(() => {
    fetch('/api/subscriber-count')
      .then(r => r.json())
      .then(d => setCount(typeof d.count === 'number' ? d.count : null))
      .catch(() => setCount(null));
  }, []);

  const currentTarget = (() => {
    if (count === null) return 10;
    for (const m of MILESTONES) {
      if (count < m) return m;
    }
    return MILESTONES[MILESTONES.length - 1];
  })();
  const progress = count !== null ? Math.min((count / currentTarget) * 100, 100) : 0;
  const isMaxed = count !== null && count >= MILESTONES[MILESTONES.length - 1];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('submitting');
    setErrorMsg('');
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setStatus('success');
        setEmail('');
        setCount(c => (c === null ? c : c + 1));
        // mark started + transition into the app on the same page
        try { localStorage.setItem(STARTED_FLAG, 'true'); } catch { /* ignore */ }
        // brief delay so user sees the click registered, then swap views
        setTimeout(() => setMode('app'), 350);
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMsg(data.error || 'failed. try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('network error. try again.');
      setStatus('error');
    }
  };

  // if user already onboarded (or just submitted), show the app instead of the landing
  if (mode === 'app') {
    return <AppView />;
  }

  return (
    <div className="min-h-screen bg-rm-bg text-rm-text">

      {/* TOP ZONE: headline only (no wordmark, no marquee yet) */}
      <div className="max-w-3xl mx-auto px-6 pt-8 lg:pt-12">

        {/* HEADLINE — editorial pull-quote treatment with cartoon */}
        <section className="mb-0 border-y border-amber py-4 sm:py-6">
          <div className="flex items-center justify-center">
            <img
              src="/images/running_cycle.gif"
              alt=""
              className="flex-shrink-0 h-[100px] sm:h-[150px] lg:h-[200px] w-auto mix-blend-multiply pointer-events-none relative z-10 -mr-3 sm:-mr-5 lg:-mr-7"
            />
            <div className="min-w-0">
              <div className="text-xs sm:text-sm tracking-[0.3em] uppercase font-bold mb-1 text-rm-muted">⚠ warning</div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-[0.95] uppercase tracking-tight text-rm-text">
                retards only<span className="text-amber">.</span>
              </h1>
            </div>
          </div>
        </section>

      </div>

      {/* MARQUEE — moved BELOW the title, full viewport width */}
      <Marquee />

      {/* MAIN CONTENT */}
      <div className="max-w-3xl mx-auto px-6 pb-8 lg:pb-12 pt-10">

        {/* HERO COUNTER + email form */}
        <section className="mb-12">
          {count !== null ? (
            <div className="text-center">
              <div className="text-[6.5rem] lg:text-[10rem] font-bold tabular-nums leading-[0.9] text-rm-text">
                {count}
                <span className="text-rm-faint text-3xl lg:text-5xl"> / {currentTarget}</span>
              </div>
              <div className="text-xs uppercase tracking-[0.25em] text-rm-faint mt-3">
                retards locked in
              </div>
              <div className="w-full h-1.5 bg-rm-panel border border-rm mt-4">
                <div
                  className="h-full bg-amber transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-4 text-sm lg:text-base text-rm-muted leading-relaxed">
                because we're retards too, this is the actual real count of people{' '}
                <br className="hidden lg:inline" />
                who subscribed. no bots. we're too small to fake it.
              </p>
              {isMaxed && (
                <p className="mt-2 text-xs text-amber tracking-wider">
                  founding tier locked. public launch incoming.
                </p>
              )}
            </div>
          ) : (
            <div className="text-6xl text-rm-faint text-center">…</div>
          )}

          <div className="mt-10 text-center">
            <p className="text-xl lg:text-2xl font-bold text-rm-text leading-tight mb-5">
              retardmaxx by yourself or with friends<span className="text-amber">.</span>
            </p>

            {status === 'success' ? (
              <div className="border-2 border-amber p-5 bg-rm-panel text-left max-w-md mx-auto">
                <div className="text-amber font-bold mb-1">you're in.</div>
                <p className="text-sm text-rm-muted">
                  {friends.length > 0
                    ? "first quest tomorrow. your friends will get one too. close this tab. go do something."
                    : "first quest tomorrow. close this tab. go do something."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3 text-left">

                {/* primary email — obvious bordered input */}
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'submitting'}
                  placeholder="your email"
                  className="block w-full px-4 py-4 bg-white text-rm-text placeholder:text-rm-faint border-2 border-rm focus:border-amber focus:outline-none text-base transition-colors"
                />

                {/* friend rows — each one its own bordered field */}
                {friends.map((f, i) => (
                  <div key={i} className="flex items-stretch border-2 border-rm focus-within:border-amber transition-colors bg-white">
                    <input
                      type="email"
                      value={f}
                      onChange={(e) => updateFriend(i, e.target.value)}
                      disabled={status === 'submitting'}
                      placeholder="friend's email"
                      className="flex-1 min-w-0 px-4 py-4 bg-transparent text-rm-text placeholder:text-rm-faint focus:outline-none border-0 text-base"
                    />
                    <button
                      type="button"
                      onClick={() => removeFriend(i)}
                      className="px-4 text-rm-faint hover:text-amber transition-colors border-l-2 border-rm"
                      aria-label={`remove friend ${i + 1}`}
                    >
                      ✕
                    </button>
                  </div>
                ))}

                {/* add-friend button — dashed border so it reads as "secondary action" */}
                {friends.length < 5 && (
                  <button
                    type="button"
                    onClick={addFriend}
                    disabled={status === 'submitting'}
                    className="block w-full px-4 py-3 text-sm font-bold text-rm-muted border-2 border-dashed border-rm hover:text-amber hover:border-amber transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    + add a friend
                  </button>
                )}

                {/* error */}
                {status === 'error' && (
                  <div className="px-4 py-2 text-xs text-red-600 border-2 border-red-600">{errorMsg}</div>
                )}

                {/* submit — solid amber, full-width, big, can't miss */}
                <button
                  type="submit"
                  disabled={status === 'submitting' || !email}
                  className="w-full bg-amber text-rm-bg font-bold py-4 text-base border-2 border-amber hover:bg-rm-bg hover:text-amber transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'starting...' : 'play now →'}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* VIDEO GALLERY */}
        <section className="mb-12">
          <div className="text-xs sm:text-sm tracking-[0.3em] uppercase font-bold text-amber mb-4">
            [ ride the tiger ]
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VIDEOS.map((v) => (
              <VideoEmbed key={v.id} video={v} />
            ))}
          </div>
        </section>

        {/* footer */}
        <footer className="border-t border-rm pt-6 text-xs text-rm-faint">
          <div>retardmaxxing<span className="text-amber">.</span>app</div>
        </footer>

      </div>

      {/* BOTTOM MARQUEE */}
      <Marquee />
    </div>
  );
}
