import Phaser from "phaser";

export default {
  type: Phaser.AUTO,
  parent: "game",
  backgroundColor: "#dae6ed",
  scale: {
    width: 1100,
    height: 600,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  render: {
    pixelArt: true,
    antialias: false,
    autoRound: true,
    roundPixels: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 750 },
      // debug: true,
      // debugShowVelocity: true,
      // debugShowBody: true,
      // debugShowStaticBody: true,
    },
  },
};
