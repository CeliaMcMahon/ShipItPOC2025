import IntroScene from "./Scenes/IntroScene.js";
import CharacterSelectScene from "./Scenes/CharacterSelectScene.js";
import BreakRoomScene from "./Scenes/BreakRoomScene.js";

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 768,
  physics: { default: "arcade", arcade: { debug: false } },
  scene: [IntroScene, CharacterSelectScene, BreakRoomScene]
};

new Phaser.Game(config);
