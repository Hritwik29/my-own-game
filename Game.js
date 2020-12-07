class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    phoenix = createSprite(100,200);
    phoenix.addImage("phoenix",c1_img);
    phoenix.scale=0.8
    raze = createSprite(300,200);
    raze.addImage("raze",c2_img);
    raze.scale= 0.2
    reyna = createSprite(500,200);
    reyna.addImage("reyna",c3_img);
    reyna.scale=1.2
    
  
    characters = [phoenix, raze, reyna];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
    // imageMode(CENTER)

      image(bg, 0,-displayHeight*4,displayWidth,displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the characters
      var x = 100 ;
      var y=800;
      drawSprites();

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the characters a little away from each other in x direction
        x = x + 300;
        //use data form the database to display the characters in y direction
        y = displayHeight - allPlayers[plr].distance;
        characters[index-1].x = x;
        characters[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          //stroke(10);
         // fill("red");
          //ellipse(x,y,60,60);
         // characters[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = characters[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
      
    }

    if(player.distance > 4000){
      gameState = 2;
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
}
