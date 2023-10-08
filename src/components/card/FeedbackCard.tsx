import React from "react";
import Image from "next/image";

const ResponseCard = ({ comment }: any) => {
  return (
    <div className=" my-3 flex w-full flex-row items-start rounded-sm p-3">
      <Image
        src={comment?.senderPhoto}
        alt="user picture"
        width={35}
        height={35}
        className="mr-3 rounded-full border"
      />

      <div className="flex flex-col">
        <p className="mb-2 text-[14px] font-medium leading-[16px]">
          {comment.sender}
        </p>
        <p className="text-justify text-[12px] font-normal leading-[14px]">
          {comment.comment}
        </p>
        <span className="mt-3 text-[9px] font-medium leading-[10px] text-[#a1a1a1]">
          {comment.timestamp}
        </span>
      </div>
    </div>
  );
};

const FeedbackCard = ({ comments }: any) => {
  let reverseComments = comments ? comments.slice().reverse() : [];
  return (
    <div className="my-3 flex max-h-[40vh] w-full flex-col overflow-auto border-l-2 border-green-400 pb-3">
      {reverseComments?.length > 0
        ? reverseComments?.map((comment: any) => {
            return <ResponseCard key={comment?.timestamp} comment={comment} />;
          })
        : null}
    </div>
  );
};

export default React.memo(FeedbackCard);
