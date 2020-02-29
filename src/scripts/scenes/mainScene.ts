export default class MainScene extends Phaser.Scene {
  // Objects
  private background: Phaser.GameObjects.Image;
  bird: Phaser.GameObjects.Image;
  p1: Phaser.GameObjects.Image;
  p2: Phaser.GameObjects.Image;
  p3: Phaser.GameObjects.Image;
  p4: Phaser.GameObjects.Image;
  p5: Phaser.GameObjects.Image;
  enemies: Phaser.Physics.Arcade.Group;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  spacebar: Phaser.Input.Keyboard.Key;
  score: number = 0;
  birdSpeed: number = 12;
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

    this.gameOverText = this.add.text(1920/2 - 300, 1080/2 - 50, "GAME OVER", {
      font: "100px Arial",
      fill: "RED"
    });

    this.gameOverText.visible = false;


    // bird
    this.bird = this.add.sprite(200, 300, "bird");
    this.physics.add.existing(this.bird);
    this.bird.setScale(.2);
    //this.bird.angle -= 10;

    // pipes / obstacles
    this.p1 = this.physics.add.image(Phaser.Math.Between(2400, 3000),Phaser.Math.Between(100,980),"enemy1");
    this.p2=this.physics.add.image(Phaser.Math.Between(2400, 3000),Phaser.Math.Between(100,980),"enemy2");
    this.p3=this.physics.add.image(Phaser.Math.Between(2400, 3000),Phaser.Math.Between(100,980),"enemy3");
    this.p4=this.physics.add.image(Phaser.Math.Between(2400, 3000),Phaser.Math.Between(100,980),"enemy4");
    this.p5=this.physics.add.image(Phaser.Math.Between(2400, 3000),Phaser.Math.Between(100,980),"enemy5");
    this.p1.setScale(.3);
    this.p2.setScale(.3);
    this.p3.setScale(.3);
    this.p4.setScale(.3);
    this.p5.setScale(.3);
    this.p1.flipX = true;
    this.p2.flipX = true;
    this.p3.flipX = true;
    this.p4.flipX = true;
    this.p5.flipX = true;


    this.enemies =  this.physics.add.group();
    this.enemies.add(this.p1);
    this.enemies.add(this.p2);
    this.enemies.add(this.p3);
    this.enemies.add(this.p4);
    this.enemies.add(this.p5);

    // keyboard
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Physics
    this.physics.add.overlap(this.bird, this.enemies, this.gameOver, this.nullCallback, this);

  }

  update() {
    // enemy movement
    this.moveEnemy(this.p1, 10);
    this.moveEnemy(this.p2, 12);
    this.moveEnemy(this.p3, 12);
    this.moveEnemy(this.p4, 15);
    this.moveEnemy(this.p5, 20);

    // shift enemy 
    this.resetEnemy(this.p1);
    this.resetEnemy(this.p2);
    this.resetEnemy(this.p3);
    this.resetEnemy(this.p4);
    this.resetEnemy(this.p5);

    // reset bird
    if(this.bird.y < 0)
      this.bird.y = 1080;
    if(this.bird.y > 1080)
      this.bird.y = 0;

    // bird movement
    this.birdMove(this.bird, this.cursorKeys, this.birdSpeed);

    // update score
    this.updateScore();
  }

  moveEnemy(pipe, speed) {
      pipe.x -= speed;
  }

  birdMove(bird, kb, speed) {
    if(kb.down.isDown) { bird.y += speed; }
    if(kb.up.isDown) { bird.y -= speed; }
    if(kb.right.isDown) { bird.x += speed }
    if(kb.left.isDown) { bird.x -= speed }

  }

  resetPipe(pipe) {
    pipe.x = Phaser.Math.Between(2400, 3000); // move off the map to right side
    pipe.y = Phaser.Math.Between(100, 980); // move vertically randomly
  }

  resetEnemy(pipe) {
    if(pipe.x < 0) {
      this.resetPipe(pipe);
      this.score += 10;
    }
  }

  updateScore(){
    this.scoreText.setText("Score: " + this.score);
  }

  gameOver():void {
    this.gameOverText.visible = true;
    this.scene.pause("MainScene");
    //restart on click/key press
    
  }

  nullCallback() {console.log("collision callback")}

}
