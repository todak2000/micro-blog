import { signInWithPopup, signOut } from "firebase/auth";
import { provider, auth, db } from "@/firebase";
import { generateRandomCharacters } from "@/utils";
import { dateFormaterString } from "@/utils";
import {
  doc,
  setDoc,
  deleteDoc,
  arrayUnion,
  increment,
  arrayRemove,
} from "@firebase/firestore";

// Google Auth API
export const handleGoogleAuth = async (): Promise<
  | {
      statusCode: number;
      name: string;
      email: string;
      photo: string;
      uid: string;
    }
  | {
      statusCode: number;
      message: string;
    }
  | any
> => {
  try {
    const userCredentials = await signInWithPopup(auth, provider);
    return {
      statusCode: 200,
      name: userCredentials.user.displayName,
      email: userCredentials.user.email,
      photo: userCredentials.user.photoURL,
      uid: userCredentials.user.uid,
    };
  } catch (err: any) {
    return {
      statusCode: 405,
      message: err?.message,
    };
  }
};

// create New Article API
export const handleNewArticle = async (
  data: any
): Promise<
  | {
      statusCode: 200;
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
  | {
      statusCode: number;
      message: string;
    }
  | any
> => {
  try {
    let id = generateRandomCharacters();
    const articleRef = doc(db, "Articles", id);
    const newArticle = {
      id: id,
      title: data.title,
      content: data.content,
      createdAt: dateFormaterString(new Date().toString()),
      category: data.category,
      author: data.author,
      views: increment(0),
      likes: [],
      authorId: data.authorId,
      comments: [],
    };
    const res = await setDoc(articleRef, newArticle, { merge: true });
    return {
      statusCode: 200,
      article: newArticle,
    };
  } catch (err: any) {
    return {
      statusCode: 405,
      message: err?.message,
    };
  }
};

// Edit Article API
export const handleEditArticle = async (
  data: any
): Promise<
  | {
      statusCode: number;
    }
  | {
      statusCode: number;
      message: string;
    }
  | any
> => {
  try {
    const articleRef = doc(db, "Articles", data.id);
    const editedArticle = {
      title: data.title,
      content: data.content,
      createdAt: dateFormaterString(new Date().toString()),
      category: data.category,
    };
    const res = await setDoc(articleRef, editedArticle, { merge: true });
    return {
      statusCode: 200,
    };
  } catch (err: any) {
    return {
      statusCode: 405,
      message: err?.message,
    };
  }
};

// View Article Count API
export const handleViewArticle = async (
  id: string
): Promise<
  | {
      statusCode: number;
    }
  | {
      statusCode: number;
      message: string;
    }
  | any
> => {
  try {
    const viewRef = doc(db, "Articles", id);
    const res = await setDoc(
      viewRef,
      {
        views: increment(1),
      },
      { merge: true }
    );
    return {
      statusCode: 200,
    };
  } catch (err: any) {
    return {
      statusCode: 405,
      message: err?.message,
    };
  }
};

// Like Article API
export const handleLikeArticle = async (
  data: any
): Promise<
  | {
      statusCode: number;
    }
  | {
      statusCode: number;
      message: string;
    }
  | any
> => {
  try {
    const likeRef = doc(db, "Articles", data.id);
    const res = await setDoc(
      likeRef,
      {
        likes: arrayUnion(data.user),
      },
      { merge: true }
    );
    return {
      statusCode: 200,
    };
  } catch (err: any) {
    return {
      statusCode: 405,
      message: err?.message,
    };
  }
};

// Remove Like Article API
export const handleDislikeArticle = async (
  data: any
): Promise<
  | {
      statusCode: number;
    }
  | {
      statusCode: number;
      message: string;
    }
  | any
> => {
  try {
    const dislikeRef = doc(db, "Articles", data.id);
    const res = await setDoc(
      dislikeRef,
      {
        likes: arrayRemove(data.user),
      },
      { merge: true }
    );
    return {
      statusCode: 200,
    };
  } catch (err: any) {
    return {
      statusCode: 405,
      message: err?.message,
    };
  }
};

// Delete Article API
export const handleDeleteArticle = async (
  id: string
): Promise<
  | {
      statusCode: number;
      message: string;
    }
  | any
> => {
  try {
    const deleteRef = doc(db, "Articles", id);
    await deleteDoc(deleteRef);
    return {
      statusCode: 200,
      message: "Success!",
    };
  } catch (err: any) {
    return {
      statusCode: 405,
      message: err?.message,
    };
  }
};

// Add Comment to an Article
export const handleAddComment = async (
  data: any
): Promise<{ statusCode: number; message: string } | any> => {
  try {
    const commentRef = doc(db, "Articles", data.id);
    await setDoc(
      commentRef,
      {
        comments: arrayUnion({
          sender: data.sender,
          senderId: data.senderId,
          senderPhoto: data.senderPhoto,
          comment: data.comment,
          timestamp: dateFormaterString(new Date().toString()),
        }),
      },
      { merge: true }
    );

    return { statusCode: 200, message: "Comment added successfully!" };
  } catch (error) {
    return { statusCode: 501, message: "Oops! an error occurred" };
  }
};

// User Signout API
export const handleSignOut = async (): Promise<
  | {
      statusCode: number;
      message: string;
    }
  | any
> => {
  try {
    const logout = await signOut(auth);
    return {
      statusCode: 200,
      message: "Success!",
    };
  } catch (error: any) {
    return {
      statusCode: 405,
      message: error?.message,
    };
  }
};
