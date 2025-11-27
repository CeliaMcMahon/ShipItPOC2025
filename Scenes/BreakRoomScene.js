import { CHARACTERS } from "../Assets/Characters/characterRegistry.js";
import { CharacterController } from "../Assets/Characters/characterController.js";
import { createCharacterAnimations } from "../Assets/Characters/characterAnimations.js";

export default class BreakRoomScene extends Phaser.Scene {
  constructor() {
    super("BreakRoomScene");
  }

  preload() {
    this.load.image("breakroom", "Assets/Backgrounds/BreakRoom.png");

    // Get which character was selected
    const characterKey = this.registry.get("selectedCharacter");
    this.charConfig = CHARACTERS[characterKey];

    // Load all sprite sheets for the active character
    Object.entries(this.charConfig).forEach(([animKey, def]) => {
      if (!def.file) return;

      this.load.spritesheet(animKey, this.charConfig.folder + def.file, {
        frameWidth: def.frameWidth,
        frameHeight: def.frameHeight,
      });
    });
  }

  create() {
    // Room background
    this.add.image(640, 384, "breakroom");

    // Create the player
    this.player = this.physics.add.sprite(640, 650, "idle").setOrigin(0.5, 1);

    // Movement limits
    const bounds = new Phaser.Geom.Rectangle(
      80, // LEFT boundary (x start) — 0 means the far left edge of the screen but character width will add some padding
      550, // TOP boundary (y start) — player cannot go above this (bottom third of the room)
      1120, // WIDTH — full width of canvas, less character width
      218 // HEIGHT — this determines the BOTTOM limit:
      // 768 (canvas height) - 550 (top boundary) = 218 so bottom boundary sits exactly at bottom of screen
    );

    // Create animations for the chosen character
    createCharacterAnimations(this, this.charConfig);

    // Create controller to handle movement & animation
    this.controller = new CharacterController(
      this,
      this.player,
      this.charConfig,
      bounds
    );
  }

  update() {
    this.controller.update();
  }
}
