import { CHARACTERS } from "../Assets/Characters/characterRegistry.js";

export default class CharacterSelectScene extends Phaser.Scene {
  constructor() {
    super("CharacterSelectScene");
  }

  preload() {
    // load sounds
    this.load.audio(
      "characterChime",
      "Assets/Sounds/characterSelectionChime.mp3"
    );
    this.load.audio("characterChoice", "Assets/Sounds/characterChoiceLoop.mp3");

    // load display images
    Object.entries(CHARACTERS).forEach(([key, data]) => {
      this.load.image(key + "_display", data.folder + data.display);
    });

    // star flourish sheet
    this.load.spritesheet("starFlourish", "Assets/Effects/starflourish.png", {
      frameWidth: 255,
      frameHeight: 340,
    });
  }

  create() {
    // Unlock audio for autoplay on browsers
    this.sound.unlock();

    // Looping background choice music
    this.choiceLoop = this.sound.get("characterChoice");

    // Heading
    this.add
      .text(640, 40, "Choose Your Character", {
        fontSize: "56px",
        fontFamily: "Times New Roman",
        color: "#ff8503ff",
        stroke: "#ffffff",
        strokeThickness: 2,
      })
      .setOrigin(0.5);

    const charKeys = Object.keys(CHARACTERS);

    const spacingX = 310;
    const spacingY = 310;

    const gridOffsetY = 210;

    // smaller scale than original pics
    const portraitScale = 0.16;

    charKeys.forEach((key, index) => {
      const row = Math.floor(index / 4);
      const col = index % 4;

      const x = 170 + col * spacingX;
      const y = gridOffsetY + 50 + row * spacingY;

      // frame resized to fit portrait at scale 0.16
      const frame = this.add
        .rectangle(x, y, 200, 300, 0x222222, 0.7)
        .setStrokeStyle(4, 0xf6d56f)
        .setOrigin(0.5)
        .setDepth(1);

      const img = this.add
        .image(x, y, key + "_display")
        .setScale(portraitScale)
        .setInteractive({ useHandCursor: true })
        .setDepth(2);

      img.on("pointerover", () => {
        img.setScale(portraitScale + 0.02);
        frame.setStrokeStyle(4, 0xffe49a);
      });

      img.on("pointerout", () => {
        img.setScale(portraitScale);
        frame.setStrokeStyle(4, 0xf6d56f);
      });

      img.on("pointerdown", () => {
        this.handleCharacterSelect(key, x, y);
      });
    });

    // star flourish animation
    this.anims.create({
      key: "starBurst",
      frames: this.anims.generateFrameNumbers("starFlourish", {
        start: 0,
        end: 7,
      }),
      frameRate: 20,
      hideOnComplete: true,
    });
  }

  handleCharacterSelect(characterKey, x, y) {
    console.log("Selected character:", characterKey, CHARACTERS[characterKey]);

    if (this.choiceLoop?.isPlaying) {
      this.choiceLoop.stop();
    }

    // Play the sound IMMEDIATELY on click
    this.sound.play("characterChime");

    // Wait a short moment before showing the animation
    this.time.delayedCall(400, () => {
      // Start star animation
      const star = this.add.sprite(x, y, "starFlourish").setDepth(5);

      star.play("starBurst");

      // Continue after animation
      this.time.delayedCall(500, () => {
        this.registry.set("selectedCharacter", characterKey);
        this.scene.start("BreakRoomScene");
      });
    });
  }
}
