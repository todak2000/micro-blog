export const LandingPageHeader = "Simple Blogging Platform";
export const SocialMediaUrl = "https://micro-blog-khaki.vercel.app/article";
export const LandingPageText =
  "A simple blogging platform using Next.js, React, TypeScript, Redux, React Query, TailwindCss. The platform is user-friendly, and the code well-organized and documented.";
export const LandingPageLinkText = "See the repository";
export const GoogleButtonText = "Sign in with Google";
export const GoogleLogo = "/svg/logo.svg";
export const PersonalGithubLink = "https://github.com/todak2000";
export const AppGithubLink = "https://github.com/todak2000/micro-blog";
export const Name = "Daniel Olagunju";
export const LogoText = "Daniel's Blog";
export const FormButtonText = "Submit";
export const CreateArticleText = "Create Article";
export const EditArticleText = "Edit Article";
export const NewArticleText = "Create Article";
export const SignInText = "Sign in with Google";
export const SignInTextMobile = "Sign in";
export const SignOutText = "Sign out";
export const CardButtonLinkText = "Read full Article";
export const CommentButtonText = "Comment";
export const NotFoundText = "Page Not Found";
export const BackText = "Back to Home";
export const NoCommentText = "If you would like to comment, kindly login";
export const initialArticlesObject = {
  data: [],
  isLoading: true,
  isError: false,
  error: null,
};
export const initialUser = {
  name: "",
  email: "",
  photo: "",
  uid: "",
};

export const formArr = [
  {
    id: 1,
    type: "text",
    name: "title",
    placeholder: "Title of Article",
    options: [],
  },

  {
    id: 2,
    type: "select",
    name: "category",
    placeholder: "Article Category",
    options: [
      { value: "Select", label: "Select Article Category" },
      { value: "Web", label: "Web" },
      { value: "Mobile", label: "Mobile" },
      { value: "General", label: "General" },
    ],
  },
  {
    id: 3,
    type: "textarea",
    name: "content",
    placeholder: "Article Content",
    options: [],
  },
];
