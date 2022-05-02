/**
 * Created by zman on 4/22/2017.
 */

//=============================================================================
/*:
 * @plugindesc Stormbeard's Random Dungeon Generator v0.01.
 * @author Stormbeard
 *
 * @param Current Depth
 * @desc What layer of the dungeon do you want to port into
 * @default 1
 *
 * @param Max Depth
 * @desc How many total levels is the dungeon
 * @default 1
 *
 * @param Switch Gate
 * @desc A dedicated switch the plugin needs for gate management
 * @default 98
 *
 * @param Switch Boss
 * @desc A dedicated switch the plugin needs for boss management
 * @default 99
 *
 * @param Dungeon Width
 * @desc Tile width of the dungeon
 * @default 60
 *
 * @param Dungeon Height
 * @desc Tile height of the dungeon
 * @default 60
 *
 * @param Dungeon Fullness
 * @desc Ratio to control amount of walkable space
 * @default .65
 *
 * @param Room Size
 * @desc Ratio to control the size of rooms
 * @default .4
 *
 * @param Random Encounters
 * @desc Controls on map or random encounter for monsters
 * @default false
 *
 * @param Monster Density
 * @desc For random this is number of steps, for on map it roughly how many square tiles per monster
 * @default 600
 *
 * @param Chest Density
 * @desc How many square tiles per chest
 * @default 1500
 *
 * @param Tileset ID
 * @desc The ID of what tileset you've configure for the plugin
 * @default 1
 *
 * @param BGM
 * @desc Background music name
 * @default Dungeon1
 *
 * @help
 * Stormbeard's Random Dungeon Generator v0.01
 *
 * This is a plugin that will randomly generate a dungeon map and provide ways to
 * control things like how many levels, bosses, treasure, and troops.
 *
 * The flow of the map will be the player is ported into a random location and
 * then must defeat a boss monster in order * to open a portal that will spawn
 * elsewhere in the dungeon where the player will either progress deeper into the
 * dungeon or be ported to a user specified map.
 *
 * This plugin also has dependencies on Yanfly's Event Chase Player plugin and it
 * must be included in the project.
 *
 * Default Settings:
 * -----------------------------
 *
 * The default settings will control how the dungeon is built and populated
 *
 * Current Depth - Starting level of the dungeon to port to [usually 1]
 *
 * Max Depth - How many total levels is the dungeon
 *             before porting to specified map
 *
 * Switch Gate - A dedicated global switch # the plugin needs for gate management
 *
 * Switch Boss - A dedicated global switch # the plugin needs for boss management
 *
 * Dungeon Width - Tile width of the dungeon
 *
 * Dungeon Height - Tile height of the dungeon
 *
 * Dungeon Fullness - Ratio to control amount of walkable space
 *
 * Room Size - Ratio to control the size of rooms
 *
 * Random Encounters - Controls on map or random encounter for monsters
 *
 * Monster Density - For random this is number of steps, for on map it roughly
 *                   how many square tiles per monster
 *
 * Chest Density - How many square tiles per chest
 *
 * Tileset ID - The ID of what tileset you've configure for the plugin
 *
 * BGM - Background music name
 *
 * Calling a Dungeon
 * -----------------------------
 *
 * Using the Plugin Command event you can enter a string like
 * below to call a dungeon::
 *
 * procgen mapgen dungeonname:dungeon1 outx:4 outy:6 outid:4
 *
 * Breaking down the pieces of the command it looks like:
 *
 * procgen - Name of the plugin, required [this never changes]
 *
 * mapgen - Type of dungeon generation
 *          [currently only mapgen supported, more coming soon], required
 *
 * dungeonname:XXX - Name of the Dungeon, this allows you to have
 *                   multiple different dungeons, required
 *
 * outX:X outY:X outid:X - The output coordinates and mapID to send the player
 *                         at the completion of the dungeon, required
 *
 *
 *
 * This is a list of optional parameter mappings you can use to override
 * the global defaults from the plugin manager to help customize every
 * dungeon the way you want it:
 *
 * Plugin Command - Default Setting
 * start:X - Current Depth
 * max:X - Max Depth
 * gateswitch:X - Switch Gate
 * bossswitch:X - Switch Boss
 * w:X - Dungeon Width
 * h:X - Dungeon Height
 * fullness:X - Dungeon Fullness
 * roomsize:X - Room Size
 * userandom:X - Random Encounters
 * encounterrate:X - Monster Density
 * chestrate:X - Chest Density
 * tilseset:X - Tileset ID
 * bgm:X - BGM
 *
 * So other examples:
 *
 * A dungeon 100 tiles in height with more chests and defaults:
 * procgen mapgen dungeonname:dungeon1 outx:4 outy:6 outid:4 h:100 chestrate:500
 *
 * A dungeon with less walkable space and defaults:
 * procgen mapgen dungeonname:dungeon1 outx:4 outy:6 outid:4 fullness:.4
 *
 * A dungeon 3 levels deep using tileset 8 and defaults:
 * procgen mapgen dungeonname:dungeon1 outx:4 outy:6 outid:4 max:3 tileset:8
 *
 * Adding Bosses and Monsters
 * -----------------------------
 *
 * To Control what encounters a player will receive on a level you must pick
 * a troops and give it a custom name like the following:
 *
 * procgen:dungeon1:troop:1:3:Monster:2:1:0:Bat*2
 *
 * The command is broken down as follows:
 *
 * procgen - never changes and should always be there
 *
 * dungeon1 - You would replace this with your dungeonname
 *            param from the Plugin Command
 *
 * troop - there are 2 values here, "troop" or "boss", troops are roaming
 *         monsters while boss will be a level boss for a floor
 *
 * 1:3 - this is the start level and end level of the dungeon a troop/boss is
 *       eligible for, ex if this was a 5 floor dungeon this troop would not
 *       appear on floors 4 or 5, if the value was 1:1 it would not appear on
 *       floors 2, 3, 4, or 5
 *
 * Monster - This is the name of the character's sheet for the on map sprite
 *
 * 2:1:0 - direction, pattern, and character index of an on map monster - this
 *         controls which sprite of the sheet to use, but is best explained
 *         visually so I recommend looking at the online instructions at
 *         www.tbd.com
 *
 * Bat*2 - A name of you choose to identify the troop, nothing to
 *         do with the plugin
 *
 * Some examples you can use to get started:
 * procgen:dungeon1:troop:1:2:Monster:2:1:0:troop1
 * [Will show a bat on map]
 *
 * procgen:dungeon1:troop:1:3:Monster:2:1:1:troop2
 * [Will show a slime on map]
 *
 * procgen:dungeon1:boss:1:2:$BigMonster1:6:1:0:boss1
 * [Will use a big monster at the boss]
 *
 * procgen:dungeon1:boss:3:3:$BigMonster1:2:1:0:boss2
 * [Will use a different big monster as the boss]
 *
 * The above assumes you have the default resources in your game, if you apply
 * this to 4 troops the experience would be in a 3 floor dungeon you would fight
 * a mix of bat and slimes on floors 1 and 2 and fight boss 1 on both floors 1
 * and 2 on floor 3 you would only fight slime on the map and fight boss 2 at the
 * end.
 *
 * One important note is that if you do not use on map monster's these value for
 * troops is irrelevant and you can set anything you would like there, but for
 * bosses is still important as they always appear on map.
 *
 * Adding Treasure
 * -----------------------------
 *
 * In the notes section of any item, armor, or weapon you can add a tag like the
 * following to add it to the dungeon:
 *
 *   <procgen 1:3:dungeon1 >
 *
 * A breakdown of the tag is:
 *
 * <procgen - always needed
 *
 * 1:3:dungeon1 - the start floor and end floor where the item can appear, and
 *                the dungeonname from the Plugin Command the item is tied to
 *
 *  > - always needed
 *
 * So ex putting the above on a potion in a 5 floor dungeon the potion would have
 * a chance to appear on floors 1, 2, 3 but not on floors 4 or 5.
 *
 * Currently to distribute treasure the plugin will look at how many possible
 * chest for the map level, then look at what items are available on the current
 * floor.  Each notetag is only good for 1 occurrence of an item on any given
 * floor, so ex if you put:
 *
 *   <procgen 1:3:dungeon1 >
 *   <procgen 1:1:dungeon1 >
 *   <procgen 1:1:dungeon1 >
 *
 * All on the potion item, it would mean that in a dungeon you could possibly
 * collect up to 3 potions on floor 1, and possibly collect one potion each on
 * both floors 2 and 3.
 *
 *  if you just had:
 *
 *   <procgen 1:3:dungeon1 >
 *
 * and the player collects a potion on floor 1, there is still a possibility
 * that the player will collect another potion on both floor's 2 and 3,
 * meaning that each notetag does not map to being just 1 item received.
 *
 * One other item to note is that currently the plugin will also add 1 gold chest
 * to the pool of available treasure for each map level.  It calculates the
 * average gold value of all possible items that could be received on that level
 * to determine value. So ex if you have 3 items note tagged for a level the gold
 * chest will function as a 4th available item, so if you want to ensure a player
 * gets all available items on any given level make sure you change you chest
 * density for 1 more chest than you notetags.  The other part of this to note is
 * that if you put something like only 1 very expensive item on a level that
 * there will be a corresponding large chest of gold as the only item available
 * to average off of is that very expensive item.  The gold chest system is
 * something that is actively being worked on and any recommendations are welcome.
 *
 * Tilesets
 * -----------------------------
 *
 * The plugin is driven off of a very specific typeset layout and it is best to
 * see this visually at www.tbd.com
 *
 * Coming Soon/Next
 * -----------------------------
 * *Generating the map ina  more cavelike way vs corridors and rooms
 * *Refining the gold chest system
 * *Code Cleanup
 * *Simplifying inputs for troops
 * *Refining the item placement/generation system
 *
 *
 */

(function() {

    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function(searchString, position){
            position = position || 0;
            return this.substr(position, searchString.length) === searchString;
        };
    }

    var Imported = Imported || {};
    Imported.procgen = true;

    var zman = zman || {};
    zman.ProcGen = zman.ProcGen || {};

    zman.Parameters = PluginManager.parameters('procgen');
    zman.Param = zman.Param || {};

    var currentDepth = Number(zman.Parameters['Current Depth']);
    var maxDepth = Number(zman.Parameters['Max Depth']);
    var switchGate = Number(zman.Parameters['Switch Gate']);
    var switchBoss = Number(zman.Parameters['Switch Boss']);
    var ranW = Number(zman.Parameters['Dungeon Width']);
    var ranH = Number(zman.Parameters['Dungeon Height']);
    var fullnessRatio = Number(zman.Parameters['Dungeon Fullness']);
    var roomSizeRatio = Number(zman.Parameters['Room Size']);
    var useRandom = eval(String(zman.Parameters['Random Encounters']));
    var monsterDensity = Number(zman.Parameters['Monster Density']);
    var chestDensity = Number(zman.Parameters['Chest Density']);
    var tileSet = Number(zman.Parameters['Tileset ID']);
    var BGM = String(zman.Parameters['BGM']);


    var eventOut = {};
    var mapId = "";
    var newX = 1;
    var newY = 1;

    var autoTilesOffsets = {
        0   :   0,
        1	:	1,
        2	:	2,
        3	:	3,
        4	:	4,
        5	:	5,
        6	:	6,
        7	:	7,
        8	:	8,
        9	:	9,
        10	:	10,
        11	:	11,
        12	:	12,
        13	:	13,
        14	:	14,
        15	:	15,
        16	:	16,
        17	:	16,
        18	:	17,
        19	:	17,
        20	:	18,
        21	:	18,
        22	:	19,
        23	:	19,
        24	:	16,
        25	:	16,
        26	:	17,
        27	:	17,
        28	:	18,
        29	:	18,
        30	:	19,
        31	:	19,
        32	:	20,
        33	:	20,
        34	:	20,
        35	:	20,
        36	:	21,
        37	:	21,
        38	:	21,
        39	:	21,
        40	:	22,
        41	:	22,
        42	:	22,
        43	:	22,
        44	:	23,
        45	:	23,
        46	:	23,
        47	:	23,
        48	:	34,
        49	:	34,
        50	:	34,
        51	:	34,
        52	:	35,
        53	:	35,
        54	:	35,
        55	:	35,
        56	:	34,
        57	:	34,
        58	:	34,
        59	:	34,
        60	:	35,
        61	:	35,
        62	:	35,
        63	:	35,
        64	:	24,
        65	:	26,
        66	:	24,
        67	:	26,
        68	:	24,
        69	:	26,
        70	:	24,
        71	:	26,
        72	:	25,
        73	:	27,
        74	:	25,
        75	:	27,
        76	:	25,
        77	:	27,
        78	:	25,
        79	:	27,
        80	:	32,
        81	:	32,
        82	:	32,
        83	:	32,
        84	:	32,
        85	:	32,
        86	:	32,
        87	:	32,
        88	:	32,
        89	:	32,
        90	:	32,
        91	:	32,
        92	:	32,
        93	:	32,
        94	:	32,
        95	:	32,
        96	:	36,
        97	:	36,
        98	:	36,
        99	:	36,
        100	:	36,
        101	:	36,
        102	:	36,
        103	:	36,
        104	:	37,
        105	:	37,
        106	:	37,
        107	:	37,
        108	:	37,
        109	:	37,
        110	:	37,
        111	:	37,
        112	:	42,
        113	:	42,
        114	:	42,
        115	:	42,
        116	:	42,
        117	:	42,
        118	:	42,
        119	:	42,
        120	:	42,
        121	:	42,
        122	:	42,
        123	:	42,
        124	:	42,
        125	:	42,
        126	:	42,
        127	:	42,
        128	:	28,
        129	:	29,
        130	:	30,
        131	:	31,
        132	:	28,
        133	:	29,
        134	:	30,
        135	:	31,
        136	:	28,
        137	:	29,
        138	:	30,
        139	:	31,
        140	:	28,
        141	:	29,
        142	:	30,
        143	:	31,
        144	:	40,
        145	:	40,
        146	:	41,
        147	:	41,
        148	:	40,
        149	:	40,
        150	:	41,
        151	:	41,
        152	:	40,
        153	:	40,
        154	:	41,
        155	:	41,
        156	:	40,
        157	:	40,
        158	:	41,
        159	:	41,
        160	:	33,
        161	:	33,
        162	:	33,
        163	:	33,
        164	:	33,
        165	:	33,
        166	:	33,
        167	:	33,
        168	:	33,
        169	:	33,
        170	:	33,
        171	:	33,
        172	:	33,
        173	:	33,
        174	:	33,
        175	:	33,
        176	:	43,
        177	:	43,
        178	:	43,
        179	:	43,
        180	:	43,
        181	:	43,
        182	:	43,
        183	:	43,
        184	:	43,
        185	:	43,
        186	:	43,
        187	:	43,
        188	:	43,
        189	:	43,
        190	:	43,
        191	:	43,
        192	:	38,
        193	:	39,
        194	:	38,
        195	:	39,
        196	:	38,
        197	:	39,
        198	:	38,
        199	:	39,
        200	:	38,
        201	:	39,
        202	:	38,
        203	:	39,
        204	:	38,
        205	:	39,
        206	:	38,
        207	:	39,
        208	:	44,
        209	:	44,
        210	:	44,
        211	:	44,
        212	:	44,
        213	:	44,
        214	:	44,
        215	:	44,
        216	:	44,
        217	:	44,
        218	:	44,
        219	:	44,
        220	:	44,
        221	:	44,
        222	:	44,
        223	:	44,
        224	:	45,
        225	:	45,
        226	:	45,
        227	:	45,
        228	:	45,
        229	:	45,
        230	:	45,
        231	:	45,
        232	:	45,
        233	:	45,
        234	:	45,
        235	:	45,
        236	:	45,
        237	:	45,
        238	:	45,
        239	:	45,
        240	:	46,
        241	:	46,
        242	:	46,
        243	:	46,
        244	:	46,
        245	:	46,
        246	:	46,
        247	:	46,
        248	:	46,
        249	:	46,
        250	:	46,
        251	:	46,
        252	:	46,
        253	:	46,
        254	:	46,
        255	:	46

    };

    /*zman.ProcGen.Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        zman.ProcGen.Game_System_initialize.call(this);
        this.initProcGen();
    };

    Game_System.prototype.initProcGen = function() {

    };*/

    Game_System.prototype.mapGen = function(mapID) {
        DataManager.randMap(mapID);
    };


    var procGenCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        procGenCommand.call(this, command, args);
        if (command === 'procgen') {

            if (args.length >= 5 ) {

                if (args[0] === "mapgen") {

                    for (var i = 1; i < args.length; i++) {
                        var currentArg = args[i].toLowerCase().split(":");
                        switch(currentArg[0]) {
                            case 'start':
                                currentDepth = parseInt(currentArg[1]);
                                break;
                            case 'max':
                                maxDepth = parseInt(currentArg[1]);
                                break;
                            case 'bossswitch':
                                switchBoss = parseInt(currentArg[1]);
                                break;
                            case 'gateswitch':
                                switchGate = parseInt(currentArg[1]);
                                break;
                            case 'w':
                                ranW = parseInt(currentArg[1]);
                                break;
                            case 'h':
                                ranH = parseInt(currentArg[1]);
                                break;
                            case 'bgm':
                                BGM = currentArg[1];
                                break;
                            case 'fullness':
                                fullnessRatio = parseFloat(currentArg[1]);
                                break;
                            case 'roomsize':
                                roomSizeRatio = parseFloat(currentArg[1]);
                                break;
                            case 'userandom':
                                useRandom = (currentArg[1].toLowerCase() === 'true');
                                break;
                            case 'encounterrate':
                                monsterDensity = parseInt(currentArg[1]);
                                break;
                            case 'chestrate':
                                chestDensity = parseInt(currentArg[1]);
                                break;
                            case 'tileset':
                                tileSet = parseInt(currentArg[1]);
                                break;
                            case 'dungeonname':
                                mapId = currentArg[1];
                                break;
                            case 'outx':
                                eventOut.x = parseInt(currentArg[1]);
                                break;
                            case 'outy':
                                eventOut.y = parseInt(currentArg[1]);
                                break;
                            case 'outid':
                                eventOut.mapID = parseInt(currentArg[1]);
                                break;
                            default:
                                console.log("Bad arg for procgen: " + currentArg[0]);
                                break;
                        }
                    }

                    if(eventOut.x && eventOut.y && eventOut.mapID && mapId !== "") {
                        $gameSystem.mapGen(args[1]);
                    } else {
                        console.log("missing required fields to run procgen plugin command");
                    }

                }
            } else {
                console.log("not enough procgen args");
            }
        }
    };

    DataManager.randMap = function (mapID) {

        newX = Math.floor(Math.random() * (ranW - 2) + 1);
        newY = Math.floor(Math.random() * (ranH - 2) + 1);

        $gamePlayer.reserveTransfer("XyZrandXyZ-"+mapID+"-"+currentDepth, newX, newY);

    };


    DataManager.loadMapData = function(mapId) {
        if (mapId > 0) {
            var filename = 'Map%1.json'.format(mapId.padZero(3));
            this.loadDataFile('$dataMap', filename);
        } else if (mapId.includes("XyZrandXyZ")) {
            this.loadDataFile('$dataMap', mapId);
        } else {
            this.makeEmptyMap();
        }
    };


    DataManager.loadDataFile = function(name, src) {
        if(src.includes("XyZrandXyZ")) {

            if ($dataMap.currentSrc !== src) {

                $dataMap = {
                    "autoplayBgm": true,
                    "autoplayBgs": false,
                    "battleback1Name": "",
                    "battleback2Name": "",
                    "bgm": {"name": BGM, "pan": 0, "pitch": 100, "volume": 90},
                    "bgs": {"name": "", "pan": 0, "pitch": 100, "volume": 90},
                    "disableDashing": false,
                    "displayName": "",
                    "encounterList": [],
                    "encounterStep": monsterDensity,
                    "height": ranH,
                    "note": "",
                    "parallaxLoopX": false,
                    "parallaxLoopY": false,
                    "parallaxName": "",
                    "parallaxShow": true,
                    "parallaxSx": 0,
                    "parallaxSy": 0,
                    "scrollType": 0,
                    "specifyBattleback": false,
                    "tilesetId": tileSet,
                    "width": ranW
                };

                $dataMap.currentSrc = src;

                $dataMap.data = [];

                var walkMap = new Array();

                for (var y = 0; y < $dataMap.height; y++) {
                    for (var x = 0; x < $dataMap.width; x++) {

                        if (typeof walkMap[x] === "undefined") {
                            walkMap[x] = new Array();
                        }

                        if ((x == 0) || (y == 0) || (x == $dataMap.width - 1) || (y == $dataMap.height - 1)) {
                            walkMap[x][y] = 'E';
                        } else {
                            walkMap[x][y] = 'X';
                        }
                    }
                }


                var edgeBase = 2048; //2528
                var noWalkBase = 6032; //6752
                var walkBase = 6080; //3248
                var wallBase = 6416; //7040
                var blockingObject1 = 24; //88
                var blockingObject2 = 25;
                var wall_1_1 = 26;
                var wall_1_2 = 34;
                var wall_2_1 = 27;
                var wall_2_2 = 35;
                var wall_3_1 = 28;
                var wall_3_2 = 36;
                var roof1 = 40;
                var roof2 = 41;
                var roof3 = 42;
                var groundCover1 = 32;
                var groundCover2 = 33;

                var sideWallShadow = 5;

                var monsterAmount = Math.ceil((ranW*ranH)/monsterDensity);
                var chestAmount = Math.ceil((ranW*ranH)/chestDensity);

                var remainingSize = Math.ceil(($dataMap.height - 1) * ($dataMap.width - 1) * fullnessRatio);
                var sideLengthOfMaxSquare = Math.floor(Math.sqrt(remainingSize));
                var maxRoomSideDimension = Math.ceil(sideLengthOfMaxSquare * roomSizeRatio);
                var rooms = new Array();


                var failSafe = 100;
                var reps = 0;

                while (remainingSize >= 9 && reps <= failSafe) {

                    var roomW = Math.floor(Math.random() * (maxRoomSideDimension - 3) + 3);
                    var roomH = Math.floor(Math.random() * (maxRoomSideDimension - 3) + 3);

                    var startW = Math.floor(Math.random() * ($dataMap.width - 2 - roomW) + 1);
                    var startH = Math.floor(Math.random() * ($dataMap.height - 2 - roomH) + 1);

                    var endW = startW + roomW - 1;
                    var endH = startH + roomH - 1;

                    var canBePlaced = true;

                    for (var y = startH - 1; y <= endH + 1; y++) {
                        for (var x = startW - 1; x <= endW + 1; x++) {
                            if (walkMap[x][y] === 'O') {
                                canBePlaced = false;
                                break;
                            }
                        }
                    }


                    if (canBePlaced) {

                        for (var y = startH; y <= endH; y++) {
                            for (var x = startW; x <= endW; x++) {
                                walkMap[x][y] = 'O';
                            }
                        }

                        var pathX = Math.floor(Math.random() * (endW - startW) + startW);
                        var pathY = Math.floor(Math.random() * (endH - startH) + startH);

                        var room = {
                            pathX: pathX,
                            pathY: pathY,
                            x1: startW,
                            x2: endW,
                            y1: startH,
                            y2: endH
                        };

                        rooms.push(room);

                        remainingSize = remainingSize - (roomW * roomH);

                    }

                    reps++;

                }


                if (walkMap[newX][newY] !== 'O') {
                    var roomStart = {
                        pathX: newX,
                        pathY: newY,
                        x1: newX,
                        x2: newY,
                        y1: newX,
                        y2: newY
                    };

                    rooms.push(roomStart);
                }

                var checkFirst = 0;
                var prevY = 1;
                var prevX = 1;

                for (room in rooms) {
                    if (rooms.hasOwnProperty(room)) {

                        if (checkFirst >= 1) {

                            if (prevX > rooms[room].pathX) {
                                for (var x = rooms[room].pathX; x <= prevX; x++) {
                                    walkMap[x][rooms[room].pathY] = 'O';
                                }
                                if (prevY > rooms[room].pathY) {
                                    for (var y = rooms[room].pathY; y <= prevY; y++) {
                                        walkMap[prevX][y] = 'O';
                                    }
                                } else {
                                    for (var y = prevY; y <= rooms[room].pathY; y++) {
                                        walkMap[prevX][y] = 'O';
                                    }
                                }
                            } else {
                                for (var x = prevX; x <= rooms[room].pathX; x++) {
                                    walkMap[x][prevY] = 'O';
                                }
                                if (prevY > rooms[room].pathY) {
                                    for (var y = rooms[room].pathY; y <= prevY; y++) {
                                        walkMap[rooms[room].pathX][y] = 'O';
                                    }
                                } else {
                                    for (var y = prevY; y <= rooms[room].pathY; y++) {
                                        walkMap[rooms[room].pathX][y] = 'O';
                                    }
                                }
                            }


                        }
                        prevX = rooms[room].pathX;
                        prevY = rooms[room].pathY;
                        checkFirst += 1;
                    }
                }

                for (var y = 2; y < $dataMap.height-1; y++) {
                    for (var x = 1; x < $dataMap.width-1; x++) {
                        if (walkMap[x][y-2] === 'X' && walkMap[x][y - 1] === 'X' && walkMap[x][y + 1] === 'O' && walkMap[x][y] === 'X') {
                            walkMap[x][y] = 'W';
                            walkMap[x][y-1] = 'W';
                        } else if ((walkMap[x][y - 1] === 'O' || walkMap[x][y - 1] === 'E') && (walkMap[x][y + 1] === 'O' || walkMap[x][y + 1] === 'E') && walkMap[x][y] === 'X') {
                            walkMap[x][y] = 'B';
                        } else if ((walkMap[x][y - 2] === 'O' || walkMap[x][y - 2] === 'E') && (walkMap[x][y + 1] === 'O' || walkMap[x][y + 1] === 'E') && walkMap[x][y-1] == 'X' && walkMap[x][y] === 'X') {
                            walkMap[x][y] = 'B';
                            walkMap[x][y-1] = 'B';
                        }
                    }
                }


                for (var z = 0; z < 6; z++) {
                    for (var y = 0; y < $dataMap.height; y++) {
                        for (var x = 0; x < $dataMap.width; x++) {
                            if (z < 1) {
                                if ((x - 1 < 0) && (y - 1 < 0)) {
                                    $dataMap.data.push(edgeBase + 4);
                                } else if ((x - 1 < 0) && (y + 1 >= $dataMap.height)) {
                                    $dataMap.data.push(edgeBase + 2);
                                } else if ((y - 1 < 0) && (x + 1 >= $dataMap.width)) {
                                    $dataMap.data.push(edgeBase + 8);
                                } else if ((x + 1 >= $dataMap.width) && (y + 1 >= $dataMap.height)) {
                                    $dataMap.data.push(edgeBase + 1);
                                } else if (x - 1 < 0) {
                                    $dataMap.data.push(edgeBase + 24);
                                } else if (y - 1 < 0) {
                                    $dataMap.data.push(edgeBase + 28);
                                } else if (x + 1 >= $dataMap.width) {
                                    $dataMap.data.push(edgeBase + 16);
                                } else if (y + 1 >= $dataMap.height) {
                                    $dataMap.data.push(edgeBase + 20);
                                } else {
                                    if (walkMap[x][y] === 'O' || walkMap[x][y] === 'B') {
                                        var lookupValue = 0;
                                        if (x > 0 && y > 0 && x < $dataMap.width - 1 && y < $dataMap.height - 1) {

                                            if (walkMap[x - 1][y - 1] !== 'O' && walkMap[x - 1][y - 1] !== 'B') {
                                                lookupValue = lookupValue + 1;
                                            }
                                            if (walkMap[x + 1][y - 1] !== 'O' && walkMap[x + 1][y - 1] !== 'B') {
                                                lookupValue = lookupValue + 2;
                                            }
                                            if (walkMap[x - 1][y + 1] !== 'O' && walkMap[x - 1][y + 1] !== 'B') {
                                                lookupValue = lookupValue + 8;
                                            }
                                            if (walkMap[x + 1][y + 1] !== 'O' && walkMap[x + 1][y + 1] !== 'B') {
                                                lookupValue = lookupValue + 4;
                                            }
                                            if (walkMap[x - 1][y] !== 'O' && walkMap[x - 1][y] !== 'B') {
                                                lookupValue = lookupValue + 16;
                                            }
                                            if (walkMap[x + 1][y] !== 'O' && walkMap[x + 1][y] !== 'B') {
                                                lookupValue = lookupValue + 64;
                                            }
                                            if (walkMap[x][y - 1] !== 'O' && walkMap[x][y - 1] !== 'B') {
                                                lookupValue = lookupValue + 32;
                                            }
                                            if (walkMap[x][y + 1] !== 'O' && walkMap[x][y + 1] !== 'B') {
                                                lookupValue = lookupValue + 128;
                                            }

                                        }

                                        $dataMap.data.push(walkBase + autoTilesOffsets[lookupValue]);

                                    } else if (walkMap[x][y] === 'W') {
                                        if (walkMap[x-1][y] !== 'W' && walkMap[x][y-1] !== 'W') {
                                            $dataMap.data.push(wallBase + 3);
                                        } else if (walkMap[x-1][y] !== 'W' && walkMap[x][y+1] !== 'W') {
                                            $dataMap.data.push(wallBase + 9);
                                        } else if (walkMap[x+1][y] !== 'W' && walkMap[x][y-1] !== 'W') {
                                            $dataMap.data.push(wallBase + 6);
                                        } else if (walkMap[x+1][y] !== 'W' && walkMap[x][y+1] !== 'W') {
                                            $dataMap.data.push(wallBase + 12);
                                        } else if (walkMap[x-1][y] !== 'W' && walkMap[x+1][y] !== 'W' && walkMap[x][y-1] !== 'W') {
                                            $dataMap.data.push(wallBase + 7);
                                        } else if (walkMap[x-1][y] !== 'W' && walkMap[x+1][y] !== 'W' && walkMap[x][y+1] !== 'W') {
                                            $dataMap.data.push(wallBase + 13);
                                        } else if (walkMap[x][y-1] !== 'W') {
                                            $dataMap.data.push(wallBase + 2);
                                        } else {
                                            $dataMap.data.push(wallBase + 8);
                                        }
                                    } else if (walkMap[x][y] === 'X') {
                                        var lookupValue = 0;
                                        if (x > 0 && y > 0 && x < $dataMap.width - 1 && y < $dataMap.height - 1) {
                                            if (walkMap[x - 1][y - 1] !== 'X') {
                                                lookupValue = lookupValue + 1;
                                            }
                                            if (walkMap[x + 1][y - 1] !== 'X') {
                                                lookupValue = lookupValue + 2;
                                            }
                                            if (walkMap[x - 1][y + 1] !== 'X') {
                                                lookupValue = lookupValue + 8;
                                            }
                                            if (walkMap[x + 1][y + 1] !== 'X') {
                                                lookupValue = lookupValue + 4;
                                            }
                                            if (walkMap[x - 1][y] !== 'X') {
                                                lookupValue = lookupValue + 16;
                                            }
                                            if (walkMap[x + 1][y] !== 'X') {
                                                lookupValue = lookupValue + 64;
                                            }
                                            if (walkMap[x][y - 1] !== 'X') {
                                                lookupValue = lookupValue + 32;
                                            }
                                            if (walkMap[x][y + 1] !== 'X') {
                                                lookupValue = lookupValue + 128;
                                            }

                                        }

                                        $dataMap.data.push(noWalkBase + autoTilesOffsets[lookupValue]);

                                    }
                                }
                            } else if (z < 2) {
                                $dataMap.data.push(0);
                            } else if (z < 3) {
                                $dataMap.data.push(0);
                            } else if (z < 4) {
                                if (walkMap[x][y] === 'B') {
                                    var altBlock = Math.floor(Math.random() * 2 + 1);
                                    if (altBlock == 1) {
                                        $dataMap.data.push(blockingObject1);
                                    } else {
                                        $dataMap.data.push(blockingObject2);
                                    }
                                } else if (walkMap[x][y] === 'W' && walkMap[x][y+1] === 'W') {
                                    var coverVar = Math.floor(Math.random() * 10 + 1);
                                    if (coverVar == 1) {
                                        $dataMap.data.push(wall_1_1);
                                        walkMap[x][y+1] = 'W1';
                                    } else if (coverVar == 2) {
                                        $dataMap.data.push(wall_2_1);
                                        walkMap[x][y+1] = 'W2';
                                    } else if (coverVar == 3) {
                                        $dataMap.data.push(wall_3_1);
                                        walkMap[x][y+1] = 'W3';
                                    } else {
                                        $dataMap.data.push(0);
                                    }
                                } else if (walkMap[x][y] === 'W1') {
                                    $dataMap.data.push(wall_1_2);
                                    walkMap[x][y] = 'W';
                                } else if (walkMap[x][y] === 'W2') {
                                    $dataMap.data.push(wall_2_2);
                                    walkMap[x][y] = 'W';
                                } else if (walkMap[x][y] === 'W3') {
                                    $dataMap.data.push(wall_3_2);
                                    walkMap[x][y] = 'W';
                                } else if (walkMap[x][y] === 'X' && walkMap[x+1][y] === 'X' && walkMap[x][y+1] === 'X' && walkMap[x-1][y] === 'X' && walkMap[x][y-1] === 'X') {
                                    var coverVar = Math.floor(Math.random() * 10 + 1);
                                    if (coverVar == 1) {
                                        $dataMap.data.push(roof1);
                                    } else if (coverVar == 2) {
                                        $dataMap.data.push(roof2);
                                    } else if (coverVar == 3) {
                                        $dataMap.data.push(roof3);
                                    } else {
                                        $dataMap.data.push(0);
                                    }
                                } else if (walkMap[x][y] === 'O') {
                                    var coverVar = Math.floor(Math.random() * 10 + 1);
                                    if (coverVar == 1) {
                                        $dataMap.data.push(groundCover1);
                                    } else if (coverVar == 2) {
                                        $dataMap.data.push(groundCover2);
                                    } else {
                                        $dataMap.data.push(0);
                                    }
                                } else {
                                    $dataMap.data.push(0);
                                }
                            } else if (z < 5) {
                                if ((walkMap[x][y] === 'B' || walkMap[x][y] === 'O') && walkMap[x][y-1] !== 'E') {
                                    if(walkMap[x-1][y] === 'W' || (walkMap[x-1][y-1] === 'X' && walkMap[x-1][y] === 'X') ) {
                                        $dataMap.data.push(sideWallShadow);
                                    } else {
                                        $dataMap.data.push(0);
                                    }
                                } else {
                                    $dataMap.data.push(0);
                                }
                            } else {
                                $dataMap.data.push(0);
                            }
                        }
                    }
                }



                var bosses = [];
                var troops = [];

                for(var troop in $dataTroops) {
                    if($dataTroops.hasOwnProperty(troop)) {
                        if ($dataTroops[troop]) {
                            if ($dataTroops[troop].name) {
                                var nameParts = $dataTroops[troop].name.split(":");
                                if (nameParts.length >= 10) {
                                    if (nameParts[0] === "procgen") {
                                        if (nameParts[1] === mapId) {
                                            if (currentDepth >= parseInt(nameParts[3]) && currentDepth <= parseInt(nameParts[4])) {
                                                var monster = {};
                                                   if(useRandom && nameParts[2] === "troop") {
                                                       monster.regionSet = [];
                                                       monster.troopId = $dataTroops[troop].id;
                                                       monster.weight = 5;
                                                   } else {
                                                       monster.troopID = $dataTroops[troop].id;
                                                       monster.sheetName = nameParts[5];
                                                       monster.direction = parseInt(nameParts[6]);
                                                       monster.pattern = parseInt(nameParts[7]);
                                                       monster.charIndex = parseInt(nameParts[8]);
                                                   }
                                                if (nameParts[2] === "boss") {
                                                    bosses.push(monster);
                                                } else if (nameParts[2] === "troop") {
                                                    troops.push(monster);
                                                }
                                            }

                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                if(useRandom) {
                    $dataMap.encounterList = troops;
                }

                var bossNumber = Math.floor(Math.random() * bosses.length);

                var chests = [];
                var goldTotal = 0;
                var itemAmount =0;

                for (var item in $dataItems) {
                    if($dataItems.hasOwnProperty(item)) {
                        if ($dataItems[item]) {
                            if ($dataItems[item].note) {
                                var notedata = $dataItems[item].note.split(/[\r\n]+/);
                                for (var i = 0; i < notedata.length; i++) {
                                    var line = notedata[i];
                                    if (line.startsWith("<procgen")) {
                                        var chestItem = {};
                                        var procGenNoteLine = line.split(" ");
                                        if (procGenNoteLine.length >= 3) {
                                            var procgenDepthVars = procGenNoteLine[1].split(":");
                                            if (procgenDepthVars.length >= 3) {
                                                if (currentDepth >= procgenDepthVars[0] && currentDepth <= procgenDepthVars[1] && mapId === procgenDepthVars[2]) {
                                                    chestItem.itemId = $dataItems[item].id;
                                                    chestItem.goldValue = $dataItems[item].price;
                                                    chestItem.eventType = 126;
                                                    chestItem.name = $dataItems[item].name;
                                                    chests.push(chestItem);
                                                    goldTotal = goldTotal + $dataItems[item].price;
                                                    itemAmount = itemAmount + 1;
                                                }
                                            } else {
                                                console.log("bad procgen notetag value - " + procgenDepthVars);
                                            }
                                        } else {
                                            console.log("bad procgen noteline - " + procGenNoteLine);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }


                for (var weapon in $dataWeapons) {
                    if($dataWeapons.hasOwnProperty(weapon)) {
                        if ($dataWeapons[weapon]) {
                            if ($dataWeapons[item].note) {
                                var notedata = $dataWeapons[weapon].note.split(/[\r\n]+/);
                                for (var i = 0; i < notedata.length; i++) {
                                    var line = notedata[i];
                                    if (line.startsWith("<procgen")) {
                                        var chestWeapon = {};
                                        var procGenNoteLine = line.split(" ");
                                        if (procGenNoteLine.length >= 3) {
                                            var procgenDepthVars = procGenNoteLine[1].split(":");
                                            if (procgenDepthVars.length >= 3) {
                                                if (currentDepth >= procgenDepthVars[0] && currentDepth <= procgenDepthVars[1] && mapId === procgenDepthVars[2]) {
                                                    chestWeapon.itemId = $dataWeapons[weapon].id;
                                                    chestWeapon.goldValue = $dataWeapons[weapon].price;
                                                    chestWeapon.eventType = 127;
                                                    chestWeapon.name = $dataWeapons[weapon].name;
                                                    chests.push(chestWeapon);
                                                    goldTotal = goldTotal + $dataWeapons[weapon].price;
                                                    itemAmount = itemAmount + 1;
                                                }
                                            } else {
                                                console.log("bad procgen notetag value - " + procgenDepthVars);
                                            }
                                        } else {
                                            console.log("bad procgen noteline - " + procGenNoteLine);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                for (var armor in $dataArmors) {
                    if($dataArmors.hasOwnProperty(armor)) {
                        if ($dataArmors[armor]) {
                            if ($dataArmors[armor].note) {
                                var notedata = $dataArmors[armor].note.split(/[\r\n]+/);
                                for (var i = 0; i < notedata.length; i++) {
                                    var line = notedata[i];
                                    if (line.startsWith("<procgen")) {
                                        var chestArmor = {};
                                        var procGenNoteLine = line.split(" ");
                                        if (procGenNoteLine.length >= 3) {
                                            var procgenDepthVars = procGenNoteLine[1].split(":");
                                            if (procgenDepthVars.length >= 3) {
                                                if (currentDepth >= procgenDepthVars[0] && currentDepth <= procgenDepthVars[1] && mapId === procgenDepthVars[2]) {
                                                    chestArmor.itemId = $dataArmors[armor].id;
                                                    chestArmor.goldValue = $dataArmors[armor].price;
                                                    chestArmor.eventType = 128;
                                                    chestArmor.name = $dataArmors[armor].name;
                                                    chests.push(chestArmor);
                                                    goldTotal = goldTotal + $dataArmors[armor].price;
                                                    itemAmount = itemAmount + 1;
                                                }
                                            } else {
                                                console.log("bad procgen notetag value - " + procgenDepthVars);
                                            }
                                        } else {
                                            console.log("bad procgen noteline - " + procGenNoteLine);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }


                if (goldTotal > 0) {
                    var goldChest = {};
                    var goldAvg = Math.ceil(goldTotal/itemAmount);
                    goldChest.goldValue = goldAvg;
                    goldChest.eventType = 125;
                    chests.push(goldChest);
                }



                var bossX = 0;
                var bossY = 0;

                var gateX = 0;
                var gateY = 0;

                var bossPlaced = false;
                var gatePlaced = false;

                var usedCoords = [];
                var usedChests = [];

                var chestsPlaced = false;
                var troopsPlaced = false;

                var chestCount = 0;
                var troopCount = 0;

                var chestLocations = [];
                var troopLocations = [];

                if(chestAmount > chests.length) {
                    chestAmount = chests.length;
                }

                if (troops.length === 0 || useRandom) {
                    troopsPlaced = true;
                }

                if (chests.length === 0 ) {
                    chestsPlaced = true;
                }


                while (true) {
                     var room = Math.floor(Math.random() * rooms.length);

                     if(rooms[room].x1 === newX && rooms[room].y1 === newY) {
                         continue;
                     }

                     var xPlacement = Math.floor(Math.random() * ((rooms[room].x2 - rooms[room].x1)-1) + rooms[room].x1+1);
                     var yPlacement = Math.floor(Math.random() * ((rooms[room].y2 - rooms[room].y1)-1) + rooms[room].y1+1);

                     if(newX+6 > xPlacement && newX-6 < xPlacement && newY+6 > yPlacement && newY-6 < yPlacement) {
                         continue;
                     }

                    if(usedCoords.indexOf(xPlacement+","+yPlacement) > 0) {
                        continue;
                    }

                        if(!bossPlaced) {
                            bossX = xPlacement;
                            bossY = yPlacement;
                            usedCoords.push(xPlacement + "," + yPlacement);
                            bossPlaced = true;
                        } else if (!gatePlaced) {
                            gateX = xPlacement;
                            gateY = yPlacement;
                            usedCoords.push(xPlacement + "," + yPlacement);
                            gatePlaced = true;
                        } else if (!troopsPlaced) {
                            var troopOnMap = {};
                            troopOnMap.x = xPlacement;
                            troopOnMap.y = yPlacement;
                            troopOnMap.index = Math.floor(Math.random() * troops.length);
                            usedCoords.push(xPlacement + "," + yPlacement);
                            troopLocations.push(troopOnMap);
                            troopCount = troopCount + 1;
                            if(troopCount >= monsterAmount) {
                                troopsPlaced = true;
                            }
                        } else if (!chestsPlaced) {
                            var chestIndex = Math.floor(Math.random() * chests.length);
                            if (usedChests.indexOf(chestIndex) < 0) {
                                var chestOnMap = {};
                                chestOnMap.x = xPlacement;
                                chestOnMap.y = yPlacement;
                                chestOnMap.index = chestIndex;
                                usedCoords.push(xPlacement + "," + yPlacement);
                                usedChests.push(chestIndex);
                                chestLocations.push(chestOnMap);
                                chestCount = chestCount + 1;
                                if (chestCount >= chestAmount) {
                                    chestsPlaced = true;
                                }
                            }
                        }

                     if(chestsPlaced && troopsPlaced && bossPlaced && gatePlaced) {
                         break;
                     }
                }



                $dataMap.events = [];

                var gateEvent = {};

                if(currentDepth == maxDepth) {
                    gateEvent = {
                        "id": 3,
                        "name": "Gate",
                        "note": "",
                        "pages": [{
                            "conditions": {
                                "actorId": 1,
                                "actorValid": false,
                                "itemId": 1,
                                "itemValid": false,
                                "selfSwitchCh": "A",
                                "selfSwitchValid": false,
                                "switch1Id": 1,
                                "switch1Valid": false,
                                "switch2Id": 1,
                                "switch2Valid": false,
                                "variableId": 1,
                                "variableValid": false,
                                "variableValue": 0
                            },
                            "directionFix": false,
                            "image": {
                                "tileId": 0,
                                "characterName": "",
                                "direction": 8,
                                "pattern": 1,
                                "characterIndex": 0
                            },
                            "list": [{
                                "code": 0,
                                "indent": 0,
                                "parameters": []
                            }],
                            "moveFrequency": 3,
                            "moveRoute": {
                                "list": [{
                                    "code": 0,
                                    "parameters": []
                                }],
                                "repeat": true,
                                "skippable": false,
                                "wait": false
                            },
                            "moveSpeed": 3,
                            "moveType": 0,
                            "priorityType": 0,
                            "stepAnime": false,
                            "through": false,
                            "trigger": 1,
                            "walkAnime": true
                        }, {
                            "conditions": {
                                "actorId": 1,
                                "actorValid": false,
                                "itemId": 1,
                                "itemValid": false,
                                "selfSwitchCh": "B",
                                "selfSwitchValid": false,
                                "switch1Id": 1,
                                "switch1Valid": true,
                                "switch2Id": 1,
                                "switch2Valid": false,
                                "variableId": 1,
                                "variableValid": false,
                                "variableValue": 0
                            },
                            "directionFix": false,
                            "image": {
                                "tileId": 0,
                                "characterName": "!Door2",
                                "direction": 8,
                                "pattern": 1,
                                "characterIndex": 0
                            },
                            "list": [{
                                "code": 250,
                                "indent": 0,
                                "parameters": [{
                                    "name": "Move1",
                                    "pan": 0,
                                    "pitch": 100,
                                    "volume": 90
                                }]
                            }, {
                                "code": 201,
                                "indent": 0,
                                "parameters": [0, eventOut.mapID, eventOut.x, eventOut.y, 8, 0]
                            }, {
                                "code": 0,
                                "indent": 0,
                                "parameters": []
                            }],
                            "moveFrequency": 3,
                            "moveRoute": {
                                "list": [{
                                    "code": 0,
                                    "parameters": []
                                }],
                                "repeat": true,
                                "skippable": false,
                                "wait": false
                            },
                            "moveSpeed": 3,
                            "moveType": 0,
                            "priorityType": 1,
                            "stepAnime": false,
                            "through": false,
                            "trigger": 0,
                            "walkAnime": true
                        }],
                        "x": gateX,
                        "y": gateY
                    };
                } else {

                    gateEvent = {
                        "id": 3,
                        "name": "Gate",
                        "note": "",
                        "pages": [{
                            "conditions": {
                                "actorId": 1,
                                "actorValid": false,
                                "itemId": 1,
                                "itemValid": false,
                                "selfSwitchCh": "A",
                                "selfSwitchValid": false,
                                "switch1Id": 1,
                                "switch1Valid": false,
                                "switch2Id": 1,
                                "switch2Valid": false,
                                "variableId": 1,
                                "variableValid": false,
                                "variableValue": 0
                            },
                            "directionFix": false,
                            "image": {
                                "tileId": 0,
                                "characterName": "",
                                "direction": 8,
                                "pattern": 1,
                                "characterIndex": 0
                            },
                            "list": [{
                                "code": 0,
                                "indent": 0,
                                "parameters": []
                            }],
                            "moveFrequency": 3,
                            "moveRoute": {
                                "list": [{
                                    "code": 0,
                                    "parameters": []
                                }],
                                "repeat": true,
                                "skippable": false,
                                "wait": false
                            },
                            "moveSpeed": 3,
                            "moveType": 0,
                            "priorityType": 0,
                            "stepAnime": false,
                            "through": false,
                            "trigger": 1,
                            "walkAnime": true
                        }, {
                            "conditions": {
                                "actorId": 1,
                                "actorValid": false,
                                "itemId": 1,
                                "itemValid": false,
                                "selfSwitchCh": "B",
                                "selfSwitchValid": false,
                                "switch1Id": switchGate,
                                "switch1Valid": true,
                                "switch2Id": 1,
                                "switch2Valid": false,
                                "variableId": 1,
                                "variableValid": false,
                                "variableValue": 0
                            },
                            "directionFix": false,
                            "image": {
                                "tileId": 0,
                                "characterName": "!Door2",
                                "direction": 8,
                                "pattern": 1,
                                "characterIndex": 0
                            },
                            "list": [{
                                "code": 250,
                                "indent": 0,
                                "parameters": [{
                                    "name": "Move1",
                                    "pan": 0,
                                    "pitch": 100,
                                    "volume": 90
                                }]
                            }, {
                                "code": 121,
                                "indent": 0,
                                "parameters": [switchGate, 1, 1]
                            }, {
                                "code": 121,
                                "indent": 0,
                                "parameters": [switchBoss, 2, 1]
                            }, {
                                "code": 356,
                                "indent": 0,
                                "parameters": ["procgen mapgen dungeonname:"+mapId+ " outid:" +eventOut.mapID+" outx:"+eventOut.x+" outy"+eventOut.y+" start:" + (currentDepth+1) + " max:" + maxDepth + " gateswitch:" + switchGate + " bossswitch:" + switchBoss + " w:" + ranW + " h:" + ranH + " fullness:" + fullnessRatio + " roomsize:" + roomSizeRatio + " userandom:" + useRandom + " encounterrate:" + monsterDensity + " chestrate:" + chestDensity + " tileset:" + tileSet + " bgm:" + BGM]
                            }, {
                                "code": 0,
                                "indent": 0,
                                "parameters": []
                            }],
                            "moveFrequency": 3,
                            "moveRoute": {
                                "list": [{
                                    "code": 0,
                                    "parameters": []
                                }],
                                "repeat": true,
                                "skippable": false,
                                "wait": false
                            },
                            "moveSpeed": 3,
                            "moveType": 0,
                            "priorityType": 1,
                            "stepAnime": false,
                            "through": false,
                            "trigger": 0,
                            "walkAnime": true
                        }],
                        "x": gateX,
                        "y": gateY
                    };
                }



                var bossEvent = {
                    "id": 2,
                    "name": "BOSS",
                    "note": "",
                    "pages": [{
                        "conditions": {
                            "actorId": 1,
                            "actorValid": false,
                            "itemId": 1,
                            "itemValid": false,
                            "selfSwitchCh": "A",
                            "selfSwitchValid": false,
                            "switch1Id": 1,
                            "switch1Valid": false,
                            "switch2Id": 1,
                            "switch2Valid": false,
                            "variableId": 1,
                            "variableValid": false,
                            "variableValue": 0
                        },
                        "directionFix": true,
                        "image": {
                            "tileId": 0,
                            "characterName": bosses[bossNumber].sheetName,
                            "direction": bosses[bossNumber].direction,
                            "pattern": bosses[bossNumber].pattern,
                            "characterIndex": bosses[bossNumber].charIndex
                        },
                        "list": [{
                            "code": 301,
                            "indent": 0,
                            "parameters": [0, bosses[bossNumber].troopID, false, true]
                        }, {
                            "code": 601,
                            "indent": 0,
                            "parameters": []
                        }, {
                            "code": 101,
                            "indent": 1,
                            "parameters": ["", 0, 2, 1]
                        }, {
                            "code": 401,
                            "indent": 1,
                            "parameters": ["An Exit Has Appeared . . ."]
                        }, {
                            "code": 121,
                            "indent": 1,
                            "parameters": [switchGate, 1, 0]
                        }, {
                            "code": 121,
                            "indent": 1,
                            "parameters": [switchBoss, 2, 0]
                        }, {
                            "code": 0,
                            "indent": 1,
                            "parameters": []
                        }, {
                            "code": 603,
                            "indent": 0,
                            "parameters": []
                        }, {
                            "code": 353,
                            "indent": 1,
                            "parameters": []
                        }, {
                            "code": 0,
                            "indent": 1,
                            "parameters": []
                        }, {
                            "code": 604,
                            "indent": 0,
                            "parameters": []
                        }, {
                            "code": 0,
                            "indent": 0,
                            "parameters": []
                        }],
                        "moveFrequency": 3,
                        "moveRoute": {
                            "list": [{
                                "code": 0,
                                "parameters": []
                            }],
                            "repeat": true,
                            "skippable": false,
                            "wait": false
                        },
                        "moveSpeed": 3,
                        "moveType": 0,
                        "priorityType": 1,
                        "stepAnime": false,
                        "through": false,
                        "trigger": 0,
                        "walkAnime": true
                    }, {
                        "conditions": {
                            "actorId": 1,
                            "actorValid": false,
                            "itemId": 1,
                            "itemValid": false,
                            "selfSwitchCh": "B",
                            "selfSwitchValid": false,
                            "switch1Id": switchBoss,
                            "switch1Valid": true,
                            "switch2Id": 1,
                            "switch2Valid": false,
                            "variableId": 1,
                            "variableValid": false,
                            "variableValue": 0
                        },
                        "directionFix": false,
                        "image": {
                            "characterIndex": 0,
                            "characterName": "",
                            "direction": 2,
                            "pattern": 0,
                            "tileId": 0
                        },
                        "list": [{
                            "code": 0,
                            "indent": 0,
                            "parameters": []
                        }],
                        "moveFrequency": 3,
                        "moveRoute": {
                            "list": [{
                                "code": 0,
                                "parameters": []
                            }],
                            "repeat": true,
                            "skippable": false,
                            "wait": false
                        },
                        "moveSpeed": 3,
                        "moveType": 0,
                        "priorityType": 0,
                        "stepAnime": false,
                        "through": false,
                        "trigger": 0,
                        "walkAnime": true
                    }],
                    "x": bossX,
                    "y": bossY
                };


                $dataMap.events.push(bossEvent);
                $dataMap.events.push(gateEvent);


                for(var currentChest in chestLocations) {
                    if (chestLocations.hasOwnProperty(currentChest)) {
                        if (chests[chestLocations[currentChest].index].eventType === 125) {
                            var chestEvent = {
                                "id": 3 + currentChest,
                                "name": "GoldChest",
                                "note": "",
                                "pages": [{
                                    "conditions": {
                                        "actorId": 1,
                                        "actorValid": false,
                                        "itemId": 1,
                                        "itemValid": false,
                                        "selfSwitchCh": "A",
                                        "selfSwitchValid": false,
                                        "switch1Id": 1,
                                        "switch1Valid": false,
                                        "switch2Id": 1,
                                        "switch2Valid": false,
                                        "variableId": 1,
                                        "variableValid": false,
                                        "variableValue": 0
                                    },
                                    "directionFix": true,
                                    "image": {
                                        "characterIndex": 0,
                                        "characterName": "!Chest",
                                        "direction": 2,
                                        "pattern": 1,
                                        "tileId": 0
                                    },
                                    "list": [{
                                        "code": 250,
                                        "indent": 0,
                                        "parameters": [{
                                            "name": "Chest1",
                                            "pan": 0,
                                            "pitch": 100,
                                            "volume": 90
                                        }]
                                    }, {
                                        "code": 205,
                                        "indent": 0,
                                        "parameters": [0, {
                                            "list": [{
                                                "code": 36
                                            }, {
                                                "code": 17
                                            }, {
                                                "code": 15,
                                                "parameters": [3]
                                            }, {
                                                "code": 18
                                            }, {
                                                "code": 15,
                                                "parameters": [3]
                                            }, {
                                                "code": 0
                                            }],
                                            "repeat": false,
                                            "skippable": false,
                                            "wait": true
                                        }]
                                    }, {
                                        "code": 505,
                                        "indent": 0,
                                        "parameters": [{
                                            "code": 36
                                        }]
                                    }, {
                                        "code": 505,
                                        "indent": 0,
                                        "parameters": [{
                                            "code": 17
                                        }]
                                    }, {
                                        "code": 505,
                                        "indent": 0,
                                        "parameters": [{
                                            "code": 15,
                                            "parameters": [3]
                                        }]
                                    }, {
                                        "code": 505,
                                        "indent": 0,
                                        "parameters": [{
                                            "code": 18
                                        }]
                                    }, {
                                        "code": 505,
                                        "indent": 0,
                                        "parameters": [{
                                            "code": 15,
                                            "parameters": [3]
                                        }]
                                    }, {
                                        "code": 123,
                                        "indent": 0,
                                        "parameters": ["A", 0]
                                    }, {
                                        "code": 125,
                                        "indent": 0,
                                        "parameters": [0, 0, chests[chestLocations[currentChest].index].goldValue]
                                    }, {
                                        "code": 101,
                                        "indent": 0,
                                        "parameters": ["", 0, 0, 2]
                                    }, {
                                        "code": 401,
                                        "indent": 0,
                                        "parameters": [chests[chestLocations[currentChest].index].goldValue + "\\G were found!"]
                                    }, {
                                        "code": 0,
                                        "indent": 0,
                                        "parameters": []
                                    }],
                                    "moveFrequency": 3,
                                    "moveRoute": {
                                        "list": [{
                                            "code": 0,
                                            "parameters": []
                                        }],
                                        "repeat": true,
                                        "skippable": false,
                                        "wait": false
                                    },
                                    "moveSpeed": 3,
                                    "moveType": 0,
                                    "priorityType": 1,
                                    "stepAnime": false,
                                    "through": false,
                                    "trigger": 0,
                                    "walkAnime": false
                                }, {
                                    "conditions": {
                                        "actorId": 1,
                                        "actorValid": false,
                                        "itemId": 1,
                                        "itemValid": false,
                                        "selfSwitchCh": "A",
                                        "selfSwitchValid": true,
                                        "switch1Id": 1,
                                        "switch1Valid": false,
                                        "switch2Id": 1,
                                        "switch2Valid": false,
                                        "variableId": 1,
                                        "variableValid": false,
                                        "variableValue": 0
                                    },
                                    "directionFix": true,
                                    "image": {
                                        "characterIndex": 0,
                                        "characterName": "!Chest",
                                        "direction": 8,
                                        "pattern": 1,
                                        "tileId": 0
                                    },
                                    "list": [{
                                        "code": 0,
                                        "indent": 0,
                                        "parameters": []
                                    }],
                                    "moveFrequency": 3,
                                    "moveRoute": {
                                        "list": [{
                                            "code": 0,
                                            "parameters": []
                                        }],
                                        "repeat": true,
                                        "skippable": false,
                                        "wait": false
                                    },
                                    "moveSpeed": 3,
                                    "moveType": 0,
                                    "priorityType": 1,
                                    "stepAnime": false,
                                    "through": false,
                                    "trigger": 0,
                                    "walkAnime": false
                                }],
                                "x": chestLocations[currentChest].x,
                                "y": chestLocations[currentChest].y
                            };
                        } else {
                            var chestEvent = {
                                "id": 3 + currentChest,
                                "name": "ItemWepArmChest",
                                "note": "",
                                "pages": [{
                                    "conditions": {
                                        "actorId": 1,
                                        "actorValid": false,
                                        "itemId": 1,
                                        "itemValid": false,
                                        "selfSwitchCh": "A",
                                        "selfSwitchValid": false,
                                        "switch1Id": 1,
                                        "switch1Valid": false,
                                        "switch2Id": 1,
                                        "switch2Valid": false,
                                        "variableId": 1,
                                        "variableValid": false,
                                        "variableValue": 0
                                    },
                                    "directionFix": true,
                                    "image": {
                                        "characterIndex": 0,
                                        "characterName": "!Chest",
                                        "direction": 2,
                                        "pattern": 1,
                                        "tileId": 0
                                    },
                                    "list": [{
                                        "code": 250,
                                        "indent": 0,
                                        "parameters": [{
                                            "name": "Chest1",
                                            "pan": 0,
                                            "pitch": 100,
                                            "volume": 90
                                        }]
                                    }, {
                                        "code": 205,
                                        "indent": 0,
                                        "parameters": [0, {
                                            "list": [{
                                                "code": 36
                                            }, {
                                                "code": 17
                                            }, {
                                                "code": 15,
                                                "parameters": [3]
                                            }, {
                                                "code": 18
                                            }, {
                                                "code": 15,
                                                "parameters": [3]
                                            }, {
                                                "code": 0
                                            }],
                                            "repeat": false,
                                            "skippable": false,
                                            "wait": true
                                        }]
                                    }, {
                                        "code": 505,
                                        "indent": 0,
                                        "parameters": [{
                                            "code": 36
                                        }]
                                    }, {
                                        "code": 505,
                                        "indent": 0,
                                        "parameters": [{
                                            "code": 17
                                        }]
                                    }, {
                                        "code": 505,
                                        "indent": 0,
                                        "parameters": [{
                                            "code": 15,
                                            "parameters": [3]
                                        }]
                                    }, {
                                        "code": 505,
                                        "indent": 0,
                                        "parameters": [{
                                            "code": 18
                                        }]
                                    }, {
                                        "code": 505,
                                        "indent": 0,
                                        "parameters": [{
                                            "code": 15,
                                            "parameters": [3]
                                        }]
                                    }, {
                                        "code": 123,
                                        "indent": 0,
                                        "parameters": ["A", 0]
                                    }, {
                                        "code": chests[chestLocations[currentChest].index].eventType,
                                        "indent": 0,
                                        "parameters": [chests[chestLocations[currentChest].index].itemId, 0, 0, 1]
                                    }, {
                                        "code": 101,
                                        "indent": 0,
                                        "parameters": ["", 0, 0, 2]
                                    }, {
                                        "code": 401,
                                        "indent": 0,
                                        "parameters": [chests[chestLocations[currentChest].index].name + " was found!"]
                                    }, {
                                        "code": 0,
                                        "indent": 0,
                                        "parameters": []
                                    }],
                                    "moveFrequency": 3,
                                    "moveRoute": {
                                        "list": [{
                                            "code": 0,
                                            "parameters": []
                                        }],
                                        "repeat": true,
                                        "skippable": false,
                                        "wait": false
                                    },
                                    "moveSpeed": 3,
                                    "moveType": 0,
                                    "priorityType": 1,
                                    "stepAnime": false,
                                    "through": false,
                                    "trigger": 0,
                                    "walkAnime": false
                                }, {
                                    "conditions": {
                                        "actorId": 1,
                                        "actorValid": false,
                                        "itemId": 1,
                                        "itemValid": false,
                                        "selfSwitchCh": "A",
                                        "selfSwitchValid": true,
                                        "switch1Id": 1,
                                        "switch1Valid": false,
                                        "switch2Id": 1,
                                        "switch2Valid": false,
                                        "variableId": 1,
                                        "variableValid": false,
                                        "variableValue": 0
                                    },
                                    "directionFix": true,
                                    "image": {
                                        "characterIndex": 0,
                                        "characterName": "!Chest",
                                        "direction": 8,
                                        "pattern": 1,
                                        "tileId": 0
                                    },
                                    "list": [{
                                        "code": 0,
                                        "indent": 0,
                                        "parameters": []
                                    }],
                                    "moveFrequency": 3,
                                    "moveRoute": {
                                        "list": [{
                                            "code": 0,
                                            "parameters": []
                                        }],
                                        "repeat": true,
                                        "skippable": false,
                                        "wait": false
                                    },
                                    "moveSpeed": 3,
                                    "moveType": 0,
                                    "priorityType": 1,
                                    "stepAnime": false,
                                    "through": false,
                                    "trigger": 0,
                                    "walkAnime": false
                                }],
                                "x": chestLocations[currentChest].x,
                                "y": chestLocations[currentChest].y
                            };
                        }
                        $dataMap.events.push(chestEvent);
                    }
                }

                if(!useRandom) {
                    for (var currentTroop in troopLocations) {
                        if (troopLocations.hasOwnProperty(currentTroop)) {
                            var troopEvent = {
                                "id": 3 + chestLocations.length + currentTroop,
                                "name": "MapTroop",
                                "note": "",
                                "pages": [{
                                    "conditions": {
                                        "actorId": 1,
                                        "actorValid": false,
                                        "itemId": 1,
                                        "itemValid": false,
                                        "selfSwitchCh": "A",
                                        "selfSwitchValid": false,
                                        "switch1Id": 1,
                                        "switch1Valid": false,
                                        "switch2Id": 1,
                                        "switch2Valid": false,
                                        "variableId": 1,
                                        "variableValid": false,
                                        "variableValue": 0
                                    },
                                    "directionFix": false,
                                    "image": {
                                        "tileId": 0,
                                        "characterName": troops[troopLocations[currentTroop].index].sheetName,
                                        "direction": troops[troopLocations[currentTroop].index].direction,
                                        "pattern": troops[troopLocations[currentTroop].index].pattern,
                                        "characterIndex": troops[troopLocations[currentTroop].index].charIndex
                                    },
                                    "list": [{
                                        "code": 301,
                                        "indent": 0,
                                        "parameters": [0, troops[troopLocations[currentTroop].index].troopID, false, true]
                                    }, {
                                        "code": 123,
                                        "indent": 0,
                                        "parameters": ["A", 0]
                                    }, {
                                        "code": 0,
                                        "indent": 0,
                                        "parameters": []
                                    }],
                                    "moveFrequency": 5,
                                    "moveRoute": {
                                        "list": [{
                                            "code": 45,
                                            "parameters": ["this._chaseRange = 8"],
                                            "indent": null
                                        }, {
                                            "code": 45,
                                            "parameters": ["this._chaseSpeed = 5"],
                                            "indent": null
                                        }, {
                                            "code": 45,
                                            "parameters": ["this._sightLock = 300"],
                                            "indent": null
                                        }, {
                                            "code": 45,
                                            "parameters": ["this._seePlayer = true"],
                                            "indent": null
                                        }, {
                                            "code": 9,
                                            "indent": null
                                        }, {
                                            "code": 0,
                                            "parameters": []
                                        }],
                                        "repeat": true,
                                        "skippable": false,
                                        "wait": false
                                    },
                                    "moveSpeed": 4,
                                    "moveType": 3,
                                    "priorityType": 1,
                                    "stepAnime": false,
                                    "through": false,
                                    "trigger": 2,
                                    "walkAnime": true
                                }, {
                                    "conditions": {
                                        "actorId": 1,
                                        "actorValid": false,
                                        "itemId": 1,
                                        "itemValid": false,
                                        "selfSwitchCh": "A",
                                        "selfSwitchValid": true,
                                        "switch1Id": 2,
                                        "switch1Valid": false,
                                        "switch2Id": 1,
                                        "switch2Valid": false,
                                        "variableId": 1,
                                        "variableValid": false,
                                        "variableValue": 0
                                    },
                                    "directionFix": false,
                                    "image": {
                                        "characterIndex": 0,
                                        "characterName": "",
                                        "direction": 2,
                                        "pattern": 0,
                                        "tileId": 0
                                    },
                                    "list": [{
                                        "code": 0,
                                        "indent": 0,
                                        "parameters": []
                                    }],
                                    "moveFrequency": 3,
                                    "moveRoute": {
                                        "list": [{
                                            "code": 0,
                                            "parameters": []
                                        }],
                                        "repeat": true,
                                        "skippable": false,
                                        "wait": false
                                    },
                                    "moveSpeed": 3,
                                    "moveType": 0,
                                    "priorityType": 0,
                                    "stepAnime": false,
                                    "through": false,
                                    "trigger": 0,
                                    "walkAnime": true
                                }],
                                "x": troopLocations[currentTroop].x,
                                "y": troopLocations[currentTroop].y
                            };
                            $dataMap.events.push(troopEvent);
                        }
                    }
                }


            }
            DataManager.onLoad($dataMap);

        } else {
            var xhr = new XMLHttpRequest();
            var url = 'data/' + src;
            xhr.open('GET', url);
            xhr.overrideMimeType('application/json');
            xhr.onload = function () {
                if (xhr.status < 400) {
                    window[name] = JSON.parse(xhr.responseText);
                    DataManager.onLoad(window[name]);
                }
            };
            xhr.onerror = function () {
                DataManager._errorUrl = DataManager._errorUrl || url;
            };
            window[name] = null;
            xhr.send();
        }

    };

})();