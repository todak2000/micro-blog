import React, {useState} from "react";
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
  const [comment, setComment] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const user = useSelector((state: any) => state.user);

  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  
  const handleComment = async() => {
    setLoading(true)
    const apiData: any = {
      id:id,
      sender: user.name,
      senderId: user.uid,
      senderPhoto: user.photo,
      comment: comment,
    }
    const payload: any = {
      articleId:id,
      comment: {
        sender: user.name,
        senderId: user.uid,
        senderPhoto: user.photo,
        comment: comment, 
        timestamp: dateFormaterString(new Date().toString()),
      }
    }
    const res = await handleAddComment(apiData)
    dispatch(addCommentToArticle(payload));
    setLoading(false)
    if (res.statusCode !== 200) {
      dispatch(removeCommentFromArticle(payload));
    }else{
      setComment('')
    }
     
  };

  const updateComment = (text: any) => {
    setComment(text)
  };

  return (
    <div className="border p-2 border-gray-200 outline-none mt-3 rounded-lg w-full flex flex-col md:flex-row md:justify-between md:items-center items-end">
      <Image
        src={user?.photo}
        alt="google logo"
        width={35}
        height={35}
        className="hidden md:flex rounded-full"
      />
      <textarea onChange={(e) => updateComment(e.target.value as string)} name="text" value={comment} placeholder="What do you think?" className="w-full rounded-sm border border-white h-[70px] text-[14px] leading-[16px]" />
      <Button
        variant="primary"
        className="mt-3 md:mt-1"
        isLoading={loading}
        type="submit"
        disabled={comment=== ""}
        onClick={comment === "" ? () => null : handleComment}
      >
        <MdOutlineSend />
        <span className="ml-4 font-primary">{CommentButtonText}</span>
      </Button>
    </div>
  );
};

export default React.memo(CommentCard);
