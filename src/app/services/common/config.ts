import { ConfigKey } from "@constants/config";
import { IConfig } from "@interfaces/common";

const getConfigs = async (): Promise<IConfig[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          key: ConfigKey.APP_NAME,
          value: import.meta.env.VITE_APP_NAME,
        },
      ]);
    }, 1000);
  });
};

export { getConfigs };
