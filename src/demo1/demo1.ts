import { modalAlert, modalConfirm } from "./modal";

/* 
  Demo1:
  このサンプルでは標準のalert/confirmの代替として利用できる独自のモーダルを作成・利用します。
  async/awaitがついたこと以外は、ほとんど標準のalert/confirmと同じように利用できることがわかります。
  （モーダル自体はhtml/cssで実装しているので、デザインや機能は自在に変更できます）
  Promiseを使ってモーダルを実現する方法はmodal.tsを確認してください。
*/

const sampleShowModal = async () => {
  // 質問1
  const isLikeDog = await modalConfirm("犬と猫はどっちが好き？", "犬", "猫");
  const animal = isLikeDog ? "犬" : "猫";
  // 質問2
  const isLikeJs = await modalConfirm(
    `${animal}とJavaScriptはどっちが好き？`,
    "JavaScript",
    animal
  );
  const mostLove = isLikeJs ? "JavaScript" : animal;
  // 確認
  await modalAlert(`あなたが一番好きなのは${mostLove}です！`, "もちろん！");
};

// ボタンを押したら一連のモーダルを表示
document
  .getElementById("buttonShowModal")
  ?.addEventListener("click", sampleShowModal);
