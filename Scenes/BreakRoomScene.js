import { CHARACTERS } from "../Assets/Characters/characterRegistry.js";

export default class BreakRoomScene extends Phaser.Scene {
  constructor() {
    super("BreakRoomScene");
  }

  preload() {
    this.load.image("breakroom", "Assets/Backgrounds/BreakRoom.png");

    const characterKey = this.registry.get("selectedCharacter");
    const c = CHARACTERS[characterKey];
    this.charConfig = c;

    // Loop through animations
    Object.entries(c).forEach(([animKey, def]) => {
      if (!def.file) return; // skip non-animation keys

      this.load.spritesheet(animKey, c.folder + def.file, {
        frameWidth: def.frameWidth,
        frameHeight: def.frameHeight
      });
    });
  }

  create() {
    this.add.image(640, 384, "breakroom");

    this.player = this.add.sprite(640, 650, "idle");
    this.player.setOrigin(0.5, 1);
    this.physics.world.enable(this.player);

    this.player.body.setCollideWorldBounds(true);
    this.speed = this.charConfig.speed;

    this.movementBounds = new Phaser.Geom.Rectangle(0, 550, 1280, 370);

    this.createAnimations();

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createAnimations() {
    const c = this.charConfig;

    Object.entries(c).forEach(([key, anim]) => {
      if (!anim.file) return;

      this.anims.create({
        key,
        frames: this.anims.generateFrameNumbers(key, { start: 0, end: anim.frames }),
        frameRate: 12,
        repeat: -1
      });
    });
  }

  update() {
    const p = this.player;
    const c = this.cursors;
    const speed = this.speed;

    p.body.setVelocity(0);

    let moving = false;

    if (c.left.isDown) {
      p.body.setVelocityX(-speed);
      p.anims.play("walkLeft", true);
      moving = true;
    } else if (c.right.isDown) {
      p.body.setVelocityX(speed);
      p.setFlipX(true);
      p.anims.play("walkLeft", true);
      moving = true;
    } else if (c.up.isDown) {
      p.body.setVelocityY(-speed);
      p.anims.play("walkUp", true);
      moving = true;
    } else if (c.down.isDown) {
      p.body.setVelocityY(speed);
      p.anims.play("walkDown", true);
      moving = true;
    }

    if (!moving) {
      p.anims.play("idle", true);
    }

    this.keepPlayerInBounds();
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
