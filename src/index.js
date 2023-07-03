import "./scripts/modals.js";
import "./style.css";

import Phaser from "phaser";
import config from "./config";
import GameScene from "./scenes/Game";
new Phaser.Game(
  Object.assign(config, {
    scene: [GameScene],
  }),
);

window.addEventListener("load", function () {
  setTimeout(function () {
    window.scrollTo(0, 1);
  }, 0);
});
