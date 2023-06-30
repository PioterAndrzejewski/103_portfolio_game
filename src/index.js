import "./scripts/carousel.js";
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
