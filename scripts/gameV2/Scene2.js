class Scene2 extends Phaser.Scene {
  constructor() {
    super("gameplay");
  }

create(){
//game over/retry options created at bottom of scene; moved to front once game over occurs.
this.gameOverImage = this.add.image(config.width / 2, config.height / 2 - 200, "gameOverImage");

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
this.ground.setScrollFactor(0);

//creates physics for ground object, sets staticbody to true
this.physics.add.existing(this.ground, true);

//void gravity of ground - done by staticbody already
//this.ground.body.setStatic = false;
//set ground to immovable - done by staticbody already
//this.ground.body.immovable = true;

this.scoreBackground = this.add.image(config.width/2, config.height/2, "scorebackground");
this.score = 0;
this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });






//player sprite
this.player = this.physics.add.sprite(config.width/2, config.height / 2 +200, "player");
//alter the player hitbox size to more accurately reflect sprite size
this.player.setSize(20, 20, true);
this.player.setScale(2);
this.player.body.setGravityY(300);
this.physics.add.collider(this.player, this.ground);
this.physics.add.collider(this.obj, this.player, this.gameOver, null, this);

this.physics.add.overlap(this.obj, this.ground, this.addScore, null, this);

//define current player speed for movePlayerManager
this.currentPlayerSpeed = 0;


//creates cursorkeys object for keyboard input
this.cursorKeys = this.input.keyboard.createCursorKeys();

//kill all currently running instances of sound for state refresh



//add songs/sfx to scene as needed

//background song
this.bgSong = this.sound.add('scene2_song');
this.bgSong.play({
loop: true,
//mute: true,

});


//this.ground.play("grass_anim");

}

update(time, delta){
//scrolls background to make a parralax scrolling effect
this.bg_1.tilePositionX += 1;
this.bg_2.tilePositionX += .5;
this.ground.tilePositionX += 2;

//wraps player around world camera
this.physics.world.wrap(this.player);
//textureswap();

this.physics.world.collide(this.player, this.ground);

this.movePlayerManager();

}

//spawns random object/enemies from above and sends downwards towards player
spawnObject(){
    //this.scene.time.delayedCall(800, callback, args, scope);
    //object spawns in a new sprite 32x32, calls objectGenerator function to determine which object key to call.
    this.randomObj = this.objectGenerator();
    var object = this.physics.add.sprite(32, 32, this.randomObj);
    this.obj.add(object);
    this.sizeandscale = this.randomScaleGen();
        //console.log(this.sizeandscale);
    object.setDisplaySize(this.sizeandscale*32, this.sizeandscale*32);
    //TESTING TIME
    //sizeandscaleRelativeCalculator(this.sizeandscale);
    //object.setScale(this.sizeandscale);
    //console.log(this.sizeandscale);
    //console.log(this.sizeandscale);
    object.setRandomPosition(0, 0, game.config.width, 0);
    object.setVelocityY(Math.floor(Math.random() * 100 + 500));
    object.setSize(this.sizeandscale * 1.5, this.sizeandscale * 1.5);
    object.setOffset(this.sizeandscale + 5, this.sizeandscale + 18);
    //object.setCrop(0, 0, this.sizeandscale*32, this.sizeandscale*32 - 10);
    object.play(this.randomObj + '_anim', true);

}

//generates a random 'obj' string from specified values for random enemy drop in spawnObject
objectGenerator(){
this.ranNum = Math.floor(Math.random()*3 + 1);
this.objectToSpawn = "";
console.log(this.ranNum);
if (this.ranNum == 1){
this.objectToSpawn = "obj1";
return this.objectToSpawn;
} else if (this.ranNum == 2){
  this.objectToSpawn = "obj2";
  return this.objectToSpawn;
} else if (this.ranNum == 3){
  this.objectToSpawn = "obj3";
  return this.objectToSpawn;
} else if (this.ranNum == 4){
  this.objectToSpawn = "obj4";
  return this.objectToSpawn;
}

}

//randomly assigns a value to number and returns that value; used for generating object sizes/hitboxes in game.
randomScaleGen(number){
 number = Math.floor(Math.random() * 5) + 2;
 return number;

}


//calculates score tally
addScore(){
    this.score += 1;
    this.scoreText.setText('Score: ' + this.score);
    this.obj.remove(this.obj.child, true);
    //console.log("removed/score up");
}

//gameOver function ends game and transitions to scene 3 (hopefully)
gameOver(){
  console.log('hit!');
//play death animation
  this.player.play('player_dead_anim', true);
//disable player control

  //this.player.setTint('#ff0000');
  this.physics.pause();
  this.gameOverImage.depth = 5000;
  this.retryImage.depth = 5001;
  this.scoreText.x = config.width / 2 -100;
  this.scoreText.y = config.height / 2;
  this.scoreBackground.x = config.width/2 + 100;
  this.scoreBackground.y = config.height/2 + 350;

  this.retryImage.setInteractive();
  //on playbutton click, call runGame function
  this.retryImage.on('pointerdown', () => this.resetGame());
  this.add.text(config.width/2 -150, config.height/2 + 300, "Click the restart icon to try again" );


  //stop song from playing in bg
  this.bgSong.destroy();
}

resetGame(){
  this.scene.restart();
}

//manages player movement AND animation - may separate into two separate functions later on
movePlayerManager(){
  //keeps track of current character speed
  //if player is holding down left key and the player is not at maxspeed
  if(this.cursorKeys.left.isDown){
    //then add one to current player speed
    this.currentPlayerSpeed += -gameSettings.playerMaxSpeed/10;
    console.log(this.currentPlayerSpeed);
    //if characterspeed is moving too fast, reset characterSpeed to maxSpeed
    if(this.currentPlayerSpeed <= -500){this.currentPlayerSpeed = -500;}
    //update current player speed each frame
    this.player.setVelocityX(this.currentPlayerSpeed);
    //otherwise, if right key is down, increase current player speed each frame

    //player animation for moving left
    this.player.play('player_moveleft_anim', true);

  } else if(this.cursorKeys.right.isDown){
    this.currentPlayerSpeed += gameSettings.playerMaxSpeed/10;
      console.log(this.currentPlayerSpeed);
      //if currentPlayerSpeed is greaterthan or equal to 500, reset speed back to 500.
      if(this.currentPlayerSpeed >= 500){this.currentPlayerSpeed = 500;}
    this.player.setVelocityX(this.currentPlayerSpeed);

    //player animation for moving right
    this.player.play('player_moveright_anim', true);

  } else if(this.currentPlayerSpeed < -30 && this.currentPlayerSpeed >= -600){
    this.currentPlayerSpeed += gameSettings.playerMaxSpeed/10;
    this.player.setVelocityX(this.currentPlayerSpeed);
    console.log(this.currentPlayerSpeed);

    this.player.play('player_slowleft_anim', true);
    }
    else if(this.currentPlayerSpeed > 30 && this.currentPlayerSpeed <= 600){
    this.currentPlayerSpeed += -gameSettings.playerMaxSpeed/10;
    this.player.setVelocityX(this.currentPlayerSpeed);
    console.log(this.currentPlayerSpeed);

    this.player.play('player_slowright_anim', true);
  }
  else(this.currentPlayerspeed = 0, this.player.setVelocityX(0))


}


textureswap(){
  if(this.ground.frame == 20) {
    this.ground.setTexture('ground', 22)
  } else {
    this.ground.setTexture('ground', 20)
  }
}

}
