export default interface Article {
  id: string
  slug: string
  img: string
  title: string
  body: string
  category: string
  tags: string[]
  created_date: Date
  view_count: number
  comment_count: number
  like_count: number
}