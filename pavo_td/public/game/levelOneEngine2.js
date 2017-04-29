

    window.onload = function() {










	var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

	function preload() {

	    game.load.image('bullet', 'assets/games/invaders/bullet.png');
	    game.load.image('enemyBullet', 'assets/games/invaders/enemy-bullet.png');
	    game.load.spritesheet('invader', 'assets/games/invaders/invader32x32x4.png', 32, 32);
	    game.load.image('ship', 'assets/games/invaders/player.png');
	    game.load.spritesheet('kaboom', 'assets/games/invaders/explode.png', 128, 128);
	    game.load.image('starfield', 'assets/games/invaders/starfield.png');
	    game.load.image('background', 'assets/games/starstruck/background2.png');

	}

	var player;
	var aliens;
	var bullets;
	var bulletTime = 0;
	var cursors;
	var fireButton;
	var explosions;
	var starfield;
	var score = 0;
	var scoreString = '';
	var scoreText;
	var lives;
	var enemyBullet;
	var firingTimer = 0;
	var stateText;
	var livingEnemies = [];

	function create() {

	    game.physics.startSystem(Phaser.Physics.ARCADE);

	    //  The scrolling starfield background
	    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

	    //  Our bullet group
	    bullets = game.add.group();
	    bullets.enableBody = true;
	    bullets.physicsBodyType = Phaser.Physics.ARCADE;
	    bullets.createMultiple(30, 'bullet');
	    bullets.setAll('anchor.x', 0.5);
	    bullets.setAll('anchor.y', 1);
	    bullets.setAll('outOfBoundsKill', true);
	    bullets.setAll('checkWorldBounds', true);

	    // The enemy's bullets
	    enemyBullets = game.add.group();
	    enemyBullets.enableBody = true;
	    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
	    enemyBullets.createMultiple(30, 'enemyBullet');
	    enemyBullets.setAll('anchor.x', 0.5);
	    enemyBullets.setAll('anchor.y', 1);
	    enemyBullets.setAll('outOfBoundsKill', true);
	    enemyBullets.setAll('checkWorldBounds', true);

	    //  The hero!
	    player = game.add.sprite(400, 500, 'ship');
	    player.anchor.setTo(0.5, 0.5);
	    game.physics.enable(player, Phaser.Physics.ARCADE);

	    //  The baddies!
	    aliens = game.add.group();
	    aliens.enableBody = true;
	    aliens.physicsBodyType = Phaser.Physics.ARCADE;

	    createAliens();

	    //  The score
	    scoreString = 'Score : ';
	    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });

	    //  Lives
	    lives = game.add.group();
	    game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });

	    //  Text
	    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
	    stateText.anchor.setTo(0.5, 0.5);
	    stateText.visible = false;

	    for (var i = 0; i < 3; i++)
	    {
	        var ship = lives.create(game.world.width - 100 + (30 * i), 60, 'ship');
	        ship.anchor.setTo(0.5, 0.5);
	        ship.angle = 90;
	        ship.alpha = 0.4;
	    }

	    //  An explosion pool
	    explosions = game.add.group();
	    explosions.createMultiple(30, 'kaboom');
	    explosions.forEach(setupInvader, this);

	    //  And some controls to play the game with
	    cursors = game.input.keyboard.createCursorKeys();
	    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	}

	function createAliens () {

	    for (var y = 0; y < 4; y++)
	    {
	        for (var x = 0; x < 10; x++)
	        {
	            var alien = aliens.create(x * 48, y * 50, 'invader');
	            alien.anchor.setTo(0.5, 0.5);
	            alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
	            alien.play('fly');
	            alien.body.moves = false;
	        }
	    }

	    aliens.x = 100;
	    aliens.y = 50;

	    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
	    var tween = game.add.tween(aliens).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

	    //  When the tween loops it calls descend
	    tween.onLoop.add(descend, this);
	}

	function setupInvader (invader) {

	    invader.anchor.x = 0.5;
	    invader.anchor.y = 0.5;
	    invader.animations.add('kaboom');

	}

	function descend() {

	    aliens.y += 10;

	}

	function update() {

	    //  Scroll the background
	    starfield.tilePosition.y += 2;

	    if (player.alive)
	    {
	        //  Reset the player, then check for movement keys
	        player.body.velocity.setTo(0, 0);

	        if (cursors.left.isDown)
	        {
	            player.body.velocity.x = -200;
	        }
	        else if (cursors.right.isDown)
	        {
	            player.body.velocity.x = 200;
	        }

	        //  Firing?
	        if (fireButton.isDown)
	        {
	            fireBullet();
	        }

	        if (game.time.now > firingTimer)
	        {
	            enemyFires();
	        }

	        //  Run collision
	        game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
	        game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
	    }

	}

	function render() {

	    // for (var i = 0; i < aliens.length; i++)
	    // {
	    //     game.debug.body(aliens.children[i]);
	    // }

	}

	function collisionHandler (bullet, alien) {

	    //  When a bullet hits an alien we kill them both
	    bullet.kill();
	    alien.kill();

	    //  Increase the score
	    score += 20;
	    scoreText.text = scoreString + score;

	    //  And create an explosion :)
	    var explosion = explosions.getFirstExists(false);
	    explosion.reset(alien.body.x, alien.body.y);
	    explosion.play('kaboom', 30, false, true);

	    if (aliens.countLiving() == 0)
	    {
	        score += 1000;
	        scoreText.text = scoreString + score;

	        enemyBullets.callAll('kill',this);
	        stateText.text = " You Won, \n Click to restart";
	        stateText.visible = true;

	        //the "click to restart" handler
	        game.input.onTap.addOnce(restart,this);
	    }

	}

	function enemyHitsPlayer (player,bullet) {

	    bullet.kill();

	    live = lives.getFirstAlive();

	    if (live)
	    {
	        live.kill();
	    }

	    //  And create an explosion :)
	    var explosion = explosions.getFirstExists(false);
	    explosion.reset(player.body.x, player.body.y);
	    explosion.play('kaboom', 30, false, true);

	    // When the player dies
	    if (lives.countLiving() < 1)
	    {
	        player.kill();
	        enemyBullets.callAll('kill');

	        stateText.text=" GAME OVER \n Click to restart";
	        stateText.visible = true;

	        //the "click to restart" handler
	        game.input.onTap.addOnce(restart,this);
	    }

	}

	function enemyFires () {

	    //  Grab the first bullet we can from the pool
	    enemyBullet = enemyBullets.getFirstExists(false);

	    livingEnemies.length=0;

	    aliens.forEachAlive(function(alien){

	        // put every living enemy in an array
	        livingEnemies.push(alien);
	    });


	    if (enemyBullet && livingEnemies.length > 0)
	    {

	        var random=game.rnd.integerInRange(0,livingEnemies.length-1);

	        // randomly select one of them
	        var shooter=livingEnemies[random];
	        // And fire the bullet from this enemy
	        enemyBullet.reset(shooter.body.x, shooter.body.y);

	        game.physics.arcade.moveToObject(enemyBullet,player,120);
	        firingTimer = game.time.now + 2000;
	    }

	}

	function fireBullet () {

	    //  To avoid them being allowed to fire too fast we set a time limit
	    if (game.time.now > bulletTime)
	    {
	        //  Grab the first bullet we can from the pool
	        bullet = bullets.getFirstExists(false);

	        if (bullet)
	        {
	            //  And fire it
	            bullet.reset(player.x, player.y + 8);
	            bullet.body.velocity.y = -400;
	            bulletTime = game.time.now + 200;
	        }
	    }

	}

	function resetBullet (bullet) {

	    //  Called if the bullet goes out of the screen
	    bullet.kill();

	}

	function restart () {

	    //  A new level starts

	    //resets the life count
	    lives.callAll('revive');
	    //  And brings the aliens back from the dead :)
	    aliens.removeAll();
	    createAliens();

	    //revives the player
	    player.revive();
	    //hides the text
	    stateText.visible = false;

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
