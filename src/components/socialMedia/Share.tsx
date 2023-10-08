import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {FaFacebook, FaTwitter, FaWhatsapp} from 'react-icons/fa'
import { SocialMediaUrl } from "@/constant";

interface Props {
  title: string;
  articleId: string
}

const SocialMediaShare: React.FC<Props> = ({ title, articleId }) => {
  return (
    <>
      <FacebookShareButton url={`${SocialMediaUrl}/${articleId}`} title={title} quote={title}>
        <FaFacebook size={25} color="#4267B2"/>
      </FacebookShareButton>
      <WhatsappShareButton url={`${SocialMediaUrl}/${articleId}`} separator=":: ">
        <FaWhatsapp size={25} color="#25D366"/>
      </WhatsappShareButton>
      <TwitterShareButton url={`${SocialMediaUrl}/${articleId}`} title={title}>
        <FaTwitter size={25} color="#1D9BF0"/>
      </TwitterShareButton>
    </>
  );
};

export default React.memo(SocialMediaShare);
