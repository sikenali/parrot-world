export interface Post {
  id: number;
  cover: string;
  coverThumb?: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  tags: string[];
  views: number;
  comments: number;
  slug: string;
  body?: string;
}

export interface Photo {
  id: number;
  src: string;
  caption: string;
  wide?: boolean;
  tall?: boolean;
  tags?: string[];
}

export interface AuthorInfo {
  name: string;
  nickname: string;
  role: string;
  avatar: string;
  quote: string;
  location: string;
  totalPhotos: number;
  totalPosts: number;
  totalVisitors: number;
  personality?: string;
  residence?: string;
  hobbies?: string;
  music?: string;
  bio?: string;
}

export interface Notice {
  text: string;
}

export interface Tag {
  name: string;
  count: number;
}
