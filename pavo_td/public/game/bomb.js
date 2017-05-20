BomberClass = function (game, imageName, bombName, x, y) {

  Phaser.Sprite.call(this, game, x, y, imageName);

  //turret attributes
  this.game = game;
  this.cost = 65;
  this.range = 256;
  this.fireRate = 2000;
  this.enableBody = true;
  this.physicsBodyType = Phaser.Physics.ARCADE;
  this.currentTarget = null;
  //this.body.immovable = true;
  this.bombWeapon = game.add.weapon(20, bulletName);
  this.bombWeapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
  this.bombWeapon.bulletKillDistance = this.range;
  this.bombWeapon.bulletSpeed = 250;
  this.bombWeapon.fireRate = this.fireRate;  //roughly onece every 120ms
  this.bombWeapon.bulletRotateToVelocity = true;
  this.bombWeapon.trackSprite(this, 0, 0, true);
  this.inputEnabled = true;
  this.input.enableDrag();
  this.input.enableSnap(32,32,true,true, 16, 16);
  this.anchor.set(0.5);
  //this.events.onDragStop.add(createTurret, this);

  game.add.existing(this)
}

BomberClass.prototype = Object.create(Phaser.Sprite.prototype);
BomberClass.prototype.constructor = BomberClass;

BomberClass.prototype.findNearestCreep = function (theCreeps) {
    var nearestCreep = null;
    var creepDistance = this.range; //max range of weapon

    for (var i = 0; i < theCreeps.length; i++) {
      if (theCreeps[i].alive) {
        if (this.game.physics.arcade.distanceBetween(this, theCreeps[i].creep) < creepDistance) {
          creepDistance = this.game.physics.arcade.distanceBetween(this, theCreeps[i].creep);
          nearestCreep = theCreeps[i].creep
        }
      }
    }

    this.currentTarget = nearestCreep;
    return nearestCreep;
};

BomberClass.prototype.targetCreep = function(theCreeps) {
    if (this.currentTarget != null) {
      if (this.currentTarget.alive) {
  //      console.log('firing')
        if (this.game.physics.arcade.distanceBetween(this, this.currentTarget) > this.range) {
          this.findNearestCreep(theCreeps);
        }
      } else {
        this.findNearestCreep(theCreeps);
      }
    } else {
//      console.log('finding new creep')
      this.findNearestCreep(theCreeps);
    }
}

BombClass.prototype.rotateTower = function(nearestCreep) {
    this.rotation = this.game.physics.arcade.angleBetween(this, nearestCreep);
};

BombClass.prototype.updateTower = function(theCreeps) {
    this.targetCreep(theCreeps);
    //nearestCreep = this.findNearestCreep(theCreeps);
    if (this.currentTarget != null) {
      this.rotateTower(this.currentTarget);
      this.bombWeapon.fire();
    }
};
