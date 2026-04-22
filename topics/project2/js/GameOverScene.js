// game over screen shown when the player dies
class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data) {
    // receive the final score from PlayScene
    this.finalScore = data.score;
  }

  preload() {
    // load the game over background image
    this.load.image('gameover', 'assets/gameover.png');
  }

  create() {
    const cx = this.scale.width / 2;
    const cy = this.scale.height / 2;

    // game over background
    this.add.image(cx, cy, 'gameover');

    // game over text
    this.add.text(cx, cy - 60, 'GAME OVER', {
      fontSize: '48px',
      fontFamily: 'Arial Black',
      color: '#ffffff'
    }).setOrigin(0.5);

    // final score
    this.add.text(cx, cy, 'Score: ' + this.finalScore, {
      fontSize: '28px',
      fontFamily: 'Arial',
      color: '#ffff00'
    }).setOrigin(0.5);

    // restart prompt
    this.add.text(cx, cy + 70, 'Press ENTER to play again', {
      fontSize: '20px',
      fontFamily: 'Arial',
      color: '#ffffff'
    }).setOrigin(0.5);

    // enter key to go back to title
    const enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    enter.once('down', () => {
      this.scene.start('TitleScene');
    });
  }
}
