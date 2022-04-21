import { Article } from "src/articles/interfaces/article.interface";
import { Comment } from "src/comments/interfaces/comment.interface";

export interface Like {
  _id: string
  user_id: string
  article: Article
  comment: Comment
  created_date: Date
}