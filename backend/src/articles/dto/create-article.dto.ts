export class CreateArticleDto {
  title: string
  body: string
  category: string
  tags: string[]
  created_date: Date
}