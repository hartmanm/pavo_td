/*
Copyright (c) 2017 Michael Neill Hartman. All rights reserved.
mnh_license@proton.me
https://github.com/hartmanm
*/

BomberClass = function (game, imageName, bombName, x, y) {
Phaser.Sprite.call(this, game, x, y, imageName);
//turret attributes
this.x = x;
this.y = y;
this.game = game;
this.cost = 65;
this.range = 256;
this.fireRate = 2000;
this.enableBody = true;
this.physicsBodyType = Phaser.Physics.ARCADE;
this.currentTarget = null;
//this.body.immovable = true;
this.bomberWeapon = game.add.weapon(20, bombName);
this.bomberWeapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
this.bomberWeapon.bulletKillDistance = this.range;
this.bomberWeapon.bulletspeed = 250;
this.bomberWeapon.fireRate = this.fireRate;  //roughly once every 120ms
this.bomberWeapon.bulletRotateToVelocity = true;
this.bomberWeapon.trackSprite(this, 0, 0, true);
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
for(var i = 0; i < theCreeps.length; i++){
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

BomberClass.prototype.targetCreep = function(theCreeps){
if (this.currentTarget != null) {
if (this.currentTarget.alive) {
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

BomberClass.prototype.rotateTower = function(nearestCreep){
this.rotation = this.game.physics.arcade.angleBetween(this, nearestCreep);
};

BomberClass.prototype.updateTower = function(theCreeps){
this.targetCreep(theCreeps);
//nearestCreep = this.findNearestCreep(theCreeps);
if (this.currentTarget != null) {
this.rotateTower(this.currentTarget);
this.bomberWeapon.fire();
}
};
