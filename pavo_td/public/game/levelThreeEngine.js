
window.onload = function(){

Creep = function (index, game, player, projectile)
{
  var x = 550;
  var y = 0;
  this.game = game;
  this.health = 2;
  this.player = player;
  this.projectile = projectile;
  this.alive = true;
  this.creep = game.add.sprite(x, y, 'sheep', 'sheep');
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
    return true;
  }

  return false;
}

Creep.prototype.update = function()
{
  if(this.creep.y < 550)
    this.creep.y += 1;

  if(this.creep.y == 550)
    this.creep.x -= 1;

  if(this.creep.x < 450)
    this.creep.y -= 2;

  if(this.creep.y < 50)
    this.creep.x = 550;
};

var game = new Phaser.Game(1200, 1200, Phaser.AUTO, 'lvl1', { preload: preload, create: create, update: update, render: render });

function preload ()
{
  game.load.image('sheep', 'game/three/sheep.png');
  game.load.image('logo', 'game/three/logo3.png');
  game.load.image('projectiles', 'game/three/fire.png');
  game.load.image('path', 'game/three/path.png');
  game.load.image('nonPath', 'game/three/nonPath.png');
  game.load.image('arrow', 'game/three/arrow2.png');
  game.load.spritesheet('boom', 'game/three/explosion.png', 64, 64, 23);  //64,64,9 for explosion2
  // game.load.tilemap('lvlone', 'game/one/levelOne.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('one', 'game/three/levelThree.png');
}

var path;
var nonPath;
var one;
var creep;
var turret;
var theCreeps;
var creepProjectile;
var totalCreeps = 0;
var aliveCreeps = 0;
var explosions;
var logo;
var cursors;
var projectile;
var fireRate = 150;
var nextFire = 0;

function create ()
{
  one = game.add.tileSprite(0, 0, 1200, 1200, 'one');

  creep = game.add.sprite(500, 500, 'arrow', 'arrow');
  creep.anchor.setTo(0.5, 0.5);

  game.physics.enable(creep, Phaser.Physics.ARCADE);
  creep.body.drag.set(0.2);
  creep.body.maxVelocity.setTo(400, 400);
  creep.body.collideWorldBounds = true;

  turret = game.add.sprite(500, 500, 'arrow', 'turret');
  turret.anchor.setTo(0.5, 0.5);

  theCreeps = [];
  totalCreeps = 25;
  aliveCreeps = 25;

  for (var i = 0; i < totalCreeps; i++)
  {
    theCreeps.push(new Creep(i, game, creep, creepProjectile));
  }

  projectile = game.add.group();
  projectile.enableBody = true;
  projectile.physicsBodyType = Phaser.Physics.ARCADE;
  projectile.createMultiple(30, 'projectiles', 0, false);
  projectile.setAll('anchor.x', 0.5);
  projectile.setAll('anchor.y', 0.5);
  projectile.setAll('outOfBoundsKill', true);
  projectile.setAll('checkWorldBounds', true);

  explosions = game.add.group();

  for (var i = 0; i < 10; i++)
  {
    var explosionAnimation = explosions.create(0, 0, 'boom', [0], false);
    explosionAnimation.anchor.setTo(0.5, 0.5);
    explosionAnimation.animations.add('boom');
  }

  creep.bringToTop();
  turret.bringToTop();

  logo = game.add.sprite(74, 100, 'logo');
  logo.fixedToCamera = true;
  game.input.onDown.add(removeLogo, this);
  game.camera.focusOnXY(0, 0);
  cursors = game.input.keyboard.createCursorKeys();
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

function pickTile(sprite, pointer)
{
  currentTile = game.math.snapToFloor(pointer.x, 32) / 32;
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
  game.physics.arcade.overlap(creepProjectile, creep, projectilesHitPlayer, null, this);

  aliveCreeps = 0;

  for (var i = 0; i < theCreeps.length; i++)
  {
    if (theCreeps[i].alive)
    {
      aliveCreeps++;
      game.physics.arcade.collide(creep, theCreeps[i].creep);
      game.physics.arcade.overlap(projectile, theCreeps[i].creep, projectilesHitEnemy, null, this);
      theCreeps[i].update();
    }
  }

  turret.x = creep.x;
  turret.y = creep.y;
  turret.rotation = game.physics.arcade.angleToPointer(turret);

  if (game.input.activePointer.isDown)
  {
    fire();
  }
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
    game.debug.text('Creeps: ' + aliveCreeps + ' / ' + totalCreeps, 32, 32);
  }

  //game.debug.text('still learning / testing phaser: more to come', 150, 450);

  if( aliveCreeps == 0)
  {
    game.debug.text('LEVEL COMPLETE! ', 32, 32);
  }
}

};
