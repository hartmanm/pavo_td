TurretClass = function (game, imageName, x, y) {
  
  Phaser.Sprite.call(this, game, x, y, imageName);

  //turret attributes
  this.game = game;
  this.cost = 20;
  this.range = 128;
  this.fireRate = 200;
  this.enableBody = true;
  this.physicsBodyType = Phaser.Physics.ARCADE;
  //this.body.immovable = true;
  this.inputEnabled = true;
  this.input.enableDrag();
  this.input.enableSnap(32,32,true,true, 16, 16);
  this.anchor.set(0.5);
  //this.events.onDragStop.add(createTurret, this);

  this.turretWeapon = game.add.weapon(20, 'projectiles')
  this.turretWeapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
  this.turretWeapon.bulletKillDistance = this.range;
  this.turretWeapon.bulletSpeed = 400;
  this.turretWeapon.fireRate = this.fireRate;  //roughly onece every 120ms
  this.turretWeapon.trackSprite(this, 0, 0, true);

  game.add.existing(this)
}

TurretClass.prototype = Object.create(Phaser.Sprite.prototype);
TurretClass.prototype.constructor = TurretClass;

TurretClass.prototype.findNearestCreep = function (theCreeps) {
    var nearestCreep;
    var creepDistance = 128; //max range of weapon
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

TurretClass.prototype.rotateTurret = function(nearestCreep) {
    this.rotation = this.game.physics.arcade.angleBetween(this, nearestCreep);
};

TurretClass.prototype.updateTurret = function(theCreeps) {
    nearestCreep = this.findNearestCreep(theCreeps);
    if (nearestCreep) {
      this.rotateTurret(nearestCreep);
      this.turretWeapon.fire();
    }
};


