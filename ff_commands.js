/*
Copyright 2016 Ann Marie Mossman

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
goog.provide('net.killerandroid.fightingfigures.FFCommands')

net.killerandroid.fightingfigures.FFCommands = function() {};

// Caster Commands
net.killerandroid.fightingfigures.FFCommands.WEAKEN = 'weaken';

net.killerandroid.fightingfigures.FFCommands.STUN = 'stun';

net.killerandroid.fightingfigures.FFCommands.NUKE = 'nuke';

net.killerandroid.fightingfigures.FFCommands.SLOW = 'slow';

net.killerandroid.fightingfigures.FFCommands.DOT = 'dot';

// Healer Commands
net.killerandroid.fightingfigures.FFCommands.HEAL_SELF = 'heal_self';

net.killerandroid.fightingfigures.FFCommands.HEAL_CASTER = 'heal_caster';

net.killerandroid.fightingfigures.FFCommands.HEAL_ATTACKER = 'heal_attacker';

net.killerandroid.fightingfigures.FFCommands.HEAL_DEFENDER = 'heal_defender';

net.killerandroid.fightingfigures.FFCommands.HEAL_ALL = 'heal_all';

// Attacker Commands
net.killerandroid.fightingfigures.FFCommands.STAB_ATTACK = 'stab_attack';

net.killerandroid.fightingfigures.FFCommands.SLASH_ATTACK = 'slash_attack';

net.killerandroid.fightingfigures.FFCommands.RANGED_ATTACK = 'ranged_attack';

net.killerandroid.fightingfigures.FFCommands.CHARGED_ATTACK = 'charged_attack';

net.killerandroid.fightingfigures.FFCommands.CLOSE_ATTACK = 'close_attack';

// Defender Commands
net.killerandroid.fightingfigures.FFCommands.TAUNT = 'taunt';

net.killerandroid.fightingfigures.FFCommands.THROW_SHIELD  = 'throw_shield';

net.killerandroid.fightingfigures.FFCommands.DEFLECT_DAMAGE = 'deflect_damage';

net.killerandroid.fightingfigures.FFCommands.BASH_SHIELD = 'bash_shield';

net.killerandroid.fightingfigures.FFCommands.ABSORB_DAMAGE = 'absorb_damage';

net.killerandroid.fightingfigures.FFCommands.prototype.handle = function(playerId, command) {
  console.log("Handling command = " + command);
  console.log("Matching command = " + net.killerandroid.fightingfigures.FFCommands.STAB_ATTACK);
  if (command === net.killerandroid.fightingfigures.FFCommands.HEAL_SELF) {
    // TODO
  } else if (command === net.killerandroid.fightingfigures.FFCommands.HEAL_CASTER) {
    // TODO
  } else if (command === net.killerandroid.fightingfigures.FFCommands.HEAL_ATTACKER) {
    // TODO
  } else if (command === net.killerandroid.fightingfigures.FFCommands.HEAL_DEFENDER) {
    // TODO
  } else if (command === net.killerandroid.fightingfigures.FFCommands.HEAL_ALL) {
    // TODO
  } else if (command === net.killerandroid.fightingfigures.FFCommands.WEAKEN) {
    // TODO
  } else if (command === net.killerandroid.fightingfigures.FFCommands.STUN) {
    // TODO
  } else if (command === net.killerandroid.fightingfigures.FFCommands.NUKE) {
    // TODO
  } else if (command === net.killerandroid.fightingfigures.FFCommands.SLOW) {
    // TODO
  } else if (command === net.killerandroid.fightingfigures.FFCommands.DOT) {
    // TODO
  } else if (command === net.killerandroid.fightingfigures.FFCommands.STAB_ATTACK) {
    this.performStabCommand(playerId);
  } else if (command === net.killerandroid.fightingfigures.FFCommands.SLASH_ATTACK) {
    // TODO
  } else if (command === net.killerandroid.fightingfigures.FFCommands.RANGED_ATTACK) {
    // TODO
  } else if (command === net.killerandroid.fightingfigures.FFCommands.CHARGED_ATTACK) {
    // TODO
  } else if (command === net.killerandroid.fightingfigures.FFCommands.CLOSE_ATTACK) {
    // TODO
  } else if (command === net.killerandroid.fightingfigures.FFCommands.TAUNT) {
    // TODO
  } else if (command === net.killerandroid.fightingfigures.FFCommands.THROW_SHIELD) {
    // TODO
  } else if (command === net.killerandroid.fightingfigures.FFCommands.DEFLECT_DAMAGE) {
    // TODO
  } else if (command === net.killerandroid.fightingfigures.FFCommands.BASH_SHIELD) {
    // TODO
  } else if (command === net.killerandroid.fightingfigures.FFCommands.ABSORB_DAMAGE) {
    // TODO
  }
}

net.killerandroid.fightingfigures.FFCommands.prototype.performStabCommand = function(playerId) {
  console.log("Perform stab command");
  document.getElementById("message_mob").value += "\nOuch!!!!";
}
