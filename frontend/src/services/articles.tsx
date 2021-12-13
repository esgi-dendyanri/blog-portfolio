import API from "./api"

export const getLatest: any = (limit: number, page: number) => {
  return API({
    url: "articles",
    method: "GET",
    params: {
      limit, page
    }
  })
}