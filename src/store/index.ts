import { configureStore, createSlice } from '@reduxjs/toolkit'
import { initialArticlesObject, initialUser } from '@/constant'

// Create a slice for articles
const articlesSlice = createSlice({
  name: 'articles',
  initialState: initialArticlesObject,
  reducers: {
    getArticles: (state: any, action:any) => {
      return action.payload
    },
    addArticles: (state: any, action:any) => {
      state.data.push(action?.payload)
    },
    removeArticle: (state: any, action:any) => {
      state.data = state.data.filter((d: any) => d?.id !== action?.payload as string)
    },
  },
})

// Create a slice for page
const pageSlice = createSlice({
  name: 'page',
  initialState: 1,
  reducers: {
    nextPage: (state) => state + 1,
    prevPage: (state) => state - 1,
  },
})

// Create a slice for user
const userSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {
    setUser: (state: any, action:any) => {
      return action.payload
    },
    clearUser: () => {
      return initialUser
    },
  },
})

// Create a slice for searchQuery
const searchQuerySlice = createSlice({
  name: 'searchQuery',
  initialState: '',
  reducers: {
    updateSearchQuery: (state: any, action:any) => {
      return action.payload
    },
    clearSearchQuery: () => {
      return ''
    },
  },
})

export const { getArticles, addArticles, removeArticle } = articlesSlice.actions
export const { nextPage, prevPage } = pageSlice.actions
export const { setUser, clearUser } = userSlice.actions
export const { updateSearchQuery, clearSearchQuery } = searchQuerySlice.actions

// Create a Redux store that includes the posts slice
const store = configureStore({
  reducer: {
    articles: articlesSlice.reducer,
    page: pageSlice.reducer,
    user: userSlice.reducer,
    searchQuery: searchQuerySlice.reducer,
  },
})
export default store
// import { configureStore, createSlice } from '@reduxjs/toolkit'
// import { initialArticlesObject, initialUser } from '@/constant'

// const articlesSlice = createSlice({
//     name: 'articles',
//     initialState: initialArticlesObject,
//     reducers: {
//       getArticles: (action: any) => {
//         return action.payload
//       },
//       addArticles: (state: any, action: any) => {
//         state.data.push(action?.payload)
//       },
//       removeArticle: (state: any, action: any) => {
//         state.data = state.data.filter((d: any)=> d?.id !== action?.payload as string)
//       }
//       // other reducers...
//     },
//   })
  
// export const { getArticles, addArticles, removeArticle } = articlesSlice.actions



// const pageSlice = createSlice({
//     name: 'page',
//     initialState: 1,
//     reducers: {
//       nextPage: (state: any) => state + 1,
//       prevPage: (state:any) => state - 1,
//     },
//   })
  
//   export const { nextPage, prevPage } = pageSlice.actions

// // Create a slice for user
// const userSlice = createSlice({
//     name: 'user',
//     initialState: initialUser,
//     reducers: {
//       setUser: (action:any) => {
//         return action.payload
//       },
//       clearUser: () => {
//         return initialUser
//       }
//     },
//   })
  
//   export const { setUser, clearUser } = userSlice.actions


// // Create a slice for searchQuery
// const searchQuerySlice = createSlice({
//     name: 'searchQuery',
//     initialState: '',
//     reducers: {
//       updateSearchQuery: (action: any) => {
//         return action.payload
//       },
//       clearSearchQuery: () => {
//         return ''
//       }
//     },
//   })

// export const { updateSearchQuery, clearSearchQuery } = searchQuerySlice.actions

// // Create a Redux store that includes the posts slice
// const store = configureStore({
//   reducer: {
//     articles: articlesSlice.reducer,
//     page: pageSlice.reducer,
//     user: userSlice.reducer,
//     searchQuery: searchQuerySlice.reducer,
//   },
// })

// export default store
