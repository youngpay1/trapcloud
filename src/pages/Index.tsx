import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { upcomingShows, pastShows } from '@/data/shows';

const Index = () => {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribing(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json() as { ok: boolean };
      setSubscribeStatus(data.ok ? 'success' : 'error');
      if (data.ok) {
        setEmail('');
        window.zaraz?.track('newsletter_signup', { site: 'trapcloud' });
      }
    } catch {
      setSubscribeStatus('error');
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="relative h-screen">
        <video
          src="/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </section>

      {/* About Section */}
      <section className="py-20 md:py-[60px]">
        <div className="container max-w-4xl">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
            Bringing Your Favorite Artists to Europe.
          </p>
          <p className="text-sm md:text-base text-foreground/80 leading-relaxed max-w-2xl">
            A full-service platform built to move rap culture — events, bookings, routing, and partnerships for international artists across Europe.
          </p>
        </div>
      </section>

      {/* Upcoming Shows Section */}
      <section className="py-16 md:py-[80px]">
        <div className="container max-w-4xl">
          <div className="flex items-center justify-between mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Upcoming Shows
            </p>
            <Link to="/shows" className="nav-link text-xs uppercase tracking-widest flex items-center gap-2">
              All Shows
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {upcomingShows.length > 0 ? (
            <div className="space-y-8">
              {upcomingShows.slice(0, 4).map((show) => (
                <Link
                  key={show.id}
                  to={show.ticketUrl || '/shows'}
                  target={show.ticketUrl ? '_blank' : undefined}
                  className="group block"
                  onClick={() => { window.zaraz?.track('ticket_click', { artist: show.artist, city: show.city }); }}
                >
                  <div className="flex items-baseline justify-between gap-2 md:gap-4 py-4 border-b border-border/20 transition-colors">
                    <div className="flex items-baseline gap-3 md:gap-12 flex-1 min-w-0">
                      <span className="nav-link-group text-xs shrink-0">
                        {new Date(show.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="nav-link-group text-sm md:text-base shrink-0">
                        {show.artist}
                      </span>
                      <span className="nav-link-group text-xs shrink-0">
                        {show.city}
                      </span>
                    </div>
                    <span className="nav-link-group text-xs flex items-center gap-1 whitespace-nowrap shrink-0">
                      Tickets
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-12 border-b border-border/20">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Announcements coming soon
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Past Shows Grid */}
      <section className="py-16 md:py-[80px]">
        <div className="container max-w-4xl">
          <div className="flex items-center justify-between mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Past Shows
            </p>
            <Link to="/archive" className="nav-link text-xs uppercase tracking-widest flex items-center gap-2">
              Archive
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {pastShows.slice(0, 6).map((show) => {
              const videoThumb = show.videos?.[0] ?? null;
              const thumb = !videoThumb ? (show.images?.[0] ?? null) : null;
              return (
                <Link
                  key={show.id}
                  to="/archive"
                  className="group relative aspect-square overflow-hidden"
                >
                  {thumb ? (
                    <img
                      src={thumb}
                      alt={show.name}
                      className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                    />
                  ) : videoThumb ? (
                    <video
                      src={videoThumb}
                      muted
                      playsInline
                      loop
                      autoPlay
                      className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="w-full h-full bg-secondary" />
                  )}
                  <div className="absolute inset-0 bg-background/40 transition-all duration-500 group-hover:bg-primary/10" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                    <span className="nav-link-group text-xs md:text-sm uppercase tracking-widest text-center px-2">
                      {show.name.split(' — ')[0]}
                    </span>
                    <span className="nav-link-group text-[10px] uppercase tracking-widest text-muted-foreground">
                      {show.city}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="flex flex-col items-center gap-6">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground text-center">
              Stay in the loop
            </p>
            {subscribeStatus === 'success' ? (
              <p className="text-sm text-foreground/80">Successfully subscribed!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="text-sm bg-transparent border-b border-border/50 focus:border-foreground/50 outline-none py-2 px-0 w-48 md:w-64 transition-colors placeholder:text-muted-foreground/50"
                />
                <button type="submit" disabled={subscribing} className="nav-link text-xs uppercase tracking-widest disabled:opacity-50">
                  {subscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}
            {subscribeStatus === 'error' && (
              <p className="text-sm text-destructive">Something went wrong. Please try again.</p>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Index;
