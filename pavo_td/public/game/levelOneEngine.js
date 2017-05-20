
window.onload = function(){

var Bomber = {
  cost: 65
};

var Turret = {
  cost: 20
};

//wall = function (x,y)

Creep = function (index, game, player, projectile)
{

  var currentTileX = 528;
  var currentTileY = 0;
  var nextTileX = 16.5;
  var nextTileY = 1;
  var rightTileX = 15.5;
  var rightTileY = 0;
  var leftTileX = 17.5;
  var leftTileY = 0;

  //var move_speed = 2000;
  //this.currentTile = {x: 16.5, y: 0};
//  var nextTile = {x: 16.5, y: 1};
  //var rightTile = {x: 15.5, y: 0};
//  var leftTile = {x: 17.5, y: 0};
  //var tempTile = [{x: 15, y: 1}, {x: 15, y: 1}];
  //var nextTile = path[currentTile + 1] * 32;
  //var lifeFlag = 1;
  var x = 16.5 * 32;
  var y = 0 * 32;
  var last = 0;
//  this.direction = 2;

  this.lifeCost = 1;
  this.game = game;
  this.health = 10 * diff;
  this.player = player;
  this.maxHealth = 10 * diff;
  this.projectile = projectile;
  this.kill_reward = 5 + (diff/2);
  this.alive = true;
  this.creep = game.add.sprite(x, y, 'sheep');
  //this.creep = game.add.sprite(, , 'sheep');
  this.creep.anchor.set(0.5);
  this.creep.name = index.toString();
  game.physics.enable(this.creep, Phaser.Physics.ARCADE);
  this.creep.body.immovable = false;
  this.creep.body.collideWorldBounds = true;
  this.barConfig = {
    width: 18,
    height: 4,
    x: 0,
    y: 0,
    bg: {
      color: '#651828'
    },
    bar: {
      color: '#02ff63'
    },
    animationDuration: 100,
    flipped: false
  };
  this.healthBar = new HealthBar(this.game, this.barConfig);
};

Creep.prototype.damage = function()
{
  this.health -= 1;

  if (this.health <= 0)
  {
    this.alive = false;
    this.creep.kill();
    this.healthBar.kill();
    credits += this.kill_reward;
    return true;
  }

  return false;
}

Creep.prototype.update = function()
{
//this.creep.currentTile = this.creep.nextTile;
//this.creep.tile = path[1];



	 // for (var i = 0; i < totalCreeps; i++)
	// {
//  if(this.creep.currentTileX != 16 && this.creep.currentTileY != 31)
//  {
  //  marker.x = currentLayer.getTileX(game.input.activePointer.worldX) * 32;
  //  marker.y = nextTileY * 32;
		//for (var i = 0; i < totalCreeps; i++)
  //  index = contains.call(towerSpace, this.creep.nextTileY);

//this.creep.currentTileY += 1;
  //if(this.creep.y < 1080) {
//    this.creep.y += 1;
//  }

if(this.creep.y < 1080 && wallCount > 0)// && this.creep.x > 416 && this.creep.x < 576)
    //if((this.creep.currentTileX > 384) && (this.creep.currentTileX < 608) )  //&& this.creep.nextTileY != towerSpace[]
{
for (var i = 0; i < wallCount; i++)
{



  //if(this.creep.x > 432 && this.creep.x < 464)
if(this.creep.x == 432)
  {
//  this.creep.direction = 6;
//  }
  if( wall[i].x == this.creep.x && wall[i].y > this.creep.y)
	{
      if(wall[i].y < this.creep.y + 32)
      {
              this.creep.x += 32;
							this.healthBar.setPercent(this.health/this.maxHealth*100);
							this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
          //  this.creep.direction = 6;
              this.creep.last = 432;
      }
	}
	}

if(this.creep.x == 464 && this.creep.last == 432)
  {
//  this.creep.direction = 6;
//  }
  if( wall[i].x == this.creep.x && wall[i].y > this.creep.y)
	{
      if(wall[i].y < this.creep.y + 32)
      {
              this.creep.x += 32;
							this.healthBar.setPercent(this.health/this.maxHealth*100);
							this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
          //  this.creep.direction = 6;
            this.creep.last = 464;
      }
	}
	}

if(this.creep.x == 496 && this.creep.last == 464)
  {
//  this.creep.direction = 6;
//  }
  if( wall[i].x == this.creep.x && wall[i].y > this.creep.y)
	{
      if(wall[i].y < this.creep.y + 32)
      {
              this.creep.x += 32;
							this.healthBar.setPercent(this.health/this.maxHealth*100);
							this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
          //  this.creep.direction = 6;
            this.creep.last = 496;
      }
	}
	}

if(this.creep.x == 528 && this.creep.last == 496)
//if(this.creep.x == 528 )
  {
//  this.creep.direction = 6;
//  }
  if( wall[i].x == this.creep.x && wall[i].y > this.creep.y)
	{
      if(wall[i].y < this.creep.y + 32)
      {
              this.creep.x += 32;
							this.healthBar.setPercent(this.health/this.maxHealth*100);
							this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
          //  this.creep.direction = 6;
            this.creep.last = 528;
      }
	}
	}

//  if(this.creep.x < 560 && this.creep.x > 528)
if(this.creep.x == 560 && this.creep.last == 528)
  {
  if( wall[i].x == this.creep.x && wall[i].y > this.creep.y)
	{
      if(wall[i].y < this.creep.y + 32)
      {
             this.creep.x += 32;
             this.healthBar.setPercent(this.health/this.maxHealth*100);
            this.healthBar.setPosition(this.creep.x, this.creep.y - 20);

        this.creep.last = 560;
      }

      }
	}

if(this.creep.x == 592 && this.creep.last == 560)
  {
  if( wall[i].x == this.creep.x && wall[i].y > this.creep.y)
	{
      if(wall[i].y < this.creep.y + 32)
      {
             this.creep.x -= 32;
             this.healthBar.setPercent(this.health/this.maxHealth*100);
            this.healthBar.setPosition(this.creep.x, this.creep.y - 20);

        //  this.creep.direction = 4;
      }

      }
	}

else {
  if( wall[i].x == this.creep.x && wall[i].y > this.creep.y)
	{
		//	for (var j = 0; j < wallCount; j++)
		//	{
    //  if(wall[i].y < this.creep.y + 32 )
  //    {
            // this.creep.x += 32;
          //   this.healthBar.setPercent(this.health/this.maxHealth*100);
          //   this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
    //     this.creep.direction = 6;
  //    }
      if (wall[i].y < this.creep.y + 32 )
      {
             this.creep.x -= 32;
             this.healthBar.setPercent(this.health/this.maxHealth*100);
             this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
        // this.creep.direction = 4;
      }


  //    }
  //    else {
  //    	this.creep.direction = 2;
  //    }
//  }
}

}

  //  if((this.creep.x > 384) && (this.creep.x < 608) )
  //  {






/*
    if(this.creep.direction == 1)
    {
    this.creep.y -= 1;
    this.healthBar.setPercent(this.health/this.maxHealth*100);
    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
    }

    if(this.creep.direction == 4)
    {
    //if(wall[i].y < this.creep.y + 32)
    this.creep.x -= 1;
    this.healthBar.setPercent(this.health/this.maxHealth*100);
    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
    }

    if(this.creep.direction == 6)
    {
    this.creep.x += 1;
    this.healthBar.setPercent(this.health/this.maxHealth*100);
    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
    }


*/



  //  this.creep.currentTileY += 1;
//    this.creep.nextTileY += 1;
  //  this.creep.rightTileY += 1;
    }

    this.creep.y += 1;
    this.healthBar.setPercent(this.health/this.maxHealth*100);
    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);

}

if(this.creep.y == 1080)
{
this.alive = false;
this.creep.kill();
this.healthBar.kill();
lives = lives - this.lifeCost;
this.lifeCost = 0;
}
//    this.creep.leftTileY += 1;
  //  }
//     }

    // else {
  //     if()
//  var currentTile = {x: 16.5, y: 0};
//  var nextTile = {x: 16.5, y: 1};
//  var rightTile = {x: 15.5, y: 0};
//  var leftTile = {x: 17.5, y: 0};
//     }
//    this.creep.x = this.creep.currentTileX * 32;
  //  this.creep.y = this.creep.currentTileY * 32;

  //  elseif(theCreeps[i].creep.tempTile.walkable = true )
//    {
  //      theCreeps[i].creep.currentTileX -= 1;
  //      theCreeps[i].creep.nextTileX -= 1;
  //      theCreeps[i].creep.tempTileX -= 1;
  //      theCreeps[i].creep.x = theCreeps[i].creep.currentTileX * 32;
  //      theCreeps[i].creep.y = theCreeps[i].creep.currentTileY * 32;
  //  }
//  }
//}



//this.creep.currentTileY += 1;

//  if(this.creep.currentTile != target && tileMap.nextTile.walkable = true)
//start[0].x * 32, start[0].y * 32

//  if(this.creep.y < 1080 )
//    this.creep.y += 1;
/*
  if(this.creep.y < 1080)
    this.creep.y += 1;

  if(this.creep.y == 1080)
  {
    this.creep.x -= 1;
//    this.health -= 1;
//    var destroyed = this.creep.damage();
  }


  if(this.creep.x < 450)
    this.creep.y -= 2;

  if(this.creep.y < 20)
    this.creep.x = 550;
*/
};




var game = new Phaser.Game(1100, 1100, Phaser.AUTO, 'lvl1', { preload: preload, create: create, update: update, render: render });

function preload ()
{
  game.load.image('sheep', 'game/one/sheep.png');
  game.load.image('bruiser', 'game/one/bruiser.png');
  game.load.image('buyTurret', 'game/one/arrow3large.png')
  game.load.image('buyBomb', 'game/one/bomb_64p.png');
  game.load.image('bomb', 'game/one/bomb_bullet.png');
  game.load.image('bomb_launcher', 'game/one/bomb_launcher.png');
  game.load.image('logo', 'game/one/logo3.png');
  game.load.image('projectiles', 'game/one/fire.png');
  game.load.image('path', 'game/one/path.png');
  game.load.image('nonPath', 'game/one/nonPath.png');
  game.load.image('arrow', 'game/one/arrow3.png');
  game.load.spritesheet('boom', 'game/one/explosion.png', 64, 64, 23);  //64,64,9 for explosion2
  game.load.spritesheet('bomb_explode', 'game/one/explosion_transparent.png', 64, 64, 25);
  game.load.tilemap('lvlone', 'game/one/levelOne.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('one', 'game/one/levelOne.png');
}

var diff = 1;
//var wall = ["13", "20", "45", "52", "77", "84", "109", "116", "141", "148", "173", "180"]
//var path = ["17", "49", "81", "113", "145", "177", "209", "241", "273", "305", "337", "369"]
var wall = [{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0}]
//var wall = [{x: 0, y: 0}];
var wallCount = 0;
//var start = [{x: 16, y: 0}, {x: 16, y: 0}];
var startX = 16;
var startY = 1;
//var targetX = 18;
//var targetY = 31;
var wallLeft = 12;
var wallRight = 19;
var towerSpace = [600];
var tileSize = 32;
var creepType = ['Sheep', 'Sick Sheep', 'Buff Sheep', 'Moar Buff Sheep', 'Is that a Sheep?', 'No more games Sheep', 'Roid Sheep', 'Sheepinator', 'Way too strong Sheep', 'Monster Sheep', 'Doom Sheep', 'VICTORY!'];
var lives = 20;
var flag1 = 1;
var flag2 = 1;
var flag3 = 1;
var flag4 = 1;
var flag5 = 1;
var flag6 = 1;
var flag7 = 1;
var flag8 = 1;
var flag9 = 1;
var start = 1;
var totalWave = 10;
var currentWave = 0;
var credits = 100;
var path;
var nonPath;
var one;
var theCreeps;
var creep;
var creepProjectile;
var totalTowers = 1;
var totalCreeps = 0;
var aliveCreeps = 0;
var explosions;
var logo;
var cursors;
var creepSpacing = 0;
var map;
var pathLayer;
var atTile;
var TurretList = [];
var BomberList = []


function create ()
{
  this.theCreeps = [];
  one = game.add.tileSprite(0, 0, 1100, 1100, 'one');

  map = game.add.tilemap('lvlone');
  //pathLayer = tileMap.createLayer('traverse');
  //pathLayer.resizeWorld();

  totalCreeps = 10;
  aliveCreeps = 10;

  explosions = game.add.group();
  bombExplosions = game.add.group();

  //add sprites for purchasing bomb and arrow/turret
  buyBombSprite = game.add.sprite(32, game.height - 96, 'buyBomb');
  buyBombSprite.inputEnabled = true;
  buyBombSprite.alpha = 0.2; //set to 1 if enough credits to buy
  buyBombSprite.events.onInputDown.add(addBomber, this);
  buyBombText = game.add.text(32, game.height - 128, '', {font: '16px Arial', align: 'center'});
  buyBombText.text = 'Bomb: $65';

  buyTurretSprite = game.add.sprite(32, game.height - 224, 'buyTurret');
  buyTurretSprite.inputEnabled = true;
  buyTurretSprite.alpha = 0.2;
  buyTurretSprite.events.onInputDown.add(addTurret, this);
  buyTurretText = game.add.text(32, game.height - 256, '', {font: '16px Arial', align: 'center'});
  buyTurretText.text = 'Turret: $20';


  for (var i = 0; i < 10; i++)
  {
    var explosionAnimation = explosions.create(0, 0, 'boom', 23, false);
    explosionAnimation.anchor.setTo(0.5, 0.5);
    explosionAnimation.animations.add('boom');
    var bombExplosionAnimation = bombExplosions.create(0,0,'bomb_explode', [0], false);
    bombExplosionAnimation.anchor.setTo(0.5);
    bombExplosionAnimation.animations.add('bomb_explode');
    bombExplosionAnimation.enableBody = true;
    bombExplosionAnimation.physicsBodyType = Phaser.Physics.ARCADE;
  }

  logo = game.add.sprite(155, 155, 'logo');
  logo.fixedToCamera = true;
  game.input.onDown.add(removeLogo, this);
  game.camera.focusOnXY(0, 0);
  cursors = game.input.keyboard.createCursorKeys();
}

function createBomber(bomber) {
//  console.log('Attempting to create bomber');
//  console.log(bomber);
  if (bomber.x < 416 || bomber.x > 608) {
    bomber.destroy();
  } else if (bomber.hasOwnProperty('fireRate')) {
    credits -= Bomber.cost;
    bomber.input.draggable = false;
    BomberList.push(bomber);
  } else {
    bomber.destroy();
  }
  wall[wallCount].x = bomber.x;
  wall[wallCount].y = bomber.y;

//console.log(wall[wallCount].x);
//console.log(wall[wallCount].y);
//console.log(wallCount);
  wallCount++;
}

function addBomber() {
  if (credits >= Bomber.cost) {
    var newBomber = new BomberClass(game, 'bomb_launcher', 'bomb', 0, 0);
    newBomber.events.onDragStop.add(createBomber, this);
    if (newBomber) {
      newBomber.reset(game.input.x, game.input.y);
      newBomber.bringToTop();
      if (game.input.activePointer.isDown) {
        newBomber.input.startDrag(game.input.activePointer);
      }
    }
  }
}

function createTurret(turret) {
//  console.log("Attempting to create turret")
//  console.log(turret)
  if (turret.x < 416 || turret.x > 608)
  {
    //TODO:  integrate with code to actually check the map for valid placement
    turret.destroy();
  } else if (turret.hasOwnProperty('fireRate')) {
    //TODO:  check that placement won't block creeps
    //TODO:  check that placement won't overlap existing tower
    credits -= turret.cost;
    turret.input.draggable = false;
    TurretList.push(turret)
  } else {
    turret.destroy();
  }
//  console.log('New Turret List:')
//  console.log(TurretList)
  wall[wallCount].x = turret.x;
  wall[wallCount].y = turret.y;

//console.log(wall[wallCount].x);
//console.log(wall[wallCount].y);
//console.log(wallCount);
  wallCount++;
}

function addTurret() {
  if (credits >= Turret.cost) {
    var newTurret = new TurretClass(game, 'arrow', 'projectiles', 0, 0)
    newTurret.events.onDragStop.add(createTurret, this);
    if (newTurret) {
      newTurret.reset(game.input.x, game.input.y);
      newTurret.bringToTop();

      if(game.input.activePointer.isDown) {
        newTurret.input.startDrag(game.input.activePointer)
      }
      /*
      newTurret.events.onInputOver.add(function(sprite, pointer){
        if(pointer.isDown){
             sprite.input.startDrag(pointer);
        } else if (this.hasOwnProperty('fireRate')) {
          createTurret(this);
        }
      }, this)*/
    }
  }
}

function makeCreep(i)
{
    theCreeps.push(new Creep(i, game, creep, creepProjectile));
}

function removeLogo ()
{
  game.input.onDown.remove(removeLogo, this);
  logo.kill();
}


//for potential attacking creeps later on
function projectilesHitPlayer (creep, projectiles)
{
  projectiles.kill();
}

//function pickTile( pointer)
//{
//  atTile = game.math.snapToFloor(pointer.x, 32) / 32;
//}

//function updateMarker()
//{
//  marker.x = currentLayer.getTileX(game.input.activePointer.worldX) * 32;
//  marker.y = currentLayer.getTileY(game.input.activePointer.worldY) * 32;

//  if (game.input.mousePointer.isDown)
//  {
  //    map.putTile(currentTile, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), currentLayer);
      // map.fill(currentTile, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), 4, 4, currentLayer);
//  }
//}

function update ()
{
  if( lives != 0 )
  {



  //if not enough credits to buy a tower, then fade it out
  if (credits >= Bomber.cost) {
    buyBombSprite.alpha = 1;
  } else {
    buyBombSprite.alpha = 0.2;
  }
  if (credits >= Turret.cost) {
    buyTurretSprite.alpha = 1;
  } else {
    buyTurretSprite.alpha = 0.2;
  }

if( (currentWave == 0) && (start == 1) )
{
  theCreeps = [];


  for (var i = 0; i < totalCreeps; i++)
	{
		makeCreep(i);
	}

	start = 0;
}


  if( (aliveCreeps == 0) && (currentWave < totalWave) )
  {
    diff = currentWave;
    theCreeps = [];
    flag1 = 1;
    flag2 = 1;
    flag3 = 1;
    flag4 = 1;
    flag5 = 1;
    flag6 = 1;
    flag7 = 1;
    flag8 = 1;
    flag9 = 1;

	  for (var i = 0; i < totalCreeps; i++)
	  {
			makeCreep(i);
	  }
		currentWave++;
  }

/*
	  for (var i = 0; i < totalCreeps; i++)
	  {
		  if (game.time.now > creepSpacing)
		  {
		    creepSpacing = game.time.now + theCreeps[i].creep.move_speed;
				theCreeps[i].creep.y = 0
		  }
		}
*/






    if(theCreeps[0].creep.y > 100 && flag1 == 1)
    {
    	theCreeps[1].creep.y = 0;
			flag1++;
    }
    if(theCreeps[1].creep.y > 100 && flag2 == 1)
    {
    	theCreeps[2].creep.y = 0;
			flag2++;
    }
    if(theCreeps[1].creep.y > 150 && flag3 == 1)
    {
    	theCreeps[3].creep.y = 0;
			flag3++;
    }
    if(theCreeps[1].creep.y > 200 && flag4 == 1)
    {
    	theCreeps[4].creep.y = 0;
			flag4++;
    }
    if(theCreeps[1].creep.y > 250 && flag5 == 1)
    {
    	theCreeps[5].creep.y = 0;
			flag5++;
    }
    if(theCreeps[1].creep.y > 300 && flag6 == 1)
    {
    	theCreeps[6].creep.y = 0;
			flag6++;
    }
    if(theCreeps[1].creep.y > 350 && flag7 == 1)
    {
    	theCreeps[7].creep.y = 0;
			flag7++;
    }
    if(theCreeps[1].creep.y > 400 && flag8 == 1)
    {
    	theCreeps[8].creep.y = 0;
			flag8++;
    }
    if(theCreeps[1].creep.y > 450 && flag9 == 1)
    {
    	theCreeps[9].creep.y = 0;
			flag9++;
    }


/*
    if(theCreeps[1].creep.currentTile == path[3] && flag1 == 1)
    {
    	theCreeps[1].creep.currentTile = path[1];
    	flag1++;
    }
    if(theCreeps[1].creep.currentTile == path[3])
    {
    	theCreeps[2].creep.currentTile = path[1];
    }
    if(theCreeps[2].creep.currentTile == path[3])
    {
    	theCreeps[3].creep.currentTile = path[1];
    }
    if(theCreeps[3].creep.currentTile == path[3])
    {
    	theCreeps[4].creep.currentTile = path[1];
    }
    if(theCreeps[4].creep.currentTile == path[3])
    {
    	theCreeps[5].creep.currentTile = path[1];
    }
    if(theCreeps[5].creep.currentTile == path[3])
    {
    	theCreeps[6].creep.currentTile = path[1];
    }
    if(theCreeps[6].creep.currentTile == path[3])
    {
    	theCreeps[7].creep.currentTile = path[1];
    }
    if(theCreeps[7].creep.currentTile == path[3])
    {
    	theCreeps[8].creep.currentTile = path[1];
    }
    if(theCreeps[8].creep.currentTile == path[3])
    {
    	theCreeps[9].creep.currentTile = path[1];
    }
*/

  aliveCreeps = 0;
  for (var t = 0; t < TurretList.length; t++) {
    TurretList[t].updateTower(theCreeps);
  }
  for (var b = 0; b < BomberList.length; b++) {
    BomberList[b].updateTower(theCreeps);
  }

  for (var i = 0; i < theCreeps.length; i++)
  {
    if (theCreeps[i].alive)
    {
      aliveCreeps++;
      //refactor to iterate through turrets
      for (var t = 0; t < TurretList.length; t++) {
        game.physics.arcade.overlap(TurretList[t].turretWeapon.bullets, theCreeps[i].creep, turretsHitEnemy, null, this);
      }
      for (var b = 0; b < BomberList.length; b++) {
        game.physics.arcade.overlap(BomberList[b].bomberWeapon.bullets, theCreeps[i].creep, bombsHitEnemy, null, this);
      }
      theCreeps[i].update();
     }
  }

}
}

function explosionDamage(explosion)
{
  var started = Date.now();
  var interval = setInterval(function() {
    if (Date.now() - started > 1000) {
      clearInterval(interval);
    } else {
      for (var i = 0; i < theCreeps.length; i++) {
        if (theCreeps[i].alive) {
          if (game.physics.arcade.distanceBetween(explosion, theCreeps[i].creep) < 64) {
            var destroyed = theCreeps[i].damage();

            if (destroyed)
            {
              var explosionAnimation = explosions.getFirstExists(false);
              explosionAnimation.reset(theCreeps[i].creep.x, theCreeps[i].creep.y);
              explosionAnimation.play('boom', 100, false, true);
            }
          }
        }
      }
    }
  }, 250);
}

function turretsHitEnemy (creep, bullets)
{
  //console.log("turret hit!")
  bullets.kill();

  var destroyed = theCreeps[creep.name].damage();

  if (destroyed)
  {
    var explosionAnimation = explosions.getFirstExists(false);
    explosionAnimation.reset(creep.x, creep.y);
    explosionAnimation.play('boom', 100, false, true);
  }
}

function bombsHitEnemy (creep, bombs) {
  //console.log("bomb hit!")
  bombs.kill();
  var bombAnimation = bombExplosions.getFirstExists(false);
  bombAnimation.reset(creep.x, creep.y);
  bombAnimation.play('bomb_explode', 25, false, true);
  explosionDamage(bombAnimation);
}

function render ()
{
  if( aliveCreeps > 0 && lives > 0)
  {
    game.debug.text(creepType[currentWave] + ': ' + aliveCreeps + ' / ' + totalCreeps, 32, 25, 'magenta');
    game.debug.text('Next Wave: ' + creepType[currentWave + 1], 32, 50, 'magenta');
    game.debug.text('Current Wave: ' + currentWave + ' / ' + totalWave, 32, 75, 'magenta');
    game.debug.text('Credits: ' + credits, 32, 100, 'magenta');
    game.debug.text('Lives: ' + lives, 32, 125, 'magenta');

  }

  game.debug.text('still learning phaser: more to come', 32, 215);
  game.debug.text('Note: it is possible to win', 32, 250);

  if( (aliveCreeps == 0) && (currentWave == totalWave) )
  {
    game.debug.text('LEVEL COMPLETE! ', 32, 32);
  }

  if( (lives == 0) )
  {
    game.debug.text('FAILURE! ', 32, 32);
  }
}

};
