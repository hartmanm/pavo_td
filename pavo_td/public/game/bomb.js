BombClass = function (game, imageName, bulletName, x, y) {
  
  Phaser.Sprite.call(this, game, x, y, imageName);

  //turret attributes
  this.game = game;
  this.cost = 100;
  this.range = 256;
  this.fireRate = 2000;
  this.enableBody = true;
  this.physicsBodyType = Phaser.Physics.ARCADE;
  //this.body.immovable = true;
  this.turretWeapon = game.add.weapon(20, bulletName);
  this.turretWeapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
  this.turretWeapon.bulletKillDistance = this.range;
  this.turretWeapon.bulletSpeed = 400;
  this.turretWeapon.fireRate = this.fireRate;  //roughly onece every 120ms
  this.turretWeapon.trackSprite(this, 0, 0, true);
  this.inputEnabled = true;
  this.input.enableDrag();
  this.input.enableSnap(32,32,true,true, 16, 16);
  this.anchor.set(0.5);
  //this.events.onDragStop.add(createTurret, this);

  game.add.existing(this)
}

BombClass.prototype = Object.create(Phaser.Sprite.prototype);
TurretClass.prototype.constructor = TurretClass;

TurretClass.prototype.findNearestCreep = function (theCreeps) {
    var nearestCreep;
    var creepDistance = this.range; //max range of weapon
    for (var i = 0; i < theCreeps.length; i++) {
      if (theCreeps[i].alive) {
        if (this.game.physics.arcade.distanceBetween(this, theCreeps[i].creep) < creepDistance) {
          creepDistance = this.game.physics.arcade.distanceBetween(this, theCreeps[i].creep);
          nearestCreep = theCreeps[i].creep
        }
      }
    }
    return nearestCreep;
};

TurretClass.prototype.rotateTower = function(nearestCreep) {
    this.rotation = this.game.physics.arcade.angleBetween(this, nearestCreep);
};

TurretClass.prototype.updateTower = function(theCreeps) {
    nearestCreep = this.findNearestCreep(theCreeps);
    if (nearestCreep) {
      this.rotateTurret(nearestCreep);
      this.turretWeapon.fire();
    }
};