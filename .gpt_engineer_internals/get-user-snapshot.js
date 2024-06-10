import { toPng } from "html-to-image";

export const loadGetUserSnapshotEventListener = () => {
  const onMessage = (event) => {
    if (!["http://localhost:3000", "https://run.gptengineer.app"].includes(event.origin)) return;

    const data = event.data;
    if (data.type === "GET_USER_SNAPSHOT") {
      if (!data.id) return;

      toPng(document.body).then((url) => {
        event.source.postMessage({ id: data.id, type: "GET_USER_SNAPSHOT", snapshot: url }, event.origin);
      });
      return;
    }
  };

  window.addEventListener("message", onMessage);
};
