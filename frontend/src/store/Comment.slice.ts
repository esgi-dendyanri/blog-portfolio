import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import Comment from "../interfaces/Comment.interface"
import { getLatest } from '../services/Comment.service'
import { likeComment, unlikeComment } from '../services/Like.service'
import LatestComments from '../interfaces/LatestComments.interface'

// Define a type for the slice state
interface CommentState {
  latests: LatestComments
}

// Define the initial state using that type
const initialState: CommentState = {
  latests: {} as LatestComments,
}

export const counterSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setLatests: (state, action: PayloadAction<LatestComments>) => {
      state.latests = {
        ...action.payload,
        comments: [
          ...(state.latests.comments || []),
          ...(action.payload.comments || [])
        ]
      }
    },
    setComment: (state, action: PayloadAction<Comment>) => {
      let comments = [...state.latests.comments]
      comments = comments.map((comment) => {
        if ( comment.id === action.payload.id ) {
          comment = action.payload
        }
        return comment
      })
      state.latests.comments = comments
    },
  }
})

export const { setLatests, setComment } = counterSlice.actions

export default counterSlice.reducer

const mapComment: Function = (item: any): Comment => {
  let comment: Comment = {} as Comment;
  comment.id = item._id
  comment.name = item.name
  comment.body = item.body
  comment.like_count = item.like_count
  comment.is_liked = item.is_liked
  comment.created_date = item.created_date

  return comment;
}

export const getLatestComments = (dispatch: Dispatch<any>, article_id: string, limit: number, page: number) => {
  let latestComments: LatestComments = {} as LatestComments

  getLatest(article_id, limit, page)
  .then((response: any) => {
    console.log("response", response)
    if ( response.status === 200 ) {
      let comments: Comment[] = [];
      response.data.comments.forEach((item: any) => {
        comments.push(mapComment(item))
      })
      latestComments.limit = limit
      latestComments.page  = page
      latestComments.totalPage = response.data.totalPage
      latestComments.total = response.data.total
      latestComments.comments = comments
      dispatch(setLatests(latestComments))
    } else {
    }
  })
  .catch((err: any) => {
    // console.log("Asdasd")
    // console.error(err)
    latestComments.error = "Not responding"

    dispatch(setLatests(latestComments))
  })
}

export const toggleLikeComment = (dispatch: Dispatch<any>, comment: Comment) => {
  let likeFunc: Function;

  likeFunc = comment.is_liked ? unlikeComment : likeComment

  likeFunc(comment.article, comment.id)
  .then((response: any) => {
    if ( response.status === 200 ) {
      let is_liked: boolean = !comment.is_liked
      let like_count: number = comment.like_count
      if ( is_liked )
        like_count += 1
      else
        like_count -= 1

      dispatch(setComment({
        ...comment,
        is_liked,
        like_count,
      }))
    } else {
    }
  })
  .catch((err: any) => {
    console.error(err)
  })
}