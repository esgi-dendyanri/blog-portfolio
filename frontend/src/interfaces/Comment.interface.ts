import Article from "./Article.interface"

export default interface Comment {
  id: string
  article: Article
  user_id: string
  name: string
  body: string
  created_date: string
  like_count: number
  is_liked?: boolean
}