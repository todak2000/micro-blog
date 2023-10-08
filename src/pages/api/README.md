# Simple Blogging Platform API documentation

This is the Offical API documentation for a simple blogging platform API using Firebase, React Query, and other technologies. The project aims to create a user-friendly website where users can create, read, update, and delete blog posts.

API endpoints can be found [here](src/pages/api/index.tsx) at `src/pages/api/index.tsx`.

ONCE AGAIN ensure that you have a Firebase account and a project with Firestore database enabled as it would require that the Firebase api keys and other variables be used. Kindly refer to `.env.example` for guidance.

## Installation

Provided you follow the instructions [here](README.md): `README.md`. you have nothing else to do

## Features Endpoints

This project implements the following features endpoints:
### Google Authentication (Signup/SignIn)

**handleGoogleAuth()**

**Description:**

Users can sign in with their Google account. The `handleGoogleAuth` function is used for this purpose.

**Parameters:**
None

**Returns:**

An email is sent to the registered account for verification and a promise that resolves with the following object:

```
<!-- success result -->
  {
      statusCode: number;
      name: string;
      email: string;
      photo: string;
      uid: string;
  }
  <!-- OR -->
  <!-- failure result -->
  {
      statusCode: number;
      message: string;
  }
```

### CRUD Operations endpoints

**handleNewArticle()**

**Description:**

Create : Authenticated Users can create articles. Each article has a title, content, category and a created/updated timestamp.

**Parameters:**

```
  {
      title: string,
      content: string,
      category: string,
      author: string,
      authorId: string,
  }

```

**Returns:**

A promise that resolves with the following object:

```
 <!-- success result -->
  {
      statusCode: number;
      article: {
        id: string;
        title: string;
        content: string;
        createdAt: string;
        category: string;
        author: string;
        authorId: string;
      };
  }
  <!-- OR -->
  <!-- failure result -->
  {
      statusCode: number;
      message: string;
  }
```

**useArticles()**

**Description:**

Read : Any Users can read available articles. This was implemented using React Query. A customized react query hook `useArticles` was used to fetch articles from Firebase and update the Redux `articles` state array. This is then rendered/mapped into the `Article Card Component` here - `src/components/card/ArticleCard.tsx` accordingly.

**handleEditArticle()**

**Description:**

Update : Authenticated Users can update their own articles. Any of these article items can be edited - title, content, and category.

**Parameters:**

```
  {
      id: string, // article ID
      title: string,
      content: string,
      category: string,
  }

```

**Returns:**

A promise that resolves with the following object:

```
 <!-- success result -->
  {
      statusCode: number;
  }
  <!-- OR -->
  <!-- failure result -->
  {
      statusCode: number;
      message: string;
  }
```

## Add Comment to Article

**handleAddComment()**

**Description:**

Update : The `handleAddComment` endpoint allow Authenticated users to comment on an article - own or otherwise. 

**Parameters:**

```
{
    id:string, // article ID
    sender: string,
    senderId: string,
    senderPhoto: string,
    comment: string,
}
```
**Returns:**

A promise that resolves with the following object:

```
  {
    statusCode: number;
    message: string;
  }
```

**handleDeleteArticle()**

**Description:**

Delete : Authenticated Users can delete their own articles.

**Parameters:**

```
  {
      id: string, // article ID
  }

```

**Returns:**

A promise that resolves with the following object:

```
  {
      statusCode: number;
      message: string;
  }
```

## Signout

**handleSignOut()**

**Description:**

User Sign Out: . The function is used for this operation
The `handleSignOut` endpoint allow Users can sign out from their account

**Parameters:**
None

**Returns:**

A promise that resolves with the following object:

```
  {
    statusCode: number;
    message: string;
  }
```

**Status:**

The status of the responses. Possible values are:

- 200 - successfull.
- 405 - failed request.

## Technologies Used

This project uses the following technologies:

- 🎉 Firebase - A platform that provides various backend services such as authentication, database, storage, etc.
- 🎉 React Query - A library for fetching, caching, and updating data in React applications.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

[Daniel Olagunju](https://github.com/todak2000)
