import { configureStore } from '@reduxjs/toolkit'
import { reducer as formReducer } from 'redux-form'
import articleSlice from './Article.slice'
import userSlice from './User.slice'
import commentSlice from './Comment.slice'

const logger = (store: any) => (next: Function) => (action: object) => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

const store = configureStore({
  reducer: {
    articles: articleSlice,
    users: userSlice,
    comments: commentSlice,
    form: formReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store