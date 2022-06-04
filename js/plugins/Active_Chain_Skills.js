//=============================================================================
// Visustella Active Chain Skills
// Version: 1.1
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.Visustella_ActiveChainSkills = true;
// Initialize Alias Object
var Visustella = Visustella || {} ; Visustella.ActiveChainSkills = Visustella.ActiveChainSkills || {};
//=============================================================================
 /*:
 * @author Visustella
 * @plugindesc
 * This script allows you to chain skills in a combo.
 *
 * @param Minimum Time
 * @desc How many frames minimum for chain allowance.
 * @type number 
 * @default 120
 *
 * @param Title Text
 * @desc Text displayed above the active chain skills as a title.
 * @type text 
 * @default Active Chain Skills
 *
 * @param Title Font Size
 * @desc Font size of the title text of active chain skills.
 * @type number
 * @default 20
 *
 * @param ActiveSkillSound 
 * @text Active Skill Sound
 * @type struct<SkillSoundEffect>
 * @dir audio/se
 * @desc Sound effect played whenever an active chain skill has been selected.
 *
 * @param ChainInputData
 * @text Chain Input Data
 * @type struct<SkillInput>[]
 * @desc Array of chain input data
 *
 ******************************************************************************
 * @help
 * With the Active Chain Skills plugin, when the player uses a Skill that  
 * offers a potential skill chain, new skills will be displayed on the left  
 * of the screen if the character also knows that skill. Chain skills can be 
 * endlessly chained until either the actor runs out of MP/TP  or until the  
 * character performs a chained skill without any skills to chain off of.
 *
 * When the player presses the button assigned to the Chain Skill, that skill  
 * is selected and will be used next.
 *
 *-----------------------------------------------------------------------------
 * * Skill Notetags - These notetags go in the skill notebox in the database.
 *-----------------------------------------------------------------------------
 * <ChainSkill: SkillId, Input>

 These notetags go in the skill notebox in the database:
 *  ^ This note tag allows you to set which skills can be chained to the one
 *    that has this note tag. Order in the notes reflects order of choice.
 *  ^ SkillId: Id of the skill that can be chained into.
 *  ^ Input: Name of the Input. 
 (up, down, left, right, ok, cancel, control, tab, etc..)
 *
 * Examples:
 * <ChainSkill: 15, up>
 * <ChainSkill: 16, down>
 * <ChainSkill: 17, left>
 * <ChainSkill: 18, right>
 *
 * <ChainOnly>  (Case Sensitive.)
 *  ^ This makes the skill only usable only in chains. (Does not affect enemies.)
 *
 * Parameters:
 * Minimum Time:
 * The default for this is 120 frames. This is how long the player will have to 
 * activate a chain before the window disappears.
 * 
 * Title Text:
 * This appears at the top of the window when the player is prompted to perform 
 * a chain.
 *
 * Title Font Size:
 * This is the size the Title Text will be displayed at.
 *
 * Active Skill Sound:
 * This is to customise the sound that will play when the player activates a 
 * new chain.
 *
 * Chain Input Data
 * This is used to customise which buttons can be used to activate a skill chain, 
 * and how text appears for the player.
 *
 * InputName:
 * The name of the input on the keyboard, i.e. up, down, left, right, ok, cancel
 *
 * ON Text:  
 * This will appear if the player has the resources available to use this 
 * skill chain.
 *
 * OFF Text: 
 * This will appear if the player does not have the resources available to 
 * use this skill chain, or if another has already been selected.
 *
 * ACT Text: 
 * This will appear if the player has chosen this skill chain.
 *
 *  
 */
/*~struct~SkillSoundEffect:
 * @param name
 * @type file
 * @dir audio/se/ 
 * @desc Name of the sound effect to play.
 *
 * @param volume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @desc Volume for the sound effect.
 *
 * @param pitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @desc Pitch for the sound effect.
 *
 * @param pan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc Pan for the sound effect.
 *
*/ 
/*~struct~SkillInput:
 * @param InputName
 * @type text
 * @desc Name of the input.
 * 
 * @param ONtext
 * @text ON Text
 * @type text
 * @desc Help text here
 *
 * @param OFFtext
 * @text OFF Text
 * @type text
 * @desc Help text here 
 *
 * @param ACTtext
 * @text ACT Text
 * @type text
 * @desc Help text here  
 *
*/ 
//=============================================================================

// Use Strict  
"use strict";

// If Not RPG Maker MV
if (Utils.RPGMAKER_NAME !== "MV") SceneManager.exit();

(function($) {
var _0x7859=['startChainSkillInputWait','Game_BattlerBase_meetsSkillConditions','displayAction','visible','isValid','_targetIndex','boxHeight','_waitMode','subject','src','onBattleEnd','contents','pitch','onBattleStart','isSkill','fontSize','setActiveChainSkill','startAction','normalColor','Parameters','addActiveSkillChain','drawBackgroundColor','currentAction','activeSkillSound','exec','params','setSkill','hideChainSkillList','.js','rgba(0,\x200,\x200,\x20192)','gradientFillRect','drawChainSkills','Game_Battler_onBattleStart','extractActiveChainSkillMetaData','Title\x20Font\x20Size','chainTitle','activate','update','ACTtext','Utils','parseSound','Scene_Battle_CreateAllWindows','splice','paintOpacity','clear','inputTextSettings','_skill','width','inputData','iconIndex','format','fittingHeight','chainSkillList','_enabled','setActiveChainSkillWindow','note','minimunInputTime','Window_BattleLog_displayActionResults','name','SKILL','prototype','\x5ci[%1]%2','_activeChainSkillInputCounter','bind','initialize','createChainSkillWindow','setTarget','length','resetFontSettings','setWaitMode','_activeChainEnabled','showChainSkillList','hide','Window_BattleLog_update','setup','act','InputName','titleFontSize','Window_BattleLog_startAction','isLearnedSkill','opacity','DataManager_onLoad','basename','ONtext','OFFtext','_lastIndex','Title\x20Text','ChainInputData','_actions','isActor','addChild','Window_BattleLog_updateWaitMode','updateChainkSkillInput','Window_BattleLog_initialize','_chainInput','show','parameters','push','_activeChainSkill','volume','defineProperty','isChainSkillRestrict','ChainOnly','fontItalic','fillRect','disableActiveChain','createAllWindows','chainSkillInput','call','meta','enableActiveChain','max','keys','_chainSkills','pan','constructor','standardPadding','off','parse','apply','rgba(0,\x200,\x200,\x200)','chainInput','create','_activeChainSkillWindow','playSe','drawText','Game_Action_isValid','refresh','meetsSkillConditions','updateWaitMode','processCustomCode','lineHeight','onLoad','_battler','canUse','displayActionResults'];(function(_0x34306a,_0x7859ed){var _0x4e98fa=function(_0x66dd5d){while(--_0x66dd5d){_0x34306a['push'](_0x34306a['shift']());}};_0x4e98fa(++_0x7859ed);}(_0x7859,0x13f));var _0x4e98=function(_0x34306a,_0x7859ed){_0x34306a=_0x34306a-0x0;var _0x4e98fa=_0x7859[_0x34306a];return _0x4e98fa;};$[_0x4e98('0x80')]=$[_0x4e98('0x80')]||{};$[_0x4e98('0x80')][_0x4e98('0x6c')]=$[_0x4e98('0x80')][_0x4e98('0x6c')]||{};$[_0x4e98('0x80')][_0x4e98('0x6c')][_0x4e98('0x81')]=function(_0x290638,_0x39a21d=!![]){if(_0x39a21d&&_0x290638===''){return{'name':'','volume':0x0,'pitch':0x0,'pan':0x0};}else{let _0x241454=JSON['parse'](_0x290638);_0x241454[_0x4e98('0x34')]=Number(_0x241454[_0x4e98('0x34')]);_0x241454[_0x4e98('0x65')]=Number(_0x241454[_0x4e98('0x65')]);_0x241454[_0x4e98('0x43')]=Number(_0x241454[_0x4e98('0x43')]);return _0x241454;}};let path=require('path');let parameters=PluginManager[_0x4e98('0x31')](decodeURIComponent(path[_0x4e98('0x23')](document['currentScript'][_0x4e98('0x62')],_0x4e98('0x75'))));$[_0x4e98('0x72')]={};$[_0x4e98('0x72')]['chainTitle']=String(parameters[_0x4e98('0x27')]||'Active\x20Chain\x20Skills');$[_0x4e98('0x72')][_0x4e98('0x1e')]=Number(parameters[_0x4e98('0x7b')]||0x14);$[_0x4e98('0x72')][_0x4e98('0x9')]=Number(parameters['Minimun\x20Time']||0x78);$[_0x4e98('0x72')][_0x4e98('0x70')]=$['Utils'][_0x4e98('0x6c')][_0x4e98('0x81')](parameters['ActiveSkillSound']);$[_0x4e98('0x72')]['inputData']={};let inputList=JSON[_0x4e98('0x47')](parameters[_0x4e98('0x28')]);for(var i=0x0;i<inputList[_0x4e98('0x14')];i++){let data=JSON['parse'](inputList[i]);$['params'][_0x4e98('0x1')][data[_0x4e98('0x1d')]]={'on':data[_0x4e98('0x24')],'off':data[_0x4e98('0x25')],'act':data[_0x4e98('0x7f')]};}$['DataManager_onLoad']=DataManager[_0x4e98('0x55')];DataManager[_0x4e98('0x55')]=function(_0x31d732){$[_0x4e98('0x22')][_0x4e98('0x3d')](this,_0x31d732);var _0x673e4d=_0x31d732,_0x295812=null;switch(_0x31d732){case $dataSkills:_0x295812=_0x4e98('0xc');break;}if(_0x295812!==null){if(Array['isArray'](_0x673e4d)){for(var _0x472a65=0x0;_0x472a65<_0x673e4d[_0x4e98('0x14')];_0x472a65++){var _0x3b6c18=_0x673e4d[_0x472a65];if(_0x3b6c18){this[_0x4e98('0x7a')](_0x3b6c18,_0x295812);}}}}};DataManager[_0x4e98('0x7a')]=function(_0x30d2d3,_0x27fbed){if(_0x30d2d3['note'][_0x4e98('0x14')]<=0x0){return;}if(_0x27fbed===_0x4e98('0xc')){_0x30d2d3[_0x4e98('0x3e')][_0x4e98('0x5')]={};var _0x4351cc=/<ChainSkill:(.+),(.+)>/ig;var _0x4b1800=_0x30d2d3[_0x4e98('0x8')],_0x255781;while((_0x255781=_0x4351cc[_0x4e98('0x71')](_0x4b1800))!==null){_0x30d2d3[_0x4e98('0x3e')][_0x4e98('0x5')][_0x255781[0x2]['trim']()]=Number(_0x255781[0x1]);}}};BattleManager[_0x4e98('0x7')]=function(_0x54bf3d){this[_0x4e98('0x4c')]=_0x54bf3d;};$['Game_BattlerBase_meetsSkillConditions']=Game_BattlerBase[_0x4e98('0xd')][_0x4e98('0x51')];Game_BattlerBase[_0x4e98('0xd')][_0x4e98('0x51')]=function(_0x568468){if(this[_0x4e98('0x36')](_0x568468)){return![];}return $[_0x4e98('0x5a')][_0x4e98('0x3d')](this,_0x568468);};Game_BattlerBase[_0x4e98('0xd')][_0x4e98('0x36')]=function(_0x4df4da){if(!this[_0x4e98('0x2a')]()){return![];}if(!$gameParty['inBattle']()){return![];}if(!_0x4df4da[_0x4e98('0x3e')][_0x4e98('0x37')]){return![];}return!this[_0x4e98('0x17')];};$[_0x4e98('0x79')]=Game_Battler['prototype']['onBattleStart'];$['Game_Battler_onBattleEnd']=Game_Battler[_0x4e98('0xd')][_0x4e98('0x63')];Game_Battler[_0x4e98('0xd')][_0x4e98('0x66')]=function(){$[_0x4e98('0x79')][_0x4e98('0x3d')](this);this[_0x4e98('0x17')]=![];};Game_Battler[_0x4e98('0xd')][_0x4e98('0x63')]=function(){$['Game_Battler_onBattleEnd'][_0x4e98('0x3d')](this);this[_0x4e98('0x17')]=![];};Game_Battler[_0x4e98('0xd')][_0x4e98('0x3f')]=function(){if(this['isActor']()){this['_activeChainEnabled']=!![];}};Game_Battler[_0x4e98('0xd')][_0x4e98('0x3a')]=function(){if(this[_0x4e98('0x2a')]()){this[_0x4e98('0x17')]=![];}};Game_Battler[_0x4e98('0xd')]['addActiveSkillChain']=function(_0x3ba11e,_0x4689a4){var _0xdf76da=new Game_Action(this);_0xdf76da[_0x4e98('0x69')](_0x3ba11e,_0x4689a4);this[_0x4e98('0x29')][_0x4e98('0x83')](0x1,0x0,_0xdf76da);};$['Game_Action_isValid']=Game_Action[_0x4e98('0xd')][_0x4e98('0x5d')];Game_Action[_0x4e98('0xd')][_0x4e98('0x69')]=function(_0x57885b,_0x25d808){this[_0x4e98('0x73')](_0x57885b);if(_0x25d808===undefined){_0x25d808=this[_0x4e98('0x61')]()[_0x4e98('0x6f')][_0x4e98('0x5e')];}this[_0x4e98('0x13')](_0x25d808);this[_0x4e98('0x33')]=!![];};Game_Action[_0x4e98('0xd')]['isValid']=function(){if(this[_0x4e98('0x33')]){this[_0x4e98('0x61')]()[_0x4e98('0x3f')]();}var _0x498153=$[_0x4e98('0x4f')][_0x4e98('0x3d')](this);if(this[_0x4e98('0x33')]){this[_0x4e98('0x61')]()['disableActiveChain']();}return _0x498153;};$[_0x4e98('0x82')]=Scene_Battle[_0x4e98('0xd')]['createAllWindows'];Scene_Battle[_0x4e98('0xd')][_0x4e98('0x3b')]=function(){$[_0x4e98('0x82')][_0x4e98('0x3d')](this);this[_0x4e98('0x12')]();};Scene_Battle[_0x4e98('0xd')][_0x4e98('0x12')]=function(){this[_0x4e98('0x4c')]=new Window_ChainSkillList();this[_0x4e98('0x2b')](this[_0x4e98('0x4c')]);BattleManager['setActiveChainSkillWindow'](this[_0x4e98('0x4c')]);};$[_0x4e98('0x2e')]=Window_BattleLog[_0x4e98('0xd')]['initialize'];$[_0x4e98('0x1f')]=Window_BattleLog[_0x4e98('0xd')][_0x4e98('0x6a')];$[_0x4e98('0x1a')]=Window_BattleLog[_0x4e98('0xd')][_0x4e98('0x7e')];$[_0x4e98('0x2c')]=Window_BattleLog[_0x4e98('0xd')][_0x4e98('0x52')];$['Window_BattleLog_displayAction']=Window_BattleLog[_0x4e98('0xd')][_0x4e98('0x5b')];$[_0x4e98('0xa')]=Window_BattleLog[_0x4e98('0xd')][_0x4e98('0x58')];Window_BattleLog[_0x4e98('0xd')][_0x4e98('0x11')]=function(){$[_0x4e98('0x2e')][_0x4e98('0x3d')](this);this[_0x4e98('0xf')]=0x0;this[_0x4e98('0x33')]=0x0;};Window_BattleLog['prototype'][_0x4e98('0x53')]=function(_0x3ce39d){_0x3ce39d();};Window_BattleLog[_0x4e98('0xd')][_0x4e98('0x6a')]=function(_0x1b7aa3,_0x501c71,_0x239e11){this[_0x4e98('0x32')](_0x4e98('0x53'),function(){_0x1b7aa3[_0x4e98('0x3f')]();});var _0x3d5082=_0x501c71['item']();this['push'](_0x4e98('0x18'),_0x1b7aa3,_0x3d5082,_0x501c71[_0x4e98('0x5e')]);this[_0x4e98('0x32')](_0x4e98('0x53'),$[_0x4e98('0x1f')][_0x4e98('0x10')](this,_0x1b7aa3,_0x501c71,_0x239e11));this[_0x4e98('0x32')](_0x4e98('0x59'));};Window_BattleLog[_0x4e98('0xd')][_0x4e98('0x58')]=function(_0x567b21,_0x3aceb3){$['Window_BattleLog_displayActionResults'][_0x4e98('0x3d')](this,_0x567b21,_0x3aceb3);if(_0x567b21[_0x4e98('0x2a')]()){var _0x459962=BattleManager[_0x4e98('0x4c')];if(_0x459962[_0x4e98('0x5c')]){this['push'](_0x4e98('0x16'),_0x4e98('0x3c'));this[_0x4e98('0x32')](_0x4e98('0x74'));}this[_0x4e98('0x32')]('processCustomCode',function(){_0x567b21[_0x4e98('0x3a')]();});}};Window_BattleLog[_0x4e98('0xd')][_0x4e98('0x18')]=function(_0x2c1b99,_0x8809d6,_0x54b96e){if(_0x2c1b99===undefined){return;}if(!_0x2c1b99['isActor']()){return;}if(!DataManager[_0x4e98('0x67')](_0x8809d6)){return;}var _0x592014=BattleManager[_0x4e98('0x4c')];this['_activeChainSkill']=0x0;_0x592014['setup'](_0x2c1b99,_0x8809d6,_0x54b96e);if(_0x592014['_chainSkills']['length']>0x0){_0x592014['show']();}};Window_BattleLog[_0x4e98('0xd')][_0x4e98('0x74')]=function(){this[_0x4e98('0x33')]=0x0;const _0x522acc=BattleManager['_activeChainSkillWindow'];_0x522acc[_0x4e98('0x19')]();_0x522acc[_0x4e98('0x26')]=null;};Window_BattleLog[_0x4e98('0xd')][_0x4e98('0x59')]=function(){this[_0x4e98('0xf')]=$[_0x4e98('0x72')][_0x4e98('0x9')];};Window_BattleLog[_0x4e98('0xd')][_0x4e98('0x7e')]=function(){var _0xdde924=BattleManager[_0x4e98('0x4c')];if(_0xdde924&&_0xdde924[_0x4e98('0x5c')]){this[_0x4e98('0x2d')]();}$[_0x4e98('0x1a')]['call'](this);};Window_BattleLog[_0x4e98('0xd')][_0x4e98('0x2d')]=function(){var _0x585f2b=BattleManager[_0x4e98('0x4c')];var _0x415fc5=_0x585f2b[_0x4e98('0x42')];if(this['_activeChainSkill']===0x0){for(var _0x47a4e2=0x0;_0x47a4e2<_0x415fc5[_0x4e98('0x14')];_0x47a4e2++){var _0x2d9629=_0x415fc5[_0x47a4e2][0x0];var _0x45a847=_0x415fc5[_0x47a4e2][0x1];if(Input['isTriggered'](_0x2d9629)){var _0x356bc3=_0x585f2b[_0x4e98('0x56')];if(!_0x356bc3[_0x4e98('0x57')](_0x45a847)){continue;}if(!_0x356bc3[_0x4e98('0x20')](_0x45a847['id'])){continue;}AudioManager[_0x4e98('0x4d')]($[_0x4e98('0x72')][_0x4e98('0x70')]);_0x585f2b[_0x4e98('0x4a')]=_0x2d9629;this['_activeChainSkillInputCounter']=0xc;this['_activeChainSkill']=_0x45a847['id'];_0x356bc3[_0x4e98('0x6d')](_0x45a847['id'],_0x585f2b[_0x4e98('0x26')]);break;}}}if(this[_0x4e98('0xf')]>0x0){this[_0x4e98('0xf')]--;return!![];}};Window_BattleLog[_0x4e98('0xd')][_0x4e98('0x52')]=function(){if(this[_0x4e98('0x60')]===_0x4e98('0x3c')){if(this[_0x4e98('0xf')]>0x0){return!![];}}return $[_0x4e98('0x2c')][_0x4e98('0x3d')](this);};function Window_ChainSkillList(){this[_0x4e98('0x11')][_0x4e98('0x48')](this,arguments);}Window_ChainSkillList[_0x4e98('0xd')]=Object[_0x4e98('0x4b')](Window_Base[_0x4e98('0xd')]);Window_ChainSkillList[_0x4e98('0xd')][_0x4e98('0x44')]=Window_ChainSkillList;Window_ChainSkillList[_0x4e98('0xd')][_0x4e98('0x11')]=function(){var _0x3306c1=Math[_0x4e98('0x40')](Math['round'](Graphics['boxWidth']/0x2),0x1c2);Window_Base[_0x4e98('0xd')]['initialize'][_0x4e98('0x3d')](this,-this[_0x4e98('0x45')](),0x0,_0x3306c1,this[_0x4e98('0x4')](0x6));this[_0x4e98('0x21')]=0x0;this[_0x4e98('0x26')]=null;this[_0x4e98('0x19')]();};Window_ChainSkillList[_0x4e98('0xd')][_0x4e98('0x1b')]=function(_0xf9f180,_0x6b1bb9,_0x4e4f10){this[_0x4e98('0x56')]=_0xf9f180;this[_0x4e98('0x87')]=_0x6b1bb9;if(_0x4e4f10===undefined){if(this[_0x4e98('0x26')]===null||this[_0x4e98('0x26')]===undefined){this['_lastIndex']=0x0;};}else{this[_0x4e98('0x26')]=_0x4e4f10;}this[_0x4e98('0x42')]=[];if(_0x6b1bb9[_0x4e98('0x3e')][_0x4e98('0x5')]){var _0x5c8bde=Object[_0x4e98('0x41')](_0x6b1bb9[_0x4e98('0x3e')][_0x4e98('0x5')]);for(var _0x5c5e3c=0x0;_0x5c5e3c<_0x5c8bde[_0x4e98('0x14')];_0x5c5e3c++){var _0x14d057=_0x5c8bde[_0x5c5e3c];var _0x523665=_0x6b1bb9[_0x4e98('0x3e')][_0x4e98('0x5')][_0x14d057];if(!_0xf9f180['isLearnedSkill'](_0x523665)){continue;}this[_0x4e98('0x42')][_0x4e98('0x32')]([_0x14d057,$dataSkills[_0x523665]]);}}this['y']=Graphics[_0x4e98('0x5f')]-this[_0x4e98('0x4')](0x4);this['y']-=this[_0x4e98('0x4')](this[_0x4e98('0x42')][_0x4e98('0x14')]+0x1);this[_0x4e98('0x6')]=!![];this['refresh']();};Window_ChainSkillList['prototype'][_0x4e98('0x30')]=function(){this[_0x4e98('0x7d')]();Window_Base[_0x4e98('0xd')][_0x4e98('0x30')][_0x4e98('0x3d')](this);};Object[_0x4e98('0x35')](Window_ChainSkillList[_0x4e98('0xd')],'chainInput',{'get':function(){return this[_0x4e98('0x2f')];},'set':function(_0x330f15){this[_0x4e98('0x2f')]=_0x330f15;this[_0x4e98('0x6')]=![];if(_0x330f15!==null){this[_0x4e98('0x50')]();}},'configurable':!![]});Window_ChainSkillList[_0x4e98('0xd')][_0x4e98('0x50')]=function(){if(this['_enabled']){this[_0x4e98('0x2f')]=null;}this[_0x4e98('0x64')][_0x4e98('0x85')]();this[_0x4e98('0x6e')]();this['drawChainSkillTitle']();if(this[_0x4e98('0x87')]){this[_0x4e98('0x78')]();}};Window_ChainSkillList[_0x4e98('0xd')][_0x4e98('0x6e')]=function(){var _0x5e52cd=this[_0x4e98('0x54')]()*(this['_chainSkills'][_0x4e98('0x14')]+0x1);this[_0x4e98('0x64')][_0x4e98('0x77')](0x0,0x0,this[_0x4e98('0x64')]['width'],_0x5e52cd,_0x4e98('0x76'),_0x4e98('0x49'));this[_0x4e98('0x64')][_0x4e98('0x84')]=0x4e;this[_0x4e98('0x64')][_0x4e98('0x39')](0x0,this[_0x4e98('0x54')]()-0x4,this[_0x4e98('0x64')]['width'],0x2,this[_0x4e98('0x6b')]());this[_0x4e98('0x64')][_0x4e98('0x84')]=0xff;};Window_ChainSkillList[_0x4e98('0xd')]['drawChainSkillTitle']=function(){this[_0x4e98('0x15')]();this['contents'][_0x4e98('0x68')]=$[_0x4e98('0x72')][_0x4e98('0x1e')];this[_0x4e98('0x64')][_0x4e98('0x38')]=!![];this[_0x4e98('0x4e')]($['params'][_0x4e98('0x7c')],0xc,0x0,this['contents'][_0x4e98('0x0')]-0x18);this[_0x4e98('0x15')]();};Window_ChainSkillList[_0x4e98('0xd')]['drawChainSkills']=function(){var _0x518474=0x18,_0x1b352b=this[_0x4e98('0x54')]();if(this[_0x4e98('0x87')][_0x4e98('0x3e')]['chainSkillList']){var _0x335dcd=Object[_0x4e98('0x41')](this[_0x4e98('0x87')]['meta'][_0x4e98('0x5')]);for(var _0x609977=0x0;_0x609977<_0x335dcd[_0x4e98('0x14')];_0x609977++){var _0x1fb05c=_0x335dcd[_0x609977];var _0xa0d587=$dataSkills[this[_0x4e98('0x87')][_0x4e98('0x3e')][_0x4e98('0x5')][_0x1fb05c]];if(!this[_0x4e98('0x56')][_0x4e98('0x20')](_0xa0d587['id'])){continue;}var _0x5536c8='';_0x5536c8=_0x5536c8+this[_0x4e98('0x86')](_0x1fb05c,_0xa0d587);_0x5536c8=_0x5536c8+_0x4e98('0xe')[_0x4e98('0x3')](_0xa0d587[_0x4e98('0x2')],_0xa0d587[_0x4e98('0xb')]);this['drawTextEx'](_0x5536c8,_0x518474,_0x1b352b);_0x1b352b+=this[_0x4e98('0x54')]();}}};Window_ChainSkillList[_0x4e98('0xd')][_0x4e98('0x86')]=function(_0x251515,_0x4a3a7d){var _0x5ab8c0=_0x251515===this['_chainInput'];var _0x1d1a80='';var _0x2ecd1c=$['params']['inputData'];if(_0x2ecd1c[_0x251515]){if(this['_enabled']&&this[_0x4e98('0x56')]['canUse'](_0x4a3a7d)){_0x1d1a80=_0x2ecd1c[_0x251515]['on'];}else if(!this[_0x4e98('0x6')]&&_0x5ab8c0){_0x1d1a80=_0x2ecd1c[_0x251515][_0x4e98('0x1c')];}else{_0x1d1a80=_0x2ecd1c[_0x251515][_0x4e98('0x46')];}}return _0x1d1a80;};
})(Visustella.ActiveChainSkills);