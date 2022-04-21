import { Method, ResponseType } from "axios";
import Cookies from "js-cookie";
import axios from "./axios";

type apiParameter = {
  url: string
  method: Method
  responseType?: ResponseType
  data?: any
  params?: any
  headers?: any
}

const API: any = async ({
  url,
  method,
  responseType,
  data,
  params,
  headers
} : apiParameter) => {
  //REQUEST JSON

  headers = {
    ...headers,
    user_id: Cookies.get("user_id") || ""
  };

  let axiosRequestObject = {
    method,
    url,
    data,
    headers,
    responseType,
    params,
  };

  //REQUEST

  let request = await axios.request(axiosRequestObject)
    .then(handleSuccessRequest)
    .catch(handleErrorRequest);

  return request;
};

const handleSuccessRequest = (response: any) => ({
  status: response.status,
  data: response.data,
});

const handleErrorRequest = (err: any) => {
  if (!err.response) {
    return Promise.reject()
  }
  else if (err.response?.status === 401) {
    return Promise.reject()
  }
  else return err.response
};

export default API