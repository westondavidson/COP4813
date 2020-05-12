class Scene3 extends Phaser.Scene {
  constructor() {
    super("gameOver");
  }

create(){

  this.gameOver.setScale(.5);
    this.gameOverText = this.add.text(config.width, config.height, "game over man");
}

}
