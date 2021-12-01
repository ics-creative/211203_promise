import "./imageWall.scss";
import { enter } from "./lock";
import { sleep } from "./sleep";

/*
  Demo3:
  このサンプルではPromiseを使って「同時処理数を制限する仕組み」を作り、それを使って画像の大量読み込みを制御します。
  画面ロード時に36枚の画像の読み込みが要求されますが、同時処理数が3に制限されているため同時にダウンロードされるのは常に3枚以下になります。
  この仕組みはAPI呼び出し・ファイルアクセス・モーダル等のUI制御など、さまざまな場面で応用できます。
*/

/** 画像を並べる親要素 */
const parent = document.getElementById("imageWall")!;

/**
 * 画像を読み込んで表示します。
 * 大量に呼び出された場合、同時処理数が上限を超えないように順次処理されます。
 * @param id 読み込む画像のid（任意の整数に対応する画像が表示されます）
 */
const loadImage = async (id: number) => {
  // 画像の外枠を作成・表示
  const el = document.createElement("div");
  parent.appendChild(el);

  // ロック獲得 -- 処理数が上限を超えていればここで待たされる
  const release = await enter();

  // ローディング表示を開始
  el.classList.add("loading");
  await sleep(Math.random() * 1000); // デモ用にランダムな待ち時間を加える

  // 読み込み完了・失敗時のイベントハンドラ
  const onload = () => {
    el.classList.remove("loading");
    release(); // ロックを解放する
  };

  // img要素を作成して読み込み開始
  const img = new Image();
  img.onload = img.onabort = onload;
  img.src = `https://picsum.photos/seed/${id}/300/300`;
  el.appendChild(img);
};

// 36枚すべての画像の読み込みを実行
for (let index = 0; index < 36; index++) {
  loadImage(index + 1);
}
