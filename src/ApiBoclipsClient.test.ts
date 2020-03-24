import axios, { AxiosInstance } from 'axios';
import { ApiBoclipsClient } from './index';

async function initialiseClient(axiosInstance: AxiosInstance) {
  try {
    await (async () => {
      await ApiBoclipsClient.initialize(
        axiosInstance,
        'https://api.staging-boclips.com',
      );
    })();
  } catch (err) {
    // we expect this error.
  }
}

describe('ApiBoclipsClient', () => {
  beforeEach(() => {
    ApiBoclipsClient.reset();
  });

  it('Does not clobber the input axios client', async () => {
    const axiosInstance = axios.create();

    let initialCount = 0;

    axiosInstance.interceptors.response.forEach(() => {
      initialCount++;
    });

    axiosInstance.interceptors.request.forEach(() => {
      initialCount++;
    });

    await initialiseClient(axiosInstance);

    let count = 0;
    axiosInstance.interceptors.response.forEach(() => {
      count++;
    });

    axiosInstance.interceptors.request.forEach(() => {
      count++;
    });

    expect(count).toEqual(initialCount);
  });

  it('calls request interceptors from the original axios instance', async () => {
    const mockInterceptor = jest.fn();
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(req => {
      mockInterceptor();
      return req;
    });

    await initialiseClient(axiosInstance);

    expect(mockInterceptor).toHaveBeenCalled();
  });

  it('calls response interceptors from the original axios instance', async () => {
    const mockInterceptor = jest.fn();
    const axiosInstance = axios.create();
    axiosInstance.interceptors.response.use(req => {
      mockInterceptor();
      return req;
    });

    await initialiseClient(axiosInstance);

    expect(mockInterceptor).toHaveBeenCalled();
  });
});
