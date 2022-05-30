import API from "./api"

export const likeArticle: any = (article_id: string) => {
  return API({
    url: "likes",
    method: "POST",
    data: {
      article_id
    }
  })
}

export const unlikeArticle: any = (article_id: string) => {
  return API({
    url: "likes",
    method: "DELETE",
    params: {
      article_id
    }
  })
}

export const likeComment: any = (article_id: string, comment_id: string) => {
  return API({
    url: "likes",
    method: "POST",
    data: {
      article_id, comment_id
    }
  })
}

export const unlikeComment: any = (article_id: string, comment_id: string) => {
  return API({
    url: "likes",
    method: "DELETE",
    params: {
      article_id, comment_id
    }
  })
}