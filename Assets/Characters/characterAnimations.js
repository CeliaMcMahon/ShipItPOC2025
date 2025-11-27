export function createCharacterAnimations(scene, charConfig) {
  Object.entries(charConfig).forEach(([key, anim]) => {
    if (!anim.file) return;

    // Prevent duplicate animation creation
    if (scene.anims.exists(key)) return;

    scene.anims.create({
      key,
      frames: scene.anims.generateFrameNumbers(key, {
        start: 0,
        end: anim.frames
      }),
      frameRate: anim.frameRate,
      repeat: -1
    });
  });
}
