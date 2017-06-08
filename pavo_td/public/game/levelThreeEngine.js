
window.onload = function()
{

var Bomber = {
  cost: 55
};

var Turret = {
  cost: 20
};

var Ice = {
  cost: 50
};

Creep = function (index, game, player, projectile, type)
{
  var x = 16.5 * 32;
  var y = -64;
  var lastDown = 0;
  var lastUp = 0;
  var last = 0;
  var tier = 0;

  this.game = game;
  this.player = player;
  this.projectile = projectile;
  this.alive = false;
  this.slowed = 0;

  if(type === 'sheep')
  {
    this.type = 0;
    this.lifeCost = 1;
    this.health = 7.5 * diff;
    this.maxHealth = 7.5 * diff;
    this.kill_reward = 5 + (diff/2);
    this.speed = 75 + diff;
    this.creep = game.add.sprite(x, y, 'sheep');
  }

  if(type === 'bruiser')
  {
    this.type = 1;
    this.lifeCost = 3;
    this.health = 15 * diff;
    this.maxHealth = 15 * diff;
    this.kill_reward = 10 + (diff/2);
    this.speed = 60 + diff;
    this.creep = game.add.sprite(x, y, 'bruiser');
  }

  if(type === 'scout')
  {
    this.type = 2;
    this.lifeCost = 1;
    this.health = 5 * diff;
    this.maxHealth = 5 * diff;
    this.kill_reward = 10 + (diff/2);
    this.speed = 125 + diff;
    this.creep = game.add.sprite(x, y, 'scout');
  }

  this.creep.anchor.set(0.5);
  this.creep.name = index.toString();
  game.physics.enable(this.creep, Phaser.Physics.ARCADE);
  this.creep.body.immovable = false;

  this.barConfig =
{
    width: 18,
    height: 4,
    x: 0,
    y: 0,
    bg: {
      color: '#651828'
    },
    bar: {
      color: '#02ff63'
    },
    animationDuration: 100,
    flipped: false
  };
  this.healthBar = new HealthBar(this.game, this.barConfig);
};

Creep.prototype.damage = function()
{

  this.health -= 1;

  if (this.health <= 0)
  {
    this.alive = false;
    this.creep.kill();
    this.healthBar.kill();
    credits += this.kill_reward;
    return true;
  }

  return false;
}

/*
Creep.prototype.movedown = function()
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
};

Creep.prototype.moveright = function()
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
};

Creep.prototype.moveleft = function()
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = -1 * (this.speed);
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = -1 * (this.speed);
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = -1 * (this.speed);
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
};

Creep.prototype.moveup = function()
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = -1 * this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = -1 * this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = -1 * this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
};

*/




Creep.prototype.update = function(iceTowers)
{

// shortcut switch 0
	for (var i = 0; i < wallCount; i++)
	{
	  if( (wall[i].x == 560 && wall[i].y == 176) || (wall[i].x == 592 && wall[i].y == 176) || (wall[i].x == 624 && wall[i].y == 176) || (wall[i].x == 656 && wall[i].y == 176) || (wall[i].x == 688 && wall[i].y == 176) || (wall[i].x == 720 && wall[i].y == 176) || (wall[i].x == 752 && wall[i].y == 176) || (wall[i].x == 784 && wall[i].y == 176) || (wall[i].x == 816 && wall[i].y == 176) || (wall[i].x == 848 && wall[i].y == 176) || (wall[i].x == 848 && wall[i].y == 208) || (wall[i].x == 848 && wall[i].y == 240) || (wall[i].x == 848 && wall[i].y == 272) || (wall[i].x == 848 && wall[i].y == 304) || (wall[i].x == 848 && wall[i].y == 336) || (wall[i].x == 848 && wall[i].y == 368) || (wall[i].x == 848 && wall[i].y == 400) || (wall[i].x == 848 && wall[i].y == 432) || (wall[i].x == 848 && wall[i].y == 464) || (wall[i].x == 848 && wall[i].y == 496) || (wall[i].x == 848 && wall[i].y == 528) || (wall[i].x == 848 && wall[i].y == 560) || (wall[i].x == 848 && wall[i].y == 592) || (wall[i].x == 848 && wall[i].y == 624) || (wall[i].x == 848 && wall[i].y == 656) || (wall[i].x == 848 && wall[i].y == 688) || (wall[i].x == 848 && wall[i].y == 720) || (wall[i].x == 848 && wall[i].y == 752) || (wall[i].x == 848 && wall[i].y == 784))
		{
	     shortcut0 = 1;
	  }
	}

// shortcut switch 1
	for (var i = 0; i < wallCount; i++)
	{
	  if( (wall[i].x == 528 && wall[i].y == 208) || (wall[i].x == 528 && wall[i].y == 240) || (wall[i].x == 496 && wall[i].y == 240)  || (wall[i].x == 464 && wall[i].y == 240)  || (wall[i].x == 432 && wall[i].y == 240)  || (wall[i].x == 400 && wall[i].y == 240)  || (wall[i].x == 368 && wall[i].y == 240)  || (wall[i].x == 336 && wall[i].y == 240)  || (wall[i].x == 304 && wall[i].y == 240)  || (wall[i].x == 272 && wall[i].y == 240)  || (wall[i].x == 240 && wall[i].y == 240) || (wall[i].x == 240 && wall[i].y == 272) || (wall[i].x == 240 && wall[i].y == 304) || (wall[i].x == 272 && wall[i].y == 304) || (wall[i].x == 304 && wall[i].y == 304) || (wall[i].x == 336 && wall[i].y == 304) || (wall[i].x == 368 && wall[i].y == 304) || (wall[i].x == 400 && wall[i].y == 304) || (wall[i].x == 432 && wall[i].y == 304) || (wall[i].x == 464 && wall[i].y == 304) || (wall[i].x == 496 && wall[i].y == 304) || (wall[i].x == 528 && wall[i].y == 304) || (wall[i].x == 560 && wall[i].y == 304) || (wall[i].x == 592 && wall[i].y == 304) || (wall[i].x == 624 && wall[i].y == 304) || (wall[i].x == 656 && wall[i].y == 304) || (wall[i].x == 656 && wall[i].y == 336) || (wall[i].x == 656 && wall[i].y == 368) || (wall[i].x == 656 && wall[i].y == 400) || (wall[i].x == 656 && wall[i].y == 400) || (wall[i].x == 656 && wall[i].y == 432) || (wall[i].x == 624 && wall[i].y == 432) || (wall[i].x == 592 && wall[i].y == 432) || (wall[i].x == 560 && wall[i].y == 432) || (wall[i].x == 528 && wall[i].y == 432) || (wall[i].x == 496 && wall[i].y == 432) || (wall[i].x == 464 && wall[i].y == 432) || (wall[i].x == 432 && wall[i].y == 432) || (wall[i].x == 400 && wall[i].y == 432) || (wall[i].x == 368 && wall[i].y == 432) || (wall[i].x == 336 && wall[i].y == 432) || (wall[i].x == 304 && wall[i].y == 432) || (wall[i].x == 272 && wall[i].y == 432) || (wall[i].x == 240 && wall[i].y == 432) || (wall[i].x == 240 && wall[i].y == 464) || (wall[i].x == 240 && wall[i].y == 496) || (wall[i].x == 272 && wall[i].y == 496) || (wall[i].x == 304 && wall[i].y == 496) || (wall[i].x == 336 && wall[i].y == 496) || (wall[i].x == 368 && wall[i].y == 496) || (wall[i].x == 400 && wall[i].y == 496) || (wall[i].x == 432 && wall[i].y == 496) || (wall[i].x == 464 && wall[i].y == 496) || (wall[i].x == 496 && wall[i].y == 496) || (wall[i].x == 528 && wall[i].y == 496) || (wall[i].x == 560 && wall[i].y == 496) || (wall[i].x == 592 && wall[i].y == 496) || (wall[i].x == 624 && wall[i].y == 496) || (wall[i].x == 656 && wall[i].y == 496) || (wall[i].x == 656 && wall[i].y == 528) || (wall[i].x == 656 && wall[i].y == 560) || (wall[i].x == 656 && wall[i].y == 592) || (wall[i].x == 656 && wall[i].y == 624) || (wall[i].x == 624 && wall[i].y == 624) || (wall[i].x == 592 && wall[i].y == 624) || (wall[i].x == 560 && wall[i].y == 624) || (wall[i].x == 496 && wall[i].y == 624) || (wall[i].x == 464 && wall[i].y == 624) || (wall[i].x == 432 && wall[i].y == 624) || (wall[i].x == 400 && wall[i].y == 624) || (wall[i].x == 368 && wall[i].y == 624) || (wall[i].x == 336 && wall[i].y == 624) || (wall[i].x == 304 && wall[i].y == 624) || (wall[i].x == 272 && wall[i].y == 624) || (wall[i].x == 240 && wall[i].y == 624) || (wall[i].x == 240 && wall[i].y == 656) || (wall[i].x == 240 && wall[i].y == 688) || (wall[i].x == 272 && wall[i].y == 688)  || (wall[i].x == 304 && wall[i].y == 688)  || (wall[i].x == 336 && wall[i].y == 688)  || (wall[i].x == 368 && wall[i].y == 688)  || (wall[i].x == 400 && wall[i].y == 688)  || (wall[i].x == 432 && wall[i].y == 688)  || (wall[i].x == 464 && wall[i].y == 688)  || (wall[i].x == 496 && wall[i].y == 688)  || (wall[i].x == 528 && wall[i].y == 688)  || (wall[i].x == 560 && wall[i].y == 688)  || (wall[i].x == 592 && wall[i].y == 688)  || (wall[i].x == 624 && wall[i].y == 688)  || (wall[i].x == 656 && wall[i].y == 688)  || (wall[i].x == 688 && wall[i].y == 688)  || (wall[i].x == 720 && wall[i].y == 688) || (wall[i].x == 720 && wall[i].y == 720) || (wall[i].x == 720 && wall[i].y == 752) || (wall[i].x == 720 && wall[i].y == 784) || (wall[i].x == 720 && wall[i].y == 816) || (wall[i].x == 752 && wall[i].y == 816) || (wall[i].x == 784 && wall[i].y == 816) || (wall[i].x == 816 && wall[i].y == 816)   )
		{
	     shortcut1 = 1;
	  }
	}

// shortcut switch 2
	for (var i = 0; i < wallCount; i++)
	{
	  if( (wall[i].x == 496 && wall[i].y == 176) || (wall[i].x == 464 && wall[i].y == 176) || (wall[i].x == 432 && wall[i].y == 176) || (wall[i].x == 400 && wall[i].y == 176) || (wall[i].x == 368 && wall[i].y == 176) || (wall[i].x == 336 && wall[i].y == 176) || (wall[i].x == 304 && wall[i].y == 176) || (wall[i].x == 272 && wall[i].y == 176) || (wall[i].x == 240 && wall[i].y == 176) || (wall[i].x == 208 && wall[i].y == 176) || (wall[i].x == 176 && wall[i].y == 176) || (wall[i].x == 176 && wall[i].y == 208) || (wall[i].x == 176 && wall[i].y == 240) || (wall[i].x == 176 && wall[i].y == 272) || (wall[i].x == 176 && wall[i].y == 304) || (wall[i].x == 176 && wall[i].y == 336) || (wall[i].x == 176 && wall[i].y == 368) || (wall[i].x == 176 && wall[i].y == 400) || (wall[i].x == 176 && wall[i].y == 432) || (wall[i].x == 176 && wall[i].y == 464) || (wall[i].x == 176 && wall[i].y == 496) || (wall[i].x == 176 && wall[i].y == 528) || (wall[i].x == 176 && wall[i].y == 560) || (wall[i].x == 176 && wall[i].y == 592) || (wall[i].x == 176 && wall[i].y == 624) || (wall[i].x == 176 && wall[i].y == 656) || (wall[i].x == 176 && wall[i].y == 688) || (wall[i].x == 176 && wall[i].y == 720) || (wall[i].x == 176 && wall[i].y == 752) || (wall[i].x == 176 && wall[i].y == 784) || (wall[i].x == 176 && wall[i].y == 816) || (wall[i].x == 208 && wall[i].y == 816) || (wall[i].x == 240 && wall[i].y == 816) || (wall[i].x == 272 && wall[i].y == 816) || (wall[i].x == 304 && wall[i].y == 816) || (wall[i].x == 336 && wall[i].y == 816) || (wall[i].x == 368 && wall[i].y == 816) || (wall[i].x == 400 && wall[i].y == 816) || (wall[i].x == 432 && wall[i].y == 816) || (wall[i].x == 464 && wall[i].y == 816) || (wall[i].x == 496 && wall[i].y == 816) || (wall[i].x == 528 && wall[i].y == 816) || (wall[i].x == 560 && wall[i].y == 816) || (wall[i].x == 592 && wall[i].y == 816) || (wall[i].x == 624 && wall[i].y == 816) || (wall[i].x == 656 && wall[i].y == 816) || (wall[i].x == 688 && wall[i].y == 816) || (wall[i].x == 720 && wall[i].y == 816) || (wall[i].x == 752 && wall[i].y == 816) || (wall[i].x == 784 && wall[i].y == 816) || (wall[i].x == 816 && wall[i].y == 816) || (wall[i].x == 848 && wall[i].y == 816))
		{
	     shortcut2 = 1;
	  }
	}

if(this.creep.x > 848 && wallCount > 0)
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}

if(this.creep.y < 236 && wallCount > 0 && shortcut0 == 1 && shortcut2 == 1 && shortcut1 == 0)
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}

if(this.creep.y < 176 && wallCount > 0 && shortcut0 == 1 && shortcut2 == 0 && shortcut1 == 0)
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}

if(this.creep.y < 176 && wallCount > 0 && shortcut1 == 1)
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}

if(this.creep.y < 176 && wallCount > 0 && shortcut0 == 0 && shortcut2 == 0 && shortcut1 == 0)
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}

if(this.creep.y > 176 && this.creep.x < 848 && wallCount > 0 && shortcut0 == 1 && shortcut2 == 1 && shortcut1 == 1)
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}

if(this.creep.y > 176 && this.creep.x < 848 && wallCount > 0 && shortcut0 == 1 && shortcut2 == 0 && shortcut1 == 1)
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = -this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = -this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = -this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}

if(this.creep.y > 176 && this.creep.x < 848 && wallCount > 0 && shortcut0 == 1 && shortcut2 == 0 && shortcut1 == 0)
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = -this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = -this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = -this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}

if(this.creep.y > 176 && this.creep.x < 176 && wallCount > 0 && shortcut0 == 1 && shortcut2 == 0 && shortcut1 == 1)
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}

if(this.creep.y > 176 && this.creep.x < 176 && wallCount > 0 && shortcut0 == 1 && shortcut2 == 0 && shortcut1 == 0)
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}

if(this.creep.y > 176 && this.creep.x < 848 && wallCount > 0 && shortcut0 == 0)
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}

if(this.creep.y > 236 && this.creep.x > 242  && this.creep.x > 176 && this.creep.x < 816 && wallCount > 0 && shortcut0 == 1)
{
	if(this.type == 0)
	{
	    this.creep.body.velocity.x = -this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
	    this.creep.body.velocity.x = -this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
	    this.creep.body.velocity.x = -this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}


if(this.creep.y > 236 && this.creep.x < 242 && wallCount > 0)
{
	if(this.type == 0)
	{
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}

this.creep.lastUp = 0;
}

if(this.creep.y > 300 && this.creep.x < 656 && this.creep.x > 176 && wallCount > 0)
{

	if(this.type == 0)
	{
	    this.creep.body.velocity.x = this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
}


	if(this.type == 1)
	{
	    this.creep.body.velocity.x = this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
	    this.creep.body.velocity.x = this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}


if(this.creep.y > 300 && this.creep.x > 656 && wallCount > 0)
{
	if(this.type == 0)
	{
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}


if(this.creep.y > 428 && this.creep.x > 242 && this.creep.x > 176 && this.creep.x < 816 && wallCount > 0)
{
	if(this.type == 0)
	{
	    this.creep.body.velocity.x = -this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
	    this.creep.body.velocity.x = -this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
	    this.creep.body.velocity.x = -this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}


if(this.creep.y > 428 && this.creep.x < 242 && wallCount > 0)
{
	if(this.type == 0)
	{
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}


if(this.creep.y > 492 && this.creep.x < 656 && this.creep.x > 176 && wallCount > 0)
{
	if(this.type == 0)
	{
	    this.creep.body.velocity.x = this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
	    this.creep.body.velocity.x = this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
	    this.creep.body.velocity.x = this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}


if(this.creep.y > 492 && this.creep.x > 656 && wallCount > 0)
{
	if(this.type == 0)
	{
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}


if(this.creep.y > 620 && this.creep.x > 242 && this.creep.x > 176 && this.creep.x < 816 && wallCount > 0)
{
	if(this.type == 0)
	{
	    this.creep.body.velocity.x = -this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
	    this.creep.body.velocity.x = -this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
	    this.creep.body.velocity.x = -this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}


if(this.creep.y > 620 && this.creep.x < 242 && wallCount > 0)
{
	if(this.type == 0)
	{
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}


if(this.creep.y > 684 && this.creep.x < 710 && this.creep.x > 176 && wallCount > 0)
{
	if(this.type == 0)
	{
	    this.creep.body.velocity.x = this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
	    this.creep.body.velocity.x = this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
	    this.creep.body.velocity.x = this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}


if(this.creep.y > 684 && this.creep.x > 710 && this.creep.x < 816 && wallCount > 0 )
{
    	if(this.type == 0)
			{
			    this.creep.body.velocity.x = 0;
			    this.creep.body.velocity.y = this.speed;
			    this.healthBar.setPercent(this.health/this.maxHealth*100);
			    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
			}
			if(this.type == 1)
			{
			    this.creep.body.velocity.x = 0;
			    this.creep.body.velocity.y = this.speed;
			    this.healthBar.setPercent(this.health/this.maxHealth*100);
			    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
			}
			if(this.type == 2)
			{
			    this.creep.body.velocity.x = 0;
			    this.creep.body.velocity.y = this.speed;
			    this.healthBar.setPercent(this.health/this.maxHealth*100);
			    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
			}
}

if(this.creep.y > 804 &&  this.creep.x < 840 && wallCount > 0 )
{
    	if(this.type == 0)
			{
			    this.creep.body.velocity.x = this.speed;
			    this.creep.body.velocity.y = 0;
			    this.healthBar.setPercent(this.health/this.maxHealth*100);
			    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
			}
			if(this.type == 1)
			{
			    this.creep.body.velocity.x = this.speed;
			    this.creep.body.velocity.y = 0;
			    this.healthBar.setPercent(this.health/this.maxHealth*100);
			    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
			}
			if(this.type == 2)
			{
			    this.creep.body.velocity.x = this.speed;
			    this.creep.body.velocity.y = 0;
			    this.healthBar.setPercent(this.health/this.maxHealth*100);
			    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
			}
}


if(this.creep.y >= 1072)
{
this.alive = false;
this.creep.kill();
this.healthBar.kill();
lives = lives - this.lifeCost;
this.lifeCost = 0;
}

this.slowed = 0;

for (var i = 0; i < iceTowers.length; i++)
{
    if (iceTowers[i].freezeAnimation.visible)
      {
      if(this.game.physics.arcade.distanceBetween(iceTowers[i], this.creep) < (iceTowers[i].range) )
      {
        this.slowed = 1;
      }
    }

}


if(this.slowed == 1)
{
    this.creep.body.velocity.x = this.creep.body.velocity.x * 0.5;
    this.creep.body.velocity.y = this.creep.body.velocity.y * 0.5;
    this.healthBar.setPercent(this.health/this.maxHealth*100);
    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
}

};

var game = new Phaser.Game(900, 900, Phaser.AUTO, 'lvl2', { preload: preload, create: create, update: update, render: render });

function preload ()
{
  game.load.image('icetower', 'game/three/iceTower_2.png');
  game.load.image('iceshot', 'game/three/iceshot.png')
  game.load.image('sheep', 'game/three/sheep.png');
  game.load.image('bruiser', 'game/three/bruiser2.png');
  game.load.image('scout', 'game/three/scout4.png');
  game.load.image('buyTurret', 'game/three/arrow3large.png')
  game.load.image('buyBomb', 'game/three/bomb_64p.png');
  game.load.image('bomb', 'game/three/bomb_bullet.png');
  game.load.image('bomb_launcher', 'game/three/bomb_launcher.png');
  game.load.image('logo', 'game/three/logo3.png');
  game.load.image('projectiles', 'game/three/fire.png');
  game.load.image('path', 'game/three/path.png');
  game.load.image('nonPath', 'game/three/nonPath.png');
  game.load.image('arrow', 'game/three/arrow3.png');
  game.load.spritesheet('boom', 'game/three/explosion.png', 64, 64, 23);  //64,64,9 for explosion2
  game.load.spritesheet('bomb_explode', 'game/three/explosion_transparent.png', 64, 64, 25);
  game.load.spritesheet('freeze', 'game/three/fx_4_ver2_strip40.png', 128, 128, 40);
  game.load.spritesheet('freeze_small', 'game/three/fx_4_ver2_strip40_small.png', 64, 64, 40);
  game.load.tilemap('lvlthree', 'game/three/levelThree.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('three', 'game/three/levelThree.png');
  game.load.image('buyIce', 'game/three/iceTower_buy.png');
}

var shortcut0 = 0;
var shortcut1 = 0;
var shortcut2 = 0;
var wallFlag = 0;
var first_shortcut = 0;
var diff = 1;

var wall = [{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0}]

var wallCount = 0;

var nonPath = [
{x: 848, y: 816},{x: 528, y: 176}
,{x: 816, y: 784},{x: 816, y: 752},{x: 816, y: 720},{x: 816, y: 688},{x: 816, y: 656},{x: 816, y: 624},{x: 816, y: 592},{x: 816, y: 560},{x: 816, y: 528},{x: 816, y: 496},{x: 816, y: 464},{x: 816, y: 432},{x: 816, y: 400},{x: 816, y: 368},{x: 816, y: 336},{x: 816, y: 304},{x: 816, y: 272},{x: 816, y: 240},{x: 816, y: 208}
,{x: 784, y: 784},{x: 784, y: 752},{x: 784, y: 720},{x: 784, y: 688},{x: 784, y: 656},{x: 784, y: 624},{x: 784, y: 592},{x: 784, y: 560},{x: 784, y: 528},{x: 784, y: 496},{x: 784, y: 464},{x: 784, y: 432},{x: 784, y: 400},{x: 784, y: 368},{x: 784, y: 336},{x: 784, y: 304},{x: 784, y: 272},{x: 784, y: 240},{x: 784, y: 208}
,{x: 752, y: 784},{x: 752, y: 752},{x: 752, y: 720},{x: 752, y: 688},{x: 752, y: 656},{x: 752, y: 624},{x: 752, y: 592},{x: 752, y: 560},{x: 752, y: 528},{x: 752, y: 496},{x: 752, y: 464},{x: 752, y: 432},{x: 752, y: 400},{x: 752, y: 368},{x: 752, y: 336},{x: 752, y: 304},{x: 752, y: 272},{x: 752, y: 240},{x: 752, y: 208}
,{x: 720, y: 656},{x: 720, y: 624},{x: 720, y: 592},{x: 720, y: 560},{x: 720, y: 528},{x: 720, y: 496},{x: 720, y: 464},{x: 720, y: 432},{x: 720, y: 400},{x: 720, y: 368},{x: 720, y: 336},{x: 720, y: 304},{x: 720, y: 272},{x: 720, y: 240},{x: 720, y: 208}
,{x: 688, y: 784},{x: 688, y: 752},{x: 688, y: 720},{x: 688, y: 656},{x: 688, y: 624},{x: 688, y: 592},{x: 688, y: 560},{x: 688, y: 528},{x: 688, y: 496},{x: 688, y: 464},{x: 688, y: 432},{x: 688, y: 400},{x: 688, y: 368},{x: 688, y: 336},{x: 688, y: 304},{x: 688, y: 272},{x: 688, y: 240},{x: 688, y: 208}
,{x: 656, y: 784},{x: 656, y: 752},{x: 656, y: 720},{x: 656, y: 656},{x: 656, y: 464},{x: 656, y: 272},{x: 656, y: 240},{x: 656, y: 208}
,{x: 624, y: 784},{x: 624, y: 752},{x: 624, y: 720},{x: 624, y: 656},{x: 624, y: 592},{x: 624, y: 560},{x: 624, y: 528},{x: 624, y: 464},{x: 624, y: 400},{x: 624, y: 368},{x: 624, y: 336},{x: 624, y: 272},{x: 624, y: 240},{x: 624, y: 208}
,{x: 592, y: 784},{x: 592, y: 752},{x: 592, y: 720},{x: 592, y: 656},{x: 592, y: 592},{x: 592, y: 560},{x: 592, y: 528},{x: 592, y: 464},{x: 592, y: 400},{x: 592, y: 368},{x: 592, y: 336},{x: 592, y: 272},{x: 592, y: 240},{x: 592, y: 208}
,{x: 560, y: 784},{x: 560, y: 752},{x: 560, y: 720},{x: 560, y: 656},{x: 560, y: 592},{x: 560, y: 560},{x: 560, y: 528},{x: 560, y: 464},{x: 560, y: 400},{x: 560, y: 368},{x: 560, y: 336},{x: 560, y: 272},{x: 560, y: 240},{x: 560, y: 208}
,{x: 528, y: 784},{x: 528, y: 752},{x: 528, y: 720},{x: 528, y: 656},{x: 528, y: 592},{x: 528, y: 560},{x: 528, y: 528},{x: 528, y: 464},{x: 528, y: 400},{x: 528, y: 368},{x: 528, y: 336},{x: 528, y: 272}
,{x: 496, y: 784},{x: 496, y: 752},{x: 496, y: 720},{x: 496, y: 656},{x: 496, y: 592},{x: 496, y: 560},{x: 496, y: 528},{x: 496, y: 464},{x: 496, y: 400},{x: 496, y: 368},{x: 496, y: 336},{x: 496, y: 272},{x: 496, y: 208}
,{x: 464, y: 784},{x: 464, y: 752},{x: 464, y: 720},{x: 464, y: 656},{x: 464, y: 592},{x: 464, y: 560},{x: 464, y: 528},{x: 464, y: 464},{x: 464, y: 400},{x: 464, y: 368},{x: 464, y: 336},{x: 464, y: 272},{x: 464, y: 208}
,{x: 432, y: 784},{x: 432, y: 752},{x: 432, y: 720},{x: 432, y: 656},{x: 432, y: 592},{x: 432, y: 560},{x: 432, y: 528},{x: 432, y: 464},{x: 432, y: 400},{x: 432, y: 368},{x: 432, y: 336},{x: 432, y: 272},{x: 432, y: 208}
,{x: 400, y: 784},{x: 400, y: 752},{x: 400, y: 720},{x: 400, y: 656},{x: 400, y: 592},{x: 400, y: 560},{x: 400, y: 528},{x: 400, y: 464},{x: 400, y: 400},{x: 400, y: 368},{x: 400, y: 336},{x: 400, y: 272},{x: 400, y: 208}
,{x: 368, y: 784},{x: 368, y: 752},{x: 368, y: 720},{x: 368, y: 656},{x: 368, y: 592},{x: 368, y: 560},{x: 368, y: 528},{x: 368, y: 464},{x: 368, y: 400},{x: 368, y: 368},{x: 368, y: 336},{x: 368, y: 272},{x: 368, y: 208}
,{x: 336, y: 784},{x: 336, y: 752},{x: 336, y: 720},{x: 336, y: 656},{x: 336, y: 592},{x: 336, y: 560},{x: 336, y: 528},{x: 336, y: 464},{x: 336, y: 400},{x: 336, y: 368},{x: 336, y: 336},{x: 336, y: 272},{x: 336, y: 208}
,{x: 304, y: 784},{x: 304, y: 752},{x: 304, y: 720},{x: 304, y: 656},{x: 304, y: 592},{x: 304, y: 560},{x: 304, y: 528},{x: 304, y: 464},{x: 304, y: 400},{x: 304, y: 368},{x: 304, y: 336},{x: 304, y: 272},{x: 304, y: 208}
,{x: 272, y: 784},{x: 272, y: 752},{x: 272, y: 720},{x: 272, y: 656},{x: 272, y: 592},{x: 272, y: 560},{x: 272, y: 528},{x: 272, y: 464},{x: 272, y: 400},{x: 272, y: 368},{x: 272, y: 336},{x: 272, y: 272},{x: 272, y: 208}
,{x: 240, y: 784},{x: 240, y: 752},{x: 240, y: 720},{x: 240, y: 592},{x: 240, y: 560},{x: 240, y: 528},{x: 240, y: 400},{x: 240, y: 368},{x: 240, y: 336},{x: 240, y: 208}
,{x: 208, y: 784},{x: 208, y: 752},{x: 208, y: 720},{x: 208, y: 688},{x: 208, y: 656},{x: 208, y: 624},{x: 208, y: 592},{x: 208, y: 560},{x: 208, y: 528},{x: 208, y: 496},{x: 208, y: 464},{x: 208, y: 432},{x: 208, y: 400},{x: 208, y: 368},{x: 208, y: 336},{x: 208, y: 304},{x: 208, y: 272},{x: 208, y: 240},{x: 208, y: 208}
 ]

var nonPathCount = 287;

var kill = 0;
var walled = 0;
var startX = 16;
var startY = 1;
var wallLeft = 12;
var wallRight = 19;
var towerSpace = [600];
var tileSize = 32;
var creepType = ['Sheep', 'Sick Sheep', 'Angry Sheep', 'Bruiser', 'Scout', 'Moar Buff Sheep', 'Roid Sheep', 'Sheepinator', 'Monster Sheep', 'Super Scout', 'Elite Bruiser', 'VICTORY!'];
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
var theCreeps;
var creep;
var creepProjectile;
var totalTowers = 1;
var totalCreeps = 0;
var aliveCreeps = 0;
var explosions;
var logo;
var cursors;
var creepSpacing = 0;
var map;
var pathLayer;
var atTile;
var TurretList = [];
var BomberList = [];
var IceList = [];
var type;
var difficulty = "normal";
var gameOver = false;
var turretBuildOk = true;
var bomberBuildOk = true;
var iceBuildOk = true;
var waves = ['sheep', 'sheep', 'bruiser', 'scout', 'sheep', 'sheep', 'sheep', 'sheep', 'scout', 'bruiser'];
var fail;

function create ()
{
  game.time.desiredFps = 30;
  this.theCreeps = [];
  one = game.add.tileSprite(0, 0, 1100, 1100, 'three');

  map = game.add.tilemap('lvlthree');

  totalCreeps = 10;
  aliveCreeps = 10;

  cameraSprite = game.add.sprite(0, 0, 'arrow');
  cameraSprite.visible = false;
  cameraSprite.alpha = 0;
  game.camera.follow(cameraSprite);

  explosions = game.add.group();
  bombExplosions = game.add.group();

  //add sprites for purchasing bomb and arrow/turret
  buyBombSprite = game.add.sprite(32, game.height - 96, 'buyBomb');
  buyBombSprite.inputEnabled = true;
  buyBombSprite.alpha = 0.2; //set to 1 if enough credits to buy
  buyBombSprite.events.onInputDown.add(addBomber, this);
  buyBombText = game.add.text(32, game.height - 128, '', {font: '16px Arial', align: 'center'});
  buyBombText.text = 'Bomber: $55';

  buyTurretSprite = game.add.sprite(32, game.height - 224, 'buyTurret');
  buyTurretSprite.inputEnabled = true;
  buyTurretSprite.alpha = 0.2;
  buyTurretSprite.events.onInputDown.add(addTurret, this);
  buyTurretText = game.add.text(32, game.height - 256, '', {font: '16px Arial', align: 'center'});
  buyTurretText.text = 'Turret: $20';

  buyIceSprite = game.add.sprite(32, game.height - 352, 'buyIce');
  buyIceSprite.inputEnabled = true;
  buyIceSprite.alpha = 0.2;
  buyIceSprite.events.onInputDown.add(addIce, this);
  buyIceText = game.add.text(32, game.height - 384, '', {font: '16px Arial', align: 'center'});
  buyIceText.text = 'Icer: $50';

  for (var i = 0; i < 10; i++)
  {
    var explosionAnimation = explosions.create(0, 0, 'boom', 23, false);
    explosionAnimation.anchor.setTo(0.5, 0.5);
    explosionAnimation.animations.add('boom');
    var bombExplosionAnimation = bombExplosions.create(0,0,'bomb_explode', [0], false);
    bombExplosionAnimation.anchor.setTo(0.5);
    bombExplosionAnimation.animations.add('bomb_explode');
    bombExplosionAnimation.enableBody = true;
    bombExplosionAnimation.physicsBodyType = Phaser.Physics.ARCADE;
  }

  logo = game.add.sprite(155, 155, 'logo');
  logo.fixedToCamera = true;
  game.input.onDown.add(removeLogo, this);
  game.camera.focusOnXY(0, 0);
  cursors = game.input.keyboard.createCursorKeys();
}

function createBomber(bomber) {
  bomberBuildOk = true;
  kill = 0;
     for (var i = 0; i < wallCount; i++)
     {
     if(bomber.x == wall[i].x && bomber.y == wall[i].y)
     {
       kill = 1;
     }
     }

     for (var i = 0; i < nonPathCount; i++)
     {
     if(bomber.x == nonPath[i].x && bomber.y == nonPath[i].y)
     {
       kill = 1;
     }
     }

  if ( bomber.x < 173 || bomber.x > 864 || bomber.y < 176 || bomber.y > 816 || kill == 1 )
{
    bomber.destroy();
  } else if (bomber.hasOwnProperty('fireRate')) {
    credits -= Bomber.cost;
    bomber.input.draggable = false;
    BomberList.push(bomber);
  } else {
    bomber.destroy();
  }
  wall[wallCount].x = bomber.x;
  wall[wallCount].y = bomber.y;
  wallCount++;
}

function addBomber()
{
  if (credits >= Bomber.cost && bomberBuildOk)
{
    var newBomber = new BomberClass(game, 'bomb_launcher', 'bomb', 0, 0);
    newBomber.events.onDragStop.add(createBomber, this);
    if (newBomber) {
      newBomber.reset(buyBombSprite.x + 80, buyBombSprite.y + 32)
      bomberBuildOk = false;
      newBomber.bringToTop();
      /*if (game.input.activePointer.isDown) {
        newBomber.input.startDrag(game.input.activePointer);
      }*/
    }
  }
}

function createTurret(turret)
{
  turretBuildOk = true;
  kill = 0;
     for (var i = 0; i < wallCount; i++)
     {
     if(turret.x == wall[i].x && turret.y == wall[i].y)
     {
       kill = 1;
     }
     }

     for (var i = 0; i < nonPathCount; i++)
     {
     if(turret.x == nonPath[i].x && turret.y == nonPath[i].y)
     {
       kill = 1;
     }
     }

  if ( turret.x < 173 || turret.x > 864 || turret.y < 176 || turret.y > 816 || kill == 1)
  {
    turret.destroy();
  } else if (turret.hasOwnProperty('fireRate'))
{
    credits -= turret.cost;
    turret.input.draggable = false;
    TurretList.push(turret)
  } else {
    turret.destroy();
  }
  wall[wallCount].x = turret.x;
  wall[wallCount].y = turret.y;
  wallCount++;
}

function addTurret()
{
  if (credits >= Turret.cost && turretBuildOk)
{
    var newTurret = new TurretClass(game, 'arrow', 'projectiles', 0, 0)
    newTurret.events.onDragStop.add(createTurret, this);
    if (newTurret) {
      newTurret.reset(buyTurretSprite.x + 80, buyTurretSprite.y + 32);
      turretBuildOk = false;
      newTurret.bringToTop();
    }
  }
}

function createIce(ice)
{
  iceBuildOk = true;
  kill = 0;
     for (var i = 0; i < wallCount; i++)
     {
     if(ice.x == wall[i].x && ice.y == wall[i].y)
     {
       kill = 1;
     }
     }

     for (var i = 0; i < nonPathCount; i++)
     {
     if(ice.x == nonPath[i].x && ice.y == nonPath[i].y)
     {
       kill = 1;
     }
     }

  if ( ice.x < 173 || ice.x > 864 || ice.y < 176 || ice.y > 816 || kill == 1)
  {
    ice.destroy();
  } else if (ice.hasOwnProperty('fireRate'))
{
    credits -= ice.cost;
    ice.input.draggable = false;
    IceList.push(ice)
  } else {
    ice.destroy();
  }
  wall[wallCount].x = ice.x;
  wall[wallCount].y = ice.y;
  wallCount++;
}

function addIce()
{
  if (credits >= Ice.cost && iceBuildOk)
{
    var newIce = new IceClass(game, 'icetower', 'freeze_small', 0, 0);
    newIce.events.onDragStop.add(createIce, this);
    if (newIce) {
      newIce.reset(buyIceSprite.x + 80, buyIceSprite.y + 32);
      iceBuildOk = false;
      newIce.bringToTop();
      /*if (game.input.activePointer.isDown) {
        newIce.input.startDrag(game.input.activePointer);
      }*/
    }
  }
}

function makeCreep(i, type)
{
    theCreeps.push(new Creep(i, game, creep, creepProjectile, type));
}

function removeLogo ()
{
  game.input.onDown.remove(removeLogo, this);
  logo.kill();
}


//for potential attacking creeps later on
function projectilesHitPlayer (creep, projectiles)
{
  projectiles.kill();
}

function update ()
{
  if( lives != 0 )
  {
  //if not enough credits to buy a tower, then fade it out
  if (credits >= Bomber.cost) {
    buyBombSprite.alpha = 1;
  } else {
    buyBombSprite.alpha = 0.2;
  }
  if (credits >= Turret.cost) {
    buyTurretSprite.alpha = 1;
  } else {
    buyTurretSprite.alpha = 0.2;
  }
  if (credits >= Ice.cost) {
    buyIceSprite.alpha = 1;
  } else {
    buyIceSprite.alpha = 0.2;
  }

  cameraSprite.reset(game.input.activePointer.x, game.input.activePointer.y);

/***********************
BB UPDATE
Since creeps.alive is now set to false
in constructor function - have to set to
true when each creep starts moving
set creep[0] to alive on create,
set others to alive in the flag and y
position check
************************/
if( (currentWave == 0) && (start == 1) )
{
  theCreeps = [];


  for (var i = 0; i < totalCreeps; i++)
	{
		makeCreep(i, waves[currentWave]);
	}
  theCreeps[0].alive = true;
	start = 0;
}

  if( (aliveCreeps == 0) && (currentWave < totalWave) )
  {
    diff = currentWave;
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
			makeCreep(i, waves[currentWave]);
	  }
    theCreeps[0].alive = true;
		currentWave++;
  }

    if(theCreeps[0].creep.y > 0 && flag1 == 1)
    {
      theCreeps[1].alive = true;
      theCreeps[1].creep.y = -75;
			flag1++;
    }
    if(theCreeps[1].creep.y > 50 && flag2 == 1)
    {
    	theCreeps[2].alive = true;
      theCreeps[2].creep.y = -25;
			flag2++;
    }
    if(theCreeps[1].creep.y > 50 && flag3 == 1)
    {
    	theCreeps[3].alive = true;
      theCreeps[3].creep.y = -100;
			flag3++;
    }
    if(theCreeps[1].creep.y > 50 && flag4 == 1)
    {
    	theCreeps[4].alive = true;
      theCreeps[4].creep.y = -150;
			flag4++;
    }
    if(theCreeps[1].creep.y > 50 && flag5 == 1)
    {
    	theCreeps[5].alive = true;
      theCreeps[5].creep.y = -200;
			flag5++;
    }
    if(theCreeps[1].creep.y > 50 && flag6 == 1)
    {
    	theCreeps[6].alive = true;
      theCreeps[6].creep.y = -250;
			flag6++;
    }
    if(theCreeps[1].creep.y > 50 && flag7 == 1)
    {
    	theCreeps[7].alive = true;
      theCreeps[7].creep.y = -300;
			flag7++;
    }
    if(theCreeps[1].creep.y > 50 && flag8 == 1)
    {
    	theCreeps[8].alive = true;
      theCreeps[8].creep.y = -350;
			flag8++;
    }
    if(theCreeps[1].creep.y > 50 && flag9 == 1)  // back to 450??
    {
    	theCreeps[9].alive = true;
      theCreeps[9].creep.y = -400;
			flag9++;
    }

  aliveCreeps = 0;
  for (var t = 0; t < TurretList.length; t++) {
    TurretList[t].updateTower(theCreeps);
  }
  for (var b = 0; b < BomberList.length; b++) {
    BomberList[b].updateTower(theCreeps);
  }
  for (var f = 0; f < IceList.length; f++) {
    IceList[f].updateTower(theCreeps);
  }

  for (var i = 0; i < theCreeps.length; i++)
  {
    if (theCreeps[i].alive)
    {
      aliveCreeps++;

      for (var t = 0; t < TurretList.length; t++) {
        game.physics.arcade.overlap(TurretList[t].turretWeapon.bullets, theCreeps[i].creep, turretsHitEnemy, null, this);
      }
      for (var b = 0; b < BomberList.length; b++) {
        game.physics.arcade.overlap(BomberList[b].bomberWeapon.bullets, theCreeps[i].creep, bombsHitEnemy, null, this);
      }
      theCreeps[i].update(IceList);
     }
  }

}

  if( lives == 0 )
  {
  for (var i = 0; i < theCreeps.length; i++)
  {
	theCreeps[i].healthBar.kill();
}
  }

}

function explosionDamage(explosion)
{
  var started = Date.now();
  var interval = setInterval(function()
{
    if (Date.now() - started > 1000)
{
      clearInterval(interval);
    } else {
      for (var i = 0; i < theCreeps.length; i++)
{
        if (theCreeps[i].alive) {
          if (game.physics.arcade.distanceBetween(explosion, theCreeps[i].creep) < 64)
{
            var destroyed = theCreeps[i].damage();

            if (destroyed)
            {
              var explosionAnimation = explosions.getFirstExists(false);
              explosionAnimation.reset(theCreeps[i].creep.x, theCreeps[i].creep.y);
              explosionAnimation.play('boom', 100, false, true);
            }
          }
        }
      }
    }
  }, 250);
}

function turretsHitEnemy (creep, bullets)
{
  bullets.kill();

  var destroyed = theCreeps[creep.name].damage();

  if (destroyed)
  {
    var explosionAnimation = explosions.getFirstExists(false);
    explosionAnimation.reset(creep.x, creep.y);
    explosionAnimation.play('boom', 100, false, true);
  }
}

function bombsHitEnemy (creep, bombs)
{
  bombs.kill();
  var bombAnimation = bombExplosions.getFirstExists(false);
  bombAnimation.reset(creep.x, creep.y);
  bombAnimation.play('bomb_explode', 25, false, true);
  explosionDamage(bombAnimation);
}


function levelComplete()
{
  completedLevel = JSON.stringify(
{
    "level": 3,
    "difficulty": difficulty,
    "gameVersion": "1.0",
    "livesRemaining": lives,
    "towers": {
      "turrets": TurretList.length,
      "bombers": BomberList.length,
      "icers": IceList.length,
    },
    "creditsRemaining": credits
  });
  console.log(completedLevel);
  //relies on jQuery for ajax post
  $.post("levelCompleted", {"data": completedLevel}, function(data) {
    console.log(data);
  }, "json");
}

function render ()
{
  if( aliveCreeps > 0 && lives > 0)
  {
    game.debug.text(creepType[currentWave] + ': ' + aliveCreeps + ' / ' + totalCreeps, 32, 45, 'magenta');
    game.debug.text('Next Wave: ' + creepType[currentWave + 1], 32, 70, 'magenta');
    game.debug.text('Current Wave: ' + currentWave + ' / ' + totalWave, 32, 95, 'magenta');
    game.debug.text('Credits: ' + credits, 32, 120, 'magenta');
    game.debug.text('Lives: ' + lives, 32, 145, 'magenta');

  }


  if( (aliveCreeps == 0) && (currentWave == totalWave) )
  {
    game.debug.text('LEVEL COMPLETE! ', 32, 32);
    if (!gameOver) {
      gameOver = true;
      levelComplete();
    }
  }

  if( (lives == 0) )
  {
    game.debug.text('FAILURE! ', 224, 346, 'magenta');
    game.debug.text('Note: it is possible to win', 224, 378, 'magenta');
  }
}

};
