// play scene where the actual game happens
class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayScene' });
  }

  create() {
    // game speed
    this.gameSpeed = 300;

    // score counter
    this.score = 0;
    this.gameOver = false;

    // keep track of obstacles in a plain array
    this.obstacles = [];

    // sky background
    this.add.rectangle(400, 200, 800, 400, 0x5ac8f5);

    // visual ground strip
    this.add.rectangle(400, 376, 800, 48, 0x8B4513);

    // invisible static ground for physics
    this.ground = this.physics.add.staticGroup();
    let groundBlock = this.add.rectangle(400, 368, 800, 16, 0x8B4513).setVisible(false);
    this.physics.add.existing(groundBlock, true);
    this.ground.add(groundBlock);

    // player placeholder (blue rectangle)
    this.player = this.add.rectangle(100, 320, 40, 40, 0x0000ff);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);
    this.player.body.setGravityY(600);

    // collider so player lands on ground
    this.physics.add.collider(this.player, this.ground);

    // spawn first obstacle
    this.spawnObstacle();

    // score text
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '20px',
      fontFamily: 'Arial',
      color: '#ffffff'
    });

    // jump input
    this.jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update() {
    if (this.gameOver) return;

    // increase score over time
    this.score += 1;
    this.scoreText.setText('Score: ' + Math.floor(this.score / 10));

    // jump if space pressed and player is on the ground
    if (Phaser.Input.Keyboard.JustDown(this.jumpKey) && this.player.body.blocked.down) {
      this.player.body.setVelocityY(-700);
    }

    // move obstacles and check collisions manually
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      let obs = this.obstacles[i];
      obs.x -= this.gameSpeed * (1 / 60);

      // remove obstacle when off screen and spawn a new one
      if (obs.x < -50) {
        obs.destroy();
        this.obstacles.splice(i, 1);
        this.spawnObstacle();
      }

      // simple overlap check using bounds
      if (this.checkOverlap(this.player, obs)) {
        this.triggerGameOver();
      }
    }
  }

  spawnObstacle() {
    // red rectangle as placeholder obstacle
    let obs = this.add.rectangle(900, 340, 30, 48, 0xff0000);
    this.obstacles.push(obs);
  }

  checkOverlap(a, b) {
    let ab = a.getBounds();
    let bb = b.getBounds();
    return Phaser.Geom.Intersects.RectangleToRectangle(ab, bb);
  }

  triggerGameOver() {
    this.gameOver = true;
    this.physics.pause();

    // game over text
    this.add.text(400, 180, 'GAME OVER', {
      fontSize: '48px',
      fontFamily: 'Arial Black',
      color: '#ffffff'
    }).setOrigin(0.5);
  }
}
