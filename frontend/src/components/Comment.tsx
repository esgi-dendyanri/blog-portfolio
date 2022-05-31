import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { red } from '@mui/material/colors';
import IComment from "../interfaces/Comment.interface";
import { toggleLikeComment } from "../store/Comment.slice";
import moment from "moment";

interface CommentProps {
  comment: IComment
}

export default function Comment(props: CommentProps) {
  const dispatch = useDispatch();
  const { comment } = props;
  const limit = 3
  const [page, setPage] = React.useState(0)

  let initialName = (() => {
    let names = comment.name.split(" ")
    names = names.map((name: string) : string => {
      return name[0]
    })
    return names.join("").toUpperCase().substring(0, 2)
  })()

  return (
    <Card sx={{
      marginBottom: 2,
      boxShadow: "none",
      borderColor: "primary.main",
      borderWidth: "1px",
      borderStyle: "solid",
    }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }}>
            {initialName}
          </Avatar>
        }
        title={comment.name}
        subheader={(
          <span title={moment(comment.created_date).format('LLLL')} style={{textDecoration: "underline #ccc", cursor: "help"}}>
            {moment(comment.created_date).fromNow()}
          </span>
        )}
      />
      <CardContent>
        <Typography variant='body2' color="text.secondary">
          {comment.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={() => toggleLikeComment(dispatch, comment)} color='primary'>
          {
            comment.is_liked ?
            <ThumbUpAltIcon />:
            <ThumbUpAltOutlinedIcon />
          }
        </IconButton>
        {comment.like_count}
      </CardActions>
    </Card>
  );
}