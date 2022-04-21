import { Article } from "src/articles/interfaces/article.interface";

export interface Comment {
  _id: string
  article: Article
  user_id: string
  name: string
  body: string
  created_date: Date
  like_count: number
  is_liked?: boolean
}