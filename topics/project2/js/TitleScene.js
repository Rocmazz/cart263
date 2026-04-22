// title scene shown when the game first loads
class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleScene' });
  }

  preload() {
    // load the title screen image
    this.load.image('titlescreen', 'assets/titlescreen.png');

    // load the title screen song
    this.load.audio('titleSong', 'assets/titlescreensong.mp3');
  }

  create() {
    // display the title screen image
    this.add.image(400, 200, 'titlescreen');

    // play title song on loop
    this.music = this.sound.add('titleSong', { loop: true });
    this.music.play();

    // enter key to start game
    const enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    enter.once('down', () => {
      this.music.stop();
      this.scene.start('PlayScene');
    });
  }
}
