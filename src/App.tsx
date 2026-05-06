import { useEffect, useState, type FC, type FormEvent } from 'react';
import { VIDEOS, type Video } from './data/videos';
import { QUESTS } from './data/quests';

const MILESTONES = [10, 25, 50, 100, 250, 500, 1000];


// duplicate the quest list so the marquee track loops seamlessly via translateX(-50%).
const MARQUEE_QUESTS = [...QUESTS, ...QUESTS];

const Marquee: FC = () => (
  <div className="marquee">
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

export default function App() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [count, setCount] = useState<number | null>(null);

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
                because we're retards too, this is the actual real count of people<br className="hidden lg:inline" />
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

          <div className="mt-8">
            <p className="text-base lg:text-lg text-rm-text mb-4 leading-relaxed">
              <span className="text-amber">subscribe</span> and get one retarded quest a day.<br />
              by email. unsubscribe whenever.
            </p>

            {status === 'success' ? (
              <div className="border border-amber p-5 bg-rm-panel">
                <div className="text-amber font-bold mb-1">you're in.</div>
                <p className="text-sm text-rm-muted">
                  first quest tomorrow. close this tab. go do something.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="border border-rm bg-rm-panel">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'submitting'}
                  placeholder="your email"
                  className="block w-full px-4 py-4 bg-transparent text-rm-text placeholder:text-rm-faint focus:outline-none border-0"
                />
                {status === 'error' && (
                  <div className="px-4 py-2 text-xs text-red-600 border-t border-rm">{errorMsg}</div>
                )}
                <div className="flex items-center justify-end border-t border-rm px-4 py-3">
                  <button
                    type="submit"
                    disabled={status === 'submitting' || !email}
                    className="text-sm font-bold text-amber border border-amber px-5 py-1.5 hover:bg-amber hover:text-rm-bg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? 'subscribing...' : 'subscribe →'}
                  </button>
                </div>
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
