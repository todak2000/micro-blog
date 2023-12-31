import { configureStore, createSlice } from "@reduxjs/toolkit";
import { initialArticlesObject, initialUser } from "@/constant";

// Create a slice for articles
const articlesSlice = createSlice({
  name: "articles",
  initialState: initialArticlesObject,
  reducers: {
    getArticles: (state: any, action: any) => {
      return action.payload;
    },
    addArticles: (state: any, action: any) => {
      state.data.push(action?.payload);
    },
    removeArticle: (state: any, action: any) => {
      state.data = state.data.filter(
        (d: any) => d?.id !== (action?.payload as string)
      );
    },
    addCommentToArticle: (state: any, action: any) => {
      const article = state.data.find(
        (d: any) => d.id === action.payload.articleId
      );
      if (article) {
        if (!article.comments) {
          article.comments = [];
        }
        article.comments.push(action.payload.comment);
      }
    },
    removeCommentFromArticle: (state: any, action: any) => {
      const article = state.data.find(
        (d: any) => d.id === action.payload.articleId
      );
      if (article && article.comments) {
        article.comments = article.comments.filter(
          (c: any) => c.timestamp !== action.payload.commentTimestamp
        );
      }
    },
    countArticleView: (state: any, action: any) => {
      const article = state.data.find(
        (d: any) => d.id === action.payload.articleId
      );
      if (article) {
        if (!article.views) {
          article.views = 0;
        }
        article.views += 1;
      }
    },
    reverseCountArticleView: (state: any, action: any) => {
      const article = state.data.find(
        (d: any) => d.id === action.payload.articleId
      );
      if (article) {
        if (!article.views) {
          article.views = 0;
        }
        article.views -= 1;
      }
    },
    likeArticle: (state: any, action: any) => {
      const article = state.data.find(
        (d: any) => d.id === action.payload.articleId
      );
      if (article) {
        if (!article.likes) {
          article.likes = [];
        }
        article.likes.push(action.payload.user);
      }
    },
    dislikeArticle: (state: any, action: any) => {
      const article = state.data.find(
        (d: any) => d.id === action.payload.articleId
      );
      if (article && article.likes) {
        article.likes = article.likes.filter(
          (c: string) => c !== action.payload.user
        );
      }
    },
  },
});

// Create a slice for page
const pageSlice = createSlice({
  name: "page",
  initialState: 1,
  reducers: {
    nextPage: (state) => state + 1,
    prevPage: (state) => state - 1,
  },
});

// Create a slice for user
const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    setUser: (state: any, action: any) => {
      return action.payload;
    },
    clearUser: () => {
      return initialUser;
    },
  },
});

// Create a slice for searchQuery
const searchQuerySlice = createSlice({
  name: "searchQuery",
  initialState: "",
  reducers: {
    updateSearchQuery: (state: any, action: any) => {
      return action.payload;
    },
    clearSearchQuery: () => {
      return "";
    },
  },
});

export const {
  getArticles,
  addArticles,
  removeArticle,
  addCommentToArticle,
  removeCommentFromArticle,
  countArticleView,
  reverseCountArticleView,
  likeArticle,
  dislikeArticle,
} = articlesSlice.actions;
export const { nextPage, prevPage } = pageSlice.actions;
export const { setUser, clearUser } = userSlice.actions;
export const { updateSearchQuery, clearSearchQuery } = searchQuerySlice.actions;

// Create a Redux store that includes the posts slice
const store = configureStore({
  reducer: {
    articles: articlesSlice.reducer,
    page: pageSlice.reducer,
    user: userSlice.reducer,
    searchQuery: searchQuerySlice.reducer,
  },
});

export default store;
