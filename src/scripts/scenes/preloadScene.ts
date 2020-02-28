export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("background", "assets/images/bg1.png");
    this.load.image("bird", "assets/ninja.png");
    this.load.image("pipe", "assets/pipe.png");
  }

  create() {
    this.scene.start('MainScene');
  }
}
