import { Catch } from "./index";
import { IFetchGlobalConfig } from "../types/index.ts";
import { validGlobalConfig } from "../utils/validation";
import { AppWindowState } from "../state/window";
export default (req: Partial<IFetchGlobalConfig> = {}) => {
  const ___AR_CATCH___ = window?.["___AR_CATCH___"];
  const internalConfig = window?.["___AR_CATCH___"]?.config;

  // as config file, this should only be set once
  const {
    baseURL = internalConfig?.baseURL || "",
    defaultOptions = internalConfig?.defaultOptions || {},
    alias = internalConfig?.alias || "catch",
    onReq = internalConfig?.onReq || undefined,
    onRes = internalConfig?.onRes || undefined,
    onErr = internalConfig?.onErr || undefined,
  } = req;

  // throw error if there is an invalid global config
  validGlobalConfig(req);

  const lib = new Catch({
    baseURL,
    defaultOptions,
    onReq,
    onRes,
    onErr,
  });

  lib.call = lib.call.bind(___AR_CATCH___ || lib);

  // set the fetch instance to the window object
  if (!internalConfig) {
    new AppWindowState("___AR_CATCH___", lib).set();
    new AppWindowState(alias, lib).set();
    console.log(
      `%c😱 ${alias} is successfully initialized!`,
      `font-weight: bold;`
    );
  }

  // will return the same instance if the config is already initialized, to not break any current on going process in the runtime
  return lib.call;
};
