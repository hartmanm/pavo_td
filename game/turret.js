/*
Copyright (c) 2017 Michael Neill Hartman. All rights reserved.
mnh_license@proton.me
https://github.com/hartmanm
*/

TurretClass = function (game, imageName, bulletName, x, y){
Phaser.Sprite.call(this, game, x, y, imageName);
//turret attributes
this.game = game;
this.cost = 20;
this.range = 128;
this.fireRate = 500;
this.currentTarget = null;
this.enableBody = true;
this.physicsBodyType = Phaser.Physics.ARCADE;
this.immovable = true;
//this.body.immovable = true;
this.turretWeapon = game.add.weapon(20, bulletName);
this.turretWeapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
this.turretWeapon.bulletKillDistance = this.range;
this.turretWeapon.bulletspeed = 1000;
this.turretWeapon.fireRate = this.fireRate;  //roughly onece every 120ms
this.turretWeapon.trackSprite(this, 0, 0, true);
this.inputEnabled = true;
this.input.enableDrag();
this.input.enableSnap(32,32,true,true, 16, 16);
this.anchor.set(0.5);
game.add.existing(this)
}

TurretClass.prototype = Object.create(Phaser.Sprite.prototype);
TurretClass.prototype.constructor = TurretClass;

TurretClass.prototype.findNearestCreep = function (theCreeps){
var nearestCreep = null;
var creepDistance = this.range; //max range of weapon

for (var i = 0; i < theCreeps.length; i++){
if (theCreeps[i].alive) {
if (this.game.physics.arcade.distanceBetween(this, theCreeps[i].creep) < creepDistance){
creepDistance = this.game.physics.arcade.distanceBetween(this, theCreeps[i].creep);
nearestCreep = theCreeps[i].creep
}
}
}

this.currentTarget = nearestCreep;
return nearestCreep;
};

TurretClass.prototype.targetCreep = function(theCreeps){
if (this.currentTarget != null){
if (this.currentTarget.alive){
if (this.game.physics.arcade.distanceBetween(this, this.currentTarget) > this.range){
this.findNearestCreep(theCreeps);
}
} else {
this.findNearestCreep(theCreeps);
}
} else {
this.findNearestCreep(theCreeps);
}
}

TurretClass.prototype.rotateTower = function(nearestCreep){
this.rotation = this.game.physics.arcade.angleBetween(this, nearestCreep);
};

TurretClass.prototype.updateTower = function(theCreeps){
this.targetCreep(theCreeps);
if (this.currentTarget != null){
this.rotateTower(this.currentTarget);
this.turretWeapon.fire();
}
};
