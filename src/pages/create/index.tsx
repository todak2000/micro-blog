import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { formArr, CreateArticleText, FormButtonText } from "@/constant";
import Swal from "sweetalert2";
import Seo from "@/components/Seo";
import { handleNewArticle } from "../api";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { addArticles } from "@/store";
import InputComponent from "@/components/input/Input";
import Button from "@/components/buttons/Button";
import { MdOutlineSend } from "react-icons/md";

function CreateArticlePage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const initialValues = {
    title: "",
    content: null,
    category: formArr[1].options[3].label,
  };

  const [values, setValues] = useState<any>(initialValues);

  const handleSubmit = async () => {
    const data = {
      title: values.title,
      content: values.content,
      category: values.category,
      author: user.name,
      authorId: user.uid,
    };
    setLoading(true);
    const auth = await handleNewArticle(data);
    if (auth.statusCode === 200) {
      dispatch(addArticles(auth.article));
      router.push("/");
      Swal.fire({
        title: "Success!",
        text: "Article successfully created",
        icon: "success",
      });

      setLoading(false);
    } else {
      setLoading(false);
      Swal.fire({
        title: "Error!",
        text: "Please try again later",
        icon: "error",
      });
    }
  };
  const handleChange = (
    event:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | any
  ) => {
    if (event?.target) {
      const { name, value } = event.target;
      setValues({
        ...values,
        [name]: value,
      });
    } else {
      setValues({
        ...values,
        content: event,
      });
    }
  };

  return (
    <Layout>
      <Seo />

      <main>
        <section className="bg-main min-h-screen">
          <Header />
          <div className="h-[90vh] overflow-auto bg-white  px-4 py-[20px] md:px-[120px]">
            <div className="flex flex-row items-center ">
              <IoChevronBackCircleSharp
                className="mr-5 cursor-pointer text-3xl"
                onClick={() => {
                  router.back();
                }}
              />
              <p className="font-bold text-black">{CreateArticleText}</p>
            </div>
            {formArr.map(({ id, type, name, placeholder, options }) => {
              return (
                <div key={id}>
                  <p className="font-bold text-black">{placeholder} </p>
                  <InputComponent
                    name={name}
                    typee={type as any}
                    options={options}
                    isError={values[name] === "" ? true : false}
                    onChange={(e: any) => {
                      handleChange(e);
                    }}
                    value={values[name]}
                  />
                </div>
              );
            })}
            <div className="mt-5">
              <Button
                variant="primary"
                isLoading={loading}
                type="submit"
                disabled={values.title === ""}
                onClick={values.title === "" ? () => null : handleSubmit}
              >
                <MdOutlineSend />
                <span className="ml-4 font-primary">{FormButtonText}</span>
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </Layout>
  );
}
export default React.memo(CreateArticlePage);
