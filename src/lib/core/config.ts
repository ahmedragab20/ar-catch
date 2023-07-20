import { Catch } from "./index";
import { IFetchGlobalConfig } from "../types/index.ts";
import { validGlobalConfig } from "../utils/validation";
import { AppWindowState } from "../state/window";
export default (req: Partial<IFetchGlobalConfig> = {}) => {
  const {
    baseURL,
    defaultOptions = {},
    alias = "$catch",
    onReq,
    onRes,
    onErr,
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

  lib.call = lib.call.bind(lib);

  // set the fetch instance to the window object
  new AppWindowState(alias, lib).set();

  console.log(
    `%c😱 ${alias} is successfully initialized!`,
    `font-weight: bold;`
  );

  return lib.call;
};
