IceClass = function (game, imageName, effectName, x, y) {

  Phaser.Sprite.call(this, game, x, y, imageName);

  //turret attributes
  this.game = game;
  this.cost = 50;
  this.range = 128;
  this.fireRate = 10000;
  this.freezeDuration = 4000;
  this.lastFired = 0;
  this.currentTarget = null;
  this.enableBody = true;
  this.physicsBodyType = Phaser.Physics.ARCADE;
  this.immovable = true;
  this.inputEnabled = true;
  this.input.enableDrag();
  this.input.enableSnap(32,32,true,true, 16, 16);
  this.anchor.set(0.5);
  this.freezeAnimation = this.game.add.sprite(0, 0, effectName);
  this.freezeAnimation.anchor.setTo(0.5, 0.5);
  this.freezeAnimation.animations.add('blast');
  this.freezeAnimation.visible = false;
  game.add.existing(this)
}

IceClass.prototype = Object.create(Phaser.Sprite.prototype);
IceClass.prototype.constructor = TurretClass;

IceClass.prototype.findNearestCreep = function (theCreeps) {
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

IceClass.prototype.targetCreep = function(theCreeps) {
    if (this.currentTarget != null) {
      if (this.currentTarget.alive) {
        if (this.game.physics.arcade.distanceBetween(this, this.currentTarget) > this.range) {
          this.findNearestCreep(theCreeps);
        }
      } else {
        this.findNearestCreep(theCreeps);
      }
    } else {
      this.findNearestCreep(theCreeps);
    }
}

IceClass.prototype.freeze = function() {
  this.lastFired = Date.now();
  this.freezeAnimation.reset(this.x, this.y);
  //this.freezeAnimation.scale.setTo(2,2);
  this.freezeAnimation.visible = true;
  this.freezeAnimation.animations.play('blast', 10, false);
}

IceClass.prototype.updateTower = function(theCreeps) {
    this.targetCreep(theCreeps);
    //nearestCreep = this.findNearestCreep(theCreeps);
    if (this.currentTarget != null) {
      if (Date.now() - this.lastFired > this.fireRate) {
        this.freeze();
      }
    }
};
