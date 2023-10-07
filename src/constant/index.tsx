// Home
export const LandingPageHeader = "Simple Blogging Platform";
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
export const NewArticleText = "New Article";
export const SignInText = "Sign in with Google";
export const SignInTextMobile = "Sign in";
export const SignOutText = "Sign out";
export const CardButtonLinkText = "Read full Article";
export const initialArticles = [
  {
    id: "1",
    title: "First Article",
    content: `This blog page focuses the viewer on a three-column grid with buttons to encourage the visitor to click through to read the article. As the blog doesn’t use featured article sliders or images, the visitor can quickly see a number of articles that may interest them.

        This would suit a blog where the reader doesn’t need to be guided to a specific article, but gives equal importance to all the articles. The category selection at the top of the grid means the users can quickly get to the area they are interested in.`,
    createdAt: new Date(),
    category: "Mobile",
    author: "Fiyin Chukwuma",
  },
  {
    id: "2",
    title: "Second Article",
    content: `This blog page focuses the viewer on a three-column grid with buttons to encourage the visitor to click through to read the article. As the blog doesn’t use featured article sliders or images, the visitor can quickly see a number of articles that may interest them.

        This would suit a blog where the reader doesn’t need to be guided to a specific article, but gives equal importance to all the articles. The category selection at the top of the grid means the users can quickly get to the area they are interested in.`,
    createdAt: new Date(),
    category: "Mobile",
    author: "Gbadebo Atiku",
  },
  // { id: '2', title: 'Second Article', content: 'Here is another post.' },
  // { id: '3', title: 'First Article', content: 'Hello, this is the first post.' },
  // { id: '4', title: 'Second Article', content: `This blog page focuses the viewer on a three-column grid with buttons to encourage the visitor to click through to read the article. As the blog doesn’t use featured article sliders or images, the visitor can quickly see a number of articles that may interest them.

  // This would suit a blog where the reader doesn’t need to be guided to a specific article, but gives equal importance to all the articles. The category selection at the top of the grid means the users can quickly get to the area they are interested in.` },
  // { id: '5', title: 'First Article', content: 'Hello, this is the first post.' },
  // { id: '6', title: 'Second Article', content: 'Here is another post.' },
  // { id: '7', title: 'First Article', content: 'Hello, this is the first post.' },
  // { id: '8', title: 'Second Article', content: 'Here is another post.' },
  // add more posts as needed
];
// Define initial posts data

export const initialArticlesObject = {
  // data: initialArticles,
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

export const navBarItems = [
  {
    id: 1,
    name: "About Us",
    route: "/",
  },
  {
    id: 2,
    name: "Pricing",
    route: "/",
  },
  {
    id: 3,
    name: "Resources",
    route: "/",
  },
];

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
