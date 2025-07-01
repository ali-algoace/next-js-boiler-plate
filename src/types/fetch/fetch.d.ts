// === API TYPES ===
export type IAPIParams = {
  method: string;
  endpoint?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
  baseURL?: string;
  ContentType?: string;
  isToken?: boolean;
  headers?: Headers;
  isFormData?: boolean;
  file?: string;
  toJSON?: boolean;
  mode?: string;
  options?: NextFetchRequestConfig;
  cache?: RequestCache;
  signal?: AbortSignal;
  emptyDeleteBody?: boolean;
};
