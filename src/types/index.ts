export interface Post {
  id: number;
  cover: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  tags: string[];
  views: number;
  comments: number;
  slug?: string;
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
}

export interface Notice {
  text: string;
}

export interface Tag {
  name: string;
  count: number;
}
