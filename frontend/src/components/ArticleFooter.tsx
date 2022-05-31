import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import { Alert, IconButton } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import ISingleArticle from "../interfaces/SingleArticle.interface";
import { toggleLikeArticle } from "../store/Article.slice";
import { createComment } from "../store/Comment.slice";
import CommentWrapper from './CommentWrapper';
import CommentForm from './forms/CommentForm';
import { RootState } from '../store/store';

interface ArticleFooterProps {
  singleArticle: ISingleArticle
}

export default function ArticleFooter(props: ArticleFooterProps) {
  const dispatch = useDispatch();
  const { singleArticle } = props;
  let addCommentError: string | null = useSelector((state: RootState): string | null => state.comments.add_comment_error);

  const onSubmit = (event: any) => {
    createComment(dispatch, singleArticle.article.id, event.name, event.body)
  }

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

      {addCommentError ? (
        <Alert severity='error'>{addCommentError}</Alert>
      ) : false}

      <CommentForm onSubmit={onSubmit}/>

      <CommentWrapper singleArticle={singleArticle} />
    </>
  );
}