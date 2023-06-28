import Phaser from "phaser";

class Hero extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "hero-run-sheet", 0);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.anims.play("hero-running");

    this.body.setCollideWorldBounds(true);
    this.body.setSize(12, 40);
    this.body.setOffset(12, 23);
    this.body.setMaxVelocity(200, 350);
    this.body.setDragX(750);

    this.keys = scene.cursorKeys;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.keys.left.isDown) {
      this.body.setAccelerationX(-1000);
      this.body.setOffset(6, 23);
      this.setFlipX(true);
    } else if (this.keys.right.isDown) {
      this.body.setAccelerationX(1000);
      this.body.setOffset(12, 23);
      this.setFlipX(false);
    } else {
      this.body.setAcceleration(0);
    }

    const didPressJump = Phaser.Input.Keyboard.JustDown(this.keys.up);

    if (didPressJump) {
      if (this.body.onFloor()) {
        this.canDoubleJump = true;
        this.body.setVelocityY(-450);
      } else if (this.canDoubleJump) {
        this.body.setVelocityY(-250);
        this.canDoubleJump = false;
      }
    }

    if (this.body.onFloor) {
      this.canDoubleJump = false;
    }

    if (!this.keys.up.isDown && this.body.velocity.y < -250) {
      this.body.setVelocityY(-150);
    }
  }
}

export default Hero;
