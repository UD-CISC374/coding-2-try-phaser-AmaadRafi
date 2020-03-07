export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("background", "assets/images/bg1.png");
    this.load.image("bird", "assets/bird.png");
    this.load.image("enemy1", "assets/enemies/e1.png");
    this.load.image("enemy2", "assets/enemies/e2.png");
    this.load.image("enemy3", "assets/enemies/e3.png");
    this.load.image("enemy4", "assets/enemies/e4.png");
    this.load.image("enemy5", "assets/enemies/e5.png");

    this.load.audio("bgmusic", "assets/sounds/background.mp3");
    this.load.audio("sfx_point", "assets/sounds/point.wav");
    this.load.audio("sfx_hit", "assets/sounds/hit.wav");
  }

  create() {
    this.scene.start('MainScene');
  }
}
