
//each grid square is: 50 by 50
// cost in credits

// Please Note:
// not sure if we will want this in json for implementation so I made everything very close to json and I'll convert entirely later
// if we do I will modify these to be json

// will add reach towers / creeps / level waves later as time permits

lives=25
fast=0.9
normal=0.5
slow=0.1

// considering having the cannon_tower and some reach towers use more than 1x grid square, for first implementation I think it is best
// to have all the towers use 1 grid square

towers:
{
	cannon_tower:
	{
	cost: 20,
	attack_speed: slow,
	attack_type: "splash",
	damage: 150,
	range: 200,
	description: "area damage"
	}

	arrow_tower:
	{
	cost: 5,
	attack_speed: fast,
	attack_type: "light",
	damage: 50,
	range: 250,
	description: "normal damage"
	}

	bolt_tower:
	{
	cost: 10,
	attack_speed: normal,
	attack_type: "piercing",
	damage: 100,
	range: 300,
	description: "high damage"
	}

	wall:
	{
	cost: 1,
	attack_speed: none,
	attack_type: "none",
	damage: none,
	range: none,
	description: "Barrier that blocks creeps"
	}
}

// each creep takes 1 life if it passes through
// considering adding range between creeps ( creep_density ) as an attribute.  This might be hard to implement so I'll leave it as an idea for now.
creeps:
{
	Bruiser:
	{
	kill_reward: 25,
	move_speed: slow,
	health: 500,
	armor: 25,
	description: "high armor / health, but slow"
	}

	Scout:
	{
	kill_reward: 10,
	move_speed: fast,
	health: 100,
	armor: 0,
	description: "fast, low health"
	}

	Sheep:
	{
	kill_reward: 5,
	move_speed: normal,
	health: 150,
	armor: 5,
	description: "average armor, health, and speed"
	}
}


//(In each level waves start with only balanced creeps, then mix in a few other types, then near the end there are full waves of each type)
// for now I am going to use the same wave composition for each level, then modify it after testing each level.

Levels:
{
	Beginner: //(straight creep path)
	{
		wave_1:
		{
		creep1: Sheep,
		creep2: Sheep,
		creep3: Sheep,
		creep4: Sheep,
		creep5: Sheep,
		}

		wave_2:
		{
		creep1: Sheep,
		creep2: Sheep,
		creep3: Sheep,
		creep4: Sheep,
		creep5: Sheep,
		creep6: Sheep,
		creep7: Sheep,
		creep8: Sheep,
		creep9: Sheep,
		creep10: Sheep
		}

		wave_3:
		{
		creep1: Sheep,
		creep2: Sheep,
		creep3: Scout,
		creep4: Sheep,
		creep5: Sheep,
		creep6: Sheep,
		creep7: Sheep,
		creep8: Sheep,
		creep9: Sheep,
		creep10: Sheep
		}

		wave_4:
		{
		creep1: Sheep,
		creep2: Sheep,
		creep3: Scout,
		creep4: Sheep,
		creep5: Scout,
		creep6: Sheep,
		creep7: Sheep,
		creep8: Sheep,
		creep9: Scout,
		creep10: Sheep
		}

		wave_5:
		{
		creep1: Bruiser,
		creep2: Sheep,
		creep3: Sheep,
		creep4: Sheep,
		creep5: Sheep,
		}

		wave_6:
		{
		creep1: Sheep,
		creep2: Sheep,
		creep3: Scout,
		creep4: Sheep,
		creep5: Sheep,
		creep6: Sheep,
		creep7: Sheep,
		creep8: Sheep,
		creep9: Bruiser,
		creep10: Sheep
		}

		wave_7:
		{
		creep1: Scout,
		creep2: Sheep,
		creep3: Scout,
		creep4: Sheep,
		creep5: Scout,
		creep6: Scout,
		creep7: Sheep,
		creep8: Sheep,
		creep9: Scout,
		creep10: Sheep
		}

		wave_8:
		{
		creep1: Bruiser,
		creep2: Sheep,
		creep3: Sheep,
		creep4: Sheep,
		creep5: Bruiser,
		creep6: Sheep,
		creep7: Bruiser,
		creep8: Sheep,
		creep9: Sheep,
		creep10: Bruiser
		}

		wave_8:
		{
		creep1: Bruiser,
		creep2: Scout,
		creep3: Scout,
		creep4: Scout,
		creep5: Scout,
		creep6: Scout,
		creep7: Scout,
		creep8: Scout,
		creep9: Scout,
		creep10: Scout,
		creep11: Sheep,
		creep12: Sheep,
		creep13: Sheep,
		creep14: Sheep,
		creep15: Sheep,
		creep16: Sheep,
		creep17: Sheep,
		creep18: Sheep,
		creep19: Sheep,
		creep20: Sheep
		}

		wave_9:
		{
		creep1: Bruiser,
		creep2: Scout,
		creep3: Scout,
		creep4: Bruiser,
		creep5: Scout,
		creep6: Scout,
		creep7: Bruiser,
		creep8: Scout,
		creep9: Scout,
		creep10: Bruiser
		}

		wave_10:
		{
		creep1: Bruiser,
		creep2: Bruiser,
		creep3: Bruiser,
		creep4: Bruiser,
		creep5: Bruiser,
		creep6: Bruiser,
		creep7: Bruiser,
		creep8: Bruiser,
		creep9: Bruiser,
		creep10: Bruiser,
		creep11: Bruiser,
		creep12: Bruiser,
		creep13: Bruiser,
		creep14: Bruiser,
		creep15: Bruiser,
		}
	}

	Intermediate: //(winding creep path, need to utilize doubling back of creeps (and thus 2x attack surface area of towers) to complete)
	{
		wave_1:
		{
		creep1: Sheep,
		creep2: Sheep,
		creep3: Sheep,
		creep4: Sheep,
		creep5: Sheep,
		}

		wave_2:
		{
		creep1: Sheep,
		creep2: Sheep,
		creep3: Sheep,
		creep4: Sheep,
		creep5: Sheep,
		creep6: Sheep,
		creep7: Sheep,
		creep8: Sheep,
		creep9: Sheep,
		creep10: Sheep
		}

		wave_3:
		{
		creep1: Sheep,
		creep2: Sheep,
		creep3: Scout,
		creep4: Sheep,
		creep5: Sheep,
		creep6: Sheep,
		creep7: Sheep,
		creep8: Sheep,
		creep9: Sheep,
		creep10: Sheep
		}

		wave_4:
		{
		creep1: Sheep,
		creep2: Sheep,
		creep3: Scout,
		creep4: Sheep,
		creep5: Scout,
		creep6: Sheep,
		creep7: Sheep,
		creep8: Sheep,
		creep9: Scout,
		creep10: Sheep
		}

		wave_5:
		{
		creep1: Bruiser,
		creep2: Sheep,
		creep3: Sheep,
		creep4: Sheep,
		creep5: Sheep,
		}

		wave_6:
		{
		creep1: Sheep,
		creep2: Sheep,
		creep3: Scout,
		creep4: Sheep,
		creep5: Sheep,
		creep6: Sheep,
		creep7: Sheep,
		creep8: Sheep,
		creep9: Bruiser,
		creep10: Sheep
		}

		wave_7:
		{
		creep1: Scout,
		creep2: Sheep,
		creep3: Scout,
		creep4: Sheep,
		creep5: Scout,
		creep6: Scout,
		creep7: Sheep,
		creep8: Sheep,
		creep9: Scout,
		creep10: Sheep
		}

		wave_8:
		{
		creep1: Bruiser,
		creep2: Sheep,
		creep3: Sheep,
		creep4: Sheep,
		creep5: Bruiser,
		creep6: Sheep,
		creep7: Bruiser,
		creep8: Sheep,
		creep9: Sheep,
		creep10: Bruiser
		}

		wave_8:
		{
		creep1: Bruiser,
		creep2: Scout,
		creep3: Scout,
		creep4: Scout,
		creep5: Scout,
		creep6: Scout,
		creep7: Scout,
		creep8: Scout,
		creep9: Scout,
		creep10: Scout,
		creep11: Sheep,
		creep12: Sheep,
		creep13: Sheep,
		creep14: Sheep,
		creep15: Sheep,
		creep16: Sheep,
		creep17: Sheep,
		creep18: Sheep,
		creep19: Sheep,
		creep20: Sheep
		}

		wave_9:
		{
		creep1: Bruiser,
		creep2: Scout,
		creep3: Scout,
		creep4: Bruiser,
		creep5: Scout,
		creep6: Scout,
		creep7: Bruiser,
		creep8: Scout,
		creep9: Scout,
		creep10: Bruiser
		}

		wave_10:
		{
		creep1: Bruiser,
		creep2: Bruiser,
		creep3: Bruiser,
		creep4: Bruiser,
		creep5: Bruiser,
		creep6: Bruiser,
		creep7: Bruiser,
		creep8: Bruiser,
		creep9: Bruiser,
		creep10: Bruiser,
		creep11: Bruiser,
		creep12: Bruiser,
		creep13: Bruiser,
		creep14: Bruiser,
		creep15: Bruiser,
		}
	}

	Advanced: //(winding creep path, must utilize doubling back of creeps, rerouting of creep path,  and optimal tower choices to complete)
	{
		wave_1:
		{
		creep1: Sheep,
		creep2: Sheep,
		creep3: Sheep,
		creep4: Sheep,
		creep5: Sheep,
		}

		wave_2:
		{
		creep1: Sheep,
		creep2: Sheep,
		creep3: Sheep,
		creep4: Sheep,
		creep5: Sheep,
		creep6: Sheep,
		creep7: Sheep,
		creep8: Sheep,
		creep9: Sheep,
		creep10: Sheep
		}

		wave_3:
		{
		creep1: Sheep,
		creep2: Sheep,
		creep3: Scout,
		creep4: Sheep,
		creep5: Sheep,
		creep6: Sheep,
		creep7: Sheep,
		creep8: Sheep,
		creep9: Sheep,
		creep10: Sheep
		}

		wave_4:
		{
		creep1: Sheep,
		creep2: Sheep,
		creep3: Scout,
		creep4: Sheep,
		creep5: Scout,
		creep6: Sheep,
		creep7: Sheep,
		creep8: Sheep,
		creep9: Scout,
		creep10: Sheep
		}

		wave_5:
		{
		creep1: Bruiser,
		creep2: Sheep,
		creep3: Sheep,
		creep4: Sheep,
		creep5: Sheep,
		}

		wave_6:
		{
		creep1: Sheep,
		creep2: Sheep,
		creep3: Scout,
		creep4: Sheep,
		creep5: Sheep,
		creep6: Sheep,
		creep7: Sheep,
		creep8: Sheep,
		creep9: Bruiser,
		creep10: Sheep
		}

		wave_7:
		{
		creep1: Scout,
		creep2: Sheep,
		creep3: Scout,
		creep4: Sheep,
		creep5: Scout,
		creep6: Scout,
		creep7: Sheep,
		creep8: Sheep,
		creep9: Scout,
		creep10: Sheep
		}

		wave_8:
		{
		creep1: Bruiser,
		creep2: Sheep,
		creep3: Sheep,
		creep4: Sheep,
		creep5: Bruiser,
		creep6: Sheep,
		creep7: Bruiser,
		creep8: Sheep,
		creep9: Sheep,
		creep10: Bruiser
		}

		wave_8:
		{
		creep1: Bruiser,
		creep2: Scout,
		creep3: Scout,
		creep4: Scout,
		creep5: Scout,
		creep6: Scout,
		creep7: Scout,
		creep8: Scout,
		creep9: Scout,
		creep10: Scout,
		creep11: Sheep,
		creep12: Sheep,
		creep13: Sheep,
		creep14: Sheep,
		creep15: Sheep,
		creep16: Sheep,
		creep17: Sheep,
		creep18: Sheep,
		creep19: Sheep,
		creep20: Sheep
		}

		wave_9:
		{
		creep1: Bruiser,
		creep2: Scout,
		creep3: Scout,
		creep4: Bruiser,
		creep5: Scout,
		creep6: Scout,
		creep7: Bruiser,
		creep8: Scout,
		creep9: Scout,
		creep10: Bruiser
		}

		wave_10:
		{
		creep1: Bruiser,
		creep2: Bruiser,
		creep3: Bruiser,
		creep4: Bruiser,
		creep5: Bruiser,
		creep6: Bruiser,
		creep7: Bruiser,
		creep8: Bruiser,
		creep9: Bruiser,
		creep10: Bruiser,
		creep11: Bruiser,
		creep12: Bruiser,
		creep13: Bruiser,
		creep14: Bruiser,
		creep15: Bruiser,
		}
	}
}





/*
Reach towers (time permitting):
(Ice) Slowing effect (attack speed: slow) (groups creeps together for cannon tower)
(Poison) Damage over time (attack speed: medium) (good vs high armor creeps)
(Air) High Anti-Air damage (attack speed: very fast)
(Detector) Reveals Invisible creeps
(Booster) Upgrades attack speed / range / or damage of nearby towers
(Ultimate) the one tower to destroy them all (splash damage) (attack speed: fast)
Upgrades for individual towers or all towers of the same type

Reach creeps (time permitting):
Air (fast, need Air tower to prevent leaks)
Attacker (attacks towers)
Invisible (must have a detector or ultimate tower to see)
Speed Booster (speeds up all creeps in a given range)
Armor Booster (increases armor of all creeps in a given range)

Reach levels (time permitting):
Gate survivor (survive as long as possible vs only ground creeps by selectively building and selling towers to swap the opening and closing point of your maze (gating) .)


GUI:
HUD with credits available, current wave, time to next wave, current wave type, next wave type, lives.
Widget to select a tower to add ○ Widget to pause / save game ○ Zoom in and out, pan ○ When adding tower, show tower range and feedback as to whether tower is allowed in each tile space

Reach gui (time permitting):
Grid on / off toggle
Creep pathing on / off toggle
Mechanics: ○ limit tower build area to creep pathable area
Zoom in and out of map ○ Flash ‘life lost’ when a creep clears the level
Start with n credits, gain credits for each creep defeated / wave passed.
All interaction possible via taps or clicks (mobile friendly)

Reach mechanics (time permitting):
Towers can be attacked and destroyed
Towers can be Upgraded by type
Select individual towers and upgrade / sell / display number of creep kills
Tower veterancy ( more damage by number of creep kills )
Enemies with veteran/elite status

Victory conditions:
Survive all waves of creeps with at least 1 life left (start with ~20 lives)
Win with style - survive all waves of creeps with:
Perfect - no lives lost
Frugal - with threshold of credits remaining
Specialist - using two or less tower types

*/
