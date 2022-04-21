import API from "./api"

export const getUserId: any = () => {
  return API({
    url: "users/get_user_id",
    method: "GET"
  })
}
