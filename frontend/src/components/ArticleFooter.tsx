import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import ISingleArticle from "../interfaces/SingleArticle.interface";
import { toggleLikeArticle } from "../store/Article.slice";

interface ArticleFooterProps {
  singleArticle: ISingleArticle
}

export default function ArticleFooter(props: ArticleFooterProps) {
  const dispatch = useDispatch();
  const { singleArticle } = props;

  console.log("singleArticle", singleArticle)

  return (
    <>
      <IconButton onClick={() => toggleLikeArticle(dispatch, singleArticle)}>
        {
          singleArticle.article.is_liked ?
          <ThumbUpAltIcon />:
          <ThumbUpAltOutlinedIcon />
        }
      </IconButton>
      { singleArticle.article.like_count }
    </>
  );
}