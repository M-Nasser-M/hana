const createFetchApi = (baseURL: string, defaultRequestInit?: RequestInit) => ({
  get: async <T>(url: string, requestInit?: RequestInit): Promise<T> => {
    const response = await fetch(
      url.startsWith("http") ? url : `${baseURL}${url}`,
      {
        method: "GET",
        ...defaultRequestInit,
        ...requestInit,
      }
    );

    if (!response.ok) throw new Error(response.statusText, { cause: response });

    return response.json();
  },
  post: async <T>(
    url: string,
    data: object,
    requestInit?: RequestInit
  ): Promise<T> => {
    const response = await fetch(
      url.startsWith("http") ? url : `${baseURL}${url}`,
      {
        method: "POST",
        body: JSON.stringify(data),
        ...defaultRequestInit,
        ...requestInit,
      }
    );

    if (!response.ok) throw new Error(response.statusText, { cause: response });

    return response.json();
  },
  put: async <T>(
    url: string,
    data: object,
    requestInit?: RequestInit
  ): Promise<T> => {
    const response = await fetch(
      url.startsWith("http") ? url : `${baseURL}${url}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        ...defaultRequestInit,
        ...requestInit,
      }
    );

    if (!response.ok) throw new Error(response.statusText, { cause: response });

    return response.json();
  },
  delete: async <T>(url: string, requestInit?: RequestInit): Promise<T> => {
    const response = await fetch(
      url.startsWith("http") ? url : `${baseURL}${url}`,
      {
        method: "DELETE",
        ...defaultRequestInit,
        ...requestInit,
      }
    );

    if (!response.ok) throw new Error(response.statusText, { cause: response });

    return response.json();
  },
});

export default createFetchApi;
