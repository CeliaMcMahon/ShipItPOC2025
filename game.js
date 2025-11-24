import BreakRoomScene from './BreakRoomScene.js';

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 768,
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  scene: [BreakRoomScene]
};

new Phaser.Game(config);
