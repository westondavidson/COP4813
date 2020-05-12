class Scene2 extends Phaser.Scene {
  constructor() {
    super("gameplay");
  }

create(){
//game over/retry options created at bottom of scene; moved to front once game over occurs.
this.gameOverImage = this.add.image(config.width / 2, config.height / 2, "gameOverImage");

this.retryImage = this.add.image(config.width / 2, config.height / 2 + 200, "retryImage");
this.retryImage.setScale(.1);

//bg-1 tileSprite - created by Luis Zuno, see https://www.youtube.com/watch?v=pknZUn82x2U for spritesheet download

this.bg_1 = this.add.tileSprite(0, 0, config.width*3, config.height*3, "bg-1");
this.bg_1.setScrollFactor(0);

//bg-2 tileSprite - created by Luis Zuno, see https://www.youtube.com/watch?v=pknZUn82x2U for spritesheet download
this.bg_2 = this.add.tileSprite(0, 0, config.width*3, config.height*100, "bg-2");
this.bg_2.setScrollFactor(0);
this.bg_2.setScale(4);

//falling objects group
this.obj = this.physics.add.group();

//when anything in the obj group collides with the player, call gameOver function


//timed events to increase speed over time of falling objects
//this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.spawnObject, callbackScope: this, repeat: 10, startAt: 3000 });
//timedEvent spawns a new obj group child every 300 seconds by calling the spawnObject function repeatedly
this.timedEvent = this.time.addEvent({ delay: 300, callback: this.spawnObject, callbackScope: this, repeat: -1, startAt: 0 });


//ground tilesprite
this.ground = this.add.tileSprite(config.width/2, config.height - 50, config.width + 100, 100,  "ground", 20);

//creates physics for ground object, sets staticbody to true
this.physics.add.existing(this.ground, true);

//void gravity of ground - done by staticbody already
//this.ground.body.setStatic = false;
//set ground to immovable - done by staticbody already
//this.ground.body.immovable = true;

this.score = 0;
this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });







this.player = this.physics.add.sprite(config.width/2, config.height / 2 +200, "player");
this.player.body.setGravityY(300);
this.physics.add.collider(this.player, this.ground);
this.physics.add.collider(this.obj, this.player, this.gameOver, null, this);

this.physics.add.overlap(this.obj, this.ground, this.addScore, null, this);

//creates cursorkeys object for keyboard input
this.cursorKeys = this.input.keyboard.createCursorKeys();



//mouseclick retry button to retry game



//this.ground.play("grass_anim");

}

update(){
//scrolls background to make a parralax scrolling effect
this.bg_1.tilePositionX += 1;
this.bg_2.tilePositionX += .5;

//wraps player around world camera
this.physics.world.wrap(this.player);
//textureswap();

this.physics.world.collide(this.player, this.ground);

this.movePlayerManager();


}

spawnObject(){
    //this.scene.time.delayedCall(800, callback, args, scope);
    var object = this.physics.add.sprite(64, 64, "player");
    this.obj.add(object);
    object.setRandomPosition(0, 0, game.config.width, 0);
    object.setVelocityY(Math.floor(Math.random() * 100 + 500));

}

addScore(){
    this.score += 1;
    this.scoreText.setText('Score: ' + this.score);
    this.obj.remove(this.obj.child, true);
    //console.log("removed/score up");
}

//gameOver function ends game and transitions to scene 3 (hopefully)
gameOver(){
  console.log('hit!');
  this.player.setTint('#ff0000');
  this.physics.pause();
  this.gameOverImage.depth = 5000;
  this.retryImage.depth = 5001;
  this.scoreText.x = config.width / 2 -100;
  this.scoreText.y = config.height / 2 + 100;


  this.retryImage.setInteractive();
  //on playbutton click, call runGame function
  this.retryImage.on('pointerdown', () => this.resetGame());
  this.add.text(config.width/2 -150, config.height/2 + 300, "Click the restart icon to try again" );

}

resetGame(){
  this.scene.restart();
}

movePlayerManager(){
  if(this.cursorKeys.left.isDown){
    this.player.setVelocityX(-gameSettings.playerSpeed);
  } else if(this.cursorKeys.right.isDown){
    this.player.setVelocityX(gameSettings.playerSpeed);
  } else(this.player.setVelocityX(0));

}


textureswap(){
  if(this.ground.frame == 20) {
    this.ground.setTexture('ground', 22)
  } else {
    this.ground.setTexture('ground', 20)
  }
}

}
