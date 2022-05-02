// AltAttackText.js
// Created on 10/5/2018

var objYeth = objYeth || {};

/*:
* @plugindesc This plugin is meant to allow the use of alternative
* text for attacks in the battle log.
* @author Yethwhinger
*
* @help This plugin allows customization of the text displayed in the
* battle log for attacks made by different enemies or by actors using
* different weapons. The text to be used can be specified by entering
* <attackText: string> in the Note fields of the Weapons and Enemies
* sections of the database. For example, a boomerang weapon's Note
* could contain <attackText: throws her boomerang.>.
*/

//----------------------------
// Changes to Game_Enemy
//----------------------------

objYeth.Game_Enemy_setupAttackText = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function (enemyId, x, y) {
    var attackText = $dataEnemies[enemyId].meta.attackText;
    objYeth.Game_Enemy_setupAttackText.call(this, enemyId, x, y);
    if (attackText) {
        this._attackText = attackText;
    }
};

//------------------------------
// Changes to Window_BattleLog
//------------------------------

Window_BattleLog.prototype.displayAction = function (subject, item) {
    var numMethods = this._methods.length;
    var weapon;
    var attackText;
    if (DataManager.isSkill(item)) {
        if (item.id == 1) {
            if (subject.isActor()) {
                if (!subject.hasNoWeapons()) {
                    weapon = subject.weapons()[0];
                    attackText = weapon.meta.attackText;
                }
            }
            else {
                attackText = subject._attackText;
            }
        }
        if (attackText) {
            this.push('addText', subject.name() + attackText);
        }
        else {
            if (item.message1) {
                this.push('addText', subject.name() + item.message1.format(item.name));
            }
            if (item.message2) {
                this.push('addText', item.message2.format(item.name));
            }
        }
    } else {
        this.push('addText', TextManager.useItem.format(subject.name(), item.name));
    }
    if (this._methods.length === numMethods) {
        this.push('wait');
    }
};