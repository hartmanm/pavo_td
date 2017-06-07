
window.onload = function(){

var Bomber = {
  cost: 55
};

var Turret = {
  cost: 20
};

var Ice = {
  cost: 50
};

//wall = function (x,y)

Creep = function (index, game, player, projectile, type)
{

  //var currentTileX = 528;
  //var currentTileY = 0;
  //var nextTileX = 16.5;
  //var nextTileY = 1;
  //var rightTileX = 15.5;
  //var rightTileY = 0;
  //var leftTileX = 17.5;
  //var leftTileY = 0;

  //var move_speed = 2000;
  //this.currentTile = {x: 16.5, y: 0};
//  var nextTile = {x: 16.5, y: 1};
  //var rightTile = {x: 15.5, y: 0};
//  var leftTile = {x: 17.5, y: 0};
  //var tempTile = [{x: 15, y: 1}, {x: 15, y: 1}];
  //var nextTile = path[currentTile + 1] * 32;
  //var lifeFlag = 1;
  var x = 16.5 * 32;
  var y = -64;
  var last = 0;
//  this.direction = 2;


  this.game = game;
  this.player = player;
  this.projectile = projectile;

  /***********************
  BB UPDATE
  Updated alive from true to false
  So creeps dont all start moving
  automatically each wave
  ***********************/
  this.alive = false;
  this.slowed = 0;

  if(type === 'sheep')
  {
    this.type = 0;
    this.lifeCost = 1;
    this.health = 10 * diff;
    this.maxHealth = 10 * diff;
    this.kill_reward = 5 + (diff/2);
  //   if(this.index != 0)
	//   {
    this.creep = game.add.sprite(x, y, 'sheep');
  //   }
  }
  if(type === 'bruiser')
  {
    this.type = 1;
    this.lifeCost = 3;
    this.health = 20 * diff;
    this.maxHealth = 20 * diff;
    this.kill_reward = 15 + (diff/2);
    this.creep = game.add.sprite(x, y, 'bruiser');
  }
  if(type === 'scout')
  {
    this.type = 2;
    this.lifeCost = 1;
    this.health = 6 * diff;
    this.maxHealth = 6 * diff;
    this.kill_reward = 10 + (diff/2);
    this.creep = game.add.sprite(x, y, 'scout');
  }
  //this.creep = game.add.sprite(, , 'sheep');
  this.creep.anchor.set(0.5);
  this.creep.name = index.toString();
  game.physics.enable(this.creep, Phaser.Physics.ARCADE);
  this.creep.body.immovable = false;
  //this.creep.body.collideWorldBounds = true;
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

//Creep.prototype.checkslow = function(iceTowers)
//{
  /*for (var i = 0; i < iceCount; i++)
  {
  if(ice[i].x < this.creep.x + 128 || ice[i].y < this.creep.y + 128 )
  {
    this.slowed = 1;
  }
  else {
    this.slowed = 0;
  }
  }*/
  //this.slowed = 0;
//  for (var i = 0; i < iceTowers.length; i++)
//{
//    if (iceTowers[i].freezeAnimation.visible)
  //    {
  //    if(this.game.physics.arcade.distanceBetween(iceTowers[i], this.creep) < (iceTowers[i].range / 2) )
  //    {
        //console.log('slowing creep');
//if(ice[iceCount].y < this.creep.y + 64 || ice[iceCount].y > this.creep.y - 64)
//if( this.game.physics.arcade.distanceBetween(iceTowers[i], this.creep) < iceTowers[i].range * 0.5 )
//{
  //ice[iceCount]freezeAnimation.visible &&
//        this.slowed = 1;
//      }
//    }
//else {
	//console.log('creep going faster');
	//this.slowed = 0;
//}
//  }

//}

Creep.prototype.update = function(iceTowers)
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

//}









//if( iceCount > 0 )
//{
//this.checkslow(iceTowers);
//}


















  }

if(this.creep.y >= 1072)
{
this.alive = false;
this.creep.kill();
this.healthBar.kill();
lives = lives - this.lifeCost;
this.lifeCost = 0;
}

this.slowed = 0;

  for (var i = 0; i < iceTowers.length; i++)
{
    if (iceTowers[i].freezeAnimation.visible)
      {
      if(this.game.physics.arcade.distanceBetween(iceTowers[i], this.creep) < (iceTowers[i].range) )
      {
        //console.log('slowing creep');
//if(ice[iceCount].y < this.creep.y + 64 || ice[iceCount].y > this.creep.y - 64)
//if( this.game.physics.arcade.distanceBetween(iceTowers[i], this.creep) < iceTowers[i].range * 0.5 )
//{
  //ice[iceCount]freezeAnimation.visible &&
        this.slowed = 1;
      }
    }
//else {
	//console.log('creep going faster');
	//this.slowed = 0;
//}
  }






  //  this.creep.currentTileY += 1;
//    this.creep.nextTileY += 1;
  //  this.creep.rightTileY += 1;

/***********************
BB UPDATE
Commented out the y increment
Replaced with velocity
Probably a way to refactor this
Like store speed as a creep attribute
and then if slow, set velocity to speed/2
***********************/
if(this.slowed == 0)
{
if(this.type == 0)
{
    //this.creep.y += 1;
    this.creep.body.velocity.y = 32;
    this.healthBar.setPercent(this.health/this.maxHealth*100);
    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
}
if(this.type == 1)
{
    //this.creep.y += 0.5;
    this.creep.body.velocity.y = 16;
    this.healthBar.setPercent(this.health/this.maxHealth*100);
    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
}
if(this.type == 2)
{
    //this.creep.y += 1.5;
    this.creep.body.velocity.y = 48;
    this.healthBar.setPercent(this.health/this.maxHealth*100);
    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
}
}

if(this.slowed == 1)
{
if(this.type == 0)
{
    //this.creep.y += 0.75;
    //this.creep.y += 0.5;
    this.creep.body.velocity.y = 16;
    this.healthBar.setPercent(this.health/this.maxHealth*100);
    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
}
if(this.type == 1)
{
  //  this.creep.y += 0.25;
    //this.creep.y += 0.25;
    this.creep.body.velocity.y = 8;
    this.healthBar.setPercent(this.health/this.maxHealth*100);
    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
}
if(this.type == 2)
{
  //  this.creep.y += 1.25;
    //this.creep.y += 0.75;
    this.creep.body.velocity.y = 32;
    this.healthBar.setPercent(this.health/this.maxHealth*100);
    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
}
}


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




var game = new Phaser.Game(700, 600, Phaser.AUTO, 'lvl1', { preload: preload, create: create, update: update, render: render });

function preload ()
{
  game.load.image('icetower', 'game/one/iceTower_2.png');
  game.load.image('iceshot', 'game/one/iceshot.png')
  game.load.image('sheep', 'game/one/sheep.png');
  game.load.image('bruiser', 'game/one/bruiser2.png');
  game.load.image('scout', 'game/one/scout4.png');
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
  game.load.spritesheet('freeze', 'game/one/fx_4_ver2_strip40.png', 128, 128, 40);
  game.load.spritesheet('freeze_small', 'game/one/fx_4_ver2_strip40_small.png', 64, 64, 40);
  game.load.tilemap('lvlone', 'game/one/levelOne.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('one', 'game/one/levelOne.png');
  game.load.image('buyIce', 'game/one/iceTower_buy.png');
}

var kill = 0;
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
var creepType = ['Sheep', 'Sick Sheep', 'Angry Sheep', 'Bruiser', 'Scout', 'Moar Buff Sheep', 'Roid Sheep', 'Sheepinator', 'Monster Sheep', 'Super Scout', 'Elite Bruiser', 'VICTORY!'];
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
var totalWave = 10;  //temporarily changed to 1 for testing user save data
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
var BomberList = [];
var IceList = [];
var type;
var difficulty = "normal";
var gameOver = false;
var turretBuildOk = true;
var bomberBuildOk = true;
var iceBuildOk = true;
//var ice2 = iceTowers;
//var iceCount = 0;
//var ice = [{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0}]

//var sheep;
//var bruiser;
var waves = ['sheep', 'sheep', 'bruiser', 'scout', 'sheep', 'sheep', 'sheep', 'sheep', 'scout', 'bruiser'];

function create ()
{
  game.time.desiredFps = 30;
  this.theCreeps = [];
  one = game.add.tileSprite(0, 0, 1100, 1100, 'one');

  map = game.add.tilemap('lvlone');
  //pathLayer = tileMap.createLayer('traverse');
  //pathLayer.resizeWorld();

  game.world.setBounds(0, 0, 1100, 1100);
  totalCreeps = 10;
  aliveCreeps = 10;

  explosions = game.add.group();
  bombExplosions = game.add.group();

  cameraSprite = game.add.sprite(0, 0, 'arrow');
  cameraSprite.visible = false;
  //cameraSprite.anchor.setTo(0.5);
  cameraSprite.alpha = 0;
  game.camera.follow(cameraSprite);
  //game.camera.follow(cameraSprite, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
  //game.camera.deadzone = new Phaser.Rectangle(0, 150, 1100, 300);

  //add sprites for purchasing bomb and arrow/turret
  buyBombSprite = game.add.sprite(32, game.height - 96, 'buyBomb');
  buyBombSprite.inputEnabled = true;
  buyBombSprite.alpha = 0.2; //set to 1 if enough credits to buy
  buyBombSprite.events.onInputDown.add(addBomber, this);
  buyBombText = game.add.text(32, game.height - 128, '', {font: '16px Arial', align: 'center'});
  buyBombText.text = 'Bomber: $55';

  buyTurretSprite = game.add.sprite(32, game.height - 224, 'buyTurret');
  buyTurretSprite.inputEnabled = true;
  buyTurretSprite.alpha = 0.2;
  buyTurretSprite.events.onInputDown.add(addTurret, this);
  buyTurretText = game.add.text(32, game.height - 256, '', {font: '16px Arial', align: 'center'});
  buyTurretText.text = 'Turret: $20';

  buyIceSprite = game.add.sprite(32, game.height - 352, 'buyIce');
  buyIceSprite.inputEnabled = true;
  buyIceSprite.alpha = 0.2;
  buyIceSprite.events.onInputDown.add(addIce, this);
  buyIceText = game.add.text(32, game.height - 384, '', {font: '16px Arial', align: 'center'});
  buyIceText.text = 'Icer: $50';

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
  bomberBuildOk = true;
  kill = 0;
     for (var i = 0; i < wallCount; i++)
     {
     if(bomber.x == wall[i].x && bomber.y == wall[i].y)
     {
       kill = 1;
     }
     }

  if (bomber.x < 416 || bomber.x > 608 || kill == 1) {
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
  if (credits >= Bomber.cost && bomberBuildOk) {
    var newBomber = new BomberClass(game, 'bomb_launcher', 'bomb', 0, 0);
    newBomber.events.onDragStop.add(createBomber, this);
    if (newBomber) {
      //newBomber.reset(game.input.activePointer.x, game.input.activePointer.y);
      newBomber.reset(buyBombSprite.x + 80, buyBombSprite.y + 32)
      bomberBuildOk = false;
      newBomber.bringToTop();
      /*if (game.input.activePointer.isDown) {
        newBomber.input.startDrag(game.input.activePointer);
      }*/
    }
  }
}

function createTurret(turret) {
  turretBuildOk = true;
  kill = 0;
     for (var i = 0; i < wallCount; i++)
     {
     if(turret.x == wall[i].x && turret.y == wall[i].y)
     {
       kill = 1;
     }
     }

  if (turret.x < 416 || turret.x > 608 || kill == 1)
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
  if (credits >= Turret.cost && turretBuildOk) {
    var newTurret = new TurretClass(game, 'arrow', 'projectiles', 0, 0)
    newTurret.events.onDragStop.add(createTurret, this);
    if (newTurret) {
      //newTurret.reset(game.input.activePointer.x, game.input.activePointer.y);
      newTurret.reset(buyTurretSprite.x + 80, buyTurretSprite.y + 32);
      turretBuildOk = false;
      newTurret.bringToTop();

      /*if(game.input.activePointer.isDown) {
        newTurret.input.startDrag(game.input.activePointer)
      }

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

function createIce(ice) {
  iceBuildOk = true;

  kill = 0;
     for (var i = 0; i < wallCount; i++)
     {
     if(ice.x == wall[i].x && ice.y == wall[i].y)
     {
       kill = 1;
     }
     }

  if (ice.x < 416 || ice.x > 608 || kill == 1)
  {
    //TODO:  integrate with code to actually check the map for valid placement
    ice.destroy();
  } else if (ice.hasOwnProperty('fireRate')) {
    //TODO:  check that placement won't block creeps
    //TODO:  check that placement won't overlap existing tower
    credits -= ice.cost;
    ice.input.draggable = false;
    IceList.push(ice)
  } else {
    ice.destroy();
  }
//  console.log('New Turret List:')
//  console.log(TurretList)
  wall[wallCount].x = ice.x;
  wall[wallCount].y = ice.y;
  wallCount++;

  //ice[iceCount].x = ice.x;
  //ice[iceCount].y = ice.y;
  //iceCount++;
//console.log(wall[wallCount].x);
//console.log(wall[wallCount].y);
//console.log(wallCount);

}

function addIce() {
  if (credits >= Ice.cost && iceBuildOk) {
    var newIce = new IceClass(game, 'icetower', 'freeze_small', 0, 0);
    newIce.events.onDragStop.add(createIce, this);
    if (newIce) {
      //newIce.reset(game.input.activePointer.x, game.input.activePointer.y);
      newIce.reset(buyIceSprite.x + 80, buyIceSprite.y + 32);
      iceBuildOk = false;
      newIce.bringToTop();

      /*if (game.input.activePointer.isDown) {
        newIce.input.startDrag(game.input.activePointer);
      }*/
    }
  }
}

function makeCreep(i, type)
{
    theCreeps.push(new Creep(i, game, creep, creepProjectile, type));
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
  if (credits >= Ice.cost) {
    buyIceSprite.alpha = 1;
  } else {
    buyIceSprite.alpha = 0.2;
  }

cameraSprite.reset(game.input.activePointer.x, game.input.activePointer.y);
//console.log("x: " + game.input.activePointer.x + ", y: " + game.input.activePointer.y);
/***********************
BB UPDATE
Since creeps.alive is now set to false
in constructor function - have to set to
true when each creep starts moving
set creep[0] to alive on create,
set others to alive in the flag and y
position check
************************/
if( (currentWave == 0) && (start == 1) )
{
  theCreeps = [];


  for (var i = 0; i < totalCreeps; i++)
	{
		makeCreep(i, waves[currentWave]);
	}
  theCreeps[0].alive = true;
	start = 0;
}


//  if( (currentWave != 0) && (aliveCreeps == 0) && (currentWave < totalWave) )
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
			makeCreep(i, waves[currentWave]);
	  }
    theCreeps[0].alive = true;
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




    //console.log(theCreeps[0].creep.y)
  //  theCreeps[0].alive = true;

    if(theCreeps[0].creep.y > 100 && flag1 == 1)
    {
      theCreeps[1].alive = true;
      theCreeps[1].creep.y = 0;
			flag1++;
    }
    if(theCreeps[1].creep.y > 100 && flag2 == 1)
  {
    //  theCreeps[0].alive = false;
    //  theCreeps[0].creep.kill();
  //    theCreeps[0].healthBar.kill();
    	theCreeps[2].alive = true;
      theCreeps[2].creep.y = 0;
			flag2++;
    }
    if(theCreeps[1].creep.y > 150 && flag3 == 1)
    {
    	theCreeps[3].alive = true;
      theCreeps[3].creep.y = 0;
			flag3++;
    }
    if(theCreeps[1].creep.y > 200 && flag4 == 1)
    {
    	theCreeps[4].alive = true;
      theCreeps[4].creep.y = 0;
			flag4++;
    }
    if(theCreeps[1].creep.y > 250 && flag5 == 1)
    {
    	theCreeps[5].alive = true;
      theCreeps[5].creep.y = 0;
			flag5++;
    }
    if(theCreeps[1].creep.y > 300 && flag6 == 1)
    {
    	theCreeps[6].alive = true;
      theCreeps[6].creep.y = 0;
			flag6++;
    }
    if(theCreeps[1].creep.y > 350 && flag7 == 1)
    {
    	theCreeps[7].alive = true;
      theCreeps[7].creep.y = 0;
			flag7++;
    }
    if(theCreeps[1].creep.y > 400 && flag8 == 1)
    {
    	theCreeps[8].alive = true;
      theCreeps[8].creep.y = 0;
			flag8++;
    }
    if(theCreeps[1].creep.y > 450 && flag9 == 1)
    {
    	theCreeps[9].alive = true;
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
  for (var f = 0; f < IceList.length; f++) {
    IceList[f].updateTower(theCreeps);
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
    //  for (var f = 0; f < IceList.length; f++) {
    //    game.physics.arcade.overlap(IceList[f].range, theCreeps[i].creep, iceHitEnemy, null, this);
    //  }
      theCreeps[i].update(IceList);
     }
  }

}


  if( lives == 0 )
  {
  for (var i = 0; i < theCreeps.length; i++)
  {
//if (theCreeps[i].alive)
//{
	//theCreeps[i].alive = false;
//	theCreeps[i].creep.kill();
	theCreeps[i].healthBar.kill();
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

function levelComplete() {
  completedLevel = JSON.stringify({
    "level": 1,
    "difficulty": difficulty,
    "gameVersion": "0.2",
    "livesRemaining": lives,
    "towers": {
      "turrets": TurretList.length,
      "bombers": BomberList.length,
      "icers": IceList.length,
    },
    "creditsRemaining": credits
  });
  console.log(completedLevel);
  //relies on jQuery for ajax post
  $.post("levelCompleted", {"data": completedLevel}, function(data) {
    console.log(data);
  }, "json");
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

//  game.debug.text('More to come', 32, 215);
//  game.debug.text('Note: it is possible to win', 32, 250);

  if( (aliveCreeps == 0) && (currentWave == totalWave) )
  {
    game.debug.text('LEVEL COMPLETE! ', 32, 32);
    if (!gameOver) {
      gameOver = true;
      levelComplete();
    }
  }

  if( (lives == 0) )
  {
    game.debug.text('FAILURE! ', 32, 32);
  }
}

};
