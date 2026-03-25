/* eslint-disable @typescript-eslint/no-explicit-any */
type CastFramework = {
  framework: {
    CastContext: {
      getInstance: () => {
        setOptions: (opts: any) => void;
        requestSession: () => Promise<any>;
      };
    };
  };
};

declare global {
  interface Window {
    cast: CastFramework;
    chrome: any;
    __onGCastApiAvailable: (isAvailable: boolean) => void;
  }
}