/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import InputComponent from "@/components/input/Input";
import Seo from "@/components/Seo";
import { ImSpinner2 } from "react-icons/im";
import { FormButtonText, formArr, EditArticleText } from "@/constant";
import Button from "@/components/buttons/Button";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import { MdOutlineSend } from "react-icons/md";
import { useArticle } from "@/utils/hook";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { handleEditArticle } from "../api";
import { getSessionStorage } from "@/utils";

type ArticleProps = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  category: string;
  author: string;
};

export default function ArticlePage() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const articles = useSelector((state: any) => state.articles);
  const { id } = router.query;
  let storedId = getSessionStorage("articleId");
  const { data }: any = useArticle(storedId || (id as string));
  const initialValues = {
    title: "",
    content: "",
    category: "",
  };

  const [values, setValues] = useState<any>(initialValues);
  const loadEditData = () => {
    setLoading(true);
    if (articles?.data?.length > 0) {
      setValues(
        articles?.data?.filter((article: ArticleProps) => article?.id === id)[0]
      );
      setLoading(false);
    } else {
      setValues(data?.filter((article: ArticleProps) => article?.id === id)[0]);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEditData();
  }, [id, values, data]);

  const handleSubmit = async () => {
    const dataa = {
      id: id,
      title: values?.title,
      content: values?.content,
      category: values?.category,
    };

    setLoading(true);
    const auth = await handleEditArticle(dataa);
    if (auth.statusCode === 200) {
      router.push("/");
      Swal.fire({
        title: "Success!",
        text: "Article successfully updated",
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
          <div className="mb-[10vh] overflow-auto bg-white px-4  py-[20px] md:h-[90vh] md:px-[120px]">
            {typeof id === "undefined" || !values || values.title === "" ? (
              <div className="flex h-[40vh] w-full flex-col items-center justify-center">
                <ImSpinner2 className="animate-spin" />
              </div>
            ) : (
              <>
                <div className="flex flex-row items-center ">
                  <IoChevronBackCircleSharp
                    className="mr-5 cursor-pointer text-3xl"
                    onClick={() => {
                      router.back();
                    }}
                  />
                  <p className="font-bold text-black">{EditArticleText}</p>
                </div>
                {formArr.map(({ id, type, name, placeholder, options }) => {
                  return (
                    <div key={id}>
                      <p className="font-bold text-black">{placeholder} </p>
                      <InputComponent
                        name={name}
                        typee={type as any}
                        options={options}
                        isError={values && values[name] === "" ? true : false}
                        onChange={(e: any) => {
                          handleChange(e);
                        }}
                        value={values && values[name]}
                      />
                    </div>
                  );
                })}
                <div className="mt-5">
                  <Button
                    variant="primary"
                    className=""
                    isLoading={loading}
                    type="submit"
                    disabled={values?.title === ""}
                    onClick={values?.title === "" ? () => null : handleSubmit}
                  >
                    <MdOutlineSend />
                    <span className="ml-4 font-primary">{FormButtonText}</span>
                  </Button>
                </div>
              </>
            )}
          </div>
        </section>
        <Footer />
      </main>
    </Layout>
  );
}
