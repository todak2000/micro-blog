import { signInWithPopup, signOut } from "firebase/auth";
import { provider, auth, db } from "@/firebase";
import { generateRandomCharacters } from "@/utils";
import { dateFormaterString } from "@/utils";
import { doc, setDoc, deleteDoc } from "@firebase/firestore";

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
    console.log(err);
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
      authorId: data.authorId,
    };
    const res = await setDoc(articleRef, newArticle, { merge: true });
    return {
      statusCode: 200,
      article: newArticle,
    };
  } catch (err: any) {
    console.log(err);
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
    console.log(err);
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
    console.log(err);
    return {
      statusCode: 405,
      message: err?.message,
    };
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
    console.log(logout);
    return {
      statusCode: 200,
      message: "Success!",
    };
  } catch (error: any) {
    console.log(error);
    return {
      statusCode: 405,
      message: error?.message,
    };
  }
};
