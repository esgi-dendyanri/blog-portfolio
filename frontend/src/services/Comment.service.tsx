import API from "./api"

export const getLatest: any = (article_id: string, limit: number, page: number) => {
  return API({
    url: "comments",
    method: "GET",
    params: {
      article_id, limit, page
    }
  })
}

export const createComment: any = (article_id: string, name: string, body: string) => {
  return API({
    url: "comments",
    method: "POST",
    data: {
      article_id, name, body
    }
  })
}