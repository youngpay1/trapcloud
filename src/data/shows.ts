export interface Show {
  id: string;
  date: string;
  artist: string;
  city: string;
  venue: string;
  ticketUrl?: string;
  status: 'upcoming' | 'soldout' | 'cancelled';
}

export interface PastShow {
  id: string;
  name: string;
  year: string;
  city: string;
  venue: string;
  images?: string[];
  videos?: string[];
}

export const upcomingShows: Show[] = [
  // Add upcoming shows here when confirmed
];

export const pastShows: PastShow[] = [
  {
    id: 'travis-scott-frankfurt',
    name: 'Travis Scott — Frankfurt',
    year: '2023',
    city: 'Frankfurt',
    venue: 'Zoom Club',
    videos: [
      '/shows/travis-scott/video-1.mp4',
      '/shows/travis-scott/video-2.mp4',
      '/shows/travis-scott/video-3.mp4',
      '/shows/travis-scott/video-4.mp4',
      '/shows/travis-scott/video-5.mp4',
      '/shows/travis-scott/video-6.mp4',
    ],
    images: [
      '/shows/travis-scott/photo-1.jpg',
      '/shows/travis-scott/photo-2.jpg',
    ],
  },
  {
    id: 'lancey-foux-berlin',
    name: 'Lancey Foux — Berlin',
    year: '2023',
    city: 'Berlin',
    venue: 'Soho House Berlin',
    videos: [
      '/shows/lancey-berlin/video-1.mp4',
      '/shows/lancey-berlin/video-2.mp4',
      '/shows/lancey-berlin/video-3.mp4',
    ],
    images: [
      '/shows/lancey-berlin/photo-1.jpg',
      '/shows/lancey-berlin/photo-2.jpg',
    ],
  },
  {
    id: 'lancey-foux-brussels',
    name: 'Lancey Foux — Brussels',
    year: '2023',
    city: 'Brussels',
    venue: 'Loft',
    videos: [
      '/shows/lancey-brussels/video-1.mp4',
      '/shows/lancey-brussels/video-2.mp4',
      '/shows/lancey-brussels/video-3.mp4',
    ],
    images: [
      '/shows/lancey-brussels/photo-1.jpg',
      '/shows/lancey-brussels/photo-2.jpg',
    ],
  },
  {
    id: 'lancey-foux-cologne',
    name: 'Lancey Foux — Cologne',
    year: '2023',
    city: 'Cologne',
    venue: 'Masquare',
    videos: [
      '/shows/lancey-cologne/video-1.mp4',
      '/shows/lancey-cologne/video-2.mp4',
      '/shows/lancey-cologne/video-3.mp4',
    ],
    images: [
      '/shows/lancey-cologne/photo-1.jpg',
    ],
  },
  {
    id: 'slimesito-berlin',
    name: 'Slimesito — Berlin',
    year: '2023',
    city: 'Berlin',
    venue: 'Panke Culture',
    videos: [
      '/shows/slimesito/berlin/video-1.mp4',
      '/shows/slimesito/berlin/video-2.mp4',
      '/shows/slimesito/berlin/video-3.mp4',
    ],
    images: [
      '/shows/slimesito/berlin/photo-1.jpg',
    ],
  },
  {
    id: 'slimesito-cologne',
    name: 'Slimesito — Cologne',
    year: '2023',
    city: 'Cologne',
    venue: 'Veedel Club',
    videos: [
      '/shows/slimesito/cologne/video-1.mp4',
    ],
    images: [
      '/shows/slimesito/cologne/photo-1.jpg',
      '/shows/slimesito/cologne/photo-2.jpg',
      '/shows/slimesito/cologne/photo-3.jpg',
    ],
  },
  {
    id: 'slimesito-frankfurt',
    name: 'Slimesito — Frankfurt',
    year: '2023',
    city: 'Frankfurt',
    venue: 'Dough House',
    videos: [
      '/shows/slimesito/frankfurt/video-1.mp4',
      '/shows/slimesito/frankfurt/video-2.mp4',
      '/shows/slimesito/frankfurt/video-3.mp4',
      '/shows/slimesito/frankfurt/video-4.mp4',
      '/shows/slimesito/frankfurt/video-5.mp4',
      '/shows/slimesito/frankfurt/video-6.mp4',
      '/shows/slimesito/frankfurt/video-7.mp4',
    ],
    images: [
      '/shows/slimesito/frankfurt/photo-1.jpg',
    ],
  },
  {
    id: 'slimesito-moscow',
    name: 'Slimesito — Moscow',
    year: '2023',
    city: 'Moscow',
    videos: [
      '/shows/slimesito/moscow/video-1.mp4',
      '/shows/slimesito/moscow/video-2.mp4',
    ],
    images: [
      '/shows/slimesito/moscow/photo-1.jpg',
      '/shows/slimesito/moscow/photo-2.jpg',
      '/shows/slimesito/moscow/photo-3.jpg',
      '/shows/slimesito/moscow/photo-4.jpg',
    ],
  },
  {
    id: 'slimesito-riga',
    name: 'Slimesito — Riga',
    year: '2023',
    city: 'Riga',
    images: [
      '/shows/slimesito/riga/photo-1.jpg',
      '/shows/slimesito/riga/photo-2.jpg',
      '/shows/slimesito/riga/photo-3.jpg',
      '/shows/slimesito/riga/photo-4.jpg',
      '/shows/slimesito/riga/photo-5.jpg',
      '/shows/slimesito/riga/photo-6.jpg',
      '/shows/slimesito/riga/photo-7.jpg',
    ],
  },
  {
    id: 'slimesito-saint-petersburg',
    name: 'Slimesito — Saint Petersburg',
    year: '2023',
    city: 'Saint Petersburg',
    videos: [
      '/shows/slimesito/saint-petersburg/video-1.mp4',
      '/shows/slimesito/saint-petersburg/video-2.mp4',
      '/shows/slimesito/saint-petersburg/video-3.mp4',
    ],
    images: [
      '/shows/slimesito/saint-petersburg/photo-1.jpg',
      '/shows/slimesito/saint-petersburg/photo-2.jpg',
    ],
  },
  {
    id: 'slimesito-warsaw',
    name: 'Slimesito — Warsaw',
    year: '2023',
    city: 'Warsaw',
    videos: [
      '/shows/slimesito/warsaw/video-1.mp4',
      '/shows/slimesito/warsaw/video-2.mp4',
      '/shows/slimesito/warsaw/video-3.mp4',
    ],
    images: [
      '/shows/slimesito/warsaw/photo-1.jpg',
      '/shows/slimesito/warsaw/photo-2.jpg',
    ],
  },
];
