import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import Comment from "../interfaces/Comment.interface"
import { getLatest, createOne } from '../services/Comment.service'
import { likeComment, unlikeComment } from '../services/Like.service'
import LatestComments from '../interfaces/LatestComments.interface'
import { setUserName } from './User.slice'
import { clearFields } from 'redux-form'

// Define a type for the slice state
interface CommentState {
  latests: LatestComments
  add_comment_error: string | null
}

// Define the initial state using that type
const initialState: CommentState = {
  latests: {} as LatestComments,
  add_comment_error: null,
}

export const commentSlice = createSlice({
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
    addComment: (state, action: PayloadAction<Comment>) => {
      state.latests = {
        ...state.latests,
        total: state.latests.total + 1,
        comments: [
          action.payload,
          ...(state.latests.comments || []),
        ]
      }
    },
    setAddCommentError: (state, action: PayloadAction<string | null>) => {
      state.add_comment_error = action.payload
    }
  }
})

export const { setLatests, setComment, addComment, setAddCommentError } = commentSlice.actions

export default commentSlice.reducer

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

export const getLatestComments = (article_id: string, limit: number, page: number) => (dispatch: Dispatch<any>, getState: any) => {
  let latestComments: LatestComments = {} as LatestComments

  getLatest(article_id, limit, page)
  .then((response: any) => {
    if ( response.status === 200 ) {
      let comments: Comment[] = [];
      response.data.comments.forEach((item: any) => {
        comments.push(mapComment(item))
      })
      latestComments.limit = limit
      latestComments.page  = page
      latestComments.totalPage = response.data.totalPage
      latestComments.total = response.data.total

      let allComments = getState().comments.latests.comments || []
      comments = comments.filter((comment: Comment) => {
        let isFound = allComments.find((item: Comment) => {
          return comment.id === item.id
        })
        if ( isFound )
          return false

        return true
      })
      if ( comments.length === 0 ) {
        dispatch(getLatestComments(article_id, limit, page+1))
      } else {
        latestComments.comments = comments
        dispatch(setLatests(latestComments))
      }
    } else {
    }
  })
  .catch((err: any) => {
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

export const createComment = (dispatch: Dispatch<any>, article_id: string, name: string, body: string) => {
  dispatch(setAddCommentError(null))

  createOne(article_id, name, body)
  .then((response: any) => {
    if ( response.status === 201 ) {
      let comment: Comment = mapComment(response.data);
      dispatch(addComment(comment))
      dispatch(setUserName(name))
      dispatch(clearFields('comment', false, false, 'body'))
    } else {
      dispatch(setAddCommentError(response.data || "Unable to add comment, please try again later"))
    }
  })
  .catch((err: any) => {
    console.error(err)

    dispatch(setAddCommentError("Unable to add comment, please try again later"))
  })
}