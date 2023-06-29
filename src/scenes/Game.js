import Phaser from "phaser";
import Hero from "../entities/Hero";

class Game extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.tilemapTiledJSON("level-1", "assets/tilesets/level-1.json");
    this.load.image("world-1-sheet", "assets/tilesets/world-1.png");
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

    this.addMap();

    this.addHero();

    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels - 10,
      this.map.heightInPixels,
    );
    this.cameras.main.startFollow(this.hero).setFollowOffset(0, 80);
  }

  addHero() {
    this.hero = new Hero(this, 420, 100);

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
    bgLayer.setScrollFactor(0.9);
    projectLayer.setScrollFactor(1.01);
    groundLayer.setCollision([1, 2], true);

    this.physics.world.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels,
    );
    this.physics.world.setBoundsCollision(true, true, false, true);
  }

  update(time, delta) {}
}

export default Game;
