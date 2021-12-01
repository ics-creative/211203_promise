import "./modal.scss";

const createConfirm = (
  message: string,
  onClose: (answer: boolean) => void,
  captionYes: string,
  captionNo?: string
) => {
  // 要素を作成
  const outer = document.createElement("div");
  const modal = document.createElement("div");
  const text = document.createElement("p");
  const buttonYes = document.createElement("button");
  const buttonNo = document.createElement("button");

  // クラス名やテキスト等を設定（スタイリングはCSSで行います）
  outer.className = "ModalAlert";
  text.textContent = message;
  buttonYes.textContent = captionYes;
  buttonNo.textContent = captionNo ?? '';

  const close = (answer: boolean) => {
    document.body.removeChild(outer);
    onClose(answer);
  }

  // Yesボタンクリック時の挙動
  buttonYes.addEventListener("click", () => {
    close(true)
  });
  // Noボタンクリック時の挙動
  buttonNo.addEventListener("click", () => {
    close(false)
  });

  modal.appendChild(text);
  if (captionNo) {
    modal.appendChild(buttonNo);
  }
  modal.appendChild(buttonYes);
  outer.appendChild(modal);
  document.body.appendChild(outer);
};

export const modalConfirm = async (
  message: string,
  captionYes = "はい",
  captionNo = "いいえ"
): Promise<boolean> => {
  return new Promise((resolve) => {
    createConfirm(message, resolve, captionYes, captionNo);
  });
};

export const modalAlert = async (
  message: string,
  captionOk = "はい"
): Promise<boolean> => {
  return new Promise((resolve) => {
    createConfirm(message, resolve, captionOk);
  });
};
