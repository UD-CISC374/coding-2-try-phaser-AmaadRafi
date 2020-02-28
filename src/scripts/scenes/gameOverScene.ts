import 'phaser'

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameOverScene'});
    }

    preload() {
        this.load.image("background", "assets/images/cloudBack.png");
      }

    create() {
        this.add.text(20,20,"Loading...");
    }
}
