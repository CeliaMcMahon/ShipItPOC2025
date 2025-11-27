export class CharacterController {

  constructor(scene, player, charConfig, movementBounds) {
    this.scene = scene;
    this.player = player;
    this.speed = charConfig.speed;
    this.bounds = movementBounds;

    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  update() {
    const p = this.player;
    const c = this.cursors;
    const speed = this.speed;

    p.body.setVelocity(0);

    let moving = false;

    if (c.left.isDown) {
      p.body.setVelocityX(-speed);
      p.setFlipX(false);
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

    this.keepInBounds();
  }

  keepInBounds() {
    const p = this.player;
    const b = this.bounds;

    if (p.x < b.x) p.x = b.x;
    if (p.x > b.x + b.width) p.x = b.x + b.width;
    if (p.y < b.y) p.y = b.y;
    if (p.y > b.y + b.height) p.y = b.y + b.height;
  }
}
