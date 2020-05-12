class Scene1 extends Phaser.Scene {
  constructor() {
    super("titleScreen");
  }

  preload(){
    //play button
    this.load.image("play", "scripts/game1/assets/play.png");

    //spritesheet belongs to mooreint for the game "Chesslike: Adventures in Chess"
    this.load.spritesheet("ground", "scripts/game1/assets/master-tileset.png", {
      frameWidth: 64,
      frameHeight: 64
    });

    //player model - currently gray block, will be updated
    this.load.spritesheet("player", "scripts/game1/assets/player.png", {
      frameWidth: 30,
      frameHeight: 64
    });

    //falling objects
    this.load.spritesheet("obj1", "scripts/game1/assets/player.png", {
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet("obj2", "scripts/game1/assets/player.png", {
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet("obj3", "scripts/game1/assets/player.png", {
      frameWidth: 64,
      frameHeight: 64
    });


    //parralax scroling background images
    this.load.image("bg-1", "scripts/game1/assets/bg-1.png");
    this.load.image('bg-2', 'scripts/game1/assets/bg-2.png');

    //game over image for scene 3
    this.load.image("gameOverImage", "scripts/game1/assets/gameover.png");

    //retry image for scene 2
    this.load.image("retryImage", "scripts/game1/assets/retry.png");


  }

  create(){

    //howto text
    this.howTo = this.add.text(config.width / 2 - 90, config.height / 2 -200, "How to play:");
    this.howTo.setScale(1.5);
    this.howTo.setOrigin(0,0);

    this.instructions = this.add.text(config.width / 2 - 205, config.height / 2 - 150, "Move with the left and right arrow keys. Watch your head!" );
    this.instructions.setScale(.75);

    //play button
    this.play = this.add.image(config.width / 2, config.height / 2 + 200, "play");
    this.play.setScale(.15);
    this.play.setInteractive();
    //on playbutton click, call runGame function
    this.play.on('pointerdown', () => this.runGame());



    //in-game animations

    //ground animation
    this.anims.create({
      key: "grass_anim",
      frames: this.anims.generateFrameNumbers("ground", {
        start: 20,
        end: 27
      }),
      frameRate: 1,
      repeat: -1,
    });



  }

//transitions game to scene 2 for gameplay
runGame(){
  this.scene.start('gameplay');
}


}
