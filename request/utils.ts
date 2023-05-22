import axios, { AxiosRequestConfig } from "axios";

const baseURL = 'http://8.219.157.52:8080'

export const request = async <T>(
  url: string,
  method: AxiosRequestConfig['method'] = 'GET',
  data: any = null,
  headers: AxiosRequestConfig['headers'] = {}
  // @ts-ignore
): Promise<T> => {
  const completeUrl = url.includes('/root') ? url.replace('/root', '') : `${baseURL}${url}`
  try {
    const options: AxiosRequestConfig = {
      url: completeUrl, method, ...headers, withCredentials: false
    };

    if (data && method === 'POST') options.data = data;

    if (data && method === 'GET') options.params = data;

    const response = await axios(options);
    if (response.data.code !== 200) {
      // openNotificationWithIcon('error', response.data.code, response.data.message)
    }
    return response.data;
  } catch (error: any) {
    // console.error(error);
    // message.error(error?.message || 'error')
    // throw error;
  }
};
