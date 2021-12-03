// 部屋の数 = 最大同時処理数
const MAX_ROOMS = 3;

type Releaser = () => void;
type Resolve = (releaser: Releaser) => void;

// 使用中の部屋（処理枠）のリスト： 所有者以外がリリースできないよう、Symbolで識別します
let rooms: Symbol[] = [];
// 処理待ちのリスト： 待っているPromiseのresolve関数を保持します
const waitingList: Resolve[] = [];

/**
 * ロックを取得します。他の処理でいっぱいの場合、空きが出るまで待ちます。
 * @return ロック開放関数。処理が終わったら必ず呼び出してください。
 */
export const enter = () => {
  const promise = new Promise<Releaser>((resolve) => {
    // Promiseのresolve関数を待ちリストに追加する
    waitingList.push(resolve);
  });
  // 現時点で空きがあるかもしれないので、処理開始を試行
  tryNext();
  // 開始できたか待たされているかにかかわらず、Promiseを返す
  return promise;
};

/**
 * ロックを開放します
 * @param room 割り当てられた部屋のキー
 */
const release = (room: Symbol) => {
  rooms = rooms.filter((r) => r !== room);
  tryNext(); // 待っている処理があれば開始
};

/**
 * 部屋の空きがあり、待ちリストに待機している処理があれば、部屋を割り当てて処理を開始します
 */
const tryNext = () => {
  // 上限オーバーなら終了
  if (rooms.length >= MAX_ROOMS) return;
  // 待っているPromiseがなければ終了
  const next = waitingList.shift();
  if (!next) return;
  // 新しい部屋を作成
  const room = Symbol();
  rooms.push(room);
  // ロックを解放する関数を渡してPromiseをresolve
  next(() => {
    release(room);
  });
};

