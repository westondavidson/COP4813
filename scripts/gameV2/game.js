
var gameSettings = {
  playerSpeed: 500,
  //UPDATED: player speed set to specific speed value to ensure consistency across game framerates
  playerMaxSpeed: Phaser.Math.GetSpeed(414,0.0014),
}



//config variable sets game parameter
var config = {
  //game canvas width
  width: 414,
  //game canvas height
  height: 736,
  //canvas background color
  backgroundColor: "#91a7f7",
  parent: 'game',
  //the scene variable stores as many scenes as you have in your game in an array
  scene: [Scene1, Scene2, Scene3],
  pixelArt: false,
  physics:{
    default: "arcade",
    arcade:{
      debug: false
    }
  }

}

//the game variable creation instantiates a new phaser game and is passed the config file.
var game = new Phaser.Game(config);
