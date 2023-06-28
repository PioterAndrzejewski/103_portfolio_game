import Phaser from "phaser";
import Hero from "../entities/Hero";

class Game extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  init(data) {}

  preload() {
    this.load.spritesheet("hero-run-sheet", "assets/hero/run.png", {
      frameWidth: 32,
      frameHeight: 64,
    });
  }

  create(data) {
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: "hero-running",
      frames: this.anims.generateFrameNumbers("hero-run-sheet"),
      repeat: -1,
      frameRate: 12,
    });
    this.hero = new Hero(this, 250, 160);
  }

  update(time, delta) {}
}

export default Game;
