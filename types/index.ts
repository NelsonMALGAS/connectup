export type Post = {
  id: string;
  title: string;
  description: string;
  likes: number;
  author: string;
  createdAt: string;
  tags?: string[];
};
