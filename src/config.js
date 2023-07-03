import Phaser from "phaser";

export const isMobileVertical =
  window.innerWidth < 1024 &&
  window.innerHeight < 1024 &&
  window.innerWidth < window.innerHeight;

export default {
  type: Phaser.AUTO,
  parent: "game",
  backgroundColor: "#dae6ed",
  scale: {
    width: isMobileVertical ? window.innerWidth : 1200,
    height: isMobileVertical ? window.innerHeight : 600,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  render: {
    pixelArt: true,
    antialias: true,
    autoRound: true,
    roundPixels: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 750 },
    },
  },
};
