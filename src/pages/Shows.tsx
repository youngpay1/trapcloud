import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { upcomingShows } from '@/data/shows';

const Shows = () => {
  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-12">
      <div className="container max-w-4xl">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-12 text-center">
          Tickets
        </p>

        {upcomingShows.length > 0 ? (
          <div className="space-y-0">
            {upcomingShows.map((show) => (
              <Link
                key={show.id}
                to={show.ticketUrl || '#'}
                target={show.ticketUrl ? '_blank' : undefined}
                className="group block"
              >
                <div className="flex items-baseline justify-between gap-2 md:gap-4 py-5 border-b border-border/20 transition-colors">
                  <div className="flex items-baseline gap-3 md:gap-12 flex-1 min-w-0">
                    <span className="nav-link-group text-xs shrink-0 w-16">
                      {new Date(show.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="nav-link-group text-sm md:text-base shrink-0">
                      {show.artist}
                    </span>
                    <span className="nav-link-group text-xs shrink-0">
                      {show.venue}
                    </span>
                    <span className="nav-link-group text-xs shrink-0">
                      {show.city}
                    </span>
                  </div>
                  <span className="nav-link-group text-xs flex items-center gap-1 whitespace-nowrap shrink-0">
                    {show.status === 'soldout' ? 'Sold Out' : 'Tickets'}
                    {show.status !== 'soldout' && <ArrowRight className="w-3 h-3" />}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 py-24">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              No shows announced yet
            </p>
            <p className="text-xs text-muted-foreground/60 text-center max-w-xs">
              Follow us on Instagram for the first announcements.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shows;
