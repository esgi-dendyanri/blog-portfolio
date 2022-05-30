import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import { Button, IconButton } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import ISingleArticle from "../interfaces/SingleArticle.interface";
import { toggleLikeArticle } from "../store/Article.slice";
import { getLatestComments } from '../store/Comment.slice';
import LatestComments from '../interfaces/LatestComments.interface';
import { RootState } from '../store/store';
import Comment from './Comment';

interface CommentWrapperProps {
  singleArticle: ISingleArticle
}

export default function CommentWrapper(props: CommentWrapperProps) {
  const dispatch = useDispatch();
  const { singleArticle } = props;
  const limit = 2
  const [page, setPage] = React.useState(0)
  let comments: LatestComments = useSelector((state: RootState): LatestComments => state.comments.latests);

  React.useEffect(() => {
    getLatestComments(dispatch, singleArticle.article.id, limit, page)
  }, [dispatch, page])

  return (
    <div>
      {Object.keys(comments).length === 0 ? (
        <>loading</>
      ) : comments.error ? (
        <>error</>
      ): (
        <>
          {comments.comments.map((comment) => (<Comment key={comment.id} comment={comment} />))}

          {comments.totalPage > page + 1 ?
          (
            <Button variant='outlined' size='large' onClick={() => setPage(page+1)}>
              Show more comments
            </Button>
          ) : false}
        </>
      )}
    </div>
  );
}