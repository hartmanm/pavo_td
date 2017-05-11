


window.onload = function(){

var Bomb = {
  cost: 100
};

var Turret = {
  cost: 20,
  range: 128,
  fireRate: 500
};

Creep = function (index, game, player, projectile)
{
  var x = 550;
  var y = 0;
  var move_speed = 2000;
  //var currentTile = path[0] * 32;
  //var nextTile = path[currentTile + 1] * 32;
  //var lifeFlag = 1;
  this.game = game;
  this.health = 2;
  this.player = player;
  this.projectile = projectile;
  this.kill_reward = 5;
  this.alive = true;
  this.creep = game.add.sprite(x, y, 'sheep');
  this.creep.anchor.set(0.5);
  this.creep.name = index.toString();
  game.physics.enable(this.creep, Phaser.Physics.ARCADE);
  this.creep.body.immovable = false;
  this.creep.body.collideWorldBounds = true;
};

Creep.prototype.damage = function()
{
  this.health -= 1;

  if (this.health <= 0)
  {
    this.alive = false;
    this.creep.kill();
    credits += this.kill_reward;
    return true;
  }

  return false;
}

Creep.prototype.update = function()
{
//this.creep.currentTile = this.creep.nextTile;
//this.creep.tile = path[1];

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
};

var wall = ["13", "20", "45", "52", "77", "84", "109", "116", "141", "148", "173", "180"]
var path = ["17", "49", "81", "113", "145", "177", "209", "241", "273", "305", "337", "369"]
var creepType = ['Sheep', 'TEST', 'Sheep', 'Sheep', 'Sheep', 'Sheep', 'Sheep', 'Sheep', 'Sheep', 'Sheep', 'Sheep'];
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
var creep;
var turret;
var theCreeps = [];
var creepProjectile;
var totalCreeps = 0;
var aliveCreeps = 0;
var explosions;
var logo;
var cursors;
var projectile;
var fireRate = 400;
var nextFire = 0;
var creepSpacing = 0;
var tileMap;
var pathLayer;
var atTile;
var turretWeapons = [];
var newTurretClass;
var game = new Phaser.Game(1100, 1100, Phaser.AUTO, 'lvl1', { preload: preload, create: create, update: update, render: render });

function preload ()
{
  game.load.image('sheep', 'game/one/sheep.png');
  game.load.image('buyTurret', 'game/one/arrow.png')
  game.load.image('buyBomb', 'game/one/bomb_64p.png');
  game.load.image('bomb', 'game/one/bomb_32p.png');
  game.load.image('logo', 'game/one/logo3.png');
  game.load.image('projectiles', 'game/one/fire.png');
  game.load.image('path', 'game/one/path.png');
  game.load.image('nonPath', 'game/one/nonPath.png');
  game.load.image('arrow', 'game/one/arrow3.png');
  game.load.spritesheet('boom', 'game/one/explosion.png', 64, 64, 23);  //64,64,9 for explosion2
  game.load.tilemap('lvlone', 'game/one/levelOne.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('one', 'game/one/levelOne.png');
}


function create ()
{
  this.theCreeps = [];
  one = game.add.tileSprite(0, 0, 1100, 1100, 'one');

  tileMap = game.add.tilemap('lvlone');
//  pathLayer = map.createLayer('traverse');
  //layer.resizeWorld();

  creep = game.add.sprite(500, 500, 'arrow');
  creep.anchor.setTo(0.5, 0.5);

  game.physics.enable(creep, Phaser.Physics.ARCADE);
  creep.body.drag.set(0.2);
  creep.body.maxVelocity.setTo(400, 400);
  creep.body.collideWorldBounds = true;

  turret = game.add.sprite(500, 500, 'arrow');
  turret.anchor.setTo(0.5, 0.5);

  totalCreeps = 10;
  aliveCreeps = 10;

  projectile = game.add.group();
  projectile.enableBody = true;
  projectile.physicsBodyType = Phaser.Physics.ARCADE;
  projectile.createMultiple(30, 'projectiles', 0, false);
  projectile.setAll('anchor.x', 0.5);
  projectile.setAll('anchor.y', 0.5);
  projectile.setAll('outOfBoundsKill', true);
  projectile.setAll('checkWorldBounds', true);

  explosions = game.add.group();
  
  //add sprites for purchasing bomb and arrow/turret
  buyBombSprite = game.add.sprite(32, game.height - 96, 'buyBomb');
  console.log(game.width)
  buyBombSprite.inputEnabled = true;
  buyBombSprite.alpha = 0.2; //set to 1 if enough credits to buy
  buyBombSprite.events.onInputDown.add(addBomb, this);
  buyBombText = game.add.text(32, game.height - 128, '', {font: '16px Arial', align: 'center'});
  buyBombText.text = 'Bomb: $100';

  buyTurretSprite = game.add.sprite(32, game.height - 224, 'buyTurret');
  buyTurretSprite.inputEnabled = true;
  buyTurretSprite.alpha = 0.2;
  buyTurretSprite.events.onInputDown.add(addTurret, this);
  buyTurretText = game.add.text(32, game.height - 256, '', {font: '16px Arial', align: 'center'});
  buyTurretText.text = 'Turret: $20';
  //instantiate an array of weapons to be attached to turrets
  for (var i = 0; i < 10; i++) {
    turretWeapon = game.add.weapon(20, 'projectiles')
    turretWeapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
    turretWeapon.bulletKillDistance = Turret.range;
    turretWeapon.bulletSpeed = 400;
    turretWeapon.fireRate = Turret.fireRate;  //roughly onece every 120ms
    turretWeapon.trackSprite(newTurret, 32, 16, true);
    turretWeapons.push(turretWeapon)
  }

  //store a recyclable list of entities for turrets and bombs 
  //since they all have the same attributes and AI behaviors
  turrets = game.add.group();
  turrets.enableBody = true;
  turrets.physicsBodyType = Phaser.Physics.ARCADE;
  for (var i = 0; i < 10; i++) {
    var newTurret = turrets.create(0,0,'arrow',0,false);
    newTurret.name = 'turret' + i;
    newTurret.inputEnabled = true;
    newTurret.input.enableDrag();
    newTurret.input.enableSnap(32,32,true,true, 16, 16);
    newTurret.anchor.set(0.5);
    newTurret.events.onDragStop.add(createTurret, this);
    turretWeapons[i].trackSprite(newTurret, 0, 0, true);
  }

  bombs = game.add.group();
  bombs.enableBody = true;
  bombs.physicsBodyType = Phaser.Physics.ARCADE;
  for (var i = 0; i < 10; i++) {
    var newBomb = bombs.create(0,0,'bomb',0,false);
    newBomb.name = 'bomb' + i;
    newBomb.inputEnabled = true;
    newBomb.input.enableDrag();
    newBomb.input.enableSnap(32,32,true,true, 16, 16);
    newBomb.anchor.set(0.5);
    newBomb.events.onDragStop.add(createBomb, this);
    //TODO:  add actual weapon and effect

    newTurretClass = new TurretClass(game, 'arrow', 500, 400)
    newTurretClass.events.onDragStop.add(createTurret, this);
  }

  //placeholder for test firing turrets and bombs
  //TODO:  replace with actual creep detection to trigger
  fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

  for (var i = 0; i < 10; i++)
  {
    var explosionAnimation = explosions.create(0, 0, 'boom', [0], false);
    explosionAnimation.anchor.setTo(0.5, 0.5);
    explosionAnimation.animations.add('boom');
  }

  creep.bringToTop();
  turret.bringToTop();

  logo = game.add.sprite(155, 155, 'logo');
  logo.fixedToCamera = true;
  game.input.onDown.add(removeLogo, this);
  game.camera.focusOnXY(0, 0);
  cursors = game.input.keyboard.createCursorKeys();
}

function createBomb(bomb) {
  if (bomb.x < 400 || bomb.x > 579)
 {
    bomb.kill();
  } else {
    //TODO:  check that placement won't block creeps
    //TODO:  check that placement won't overlap existing tower
    credits -= Bomb.cost;
    bomb.input.draggable = false;
  }
}

function addBomb() {
  if (credits >= Bomb.cost) {
    var newBomb = bombs.getFirstExists(false);
    if (newBomb) {     
      newBomb.reset(game.input.x, game.input.y);
      newBomb.bringToTop();
      newBomb.events.onInputOver.add(function(sprite, pointer){
        if(pointer.isDown){
             sprite.input.startDrag(pointer);
        } else {
          createBomb(sprite);
        }
      }, this)
    }
  }
}

function createTurret(turret) {
  if (turret.x < 400 || turret.x > 579)
  {
    turret.kill();
  }
else
  {
    //TODO:  check that placement won't block creeps
    //TODO:  check that placement won't overlap existing tower
    credits -= Turret.cost;
    turret.input.draggable = false;
  }
}

function addTurret() {
  if (credits >= Turret.cost) {
    var newTurret = turrets.getFirstExists(false);
    if (newTurret) {     
      newTurret.reset(game.input.x, game.input.y);
      newTurret.bringToTop();
      newTurret.events.onInputOver.add(function(sprite, pointer){
        if(pointer.isDown){
             sprite.input.startDrag(pointer);
        } else {
          createTurret(this);
        }
      }, this)
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

function projectilesHitPlayer (creep, projectiles)
{
  projectiles.kill();
}

function pickTile( pointer)
{
  atTile = game.math.snapToFloor(pointer.x, 32) / 32;
}

function updateMarker()
{
  marker.x = currentLayer.getTileX(game.input.activePointer.worldX) * 32;
  marker.y = currentLayer.getTileY(game.input.activePointer.worldY) * 32;

  if (game.input.mousePointer.isDown)
  {
      map.putTile(currentTile, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), currentLayer);
      // map.fill(currentTile, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), 4, 4, currentLayer);
  }
}

function update ()
{
  //if not enough credits to buy a tower, then fade it out
  if (credits >= Bomb.cost) {
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


  game.physics.arcade.overlap(creepProjectile, creep, projectilesHitPlayer, null, this);

  aliveCreeps = 0;

  for (var i = 0; i < theCreeps.length; i++)
  {
    if (theCreeps[i].alive)
    {
      aliveCreeps++;
      game.physics.arcade.collide(creep, theCreeps[i].creep);
      game.physics.arcade.overlap(projectile, theCreeps[i].creep, projectilesHitEnemy, null, this);
      //refactor to iterate through turrets
      for(var f = 0; f < turretWeapons.length; f++) {
        game.physics.arcade.overlap(turretWeapons[f].bullets, theCreeps[i].creep, projectilesHitEnemy, null, this);
      }
      game.physics.arcade.overlap(newTurretClass.turretWeapon.bullets, theCreeps[i].creep, projectilesHitEnemy, null, this);
      theCreeps[i].update();
     }
  }
  turret.x = creep.x;
  turret.y = creep.y;
  turret.rotation = game.physics.arcade.angleToPointer(turret);
  turrets.forEach(rotateTurret, this, true)

  if (fireButton.isDown) {
    fire();
    for (var f = 0; f < turretWeapons.length; f++) {
      currentTurret = turretWeapons[f].trackedSprite;
      if (currentTurret.visible) {
        turretWeapons[f].fire();
      }
    }
  }
  console.log("ready to update turrets")
  console.log(theCreeps)
  newTurretClass.updateTurret(theCreeps);
}

function rotateTurret(turret) {
  turret.rotation = game.physics.arcade.angleToPointer(turret);
}

function projectilesHitEnemy (creep, projectiles)
{
  projectiles.kill();

  var destroyed = theCreeps[creep.name].damage();

  if (destroyed)
  {
    var explosionAnimation = explosions.getFirstExists(false);
    explosionAnimation.reset(creep.x, creep.y);
    explosionAnimation.play('boom', 100, false, true);
  }
}

function fire ()
{
  if (game.time.now > nextFire && projectile.countDead() > 0)
  {
    nextFire = game.time.now + fireRate;
    var projectiles = projectile.getFirstExists(false);
    projectiles.reset(turret.x, turret.y);
    projectiles.rotation = game.physics.arcade.moveToPointer(projectiles, 1000, game.input.activePointer, 500);
  }
}

function render ()
{
  if( aliveCreeps > 0)
  {
    game.debug.text(creepType[currentWave] + ': ' + aliveCreeps + ' / ' + totalCreeps, 32, 25, 'magenta');
    game.debug.text('Credits: ' + credits, 200, 25, 'magenta');
    game.debug.text('Current Wave: ' + currentWave + ' / ' + totalWave, 343, 25, 'magenta');
    game.debug.text('Lives: ' + lives, 568, 25, 'magenta');
    game.debug.text('Next Wave: ' + creepType[currentWave + 1], 700, 25, 'magenta');
  }

  game.debug.text('still learning / testing phaser: more to come', 160, 470);

  if( (aliveCreeps == 0) && (currentWave == totalWave) )
  {
    game.debug.text('LEVEL COMPLETE! ', 32, 32);
  }
}

};
