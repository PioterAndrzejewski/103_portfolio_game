import Phaser from "phaser";
import Hero from "../entities/Hero";
import { isMobileVertical } from "../config";

class Game extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.tilemapTiledJSON("level-1", "assets/tilesets/level-1.json");
    this.load.spritesheet("world-1-sheet", "assets/tilesets/world-1.png", {
      frameWidth: 32,
      frameHeight: 32,
      margin: 1,
      spacing: 2,
    });
    this.load.image("cave-sheet", "assets/tilesets/bg-cave.png");
    this.load.image("project-sheet", "assets/tilesets/project-sheet.png");
    this.load.image("bg-sheet", "assets/tilesets/bg-sheet.png");
    this.load.image("cloud-sheet", "assets/tilesets/cloud.png");

    this.load.spritesheet("hero-idle-sheet", "assets/hero/idle.png", {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.spritesheet("hero-run-sheet", "assets/hero/run.png", {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.spritesheet("hero-pivot-sheet", "assets/hero/pivot.png", {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.spritesheet("hero-jump-sheet", "assets/hero/jump.png", {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.spritesheet("hero-flip-sheet", "assets/hero/spinjump.png", {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.spritesheet("hero-fall-sheet", "assets/hero/fall.png", {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.spritesheet("hero-die-sheet", "assets/hero/bonk.png", {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.css("style", "./style.css");

    const joyUrl =
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js";
    this.load.plugin("rexvirtualjoystickplugin", joyUrl, true);
  }

  create(data) {
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: "hero-idle",
      frames: this.anims.generateFrameNumbers("hero-idle-sheet"),
    });

    this.anims.create({
      key: "hero-running",
      frames: this.anims.generateFrameNumbers("hero-run-sheet"),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "hero-pivoting",
      frames: this.anims.generateFrameNumbers("hero-pivot-sheet"),
    });

    this.anims.create({
      key: "hero-jumping",
      frames: this.anims.generateFrameNumbers("hero-jump-sheet"),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "hero-flipping",
      frames: this.anims.generateFrameNumbers("hero-flip-sheet"),
      frameRate: 30,
      repeat: 0,
    });

    this.anims.create({
      key: "hero-falling",
      frames: this.anims.generateFrameNumbers("hero-fall-sheet"),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "hero-dead",
      frames: this.anims.generateFrameNumbers("hero-die-sheet"),
    });

    this.addMap();
    this.addHero();

    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels - 10,
      this.map.heightInPixels,
    );

    this.physics.add.collider(
      this.hero,
      this.map.getLayer("Background-projects").tilemapLayer,
    );

    this.linkGroup.forEach((obj) => {
      this.physics.add.existing(obj, true);
      this.physics.add.collider(this.hero, obj, () => this.pauseGame(obj));
    });

    this.joyStick = this.plugins
      .get("rexvirtualjoystickplugin")
      .add(this, {
        x: 200,
        y: isMobileVertical ? window.innerHeight - 150 : 420,
        radius: 120,
        base: this.add.circle(0, 0, 70, 0x888888),
        thumb: this.add.circle(0, 0, 40, 0xcccccc),
        dir: "8dir",
        enable: true,
      })
      .on("update", this.dumpJoyStickState, this);

    this.joyStick.base.setAlpha(0.5);
    this.joyStick.thumb.setAlpha(0.5);
    this.dumpJoyStickState();

    this.cameras.main.startFollow(this.hero);
    this.cameras.main.setFollowOffset(0, 80);
    this.cameras.main.setZoom(1.1);
  }

  dumpJoyStickState() {
    var cursorKeys = this.joyStick.createCursorKeys();

    if (cursorKeys.left.isDown) {
      this.hero.keys.left.isDown = true;
    } else {
      this.hero.keys.left.isDown = false;
    }

    if (cursorKeys.right.isDown) {
      this.hero.keys.right.isDown = true;
    } else {
      this.hero.keys.right.isDown = false;
    }

    if (cursorKeys.up.isDown) {
      this.hero.keys.up.isDown = true;
    } else {
      this.hero.keys.up.isDown = false;
    }
  }

  pauseGame(obj) {
    document.dispatchEvent(
      new CustomEvent("openModal", { detail: obj.linkTo }),
    );

    this.pauseListener = document.addEventListener("canPause", () => {
      this.scene.pause();
      this.resetKeys();
    });
    this.resumeListener = document.addEventListener("resume", () => {
      this.resumeGame();
      this.resetKeys();
    });
    this.keydownListener = document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.resumeGame();
      }
    });
  }

  resumeGame() {
    this.scene.resume();
    document.removeEventListener("canPause", this.pauseListener);
    document.removeEventListener("resume", this.resumeListener);
    document.removeEventListener("keydown", this.keydownListener);
  }

  resetKeys() {
    this.hero.keys.up.isDown = false;
    this.hero.keys.left.isDown = false;
    this.hero.keys.right.isDown = false;
    this.hero.keyW.isDown = false;
    this.hero.keyA.isDown = false;
    this.hero.keyD.isDown = false;
  }

  addHero() {
    // this.hero = new Hero(this, 420, 500);
    this.hero = new Hero(this, 1600, 750);

    this.physics.add.collider(
      this.hero,
      this.map.getLayer("Ground").tilemapLayer,
    );
  }

  addMap() {
    this.map = this.make.tilemap({
      key: "level-1",
    });
    const groundTiles = this.map.addTilesetImage("world-1", "world-1-sheet");
    const caveTiles = this.map.addTilesetImage("bg-cave", "cave-sheet");
    const projectTiles = this.map.addTilesetImage("projects", "project-sheet");
    const bgTiles = this.map.addTilesetImage("bg-sheet", "bg-sheet");
    const cloudTiles = this.map.addTilesetImage(
      "Background-cloud",
      "cloud-sheet",
    );

    const bgClouds = this.map.createStaticLayer("Background-cloud", cloudTiles);
    const bgLayer = this.map.createStaticLayer("Background", bgTiles);
    const caveLayer = this.map.createStaticLayer("Background-cave", caveTiles);
    const groundLayer = this.map.createStaticLayer("Ground", groundTiles);
    const projectLayer = this.map.createStaticLayer(
      "Background-projects",
      projectTiles,
    );

    bgClouds.setScrollFactor(0.8);
    // bgLayer.setScrollFactor(0.95);

    groundLayer.setCollision([1, 2], true);

    this.physics.world.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels,
    );
    this.physics.world.setBoundsCollision(true, true, false, true);

    this.linkGroup = [];

    const objectLayer = this.map
      .getObjectLayer("Objects")
      .objects.forEach((obj) => {
        if (obj.type === "link") {
          const linkObject = this.add.rectangle(
            obj.x + obj.width / 2,
            obj.y + obj.height / 2,
            obj.width,
            obj.height,
            "rgba(0, 0, 0, 0.1)",
          );
          linkObject.setAlpha(0.01);
          linkObject.linkTo = obj.name;
          this.linkGroup.push(linkObject);
        }
      });
  }

  update(time, delta) {}
}

export default Game;
