export default class BreakRoomScene extends Phaser.Scene {
  constructor() {
    super("BreakRoomScene");
  }

  preload() {
    // Load your background
    this.load.image("breakroom", "Assets/Backgrounds/BreakRoom.png");

    // Character spritesheets
    this.load.spritesheet("walkLeft", "Assets/Characters/Lady_GreenDress/walking_left.png", {
      frameWidth: 166,
      frameHeight: 254
    });

    this.load.spritesheet("walkUp", "Assets/Characters/Lady_GreenDress/walk_up_test.png", {
      frameWidth: 158,
      frameHeight: 244
    });

    this.load.spritesheet("walkDown", "Assets/Characters/Lady_GreenDress/walkdown_test3.png", {
      frameWidth: 145,
      frameHeight: 250
    });

    this.load.spritesheet(
      "idle",
      "Assets/Characters/Lady_GreenDress/idle_one_row.png",
      {
        frameWidth: 153.6,
        frameHeight: 240,
      }
    );
  }

  create() {
    // Add background centered
    this.add.image(640, 384, "breakroom").setDepth(0);

    // Add player in the middle of the floor
    this.player = this.add.sprite(640, 650, "idle");
    this.player.setDepth(100);
    this.player.setOrigin(0.5, 1);
    this.physics.world.enable(this.player);

    // Prevent leaving screen by default
    this.player.body.setCollideWorldBounds(true);

    // Walk speed
    this.speed = 150;

    // Walkable floor area (based on your image)
    this.movementBounds = new Phaser.Geom.Rectangle(
      0, // left
      550, // top
      1280, // width
      370 // height
    );

    // Animations
    this.createAnimations();

    // Controls
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    const p = this.player;
    const c = this.cursors;
    const speed = this.speed;

    p.body.setVelocity(0);

    let moving = false;

    // left
    if (c.left.isDown) {
      p.body.setVelocityX(-speed);
      p.setFlipX(false);
      p.anims.play("walkLeft", true);
      moving = true;
    }
    // right (flip)
    else if (c.right.isDown) {
      p.body.setVelocityX(speed);
      p.setFlipX(true);
      p.anims.play("walkLeft", true);
      moving = true;
    }
    // up/back
    else if (c.up.isDown) {
      p.body.setVelocityY(-speed);
      p.anims.play("walkUp", true);
      moving = true;
    }
    // down/forward
    else if (c.down.isDown) {
      p.body.setVelocityY(speed);
      p.anims.play("walkDown", true);
      moving = true;
    }

    if (!moving) {
      p.anims.play("idle", true);
    }

    this.keepPlayerInBounds();
  }

  createAnimations() {
    this.anims.create({
      key: "walkLeft",
      frames: this.anims.generateFrameNumbers("walkLeft", { start: 0, end: 7 }),
      frameRate: 12,
      repeat: -1
    });

    this.anims.create({
      key: "walkUp",
      frames: this.anims.generateFrameNumbers("walkUp", { start: 0, end: 8 }),
      frameRate: 12,
      repeat: -1
    });

    this.anims.create({
      key: "walkDown",
      frames: this.anims.generateFrameNumbers("walkDown", { start: 0, end: 8 }),
      frameRate: 12,
      repeat: -1
    });

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("idle", { start: 0, end: 7 }),
      frameRate: 6,
      repeat: -1,
    });
  }

  keepPlayerInBounds() {
    const p = this.player;
    const b = this.movementBounds;

    if (p.x < b.x) p.x = b.x;
    if (p.x > b.x + b.width) p.x = b.x + b.width;

    if (p.y < b.y) p.y = b.y;
    if (p.y > b.y + b.height) p.y = b.y + b.height;
  }
}
