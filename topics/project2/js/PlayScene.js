// play scene where the actual game happens
class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayScene' });
  }

  create() {
    this.gameSpeed = 300;
    this.score = 0;
    this.gameOver = false;
    this.isSpinning = false;
    this.spinCooldown = false;

    // plain arrays for obstacles, enemies, and ground
    this.obstacles = [];
    this.enemies = [];
    this.groundSegments = [];

    // sky background
    this.add.rectangle(400, 200, 800, 400, 0x5ac8f5);

    // static physics group for ground
    this.groundGroup = this.physics.add.staticGroup();
    this.buildGround();

    // player placeholder
    this.player = this.add.rectangle(100, 332, 40, 40, 0x0000ff);
    this.physics.add.existing(this.player);
    this.player.body.setGravityY(1800);

    // collider between player and ground
    this.physics.add.collider(this.player, this.groundGroup);

    this.spawnObstacle();
    this.spawnEnemy();

    // score text
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '20px',
      fontFamily: 'Arial',
      color: '#ffffff'
    });

    // spin indicator
    this.spinText = this.add.text(16, 44, '', {
      fontSize: '16px',
      fontFamily: 'Arial',
      color: '#ffff00'
    });

    // jump and spin keys
    this.jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.spinKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  }

  update() {
    if (this.gameOver) return;

    // speed up over time
    this.gameSpeed += 0.03;

    // update score
    this.score += 1;
    this.scoreText.setText('Score: ' + Math.floor(this.score / 10));

    // jump when on the ground
    if (Phaser.Input.Keyboard.JustDown(this.jumpKey) && this.player.body.blocked.down) {
      this.player.body.setVelocityY(-900);
    }

    // spin attack on ground or in air
    if (this.spinKey.isDown && !this.isSpinning && !this.spinCooldown) {
      this.activateSpin();
    }

    // player fell off the map
    if (this.player.y > 450) {
      this.triggerGameOver();
      return;
    }

    // scroll ground segments
    for (let i = this.groundSegments.length - 1; i >= 0; i--) {
      let seg = this.groundSegments[i];
      seg.x -= this.gameSpeed * (1 / 60);
      seg.body.x = seg.x - seg.width / 2;
      seg.body.body.reset(seg.x, seg.y);

      // replace segment when it goes off screen
      if (seg.x < -200) {
        seg.body.destroy();
        seg.destroy();
        this.groundSegments.splice(i, 1);
        this.addSegment(this.getRightEdge());
      }
    }

    // scroll obstacles
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      let obs = this.obstacles[i];
      obs.x -= this.gameSpeed * (1 / 60);

      // replace obstacle when it goes off screen
      if (obs.x < -50) {
        obs.destroy();
        this.obstacles.splice(i, 1);
        this.spawnObstacle();
      }

      // hitting an obstacle ends the game
      if (this.checkOverlap(this.player, obs)) {
        this.triggerGameOver();
        return;
      }
    }

    // scroll enemies
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      let enemy = this.enemies[i];
      enemy.x -= (this.gameSpeed + 60) * (1 / 60);

      // replace enemy when it goes off screen
      if (enemy.x < -50) {
        enemy.destroy();
        this.enemies.splice(i, 1);
        this.spawnEnemy();
      }

      // destroy enemy if spinning, otherwise game over
      if (this.checkOverlap(this.player, enemy)) {
        if (this.isSpinning) {
          enemy.destroy();
          this.enemies.splice(i, 1);
          this.spawnEnemy();
          this.score += 50;
        } else {
          this.triggerGameOver();
          return;
        }
      }
    }
  }

  // triggers the spin attack state
  activateSpin() {
    this.isSpinning = true;
    this.spinCooldown = true;
    this.player.setFillStyle(0x00ffff);
    this.spinText.setText('SPIN!');

    // spin lasts 300ms
    this.time.delayedCall(300, () => {
      this.isSpinning = false;
      this.player.setFillStyle(0x0000ff);
      this.spinText.setText('');

      // short cooldown before spin can be used again
      this.time.delayedCall(100, () => {
        this.spinCooldown = false;
      });
    });
  }

  // builds the starting ground
  buildGround() {
    this.addSegment(0, 800);
  }

  // adds a ground segment at a given x position with a given width
  addSegment(x, width) {
    let w = width || (150 + Math.random() * 200);

    // visual ground tile
    let seg = this.add.rectangle(x + w / 2, 376, w, 48, 0x8B4513);

    // invisible physics body for the tile
    let body = this.add.rectangle(x + w / 2, 360, w, 16, 0x000000).setVisible(false);
    this.physics.add.existing(body, true);
    this.groundGroup.add(body);

    seg.body = body;
    this.groundSegments.push(seg);
  }

  // returns the x position where the next segment should start
  getRightEdge() {
    let maxX = 800;
    for (let seg of this.groundSegments) {
      let right = seg.x + seg.width / 2;
      if (right > maxX) maxX = right;
    }

    // random chance to leave a gap between segments
    let gap = Math.random() < 0.2 ? 60 + Math.random() * 40 : 0;
    return maxX + gap;
  }

  // spawns an obstacle off screen to the right
  spawnObstacle() {
    let spacing = 500 + Math.random() * 300;
    let obs = this.add.rectangle(900 + spacing, 330, 30, 48, 0xff0000);
    this.obstacles.push(obs);
  }

  // spawns an enemy off screen to the right
  spawnEnemy() {
    let spacing = 600 + Math.random() * 400;
    let enemy = this.add.rectangle(900 + spacing, 336, 36, 36, 0xffff00);
    this.enemies.push(enemy);
  }

  // checks if two rectangles are overlapping
  checkOverlap(a, b) {
    let ab = a.getBounds();
    let bb = b.getBounds();
    return Phaser.Geom.Intersects.RectangleToRectangle(ab, bb);
  }

  // pauses the game and shows game over text
  triggerGameOver() {
    this.gameOver = true;
    this.physics.pause();

    this.add.text(400, 180, 'GAME OVER', {
      fontSize: '48px',
      fontFamily: 'Arial Black',
      color: '#ffffff'
    }).setOrigin(0.5);
  }
}
