import React, { useState } from "react";
import { CommentButtonText } from "@/constant";
import { dateFormaterString } from "@/utils";
import { MdOutlineSend } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/router";
import { addCommentToArticle, removeCommentFromArticle } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import Button from "../buttons/Button";

import { handleAddComment } from "@/pages/api";

const CommentCard = () => {
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const user = useSelector((state: any) => state.user);

  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const handleComment = async () => {
    setLoading(true);
    const apiData: any = {
      id: id,
      sender: user.name,
      senderId: user.uid,
      senderPhoto: user.photo,
      comment: comment,
    };
    const payload: any = {
      articleId: id,
      comment: {
        sender: user.name,
        senderId: user.uid,
        senderPhoto: user.photo,
        comment: comment,
        timestamp: dateFormaterString(new Date().toString()),
      },
    };
    const res = await handleAddComment(apiData);
    dispatch(addCommentToArticle(payload));
    setLoading(false);
    if (res.statusCode !== 200) {
      dispatch(removeCommentFromArticle(payload));
    } else {
      setComment("");
    }
  };

  const updateComment = (text: any) => {
    setComment(text);
  };

  return (
    <div className="mt-3 flex w-full flex-col items-end rounded-lg border border-gray-200 p-2 outline-none md:flex-row md:items-center md:justify-between">
      <Image
        src={user?.photo}
        alt="google logo"
        width={35}
        height={35}
        className="hidden rounded-full md:flex"
      />
      <textarea
        onChange={(e) => updateComment(e.target.value as string)}
        name="text"
        value={comment}
        placeholder="What do you think?"
        className="h-[70px] w-full rounded-sm border border-white text-[14px] leading-[16px]"
      />
      <Button
        variant="primary"
        className="mt-3 md:mt-1"
        isLoading={loading}
        type="submit"
        disabled={comment === ""}
        onClick={comment === "" ? () => null : handleComment}
      >
        <MdOutlineSend />
        <span className="ml-4 font-primary">{CommentButtonText}</span>
      </Button>
    </div>
  );
};

export default React.memo(CommentCard);
