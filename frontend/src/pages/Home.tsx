import { useEffect } from "react"
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import Markdown from '../components/Markdown';
import Homepage from "../layouts/Homepage"
import {getLatest} from "../services/articles"
import { setLatests } from "../store/slices/articleSlice"
import Article from "../interfaces/article"
import { useAppSelector, useAppDispatch } from "../store/hooks"

const Home = () => {
  const dispatch = useAppDispatch();
  let latestArticles: Article[] = useAppSelector((state) => state.articles.latests);

  useEffect(() => {
    getLatest(3, 0)
    .then((response: any) => {
      if ( response.status === 200 ) {
        let articles: Article[] = [];
        response.data.forEach((item: any) => {
          let article: Article = {} as Article;
          article.title = item.title
          article.body = item.body
          articles.push(article)
        })
        dispatch(setLatests(articles))
      }
    })
    .catch((err: any) => {
      console.error(err)
    })
  }, [dispatch])

  return (
    <Homepage>
      <Grid
        item
        xs={12}
        md={8}
        sx={{
          '& .markdown': {
            py: 3,
          },
        }}
      >
        asdasd
        {latestArticles.map((article: Article, i: number) => (
          <Markdown className="markdown" key={article.body.substring(0, 40)}>
            {article.body.substring(0, 40)}
          </Markdown>
        ))}
      </Grid>
    </Homepage>
  )
}

export default Home