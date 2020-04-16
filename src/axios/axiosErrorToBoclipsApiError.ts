import { AxiosError } from 'axios';
import { BoclipsApiError } from '../types';

const isAxiosError = (error: any): error is AxiosError => {
  return error.response != undefined && error.response.data != undefined;
};

const axiosErrorToBoclipsApiError = (error: any): any => {
  if (isAxiosError(error)) {
    const boError: BoclipsApiError = {
      error: error.response?.data.error || error.response?.statusText,
      message: error.response?.data.message || 'Request failed',
      path: error.response?.data.path || error.request.path,
      status: error.response?.data.status || error.response?.status,
      timestamp:
        error.response?.data.timestamp ||
        new Date(error.response?.headers.date),
    };

    return Promise.reject(boError);
  } else {
    return Promise.reject(error);
  }
};

export default axiosErrorToBoclipsApiError;
