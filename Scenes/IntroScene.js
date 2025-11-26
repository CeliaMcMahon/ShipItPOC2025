export default class IntroScene extends Phaser.Scene {
  constructor() {
    super("IntroScene");
  }

  preload() {
    this.load.audio("characterChoice", "Assets/Sounds/characterChoiceLoop.mp3");
  }

  create() {
    // Title
    this.add
      .text(640, 300, "Archie's AI Adventure", {
        fontSize: "120px",
        fontFamily: "Times New Roman",
        color: "#ff8503",
        stroke: "#ffffff",
        strokeThickness: 2,
      })
      .setOrigin(0.5);

    const graphics = this.add.graphics();
    graphics.fillGradientStyle(0xffb35a, 0xffa236, 0xff8200, 0xff7b00, 1);
    graphics.fillRoundedRect(520, 410, 240, 110, 30);
    graphics.lineStyle(6, 0xffffff);
    graphics.strokeRoundedRect(520, 410, 240, 110, 30);

    const startBtn = this.add
      .text(640, 465, "START", {
        fontSize: "54px",
        fontFamily: "Arial",
        fontStyle: "bold",
        color: "#ffffff",
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => {
        graphics.clear();
        graphics.fillGradientStyle(0xffc270, 0xffb457, 0xff8f24, 0xff860d, 1);
        graphics.fillRoundedRect(520, 410, 240, 110, 30);
        graphics.strokeRoundedRect(520, 410, 240, 110, 30);
      })
      .on("pointerout", () => {
        graphics.clear();
        graphics.fillGradientStyle(0xffb35a, 0xffa236, 0xff8200, 0xff7b00, 1);
        graphics.fillRoundedRect(520, 410, 240, 110, 30);
        graphics.strokeRoundedRect(520, 410, 240, 110, 30);
      });

    startBtn.on("pointerdown", () => {
      // this click unlocks the audio context for the next page
      this.sound.context.resume();

      // Start background loop
      const bg = this.sound.add("characterChoice", {
        loop: true,
        volume: 0.7,
      });
      bg.play();

      // Move to the real character select screen
      this.scene.start("CharacterSelectScene");
    });
  }
}
