import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import Article from "../interfaces/Article.interface"
import LatestArticles from "../interfaces/LatestArticles.interface"
import { getLatest, getOne } from '../services/Article.service'
import { likeArticle, unlikeArticle } from '../services/Like.service'
import SingleArticle from '../interfaces/SingleArticle.interface'

// Define a type for the slice state
interface ArticleState {
  highlight: Article
  latests: LatestArticles
  selected: SingleArticle
}

// Define the initial state using that type
const initialState: ArticleState = {
  highlight: {} as Article,
  latests: {} as LatestArticles,
  selected: {} as SingleArticle,
}

export const counterSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setHighlight: (state, action: PayloadAction<Article>) => {
      state.highlight = action.payload
    },
    setLatests: (state, action: PayloadAction<LatestArticles>) => {
      state.latests = action.payload
    },
    setSelected: (state, action: PayloadAction<SingleArticle>) => {
      state.selected = action.payload
    },
  }
})

export const { setHighlight, setLatests, setSelected } = counterSlice.actions

export default counterSlice.reducer

const mapArticle: Function = (item: any): Article => {
  let article: Article = {} as Article;
  article.id = item._id
  article.slug = item.slug
  article.title = item.title
  article.body = item.body
  article.category = item.category
  article.tags = item.tags
  article.view_count = item.view_count
  article.comment_count = item.comment_count
  article.like_count = item.like_count
  article.is_liked = item.is_liked
  article.created_date = item.created_date

  return article;
}

export const getLatestArticles = (dispatch: Dispatch<any>, limit: number, page: number) => {
  let latestArticles: LatestArticles = {} as LatestArticles

  getLatest(limit, page)
  .then((response: any) => {
    if ( response.status === 200 ) {
      let articles: Article[] = [];
      response.data.articles.forEach((item: any) => {
        articles.push(mapArticle(item))
      })
      latestArticles.limit = limit
      latestArticles.page  = page
      latestArticles.totalPage = response.data.totalPage
      latestArticles.total = response.data.total
      latestArticles.articles = articles
      dispatch(setLatests(latestArticles))
    } else {
      dispatch(setLatests(latestArticles))
    }
  })
  .catch((err: any) => {
    console.error(err)
    latestArticles.error = "Not responding"

    dispatch(setLatests(latestArticles))
  })
}

export const getArticle = (dispatch: Dispatch<any>, slug: string) => {
  let singleArticle: SingleArticle = {} as SingleArticle

  getOne(slug)
  .then((response: any) => {
    if ( response.status === 200 ) {
      singleArticle.article = mapArticle(response.data)
      dispatch(setSelected(singleArticle))
    } else {
      dispatch(setSelected(singleArticle))
    }
  })
  .catch((err: any) => {
    console.error(err)
    singleArticle.error = "Not responding"

    dispatch(setSelected(singleArticle))
  })
}

export const toggleLikeArticle = (dispatch: Dispatch<any>, singleArticle: SingleArticle) => {
  let likeFunc: Function;

  likeFunc = singleArticle.article.is_liked ? unlikeArticle : likeArticle
  console.log("1111 is_liked", singleArticle.article.is_liked)

  likeFunc(singleArticle.article.id)
  .then((response: any) => {
    if ( response.status === 200 ) {
      let is_liked: boolean = !singleArticle.article.is_liked
      let like_count: number = singleArticle.article.like_count
      if ( is_liked )
        like_count += 1
      else
        like_count -= 1

      console.log("is_liked", is_liked)
      console.log("like_count", like_count)
      dispatch(setSelected({
        ...singleArticle,
        article: {
          ...singleArticle.article,
          is_liked,
          like_count
        }
      }))
    } else {
      dispatch(setSelected(singleArticle))
    }
  })
  .catch((err: any) => {
    console.error(err)
  })
}