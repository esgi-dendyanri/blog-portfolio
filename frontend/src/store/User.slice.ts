import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import User from "../interfaces/User.interface"
import { getUserId as getUserIdAPI } from '../services/User.service'
import Cookies from 'js-cookie'

// Define the initial state using that type
const initialState: User = {} as User

export const counterSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.id = action.payload
      Cookies.set("user_id", action.payload, { expires: 365 })
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
      Cookies.set("user_name", action.payload, { expires: 365 })
    },
  }
})

export const { setUserId, setUserName } = counterSlice.actions

export default counterSlice.reducer

export const getUserId = (dispatch: Dispatch<any>) => {
  if ( Cookies.get("user_id") ) {
    dispatch(setUserId(Cookies.get("user_id") || ""))
  } else {
    getUserIdAPI()
    .then((response: any) => {
      if ( response.status === 200 ) {
        dispatch(setUserId(response.data))
      }
    })
    .catch((err: any) => {
      console.error(err)
    })
  }
}