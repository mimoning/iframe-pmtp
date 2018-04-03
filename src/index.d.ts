declare module PM {
  function setTarget(target: object): void;

  function request(
    key: string,
    data: object,
    callback?: (res: any) => void,
    target?: object,
    origin?: string
  );

  function get(
    key: string,
    callback?: (res: any) => void,
    target?: object,
    origin?: string
  );

  function addListener(
    key: string,
    callback: (
      data: object,
      res: (data: any) => void
    ) => void
  );
}

export default PM;
