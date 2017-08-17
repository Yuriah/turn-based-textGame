// -------------
// GAME OBJECT
// -------------
let Game = {
  
}


// --------------------
// PLAYER CONSTRUCTOR
// --------------------
function Player(health, damage, defense, hitChance, luck, name) {
  this.name = name;
  this.level = 1;
  this.exp = 0;
  this.nextExp = 100;
  this.type = "player"
  
  this.battleValue = {
    health,
    damage,
    defense,
    hitChance,
    luck
  }
}


// ----------------
// PLAYER METHODS
// ----------------
Player.prototype.defend = function() {
  return {
    command: "attack",
    damageValue: this.battleValue.damage - Game.Math.scatterNumber(this.battleValue.damage)  // wird noch gemacht - ERLEDIGT
  }
}

Player.prototype.defend = function() { 
  return {
    command: "defend",
    defendValue: this.battleValue.defense - Game.Math.scatterNumber(this.battleValue.defense)  // wird noch gemacht - ERLEDIGT
  }
}

Player.prototype.addExp = function(gain) {
  this.exp += gain;
}

Player.prototype.levelUp = function() {
  this.battleValue.health += 20;
  this.battleValue.damage += 10;
  this.battleValue.defense += 5;
  this.battleValue.hitChance += 10;
  this.battleValue.luck += 5;
  this.level += 1;
}

Player.prototype.setExpForLevelUp = function() {
  this.nextExp *= 1.5;
  this.exp = 0;
}

Player.prototype.checkForLevelUp = function() {
  return (this.exp >= this.nextExp) ? true : false;
}


// -------------------
// ENEMY CONSTRUCTOR
// -------------------
function Enemy(health, damage, defense, hitChance, luck, name, level, givingExp) {
  this.name = name;
  this.level = level;
  this.givingExp = givingExp;
  this.type = "enemy";
  
  this.battleValue = {
    health,
    damage,
    defense,
    hitChance,
    luck
  }
}


// ---------------
// ENEMY METHODS
// ---------------
Enemy.prototype.attack = function() {
  return {
    command: "attack",
    damageValue: this.battleValue.damage - Game.Math.scatterNumber(this.battleValue.damage)  // wird noch gemacht - ERLEDIGT
  }
}

Enemy.prototype.defend = function() {
  return {
    command: "defend",
    defendValue: this.battleValue.defense - Game.Math.scatterNumber(this.battleValue.defense)  // wird noch gemacht - ERLEDIGT
  }
}


// -----------
// GAME.MATH 
// -----------
Game.Math = {
  
  scatterNumber: function(damage) {
    return Math.floor(Math.random() * damage) + 1;
  },
  
  randomNumberUntil: function(maxNumber) {
    return Math.floor(Math.random() * maxNumber);
  },
  
}


// ---------------
// GAME.MESSAGES
// ---------------
Game.Message = {
  attackMessage: function(source) {
    let randomNum = Game.Math.randomNumberUntil(5);
    let attackMessage = [`${source} takes a swing for an attack!`,
                         `${source} takes his chance for an attack!`,
                         `${source} leads towards to strike!`,
                         `${source} is striking hard!`,
                         `${source} reaches back for a strike!`
                        ];
    
    return attackMessage[randomNum];
  },
  
  dealtDamageMessage: function(source, target, damage) {
    return `${source} dealt ${dmg} to ${target}`;
  },
  
  defendMessage: function() {
    return `${source} blocked off ${dmg} damage!`;
  },
  
}


// ----------
// GAME.DOM
// ----------
Game.DOM = {
  property: {
    boxState: false
  },
  
  function: {
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
        Game.DOM.property.boxState = true;  // bisschen komisch
      }
    },
    
    drawStats: function(target, health, dmg, defense, hitChance, luck, name) {
      let stats = ["Health", "Damage", "Defense", "HitChance", "Luck", "Title"];
      let length = arguments.length - 1;
      
      for (let i = 0; i < length; i++) {
        $(`${target}${stats[i]}`).innerHTML = arguments[i + 1];
      }
    }
  }
}


// --------------------------
// PLAYER AND ENEMY OBJECTS
// --------------------------
                      // health, dmg, defense, hitChance, luck, name
let player = new Player(100, 50, 50, 50, 50, "BrotherInArms");

                // health, dmg, defense, hitChance, luck, name, lvl, exp
let Enemies = {
  wolf: new Enemy(100, 100, 100, 100, 100, "wolf", 1, 20),
  werewolf: new Enemy(150, 100, 200, 200, 200, "werewolf", 2, 50),
  uberwolf: new Enemy(200, 200, 200, 200, 200, "uberwolf", 3, 100)
}


// ------------------
// HELPER FUNCTIONS
// ------------------
function $(id) {
  return document.getElementById(id);
}


// -------------
// GAME.BATTLE
// -------------
Game.Battle = {
  
}


// ------------------------
// GAME.BATTLE PROPERTIES
// ------------------------
Game.Battle.property = {
  

  newRound: false,
  battleState: false,
  enemyFound: false,
  playerCommand: undefined,  // HINT: Muss ich noch anschauen
  currentEnemy: undefined,
  currentPlayer: undefined,  // Könnte komisch sein
  
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


// -----------------------
// GAME.BATTLE FUNCTIONS
// -----------------------
Game.Battle.function = {
  

  disableNonBattleButtons: function() {
    Game.Battle.property.nonActionButton.startBattle = false;
    Game.Battle.property.nonActionButton.lookForEnemy = false;
    Game.Battle.property.nonActionButton.showEnemies = false;
    Game.Battle.property.nonActionButton.dummy = false;
    Game.Battle.property.nonActionButton.credits = false;
    Game.Battle.property.nonActionButton.author = false;
    Game.Battle.property.nonActionButton.shop = false;
  },
  
  setGameBattleProperties: function() {
    Game.Battle.property.battleState = true;
    Game.Battle.property.newRound = true;
    Game.Battle.property.currentPlayer = player;  // wird noch angeschaut
  },
  
  resetBattleProperties: function() {
    Game.Battle.property.battleState = false;
    Game.Battle.property.newRound = false;
    Game.Battle.property.enemyFound = false;
    Game.Battle.property.currentEnemy = undefined;
    Game.Battle.property.currentPlayer = undefined;
    Game.Battle.property.playerCommand = undefined;
    
    Game.Battle.property.nonActionButton.startBattle = true;
    Game.Battle.property.nonActionButton.lookForEnemy = true;
    Game.Battle.property.nonActionButton.showEnemies = true;
    Game.Battle.property.nonActionButton.dummy = true;
    Game.Battle.property.nonActionButton.credits = true;
    Game.Battle.property.nonActionButton.author = true;
    Game.Battle.property.nonActionButton.shop = true;
  },
  
  pickEnemy: function() {
    let totalEnemies = Object.keys(Enemies).length;
    let randomNum = Game.Math.randomNumberUntil(totalEnemies)
    return Object.keys(Enemies)[randomNum];
  },
  
  lookForEnemy: function() {
    let enemy = Game.Battle.function.pickEnemy();
    
    if (Game.Battle.property.enemyFound === false) {
      Game.Battle.property.currentEnemy = Enemies[enemy];
      Game.Battle.property.enemyFound = true;
      Game.Battle.property.boxState = true;  // Ist im DOM, kommt noch - ERLEDIGT
      
      Game.DOM.function.drawStats("e",
                                  Enemies[enemy].battleValue.health,
                                  Enemies[enemy].battleValue.damage,
                                  Enemies[enemy].battleValue.defense,
                                  Enemies[enemy].battleValue.hitChance,
                                  Enemies[enemy].battleValue.luck,
                                  Enemies[enemy].name
                                 );
      Game.DOM.function.updateBox("Looking for enemy");
      Game.DOM.function.drawBox();
    }
  }
}


// -----------
// GAME.LOOP
// -----------
Game.Loop = {
  
  initBattle: function() {
    if (Game.Battle.property.enemyFound === true && Game.Battle.property.nonActionButton.startBattle === true) {
      console.log("Battle is starting");
      
      function setBattlePropertiesAndFunctions() {
        Game.Battle.function.disableNonBattleButtons();
        Game.Battle.function.setGameBattleProperties();
      }
      
      setBattlePropertiesAndFunctions();
    }
  },
  
  newRound: function(event) {
    if (Game.Battle.property.battleState === true && Game.Battle.property.newRound === true) {
      console.log("New Round!");
      
      Game.Battle.property.playerCommand = event.target.id;  // Muss noch anderster werden, gefällt mir nicht
      
      Game.Loop.executeRound();
    }
  },
  
  executeRound: function() {
    
    function inputP() {
      
    }
    
    function inputAI() {
      
    }
    
    function whosFirst() {
      
    }
    
    function evaluateRound() {
      
    }
  }
}

console.log(Game.Battle);


// ------------------
// EVENT LISTENERS
// ------------------
window.onload = function() {
  $("AttackB").addEventListener("click", Game.Loop.newRound);
  $("DefendB").addEventListener("click", Game.Loop.newRound);
  $("startBattleB").addEventListener("click", Game.Loop.initBattle);
  $("lookForBattleB").addEventListener("click", Game.Battle.function.lookForEnemy);
  $("main").addEventListener("click", Game.DOM.function.closeBox);
}