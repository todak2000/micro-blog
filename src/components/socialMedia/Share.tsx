import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { SocialMediaUrl } from "@/constant";

interface Props {
  title: string;
  articleId: string
}

const SocialMediaShare: React.FC<Props> = ({ title, articleId }) => {
  return (
    <>
      <FacebookShareButton url={`${SocialMediaUrl}/${articleId}`} title={title} quote={title}>
        <FacebookIcon size={25} round />
      </FacebookShareButton>
      <WhatsappShareButton url={`${SocialMediaUrl}/${articleId}`} separator=":: ">
        <WhatsappIcon size={25} round />
      </WhatsappShareButton>
      <TwitterShareButton url={`${SocialMediaUrl}/${articleId}`} title={title}>
        <TwitterIcon size={25} round />
      </TwitterShareButton>
    </>
  );
};

export default React.memo(SocialMediaShare);
