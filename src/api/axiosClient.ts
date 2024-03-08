/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import ServerConfig from "./serverConfig";

type ErrorMap = {
  Code: string;
  Message?: string;
  message?: string;
  ValidationError: string;
};
// const StatusCode = {
//   BadRequest: 400,
//   Unauthorized: 401,
//   Forbidden: 403,
//   TooManyRequests: 429,
//   InternalServerError: 500,
//   NotFound: 404
// };

type HeadersType = Readonly<Record<string, string | boolean>>;
const apiheaders: HeadersType = {
  "Accept": "application/json",
  "Content-Type": "application/json"
};

const s3headers: HeadersType = {
  Accept: "*/*"
};

// let refreshPromise: Promise<string | undefined> | null = null;
// const clearPromise = () => {
//   refreshPromise = null;
// };

const injectToken = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  try {
    const token = localStorage.getItem("accessToken");
    config.headers = config.headers ?? {};
    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error: unknown) {
    if (typeof error === "string") {
      throw new Error(error);
    }
    throw new Error("API error");
  }
};

class Http {
  private instance: AxiosInstance | null = null;

  private baseUri: string;

  private headers: HeadersType;

  private requireAuthToken: boolean;

  constructor(baseUri = ServerConfig.BASE_URL, headers = apiheaders, requireAuthToken = true) {
    this.baseUri = baseUri ?? "";
    this.headers = headers;
    this.requireAuthToken = requireAuthToken;
  }

  private get http(): AxiosInstance {
    return this.instance ?? this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: this.baseUri,
      headers: this.headers
    });
    if (this.requireAuthToken) {
      http.interceptors.request.use(injectToken, (error) => Promise.reject(error));
    }

    http.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        return this.handleError(error);
      }
    );
    this.instance = http;
    return http;
  }

  request<T, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.http.request(config);
  }

  get<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T, R = AxiosResponse>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  patch<T, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.http.patch<T, R>(url, data, config);
  }

  delete<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  // eslint-disable-next-line class-methods-use-this
  private async handleError(error: AxiosError<ErrorMap>) {
    // const status = error.response?.status;
    // const { config } = error;

    // if (status === StatusCode.Unauthorized && config && !config?._retry) {
    // config._retry = true;

    // if (!refreshPromise) {
    //   console.log(config.url, " refreshing the token");
    //   refreshPromise = refreshAuthToken().finally(clearPromise);
    // }
    // else {
    //   log.error(config.url, 'will be waiting for token to be refreshed');
    // }
    // const token = await refreshPromise;
    // log.info('access token for', config.url, ' is>>>', token, 'BEFORE retry');
    //   config.headers.authorization = `Bearer ${token}`;
    //   return this.http(config);
    // }
    return Promise.reject(error);
  }
}

const axiosClient = new Http();
const s3Client = new Http(ServerConfig.BASE_URL, s3headers, false);
export { axiosClient, s3Client };
