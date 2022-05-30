import Comment from "./Comment.interface";

export default interface LatestComments {
  limit: number
  page: number
  totalPage: number
  total: number
  comments: Comment[]
  error: string
}