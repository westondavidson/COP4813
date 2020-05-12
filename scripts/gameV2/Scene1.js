class Scene1 extends Phaser.Scene {
  constructor() {
    super("titleScreen");
  }

  preload(){
    //play button
    this.load.image("play", "scripts/gameV2/assets/play.png");

    this.load.image("title", "scripts/gameV2/assets/titlescreen.png");

    //spritesheet belongs to mooreint for the game "Chesslike: Adventures in Chess"
    this.load.spritesheet("ground", "scripts/gameV2/assets/master-tileset.png", {
      frameWidth: 64,
      frameHeight: 64
    });

    //player model - currently gray block, will be updated
    this.load.spritesheet("player", "scripts/gameV2/assets/ness_spritesheet_edited_V2.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    //falling objects
    this.load.spritesheet("obj1", "scripts/gameV2/assets/snake_spritesheet.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    //spritesheet taken from user whtdragon https://forums.rpgmakerweb.com/index.php?threads/whtdragons-animals-and-running-horses-now-with-more-dragons.53552/
    this.load.spritesheet("obj2", "scripts/gameV2/assets/monkey_spritesheet_edited.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    //spritesheet taken from user whtdragon https://forums.rpgmakerweb.com/index.php?threads/whtdragons-animals-and-running-horses-now-with-more-dragons.53552/
    this.load.spritesheet("obj3", "scripts/gameV2/assets/bees_spritesheet_edited.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("obj4", "scripts/gameV2/assets/player.png", {
      frameWidth: 64,
      frameHeight: 64
    });


    //parralax scroling background images
    this.load.image("bg-1", "scripts/gameV2/assets/bg-1.png");
    this.load.image('bg-2', 'scripts/gameV2/assets/bg-2.png');

    //game over image for scene 3
    this.load.image("gameOverImage", "scripts/gameV2/assets/gameover.png");

    //retry image for scene 2
    this.load.image("retryImage", "scripts/gameV2/assets/retry.png");

    //score background for scene 2
    this.load.image("scorebackground", "scripts/gameV2/assets/score_background.png");

    //sound sources
    this.load.audio('scene2_song', 'scripts/gameV2/assets/snd/scene2_song.mp3');

  }

  create(){

    //titlescreen image background
    this.titlescreen = this.add.image(config.width/2, config.height / 2, "title");
    //howto text
    /*
    this.howTo = this.add.text(config.width / 2 - 90, config.height / 2 -200, "How to play:");
    this.howTo.setScale(1.5);
    this.howTo.setOrigin(0,0);

    this.instructions = this.add.text(config.width / 2 - 205, config.height / 2 - 150, "Move with the left and right arrow keys. Watch your head!" );
    this.instructions.setScale(.75);
    */
    //play button
    this.play = this.add.image(config.width / 2, config.height / 2 + 290, "play");
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

    //ness spritesheet animation - credit to shanethemugenfan on Deviantart for the sprites https://www.deviantart.com/shanethemugenfan/art/The-Ultimate-Ness-Spritesheet-Collab-747767428
    this.anims.create({
  key: "player_moveleft_anim",
  frames: this.anims.generateFrameNumbers("player", {
    start: 7,
    end: 9,
  }),
  frameRate: 15,
  repeat: -1
});

this.anims.create({
key: "player_moveright_anim",
frames: this.anims.generateFrameNumbers("player", {
start: 3,
end: 6,
}),
frameRate: 15,
repeat: -1
});

this.anims.create({
key: "player_slowright_anim",
frames: this.anims.generateFrameNumbers("player", {
start: 0,
end: 0,
}),
frameRate: 15,
repeat: -1
});

this.anims.create({
key: "player_slowleft_anim",
frames: this.anims.generateFrameNumbers("player", {
start: 12,
end: 12,
}),
frameRate: 15,
repeat: -1
});

this.anims.create({
key: "player_dead_anim",
frames: this.anims.generateFrameNumbers("player", {
start: 11,
end: 11,
}),
frameRate: 15,
repeat: -1
});


//snake animation

this.anims.create({
key: "obj1_anim",
frames: this.anims.generateFrameNumbers("obj1", {
start: 41,
end: 46,
}),
frameRate: 5,
repeat: -1,
});


//monkey animation

this.anims.create({
key: "obj2_anim",
frames: this.anims.generateFrameNumbers("obj2", {
start: 0,
end: 2,
}),
frameRate: 5,
repeat: -1,
});

//bees animation

this.anims.create({
key: "obj3_anim",
frames: this.anims.generateFrameNumbers("obj3", {
start: 0,
end: 2,
}),
frameRate: 20,
repeat: -1,
});


  }

//transitions game to scene 2 for gameplay
runGame(){
  this.scene.start('gameplay');
}


}
