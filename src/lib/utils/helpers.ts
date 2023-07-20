import { FetchInterceptor, IReqData } from "../types/req";

interface IBodyOptions {
  /**
   * Specifies whether the body is in a URL-like format.
   */
  urlLike: boolean;

  /**
   * Specifies whether the body is in a JSON-like format.
   */
  jsonLike: boolean;
}


/**
 * Formats the request body based on the specified options.
 * @param body - The request body data.
 * @param opts - The options to configure the formatting of the request body.
 * @returns The prettified request body as a string.
 * @throws {Error} If the body is not an object.
 */
/**
 * Formats the request body based on the specified options.
 * 
 * @param body - The request body data.
 * @param opts - The options to configure the formatting of the request body.
 * @returns The prettified request body as a string.
 * @throws {Error} If the body is not an object.
 */
export function prettifyRequestBody(
  body: IReqData,
  opts: Partial<IBodyOptions> = {}
): string {
  // Check if the body is an object
  if (!isObject(body)) {
    throw new Error("body must be an object");
  }

  // Set default values for options if not provided
  if (opts.urlLike === undefined) {
    opts.urlLike = false;
  }
  if (opts.jsonLike === undefined) {
    opts.jsonLike = true;
  }

  let data: any;

  // Convert the body to JSON string if jsonLike option is enabled
  if (opts.jsonLike) {
    data = JSON.stringify(body);
  } else {
    data = body;
  }

  // Redesigned to handle URL-like format for GET requests
  if (opts.urlLike) {
    // Convert the body to URL-encoded query parameters
    const queryParams = Object.keys(body).map((key) => {
      const value = isObject(body[key]) ? JSON.stringify(body[key]) : body[key];
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    });

    // Join the query parameters with "&" separator
    data = queryParams.join("&");
  }

  // Return the prettified request body
  return data;
}



export async function interceptFetch(
  onUseInterceptor: FetchInterceptor,
  url: string,
  options?: RequestInit
): Promise<Response> {
  try {
    // an array to hold the interceptors
    const interceptors: FetchInterceptor[] = [];

    // a function to register interceptors
    if (isObject(onUseInterceptor)) {
      interceptors.push(onUseInterceptor);
    }

    // a function to execute the interceptors
    async function executeInterceptors(request: Request): Promise<Request> {
      let modifiedRequest = request;

      for (const interceptor of interceptors) {
        modifiedRequest = await interceptor.onRequest(modifiedRequest);
      }

      return modifiedRequest;
    }

    // Make the actual request
    const request = new Request(url, options);

    const modifiedRequest = await executeInterceptors(request);

    const response = await fetch(modifiedRequest);

    return response;
  } catch (error) {
    if (isObject(onUseInterceptor) && onUseInterceptor.onError) {
      onUseInterceptor.onError(error);
    }
    throw error;
  }
}

export function plainFetch(url: string, options?: RequestInit) {
  return fetch(url, options);
}

export function supportedCachingStrategy(
  cache: "NO-CACHE" | "PER-SESSION" | "RELOAD"
): boolean {
  return cachingStrategies().includes(cache);
}

/**
 * Returns the supported caching strategies.
 * 
 * @returns An array of supported caching strategies.
 **/
export function cachingStrategies(): string[] {
  return ["NO-CACHE", "PER-SESSION", "RELOAD"];
}

/**
 * Generates a version 4 (random) UUID.
 * 
 * @returns A version 4 UUID as a string.
 */
export function uuidV4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Checks if a value is an object.
 * 
 * @param value - The value to check.
 * @returns `true` if the value is an object, `false` otherwise.
 */
export function isObject(value: any) {
  // Check if the value is falsy
  if (!value) return false;

  // Check if the value is an object by comparing its toString representation
  return value && Object.prototype.toString.call(value) === "[object Object]";
}
