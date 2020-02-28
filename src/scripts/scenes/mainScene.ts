export default class MainScene extends Phaser.Scene {
  // Objects
  private background: Phaser.GameObjects.Image;
  bird: Phaser.GameObjects.Image;
  p1: Phaser.GameObjects.Image;
  p2: Phaser.GameObjects.Image;
  p3: Phaser.GameObjects.Image;
  p4: Phaser.GameObjects.Image;
  pipes: Phaser.Physics.Arcade.Group;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  spacebar: Phaser.Input.Keyboard.Key;
  score: number = 0;
  birdSpeed: number;
  pipeSpeed: number;
  scoreText: Phaser.GameObjects.Text;
  gameOverText: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'MainScene' });
  }
  

  create() {
    this.background = this.add.image(0,0, "background");
    this.background.setOrigin(0,0);
    this.scoreText = this.add.text(20,20,"Score: 0");
    this.gameOverText = this.add.text(200, 250, "game over", {
      font: "50px Arial",
      fill: "RED"
    });
    this.gameOverText.visible = false;

    // bird
    this.bird = this.add.sprite(200, 300, "bird");
    this.physics.add.existing(this.bird);
    this.bird.setScale(.4);
    //this.bird.angle -= 10;

    // pipes / obstacles
    this.p1=this.physics.add.image(Phaser.Math.Between(2400, 3000),Phaser.Math.Between(100,980),"pipe");
    this.p2=this.physics.add.image(Phaser.Math.Between(2400, 3000),Phaser.Math.Between(100,980),"pipe");
    this.p3=this.physics.add.image(Phaser.Math.Between(2400, 3000),Phaser.Math.Between(100,980),"pipe");
    this.p4=this.physics.add.image(Phaser.Math.Between(2400, 3000),Phaser.Math.Between(100,980),"pipe");
    this.p1.setScale(.15);
    this.p2.setScale(.15);
    this.p3.setScale(.15);
    this.p4.setScale(.15);

    this.pipes =  this.physics.add.group();
    this.pipes.add(this.p1);
    this.pipes.add(this.p2);
    this.pipes.add(this.p3);
    this.pipes.add(this.p4);

    // keyboard
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Physics
    this.physics.add.overlap(this.bird, this.pipes, this.gameOver, this.nullCallback);
    this.physics.world.setBoundsCollision();

  }

  update() {
    //this.movePipe(this.bird, 5);
    this.movePipe(this.p1, 10);
    this.movePipe(this.p2, 10);
    this.movePipe(this.p3, 10);
    this.movePipe(this.p4, 10);

    // shift pipes
    this.shiftPipe(this.p1);
    this.shiftPipe(this.p2);
    this.shiftPipe(this.p3);
    this.shiftPipe(this.p4);

    // reset sprites
    if(this.bird.y < 0)
      this.bird.y = 1080;

    if(this.bird.y > 1080)
      this.bird.y = 0;

    // bird movement
    this.birdMove(this.bird, this.cursorKeys);

    // update score
    this.updateScore();
  }

  movePipe(pipe, speed) {
      pipe.x -= speed;
  }

  birdMove(bird, kb) {
    if(kb.down.isDown) {
      bird.y += 10;
    }

    if(kb.up.isDown) {
      bird.y -= 10;
    }
  }

  resetPipe(pipe) {
    pipe.x = Phaser.Math.Between(2400, 3000); // move off the map to right side
    pipe.y = Phaser.Math.Between(100, 980); // move vertically randomly
  }

  shiftPipe(pipe) {
    if(pipe.x < 0) {
      this.resetPipe(pipe);
      this.score += 10;
    }
  }

  updateScore(){
    this.scoreText.setText("Score: " + this.score);
  }

  gameOver() {
    this.gameOverText.visible = true;
    this.scene.stop("MainScene");
    this.scene.start("GameOverScene");
  }

  dropObject(object) {
    object.y -= 10;
  }

  nullCallback() {}

}
