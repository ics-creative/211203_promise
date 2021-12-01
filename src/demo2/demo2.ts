import { getTokyoWave, getTokyoWeather, getTokyoWind } from "./api";

/*
  Demo2:
  このサンプルでは気象庁が公開している気象情報のJSONデータを取得し、東京の天気・風・波の状況を画面に表示します。
  このファイルではロードと同時に天気・風・波の3つのAPIをほぼ同時に呼び出し、取得でき次第画面に表示しています。

  気象庁のJSONデータでは天気・風・波の情報は同一のURLで取得するため、何も制御を入れないと3回同じリクエストが実行されます。
  このような無駄を無くすため、API(api.ts)ではPromiseを使ったキャッシュ制御を行い、連続的（ほぼ同時）にAPIが呼ばれても
  リクエストは1度だけしか実行されないようコントロールしています。

  正しくキャッシュを実装することで、画面側からは好きなタイミングで自由にAPIを呼び出せるようになることを確認してください。
*/

const showWeather = async () => {
  const el = document.querySelector("#api .weather");
  if (!el) return;
  el.textContent = "取得中...";
  el.textContent = (await getTokyoWeather()) ?? "取得失敗";
};

const showWind = async () => {
  const el = document.querySelector("#api .wind");
  if (!el) return;
  el.textContent = "取得中...";
  el.textContent = (await getTokyoWind()) ?? "取得失敗";
};

const showWave = async () => {
  const el = document.querySelector("#api .wave");
  if (!el) return;
  el.textContent = "取得中...";
  el.textContent = (await getTokyoWave()) ?? "取得失敗";
};

// ロード時に天気・風・波の3つをすべて表示
// この3つはawaitをつけていないので並列で実行される
showWeather();
showWind();
showWave();
