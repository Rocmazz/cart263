// play scene where the actual game happens
class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayScene' });
  }

  preload() {
    // load all game assets
    this.load.image('bg', 'assets/greenHillBG.png');
    this.load.image('tile', 'assets/greenHillTiles.png');
    this.load.image('motobug', 'assets/motobug.png');

    // run animation strip - 8 frames with 1px gap between each
    this.load.spritesheet('run', 'assets/run.png', {
      frameWidth: 48,
      frameHeight: 48,
      spacing: 1
    });

    // spin animation strip - 16 frames with 1px gap between each
    this.load.spritesheet('spin', 'assets/spin.png', {
      frameWidth: 48,
      frameHeight: 48,
      spacing: 1
    });
  }

  create() {
    this.gameSpeed = 300;
    this.score = 0;
    this.gameOver = false;
    this.isSpinning = false;
    this.spinCooldown = false;

    // plain arrays for obstacles, enemies, and ground visuals
    this.obstacles = [];
    this.enemies = [];
    this.groundVisuals = [];

    // scrolling background
    this.bg = this.add.tileSprite(400, 200, 800, 400, 'bg');

    // one fixed invisible ground line the player always lands on
    this.groundLine = this.add.rectangle(400, 352, 800, 4, 0x000000).setVisible(false);
    this.physics.add.existing(this.groundLine, true);

    // build starting ground visuals
    this.buildGround();

    // define animations before creating the sprite
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('run', { start: 0, end: 7 }),
      frameRate: 12,
      repeat: -1
    });

    this.anims.create({
      key: 'spin',
      frames: this.anims.generateFrameNumbers('spin', { start: 0, end: 15 }),
      frameRate: 16,
      repeat: -1
    });

    // sonic sprite - use run sheet as base texture
    this.player = this.physics.add.sprite(80, 300, 'run', 0);
    this.player.body.setGravityY(1800);
    this.player.setScale(1.5);
    // shrink hitbox to match sonic's actual visible size within the frame
    this.player.body.setSize(30, 36);
    this.player.play('run');

    // collider between player and the fixed ground line
    this.physics.add.collider(this.player, this.groundLine);

    this.spawnObstacle();
    this.spawnEnemy();

    // score text
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '20px',
      fontFamily: 'Arial',
      color: '#ffffff'
    });

    // jump and spin keys
    this.jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.spinKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  }

  update() {
    if (this.gameOver) return;

    // speed up over time
    this.gameSpeed += 0.03;

    // scroll background slower than foreground for depth effect
    this.bg.tilePositionX += this.gameSpeed * 0.3 * (1 / 60);

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

    // switch animation based on state
    if (this.isSpinning) {
      if (this.player.anims.currentAnim.key !== 'spin') this.player.play('spin');
    } else {
      if (this.player.anims.currentAnim.key !== 'run') this.player.play('run');
    }

    // player fell off the map
    if (this.player.y > 450) {
      this.triggerGameOver();
      return;
    }

    // scroll ground visuals and remove ones that go off screen
    for (let i = this.groundVisuals.length - 1; i >= 0; i--) {
      let tile = this.groundVisuals[i];
      tile.x -= this.gameSpeed * (1 / 60);

      if (tile.x + tile.width / 2 < 0) {
        tile.destroy();
        this.groundVisuals.splice(i, 1);
      }
    }

    // keep ground built well ahead of the screen
    while (this.getRightEdge() < 1400) {
      this.addGroundTile();
    }

    // pit detection - disable ground collision when player is over a gap
    this.groundLine.body.checkCollision.none = this.isOverGap();

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

  // checks if the player x is currently over a visual gap
  isOverGap() {
    let px = this.player.x;
    for (let tile of this.groundVisuals) {
      let left = tile.x - tile.width / 2;
      let right = tile.x + tile.width / 2;
      if (px >= left && px <= right) return false;
    }
    return true;
  }

  // triggers the spin attack state
  activateSpin() {
    this.isSpinning = true;
    this.spinCooldown = true;

    // spin lasts 300ms
    this.time.delayedCall(300, () => {
      this.isSpinning = false;

      // short cooldown before spin can be used again
      this.time.delayedCall(100, () => {
        this.spinCooldown = false;
      });
    });
  }

  // fills ground visuals from x=0 up to 1400
  buildGround() {
    let x = 0;
    while (x < 1400) {
      let tile = this.add.tileSprite(x + 150, 368, 300, 32, 'tile');
      this.groundVisuals.push(tile);
      x += 300;
    }
  }

  // adds one ground tile at the right edge with a random chance of a gap before it
  addGroundTile() {
    let right = this.getRightEdge();
    let gap = Math.random() < 0.2 ? 80 : 0;
    let tile = this.add.tileSprite(right + gap + 150, 368, 300, 32, 'tile');
    this.groundVisuals.push(tile);
  }

  // returns the x of the right edge of the furthest ground tile
  getRightEdge() {
    let maxX = 0;
    for (let tile of this.groundVisuals) {
      let right = tile.x + tile.width / 2;
      if (right > maxX) maxX = right;
    }
    return maxX;
  }

  // spawns an obstacle off screen to the right
  spawnObstacle() {
    let spacing = 500 + Math.random() * 300;
    let obs = this.add.rectangle(900 + spacing, 328, 30, 48, 0xff0000);
    this.obstacles.push(obs);
  }

  // spawns a motobug enemy off screen to the right
  spawnEnemy() {
    let spacing = 600 + Math.random() * 400;
    let enemy = this.add.image(900 + spacing, 338, 'motobug');
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
