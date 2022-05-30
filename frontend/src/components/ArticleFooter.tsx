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
import CommentWrapper from './CommentWrapper';
import CommentForm from './forms/CommentForm';

interface ArticleFooterProps {
  singleArticle: ISingleArticle
}

export default function ArticleFooter(props: ArticleFooterProps) {
  const dispatch = useDispatch();
  const { singleArticle } = props;

  const onSubmit = (event: any) => {
    console.log("event", event);
  }

  console.log("singleArticle", singleArticle)

  return (
    <>
      <Box
        color="primary"
        sx={{
          borderBottom: "1px solid #ddd",
          mb: 5
        }}
      >
        <IconButton onClick={() => toggleLikeArticle(dispatch, singleArticle)} color="primary">
          {
            singleArticle.article.is_liked ?
            <ThumbUpAltIcon  />:
            <ThumbUpAltOutlinedIcon />
          }
        </IconButton>
        { singleArticle.article.like_count }
      </Box>

      <CommentForm onSubmit={onSubmit}/>

      <CommentWrapper singleArticle={singleArticle} />
    </>
  );
}