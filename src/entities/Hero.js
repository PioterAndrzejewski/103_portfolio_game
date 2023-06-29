import Phaser from "phaser";
import StateMachine from "javascript-state-machine";

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
    this.input = {};

    this.setupMovement();
  }

  setupMovement() {
    this.moveState = new StateMachine({
      init: "standing",
      transitions: [
        { name: "jump", from: "standing", to: "jumping" },
        { name: "flip", from: "jumping", to: "flipping" },
        { name: "fall", from: "standing", to: "falling" },
        {
          name: "touchdown",
          from: ["falling", "flipping", "jumping"],
          to: "standing",
        },
      ],
      methods: {
        onJump: () => {
          this.body.setVelocityY(-400);
        },
        onFlip: () => {
          this.body.setVelocityY(-300);
        },
        onEnterState: (lifecycle) => {
          console.log(lifecycle);
        },
      },
    });
    this.movePredicates = {
      jump: () => {
        return this.input.didPressJump;
      },
      flip: () => {
        return this.input.didPressJump;
      },
      fall: () => {
        return !this.body.onFloor();
      },
      touchdown: () => {
        return this.body.onFloor();
      },
    };
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    this.input.didPressJump = Phaser.Input.Keyboard.JustDown(this.keys.up);

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

    if (this.moveState.is("jumping") || this.moveState.is("flipping")) {
      if (!this.keys.up.isDown && this.body.velocity.y < -250) {
        this.body.setVelocityY(-150);
      }
    }

    for (const t of this.moveState.transitions()) {
      if (t in this.movePredicates && this.movePredicates[t]()) {
        this.moveState[t]();
        break;
      }
    }
  }
}

export default Hero;
