import { createSlice } from '@reduxjs/toolkit'
import {User} from "../models/user"
export const userSlice = createSlice({
    name: 'user',
    initialState: {
      users: [{}],
      loggedInUserId:""
    },
    reducers: {
      addUser: (state,action) => {
        state.users.push(action.payload.user);
      },
      addSentEmail: (state:any,action) => {
      
        state.users = state.users.map((user:User)=>{
            if(user.userId === action.payload.userId){
                if(user.sent){
                  user.sent.push(action.payload.mail)
                }
                else{
                  user.sent=[action.payload.mail];
                }
            }
            return user;
        })
      },
      addInboxEmail: (state:any,action) => {
        state.users = state.users.map((user:User)=>{
            if(user.userId === action.payload.userId){
              if(user.inbox){
                user.inbox.push(action.payload.mail)
              }
              else{
                user.inbox=[action.payload.mail];
              }
            }
            return user;
        })
      },
      setLoggedInUserId:(state:any,action)=>{
        state.loggedInUserId = action.payload.loggedInUserId
      },
      removeLoggedInUserId:(state:any,action)=>{
        state.loggedInUserId =undefined
      }
    }
  })
  export const selectUsers = (state:any) => state.users
  export const selectLoggedInUser = (state:any) => state.users.find((singleUser:User)=>singleUser.userId === state.loggedInUserId)
  export const { addUser, addSentEmail ,setLoggedInUserId, addInboxEmail,removeLoggedInUserId} = userSlice.actions