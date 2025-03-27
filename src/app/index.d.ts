// import { Game } from "../base";

export interface Platform {
  id: number;
  name: string;
  icon_color_url: string;
  icon_white_url: string;
}

export interface GamePlatform {
  id: number;
  title: string;
  slug: string;
  cover_url: string;
  logo_url: string;
  genres: string[];
  createdAt: string;
  platforms: Platform[];
  release_date: string;
}

export interface StoreButtonProps {
  href: string;
  imgSrc: string;
  alt: string;
}
