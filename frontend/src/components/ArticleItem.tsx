import * as React from 'react';
import ReactMarkdown from 'markdown-to-jsx';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid } from '@mui/material';
import Markdown from './Markdown';
import moment from "moment";

export default function ArticleItem(props: any) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{
        background: "#fafafa",
        boxShadow: "none",
      }}>
        <CardMedia
          component="img"
          height="233"
          image={require("../assets/img/wp5852521.jpg").default}
          alt={props.title}
        />
        <CardContent>
          <Link href={props.url} >
            <Typography variant="h5" gutterBottom={true} component="div">
              {props.title}
            </Typography>
          </Link>

          <Markdown {...props} isCutOff/>
          <Link href={props.url} color="inherit">
            <Button size='small'>Read more...</Button>
          </Link>
        </CardContent>
        <CardContent>
          <Typography variant='caption' display="block" gutterBottom>
            Published {moment(props.article.created_date).fromNow()}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}