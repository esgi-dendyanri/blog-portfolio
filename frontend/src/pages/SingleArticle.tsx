import { useEffect } from "react"
import Markdown from '../components/Markdown';
import Homepage from "../layouts/Homepage"
import { Grid, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useParams } from "react-router-dom";
import moment from "moment";
import ISingleArticle from "../interfaces/SingleArticle.interface";
import LatestComments from '../interfaces/LatestComments.interface';
import { getArticle } from "../store/Article.slice";
import ArticleFooter from "../components/ArticleFooter";
import CircleIcon from "@mui/icons-material/Circle";

const SingleArticle = () => {
  const dispatch = useDispatch();
  let singleArticle: ISingleArticle = useSelector((state: RootState): ISingleArticle => state.articles.selected);
  let comments: LatestComments = useSelector((state: RootState): LatestComments => state.comments.latests);
  const params = useParams();

  useEffect(() => {
    getArticle(dispatch, params.slug || "")
  }, [params])

  console.log("comments", comments)

  return (
    <Homepage>
      <Grid
        item
        xs={12}
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
            <Box
              mb={2}
            >
              <Typography variant="h2">
                {singleArticle.article.title}
              </Typography>
              <Typography variant="subtitle1" color="#888">
                <span title={moment(singleArticle.article.created_date).format('LLLL')} style={{textDecoration: "underline #ccc", cursor: "help"}}>
                  Published {moment(singleArticle.article.created_date).fromNow()}
                </span>
                <CircleIcon sx={{ fontSize: "8px", margin: "auto 10px"}} />
                {
                  comments && comments.total > 0 ?
                    comments.total + " " + (comments.total > 1 ? "comments": "comment") :
                    "No comment"
                }
              </Typography>
            </Box>

            <Markdown
              className="markdown"
              key={singleArticle.article.id} 
              url={"/articles/" + singleArticle.article.slug}
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