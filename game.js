// -------------
// GAME OBJECT
// -------------
let Game = {
  
}



// --------------------
// PLAYER CONSTRUCTOR
// --------------------
function Player(health, damage, defense, hitChance, luck, name) {
  this.fightValue = {
    health,
    damage,
    defense,
    hitChance,
    luck
  }
  this.general = {
    name,
    level: 1,
    exp: 0,
    nextExp: 100,
    type: "player"
  }
}



// --------------------
// PLAYER METHODS
// --------------------
Player.prototype.attack = function() {
  
  return {
    damageVal: this.fightValue.damage - Game.battle.helperFn.scatterNum(this.fightValue.damage),
    attackMsg: Game.battle.function.generateAttackMsg(this.general.name)
  }
}

Player.prototype.defend = function() {
  let val = this.fightValue.defense - Game.battle.helperFn.scatterNum(this.fightValue.defense);
  
  return {
    defendedVal: val,
    defenseMsg: Game.battle.function.generateDefendMsg(val)
  }
}

Player.prototype.addExp = function(gain) {
  this.general.exp += gain;
}

Player.prototype.levelUp = function() {
  this.fightValue.health += 20;
  this.fightValue.damage += 10;
  this.fightValue.defense += 5;
  this.fightValue.hitChance += 10;
  this.fightValue.luck += 5;
  this.general.level += 1;
}

Player.prototype.setExpForLevelUp = function() {
  this.general.nextExp *= 1.5;
  this.general.exp = 0;
}

Player.prototype.checkForLevelUp = function() {
  let value = (this.general.exp >= this.general.nextExp) ? true : false;
  return value;
}



// ------------------------
// ENEMY CONSTRUCTOR
// ------------------------
function Enemy(health, damage, defense, hitChance, luck, name, level, givingExp) {
  this.fightValue = {
    health,
    damage,
    defense,
    hitChance,
    luck
  }
  this.general = {
    name,
    level,
    givingExp,
    type: "enemy"
  }
}



// ------------------------
// ENEMY METHODS
// ------------------------
Enemy.prototype.attack = function() {
  
  return {
    damageVal: this.fightValue.damage - Game.battle.helperFn.scatterNum(this.fightValue.damage),
    attackMsg: Game.battle.function.generateAttackMsg(this.general.name)
  }
}

Enemy.prototype.defend = function() {
  let val = this.fightValue.defense - Game.battle.helperFn.scatterNum(this.fightValue.defense);
  
  return {
    defendedVal: val,
    defenseMsg: Game.battle.function.generateDefendMsg(val)
  }
}



// ---------------------------
// PLAYER AND ENEMY OBJECTS
// ---------------------------
                 // health, dmg, defense, hitChance, luck, name
let player = new Player(100, 50, 50, 50, 50, "BrotherInArms");

                  // health, dmg, defense, hitChance, luck, name, lvl, exp
let enemies = {
  wolf: new Enemy(100, 100, 100, 100, 100, "wolf", 1, 20),
  werewolf: new Enemy(150, 100, 200, 200, 200, "werewolf", 2, 50),
  uberwolf: new Enemy(200, 200, 200, 200, 200, "uberwolf", 3, 100)
}



// ---------------------------
// GENERAL HELPER FUNCTIONS
// ---------------------------
function $(id) {
  return document.getElementById(id);
}



// ------------
// GAME LOOP
// ------------
let gameloop = {
  battle: {
    initBattle: function(event) {
      if (gameloop.property.enemyFound === true) {
        console.log("Battle is starting!");
        gameloop.property.battleState = true;
        gameloop.helperFn.disableNonActionButtons();
      } else {
        console.log("No enemy is there to fight against");
      }
    },
    
    newRound: function(event) {
      if (gameloop.property.battleState === true) {
        console.log("New Round!")
        gameloop.property.playerCommand = event.target.id;
        
        gameloop.battle.whileRound();
        
      } else {
        console.log("No battle is occuring to fight on")
      }
    },
    
    whileRound: function() {
//      getInputP(gameloop.property.playerCommand);
//      getInputAI();
      decideWhosFirst();
      executeRound();
    },
    
    battleNotFinished: function() {
      
    },
    
    battleFinished: function() {
      player.checkForLevelUp();
    }
  }
}


gameloop.property = {
  newRound: true,
  battleState: false,
  enemyFound: false,
  interval: "empty",
  playerCommand: "",
  
  nonActionButton: {
    startBattle: true,
    lookForEnemy: true,
    showEnemies: true,
    dummy: true,
    credits: true,
    author: true,
    shop: true
  }
}

gameloop.helperFn = {
  disableNonActionButtons: function() {
    gameloop.property.nonActionButton.startBattle = false;
    gameloop.property.nonActionButton.lookForEnemy = false;
    gameloop.property.nonActionButton.showEnemies = false;
    gameloop.property.nonActionButton.dummy = false;
    gameloop.property.nonActionButton.credits = false;
    gameloop.property.nonActionButton.author = false;
    gameloop.property.nonActionButton.shop = false;
  },
  resetActionValues: function() {
    
  }
}


// ------------------------
// GAME LOOP - FUNCTIONS
// ------------------------

function getInputP(command) {
  if (command === "AttackB") {
    console.log("Player attacks");
    
    return {
      p: player.attack()
    }
  } else if (command === "DefendB") {
    console.log("Player defends");
    
    return {
      p: player.defend()
    }
  }
}



function getInputAI() {
  
}

function decideWhosFirst() {
  
}

function executeRound(command) {
  let inputP = getInputP(gameloop.property.playerCommand);
  console.log(inputP);
}



// ----------------------------------------
// BATTLE PROPERTIES AND FUNCTIONS
// ----------------------------------------
Game.battle = {
  property: {
    
  },
  
  
  function: {
    generateAttackMsg: function() {
      let randomNum = Math.floor(Math.random() * 5) + 1;
      let arrMsg = ["You take a swing for an attack!",
                    "You take your chance to attack!",
                    "You lead your strike towards your foe!",
                    "You are striking hard!",
                    "You reach back for a strike!"
                   ]
      let msg = arrMsg[randomNum];              
    },
    
    playerDealsDmgMsg: function(target, dmg) {
      return `You dealt ${dmg} to ${target}`;
    },
    
    generateDefendMsg: function(dmg) {
      return `You blocked off ${dmg} damage!`;
    },
    
    pickEnemy: function() {
      let len = Object.keys(enemies).length;
      let randomNum = Math.floor(Math.random() * len);
      return Object.keys(enemies)[randomNum];
    },
    
    lookForEnemy: function() {
      let e = Game.battle.function.pickEnemy();
      
      gameloop.property.enemyFound = true;
      Game.DOM.property.boxState = false;

      Game.DOM.function.piece.drawStats("e",
      enemies[e].fightValue.health,
      enemies[e].fightValue.damage,
      enemies[e].fightValue.defense,
      enemies[e].fightValue.hitChance,
      enemies[e].fightValue.luck,
      enemies[e].general.name
      )
      Game.DOM.function.full.displayBox("Looking for a enemy...");
    }
  },
  
  
  helperFn: {
    scatterNum: function(dmg) {
      return Math.floor(Math.random() * dmg) + 1;
    }
  }
}



// -------------------------------
// DOM PROPERTIES AND FUNCTIONS
// -------------------------------
Game.DOM = {
  property: {
    boxState: false
  },
  
  
  function: {
    full: {
      displayBox: function(boxContent) {
        Game.DOM.function.piece.updateBox(boxContent);
        Game.DOM.function.piece.drawBox();
      }
    },
    
    
    piece: {
      updateBox: function(boxContent) {
        $("modalContent").innerHTML = boxContent;
      },
      
      drawBox: function() {
        $("modalContainer").style.display = "inherit";
      },
      
      closeBox: function() {
        let modal = $("modalContainer");

        if (Game.DOM.property.boxState === true) {
          Game.DOM.property.boxState = false;
          modal.style.display = "none";
        } else {
          Game.DOM.property.boxState = true;
        }
      },
      
      drawStats: function(target, health, dmg, defense, hitChance, luck, name) {
        let i;
        let arrName = ["Health", "Damage", "Defense", "HitChance", "Luck", "Title"];
        let len = arguments.length - 1;

        for (i = 0; i < len; i++) {
          $(`${target}${arrName[i]}`).innerHTML = arguments[i + 1];
        }
      }
    }
  }
}



// ------------------
// EVENT LISTENERS
// ------------------
window.onload = function() {
  $("AttackB").addEventListener("click", gameloop.battle.newRound);
  $("DefendB").addEventListener("click", gameloop.battle.newRound);
  $("startBattleB").addEventListener("click", gameloop.battle.initBattle);
  $("lookForBattleB").addEventListener("click", Game.battle.function.lookForEnemy);
  $("main").addEventListener("click", Game.DOM.function.piece.closeBox);
}