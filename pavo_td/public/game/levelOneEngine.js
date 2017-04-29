   

    window.onload = function() {
    
    
    

    
    

EnemyTank = function (index, game, player, bullets) {

    var x = game.world.randomX;
    var y = game.world.randomY;

    this.game = game;
    this.health = 3;
    this.player = player;
    this.bullets = bullets;
    this.fireRate = 1000;
    this.nextFire = 0;
    this.alive = true;

    this.shadow = game.add.sprite(x, y, 'enemy', 'sheep1');
    this.tank = game.add.sprite(x, y, 'enemy', 'sheep1');
    this.turret = game.add.sprite(x, y, 'enemy', 'sheep1');

    this.shadow.anchor.set(0.5);
    this.tank.anchor.set(0.5);
    this.turret.anchor.set(0.3, 0.5);

    this.tank.name = index.toString();
    game.physics.enable(this.tank, Phaser.Physics.ARCADE);
    this.tank.body.immovable = false;
    this.tank.body.collideWorldBounds = true;
    this.tank.body.bounce.setTo(1, 1);

    this.tank.angle = game.rnd.angle();

    game.physics.arcade.velocityFromRotation(this.tank.rotation, 100, this.tank.body.velocity);

};

EnemyTank.prototype.damage = function() {

    this.health -= 1;

    if (this.health <= 0)
    {
        this.alive = false;

        this.shadow.kill();
        this.tank.kill();
        this.turret.kill();

        return true;
    }

    return false;

}

EnemyTank.prototype.update = function() {

//    this.shadow.x = this.tank.x;
//    this.shadow.y = this.tank.y;
 //   this.shadow.rotation = this.tank.rotation;

  //  this.turret.x = this.tank.x;
  //  this.turret.y = this.tank.y;
 //   this.turret.rotation = this.game.physics.arcade.angleBetween(this.tank, this.player);

 //   if (this.game.physics.arcade.distanceBetween(this.tank, this.player) < 300)
  //  {
  //      if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
  //      {
  //          this.nextFire = this.game.time.now + this.fireRate;

  //          var bullet = this.bullets.getFirstDead();
//
   //         bullet.reset(this.turret.x, this.turret.y);

   //         bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 500);
   //     }
  //  }

};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload () {

    game.load.atlas('tank', 'assets/games/tanks/arrow.png', 'assets/games/tanks/tanks.json');
    game.load.atlas('enemy', 'assets/games/tanks/sheep.png', 'assets/games/tanks/tanks.json');
    game.load.image('logo', 'assets/games/tanks/logo2.png');
    game.load.image('bullet', 'assets/games/tanks/fire.png');
    game.load.image('earth', 'assets/games/tanks/path.png');
    game.load.image('earth2', 'assets/games/tanks/nonPath.png');
    game.load.image('arrow', 'assets/games/tanks/arrow.png');
    game.load.spritesheet('boom', 'assets/games/tanks/explosion.png', 64, 64, 23);
    
}

var land;

var shadow;
var tank;
var turret;

var enemies;
var enemyBullets;
var enemiesTotal = 0;
var enemiesAlive = 0;
var explosions;

var logo;

var currentSpeed = 0;
var cursors;

var bullets;
var fireRate = 100;
var nextFire = 0;



var map;
var layer1;
var layer2;
var layer3;

var marker;
var currentTile = 0;
var currentLayer;

var cursors;
var showLayersKey;
var layer1Key;



function create () {


//layer1 = map.create('level1', 40, 30, 32, 32);
  //  layer1.scrollFactorX = 0.5;
  //  layer1.scrollFactorY = 0.5;

    //  Resize the world
   // layer1.resizeWorld();


  //  currentLayer = layer1;













    //  Resize our game world to be a 2000 x 2000 square
   // game.world.setBounds(-1000, -1000, 2000, 2000);

    //  Our tiled scrolling background
    land = game.add.tileSprite(0, 0, 800, 600, 'earth');
  //  land.fixedToCamera = true;









    //currentLayer = land;
    //  Create our tile selector at the top of the screen
   // createTileSelector();

  //  game.input.addMoveCallback(updateMarker, this);

  //  cursors = game.input.keyboard.createCursorKeys();


  //  layer1Key.onDown.add(changeLayer, this);


//    console.log(layer1.index);













    //  The base of our tank
    tank = game.add.sprite(250, 250, 'tank', 'tank1');
    tank.anchor.setTo(0.5, 0.5);
    tank.animations.add('move', ['tank1', 'tank2', 'tank3', 'tank4', 'tank5', 'tank6'], 20, true);

    //  This will force it to decelerate and limit its speed
    game.physics.enable(tank, Phaser.Physics.ARCADE);
    tank.body.drag.set(0.2);
    tank.body.maxVelocity.setTo(400, 400);
    tank.body.collideWorldBounds = true;

    //  Finally the turret that we place on-top of the tank body
    turret = game.add.sprite(250, 250, 'tank', 'turret');
    turret.anchor.setTo(0.3, 0.5);

    //  The enemies bullet group
 //   enemyBullets = game.add.group();
  //  enemyBullets.enableBody = true;
  //  enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
  //  enemyBullets.createMultiple(100, 'bullet');
    
  //  enemyBullets.setAll('anchor.x', 0.5);
  //  enemyBullets.setAll('anchor.y', 0.5);
  //  enemyBullets.setAll('outOfBoundsKill', true);
  //  enemyBullets.setAll('checkWorldBounds', true);
//
    //  Create some baddies to waste :)
    enemies = [];

    enemiesTotal = 10;
    enemiesAlive = 10;

    for (var i = 0; i < enemiesTotal; i++)
    {
        enemies.push(new EnemyTank(i, game, tank, enemyBullets));
    }

    //  A shadow below our tank
    shadow = game.add.sprite(250, 250, 'tank', 'shadow');
    shadow.anchor.setTo(0.5, 0.5);

    //  Our bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet', 0, false);
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    //  Explosion pool
    explosions = game.add.group();

    for (var i = 0; i < 10; i++)
    {
        var explosionAnimation = explosions.create(0, 0, 'boom', [0], false);
        explosionAnimation.anchor.setTo(0.5, 0.5);
        explosionAnimation.animations.add('boom');
    }

    tank.bringToTop();
    turret.bringToTop();

    logo = game.add.sprite(74, 100, 'logo');
    logo.fixedToCamera = true;

    game.input.onDown.add(removeLogo, this);

    game.camera.follow(tank);
    game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
    game.camera.focusOnXY(0, 0);

    cursors = game.input.keyboard.createCursorKeys();

}

function removeLogo () {

    game.input.onDown.remove(removeLogo, this);
    logo.kill();

}



function pickTile(sprite, pointer) {

    currentTile = game.math.snapToFloor(pointer.x, 32) / 32;

}

function updateMarker() {

    marker.x = currentLayer.getTileX(game.input.activePointer.worldX) * 32;
    marker.y = currentLayer.getTileY(game.input.activePointer.worldY) * 32;

    if (game.input.mousePointer.isDown)
    {
        map.putTile(currentTile, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), currentLayer);
        // map.fill(currentTile, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), 4, 4, currentLayer);
    }

}




function update () {

    game.physics.arcade.overlap(enemyBullets, tank, bulletHitPlayer, null, this);

    enemiesAlive = 0;

    for (var i = 0; i < enemies.length; i++)
    {
        if (enemies[i].alive)
        {
            enemiesAlive++;
            game.physics.arcade.collide(tank, enemies[i].tank);
            game.physics.arcade.overlap(bullets, enemies[i].tank, bulletHitEnemy, null, this);
            enemies[i].update();
        }
    }

  //  if (cursors.left.isDown)
  //  {
   //     tank.angle -= 4;
  //  }
  //  else if (cursors.right.isDown)
  //  {
   //     tank.angle += 4;
  //  }

  //  if (cursors.up.isDown)
  //  {
        //  The speed we'll travel at
  //      currentSpeed = 300;
  //  }
  //  else
 //   {
  //      if (currentSpeed > 0)
  //      {
   //         currentSpeed -= 4;
   //     }
  //  }

  //  if (currentSpeed > 0)
//   {
  //      game.physics.arcade.velocityFromRotation(tank.rotation, currentSpeed, tank.body.velocity);
  //  }

  //  land.tilePosition.x = -game.camera.x;
  //  land.tilePosition.y = -game.camera.y;

    //  Position all the parts and align rotations
  //  shadow.x = tank.x;
  //  shadow.y = tank.y;
  //  shadow.rotation = tank.rotation;

  //  turret.x = tank.x;
  //  turret.y = tank.y;

    turret.rotation = game.physics.arcade.angleToPointer(turret);

    if (game.input.activePointer.isDown)
    {

        fire();
    }
    
    
    
    if (cursors.left.isDown)
    {
        game.camera.x -= 4;
    }
    else if (cursors.right.isDown)
    {
        game.camera.x += 4;
    }

    if (cursors.up.isDown)
    {
        game.camera.y -= 4;
    }
    else if (cursors.down.isDown)
    {
        game.camera.y += 4;
    }


    

}

function bulletHitPlayer (tank, bullet) {

    bullet.kill();

}

function bulletHitEnemy (tank, bullet) {

    bullet.kill();

    var destroyed = enemies[tank.name].damage();

    if (destroyed)
    {
        var explosionAnimation = explosions.getFirstExists(false);
        explosionAnimation.reset(tank.x, tank.y);
        explosionAnimation.play('boom', 30, false, true);
    }

}

function fire () {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstExists(false);

        bullet.reset(turret.x, turret.y);

        bullet.rotation = game.physics.arcade.moveToPointer(bullet, 1000, game.input.activePointer, 500);
    }

}

function render () {

    // game.debug.text('Active Bullets: ' + bullets.countLiving() + ' / ' + bullets.length, 32, 32);
  //  game.debug.text('Enemies: ' + enemiesAlive + ' / ' + enemiesTotal, 32, 32);
game.debug.text('still learning / testing phaser: more to come', 150, 350);
game.debug.text('Level 1: Beginner', 290, 400);
game.debug.text('Click to Start!', 300, 425);
}


 function createTileSelector() {

    //  Our tile selection window
    var tileSelector = game.add.group();

    var tileSelectorBackground = game.make.graphics();
    tileSelectorBackground.beginFill(0x000000, 0.5);
    tileSelectorBackground.drawRect(0, 0, 800, 34);
    tileSelectorBackground.endFill();

    tileSelector.add(tileSelectorBackground);

    var tileStrip = tileSelector.create(1, 1, 'arrow');
    tileStrip.inputEnabled = true;
    tileStrip.events.onInputDown.add(pickTile, this);

    tileSelector.fixedToCamera = true;

    //  Our painting marker
    marker = game.add.graphics();
    marker.lineStyle(2, 0x000000, 1);
    marker.drawRect(0, 0, 32, 32);

}   
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /*
    
    

        //  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
        //  Although it will work fine with this tutorial, it's almost certainly not the most current version.
        //  Be sure to replace it with an updated version before you start experimenting with adding your own code.

        var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {


    
    game.load.tilemap('desert', 'Pavo_TD/public/assets/tilemaps/maps/desert.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'Pavo_TD/public/assets/tilemaps/tiles/tmw_desert_spacing.png');
    
//assets/tilemaps/tmx/levelOne.tmx
}

var map;
//var layer1;
var layer;
//var layer2;
//var layer3;

//var marker;
//var currentTile = 0;
//var currentLayer;

//var cursors;
//var showLayersKey;
//var layer1Key;
//var layer2Key;
//var layer3Key;
//var larger;

function create() {

  //  game.physics.startSystem(Phaser.Physics.ARCADE)
    map = game.add.tilemap('desert');
    map.addTilesetImage('Desert','tiles');
    layer = map.createLayer('ground_1x1');
    layer.resizeWorld();





   // game.stage.backgroundColor = '#2d2d2d';
    
   // larger = game.add.tileSprite(0, 0, 800, 800)
   
   // map = game.add.tilemap('map', 16, 16);

    //  Creates a blank tilemap
  //  map = game.add.tilemap('levelOne', 'assets/tilemaps/tmx/levelOne.tmx');

    //  Add a Tileset image to the map
 //   map.addTilesetImage('levelOne');

    //  Creates a new blank layer and sets the map dimensions.
    //  In this case the map is 40x30 tiles in size and the tiles are 32x32 pixels in size.
//    layer1 = map.create('level1', 60, 60, 32, 32);
    
   //  var layer1 = window._layer = map.createLayer('Bottom', 1800, 1800);
  //  layer1.scrollFactorX = 0.5;
 //   layer1.scrollFactorY = 0.5;
  //  layer = map.createLayer('lvl1');

    //  Resize the world
 //   layer.resizeWorld();
    
    
  //  layer1.debug = true;

  //  layer2 = map.createBlankLayer('level2', 40, 40, 32, 32);
  //  layer2.scrollFactorX = 0.8;
  //  layer2.scrollFactorY = 0.8;

  //  layer3 = map.createBlankLayer('level3', 40, 40, 32, 32);

 //   currentLayer = layer1;

    //  Create our tile selector at the top of the screen
  //  createTileSelector();

  //  game.input.addMoveCallback(updateMarker, this);

  //  cursors = game.input.keyboard.createCursorKeys();

  //  showLayersKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  //  layer1Key = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
  //  layer2Key = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
   // layer3Key = game.input.keyboard.addKey(Phaser.Keyboard.THREE);

 //   showLayersKey.onDown.add(changeLayer, this);
  //  layer1Key.onDown.add(changeLayer, this);
 //   layer2Key.onDown.add(changeLayer, this);
  //  layer3Key.onDown.add(changeLayer, this);

  //  console.log(layer1.index);
  //  console.log(layer2.index);
  //  console.log(layer3.index);

}

//function changeLayer(key) {

 //   switch (key.keyCode)
  //  {
  //      case Phaser.Keyboard.SPACEBAR:
   //         layer1.alpha = 1;
       //     layer2.alpha = 1;
      //      layer3.alpha = 1;
  //          break;

  //      case Phaser.Keyboard.ONE:
  //          currentLayer = layer1;
  //          layer1.alpha = 1;
        //    layer2.alpha = 0.2;
         //   layer3.alpha = 0.2;
   //         break;

  //      case Phaser.Keyboard.TWO:
 //           currentLayer = layer2;
 //           layer1.alpha = 0.2;
        //    layer2.alpha = 1;
          //  layer3.alpha = 0.2;
   //         break;

  //      case Phaser.Keyboard.THREE:
   //         currentLayer = layer3;
  //          layer1.alpha = 0.2;
       //     layer2.alpha = 0.2;
          //  layer3.alpha = 1;
     //       break;
 //   }

//}

//function pickTile(sprite, pointer) {

 //   currentTile = game.math.snapToFloor(pointer.x, 32) / 32;

//}
/*
function updateMarker() {

    marker.x = currentLayer.getTileX(game.input.activePointer.worldX) * 32;
    marker.y = currentLayer.getTileY(game.input.activePointer.worldY) * 32;

    if (game.input.mousePointer.isDown)
    {
        map.putTile(currentTile, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), currentLayer);
        // map.fill(currentTile, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), 4, 4, currentLayer);
    }

}


function update() {

  //  if (cursors.left.isDown)
  //  {
  //      game.camera.x -= 4;
  //  }
  //  else if (cursors.right.isDown)
  //  {
  //      game.camera.x += 4;
  //  }

  //  if (cursors.up.isDown)
  //  {
  //      game.camera.y -= 4;
 //   }
  //  else if (cursors.down.isDown)
  //  {
 //       game.camera.y += 4;
 //   }

}

function render() {

    game.debug.text('still learning / testing phaser: level 1: Beginner', 16, 500);
  //  game.debug.text('1-3 Switch Layers. SPACE = Show All. Cursors = Move Camera', 16, 570);

}

function createTileSelector() {

    //  Our tile selection window
    var tileSelector = game.add.group();

    var tileSelectorBackground = game.make.graphics();
    tileSelectorBackground.beginFill(0x000000, 0.5);
    tileSelectorBackground.drawRect(0, 0, 800, 34);
    tileSelectorBackground.endFill();

    tileSelector.add(tileSelectorBackground);

    var tileStrip = tileSelector.create(1, 1, 'ground_1x1');
    tileStrip.inputEnabled = true;
    tileStrip.events.onInputDown.add(pickTile, this);

    tileSelector.fixedToCamera = true;

    //  Our painting marker
    marker = game.add.graphics();
    marker.lineStyle(2, 0x000000, 1);
    marker.drawRect(0, 0, 32, 32);

}










*/





















    };