import { AxiosInstance } from 'axios';

const copyAxiosInterceptors = (
  sourceInstance: AxiosInstance,
  targetInstance: AxiosInstance,
) => {
  sourceInstance.interceptors.request.forEach((interceptor) => {
    targetInstance.interceptors.request.use(
      interceptor.fulfilled,
      interceptor.rejected,
    );
  });

  sourceInstance.interceptors.response.forEach((interceptor) => {
    targetInstance.interceptors.response.use(
      interceptor.fulfilled,
      interceptor.rejected,
    );
  });
};

export default copyAxiosInterceptors;
