import Phaser from "phaser";
import config from "./config";
import GameScene from "./scenes/Game";

new Phaser.Game(
  Object.assign(config, {
    scene: [GameScene],
  }),
);

const dialogs = document.querySelectorAll("dialog");
const resumeBtns = document.querySelectorAll(".resume-btn");
let dialogCanBeOpened = true;
const openModalHandler = (e) => {
  if (!dialogCanBeOpened) {
    return;
  }
  document.dispatchEvent(new Event("canPause"));
  document.querySelector("#" + e.detail).showModal();
};

const resumeGame = () => {
  dialogCanBeOpened = false;
  dialogs.forEach((dialog) => dialog.close());
  const resumeEvent = new Event("resume");
  document.dispatchEvent(resumeEvent);
  setTimeout(() => {
    dialogCanBeOpened = true;
  }, 1000);
};

document.addEventListener("openModal", openModalHandler);
resumeBtns.forEach((btn) => btn.addEventListener("click", resumeGame));
