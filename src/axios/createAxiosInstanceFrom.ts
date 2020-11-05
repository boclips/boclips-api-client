import axios, { AxiosInstance } from 'axios';
import axiosErrorToBoclipsApiError from './axiosErrorToBoclipsApiError';
import copyAxiosInterceptors from './copyAxiosInterceptors';

const createAxiosInstanceFrom = (prototype: AxiosInstance): AxiosInstance => {
  const axiosInstance: AxiosInstance = axios.create();

  copyAxiosInterceptors(prototype, axiosInstance);

  axiosInstance.interceptors.response.use(
    (response) => response,
    axiosErrorToBoclipsApiError,
  );
  return axiosInstance;
};

export default createAxiosInstanceFrom;
