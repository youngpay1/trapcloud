import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, MapPin, Clock, Calendar } from 'lucide-react';
import { upcomingShows } from '@/data/shows';

const ShowDetail = () => {
  const { id } = useParams<{ id: string }>();
  const show = upcomingShows.find((s) => s.id === id);

  if (!show) {
    return (
      <div className="min-h-screen pt-24 md:pt-28 pb-12">
        <div className="container max-w-4xl flex flex-col items-center gap-6 py-24">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Show not found
          </p>
          <Link to="/shows" className="nav-link text-xs uppercase tracking-widest flex items-center gap-2">
            <ArrowLeft className="w-3 h-3" />
            All Shows
          </Link>
        </div>
      </div>
    );
  }

  const dateLong = new Date(show.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const soldOut = show.status === 'soldout';

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-20">
      <div className="container max-w-4xl">
        <Link
          to="/shows"
          className="nav-link text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 mb-10"
        >
          <ArrowLeft className="w-3 h-3" />
          All Shows
        </Link>

        {/* Hero media */}
        {(show.promo || show.poster) && (
          <div className="relative w-full aspect-[4/5] sm:aspect-video overflow-hidden mb-10 border border-border/20">
            {show.promo ? (
              <video
                src={show.promo}
                autoPlay
                loop
                muted
                playsInline
                poster={show.poster}
                className="w-full h-full object-cover"
              />
            ) : (
              <img src={show.poster} alt={show.artist} className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 hero-gradient pointer-events-none" />
          </div>
        )}

        {/* Title */}
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
          Presented by Trap Cloud
        </p>
        <h1 className="text-3xl md:text-5xl uppercase tracking-wide text-glow mb-8">
          {show.artist}
        </h1>

        {/* Detail rows */}
        <div className="space-y-3 mb-10">
          <div className="flex items-center gap-3 text-sm text-foreground/80">
            <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
            <span>{dateLong}</span>
          </div>
          {(show.doors || show.showStart) && (
            <div className="flex items-center gap-3 text-sm text-foreground/80">
              <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
              <span>
                {show.doors && <>Doors {show.doors}</>}
                {show.doors && show.showStart && <span className="text-muted-foreground"> · </span>}
                {show.showStart && <>Show {show.showStart}</>}
              </span>
            </div>
          )}
          <div className="flex items-center gap-3 text-sm text-foreground/80">
            <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
            <span>
              {show.venue}
              {show.address ? ` — ${show.address}` : `, ${show.city}`}
            </span>
          </div>
        </div>

        {/* Ticket CTA */}
        {show.ticketUrl && !soldOut ? (
          <a
            href={show.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { window.zaraz?.track('ticket_click', { artist: show.artist, city: show.city }); }}
            className="group inline-flex items-center gap-3 border border-foreground/40 px-8 py-4 mb-12 transition-all duration-300 hover:border-foreground glow-shadow-sm hover:glow-shadow"
          >
            <span className="nav-link-group text-xs uppercase tracking-[0.3em]">Get Tickets</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        ) : (
          <div className="inline-flex items-center gap-3 border border-border/40 px-8 py-4 mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {soldOut ? 'Sold Out' : 'Tickets coming soon'}
            </span>
          </div>
        )}

        {/* Description */}
        {show.description && (
          <p className="text-sm md:text-base text-foreground/80 leading-relaxed max-w-2xl mb-12">
            {show.description}
          </p>
        )}

        {/* Giveaway */}
        {show.giveaway && (
          <div className="border-t border-border/20 pt-10">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Ticket Giveaway
            </p>
            <p className="text-sm md:text-base text-foreground/80 leading-relaxed max-w-2xl">
              {show.giveaway}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowDetail;
