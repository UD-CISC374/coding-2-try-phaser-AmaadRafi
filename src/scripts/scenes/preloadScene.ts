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
  }

  create() {
    this.scene.start('MainScene');
  }
}
