import { useEffect, } from "react"
import Markdown from '../components/Markdown';
import Homepage from "../layouts/Homepage"
import Article from "../interfaces/Article.interface"
import LatestArticles from "../interfaces/LatestArticles.interface";
import { getLatestArticles } from "../store/Article.slice"
import { Grid, Pagination, PaginationItem, Link } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";

const Home = () => {
  const dispatch = useDispatch();
  let latestArticles: LatestArticles = useSelector((state: RootState): LatestArticles => state.articles.latests);
  const limit = 3
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page: number = parseInt(query.get('page') || "") as number

  useEffect(() => {
    getLatestArticles(dispatch, limit, page)
  }, [dispatch, page])

  return (
    <Homepage>
      <Grid
        item
        xs={12}
        md={8}
        sx={{
          '& .markdown': {
            display: "block",
            borderBottom: "1px solid gray",
            marginBottom: "30px",
            paddingBottom: "20px",
          },
        }}
      >
        {Object.keys(latestArticles).length === 0 || latestArticles.total == null ? (
          <>loading</>
        ) : latestArticles.error ? (
          <>error</>
        ): latestArticles.total === 0 ? (
          <>empty</>
        ): (
          <>
            {latestArticles.articles.map((article: Article, i: number) => (
              <Markdown
                className="markdown"
                key={article.id} 
                url={"/articles/" + article.slug}
                title={article.title} 
                isCutOff={true}
              >
                {article.body}
              </Markdown>
            ))}

            <Pagination
              page={page+1}
              count={latestArticles.totalPage}
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  href={`/articles?page=${item.page-1}`}
                  {...item}
                />
              )}
            />
          </>
        )}
      </Grid>
    </Homepage>
  )
}

export default Home