export type QualityOption = '4k' | '1080p' | '720p';
export type FormatOption = 'mkv' | 'mp4' | 'zip';

export interface Episode {
  id: string;
  season: number;
  episodeNumber: number;
  title: string;
  duration: string;
  size: string;
  description: string;
}

export interface SeasonInfo {
  season: number;
  name: string;
  subtitle: string;
  episodesCount: number;
  totalSize: string;
  year: string;
  episodes: Episode[];
}

export interface MirrorServer {
  id: string;
  name: string;
  location: string;
  speed: string;
  ping: string;
  load: string;
}
