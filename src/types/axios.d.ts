import 'axios';

interface Handler<V> {
  fulfilled: (value: V) => V | Promise<V>;
  rejected: (error: any) => any;
}

type ForEachHandlerCallback<V> = (handler: Handler<V>) => void;

declare module 'axios' {
  export interface AxiosInterceptorManager<V> {
    forEach: (callback: ForEachHandlerCallback<V>) => void;
  }
}
