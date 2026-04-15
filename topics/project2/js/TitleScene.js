// title scene shown when the game first loads
class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleScene' });
  }

  create() {
    // center of the canvas
    const cx = this.scale.width / 2;
    const cy = this.scale.height / 2;

    // sky and ground rectangles as background
    this.add.rectangle(cx, cy - 100, 800, 200, 0x5ac8f5);
    this.add.rectangle(cx, cy + 100, 800, 200, 0x4aaa3a);

    // game title
    this.add.text(cx, cy - 60, 'SONIC RUNNER', {
      fontSize: '48px',
      fontFamily: 'Arial Black',
      color: '#ffffff',
    }).setOrigin(0.5);

    // prompt to start
    this.add.text(cx, cy + 60, 'Press ENTER to Start', {
      fontSize: '22px',
      fontFamily: 'Arial',
      color: '#ffffff'
    }).setOrigin(0.5);

    // enter key to start game
    const enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    enter.once('down', () => {
      this.scene.start('PlayScene');
    });
  }
}
