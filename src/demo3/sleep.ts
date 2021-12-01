/**
 * 指定時間待機します。setTimeoutをPromise化したものです
 * @param millisec 待機時間
 */
export const sleep = async (millisec: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, millisec);
  });
