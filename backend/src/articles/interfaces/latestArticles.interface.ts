import { Article } from "./article.interface";

export default interface LatestArticles {
  limit: number
  page: number
  totalPage: number
  total: number
  articles: Article[]
  error: string
}