import { Catch } from "./index";
import { IFetchGlobalConfig } from "../types/req";
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

  const generateRandomColor = () => {
    const colors = ["#7365e0", "#dc6050", "#f5b700", "#C04000", "#008080"];

    return colors?.[Math.floor(Math.random() * colors.length)] || "#7365e0";
  };

  console.log(
    `%c🎉 [${alias}] Is now global! you can use it anywhere inside of your application`,
    `color: ${generateRandomColor()}; font-weight: bold; font-size: 0.75rem;`
  );

  return lib.call;
};
