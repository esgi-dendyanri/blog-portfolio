import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import Article from "../../interfaces/article"

// Define a type for the slice state
interface ArticleState {
  highlight: Article
  latests: Article[]
  selected: Article
}

// Define the initial state using that type
const initialState: ArticleState = {
  highlight: {} as Article,
  latests: [],
  selected: {} as Article,
}

export const counterSlice = createSlice({
  name: 'articles',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setHighlight: (state, action: PayloadAction<Article>) => {
      state.highlight = action.payload
    },
    setLatests: (state, action: PayloadAction<Article[]>) => {
      state.latests = action.payload
    },
    setSelected: (state, action: PayloadAction<Article>) => {
      state.selected = action.payload
    },
  }
})

export const { setHighlight, setLatests, setSelected } = counterSlice.actions

export const getHighlight = (state: RootState) : Article => state.articles.highlight
export const getLatests = (state: RootState) : Article[] => state.articles.latests
export const getSelected = (state: RootState) : Article => state.articles.selected

export default counterSlice.reducer