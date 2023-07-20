import { IFetchGlobalConfig, IRequestConfig } from "../types/req";
import { isObject } from "./helpers";

export const isRegularFunction = (fn: any) => {
  return fn && {}.toString.call(fn) === "[object Function]";
};

export const validRequestConfig = (req: Partial<IRequestConfig> | string) => {
  // TODO:: Refactor this function to be validating the reqOptions2 as well
  if (typeof req === "string") {
    return;
  }

  const { ep, method = "GET", options = {}, fullPath } = req;

  if (!ep && !fullPath && typeof req !== "string") {
    throw new Error(
      "You gotta provide an object of options or a Direct URL string"
    );
  } else if (
    (ep && typeof ep !== "string") ||
    (fullPath && typeof fullPath !== "string")
  ) {
    throw new Error("ep must be a string");
  } else if (
    ![
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "PATCH",
      "HEAD",
      "OPTIONS",
      "TRACE",
      "CONNECT",
      "PROPFIND",
      "PROPPATCH",
      "MKCOL",
      "COPY",
      "MOVE",
    ].includes(method?.toUpperCase())
  ) {
    throw new Error(
      "method must be one of GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, TRACE, CONNECT, PROPFIND, PROPPATCH, MKCOL, COPY, MOVE"
    );
  } else if (!isObject(options)) {
    throw new Error("options must be an object");
  }
};

export const validGlobalConfig = (config: IFetchGlobalConfig) => {
  const { baseURL, defaultOptions = {}, alias } = config;

  if (!baseURL || typeof baseURL !== "string") {
    throw new Error("baseURL is required");
  } else if (!isObject(defaultOptions)) {
    throw new Error("defaultOptions must be an object");
  } else if (typeof alias !== "string") {
    throw new Error("alias must be a string");
  } else if (window[alias]) {
    throw new Error(
      `The alias ${alias} is already used by another variable in the global scope`
    );
  } else if (config.onErr && typeof config.onErr !== "function") {
    throw new Error("onErr must be a function");
  } else if (config.onReq && typeof config.onReq !== "function") {
    throw new Error("onReq must be a function");
  } else if (config.onRes && typeof config.onRes !== "function") {
    throw new Error("onRes must be a function");
  }
};
