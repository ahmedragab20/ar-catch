export interface IStringObject {
  /**
   * A dictionary object with string keys and string values.
   *
   * @remarks
   * This allows specifying any key-value pairs where the keys and values are both of type string.
   * The keys can be of any string type, and the values must be of string type.
   */
  [key: string]: string;
}

export interface IFetchGlobalConfig {
  /**
   * The base URL for the API requests
   */
  baseURL?: string;

  /**
   * Default options for all API requests
   */
  defaultOptions?: object | any;

  /**
   * An alias for the global fetch configuration
   */
  alias?: string;

  /**
   * A callback function to intercept and modify outgoing requests
   * before they are sent
   *
   * @param request - The outgoing request object
   * @returns The modified request object or a promise resolving to the modified request object
   * or void to proceed with the original request
   */
  onReq?: (request: Request) => Request | Promise<Request> | void;

  /**
   * A callback function to intercept and modify incoming responses
   * before they are returned
   *
   * @param response - The incoming response object
   * @returns The modified response object or a promise resolving to the modified response object
   * or void to proceed with the original response
   */
  onRes?: (response: Response) => Response | Promise<Response> | void;

  /**
   * A callback function to handle errors that occur during API requests
   *
   * @param error - The error object
   * @returns The modified error object or any other value to handle the error in a custom way
   */
  onErr?: (error: any) => any;

  /**
   * Additional global configuration options
   *
   * @remarks
   * This allows specifying any custom options for the global configuration by using key-value pairs.
   * The keys can be of any string type, and the values can be of any type.
   */
  [key: string]: any;
}

export interface IReqData {
  /**
   * The request body data.
   *
   * @remarks
   * This allows specifying any key-value pairs for the request body.
   * The keys can be of any string type, and the values can be of any type.
   */
  [key: string]: any;
}
export interface IReqOptions {
  /**
   * The request body data
   */
  body?: IReqData;

  /**
   * Additional options for the request
   *
   * @remarks
   * This allows specifying any custom options for the request by using key-value pairs.
   * The keys can be of any string type, and the values can be of any type.
   */
  [key: string]: any;
}

export interface IReqOptions2CustomOptions {
  /**
   * The HTTP request method
   *
   * - `GET`: Used to retrieve a representation of a resource
   * - `POST`: Used to submit data to be processed or create a new resource
   * - `PUT`: Used to replace or update a resource with the provided representation
   * - `DELETE`: Used to delete a specified resource
   * - `PATCH`: Used to partially update a resource with the provided representation
   * - `HEAD`: Used to retrieve only the headers of a resource
   * - `OPTIONS`: Used to retrieve communication options available for a resource or server
   * - `TRACE`: Used for diagnostic purposes, echoes the received request back to the client
   * - `CONNECT`: Used to establish a network connection with a remote resource
   * - `PROPFIND`: Used to retrieve properties or metadata about a resource
   * - `PROPPATCH`: Used to update properties or metadata about a resource
   * - `MKCOL`: Used to create a new collection (e.g., a directory)
   * - `COPY`: Used to create a copy of the specified resource at the destination
   * - `MOVE`: Used to move the specified resource to a new location
   */
  method:
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "HEAD"
    | "OPTIONS"
    | "TRACE"
    | "CONNECT"
    | "PROPFIND"
    | "PROPPATCH"
    | "MKCOL"
    | "COPY"
    | "MOVE";

  /**
   * Caching options
   *
   * - `NO-CACHE`: Indicates no caching should be performed
   * - `PER-SESSION`: Indicates caching should be performed per session
   * - `RELOAD`: Indicates the resource should be reloaded without using cache
   */
  cache: "NO-CACHE" | "PER-SESSION" | "RELOAD";

  /**
   * Clear any cached data for the request
   *
   * @remarks
   *
   * - `true`: Clears the cached data for the request no matter what the caching strategy is
   * - `false` or not provided: does not affect the cached data for the request, so you can use the old caching strategy to get the cached data instead of making a new request
   */
  clearCache?: boolean;

  /**
   * Specifies whether the request should use the base URL
   *
   * - `true`: The base URL will be used in the request
   * - `false` or not provided: The base URL will not be used in the request
   */
  useWithBaseURL?: boolean;
}
export interface IRequestConfig {
  /**
   * The full path of the API endpoint
   */
  fullPath: string;

  /**
   * The endpoint path (relative to the base URL)
   */
  ep: string;

  /**
   * The HTTP request method
   *
   * - `GET`: Used to retrieve a representation of a resource
   * - `POST`: Used to submit data to be processed or create a new resource
   * - `PUT`: Used to replace or update a resource with the provided representation
   * - `DELETE`: Used to delete a specified resource
   * - `PATCH`: Used to partially update a resource with the provided representation
   * - `HEAD`: Used to retrieve only the headers of a resource
   * - `OPTIONS`: Used to retrieve communication options available for a resource or server
   * - `TRACE`: Used for diagnostic purposes, echoes the received request back to the client
   * - `CONNECT`: Used to establish a network connection with a remote resource
   * - `PROPFIND`: Used to retrieve properties or metadata about a resource
   * - `PROPPATCH`: Used to update properties or metadata about a resource
   * - `MKCOL`: Used to create a new collection (e.g., a directory)
   * - `COPY`: Used to create a copy of the specified resource at the destination
   * - `MOVE`: Used to move the specified resource to a new location
   */
  method:
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "HEAD"
    | "OPTIONS"
    | "TRACE"
    | "CONNECT"
    | "PROPFIND"
    | "PROPPATCH"
    | "MKCOL"
    | "COPY"
    | "MOVE";

  /**
   * Additional request options
   */
  options: IReqOptions;

  /**
   * Caching options
   *
   * - `NO-CACHE`: Indicates no caching should be performed
   * - `PER-SESSION`: Indicates caching should be performed per session
   * - `RELOAD`: Indicates the resource should be reloaded without using cache
   */
  cache: "NO-CACHE" | "PER-SESSION" | "RELOAD";

  /**
   * Clear any cached data for the request
   *
   * @remarks
   *
   * - `true`: Clears the cached data for the request no matter what the caching strategy is
   * - `false` or not provided: does not affect the cached data for the request, so you can use the old caching strategy to get the cached data instead of making a new request
   */
  clearCache?: boolean;
}

export interface IRequestOptions2 {
  /**
   * Custom options for the request
   */
  customOptions?: Partial<IReqOptions2CustomOptions>;

  /**
   * Additional options for the request
   *
   * @remarks
   * This allows specifying any custom options for the request by using key-value pairs.
   * The keys can be of any string type, and the values can be of any type.
   */
  [key: string]: any;
}

export interface FetchInterceptor {
  /**
   * A callback function to intercept and modify outgoing requests before they are sent.
   *
   * @param request - The outgoing request object
   * @returns The modified request object or a promise resolving to the modified request object
   */
  onRequest?: (request: Request) => Request | Promise<Request>;

  /**
   * A callback function to handle errors that occur during the fetch request.
   *
   * @param error - The error object
   * @returns The modified error object or any other value to handle the error in a custom way
   */
  onError?: (error: any) => any;
}

/**
 * Represents the cache strategy options for an HTTP request.
 */
export type TCacheStrategy = "NO-CACHE" | "PER-SESSION" | "RELOAD";
