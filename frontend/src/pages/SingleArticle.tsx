import { useEffect } from "react"
import Markdown from '../components/Markdown';
import Homepage from "../layouts/Homepage"
import { Grid, } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useParams } from "react-router-dom";
import ISingleArticle from "../interfaces/SingleArticle.interface";
import { getArticle } from "../store/Article.slice";
import ArticleFooter from "../components/ArticleFooter";

const SingleArticle = () => {
  const dispatch = useDispatch();
  let singleArticle: ISingleArticle = useSelector((state: RootState): ISingleArticle => state.articles.selected);
  const params = useParams();

  useEffect(() => {
    getArticle(dispatch, params.slug || "")
  }, [dispatch, params])

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
        {Object.keys(singleArticle).length === 0 ? (
          <>loading</>
        ) : singleArticle.error ? (
          <>error</>
        ): (
          <>
            <Markdown
              className="markdown"
              key={singleArticle.article.id} 
              url={"/articles/" + singleArticle.article.slug}
              title={singleArticle.article.title} 
              isCutOff={false}
            >
              {singleArticle.article.body}
            </Markdown>

            <ArticleFooter singleArticle={singleArticle} />
          </>
        )}
      </Grid>
    </Homepage>
  )
}

export default SingleArticle;