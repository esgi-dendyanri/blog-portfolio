import { Comment } from "./comment.interface";

export default interface LatestComments {
  limit: number
  page: number
  totalPage: number
  total: number
  comments: Comment[]
  error: string
}