//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.14;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.14] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the default battle system (DTB).
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB wait: Time Progress Battle (Wait)
 *     - -
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 *
 * Misc
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Outline Color:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 *
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @max 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @max 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @max 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @max 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @max 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @max 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"2","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"NameInput":"","EnableNameInput:eval":"true","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress the \\\\c[5]arrow keys\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","LargerResolution":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFromt(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game is started.
 * @default 0
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 0
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Misc
 * @text Misc
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Misc
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Outline Color
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress the \\c[5]arrow keys\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0] to use to keyboard."
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param LargerResolution
 * @text Larger Resolution
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
//=============================================================================

const _0x45c4=['SellBgType','nrgOR','PDR','XParamVocab6','_CoreEngine_Cache_textSizeEx','tDchN','nInBL','_hp','SaveMenu','Scene_Boot_startNormalGame','mpColor','Bitmap_blt','isRepeated','DummyBgType','backOpacity','drawActorNickname','catchUnknownError','DefaultStyle','ActorTPColor','BaseTexture','xparamRate','ixojo','Game_Picture_updateMove','drawParamName','_stored_powerUpColor','updateCoreEasing','AtRhQ','pNvPm','setMoveEasingType','shake','setSideView','([\x5c+\x5c-]\x5cd+)>','ColorCTGauge2','processFauxAnimationRequests','_editWindow','Scene_Menu_create','TTUhi','Kjkmt','_spriteset','PGUP','_sideButtonLayout','Window_NameInput_refresh','onMoveEnd','XParamVocab1','GRD','jIFbM','(\x5cd+)([%％])>','fsDKt','setBackgroundOpacity','iconWidth','refresh','_pageupButton','fillText','CategoryRect','YSjDj','tilesets','Game_Action_itemHit','HqDZL','Input_clear','nVntP','INCIRC','createButtonAssistWindow','missed','PreserveNumbers','PERCENT','qhodG','children','jcuHz','Window_Gold_refresh','F7key','Bitmap_drawTextOutline','_targetOffsetX','maxLvGaugeColor1','Scene_Shop_create','_pictureContainer','_movementDuration','maxLevel','_shouldPreventDefault','destroy','INOUTSINE','nMGnA','Window_Selectable_processTouch','_stored_mpCostColor','INCUBIC','Window','LFBDe','updateOpacity','isNextScene','EVA','save','reserveCommonEvent','volume','loLvo','easingType','enableDigitGrouping','weHHZ','Plus2','Basic','drawValue','Game_Picture_calcEasing','vaSnO','open','setActorHomeRepositioned','setLastPluginCommandInterpreter','mute','Scene_Base_createWindowLayer','attackSkillId','retrieveFauxAnimation','Flat1','PLAY','buttonAssistOffset1','process_VisuMZ_CoreEngine_Settings','Bitmap_clearRect','oNnvR','ColorExpGauge1','FgMAE','isOpen','disable','SPACE','Gold','RightMenus','FFpyE','includes','pictureId','HRG','_movementWholeDuration','IconParam4','INOUTBOUNCE','DrawItemBackgroundJS','fontSize','_backSprite1','FontSize','_windowLayer','CTRL','drawNewParam','resetBattleSystem','GoldFontSize','Scene_Map_initialize','xparamRateJS','IconSParam0','sparamRateJS','level','snapForBackground','AMPERSAND','Window_NameInput_initialize','GxzFD','ParseAllNotetags','iKSXT','_stored_expGaugeColor1','wholeDuration','aneek','isBusy','SParameterFormula','MAT','#%1','createBackground','map','Window_StatusBase_drawActorLevel','evaluate','resize','TranslucentOpacity','WIN_OEM_COPY','catchLoadError','buttonAssistOk','PRINTSCREEN','StatusParamsBgType','maxLvGaugeColor2','initButtonHidden','NsaNi','_stored_systemColor','STRUCT','EREOF','hTdtL','iAdGx','skillId','PositionJS','ShowButtons','setSideButtonLayout','setAttack','Window_Base_drawCharacter','version','NUMPAD9','_backgroundSprite','_stored_ctGaugeColor1','WIN_OEM_WSCTRL','playMiss','initCoreEngine','asin','GoldIcon','NuJcQ','SceneManager_initialize','createBuffer','none','TitleCommandList','SMQLz','Scene_Boot_loadSystemImages','expGaugeColor2','slice','optSideView','_commandWindow','clamp','makeDocumentTitle','gameTitle','iBXJB','setGuard','Window_Base_textSizeEx','URUgf','WIN_ICO_00','SParamVocab3','buttonAssistKey2','_forcedBattleSys','titles2','MRF','toUpperCase','ColorMaxLvGauge1','playEscape','startMove','remove','buttonAssistText3','Control\x20Variables\x20Script\x20Error','createCommandWindow','_optionsWindow','processBack','onPress','DTB','kwKgd','_stored_maxLvGaugeColor2','_destroyInternalTextures','mpCostColor','Bitmap_measureTextWidth','FadeSpeed','dbGep','animationId','updateOrigin','initCoreEngineScreenShake','UsIgP','tZFSp','helpAreaTopSideButtonLayout','random','_colorCache','_maxDigits','boxWidth','aCsNA','addLoadListener','option','SParamVocab2','_actorWindow','resetTextColor','Scene_Status_create','JDmbu','initialLevel','setupCoreEasing','openness','requestFauxAnimation','INQUINT','isOptionValid','Hueyq','PictureFilename','OeJrL','ColorExpGauge2','Rate','DrawIcons','meVolume','match','Bitmap_drawText','OutlineColor','inFKB','GoldRect','bgsVolume','GLZJi','valueOutlineWidth','battlebacks1','_pressed','Sprite_Button_updateOpacity','HelpRect','ProfileRect','currencyUnit','UAymF','STENCIL_TEST','TitlePicButtons','CANCEL','(\x5cd+\x5c.?\x5cd+)>','Bitmap_strokeRect','updatePositionCoreEngine','IconParam5','split','REC','INSINE','QzdTW','LEFT','TextCodeClassNames','isBeingTouched','OPEN_BRACKET','drawIconBySize','ARRAYFUNC','MEGzV','system','MenuBg','CEV','Padding','targetSpritePosition','rRoKS','atbActive','CodeJS','ActorMPColor','Window_Selectable_cursorDown','ifWUS','horzJS','inBattle','MveoC','drawGameTitle','processCursorMove','setEasingType','CustomParamType','drawFace','ibnLB','setCoreEngineScreenShakeStyle','NUMPAD1','createCustomParameter','VOLUME_MUTE','buttonAssistWindowButtonRect','profileWindowRect','_drawTextOutline','xopCj','dimColor1','ctGaugeColor2','isItemStyle','horizontal','SCROLL_LOCK','isEnabled','cursorRight','traitsPi','setCoreEngineUpdateWindowBg','ColorHPGauge1','rveDC','contentsBack','Duration','isSmartEventCollisionOn','drawActorExpGauge','paramPlusJS','yGcyV','buttonAssistWindowRect','makeCoreEngineCommandList','Window_Selectable_processCursorMove','CancelText','height','padding','ItemPadding','aBqOl','TywWN','MEV','max','TtrCY','Color','PwqMT','ParseWeaponNotetags','EnableMasking','NumberRect','playBuzzer','Window_NameInput_processTouch','uiAreaWidth','OnLoadJS','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','LoadError','FDR','mainAreaBottom','nw.gui','_anchor','Enemy','setupValueFont','_inputSpecialKeyCode','xparamPlus','nxRUB','EQUALS','DECIMAL','Scene_MenuBase_mainAreaHeight','textColor','_backSprite2','kobuZ','RYDCf','Spriteset_Base_updatePosition','move','targetBackOpacity','BgFilename2','JUNJA','_statusEquipWindow','setSkill','WgvfZ','_inputString','NoTileShadows','updateEffekseer','seVolume','updatePictureAntiZoom','outlineColor','isKeyItem','BACK_SLASH','Window_NumberInput_processDigitChange','updateAnchor','goldWindowRect','RZTfA','isHovered','TSmEf','XloXI','bitmapWidth','HWpLz','ImgLoad','xparamRate2','switchModes','quNOf','textSizeEx','HelpBgType','performEscape','_targetOffsetY','bZpvj','bgmVolume','IconXParam4','BgFilename1','CTB','params','FontSmoothing','QwertyLayout','fillStyle','_slotWindow','CustomParamIcons','getInputMultiButtonStrings','CustomParam','get','sparamFlat2','amuTi','COLON','members','TextStr','CRI','process_VisuMZ_CoreEngine_RegExp','isInputting','TWBNk','isFullDocumentTitle','Game_Picture_show','QUOTE','DOWN','_coreEasingType','buttonAssistCancel','isMaxLevel','rowSpacing','ATTN','onDatabaseLoaded','INOUTEXPO','HMOEn','stencilOp','_opening','xparamFlatJS','checkCacheKey','<%1\x20%2:[\x20]','drawGoldItemStyle','_shakeDuration','Game_Actor_changeClass','hrFOo','isActor','destroyCoreEngineMarkedBitmaps','ieGJu','FINAL','F6key','zwiFF','mainAreaTopSideButtonLayout','updateFauxAnimations','IconParam1','onNameOk','bitmapHeight','LineHeight','Sprite_Button_initialize','owDmQ','_stored_hpGaugeColor1','_screenX','SystemSetWindowPadding','SrbkU','STENCIL_BUFFER_BIT','INOUTCUBIC','_animation','repositionCancelButtonSideButtonLayout','_stored_ctGaugeColor2','TECYL','NumberBgType','setAction','DisplayedParams','targetY','getCoreEngineScreenShakeStyle','titles1','isMenuButtonAssistEnabled','isExpGaugeDrawn','_fauxAnimationQueue','addWindow','_centerElement','Key%1','INELASTIC','initVisuMZCoreEngine','aMnFa','buttonAssistText1','sbfuw','zOJIb','ColorMPGauge1','Scene_MenuBase_helpAreaTop','_tempActor','FtIUL','anchor','changeClass','xparamFlatBonus','equips','isNumpadPressed','IconXParam6','touchUI','kcsqy','hBTMk','dimColor2','ASTERISK','isClickEnabled','SystemSetSideView','sFHcO','IconXParam8','Type','loadPicture','lineHeight','xparamFlat1','paramMaxJS','FnjHj','drawText','F24','SkCVX','IconSParam2','MItRx','kqNjK','TILDE','sparamPlus1','IlslZ','batch','crisisColor','isSpecialCode','Sprite_Picture_updateOrigin','F22','ColorSystem','fCyep','removeFauxAnimation','maxItems','waiting','EQUAL','Rewgt','changeTextColor','_stored_crisisColor','JXspM','UWcPT','jsQuickFunc','_data','itemSuccessRate','MAXMP','F10','hdvTB','isHandled','wIMsf','cursorPagedown','terminate','loadSystem','dXHyY','Window_Base_drawIcon','sv_enemies','displayX','transform','Game_Interpreter_command111','damageColor','DataManager_setupNewGame','createWindowLayer','itemPadding','sparamRate1','sparamPlus','length','setHome','clearStencil','BgType','YMgiw','WIN_OEM_ATTN','floor','Game_Interpreter_command122','MrWmN','DimColor1','Game_Screen_initialize','maxBattleMembers','parse','McIai','getLevel','isMVAnimation','Scene_Map_updateMainMultiply','pictures','ColorTPGauge1','down','repeat','Window_NumberInput_start','statusWindowRect','setActorHome','LqBVh','ListRect','Graphics_defaultStretchMode','destroyed','_commandList','_CoreEngineSettings','drawSegment','note','process_VisuMZ_CoreEngine_CustomParameters','EXR','ZsHSm','sv_actors','CLOSE_CURLY_BRACKET','xparamPlus2','EtSbr','awDLc','setupButtonImage','RegExp','ShowItemBackground','reservePlayTestNewGameCommonEvent','uPNjW','processSoundTimings','WIN_OEM_JUMP','biGEx','_goldWindow','titleCommandWindow','moveMenuButtonSideButtonLayout','Game_Interpreter_PluginCommand','KEOXd','Scene_Map_createMenuButton','itypeId','qsZlc','sypuj','ListBgType','Game_Event_isCollidedWithEvents','PIPE','return\x200','INBOUNCE','CNT','drawActorSimpleStatus','isGameActive','INOUTBACK','buttonAssistKey1','Window_NameInput_cursorLeft','Game_Picture_move','MULTIPLY','playOk','_isWindow','CallHandlerJS','oPAPj','LUK','targetOpacity','setTargetAnchor','loadTitle2','PictureEraseRange','hRFZv','MDF','_lastPluginCommandInterpreter','isPlaying','KeyUnlisted','_hideTileShadows','addChild','Scene_Equip_create','isNormalPriority','ntIEx','XtDRL','kSpsc','ActorHPColor','initialBattleSystem','ColorManager_loadWindowskin','REPLACE','Brjzp','_actor','updateLastTarget','MIN_SAFE_INTEGER','calcCoreEasing','en-US','NEAREST','Linear','Settings','_buyWindow','Bitmap_resize','ZOOM','ActorRect','ShopMenu','CRSEL','setMute','Rate2','Wait','Version','nkKTh','WIN_ICO_CLEAR','IconXParam3','playCursorSound','sparamRate','iLWGa','reduce','paramWidth','_stored_expGaugeColor2','ParseItemNotetags','statusEquipWindowRect','_hideButtons','Spriteset_Base_update','type','initCoreEasing','bind','KEEP','IconSParam1','Speed','qfZao','Game_BattlerBase_refresh','index','width','createTitleButtons','AntiZoomPictures','veCnM','CommandList','setBackgroundType','StatusRect','end','sWZEK','buttonAssistKey3','ButtonAssist','OS_KEY','clearRect','dxJnA','isActiveTpb','buttonAssistText4','RIGHT','NUMPAD2','Sprite_Animation_processSoundTimings','create','encounterStepsMinimum','blt','XRUqU','yScrollLinkedOffset','_digitGrouping','_stored_pendingColor','FJZCT','cursorLeft','setup','fadeSpeed','hit','description','ujXvm','setAnchor','currentClass','WSxuY','EsKfy','removeAllFauxAnimations','initBasic','BasicParameterFormula','HYPHEN_MINUS','SMnrb','windowPadding','IconSParam7','setWindowPadding','_onKeyDown','Game_System_initialize','_isPlaytest','IconXParam2','skillTypes','CONVERT','fillRect','drawBackgroundRect','ALT','Scene_Unlisted','TPB\x20ACTIVE','enableDigitGroupingEx','gjxvc','result','ZaEjR','numActions','_realScale','isFauxAnimationPlaying','_registerKeyInput','paramRate1','levelUpRecovery','zruiM','playTestF6','_closing','OUTCUBIC','doGGP','Spriteset_Battle_createEnemies','UNDERSCORE','processMoveCommand','trim','updateMove','param','makeDeepCopy','paramchangeTextColor','processKeyboardHome','loadSystemImages','clCpG','getButtonAssistLocation','enter','filter','refreshDimmerBitmap','Graphics_centerElement','useDigitGroupingEx','isUseModernControls','RhDao','tab','_addShadow','isPressed','loadGameImagesCoreEngine','drawIcon','filters','OpenConsole','text','startAnimation','%2%1%3','opacity','END','_paramPlus','optionsWindowRect','catchException','deselect','drawAllParams','Game_Map_setup','iconHeight','advanced','buttonAssistText%1','_menuButton','background','LoadMenu','CategoryBgType','setFrame','createFauxAnimation','movePageButtonSideButtonLayout','Yqskg','Game_Interpreter_command355','JXdoC','consumeItem','child_process','ProfileBgType','cursorDown','anchorCoreEasing','paramBase','INOUTQUART','ValueJS','InputBgType','maxGold','Sprite_destroy','showFauxAnimations','CoreEngine','drawCharacter','drawCurrentParam','CdyeN','ParseStateNotetags','originalJS','SLEEP','_dummyWindow','Conditional\x20Branch\x20Script\x20Error','Kmwes','loadWindowskin','processCursorMoveModernControls','HCqJB','Game_Picture_x','pixelated','systemColor','_moveEasingType','_skillTypeWindow','isPlaytest','ButtonFadeSpeed','PictureEasingType','itemEva','Game_Temp_initialize','TVdim','CrisisRate','_dimmerSprite','rTsaI','getBattleSystem','ColorCTGauge1','Game_Picture_initBasic','OqSub','Abbreviation','applyCoreEasing','GameEnd','StatusEquipBgType','zIKEC','randomJS','registerCommand','_numberWindow','default','StatusParamsRect','itemHitImprovedAccuracy','pageup','HIT','isBottomButtonMode','DEF','XParameterFormula','GoldBgType','rightArrowWidth','areButtonsHidden','TRAIT_PARAM','DigitGroupingGaugeSprites','SAOLe','dummyWindowRect','xparam','Bhbsp','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','_context','ParseClassNotetags','XParamVocab2','endAnimation','Window_Selectable_drawBackgroundRect','_buttonAssistWindow','DfUzM','original','number','contents','pictureButtons','DigitGroupingStandardText','TextManager_param','IconXParam9','measureTextWidth','BattleManager_processEscape','LvExpGauge','targetContentsOpacity','updateBackOpacity','Window_NameInput_cursorRight','processDigitChange','isBottomHelpMode','FJtLD','substring','stypeId','style','processCursorHomeEndTrigger','HQldq','buttonAssistKey%1','ZERO','itemRect','ColSpacing','DigitGroupingDamageSprites','PHA','Symbol','_storedStack','makeTargetSprites','GoldChange','nickname','RevertPreserveNumbers','isCollidedWithEvents','sparamFlatBonus','currentExp','menuShowButton','_cancelButton','(\x5cd+)>','mgJGe','Game_Action_itemEva','areButtonsOutsideMainUI','ATK','xPvhi','MRG','createFauxAnimationSprite','paramName','PRESERVCONVERSION(%1)','currentValue','call','HUwKY','sparamRate2','drawGameVersion','ONE_MINUS_SRC_ALPHA','Game_Actor_paramBase','LINEAR','SideView','BottomHelp','apply','ParamName','ButtonHeight','Lwvhj','tOGSO','exec','xASPz','contains','dhvdm','INQUAD','WIN_OEM_BACKTAB','Scene_Battle_update','Bitmap_fillRect','numberWindowRect','ModernControls','FontShadows','createCancelButton','ColorHPGauge2','resetFontSettings','BuyRect','scaleSprite','buttonAssistKey5','IOEmb','_playtestF7Looping','F14','process_VisuMZ_CoreEngine_Notetags','enOnQ','sISxT','mainAreaHeight','iDKtW','IconSet','_drawTextShadow','sqrt','Bitmap_drawCircle','drawTextEx','buttonAssistOffset4','Graphics','GJxAk','cancelShowButton','CLOSE_PAREN','ApplyEasing','XParamVocab5','helpWindowRect','EncounterRateMinimum','top','setupCoreEngine','BvWot','ScreenShake','F13','KSsEb','ZICoT','processKeyboardDigitChange','UoMdm','paramY','XParamVocab9','setClickHandler','Scene_Item_create','SLASH','ItemBgType','OptionsBgType','_offsetX','kxPVI','lvFwi','_stored_tpCostColor','ItemBackColor2','format','_stored_hpGaugeColor2','skillTypeWindowRect','nGjSH','xkKRm','ColorMPGauge2','openingSpeed','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','playTestF7','paramRateJS','EndingID','subjectHitRate','RepositionActors','Scene_Boot_updateDocumentTitle','LCMRF','parallaxes','_itemWindow','_clickHandler','HELP','bHldt','xparamRate1','PAAwB','MAXHP','targetEvaRate','_playTestFastMode','scale','deathColor','updateMain','_stored_maxLvGaugeColor1','OUTQUINT','NUMPAD7','SceneManager_isGameActive','constructor','SideButtons','scaleMode','stringKeyMap','keyCode','displayY','StatusBgType','_hovered','MainMenu','ColorCrisis','paramBaseAboveLevel99','ShowJS','DigitGroupingLocale','KqnYS','NONCONVERT','xScrollLinkedOffset','KeyboardInput','setMainFontSize','NUMPAD8','Script\x20Call\x20Error','moveCancelButtonSideButtonLayout','_stored_tpGaugeColor1','IconSParam8','backspace','DigitGroupingExText','animationBaseDelay','Layer','home','gainGold','%1%2','McHBM','getColor','paramFlatBonus','isSideButtonLayout','ONE','ARRAYNUM','ConvertParams','hideButtonFromView','Max','FunctionName','SParamVocab0','OZDZn','numberShowButton','SnapshotOpacity','ColorGaugeBack','bmSsX','smallParamFontSize','subject','CreateBattleSystemID','F17','isCursorMovable','toFixed','Tilemap_addShadow','min','strokeRect','listWindowRect','GroupDigits','YXRmq','SParamVocab1','F12','_digitGroupingEx','SParamVocab8','Bitmap_gradientFillRect','kaevS','createDigits','maxCols','onMouseEnter','OptionsMenu','SParamVocab6','TCR','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','IconSParam5','drawRightArrow','JSON','Scene_Name_create','fUZXC','openURL','faces','isAlive','Enable','BuyBgType','_coreEngineShakeStyle','drawActorClass','nQICw','NewGameCommonEvent','RuTTG','_shakePower','layoutSettings','ParseArmorNotetags','ARRAYSTRUCT','ADD','_mainSprite','ItemStyle','shift','_shakeSpeed','updateOpen','active','yXpFh','process_VisuMZ_CoreEngine_jsQuickFunctions','hLxvs','DqJBY','EnableJS','bvgSz','flush','drawGameSubtitle','drawParamText','Power','Scene_MenuBase_createPageButtons','isTriggered','OUTCIRC','stencilFunc','GoldOverlap','faceWidth','setActionState','_inputWindow','isAnimationForEach','mvuaY','makeEncounterCount','_mode','gIEfZ','gaugeRate','_muteSound','YtbaP','WindowLayer_render','mavrK','isItem','_sellWindow','updatePlayTestF7','markCoreEngineModified','_profileWindow','updateClose','button','Scene_MenuBase_createBackground','createPageButtons','Window_Base_drawText','lgczi','DummyRect','toString','EscapeAlways','xparamPlus1','Plus','HxUkA','CommandRect','TGR','NFVBB','Window_ShopSell_isEnabled','ItemBackColor1','isNwjs','IconXParam7','GhOoA','commandWindowRect','_helpWindow','SBnfS','onClick','Scene_Options_create','CONTEXT_MENU','areTileShadowsHidden','_defaultStretchMode','pop','nRwwQ','select','onKeyDown','TextFmt','getCustomBackgroundSettings','title','_stored_mpGaugeColor1','ItemHeight','STB','0.00','Window_NameInput_cursorPagedown','SceneManager_onKeyDown','update','DOLLAR','ctGaugeColor1','sparam','ParamChange','_targetAnchor','contentsOpacity','_repositioned','UMchw','qRzrm','updateMainMultiply','BACKSPACE','innerWidth','render','addCommand','Window_Base_createTextState','updateDocumentTitle','Scene_Battle_createCancelButton','Window_Selectable_itemRect','_categoryWindow','Scene_Boot_onDatabaseLoaded','Input_setupEventHandlers','_stored_deathColor','processKeyboardBackspace','Window_NameInput_cursorUp','TimeProgress','skipBranch','MAX_SAFE_INTEGER','XParamVocab0','updateKeyText','renderNoMask','Game_Actor_levelUp','setupNewGame','exp','Window_NameInput_cursorDown','BoxMargin','ONihP','eventsXyNt','XParamVocab4','loadTitle1','yAreN','EnableNumberInput','RequireFocus','targetScaleX','oYHAt','vfght','F11','isSideView','guardSkillId','DamageColor','worldTransform','loadBitmap','CAPSLOCK','characters','PERIOD','Game_Character_processMoveCommand','keyboard','setHandler','WroDj','keyMapper','drawCurrencyValue','Window_Base_drawFace','glCVR','applyEasing','gcRsV','process_VisuMZ_CoreEngine_Functions','ItemRect','buttonAssistKey4','showDevTools','eIrHM','VOIjm','uUKyE','bJiAg','isMapScrollLinked','_isButtonHidden','win32','KeyItemProtect','deOcu','_createInternalTextures','getInputButtonString','iJGSQ','focus','ALWAYS','escape','LORCj','_backgroundFilter','Spriteset_Base_initialize','Sprite_Actor_setActorHome','Game_Troop_setup','getColorDataFromPluginParameters','OpenURL','ColorTPCost','pagedown','tpCostColor','vfryn','Game_Party_consumeItem','ColorPowerDown','INOUTQUINT','F23','center','RepositionEnemies','SParamVocab9','start','randomInt','expGaugeColor1','initDigitGrouping','ESC','Untitled','prototype','MultiKeyFmt','editWindowRect','picture','eRsgp','gradientFillRect','setSize','itemBackColor2','Flat2','mpGaugeColor1','paramPlus','sparamPlusJS','gaugeBackColor','sparamFlatJS','OUTELASTIC','wLhgk','_scene','_coreEasing','push','rMeoV','Page','animations','command357','processHandling','Scene_Skill_create','VWvzQ','ImprovedAccuracySystem','Sprite_Gauge_currentValue','paramFlatJS','EditBgType','ColorPowerUp','textWidth','Sprite_Battler_startMove','ReAhF','Subtitle','LjpRf','CommandWidth','framebuffer','_internalTextures','performMiss','URL','_pagedownButton','ColorTPGauge2','test','Graphics_printError','AccuracyBoost','catchNormalError','mDTHl','Game_BattlerBase_initMembers','replace','commandWindowRows','vybmJ','SParamVocab5','F20','EISU','CIRCUMFLEX','defineProperty','zZnXA','_baseTexture','itemHeight','exit','TextJS','img/%1/','wwDEJ','string','initialize','mainAreaHeightSideButtonLayout','pendingColor','_effectsContainer','OUTQUART','GQmYV','BottomButtons','UROOs','IconParam6','hpGaugeColor1','_fauxAnimationSprites','VOLUME_DOWN','buttonAssistOffset3','sin','Window_StatusBase_drawActorSimpleStatus','NUMPAD0','NspVr','_offsetY','isClosed','DATABASE','isOpenAndActive','WIN_OEM_RESET','KTJeJ','ShowDevTools','evade','onMouseExit','useDigitGrouping','ActorBgType','processEscape','ZxgUC','MODECHANGE','([\x5c+\x5c-]\x5cd+)([%％])>','getBackgroundOpacity','imageSmoothingEnabled','CommandBgType','drawActorLevel','processKeyboardEnd','Scene_MenuBase_createCancelButton','updatePositionCoreEngineShakeOriginal','setBattleSystem','applyForcedGameTroopSettingsCoreEngine','adjustBoxSize','lzbHn','animationNextDelay','ZiNzZ','Game_Picture_y','vertJS','battlebacks2','integer','vQYHu','right','dcSjO','CustomParamAbb','createChildSprite','show','retreat','subtitle','WIN_OEM_AUTO','ParseActorNotetags','isWindowMaskingEnabled','SmartEventCollisionPriority','WIN_OEM_FJ_MASSHOU','learnings','LESS_THAN','cRPaX','IconXParam1','TxgBT','ForceNoPlayTest','INEXPO','RPUAJ','helpAreaHeight','tileHeight','SParamVocab4','BattleSystem','processTouchModernControls','uKEyD','drawGauge','IconSParam9','FCAbL','ParseEnemyNotetags','OUTBOUNCE','startNormalGame','text%1','xparamPlusJS','itemHit','inputWindowRect','onEscapeSuccess','_statusWindow','tpGaugeColor2','_stored_mpGaugeColor2','HOME','repositionEnemiesByResolution','Vpuhy','setEnemyAction','onButtonImageLoad','agAWA','DaSAI','NUM','_changingClass','TRG','makeInputButtonString','DELETE','bitmap','eva','targetObjects','uNTkJ','createEnemies','currentLevelExp','LevelUpFullHp','backgroundBitmap','RkmtU','ctrlKey','mhp','createFauxAnimationQueue','StatusMenu','OUTSINE','ZDnvh','OPEN_CURLY_BRACKET','SEPARATOR','PRINT','Location','blockWidth','mpGaugeColor2','processTouch','traitObjects','WIN_OEM_FJ_TOUROKU','stretch','StatusEquipRect','command111','buttonAssistSwitch','_listWindow','createCustomBackgroundImages','_cache','command122','ColorMaxLvGauge2','processKeyboardHandling','Param','value','isPhysical','erasePicture','VYUMZ','evaded','MenuLayout','DimColor2','buttonAssistText2','VisuMZ_2_BattleSystemCTB','WIN_OEM_CUSEL','OLjta','Input_onKeyDown','makeCommandList','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','MDR','QUESTION_MARK','_customModified','charCode','inbounce','item','updatePositionCoreEngineShakeVert','vCpYV','CustomParamNames','clearCachedKeys','cursorUp','paramValueByName','paramFlat','WIN_OEM_FJ_JISHO','JBMvH','_forcedTroopView','visible','Total','smoothSelect','down2','MRVsY','name','WIN_OEM_PA3','Title','truAD','VisuMZ_1_OptionsCore','canUse','XGtSt','command355','createMenuButton','isMaskingEnabled','cos','powerDownColor','itemWindowRect','QoL','sparamPlus2','BlurFilter','ParseTilesetNotetags','WIN_OEM_FINISH','ConvertNumberToString','itemLineRect','SParamVocab7','getLastPluginCommandInterpreter','actor','ParseSkillNotetags','levelUp','_number','clearZoom','Scene_MenuBase_mainAreaTop','expRate','printError','Sprite_Gauge_gaugeRate','clear','isDying','ParamMax','round','%1/','terms','removeChild','Scene_GameEnd_createBackground','actorWindowRect','MCR','statusParamsWindowRect','createJsQuickFunction','centerSprite','playCursor','XParamVocab3','worSt','log','Renderer','StartID','SEMICOLON','onKeyDownKeysF6F7','EXCLAMATION','paramMax','cancel','TLNxt','add','parseForcedGameTroopSettingsCoreEngine','CLOSE_BRACKET','_setupEventHandlers','buttonAssistWindowSideRect','InputRect','calcEasing','AGI','ExtJS','usableSkills','FjyCh','key%1','hpGaugeColor2','Game_Action_updateLastTarget','HQEwE','INOUTQUAD','adjustSprite','bgm','updatePadding','boxHeight','Input_shouldPreventDefault','mmp','CLEAR','keypress','Icon','UEBHc','gaugeLineHeight','buttonAreaHeight','DocumentTitleFmt','status','toLocaleString','bgs','mQgIM','_screenY','qWGDP','LeJPj','cursorPageup','Spriteset_Base_destroy','_mp','Wqihg','uiAreaHeight','forceOutOfPlaytest','PA1','LevelUpFullMp','_blank','isArrowPressed','determineSideButtonLayoutValid','clearForcedGameTroopSettingsCoreEngine','targetX','pow','ColorNormal','Plus1','BACK_QUOTE','Sprite_AnimationMV_processTimingData','updatePosition','uWjrt','platform','moveRelativeToResolutionChange','enemies','SCALE_MODES','left','sparamFlat1','_stored_gaugeBackColor','_onKeyPress','NXOhH','edoBe','duration','processKeyboardDelete','VisuMZ_2_BattleSystemSTB','DaXFZ','buttonAssistOffset%1','PixelateImageRendering','isTouchedInsideFrame'];(function(_0x786f06,_0x20b67d){const _0x45c443=function(_0x4916c6){while(--_0x4916c6){_0x786f06['push'](_0x786f06['shift']());}};_0x45c443(++_0x20b67d);}(_0x45c4,0xf3));const _0x4916=function(_0x786f06,_0x20b67d){_0x786f06=_0x786f06-0x12f;let _0x45c443=_0x45c4[_0x786f06];return _0x45c443;};const _0x3d8147=_0x4916;var label=_0x3d8147(0x385),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x3d8147(0x354)](function(_0x359905){const _0xb59c32=_0x3d8147;return _0x359905[_0xb59c32(0x6ba)]&&_0x359905[_0xb59c32(0x31f)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x3d8147(0x2df)]=VisuMZ[label][_0x3d8147(0x2df)]||{},VisuMZ[_0x3d8147(0x484)]=function(_0xc6c399,_0x2dfb60){const _0x22bb8a=_0x3d8147;for(const _0x58d32c in _0x2dfb60){if(_0x58d32c['match'](/(.*):(.*)/i)){if(_0x22bb8a(0x42d)!==_0x22bb8a(0x4f6)){const _0x5e5d4f=String(RegExp['$1']),_0x16a81a=String(RegExp['$2'])[_0x22bb8a(0x7bb)]()[_0x22bb8a(0x34a)]();let _0x68c0fb,_0x50dba7,_0x5920f4;switch(_0x16a81a){case _0x22bb8a(0x61a):_0x68c0fb=_0x2dfb60[_0x58d32c]!==''?Number(_0x2dfb60[_0x58d32c]):0x0;break;case _0x22bb8a(0x483):_0x50dba7=_0x2dfb60[_0x58d32c]!==''?JSON[_0x22bb8a(0x284)](_0x2dfb60[_0x58d32c]):[],_0x68c0fb=_0x50dba7[_0x22bb8a(0x782)](_0x4d1c86=>Number(_0x4d1c86));break;case'EVAL':_0x68c0fb=_0x2dfb60[_0x58d32c]!==''?eval(_0x2dfb60[_0x58d32c]):null;break;case'ARRAYEVAL':_0x50dba7=_0x2dfb60[_0x58d32c]!==''?JSON['parse'](_0x2dfb60[_0x58d32c]):[],_0x68c0fb=_0x50dba7['map'](_0x24ed14=>eval(_0x24ed14));break;case _0x22bb8a(0x4aa):_0x68c0fb=_0x2dfb60[_0x58d32c]!==''?JSON[_0x22bb8a(0x284)](_0x2dfb60[_0x58d32c]):'';break;case'ARRAYJSON':_0x50dba7=_0x2dfb60[_0x58d32c]!==''?JSON['parse'](_0x2dfb60[_0x58d32c]):[],_0x68c0fb=_0x50dba7[_0x22bb8a(0x782)](_0x4b0feb=>JSON[_0x22bb8a(0x284)](_0x4b0feb));break;case'FUNC':_0x68c0fb=_0x2dfb60[_0x58d32c]!==''?new Function(JSON[_0x22bb8a(0x284)](_0x2dfb60[_0x58d32c])):new Function(_0x22bb8a(0x2b4));break;case _0x22bb8a(0x162):_0x50dba7=_0x2dfb60[_0x58d32c]!==''?JSON['parse'](_0x2dfb60[_0x58d32c]):[],_0x68c0fb=_0x50dba7[_0x22bb8a(0x782)](_0x655b37=>new Function(JSON[_0x22bb8a(0x284)](_0x655b37)));break;case'STR':_0x68c0fb=_0x2dfb60[_0x58d32c]!==''?String(_0x2dfb60[_0x58d32c]):'';break;case'ARRAYSTR':_0x50dba7=_0x2dfb60[_0x58d32c]!==''?JSON['parse'](_0x2dfb60[_0x58d32c]):[],_0x68c0fb=_0x50dba7[_0x22bb8a(0x782)](_0x4fd416=>String(_0x4fd416));break;case _0x22bb8a(0x790):_0x5920f4=_0x2dfb60[_0x58d32c]!==''?JSON[_0x22bb8a(0x284)](_0x2dfb60[_0x58d32c]):{},_0xc6c399[_0x5e5d4f]={},VisuMZ[_0x22bb8a(0x484)](_0xc6c399[_0x5e5d4f],_0x5920f4);continue;case _0x22bb8a(0x4ba):_0x50dba7=_0x2dfb60[_0x58d32c]!==''?JSON[_0x22bb8a(0x284)](_0x2dfb60[_0x58d32c]):[],_0x68c0fb=_0x50dba7[_0x22bb8a(0x782)](_0x4557b7=>VisuMZ[_0x22bb8a(0x484)]({},JSON['parse'](_0x4557b7)));break;default:continue;}_0xc6c399[_0x5e5d4f]=_0x68c0fb;}else{function _0x34fd18(){const _0x4f52b6=_0x22bb8a;this[_0x4f52b6(0x413)](_0x46c076),this[_0x4f52b6(0x690)](_0x22d975);}}}}return _0xc6c399;},(_0x560050=>{const _0x574000=_0x3d8147,_0x536b45=_0x560050[_0x574000(0x665)];for(const _0x4e6b64 of dependencies){if(!Imported[_0x4e6b64]){alert(_0x574000(0x64f)[_0x574000(0x440)](_0x536b45,_0x4e6b64)),SceneManager['exit']();break;}}const _0x561eb4=_0x560050['description'];if(_0x561eb4[_0x574000(0x143)](/\[Version[ ](.*?)\]/i)){const _0x8342ca=Number(RegExp['$1']);_0x8342ca!==VisuMZ[label][_0x574000(0x79a)]&&(alert(_0x574000(0x4a7)[_0x574000(0x440)](_0x536b45,_0x8342ca)),SceneManager[_0x574000(0x5b4)]());}if(_0x561eb4[_0x574000(0x143)](/\[Tier[ ](\d+)\]/i)){if(_0x574000(0x266)===_0x574000(0x713)){function _0x116836(){const _0x5ae7db=_0x574000,_0x367263=this[_0x5ae7db(0x678)](_0xe0b6dd),_0x1a38cc=_0x2c370f[_0x5ae7db(0x385)][_0x5ae7db(0x2df)]['Param'][_0x5ae7db(0x21f)][_0x3c95f8],_0x62a115=_0x4d7cc3['param'](_0x1a38cc),_0x53e210=this[_0x5ae7db(0x2d8)][_0x5ae7db(0x65b)](_0x1a38cc,!![]);this[_0x5ae7db(0x4ca)](_0x367263['x'],_0x367263['y'],0xa0,_0x1a38cc,![]),this[_0x5ae7db(0x133)](),this[_0x5ae7db(0x248)](_0x53e210,_0x367263['x']+0xa0,_0x367263['y'],0x3c,_0x5ae7db(0x5eb));}}else{const _0x1cb5d9=Number(RegExp['$1']);if(_0x1cb5d9<tier){if('mtvur'===_0x574000(0x13e)){function _0x35e8ea(){const _0x84ef0c=_0x574000;_0x23a470[_0x84ef0c(0x385)]['Sprite_Picture_updateOrigin'][_0x84ef0c(0x3f6)](this);}}else alert(_0x574000(0x4a6)[_0x574000(0x440)](_0x536b45,_0x1cb5d9,tier)),SceneManager['exit']();}else{if(_0x574000(0x777)===_0x574000(0x559)){function _0x21394e(){const _0x3341e6=_0x574000;return this['_coreEasingType']=this['_coreEasingType']||0x0,[0x0,0x1,0x2,0x3][_0x3341e6(0x760)](this[_0x3341e6(0x1f4)])?_0x2372b6[_0x3341e6(0x385)][_0x3341e6(0x749)][_0x3341e6(0x3f6)](this,_0xef5d00):_0x1e5dbd[_0x3341e6(0x427)](_0x23b750,this[_0x3341e6(0x1f4)]);}}else tier=Math[_0x574000(0x19b)](_0x1cb5d9,tier);}}}VisuMZ[_0x574000(0x484)](VisuMZ[label][_0x574000(0x2df)],_0x560050['parameters']);})(pluginData),PluginManager[_0x3d8147(0x3aa)](pluginData[_0x3d8147(0x665)],_0x3d8147(0x566),_0x30f3da=>{const _0x4f882a=_0x3d8147;VisuMZ[_0x4f882a(0x484)](_0x30f3da,_0x30f3da);const _0x51e55b=_0x30f3da[_0x4f882a(0x5a0)];VisuMZ['openURL'](_0x51e55b);}),PluginManager[_0x3d8147(0x3aa)](pluginData[_0x3d8147(0x665)],_0x3d8147(0x3e3),_0x3aec78=>{const _0x330f3b=_0x3d8147;VisuMZ[_0x330f3b(0x484)](_0x3aec78,_0x3aec78);const _0x53fb1d=_0x3aec78[_0x330f3b(0x642)]||0x0;$gameParty['gainGold'](_0x53fb1d);}),PluginManager[_0x3d8147(0x3aa)](pluginData[_0x3d8147(0x665)],_0x3d8147(0x399),_0x5adb48=>{const _0x99b2cd=_0x3d8147;VisuMZ['ConvertParams'](_0x5adb48,_0x5adb48);const _0x1bc48a=_0x5adb48[_0x99b2cd(0x761)]||0x1,_0x164b71=_0x5adb48[_0x99b2cd(0x743)]||_0x99b2cd(0x2de),_0x174a72=$gameScreen[_0x99b2cd(0x57b)](_0x1bc48a);_0x174a72&&_0x174a72[_0x99b2cd(0x174)](_0x164b71);}),PluginManager[_0x3d8147(0x3aa)](pluginData[_0x3d8147(0x665)],'PictureEraseAll',_0x485b1d=>{const _0x1ef01a=_0x3d8147;for(let _0x14ae3e=0x1;_0x14ae3e<=0x64;_0x14ae3e++){if(_0x1ef01a(0x2fd)!==_0x1ef01a(0x2fd)){function _0x33f513(){const _0x458cd6=_0x1ef01a;if(_0x369c25[_0x458cd6(0x170)]())return;_0x2b25bb[_0x458cd6(0x484)](_0x3d5c37,_0x35a8f1);const _0x119982=_0x42a88c['option'];if(_0x119982[_0x458cd6(0x143)](/Front/i))_0x183563[_0x458cd6(0x704)](![]);else _0x119982[_0x458cd6(0x143)](/Side/i)?_0x56987f[_0x458cd6(0x704)](!![]):_0x5e7dcc[_0x458cd6(0x704)](!_0x4e0535['isSideView']());}}else $gameScreen[_0x1ef01a(0x644)](_0x14ae3e);}}),PluginManager[_0x3d8147(0x3aa)](pluginData[_0x3d8147(0x665)],_0x3d8147(0x2c6),_0x102ff7=>{const _0x26982b=_0x3d8147;VisuMZ['ConvertParams'](_0x102ff7,_0x102ff7);const _0x5151a8=Math[_0x26982b(0x495)](_0x102ff7['StartID'],_0x102ff7[_0x26982b(0x44a)]),_0x23c8b7=Math['max'](_0x102ff7[_0x26982b(0x696)],_0x102ff7['EndingID']);for(let _0x9e5b48=_0x5151a8;_0x9e5b48<=_0x23c8b7;_0x9e5b48++){if('WFgoQ'!==_0x26982b(0x6a7))$gameScreen['erasePicture'](_0x9e5b48);else{function _0x2df4d7(){const _0x1b6c2e=_0x26982b;if(this['isExpGaugeDrawn']())this['drawActorExpGauge'](_0x4c53f2,_0x5ee4ac,_0x3e0224);_0x156d3b[_0x1b6c2e(0x385)]['Window_StatusBase_drawActorLevel'][_0x1b6c2e(0x3f6)](this,_0x49855b,_0x45ad0d,_0x3481cd);}}}}),PluginManager['registerCommand'](pluginData[_0x3d8147(0x665)],'ScreenShake',_0x15cc79=>{const _0x41ffd1=_0x3d8147;VisuMZ[_0x41ffd1(0x484)](_0x15cc79,_0x15cc79);const _0x502d0a=_0x15cc79['Type']||'random',_0x1a3d54=_0x15cc79[_0x41ffd1(0x4cb)][_0x41ffd1(0x7ae)](0x1,0x9),_0x31f8ee=_0x15cc79[_0x41ffd1(0x2fc)][_0x41ffd1(0x7ae)](0x1,0x9),_0x1b9d3d=_0x15cc79[_0x41ffd1(0x18c)]||0x1,_0x349781=_0x15cc79[_0x41ffd1(0x2e8)];$gameScreen[_0x41ffd1(0x178)](_0x502d0a),$gameScreen['startShake'](_0x1a3d54,_0x31f8ee,_0x1b9d3d);if(_0x349781){if('SXLOH'!=='SXLOH'){function _0x13a62a(){const _0xdf23fe=_0x41ffd1;return _0xf6b12[_0xdf23fe(0x385)][_0xdf23fe(0x2df)]['Color'][_0xdf23fe(0x53d)][_0xdf23fe(0x3f6)](this,_0x4e7a5a);}}else{const _0x64e741=$gameTemp[_0x41ffd1(0x67a)]();if(_0x64e741)_0x64e741['wait'](_0x1b9d3d);}}}),PluginManager[_0x3d8147(0x3aa)](pluginData[_0x3d8147(0x665)],'SystemSetFontSize',_0x4658ab=>{const _0x5bae57=_0x3d8147;VisuMZ[_0x5bae57(0x484)](_0x4658ab,_0x4658ab);const _0x9b1a75=_0x4658ab['option']||0x1;$gameSystem['setMainFontSize'](_0x9b1a75);}),PluginManager[_0x3d8147(0x3aa)](pluginData[_0x3d8147(0x665)],_0x3d8147(0x23f),_0x2ab25c=>{const _0x2823ec=_0x3d8147;if($gameParty[_0x2823ec(0x170)]())return;VisuMZ['ConvertParams'](_0x2ab25c,_0x2ab25c);const _0x6c7ea2=_0x2ab25c[_0x2823ec(0x130)];if(_0x6c7ea2['match'](/Front/i))$gameSystem[_0x2823ec(0x704)](![]);else{if(_0x6c7ea2['match'](/Side/i)){if(_0x2823ec(0x551)===_0x2823ec(0x43d)){function _0x129d31(){var _0x195dad=_0x142f5d(_0x25bc17['$1'])/0x64;_0x54bf45*=_0x195dad;}}else $gameSystem[_0x2823ec(0x704)](!![]);}else{if(_0x2823ec(0x13c)===_0x2823ec(0x779)){function _0x16489a(){const _0x5119d5=_0x2823ec;_0xa4b7cd[_0x5119d5(0x385)]['Settings'][_0x5119d5(0x647)][_0x5119d5(0x667)][_0x5119d5(0x4c9)][_0x5119d5(0x3f6)](this);}}else $gameSystem[_0x2823ec(0x704)](!$gameSystem[_0x2823ec(0x53b)]());}}}),PluginManager['registerCommand'](pluginData['name'],'SystemLoadAudio',_0x174232=>{const _0xdd5415=_0x3d8147;if($gameParty[_0xdd5415(0x170)]())return;VisuMZ[_0xdd5415(0x484)](_0x174232,_0x174232);const _0x4faade=[_0xdd5415(0x6ae),_0xdd5415(0x6bc),'me','se'];for(const _0x702da7 of _0x4faade){if(_0xdd5415(0x240)===_0xdd5415(0x240)){const _0x304c95=_0x174232[_0x702da7],_0x36f03a='%1/'[_0xdd5415(0x440)](_0x702da7);for(const _0x297eeb of _0x304c95){console[_0xdd5415(0x694)](_0x36f03a,_0x297eeb),AudioManager['createBuffer'](_0x36f03a,_0x297eeb);}}else{function _0x3f3799(){const _0x4213bf=_0xdd5415;return _0x253819[_0x4213bf(0x620)]-0.05;}}}}),PluginManager['registerCommand'](pluginData['name'],'SystemLoadImages',_0x2893a4=>{const _0x50c879=_0x3d8147;if($gameParty[_0x50c879(0x170)]())return;VisuMZ[_0x50c879(0x484)](_0x2893a4,_0x2893a4);const _0x37d495=[_0x50c879(0x58d),_0x50c879(0x14b),_0x50c879(0x5e8),_0x50c879(0x541),_0x50c879(0x6d7),_0x50c879(0x4ae),_0x50c879(0x44f),_0x50c879(0x289),_0x50c879(0x29b),_0x50c879(0x26e),_0x50c879(0x164),_0x50c879(0x71d),'titles1','titles2'];for(const _0x4c651f of _0x37d495){if(_0x50c879(0x54a)===_0x50c879(0x149)){function _0x56d84a(){const _0x1987ab=_0x50c879;_0xb3e86c[_0x1987ab(0x385)][_0x1987ab(0x377)]['call'](this);}}else{const _0x223358=_0x2893a4[_0x4c651f],_0x2681a9=_0x50c879(0x5b6)[_0x50c879(0x440)](_0x4c651f);for(const _0x288696 of _0x223358){if(_0x50c879(0x700)===_0x50c879(0x5f9)){function _0x3fb8e2(){const _0x2ee216=_0x50c879,_0x4c65f9=_0xd22500[_0x2ee216(0x385)][_0x2ee216(0x2df)][_0x2ee216(0x42e)];if(_0x4c65f9&&_0x4c65f9['horzJS'])return _0x4c65f9[_0x2ee216(0x16f)][_0x2ee216(0x3f6)](this);const _0x2b8446=_0x3c5429['_shakePower']*0.75,_0x17307b=_0x55750a[_0x2ee216(0x4bf)]*0.6,_0x246aa7=_0x4401f3[_0x2ee216(0x202)];this['x']+=_0x1b6bff[_0x2ee216(0x687)](_0x15d155['randomInt'](_0x2b8446)-_0x136438['randomInt'](_0x17307b))*(_0x4a3457['min'](_0x246aa7,0x1e)*0.5);}}else ImageManager[_0x50c879(0x53f)](_0x2681a9,_0x288696);}}}}),PluginManager['registerCommand'](pluginData['name'],'SystemSetBattleSystem',_0x30285b=>{const _0x39df22=_0x3d8147;if($gameParty[_0x39df22(0x170)]())return;VisuMZ[_0x39df22(0x484)](_0x30285b,_0x30285b);const _0x43a603=_0x30285b[_0x39df22(0x130)][_0x39df22(0x7bb)]()[_0x39df22(0x34a)](),_0x491b53=VisuMZ[_0x39df22(0x385)]['CreateBattleSystemID'](_0x43a603);$gameSystem['setBattleSystem'](_0x491b53);}),VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x490)]=function(_0x17bae1){const _0xf7ca22=_0x3d8147;_0x17bae1=_0x17bae1||_0xf7ca22(0x5cc),_0x17bae1=String(_0x17bae1)[_0xf7ca22(0x7bb)]()[_0xf7ca22(0x34a)]();switch(_0x17bae1){case _0xf7ca22(0x7c6):return 0x0;case _0xf7ca22(0x337):Imported[_0xf7ca22(0x669)]&&(ConfigManager[_0xf7ca22(0x16a)]=!![]);return 0x1;case'TPB\x20WAIT':if(Imported[_0xf7ca22(0x669)]){if('UhxjH'==='UhxjH')ConfigManager[_0xf7ca22(0x16a)]=![];else{function _0x4fd9d1(){const _0x2e62db=_0xf7ca22;_0x55cab6[_0x2e62db(0x385)][_0x2e62db(0x1c8)]['call'](this),_0x170bf9['clear']();}}}return 0x2;case _0xf7ca22(0x1dd):if(Imported[_0xf7ca22(0x64a)]){if(_0xf7ca22(0x6b6)!==_0xf7ca22(0x316))return _0xf7ca22(0x1dd);else{function _0x2db058(){const _0x17d877=_0xf7ca22;var _0x848e4a=_0x5384b9(_0x250dfa['$1']);try{_0x201bbc*=_0x44f700(_0x848e4a);}catch(_0x4930aa){if(_0x342511[_0x17d877(0x397)]())_0x53d7cf['log'](_0x4930aa);}}}}break;case _0xf7ca22(0x508):if(Imported[_0xf7ca22(0x6e1)])return _0xf7ca22(0x508);break;}return $dataSystem['battleSystem'];},PluginManager[_0x3d8147(0x3aa)](pluginData[_0x3d8147(0x665)],_0x3d8147(0x215),_0x2df6f6=>{const _0x2b8ad0=_0x3d8147;VisuMZ[_0x2b8ad0(0x484)](_0x2df6f6,_0x2df6f6);const _0x5374df=_0x2df6f6[_0x2b8ad0(0x130)]||0x1;$gameSystem[_0x2b8ad0(0x32c)](_0x5374df);}),VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x520)]=Scene_Boot['prototype']['onDatabaseLoaded'],Scene_Boot[_0x3d8147(0x578)][_0x3d8147(0x1f9)]=function(){const _0x2d16a0=_0x3d8147;VisuMZ[_0x2d16a0(0x385)][_0x2d16a0(0x520)][_0x2d16a0(0x3f6)](this),this[_0x2d16a0(0x1ed)](),this[_0x2d16a0(0x418)](),this[_0x2d16a0(0x755)](),this[_0x2d16a0(0x54d)](),this['process_VisuMZ_CoreEngine_CustomParameters'](),VisuMZ[_0x2d16a0(0x778)]();},VisuMZ['CoreEngine'][_0x3d8147(0x2a1)]={},Scene_Boot[_0x3d8147(0x578)][_0x3d8147(0x1ed)]=function(){const _0x4a82c9=_0x3d8147,_0x4967fd=[_0x4a82c9(0x456),_0x4a82c9(0x264),'ATK',_0x4a82c9(0x3b2),_0x4a82c9(0x77f),_0x4a82c9(0x2c8),_0x4a82c9(0x6a4),'LUK'],_0x543190=[_0x4a82c9(0x3b0),_0x4a82c9(0x73e),_0x4a82c9(0x1ec),'CEV',_0x4a82c9(0x19a),_0x4a82c9(0x7ba),_0x4a82c9(0x2b6),'HRG',_0x4a82c9(0x3f1),_0x4a82c9(0x61c)],_0x417e56=[_0x4a82c9(0x4f0),'GRD','REC',_0x4a82c9(0x3df),_0x4a82c9(0x68d),_0x4a82c9(0x4a5),_0x4a82c9(0x6e8),_0x4a82c9(0x650),_0x4a82c9(0x1a8),_0x4a82c9(0x299)],_0xb8d2a0=[_0x4967fd,_0x543190,_0x417e56],_0x390e8a=[_0x4a82c9(0x4ed),_0x4a82c9(0x6d0),'Plus2','Max',_0x4a82c9(0x140),'Rate1','Rate2','Flat',_0x4a82c9(0x752),_0x4a82c9(0x580)];for(const _0x1efdd6 of _0xb8d2a0){let _0x351244='';if(_0x1efdd6===_0x4967fd)_0x351244=_0x4a82c9(0x34c);if(_0x1efdd6===_0x543190)_0x351244='xparam';if(_0x1efdd6===_0x417e56)_0x351244=_0x4a82c9(0x50f);for(const _0x275bfd of _0x390e8a){let _0x40c156=_0x4a82c9(0x47d)[_0x4a82c9(0x440)](_0x351244,_0x275bfd);VisuMZ[_0x4a82c9(0x385)][_0x4a82c9(0x2a1)][_0x40c156]=[],VisuMZ[_0x4a82c9(0x385)][_0x4a82c9(0x2a1)][_0x40c156+'JS']=[];let _0x211587=_0x4a82c9(0x200);if(['Plus','Flat'][_0x4a82c9(0x760)](_0x275bfd)){if('MItRx'!==_0x4a82c9(0x24c)){function _0x4e0e3e(){const _0x478093=_0x4a82c9,_0x31cf67=_0x478093(0x79d);this['_colorCache']=this[_0x478093(0x7d5)]||{};if(this[_0x478093(0x7d5)][_0x31cf67])return this['_colorCache'][_0x31cf67];const _0x585325=_0x392e99['CoreEngine'][_0x478093(0x2df)][_0x478093(0x19d)]['ColorCTGauge1'];return this['getColorDataFromPluginParameters'](_0x31cf67,_0x585325);}}else _0x211587+=_0x4a82c9(0x705);}else{if([_0x4a82c9(0x6d0),_0x4a82c9(0x752)][_0x4a82c9(0x760)](_0x275bfd)){if(_0x4a82c9(0x163)===_0x4a82c9(0x163))_0x211587+=_0x4a82c9(0x5d8);else{function _0x5009c6(){const _0x24412e=_0x4a82c9;_0x11dbea['CoreEngine'][_0x24412e(0x39b)][_0x24412e(0x3f6)](this),this['forceOutOfPlaytest'](),this[_0x24412e(0x62a)]();}}}else{if([_0x4a82c9(0x746),_0x4a82c9(0x580)][_0x4a82c9(0x760)](_0x275bfd)){if(_0x4a82c9(0x2ef)===_0x4a82c9(0x2ef))_0x211587+=_0x4a82c9(0x447);else{function _0x4bace2(){const _0xc82f13=_0x4a82c9;_0x88470e[_0xc82f13(0x385)]['Settings'][_0xc82f13(0x647)][_0xc82f13(0x667)][_0xc82f13(0x3f9)][_0xc82f13(0x3f6)](this);}}}else{if(_0x275bfd===_0x4a82c9(0x486))_0x211587+=_0x4a82c9(0x3eb);else{if(_0x275bfd==='Rate1')_0x211587+=_0x4a82c9(0x714);else _0x275bfd===_0x4a82c9(0x2e7)&&(_0x211587+=_0x4a82c9(0x155));}}}}for(const _0x4522de of _0x1efdd6){let _0x4df331=_0x275bfd[_0x4a82c9(0x5a9)](/[\d+]/g,'')[_0x4a82c9(0x7bb)]();const _0x4270b6=_0x211587[_0x4a82c9(0x440)](_0x4522de,_0x4df331);VisuMZ[_0x4a82c9(0x385)][_0x4a82c9(0x2a1)][_0x40c156][_0x4a82c9(0x58a)](new RegExp(_0x4270b6,'i'));const _0x2b2b9d='<JS\x20%1\x20%2:[\x20](.*)>'[_0x4a82c9(0x440)](_0x4522de,_0x4df331);VisuMZ['CoreEngine'][_0x4a82c9(0x2a1)][_0x40c156+'JS']['push'](new RegExp(_0x2b2b9d,'i'));}}}},Scene_Boot['prototype'][_0x3d8147(0x418)]=function(){const _0x144bca=_0x3d8147;if(VisuMZ[_0x144bca(0x778)])return;},Scene_Boot[_0x3d8147(0x578)][_0x3d8147(0x755)]=function(){const _0x4795c1=_0x3d8147;VisuMZ['CoreEngine'][_0x4795c1(0x2df)][_0x4795c1(0x672)]['OpenConsole']&&VisuMZ[_0x4795c1(0x5d0)](!![]),VisuMZ[_0x4795c1(0x385)][_0x4795c1(0x2df)][_0x4795c1(0x672)][_0x4795c1(0x40d)]&&(Input['keyMapper'][0x23]=_0x4795c1(0x307),Input[_0x4795c1(0x547)][0x24]=_0x4795c1(0x47b));},Scene_Boot[_0x3d8147(0x578)][_0x3d8147(0x54d)]=function(){const _0x14527f=_0x3d8147;this[_0x14527f(0x4c3)]();},Scene_Boot[_0x3d8147(0x578)][_0x3d8147(0x4c3)]=function(){const _0x4d8ad3=_0x3d8147,_0x5a2d1f=VisuMZ[_0x4d8ad3(0x385)]['Settings'][_0x4d8ad3(0x261)];for(const _0x434160 of _0x5a2d1f){const _0x6b3a4a=_0x434160[_0x4d8ad3(0x487)][_0x4d8ad3(0x5a9)](/[ ]/g,''),_0x38d4a6=_0x434160[_0x4d8ad3(0x16b)];VisuMZ[_0x4d8ad3(0x385)][_0x4d8ad3(0x68f)](_0x6b3a4a,_0x38d4a6);}},VisuMZ['CoreEngine'][_0x3d8147(0x68f)]=function(_0x1a83a8,_0x33e55c){const _0x1d7f74=_0x3d8147;if(!!window[_0x1a83a8]){if($gameTemp['isPlaytest']())console[_0x1d7f74(0x694)](_0x1d7f74(0x1a6)['format'](_0x1a83a8));}const _0x407c0b=_0x1d7f74(0x3bd)[_0x1d7f74(0x440)](_0x1a83a8,_0x33e55c);window[_0x1a83a8]=new Function(_0x407c0b);},Scene_Boot[_0x3d8147(0x578)][_0x3d8147(0x298)]=function(){const _0x46dc44=_0x3d8147,_0x25762d=VisuMZ[_0x46dc44(0x385)][_0x46dc44(0x2df)][_0x46dc44(0x1e5)];if(!_0x25762d)return;for(const _0x3d48a3 of _0x25762d){if(!_0x3d48a3)continue;VisuMZ['CoreEngine'][_0x46dc44(0x17a)](_0x3d48a3);}},VisuMZ[_0x3d8147(0x385)]['CustomParamNames']={},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x1e3)]={},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x175)]={},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x5ed)]={},VisuMZ[_0x3d8147(0x385)]['createCustomParameter']=function(_0x165fae){const _0x2bb049=_0x3d8147,_0x67c909=_0x165fae[_0x2bb049(0x3a4)],_0x428c51=_0x165fae['ParamName'],_0x16539b=_0x165fae[_0x2bb049(0x6b5)],_0x417111=_0x165fae[_0x2bb049(0x242)],_0x34cbcd=new Function(_0x165fae[_0x2bb049(0x380)]);VisuMZ['CoreEngine'][_0x2bb049(0x658)][_0x67c909['toUpperCase']()[_0x2bb049(0x34a)]()]=_0x428c51,VisuMZ[_0x2bb049(0x385)][_0x2bb049(0x1e3)][_0x67c909[_0x2bb049(0x7bb)]()[_0x2bb049(0x34a)]()]=_0x16539b,VisuMZ[_0x2bb049(0x385)]['CustomParamType'][_0x67c909[_0x2bb049(0x7bb)]()[_0x2bb049(0x34a)]()]=_0x417111,VisuMZ['CoreEngine'][_0x2bb049(0x5ed)][_0x67c909[_0x2bb049(0x7bb)]()[_0x2bb049(0x34a)]()]=_0x67c909,Object[_0x2bb049(0x5b0)](Game_BattlerBase[_0x2bb049(0x578)],_0x67c909,{'get'(){const _0x2109b8=_0x2bb049;if(_0x2109b8(0x21c)!=='TECYL'){function _0x5046d9(){const _0x149da6=_0x2109b8;for(const _0x38f11e of _0x4f3a7a[_0x149da6(0x294)]){if(_0x38f11e[_0x149da6(0x46b)][_0x149da6(0x3f6)](this)){const _0x888eb4=_0x38f11e[_0x149da6(0x3e0)];let _0x1c23b6=_0x38f11e['TextStr'];if(['','Untitled'][_0x149da6(0x760)](_0x1c23b6))_0x1c23b6=_0x38f11e[_0x149da6(0x5b5)][_0x149da6(0x3f6)](this);const _0x29c702=_0x38f11e[_0x149da6(0x4c6)][_0x149da6(0x3f6)](this),_0x442818=_0x38f11e[_0x149da6(0x6a5)]['call'](this);this['addCommand'](_0x1c23b6,_0x888eb4,_0x29c702,_0x442818),this[_0x149da6(0x545)](_0x888eb4,_0x38f11e[_0x149da6(0x2c0)][_0x149da6(0x2f9)](this,_0x442818));}}}}else{const _0x14fdce=_0x34cbcd[_0x2109b8(0x3f6)](this);return _0x417111===_0x2109b8(0x5e9)?Math[_0x2109b8(0x687)](_0x14fdce):_0x14fdce;}}});},VisuMZ[_0x3d8147(0x778)]=function(){const _0x129756=_0x3d8147;for(const _0x1333ee of $dataActors){if(_0x129756(0x5ec)!==_0x129756(0x5ec)){function _0x6fd480(){const _0x4ae6b7=_0x129756;if(_0x17e98c&&_0x29bf7a[_0x4ae6b7(0x4fd)]())return;_0x315e10['CoreEngine'][_0x4ae6b7(0x494)][_0x4ae6b7(0x3f6)](this,_0x3acc18,_0x932a4c,_0x27bd6a,_0x5ccbf0);}}else{if(_0x1333ee)VisuMZ[_0x129756(0x5f3)](_0x1333ee);}}for(const _0x1636a9 of $dataClasses){if(_0x129756(0x146)!==_0x129756(0x792)){if(_0x1636a9)VisuMZ['ParseClassNotetags'](_0x1636a9);}else{function _0x2e3788(){const _0x142e94=_0x129756;var _0x402382=_0x26bc95(_0x594ed1['$1']);try{_0x598ea1=_0x155d88[_0x142e94(0x19b)](_0x5a91c3,_0x275dbc(_0x40feba(_0x402382)));}catch(_0x25a97a){if(_0x4503f7[_0x142e94(0x397)]())_0x3ab158['log'](_0x25a97a);}}}}for(const _0x3f11fa of $dataSkills){if(_0x3f11fa)VisuMZ['ParseSkillNotetags'](_0x3f11fa);}for(const _0x3579b4 of $dataItems){if(_0x3579b4)VisuMZ['ParseItemNotetags'](_0x3579b4);}for(const _0x34bf7a of $dataWeapons){if(_0x34bf7a)VisuMZ[_0x129756(0x19f)](_0x34bf7a);}for(const _0x4df178 of $dataArmors){if(_0x4df178)VisuMZ[_0x129756(0x4b9)](_0x4df178);}for(const _0x48a84a of $dataEnemies){if(_0x48a84a)VisuMZ['ParseEnemyNotetags'](_0x48a84a);}for(const _0x1c29e2 of $dataStates){if(_0x129756(0x33b)!==_0x129756(0x44e)){if(_0x1c29e2)VisuMZ[_0x129756(0x389)](_0x1c29e2);}else{function _0x14c15c(){const _0x12ca41=_0x129756;this[_0x12ca41(0x451)]();}}}for(const _0x26b99b of $dataTilesets){if(_0x129756(0x73b)!==_0x129756(0x73b)){function _0x4f942d(){const _0x22625d=_0x129756;return this[_0x22625d(0x718)]();}}else{if(_0x26b99b)VisuMZ[_0x129756(0x675)](_0x26b99b);}}},VisuMZ['ParseActorNotetags']=function(_0x23964f){},VisuMZ[_0x3d8147(0x3bf)]=function(_0x140c48){},VisuMZ[_0x3d8147(0x67c)]=function(_0x253045){},VisuMZ[_0x3d8147(0x2f3)]=function(_0x11388f){},VisuMZ[_0x3d8147(0x19f)]=function(_0x431766){},VisuMZ[_0x3d8147(0x4b9)]=function(_0x4732ba){},VisuMZ[_0x3d8147(0x608)]=function(_0x4fc9ad){},VisuMZ['ParseStateNotetags']=function(_0x4c1a66){},VisuMZ[_0x3d8147(0x675)]=function(_0x476fc9){},VisuMZ[_0x3d8147(0x385)]['ParseActorNotetags']=VisuMZ[_0x3d8147(0x5f3)],VisuMZ[_0x3d8147(0x5f3)]=function(_0x228338){const _0x143a4d=_0x3d8147;VisuMZ[_0x143a4d(0x385)]['ParseActorNotetags']['call'](this,_0x228338);const _0x503ff6=_0x228338['note'];if(_0x503ff6[_0x143a4d(0x143)](/<MAX LEVEL:[ ](\d+)>/i)){if('ygccY'!==_0x143a4d(0x290)){_0x228338[_0x143a4d(0x732)]=Number(RegExp['$1']);if(_0x228338[_0x143a4d(0x732)]===0x0)_0x228338[_0x143a4d(0x732)]=Number[_0x143a4d(0x527)];}else{function _0x3e9823(){var _0x1687c0=_0x5ec3bd(_0x1df1ab['$1'])/0x64;_0x2c7ecf+=_0x1687c0;}}}if(_0x503ff6['match'](/<INITIAL LEVEL:[ ](\d+)>/i)){if(_0x143a4d(0x324)===_0x143a4d(0x324))_0x228338[_0x143a4d(0x136)]=Math['min'](Number(RegExp['$1']),_0x228338[_0x143a4d(0x732)]);else{function _0x41b7c7(){const _0x2ffc2c=_0x143a4d;for(const _0x539c1c of _0x57cb10[_0x2ffc2c(0x294)]){if(_0x539c1c[_0x2ffc2c(0x46b)]['call'](this)){const _0x569f4e=_0x539c1c[_0x2ffc2c(0x3e0)];let _0x2b3226=_0x539c1c[_0x2ffc2c(0x1eb)];if(['',_0x2ffc2c(0x577)][_0x2ffc2c(0x760)](_0x2b3226))_0x2b3226=_0x539c1c[_0x2ffc2c(0x5b5)]['call'](this);const _0x3fa949=_0x539c1c[_0x2ffc2c(0x4c6)][_0x2ffc2c(0x3f6)](this),_0x35aa1a=_0x539c1c[_0x2ffc2c(0x6a5)][_0x2ffc2c(0x3f6)](this);this[_0x2ffc2c(0x51a)](_0x2b3226,_0x569f4e,_0x3fa949,_0x35aa1a),this['setHandler'](_0x569f4e,_0x539c1c['CallHandlerJS'][_0x2ffc2c(0x2f9)](this,_0x35aa1a));}}}}}},VisuMZ[_0x3d8147(0x385)]['ParseClassNotetags']=VisuMZ[_0x3d8147(0x3bf)],VisuMZ['ParseClassNotetags']=function(_0x318068){const _0x44e090=_0x3d8147;VisuMZ[_0x44e090(0x385)]['ParseClassNotetags']['call'](this,_0x318068);if(_0x318068['learnings'])for(const _0x2acda4 of _0x318068[_0x44e090(0x5f7)]){if(_0x2acda4[_0x44e090(0x297)][_0x44e090(0x143)](/<LEARN AT LEVEL:[ ](\d+)>/i)){if(_0x44e090(0x65e)!==_0x44e090(0x7d2))_0x2acda4[_0x44e090(0x773)]=Math[_0x44e090(0x19b)](Number(RegExp['$1']),0x1);else{function _0x1a9868(){const _0x58ec3b=_0x44e090,_0x893469=_0x1cfb5c[_0x58ec3b(0x385)][_0x58ec3b(0x2df)][_0x58ec3b(0x42e)];this['_coreEngineShakeStyle']=_0x893469?.[_0x58ec3b(0x6f7)]||'random';}}}}},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x608)]=VisuMZ[_0x3d8147(0x608)],VisuMZ[_0x3d8147(0x608)]=function(_0xdb27ea){const _0x2009d6=_0x3d8147;VisuMZ[_0x2009d6(0x385)][_0x2009d6(0x608)][_0x2009d6(0x3f6)](this,_0xdb27ea),_0xdb27ea['level']=0x1;const _0x5edd1e=_0xdb27ea[_0x2009d6(0x297)];if(_0x5edd1e['match'](/<LEVEL:[ ](\d+)>/i))_0xdb27ea[_0x2009d6(0x773)]=Number(RegExp['$1']);if(_0x5edd1e['match'](/<MAXHP:[ ](\d+)>/i))_0xdb27ea[_0x2009d6(0x1de)][0x0]=Number(RegExp['$1']);if(_0x5edd1e['match'](/<MAXMP:[ ](\d+)>/i))_0xdb27ea['params'][0x1]=Number(RegExp['$1']);if(_0x5edd1e['match'](/<ATK:[ ](\d+)>/i))_0xdb27ea[_0x2009d6(0x1de)][0x2]=Number(RegExp['$1']);if(_0x5edd1e[_0x2009d6(0x143)](/<DEF:[ ](\d+)>/i))_0xdb27ea[_0x2009d6(0x1de)][0x3]=Number(RegExp['$1']);if(_0x5edd1e[_0x2009d6(0x143)](/<MAT:[ ](\d+)>/i))_0xdb27ea[_0x2009d6(0x1de)][0x4]=Number(RegExp['$1']);if(_0x5edd1e[_0x2009d6(0x143)](/<MDF:[ ](\d+)>/i))_0xdb27ea['params'][0x5]=Number(RegExp['$1']);if(_0x5edd1e['match'](/<AGI:[ ](\d+)>/i))_0xdb27ea['params'][0x6]=Number(RegExp['$1']);if(_0x5edd1e[_0x2009d6(0x143)](/<LUK:[ ](\d+)>/i))_0xdb27ea[_0x2009d6(0x1de)][0x7]=Number(RegExp['$1']);if(_0x5edd1e['match'](/<EXP:[ ](\d+)>/i))_0xdb27ea[_0x2009d6(0x52d)]=Number(RegExp['$1']);if(_0x5edd1e['match'](/<GOLD:[ ](\d+)>/i))_0xdb27ea['gold']=Number(RegExp['$1']);},VisuMZ['CoreEngine'][_0x3d8147(0x292)]=Graphics[_0x3d8147(0x4fe)],Graphics[_0x3d8147(0x4fe)]=function(){const _0x150b1d=_0x3d8147;switch(VisuMZ[_0x150b1d(0x385)][_0x150b1d(0x2df)][_0x150b1d(0x672)]['AutoStretch']){case _0x150b1d(0x637):return!![];case'normal':return![];default:return VisuMZ[_0x150b1d(0x385)]['Graphics_defaultStretchMode'][_0x150b1d(0x3f6)](this);}},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x5a4)]=Graphics[_0x3d8147(0x682)],Graphics['printError']=function(_0x11e424,_0x2e5df2,_0x2f92be=null){const _0x2c8370=_0x3d8147;VisuMZ[_0x2c8370(0x385)]['Graphics_printError'][_0x2c8370(0x3f6)](this,_0x11e424,_0x2e5df2,_0x2f92be),VisuMZ[_0x2c8370(0x5d0)](![]);},VisuMZ['CoreEngine']['Graphics_centerElement']=Graphics[_0x3d8147(0x227)],Graphics[_0x3d8147(0x227)]=function(_0x4a0659){const _0x59ba50=_0x3d8147;VisuMZ[_0x59ba50(0x385)][_0x59ba50(0x356)]['call'](this,_0x4a0659),this['_centerElementCoreEngine'](_0x4a0659);},Graphics['_centerElementCoreEngine']=function(_0x118f69){const _0x4b85ab=_0x3d8147;VisuMZ[_0x4b85ab(0x385)][_0x4b85ab(0x2df)][_0x4b85ab(0x672)][_0x4b85ab(0x1df)]&&(_0x118f69[_0x4b85ab(0x3d7)]['font-smooth']=_0x4b85ab(0x7a6));VisuMZ[_0x4b85ab(0x385)][_0x4b85ab(0x2df)][_0x4b85ab(0x672)][_0x4b85ab(0x6e4)]&&(_0x118f69[_0x4b85ab(0x3d7)]['image-rendering']=_0x4b85ab(0x393));const _0x143f07=Math[_0x4b85ab(0x19b)](0x0,Math[_0x4b85ab(0x27e)](_0x118f69['width']*this[_0x4b85ab(0x33d)])),_0x4a383f=Math[_0x4b85ab(0x19b)](0x0,Math['floor'](_0x118f69['height']*this[_0x4b85ab(0x33d)]));_0x118f69[_0x4b85ab(0x3d7)][_0x4b85ab(0x300)]=_0x143f07+'px',_0x118f69[_0x4b85ab(0x3d7)][_0x4b85ab(0x195)]=_0x4a383f+'px';},Bitmap['prototype']['markCoreEngineModified']=function(){const _0x4912ea=_0x3d8147;this[_0x4912ea(0x652)]=!![];},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x383)]=Sprite[_0x3d8147(0x578)][_0x3d8147(0x734)],Sprite[_0x3d8147(0x578)]['destroy']=function(){const _0x300974=_0x3d8147;VisuMZ[_0x300974(0x385)]['Sprite_destroy'][_0x300974(0x3f6)](this),this[_0x300974(0x206)]();},Sprite['prototype']['destroyCoreEngineMarkedBitmaps']=function(){const _0xb066e=_0x3d8147;if(!this['bitmap'])return;if(!this[_0xb066e(0x61f)]['_customModified'])return;if(this['bitmap'][_0xb066e(0x5b2)]&&!this['_bitmap'][_0xb066e(0x5b2)][_0xb066e(0x293)]){if(_0xb066e(0x6c4)!==_0xb066e(0x6c4)){function _0x4eb794(){const _0x64a81a=_0xb066e,_0x267f11=this[_0x64a81a(0x2f1)](),_0x5c1926=this[_0x64a81a(0x231)][_0x64a81a(0x65b)](_0x33df33),_0x4ce0e2=_0x5c1926-this[_0x64a81a(0x2d8)][_0x64a81a(0x65b)](_0x2b4388);this[_0x64a81a(0x25d)](_0x2331ed[_0x64a81a(0x34e)](_0x4ce0e2)),this[_0x64a81a(0x248)](_0xcf3ab1[_0x64a81a(0x677)](_0x5c1926,0x0),_0x11100d,_0x4efadc,_0x267f11,_0x64a81a(0x5eb));}}else this[_0xb066e(0x61f)][_0xb066e(0x734)]();}},VisuMZ['CoreEngine'][_0x3d8147(0x2e1)]=Bitmap['prototype'][_0x3d8147(0x785)],Bitmap[_0x3d8147(0x578)]['resize']=function(_0x4351f0,_0x1f79d9){const _0xcc9d64=_0x3d8147;VisuMZ[_0xcc9d64(0x385)][_0xcc9d64(0x2e1)][_0xcc9d64(0x3f6)](this,_0x4351f0,_0x1f79d9),this[_0xcc9d64(0x4e1)]();},VisuMZ['CoreEngine'][_0x3d8147(0x6f1)]=Bitmap['prototype'][_0x3d8147(0x315)],Bitmap[_0x3d8147(0x578)]['blt']=function(_0x174de0,_0x22586d,_0x5c742c,_0x57f7d2,_0x30289b,_0x59449e,_0x5c8913,_0x4f150a,_0x48facc){const _0x469840=_0x3d8147;VisuMZ['CoreEngine'][_0x469840(0x6f1)][_0x469840(0x3f6)](this,_0x174de0,_0x22586d,_0x5c742c,_0x57f7d2,_0x30289b,_0x59449e,_0x5c8913,_0x4f150a,_0x48facc),this[_0x469840(0x4e1)]();},VisuMZ['CoreEngine'][_0x3d8147(0x756)]=Bitmap[_0x3d8147(0x578)][_0x3d8147(0x30c)],Bitmap['prototype']['clearRect']=function(_0xacf5b6,_0x779e6f,_0x5108f9,_0x5b948e){const _0x3da879=_0x3d8147;VisuMZ[_0x3da879(0x385)]['Bitmap_clearRect']['call'](this,_0xacf5b6,_0x779e6f,_0x5108f9,_0x5b948e),this[_0x3da879(0x4e1)]();},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x40b)]=Bitmap['prototype'][_0x3d8147(0x333)],Bitmap[_0x3d8147(0x578)]['fillRect']=function(_0x35db6a,_0x3d3b62,_0x3f8ecf,_0x30a611,_0xe81357){const _0x17acef=_0x3d8147;VisuMZ[_0x17acef(0x385)][_0x17acef(0x40b)][_0x17acef(0x3f6)](this,_0x35db6a,_0x3d3b62,_0x3f8ecf,_0x30a611,_0xe81357),this[_0x17acef(0x4e1)]();},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x156)]=Bitmap[_0x3d8147(0x578)]['strokeRect'],Bitmap[_0x3d8147(0x578)][_0x3d8147(0x496)]=function(_0x4c78a1,_0x4fa03f,_0x326760,_0x5b99ec,_0xca1736){const _0x21cfa3=_0x3d8147;VisuMZ[_0x21cfa3(0x385)][_0x21cfa3(0x156)]['call'](this,_0x4c78a1,_0x4fa03f,_0x326760,_0x5b99ec,_0xca1736),this[_0x21cfa3(0x4e1)]();},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x49e)]=Bitmap[_0x3d8147(0x578)]['gradientFillRect'],Bitmap[_0x3d8147(0x578)]['gradientFillRect']=function(_0x40cf54,_0x43d4c5,_0x4a6ec6,_0x4a064e,_0x15487b,_0x2d6de0,_0x7f65db){const _0x38f505=_0x3d8147;VisuMZ[_0x38f505(0x385)]['Bitmap_gradientFillRect']['call'](this,_0x40cf54,_0x43d4c5,_0x4a6ec6,_0x4a064e,_0x15487b,_0x2d6de0,_0x7f65db),this['markCoreEngineModified']();},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x420)]=Bitmap[_0x3d8147(0x578)]['drawCircle'],Bitmap[_0x3d8147(0x578)]['drawCircle']=function(_0x1f2970,_0x2ab034,_0x326337,_0x17d9ce){const _0x47518e=_0x3d8147;_0x1f2970=Math['round'](_0x1f2970),_0x2ab034=Math[_0x47518e(0x687)](_0x2ab034),_0x326337=Math[_0x47518e(0x687)](_0x326337),VisuMZ[_0x47518e(0x385)]['Bitmap_drawCircle'][_0x47518e(0x3f6)](this,_0x1f2970,_0x2ab034,_0x326337,_0x17d9ce),this['markCoreEngineModified']();},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x7cb)]=Bitmap[_0x3d8147(0x578)][_0x3d8147(0x3cc)],Bitmap['prototype'][_0x3d8147(0x3cc)]=function(_0x9ea5ba){const _0x91e26c=_0x3d8147;return Math['round'](VisuMZ[_0x91e26c(0x385)][_0x91e26c(0x7cb)][_0x91e26c(0x3f6)](this,_0x9ea5ba));},VisuMZ[_0x3d8147(0x385)]['Bitmap_drawText']=Bitmap['prototype'][_0x3d8147(0x248)],Bitmap[_0x3d8147(0x578)][_0x3d8147(0x248)]=function(_0x4ad857,_0x3b38a0,_0x2a3be4,_0x45c1f7,_0x544994,_0x42a5cd){const _0x44b7ff=_0x3d8147;_0x3b38a0=Math[_0x44b7ff(0x687)](_0x3b38a0),_0x2a3be4=Math[_0x44b7ff(0x687)](_0x2a3be4),_0x45c1f7=Math[_0x44b7ff(0x687)](_0x45c1f7),_0x544994=Math[_0x44b7ff(0x687)](_0x544994),VisuMZ[_0x44b7ff(0x385)][_0x44b7ff(0x144)][_0x44b7ff(0x3f6)](this,_0x4ad857,_0x3b38a0,_0x2a3be4,_0x45c1f7,_0x544994,_0x42a5cd),this[_0x44b7ff(0x4e1)]();},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x72c)]=Bitmap['prototype'][_0x3d8147(0x17e)],Bitmap[_0x3d8147(0x578)][_0x3d8147(0x17e)]=function(_0x5f2682,_0x1819db,_0x5b43b9,_0x13e78d){const _0x5d3c04=_0x3d8147;if(VisuMZ[_0x5d3c04(0x385)][_0x5d3c04(0x2df)]['QoL'][_0x5d3c04(0x40e)]){if(_0x5d3c04(0x500)===_0x5d3c04(0x500))this[_0x5d3c04(0x41e)](_0x5f2682,_0x1819db,_0x5b43b9,_0x13e78d);else{function _0xde6a9e(){const _0x35c837=_0x5d3c04;_0x176fb4[_0x35c837(0x385)][_0x35c837(0x44d)][_0x35c837(0x3f6)](this);}}}else VisuMZ[_0x5d3c04(0x385)][_0x5d3c04(0x72c)][_0x5d3c04(0x3f6)](this,_0x5f2682,_0x1819db,_0x5b43b9,_0x13e78d);},Bitmap['prototype']['_drawTextShadow']=function(_0xfc105a,_0x398a7b,_0x59d947,_0x275008){const _0x5343d0=_0x3d8147,_0x1cc9af=this['context'];_0x1cc9af[_0x5343d0(0x1e1)]=this[_0x5343d0(0x1c5)],_0x1cc9af[_0x5343d0(0x71a)](_0xfc105a,_0x398a7b+0x2,_0x59d947+0x2,_0x275008);},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x720)]=Input[_0x3d8147(0x684)],Input['clear']=function(){const _0x8d87c8=_0x3d8147;VisuMZ[_0x8d87c8(0x385)][_0x8d87c8(0x720)]['call'](this),this[_0x8d87c8(0x1c0)]=undefined,this[_0x8d87c8(0x1ae)]=undefined;},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x521)]=Input[_0x3d8147(0x6a0)],Input[_0x3d8147(0x6a0)]=function(){const _0x1d3c17=_0x3d8147;VisuMZ[_0x1d3c17(0x385)]['Input_setupEventHandlers'][_0x1d3c17(0x3f6)](this),document['addEventListener'](_0x1d3c17(0x6b4),this[_0x1d3c17(0x6dc)]['bind'](this));},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x64d)]=Input[_0x3d8147(0x32d)],Input[_0x3d8147(0x32d)]=function(_0x46760e){const _0x4d9df3=_0x3d8147;this[_0x4d9df3(0x1ae)]=_0x46760e[_0x4d9df3(0x464)],VisuMZ['CoreEngine'][_0x4d9df3(0x64d)]['call'](this,_0x46760e);},Input[_0x3d8147(0x6dc)]=function(_0x50fcc0){const _0x4df141=_0x3d8147;this[_0x4df141(0x33f)](_0x50fcc0);},Input['_registerKeyInput']=function(_0x1fc4c8){const _0x4fff7a=_0x3d8147;this[_0x4fff7a(0x1ae)]=_0x1fc4c8[_0x4fff7a(0x464)];let _0x41c27a=String['fromCharCode'](_0x1fc4c8[_0x4fff7a(0x653)]);this[_0x4fff7a(0x1c0)]===undefined?this[_0x4fff7a(0x1c0)]=_0x41c27a:this['_inputString']+=_0x41c27a;},VisuMZ['CoreEngine'][_0x3d8147(0x6b1)]=Input[_0x3d8147(0x733)],Input[_0x3d8147(0x733)]=function(_0xc7950b){const _0x34fa18=_0x3d8147;if(_0xc7950b===0x8)return![];return VisuMZ[_0x34fa18(0x385)][_0x34fa18(0x6b1)]['call'](this,_0xc7950b);},Input[_0x3d8147(0x253)]=function(_0x556fce){const _0x378806=_0x3d8147;if(_0x556fce[_0x378806(0x143)](/backspace/i))return this[_0x378806(0x1ae)]===0x8;if(_0x556fce[_0x378806(0x143)](/enter/i))return this[_0x378806(0x1ae)]===0xd;if(_0x556fce['match'](/escape/i))return this['_inputSpecialKeyCode']===0x1b;},Input[_0x3d8147(0x237)]=function(){const _0x8ca388=_0x3d8147;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x8ca388(0x406)](this[_0x8ca388(0x1ae)]);},Input[_0x3d8147(0x6ca)]=function(){const _0x3341ce=_0x3d8147;return[0x25,0x26,0x27,0x28]['contains'](this[_0x3341ce(0x1ae)]);},VisuMZ['CoreEngine'][_0x3d8147(0x494)]=Tilemap[_0x3d8147(0x578)]['_addShadow'],Tilemap[_0x3d8147(0x578)][_0x3d8147(0x35b)]=function(_0x494678,_0x5e130b,_0x53d9c4,_0x2507ae){const _0x37565f=_0x3d8147;if($gameMap&&$gameMap[_0x37565f(0x4fd)]())return;VisuMZ['CoreEngine'][_0x37565f(0x494)][_0x37565f(0x3f6)](this,_0x494678,_0x5e130b,_0x53d9c4,_0x2507ae);},Tilemap[_0x3d8147(0x695)][_0x3d8147(0x578)][_0x3d8147(0x55a)]=function(){const _0x4559d3=_0x3d8147;this[_0x4559d3(0x7c9)]();for(let _0x1ace6f=0x0;_0x1ace6f<Tilemap[_0x4559d3(0x47a)]['MAX_GL_TEXTURES'];_0x1ace6f++){if(_0x4559d3(0x7b4)!==_0x4559d3(0x668)){const _0x195d44=new PIXI['BaseTexture']();_0x195d44[_0x4559d3(0x57e)](0x800,0x800),VisuMZ[_0x4559d3(0x385)][_0x4559d3(0x2df)][_0x4559d3(0x672)]['PixelateImageRendering']&&(_0x195d44[_0x4559d3(0x462)]=PIXI[_0x4559d3(0x6d8)][_0x4559d3(0x2dd)]),this[_0x4559d3(0x59e)][_0x4559d3(0x58a)](_0x195d44);}else{function _0x297b8c(){const _0x1bcafd=_0x4559d3;return _0x24db3c[_0x1bcafd(0x385)][_0x1bcafd(0x2df)]['Param']['DisplayedParams'][_0x1bcafd(0x278)];}}}},WindowLayer[_0x3d8147(0x578)][_0x3d8147(0x66e)]=function(){const _0x11e841=_0x3d8147;if(SceneManager&&SceneManager[_0x11e841(0x588)])return SceneManager[_0x11e841(0x588)][_0x11e841(0x5f4)]();else{if(_0x11e841(0x204)===_0x11e841(0x1d4)){function _0x4c3da1(){const _0x1ebab8=_0x11e841;return _0x5b4630[_0x1ebab8(0x385)]['Settings'][_0x1ebab8(0x19d)][_0x1ebab8(0x16c)][_0x1ebab8(0x3f6)](this,_0x18fb8b);}}else return!![];}},VisuMZ['CoreEngine'][_0x3d8147(0x4dc)]=WindowLayer['prototype']['render'],WindowLayer[_0x3d8147(0x578)][_0x3d8147(0x519)]=function render(_0x5207d9){const _0x5b1a43=_0x3d8147;if(this['isMaskingEnabled']()){if(_0x5b1a43(0x260)!==_0x5b1a43(0x260)){function _0x5d652a(){const _0x2e736e=_0x5b1a43;_0x368eb3['CoreEngine'][_0x2e736e(0x16d)][_0x2e736e(0x3f6)](this,_0x2b1741);}}else VisuMZ[_0x5b1a43(0x385)][_0x5b1a43(0x4dc)][_0x5b1a43(0x3f6)](this,_0x5207d9);}else{if('iJGSQ'===_0x5b1a43(0x55c))this[_0x5b1a43(0x52a)](_0x5207d9);else{function _0x4d5c0c(){const _0x261244=_0x5b1a43;_0x14aef4[_0x261244(0x53f)](_0x1da1b5,_0x2d4424);}}}},WindowLayer[_0x3d8147(0x578)][_0x3d8147(0x52a)]=function render(_0x16edd7){const _0x516d59=_0x3d8147;if(!this[_0x516d59(0x660)])return;const _0x592df2=new PIXI[(_0x516d59(0x423))](),_0x53e671=_0x16edd7['gl'],_0x518e72=this[_0x516d59(0x728)]['clone']();_0x16edd7[_0x516d59(0x59d)]['forceStencil'](),_0x592df2[_0x516d59(0x270)]=this[_0x516d59(0x270)],_0x16edd7[_0x516d59(0x251)]['flush'](),_0x53e671['enable'](_0x53e671[_0x516d59(0x152)]);while(_0x518e72['length']>0x0){if(_0x516d59(0x43c)!=='dWLLB'){const _0x1bc84a=_0x518e72[_0x516d59(0x4be)]();_0x1bc84a[_0x516d59(0x2bf)]&&_0x1bc84a[_0x516d59(0x660)]&&_0x1bc84a[_0x516d59(0x138)]>0x0&&(_0x53e671[_0x516d59(0x4cf)](_0x53e671[_0x516d59(0x25b)],0x0,~0x0),_0x53e671[_0x516d59(0x1fc)](_0x53e671[_0x516d59(0x2fa)],_0x53e671[_0x516d59(0x2fa)],_0x53e671['KEEP']),_0x1bc84a[_0x516d59(0x519)](_0x16edd7),_0x16edd7[_0x516d59(0x251)][_0x516d59(0x4c8)](),_0x592df2[_0x516d59(0x684)](),_0x53e671[_0x516d59(0x4cf)](_0x53e671[_0x516d59(0x55e)],0x1,~0x0),_0x53e671[_0x516d59(0x1fc)](_0x53e671[_0x516d59(0x2d6)],_0x53e671[_0x516d59(0x2d6)],_0x53e671[_0x516d59(0x2d6)]),_0x53e671['blendFunc'](_0x53e671[_0x516d59(0x3db)],_0x53e671[_0x516d59(0x482)]),_0x592df2[_0x516d59(0x519)](_0x16edd7),_0x16edd7[_0x516d59(0x251)][_0x516d59(0x4c8)](),_0x53e671['blendFunc'](_0x53e671['ONE'],_0x53e671[_0x516d59(0x3fa)]));}else{function _0x54d804(){const _0x5e9fca=_0x516d59;_0x46a938['isPlaytest']()&&(_0x3768b6[_0x5e9fca(0x694)](_0x5e9fca(0x38d)),_0x2df53f['log'](_0x331f58)),this[_0x5e9fca(0x526)]();}}}_0x53e671[_0x516d59(0x75b)](_0x53e671[_0x516d59(0x152)]),_0x53e671[_0x516d59(0x684)](_0x53e671[_0x516d59(0x217)]),_0x53e671[_0x516d59(0x27a)](0x0),_0x16edd7[_0x516d59(0x251)]['flush']();for(const _0x3f8222 of this['children']){if(_0x516d59(0x5cf)!==_0x516d59(0x5cf)){function _0x219895(){const _0x2dbf73=_0x516d59;this[_0x2dbf73(0x36f)]['x']=_0x7c32e[_0x2dbf73(0x7d7)]+0x4;}}else!_0x3f8222[_0x516d59(0x2bf)]&&_0x3f8222[_0x516d59(0x660)]&&_0x3f8222[_0x516d59(0x519)](_0x16edd7);}_0x16edd7[_0x516d59(0x251)][_0x516d59(0x4c8)]();},DataManager[_0x3d8147(0x1c6)]=function(_0x1cfcc2){const _0x106852=_0x3d8147;return this[_0x106852(0x4de)](_0x1cfcc2)&&_0x1cfcc2[_0x106852(0x2ae)]===0x2;},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x273)]=DataManager[_0x3d8147(0x52c)],DataManager[_0x3d8147(0x52c)]=function(){const _0x29da31=_0x3d8147;VisuMZ[_0x29da31(0x385)][_0x29da31(0x273)][_0x29da31(0x3f6)](this),this[_0x29da31(0x2a3)]();},DataManager['reservePlayTestNewGameCommonEvent']=function(){const _0x167e83=_0x3d8147;if($gameTemp[_0x167e83(0x397)]()){if(_0x167e83(0x3b9)===_0x167e83(0x3b9)){const _0x1b2e7c=VisuMZ[_0x167e83(0x385)][_0x167e83(0x2df)][_0x167e83(0x672)][_0x167e83(0x4b5)];if(_0x1b2e7c>0x0)$gameTemp[_0x167e83(0x740)](_0x1b2e7c);}else{function _0x430a92(){const _0xd04123=_0x167e83;return _0xfd7af8[_0xd04123(0x4b8)][_0xd04123(0x14f)][_0xd04123(0x3f6)](this);}}}},TextManager[_0x3d8147(0x463)]=['','','',_0x3d8147(0x154),'','',_0x3d8147(0x452),'',_0x3d8147(0x517),'TAB','','',_0x3d8147(0x6b3),'ENTER','ENTER_SPECIAL','','SHIFT',_0x3d8147(0x76b),_0x3d8147(0x335),'PAUSE',_0x3d8147(0x540),'KANA',_0x3d8147(0x5ae),_0x3d8147(0x1bc),_0x3d8147(0x208),'HANJA','',_0x3d8147(0x576),_0x3d8147(0x332),_0x3d8147(0x46e),'ACCEPT',_0x3d8147(0x5d7),_0x3d8147(0x75c),_0x3d8147(0x70d),'PGDN',_0x3d8147(0x365),_0x3d8147(0x613),_0x3d8147(0x15d),'UP',_0x3d8147(0x310),_0x3d8147(0x1f3),'SELECT',_0x3d8147(0x630),'EXECUTE',_0x3d8147(0x78a),'INSERT',_0x3d8147(0x61e),'','0','1','2','3','4','5','6','7','8','9',_0x3d8147(0x1e9),_0x3d8147(0x697),_0x3d8147(0x5f8),_0x3d8147(0x1b1),'GREATER_THAN',_0x3d8147(0x651),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x3d8147(0x30b),'',_0x3d8147(0x4fc),'',_0x3d8147(0x38b),_0x3d8147(0x5c8),_0x3d8147(0x179),_0x3d8147(0x311),'NUMPAD3','NUMPAD4','NUMPAD5','NUMPAD6',_0x3d8147(0x45e),_0x3d8147(0x472),_0x3d8147(0x79b),_0x3d8147(0x2bd),_0x3d8147(0x4bb),_0x3d8147(0x62f),'SUBTRACT',_0x3d8147(0x1b2),'DIVIDE','F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x3d8147(0x265),_0x3d8147(0x53a),_0x3d8147(0x49b),_0x3d8147(0x42f),_0x3d8147(0x417),'F15','F16',_0x3d8147(0x491),'F18','F19',_0x3d8147(0x5ad),'F21',_0x3d8147(0x255),_0x3d8147(0x56e),_0x3d8147(0x249),'','','','','','','','','NUM_LOCK',_0x3d8147(0x184),_0x3d8147(0x65d),_0x3d8147(0x5f6),_0x3d8147(0x636),'WIN_OEM_FJ_LOYA','WIN_OEM_FJ_ROYA','','','','','','','','','',_0x3d8147(0x5af),_0x3d8147(0x699),'DOUBLE_QUOTE','HASH',_0x3d8147(0x50d),_0x3d8147(0x726),_0x3d8147(0x775),_0x3d8147(0x348),'OPEN_PAREN',_0x3d8147(0x426),_0x3d8147(0x23d),'PLUS',_0x3d8147(0x2b3),_0x3d8147(0x328),_0x3d8147(0x62e),_0x3d8147(0x29c),_0x3d8147(0x24e),'','','','',_0x3d8147(0x17b),_0x3d8147(0x5c4),'VOLUME_UP','','',_0x3d8147(0x697),_0x3d8147(0x1b1),'COMMA','MINUS',_0x3d8147(0x542),_0x3d8147(0x438),_0x3d8147(0x6d1),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x3d8147(0x160),_0x3d8147(0x1c7),_0x3d8147(0x69f),_0x3d8147(0x1f2),'','META','ALTGR','','WIN_ICO_HELP',_0x3d8147(0x7b5),'',_0x3d8147(0x2eb),'','',_0x3d8147(0x5ce),_0x3d8147(0x2a6),'WIN_OEM_PA1','WIN_OEM_PA2',_0x3d8147(0x666),_0x3d8147(0x79e),_0x3d8147(0x64b),_0x3d8147(0x27d),_0x3d8147(0x676),_0x3d8147(0x787),_0x3d8147(0x5f2),'WIN_OEM_ENLW',_0x3d8147(0x409),_0x3d8147(0x1f8),_0x3d8147(0x2e5),'EXSEL',_0x3d8147(0x791),_0x3d8147(0x753),_0x3d8147(0x2e2),'',_0x3d8147(0x6c7),'WIN_OEM_CLEAR',''],TextManager['buttonAssistOk']=VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x2df)][_0x3d8147(0x30a)]['OkText'],TextManager['buttonAssistCancel']=VisuMZ['CoreEngine'][_0x3d8147(0x2df)][_0x3d8147(0x30a)][_0x3d8147(0x194)],TextManager[_0x3d8147(0x63a)]=VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x2df)][_0x3d8147(0x30a)]['SwitchActorText'],VisuMZ['CoreEngine'][_0x3d8147(0x3ca)]=TextManager[_0x3d8147(0x34c)],TextManager['param']=function(_0xf7748a){const _0x5530ec=_0x3d8147;if(typeof _0xf7748a===_0x5530ec(0x3c6))return VisuMZ[_0x5530ec(0x385)][_0x5530ec(0x3ca)][_0x5530ec(0x3f6)](this,_0xf7748a);else{if(_0x5530ec(0x7d1)===_0x5530ec(0x7d1))return this[_0x5530ec(0x3f3)](_0xf7748a);else{function _0x3102b6(){const _0x3748f3=_0x5530ec;return _0x3748f3(0x4e4);}}}},TextManager[_0x3d8147(0x3f3)]=function(_0x3a8b84){const _0x2495ff=_0x3d8147;_0x3a8b84=String(_0x3a8b84||'')[_0x2495ff(0x7bb)]();const _0x1551ae=VisuMZ['CoreEngine'][_0x2495ff(0x2df)][_0x2495ff(0x641)];if(_0x3a8b84===_0x2495ff(0x456))return $dataSystem[_0x2495ff(0x689)]['params'][0x0];if(_0x3a8b84===_0x2495ff(0x264))return $dataSystem[_0x2495ff(0x689)][_0x2495ff(0x1de)][0x1];if(_0x3a8b84==='ATK')return $dataSystem[_0x2495ff(0x689)][_0x2495ff(0x1de)][0x2];if(_0x3a8b84===_0x2495ff(0x3b2))return $dataSystem[_0x2495ff(0x689)][_0x2495ff(0x1de)][0x3];if(_0x3a8b84===_0x2495ff(0x77f))return $dataSystem[_0x2495ff(0x689)][_0x2495ff(0x1de)][0x4];if(_0x3a8b84===_0x2495ff(0x2c8))return $dataSystem['terms']['params'][0x5];if(_0x3a8b84===_0x2495ff(0x6a4))return $dataSystem[_0x2495ff(0x689)]['params'][0x6];if(_0x3a8b84===_0x2495ff(0x2c2))return $dataSystem['terms'][_0x2495ff(0x1de)][0x7];if(_0x3a8b84===_0x2495ff(0x3b0))return _0x1551ae[_0x2495ff(0x528)];if(_0x3a8b84===_0x2495ff(0x73e))return _0x1551ae[_0x2495ff(0x711)];if(_0x3a8b84===_0x2495ff(0x1ec))return _0x1551ae[_0x2495ff(0x3c0)];if(_0x3a8b84===_0x2495ff(0x166))return _0x1551ae[_0x2495ff(0x692)];if(_0x3a8b84===_0x2495ff(0x19a))return _0x1551ae[_0x2495ff(0x532)];if(_0x3a8b84===_0x2495ff(0x7ba))return _0x1551ae[_0x2495ff(0x428)];if(_0x3a8b84===_0x2495ff(0x2b6))return _0x1551ae[_0x2495ff(0x6e9)];if(_0x3a8b84==='HRG')return _0x1551ae['XParamVocab7'];if(_0x3a8b84===_0x2495ff(0x3f1))return _0x1551ae['XParamVocab8'];if(_0x3a8b84===_0x2495ff(0x61c))return _0x1551ae[_0x2495ff(0x435)];if(_0x3a8b84==='TGR')return _0x1551ae[_0x2495ff(0x488)];if(_0x3a8b84===_0x2495ff(0x712))return _0x1551ae[_0x2495ff(0x49a)];if(_0x3a8b84===_0x2495ff(0x15a))return _0x1551ae[_0x2495ff(0x131)];if(_0x3a8b84===_0x2495ff(0x3df))return _0x1551ae[_0x2495ff(0x7b6)];if(_0x3a8b84===_0x2495ff(0x68d))return _0x1551ae[_0x2495ff(0x601)];if(_0x3a8b84===_0x2495ff(0x4a5))return _0x1551ae[_0x2495ff(0x5ac)];if(_0x3a8b84==='PDR')return _0x1551ae[_0x2495ff(0x4a4)];if(_0x3a8b84===_0x2495ff(0x650))return _0x1551ae[_0x2495ff(0x679)];if(_0x3a8b84==='FDR')return _0x1551ae[_0x2495ff(0x49d)];if(_0x3a8b84==='EXR')return _0x1551ae[_0x2495ff(0x571)];if(VisuMZ[_0x2495ff(0x385)][_0x2495ff(0x658)][_0x3a8b84])return VisuMZ[_0x2495ff(0x385)][_0x2495ff(0x658)][_0x3a8b84];return'';},TextManager[_0x3d8147(0x55b)]=function(_0x10c8bb){const _0x425e4e=_0x3d8147;if(_0x10c8bb==='cancel')_0x10c8bb=_0x425e4e(0x55f);let _0x5855ed=[];for(let _0x50a35a in Input[_0x425e4e(0x547)]){_0x50a35a=Number(_0x50a35a);if(_0x50a35a>=0x60&&_0x50a35a<=0x69)continue;if([0x12,0x20][_0x425e4e(0x760)](_0x50a35a))continue;_0x10c8bb===Input[_0x425e4e(0x547)][_0x50a35a]&&_0x5855ed[_0x425e4e(0x58a)](_0x50a35a);}for(let _0x58ea0d=0x0;_0x58ea0d<_0x5855ed[_0x425e4e(0x278)];_0x58ea0d++){if(_0x425e4e(0x280)!=='MrWmN'){function _0x583823(){const _0xf76622=_0x425e4e;this['x']=_0x12de65[_0xf76622(0x300)],this['y']=_0xa12c1[_0xf76622(0x195)],this[_0xf76622(0x660)]=![],this['setupButtonImage']();}}else _0x5855ed[_0x58ea0d]=TextManager[_0x425e4e(0x463)][_0x5855ed[_0x58ea0d]];}return this[_0x425e4e(0x61d)](_0x5855ed);},TextManager[_0x3d8147(0x61d)]=function(_0x222ca6){const _0x5c72b8=_0x3d8147,_0x358b0d=VisuMZ[_0x5c72b8(0x385)]['Settings'][_0x5c72b8(0x30a)],_0x49b999=_0x358b0d[_0x5c72b8(0x2cb)],_0x53ce5c=_0x222ca6[_0x5c72b8(0x4ff)](),_0x3ec0ae=_0x5c72b8(0x228)['format'](_0x53ce5c);return _0x358b0d[_0x3ec0ae]?_0x358b0d[_0x3ec0ae]:_0x49b999[_0x5c72b8(0x440)](_0x53ce5c);},TextManager[_0x3d8147(0x1e4)]=function(_0x5cf574,_0x49a9cb){const _0x274aea=_0x3d8147,_0x15644a=VisuMZ['CoreEngine'][_0x274aea(0x2df)][_0x274aea(0x30a)],_0x59c582=_0x15644a[_0x274aea(0x579)],_0x1d0f07=this['getInputButtonString'](_0x5cf574),_0x43c26b=this[_0x274aea(0x55b)](_0x49a9cb);return _0x59c582[_0x274aea(0x440)](_0x1d0f07,_0x43c26b);},VisuMZ[_0x3d8147(0x385)]['ColorManager_loadWindowskin']=ColorManager['loadWindowskin'],ColorManager[_0x3d8147(0x38f)]=function(){const _0x293496=_0x3d8147;VisuMZ['CoreEngine'][_0x293496(0x2d5)][_0x293496(0x3f6)](this),this[_0x293496(0x7d5)]=this[_0x293496(0x7d5)]||{};},ColorManager[_0x3d8147(0x565)]=function(_0xee934f,_0x380fc2){const _0xd82bf0=_0x3d8147;_0x380fc2=String(_0x380fc2),this[_0xd82bf0(0x7d5)]=this['_colorCache']||{};if(_0x380fc2[_0xd82bf0(0x143)](/#(.*)/i))this['_colorCache'][_0xee934f]=_0xd82bf0(0x780)[_0xd82bf0(0x440)](String(RegExp['$1']));else{if('FgMAE'===_0xd82bf0(0x759))this[_0xd82bf0(0x7d5)][_0xee934f]=this[_0xd82bf0(0x1b4)](Number(_0x380fc2));else{function _0x3f047a(){const _0x3ad5ca=_0xd82bf0;return _0x3fc05e['CoreEngine'][_0x3ad5ca(0x2df)][_0x3ad5ca(0x73a)][_0x3ad5ca(0x3dd)];}}}return this['_colorCache'][_0xee934f];},ColorManager[_0x3d8147(0x47f)]=function(_0x435fa4){const _0x20bbbc=_0x3d8147;return _0x435fa4=String(_0x435fa4),_0x435fa4[_0x20bbbc(0x143)](/#(.*)/i)?_0x20bbbc(0x780)['format'](String(RegExp['$1'])):this['textColor'](Number(_0x435fa4));},ColorManager[_0x3d8147(0x659)]=function(){const _0x40d247=_0x3d8147;this[_0x40d247(0x7d5)]={};},ColorManager['normalColor']=function(){const _0x4b3c22=_0x3d8147,_0x562b9e='_stored_normalColor';this[_0x4b3c22(0x7d5)]=this[_0x4b3c22(0x7d5)]||{};if(this[_0x4b3c22(0x7d5)][_0x562b9e])return this[_0x4b3c22(0x7d5)][_0x562b9e];const _0x54e788=VisuMZ['CoreEngine'][_0x4b3c22(0x2df)][_0x4b3c22(0x19d)][_0x4b3c22(0x6cf)];return this[_0x4b3c22(0x565)](_0x562b9e,_0x54e788);},ColorManager['systemColor']=function(){const _0x56e978=_0x3d8147,_0x5a07cc=_0x56e978(0x78f);this[_0x56e978(0x7d5)]=this[_0x56e978(0x7d5)]||{};if(this[_0x56e978(0x7d5)][_0x5a07cc])return this['_colorCache'][_0x5a07cc];const _0x261dd2=VisuMZ[_0x56e978(0x385)][_0x56e978(0x2df)]['Color'][_0x56e978(0x256)];return this[_0x56e978(0x565)](_0x5a07cc,_0x261dd2);},ColorManager[_0x3d8147(0x252)]=function(){const _0x39d6c6=_0x3d8147,_0x4675c0=_0x39d6c6(0x25e);this[_0x39d6c6(0x7d5)]=this[_0x39d6c6(0x7d5)]||{};if(this[_0x39d6c6(0x7d5)][_0x4675c0])return this[_0x39d6c6(0x7d5)][_0x4675c0];const _0x56aef2=VisuMZ[_0x39d6c6(0x385)][_0x39d6c6(0x2df)][_0x39d6c6(0x19d)][_0x39d6c6(0x469)];return this[_0x39d6c6(0x565)](_0x4675c0,_0x56aef2);},ColorManager[_0x3d8147(0x45a)]=function(){const _0x9d421b=_0x3d8147,_0x12ee90=_0x9d421b(0x522);this['_colorCache']=this[_0x9d421b(0x7d5)]||{};if(this[_0x9d421b(0x7d5)][_0x12ee90])return this['_colorCache'][_0x12ee90];const _0x5ebe0c=VisuMZ[_0x9d421b(0x385)][_0x9d421b(0x2df)][_0x9d421b(0x19d)]['ColorDeath'];return this[_0x9d421b(0x565)](_0x12ee90,_0x5ebe0c);},ColorManager[_0x3d8147(0x584)]=function(){const _0x32750f=_0x3d8147,_0x28dc52=_0x32750f(0x6db);this[_0x32750f(0x7d5)]=this[_0x32750f(0x7d5)]||{};if(this[_0x32750f(0x7d5)][_0x28dc52])return this[_0x32750f(0x7d5)][_0x28dc52];const _0x4c2799=VisuMZ[_0x32750f(0x385)][_0x32750f(0x2df)][_0x32750f(0x19d)][_0x32750f(0x48c)];return this[_0x32750f(0x565)](_0x28dc52,_0x4c2799);},ColorManager[_0x3d8147(0x5c2)]=function(){const _0x408496=_0x3d8147,_0xb6db1c=_0x408496(0x213);this[_0x408496(0x7d5)]=this[_0x408496(0x7d5)]||{};if(this[_0x408496(0x7d5)][_0xb6db1c])return this['_colorCache'][_0xb6db1c];const _0x6e59fe=VisuMZ['CoreEngine'][_0x408496(0x2df)][_0x408496(0x19d)][_0x408496(0x189)];return this[_0x408496(0x565)](_0xb6db1c,_0x6e59fe);},ColorManager[_0x3d8147(0x6a9)]=function(){const _0x49629a=_0x3d8147,_0x46032e=_0x49629a(0x441);this[_0x49629a(0x7d5)]=this[_0x49629a(0x7d5)]||{};if(this[_0x49629a(0x7d5)][_0x46032e])return this[_0x49629a(0x7d5)][_0x46032e];const _0x53ef32=VisuMZ[_0x49629a(0x385)][_0x49629a(0x2df)]['Color']['ColorHPGauge2'];return this['getColorDataFromPluginParameters'](_0x46032e,_0x53ef32);},ColorManager[_0x3d8147(0x581)]=function(){const _0x5775ea=_0x3d8147,_0x3abb0f=_0x5775ea(0x506);this[_0x5775ea(0x7d5)]=this['_colorCache']||{};if(this[_0x5775ea(0x7d5)][_0x3abb0f])return this[_0x5775ea(0x7d5)][_0x3abb0f];const _0x2fb115=VisuMZ['CoreEngine'][_0x5775ea(0x2df)][_0x5775ea(0x19d)][_0x5775ea(0x22f)];return this[_0x5775ea(0x565)](_0x3abb0f,_0x2fb115);},ColorManager[_0x3d8147(0x633)]=function(){const _0x3b7944=_0x3d8147,_0x11e1ca='_stored_mpGaugeColor2';this[_0x3b7944(0x7d5)]=this['_colorCache']||{};if(this[_0x3b7944(0x7d5)][_0x11e1ca])return this['_colorCache'][_0x11e1ca];const _0x54bb6d=VisuMZ[_0x3b7944(0x385)]['Settings']['Color']['ColorMPGauge2'];return this[_0x3b7944(0x565)](_0x11e1ca,_0x54bb6d);},ColorManager[_0x3d8147(0x7ca)]=function(){const _0x496c9e=_0x3d8147,_0x2c7c1c=_0x496c9e(0x738);this[_0x496c9e(0x7d5)]=this[_0x496c9e(0x7d5)]||{};if(this[_0x496c9e(0x7d5)][_0x2c7c1c])return this['_colorCache'][_0x2c7c1c];const _0x1d137b=VisuMZ[_0x496c9e(0x385)][_0x496c9e(0x2df)]['Color']['ColorMPCost'];return this[_0x496c9e(0x565)](_0x2c7c1c,_0x1d137b);},ColorManager['powerUpColor']=function(){const _0x342db7=_0x3d8147,_0x47f438='_stored_powerUpColor';this[_0x342db7(0x7d5)]=this[_0x342db7(0x7d5)]||{};if(this[_0x342db7(0x7d5)][_0x47f438])return this[_0x342db7(0x7d5)][_0x47f438];const _0xbb161b=VisuMZ[_0x342db7(0x385)][_0x342db7(0x2df)][_0x342db7(0x19d)][_0x342db7(0x596)];return this[_0x342db7(0x565)](_0x47f438,_0xbb161b);},ColorManager[_0x3d8147(0x670)]=function(){const _0x17d3d5=_0x3d8147,_0x39ef94='_stored_powerDownColor';this[_0x17d3d5(0x7d5)]=this[_0x17d3d5(0x7d5)]||{};if(this['_colorCache'][_0x39ef94])return this['_colorCache'][_0x39ef94];const _0x4f31a9=VisuMZ['CoreEngine'][_0x17d3d5(0x2df)]['Color'][_0x17d3d5(0x56c)];return this[_0x17d3d5(0x565)](_0x39ef94,_0x4f31a9);},ColorManager[_0x3d8147(0x50e)]=function(){const _0x376cde=_0x3d8147,_0x2d70ea=_0x376cde(0x79d);this[_0x376cde(0x7d5)]=this[_0x376cde(0x7d5)]||{};if(this[_0x376cde(0x7d5)][_0x2d70ea])return this[_0x376cde(0x7d5)][_0x2d70ea];const _0x575d23=VisuMZ[_0x376cde(0x385)]['Settings'][_0x376cde(0x19d)][_0x376cde(0x3a1)];return this[_0x376cde(0x565)](_0x2d70ea,_0x575d23);},ColorManager[_0x3d8147(0x181)]=function(){const _0x46e0a7=_0x3d8147,_0x36ff3b=_0x46e0a7(0x21b);this[_0x46e0a7(0x7d5)]=this['_colorCache']||{};if(this[_0x46e0a7(0x7d5)][_0x36ff3b])return this[_0x46e0a7(0x7d5)][_0x36ff3b];const _0x2618d3=VisuMZ['CoreEngine'][_0x46e0a7(0x2df)]['Color'][_0x46e0a7(0x706)];return this[_0x46e0a7(0x565)](_0x36ff3b,_0x2618d3);},ColorManager['tpGaugeColor1']=function(){const _0x1a0c47=_0x3d8147,_0x3d45f4=_0x1a0c47(0x475);this[_0x1a0c47(0x7d5)]=this[_0x1a0c47(0x7d5)]||{};if(this[_0x1a0c47(0x7d5)][_0x3d45f4])return this['_colorCache'][_0x3d45f4];const _0x72a1d2=VisuMZ[_0x1a0c47(0x385)][_0x1a0c47(0x2df)][_0x1a0c47(0x19d)][_0x1a0c47(0x28a)];return this['getColorDataFromPluginParameters'](_0x3d45f4,_0x72a1d2);},ColorManager[_0x3d8147(0x611)]=function(){const _0x13647b=_0x3d8147,_0x4f3ae6='_stored_tpGaugeColor2';this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x4f3ae6])return this[_0x13647b(0x7d5)][_0x4f3ae6];const _0x5a33f3=VisuMZ[_0x13647b(0x385)][_0x13647b(0x2df)][_0x13647b(0x19d)][_0x13647b(0x5a2)];return this[_0x13647b(0x565)](_0x4f3ae6,_0x5a33f3);},ColorManager[_0x3d8147(0x569)]=function(){const _0xdc3b17=_0x3d8147,_0x58308c=_0xdc3b17(0x43e);this['_colorCache']=this[_0xdc3b17(0x7d5)]||{};if(this[_0xdc3b17(0x7d5)][_0x58308c])return this[_0xdc3b17(0x7d5)][_0x58308c];const _0x653bce=VisuMZ[_0xdc3b17(0x385)][_0xdc3b17(0x2df)][_0xdc3b17(0x19d)][_0xdc3b17(0x567)];return this[_0xdc3b17(0x565)](_0x58308c,_0x653bce);},ColorManager[_0x3d8147(0x5bb)]=function(){const _0x3522a4=_0x3d8147,_0x13decc=_0x3522a4(0x319);this['_colorCache']=this[_0x3522a4(0x7d5)]||{};if(this['_colorCache'][_0x13decc])return this[_0x3522a4(0x7d5)][_0x13decc];const _0x3b8653=VisuMZ[_0x3522a4(0x385)]['Settings'][_0x3522a4(0x19d)]['ColorTPCost'];return this[_0x3522a4(0x565)](_0x13decc,_0x3b8653);},ColorManager[_0x3d8147(0x574)]=function(){const _0x1cf6a9=_0x3d8147,_0x248521=_0x1cf6a9(0x77a);this['_colorCache']=this[_0x1cf6a9(0x7d5)]||{};if(this[_0x1cf6a9(0x7d5)][_0x248521])return this['_colorCache'][_0x248521];const _0x48ecb5=VisuMZ[_0x1cf6a9(0x385)][_0x1cf6a9(0x2df)][_0x1cf6a9(0x19d)][_0x1cf6a9(0x758)];return this[_0x1cf6a9(0x565)](_0x248521,_0x48ecb5);},ColorManager[_0x3d8147(0x7aa)]=function(){const _0x4e1335=_0x3d8147,_0xdda5e=_0x4e1335(0x2f2);this[_0x4e1335(0x7d5)]=this[_0x4e1335(0x7d5)]||{};if(this['_colorCache'][_0xdda5e])return this['_colorCache'][_0xdda5e];const _0x1fc0b1=VisuMZ[_0x4e1335(0x385)][_0x4e1335(0x2df)][_0x4e1335(0x19d)][_0x4e1335(0x13f)];return this[_0x4e1335(0x565)](_0xdda5e,_0x1fc0b1);},ColorManager[_0x3d8147(0x72e)]=function(){const _0xbdfa93=_0x3d8147,_0x41e989=_0xbdfa93(0x45c);this[_0xbdfa93(0x7d5)]=this[_0xbdfa93(0x7d5)]||{};if(this['_colorCache'][_0x41e989])return this[_0xbdfa93(0x7d5)][_0x41e989];const _0x508e73=VisuMZ[_0xbdfa93(0x385)]['Settings'][_0xbdfa93(0x19d)][_0xbdfa93(0x7bc)];return this[_0xbdfa93(0x565)](_0x41e989,_0x508e73);},ColorManager[_0x3d8147(0x78c)]=function(){const _0x292e9d=_0x3d8147,_0x1699fc=_0x292e9d(0x7c8);this[_0x292e9d(0x7d5)]=this[_0x292e9d(0x7d5)]||{};if(this[_0x292e9d(0x7d5)][_0x1699fc])return this[_0x292e9d(0x7d5)][_0x1699fc];const _0x958758=VisuMZ[_0x292e9d(0x385)][_0x292e9d(0x2df)][_0x292e9d(0x19d)][_0x292e9d(0x63f)];return this[_0x292e9d(0x565)](_0x1699fc,_0x958758);},ColorManager['hpColor']=function(_0x126984){const _0x21f9d0=_0x3d8147;return VisuMZ[_0x21f9d0(0x385)]['Settings'][_0x21f9d0(0x19d)][_0x21f9d0(0x2d3)][_0x21f9d0(0x3f6)](this,_0x126984);},ColorManager[_0x3d8147(0x6f0)]=function(_0x3f2ad0){const _0x54231e=_0x3d8147;return VisuMZ['CoreEngine'][_0x54231e(0x2df)][_0x54231e(0x19d)][_0x54231e(0x16c)][_0x54231e(0x3f6)](this,_0x3f2ad0);},ColorManager['tpColor']=function(_0x224c05){const _0x5e26a1=_0x3d8147;return VisuMZ[_0x5e26a1(0x385)][_0x5e26a1(0x2df)][_0x5e26a1(0x19d)][_0x5e26a1(0x6f8)]['call'](this,_0x224c05);},ColorManager['paramchangeTextColor']=function(_0x595c83){const _0xa909af=_0x3d8147;return VisuMZ['CoreEngine'][_0xa909af(0x2df)][_0xa909af(0x19d)][_0xa909af(0x510)]['call'](this,_0x595c83);},ColorManager[_0x3d8147(0x272)]=function(_0x535a74){const _0x3d2561=_0x3d8147;return VisuMZ[_0x3d2561(0x385)][_0x3d2561(0x2df)][_0x3d2561(0x19d)][_0x3d2561(0x53d)][_0x3d2561(0x3f6)](this,_0x535a74);},ColorManager[_0x3d8147(0x1c5)]=function(){const _0x3e1910=_0x3d8147;return VisuMZ['CoreEngine']['Settings'][_0x3e1910(0x19d)][_0x3e1910(0x145)];},ColorManager[_0x3d8147(0x180)]=function(){const _0x32d707=_0x3d8147;return VisuMZ[_0x32d707(0x385)][_0x32d707(0x2df)][_0x32d707(0x19d)][_0x32d707(0x281)];},ColorManager[_0x3d8147(0x23c)]=function(){const _0x408bca=_0x3d8147;return VisuMZ[_0x408bca(0x385)][_0x408bca(0x2df)][_0x408bca(0x19d)][_0x408bca(0x648)];},ColorManager['itemBackColor1']=function(){const _0x1faa3c=_0x3d8147;return VisuMZ[_0x1faa3c(0x385)]['Settings'][_0x1faa3c(0x19d)][_0x1faa3c(0x4f3)];},ColorManager[_0x3d8147(0x57f)]=function(){const _0x454143=_0x3d8147;return VisuMZ[_0x454143(0x385)][_0x454143(0x2df)][_0x454143(0x19d)][_0x454143(0x43f)];},SceneManager[_0x3d8147(0x3e1)]=[],VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x7a4)]=SceneManager[_0x3d8147(0x5b9)],SceneManager[_0x3d8147(0x5b9)]=function(){const _0x257454=_0x3d8147;VisuMZ[_0x257454(0x385)][_0x257454(0x7a4)][_0x257454(0x3f6)](this),this[_0x257454(0x22a)]();},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x50b)]=SceneManager['onKeyDown'],SceneManager[_0x3d8147(0x502)]=function(_0x59908e){const _0x4e328f=_0x3d8147;if($gameTemp)this[_0x4e328f(0x698)](_0x59908e);VisuMZ[_0x4e328f(0x385)]['SceneManager_onKeyDown'][_0x4e328f(0x3f6)](this,_0x59908e);},SceneManager['onKeyDownKeysF6F7']=function(_0x2cc473){const _0x2af38e=_0x3d8147;if(!_0x2cc473[_0x2af38e(0x628)]&&!_0x2cc473['altKey'])switch(_0x2cc473[_0x2af38e(0x464)]){case 0x75:this[_0x2af38e(0x343)]();break;case 0x76:this[_0x2af38e(0x448)]();break;}},SceneManager[_0x3d8147(0x343)]=function(){const _0x323103=_0x3d8147;if($gameTemp[_0x323103(0x397)]()&&VisuMZ[_0x323103(0x385)][_0x323103(0x2df)][_0x323103(0x672)][_0x323103(0x209)]){ConfigManager[_0x323103(0x1c3)]!==0x0?(ConfigManager['bgmVolume']=0x0,ConfigManager[_0x323103(0x148)]=0x0,ConfigManager['meVolume']=0x0,ConfigManager[_0x323103(0x1c3)]=0x0):(ConfigManager[_0x323103(0x1da)]=0x64,ConfigManager[_0x323103(0x148)]=0x64,ConfigManager[_0x323103(0x142)]=0x64,ConfigManager[_0x323103(0x1c3)]=0x64);ConfigManager[_0x323103(0x73f)]();if(this[_0x323103(0x588)][_0x323103(0x460)]===Scene_Options){if(this[_0x323103(0x588)][_0x323103(0x7c3)])this['_scene'][_0x323103(0x7c3)][_0x323103(0x718)]();if(this[_0x323103(0x588)][_0x323103(0x63b)])this[_0x323103(0x588)][_0x323103(0x63b)]['refresh']();}}},SceneManager[_0x3d8147(0x448)]=function(){const _0x591ec6=_0x3d8147;if($gameTemp['isPlaytest']()&&VisuMZ[_0x591ec6(0x385)][_0x591ec6(0x2df)]['QoL'][_0x591ec6(0x72b)]){if('uzhtj'!==_0x591ec6(0x645))$gameTemp[_0x591ec6(0x458)]=!$gameTemp[_0x591ec6(0x458)];else{function _0x2dc218(){const _0x190e56=_0x591ec6;_0x3daaa1[_0x190e56(0x578)][_0x190e56(0x313)][_0x190e56(0x3f6)](this),this[_0x190e56(0x188)]();}}}},SceneManager[_0x3d8147(0x22a)]=function(){const _0xd227e2=_0x3d8147;this[_0xd227e2(0x70e)]=![],this[_0xd227e2(0x2f5)]=!VisuMZ[_0xd227e2(0x385)][_0xd227e2(0x2df)]['UI'][_0xd227e2(0x796)];},SceneManager[_0x3d8147(0x797)]=function(_0x5d7fb1){const _0x3edf7b=_0x3d8147;VisuMZ[_0x3edf7b(0x385)][_0x3edf7b(0x2df)]['UI'][_0x3edf7b(0x461)]&&(this[_0x3edf7b(0x70e)]=_0x5d7fb1);},SceneManager[_0x3d8147(0x481)]=function(){return this['_sideButtonLayout'];},SceneManager['areButtonsHidden']=function(){return this['_hideButtons'];},SceneManager[_0x3d8147(0x3ee)]=function(){const _0x37c9d2=_0x3d8147;return this[_0x37c9d2(0x3b6)]()||this[_0x37c9d2(0x481)]();},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x45f)]=SceneManager[_0x3d8147(0x2b8)],SceneManager[_0x3d8147(0x2b8)]=function(){const _0x572f4b=_0x3d8147;if(VisuMZ[_0x572f4b(0x385)][_0x572f4b(0x2df)][_0x572f4b(0x672)][_0x572f4b(0x536)]){if(_0x572f4b(0x415)===_0x572f4b(0x415))return VisuMZ['CoreEngine'][_0x572f4b(0x45f)][_0x572f4b(0x3f6)](this);else{function _0x3d25b5(){this['contents']['fontSize']-=0x6;}}}else{if(_0x572f4b(0x25c)!==_0x572f4b(0x25c)){function _0x3775d1(){const _0x2ec76e=_0x572f4b;this['drawText'](_0x587c14,_0x5d42fb,_0xa04a2a,_0x1e9cc4,_0x2ec76e(0x5eb));}}else return!![];}},SceneManager[_0x3d8147(0x368)]=function(_0x2c7987){const _0x3f263b=_0x3d8147;if(_0x2c7987 instanceof Error)this[_0x3f263b(0x5a6)](_0x2c7987);else{if(_0x2c7987 instanceof Array&&_0x2c7987[0x0]===_0x3f263b(0x1a7)){if(_0x3f263b(0x3d9)==='tzYNh'){function _0x16b1fc(){const _0x51c86e=_0x3f263b;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x51c86e(0x406)](this['_inputSpecialKeyCode']);}}else this[_0x3f263b(0x788)](_0x2c7987);}else this[_0x3f263b(0x6f6)](_0x2c7987);}this['stop']();},VisuMZ['CoreEngine'][_0x3d8147(0x3cd)]=BattleManager[_0x3d8147(0x5d5)],BattleManager['processEscape']=function(){const _0x52a4fe=_0x3d8147;if(VisuMZ[_0x52a4fe(0x385)][_0x52a4fe(0x2df)][_0x52a4fe(0x672)][_0x52a4fe(0x4eb)])this['processAlwaysEscape']();else{if(_0x52a4fe(0x745)===_0x52a4fe(0x745))return VisuMZ[_0x52a4fe(0x385)][_0x52a4fe(0x3cd)][_0x52a4fe(0x3f6)](this);else{function _0x427413(){this['playCursorSound']();}}}},BattleManager['processAlwaysEscape']=function(){const _0x572ccc=_0x3d8147;return $gameParty[_0x572ccc(0x1d7)](),SoundManager[_0x572ccc(0x7bd)](),this[_0x572ccc(0x60f)](),!![];},BattleManager['isTpb']=function(){return $gameSystem['getBattleSystem']()>=0x1;},BattleManager[_0x3d8147(0x30e)]=function(){const _0xcd9fc1=_0x3d8147;return $gameSystem[_0xcd9fc1(0x3a0)]()===0x1;},VisuMZ['CoreEngine'][_0x3d8147(0x39b)]=Game_Temp[_0x3d8147(0x578)][_0x3d8147(0x5b9)],Game_Temp[_0x3d8147(0x578)][_0x3d8147(0x5b9)]=function(){const _0x4b36cc=_0x3d8147;VisuMZ[_0x4b36cc(0x385)]['Game_Temp_initialize'][_0x4b36cc(0x3f6)](this),this['forceOutOfPlaytest'](),this[_0x4b36cc(0x62a)]();},Game_Temp[_0x3d8147(0x578)][_0x3d8147(0x6c6)]=function(){const _0x585b3f=_0x3d8147;VisuMZ[_0x585b3f(0x385)][_0x585b3f(0x2df)][_0x585b3f(0x672)][_0x585b3f(0x5fc)]&&(this[_0x585b3f(0x32f)]=![]);},Game_Temp[_0x3d8147(0x578)][_0x3d8147(0x62a)]=function(){this['_fauxAnimationQueue']=[];},Game_Temp[_0x3d8147(0x578)][_0x3d8147(0x139)]=function(_0x4c2ce5,_0x2a4f79,_0x557bab,_0x1edee8){const _0x4593bb=_0x3d8147;if(!this[_0x4593bb(0x384)]())return;_0x557bab=_0x557bab||![],_0x1edee8=_0x1edee8||![];if($dataAnimations[_0x2a4f79]){const _0x3ee5ff={'targets':_0x4c2ce5,'animationId':_0x2a4f79,'mirror':_0x557bab,'mute':_0x1edee8};this['_fauxAnimationQueue'][_0x4593bb(0x58a)](_0x3ee5ff);for(const _0x13214f of _0x4c2ce5){if(_0x4593bb(0x268)===_0x4593bb(0x268))_0x13214f[_0x4593bb(0x362)]&&_0x13214f[_0x4593bb(0x362)]();else{function _0x19732c(){const _0x37a4a3=_0x4593bb;!_0x5d197e[_0x37a4a3(0x1ee)]()&&!this[_0x37a4a3(0x416)]&&!_0x47331e['isBusy']()&&(this[_0x37a4a3(0x416)]=!![],this[_0x37a4a3(0x50c)](),_0x2f984f[_0x37a4a3(0x1c2)](),this[_0x37a4a3(0x416)]=![]);}}}}},Game_Temp[_0x3d8147(0x578)][_0x3d8147(0x384)]=function(){return!![];},Game_Temp['prototype'][_0x3d8147(0x751)]=function(){const _0x5485ae=_0x3d8147;return this[_0x5485ae(0x225)]['shift']();},Game_Temp[_0x3d8147(0x578)][_0x3d8147(0x74d)]=function(_0x322502){const _0x53034d=_0x3d8147;this[_0x53034d(0x2c9)]=_0x322502;},Game_Temp[_0x3d8147(0x578)][_0x3d8147(0x67a)]=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp['prototype'][_0x3d8147(0x6cc)]=function(){const _0x36f628=_0x3d8147;this[_0x36f628(0x65f)]=undefined,this[_0x36f628(0x7b8)]=undefined;},Game_Temp['prototype'][_0x3d8147(0x5e1)]=function(_0x58d801){const _0x44875a=_0x3d8147;if($gameMap&&$dataMap&&$dataMap[_0x44875a(0x297)]){if(_0x44875a(0x607)!==_0x44875a(0x607)){function _0x32b09f(){const _0x367346=_0x44875a;return _0x2898ac[_0x367346(0x385)][_0x367346(0x658)][_0x59f991];}}else this['parseForcedGameTroopSettingsCoreEngine']($dataMap[_0x44875a(0x297)]);}const _0x3d0127=$dataTroops[_0x58d801];if(_0x3d0127){if(_0x44875a(0x3c4)===_0x44875a(0x58b)){function _0x3296ff(){const _0x1e7a24=_0x44875a;if(_0x1457fb[_0x1e7a24(0x397)]())_0x1ae147['log'](_0x37a09d);}}else this[_0x44875a(0x69e)](_0x3d0127[_0x44875a(0x665)]);}},Game_Temp[_0x3d8147(0x578)][_0x3d8147(0x69e)]=function(_0x2c03b2){const _0x44a464=_0x3d8147;if(!_0x2c03b2)return;if(_0x2c03b2[_0x44a464(0x143)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x44a464(0x65f)]='FV';else{if(_0x2c03b2[_0x44a464(0x143)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this['_forcedTroopView']='SV';else{if(_0x2c03b2[_0x44a464(0x143)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x5cb605=String(RegExp['$1']);if(_0x5cb605['match'](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this['_forcedTroopView']='FV';else _0x5cb605[_0x44a464(0x143)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x44a464(0x65f)]='SV');}}}if(_0x2c03b2[_0x44a464(0x143)](/<(?:DTB)>/i)){if(_0x44a464(0x22e)==='bTFWW'){function _0x28d63c(){const _0xfb441e=_0x44a464,_0x2c58f5='_stored_expGaugeColor2';this['_colorCache']=this[_0xfb441e(0x7d5)]||{};if(this[_0xfb441e(0x7d5)][_0x2c58f5])return this[_0xfb441e(0x7d5)][_0x2c58f5];const _0x17b702=_0x321724[_0xfb441e(0x385)][_0xfb441e(0x2df)]['Color'][_0xfb441e(0x13f)];return this[_0xfb441e(0x565)](_0x2c58f5,_0x17b702);}}else this[_0x44a464(0x7b8)]=0x0;}else{if(_0x2c03b2[_0x44a464(0x143)](/<(?:TPB|ATB)[ ]ACTIVE>/i)){if('fKucc'!=='QsiZJ')this[_0x44a464(0x7b8)]=0x1;else{function _0x387da4(){const _0x2e2e77=_0x44a464,_0x5cfcb3=_0x2beee3['y']+(this['lineHeight']()-_0x3b9b0b['iconHeight'])/0x2;this[_0x2e2e77(0x35e)](_0x33f0a2,_0x2766cb['x'],_0x5cfcb3);const _0xd78b70=_0x249c79['iconWidth']+0x4;_0x55ffd5['x']+=_0xd78b70,_0x1b7214['width']-=_0xd78b70;}}}else{if(_0x2c03b2[_0x44a464(0x143)](/<(?:TPB|ATB)[ ]WAIT>/i)){if('aqyMl'!=='Dtznn')this[_0x44a464(0x7b8)]=0x2;else{function _0xe535fe(){const _0x5876c0=_0x44a464;_0x4c9d91[_0x5876c0(0x484)](_0x473a4a,_0x1e9267);const _0x8d265c=_0x2b5b72[_0x5876c0(0x5a0)];_0x5467fe[_0x5876c0(0x4ad)](_0x8d265c);}}}else{if(_0x2c03b2[_0x44a464(0x143)](/<(?:CTB)>/i)){if(_0x44a464(0x443)!=='fkzXO'){if(Imported[_0x44a464(0x64a)]){if(_0x44a464(0x24a)!==_0x44a464(0x78e))this[_0x44a464(0x7b8)]=_0x44a464(0x1dd);else{function _0x27c6d3(){const _0x1691a9=_0x44a464;_0x1272f9[_0x1691a9(0x385)][_0x1691a9(0x1b8)][_0x1691a9(0x3f6)](this),this[_0x1691a9(0x157)]();}}}}else{function _0x4c32e3(){const _0x4166e4=_0x44a464;this[_0x4166e4(0x3f2)]([_0x445888],_0xed7d4e,_0x2ec901,_0x3a89f1,_0x2b1c84),_0x5f1961+=_0x57d87d;}}}else{if(_0x2c03b2[_0x44a464(0x143)](/<(?:STB)>/i)){if(Imported['VisuMZ_2_BattleSystemSTB']){if(_0x44a464(0x16e)==='jCsVh'){function _0x552c1c(){const _0x3c39eb=_0x44a464;if(!this[_0x3c39eb(0x384)]())return;_0x46dae6=_0x15ec1f||![],_0xc622c7=_0x4896cb||![];if(_0x1a5102[_0x128483]){const _0x433f56={'targets':_0xfdfb6,'animationId':_0x11bb5e,'mirror':_0x4022e1,'mute':_0x44977d};this[_0x3c39eb(0x225)][_0x3c39eb(0x58a)](_0x433f56);for(const _0x5082b9 of _0x1eb81c){_0x5082b9['startAnimation']&&_0x5082b9['startAnimation']();}}}}else this[_0x44a464(0x7b8)]='STB';}}else{if(_0x2c03b2['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x6b353e=String(RegExp['$1']);if(_0x6b353e[_0x44a464(0x143)](/DTB/i)){if(_0x44a464(0x1b0)===_0x44a464(0x29f)){function _0x434c5b(){const _0x396bc9=_0x44a464;_0x163d38['log'](_0x396bc9(0x38d)),_0x5a9f43[_0x396bc9(0x694)](_0xd9a91e);}}else this[_0x44a464(0x7b8)]=0x0;}else{if(_0x6b353e[_0x44a464(0x143)](/(?:TPB|ATB)[ ]ACTIVE/i))this['_forcedBattleSys']=0x1;else{if(_0x6b353e['match'](/(?:TPB|ATB)[ ]WAIT/i))this[_0x44a464(0x7b8)]=0x2;else{if(_0x6b353e[_0x44a464(0x143)](/CTB/i))Imported[_0x44a464(0x64a)]&&(this[_0x44a464(0x7b8)]=_0x44a464(0x1dd));else _0x6b353e['match'](/STB/i)&&(Imported['VisuMZ_2_BattleSystemSTB']&&(this[_0x44a464(0x7b8)]=_0x44a464(0x508)));}}}}}}}}}},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x32e)]=Game_System[_0x3d8147(0x578)][_0x3d8147(0x5b9)],Game_System['prototype'][_0x3d8147(0x5b9)]=function(){const _0x43a0ca=_0x3d8147;VisuMZ[_0x43a0ca(0x385)][_0x43a0ca(0x32e)][_0x43a0ca(0x3f6)](this),this['initCoreEngine']();},Game_System['prototype'][_0x3d8147(0x7a0)]=function(){const _0x4cdcf4=_0x3d8147;this[_0x4cdcf4(0x295)]={'SideView':$dataSystem[_0x4cdcf4(0x7ac)],'BattleSystem':this['initialBattleSystem'](),'FontSize':$dataSystem['advanced'][_0x4cdcf4(0x767)],'Padding':0xc};},Game_System[_0x3d8147(0x578)][_0x3d8147(0x53b)]=function(){const _0x549921=_0x3d8147;if($gameTemp[_0x549921(0x65f)]==='SV'){if(_0x549921(0x71c)===_0x549921(0x71c))return!![];else{function _0x516993(){const _0x3abfac=_0x549921;this[_0x3abfac(0x718)](),_0x4c4683[_0x3abfac(0x2be)](),this['_mode']==='default'?this[_0x3abfac(0x501)](0x0):this[_0x3abfac(0x501)](-0x1);}}}else{if($gameTemp[_0x549921(0x65f)]==='FV')return![];}if(this[_0x549921(0x295)]===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings']['SideView']===undefined)this[_0x549921(0x7a0)]();return this[_0x549921(0x295)][_0x549921(0x3fd)];},Game_System[_0x3d8147(0x578)][_0x3d8147(0x704)]=function(_0x409028){const _0x5259e8=_0x3d8147;if(this[_0x5259e8(0x295)]===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings'][_0x5259e8(0x3fd)]===undefined)this['initCoreEngine']();this[_0x5259e8(0x295)]['SideView']=_0x409028;},Game_System['prototype'][_0x3d8147(0x76d)]=function(){const _0x3409c3=_0x3d8147;if(this[_0x3409c3(0x295)]===undefined)this[_0x3409c3(0x7a0)]();this[_0x3409c3(0x295)]['BattleSystem']=this[_0x3409c3(0x2d4)]();},Game_System[_0x3d8147(0x578)]['initialBattleSystem']=function(){const _0x4f4373=_0x3d8147,_0x2ee85c=(VisuMZ['CoreEngine'][_0x4f4373(0x2df)][_0x4f4373(0x602)]||_0x4f4373(0x5cc))[_0x4f4373(0x7bb)]()[_0x4f4373(0x34a)]();return VisuMZ[_0x4f4373(0x385)][_0x4f4373(0x490)](_0x2ee85c);},Game_System['prototype']['getBattleSystem']=function(){const _0x506853=_0x3d8147;if($gameTemp[_0x506853(0x7b8)]!==undefined)return $gameTemp['_forcedBattleSys'];if(this[_0x506853(0x295)]===undefined)this[_0x506853(0x7a0)]();if(this['_CoreEngineSettings'][_0x506853(0x602)]===undefined)this[_0x506853(0x76d)]();return this[_0x506853(0x295)][_0x506853(0x602)];},Game_System[_0x3d8147(0x578)][_0x3d8147(0x5e0)]=function(_0x13a035){const _0x1ed45e=_0x3d8147;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x1ed45e(0x295)][_0x1ed45e(0x602)]===undefined)this[_0x1ed45e(0x76d)]();this['_CoreEngineSettings']['BattleSystem']=_0x13a035;},Game_System[_0x3d8147(0x578)]['mainFontSize']=function(){const _0x10f7a4=_0x3d8147;if(this[_0x10f7a4(0x295)]===undefined)this[_0x10f7a4(0x7a0)]();if(this[_0x10f7a4(0x295)][_0x10f7a4(0x769)]===undefined)this[_0x10f7a4(0x7a0)]();return this[_0x10f7a4(0x295)][_0x10f7a4(0x769)];},Game_System[_0x3d8147(0x578)][_0x3d8147(0x471)]=function(_0x4f2773){const _0x43ae63=_0x3d8147;if(this[_0x43ae63(0x295)]===undefined)this[_0x43ae63(0x7a0)]();if(this[_0x43ae63(0x295)][_0x43ae63(0x525)]===undefined)this[_0x43ae63(0x7a0)]();this['_CoreEngineSettings'][_0x43ae63(0x769)]=_0x4f2773;},Game_System['prototype'][_0x3d8147(0x32a)]=function(){const _0x4b0d45=_0x3d8147;if(this[_0x4b0d45(0x295)]===undefined)this['initCoreEngine']();if(this[_0x4b0d45(0x295)][_0x4b0d45(0x167)]===undefined)this['initCoreEngine']();return this[_0x4b0d45(0x295)][_0x4b0d45(0x167)];},Game_System[_0x3d8147(0x578)][_0x3d8147(0x32c)]=function(_0x497603){const _0xe51981=_0x3d8147;if(this['_CoreEngineSettings']===undefined)this[_0xe51981(0x7a0)]();if(this['_CoreEngineSettings'][_0xe51981(0x525)]===undefined)this[_0xe51981(0x7a0)]();this[_0xe51981(0x295)][_0xe51981(0x167)]=_0x497603;},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x282)]=Game_Screen['prototype'][_0x3d8147(0x5b9)],Game_Screen['prototype']['initialize']=function(){const _0x259d36=_0x3d8147;VisuMZ[_0x259d36(0x385)][_0x259d36(0x282)][_0x259d36(0x3f6)](this),this[_0x259d36(0x7d0)]();},Game_Screen[_0x3d8147(0x578)]['initCoreEngineScreenShake']=function(){const _0x1c9218=_0x3d8147,_0x2355f9=VisuMZ[_0x1c9218(0x385)][_0x1c9218(0x2df)]['ScreenShake'];this['_coreEngineShakeStyle']=_0x2355f9?.[_0x1c9218(0x6f7)]||_0x1c9218(0x7d4);},Game_Screen['prototype']['getCoreEngineScreenShakeStyle']=function(){const _0x654a56=_0x3d8147;if(this[_0x654a56(0x4b2)]===undefined)this[_0x654a56(0x7d0)]();return this[_0x654a56(0x4b2)];},Game_Screen[_0x3d8147(0x578)][_0x3d8147(0x178)]=function(_0x2725d1){const _0x56beb2=_0x3d8147;if(this[_0x56beb2(0x4b2)]===undefined)this['initCoreEngineScreenShake']();this['_coreEngineShakeStyle']=_0x2725d1['toLowerCase']()[_0x56beb2(0x34a)]();},Game_Picture[_0x3d8147(0x578)][_0x3d8147(0x555)]=function(){const _0x506cae=_0x3d8147;if($gameParty[_0x506cae(0x170)]())return![];return this['name']()&&this[_0x506cae(0x665)]()['charAt'](0x0)==='!';},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x392)]=Game_Picture[_0x3d8147(0x578)]['x'],Game_Picture[_0x3d8147(0x578)]['x']=function(){const _0x3ed7a0=_0x3d8147;if(this[_0x3ed7a0(0x555)]())return this[_0x3ed7a0(0x46f)]();else{if(_0x3ed7a0(0x1cd)!==_0x3ed7a0(0x1cd)){function _0x53beaf(){const _0x44b021=_0x3ed7a0;_0x5b2168['CoreEngine'][_0x44b021(0x72f)][_0x44b021(0x3f6)](this),this['setCoreEngineUpdateWindowBg']();}}else return VisuMZ[_0x3ed7a0(0x385)]['Game_Picture_x'][_0x3ed7a0(0x3f6)](this);}},Game_Picture[_0x3d8147(0x578)][_0x3d8147(0x46f)]=function(){const _0x2e8b9b=_0x3d8147,_0x38ecd7=$gameMap[_0x2e8b9b(0x26f)]()*$gameMap['tileWidth']();return this['_x']-_0x38ecd7;},VisuMZ['CoreEngine'][_0x3d8147(0x5e6)]=Game_Picture[_0x3d8147(0x578)]['y'],Game_Picture[_0x3d8147(0x578)]['y']=function(){const _0x11bd8c=_0x3d8147;if(this[_0x11bd8c(0x555)]()){if(_0x11bd8c(0x5c0)===_0x11bd8c(0x18a)){function _0x5b978a(){const _0x4b9dcf=_0x11bd8c;this['_colorCache'][_0x5bb359]=_0x4b9dcf(0x780)['format'](_0x237eec(_0x50fce4['$1']));}}else return this[_0x11bd8c(0x317)]();}else{if(_0x11bd8c(0x5b1)!==_0x11bd8c(0x5b1)){function _0x495456(){const _0x3b3733=_0x11bd8c,_0x5978e2=_0x3b3733(0x6fe);this[_0x3b3733(0x7d5)]=this[_0x3b3733(0x7d5)]||{};if(this[_0x3b3733(0x7d5)][_0x5978e2])return this[_0x3b3733(0x7d5)][_0x5978e2];const _0x1e80c8=_0x37dbe5[_0x3b3733(0x385)]['Settings'][_0x3b3733(0x19d)][_0x3b3733(0x596)];return this[_0x3b3733(0x565)](_0x5978e2,_0x1e80c8);}}else return VisuMZ['CoreEngine']['Game_Picture_y']['call'](this);}},Game_Picture[_0x3d8147(0x578)][_0x3d8147(0x317)]=function(){const _0x12ec6f=_0x3d8147,_0x3a2cd1=$gameMap[_0x12ec6f(0x465)]()*$gameMap[_0x12ec6f(0x600)]();return this['_y']-_0x3a2cd1;},Game_Picture[_0x3d8147(0x578)][_0x3d8147(0x174)]=function(_0x5be571){const _0x1201ed=_0x3d8147;this[_0x1201ed(0x1f4)]=_0x5be571;},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x749)]=Game_Picture[_0x3d8147(0x578)][_0x3d8147(0x6a3)],Game_Picture[_0x3d8147(0x578)][_0x3d8147(0x6a3)]=function(_0x13aa76){const _0x5a04f9=_0x3d8147;return this['_coreEasingType']=this[_0x5a04f9(0x1f4)]||0x0,[0x0,0x1,0x2,0x3]['includes'](this[_0x5a04f9(0x1f4)])?VisuMZ[_0x5a04f9(0x385)][_0x5a04f9(0x749)][_0x5a04f9(0x3f6)](this,_0x13aa76):VisuMZ[_0x5a04f9(0x427)](_0x13aa76,this[_0x5a04f9(0x1f4)]);},VisuMZ[_0x3d8147(0x385)]['Game_Action_itemHit']=Game_Action['prototype']['itemHit'],Game_Action[_0x3d8147(0x578)][_0x3d8147(0x60d)]=function(_0x95f9be){const _0xb06203=_0x3d8147;if(VisuMZ[_0xb06203(0x385)][_0xb06203(0x2df)][_0xb06203(0x672)][_0xb06203(0x592)]){if('iJeTb'!==_0xb06203(0x59b))return this[_0xb06203(0x3ae)](_0x95f9be);else{function _0x5fcb(){const _0x48a163=_0xb06203;_0x38cbf7[_0x48a163(0x385)]['Scene_Battle_update'][_0x48a163(0x3f6)](this);if(_0x20c7e9['_playTestFastMode'])this[_0x48a163(0x4e0)]();}}}else{if(_0xb06203(0x4d8)!==_0xb06203(0x4d8)){function _0x5817e8(){const _0x48be1f=_0xb06203;_0x14d879['CoreEngine'][_0x48be1f(0x1a3)][_0x48be1f(0x3f6)](this);}}else return VisuMZ[_0xb06203(0x385)][_0xb06203(0x71e)][_0xb06203(0x3f6)](this,_0x95f9be);}},Game_Action[_0x3d8147(0x578)][_0x3d8147(0x3ae)]=function(_0x888ab5){const _0x24a485=this['itemSuccessRate'](_0x888ab5),_0x5cedab=this['subjectHitRate'](_0x888ab5),_0x345e72=this['targetEvaRate'](_0x888ab5);return _0x24a485*(_0x5cedab-_0x345e72);},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x3ed)]=Game_Action[_0x3d8147(0x578)][_0x3d8147(0x39a)],Game_Action[_0x3d8147(0x578)][_0x3d8147(0x39a)]=function(_0x32dc6d){const _0x3827e=_0x3d8147;if(VisuMZ[_0x3827e(0x385)][_0x3827e(0x2df)]['QoL'][_0x3827e(0x592)]){if(_0x3827e(0x515)!==_0x3827e(0x388))return 0x0;else{function _0x2354a5(){return _0x1b05f0(_0x389ab2)['toLocaleString'](_0x2a849a,_0x34987e)+'.';}}}else return VisuMZ['CoreEngine'][_0x3827e(0x3ed)][_0x3827e(0x3f6)](this,_0x32dc6d);},Game_Action['prototype'][_0x3d8147(0x263)]=function(_0xc36e23){const _0x49645b=_0x3d8147;return this[_0x49645b(0x655)]()['successRate']*0.01;},Game_Action[_0x3d8147(0x578)][_0x3d8147(0x44b)]=function(_0x1f97ba){const _0x14ffed=_0x3d8147;if(VisuMZ[_0x14ffed(0x385)][_0x14ffed(0x2df)]['QoL'][_0x14ffed(0x5a5)]&&this['isItem']())return 0x1;if(this[_0x14ffed(0x643)]()){if(VisuMZ[_0x14ffed(0x385)][_0x14ffed(0x2df)]['QoL'][_0x14ffed(0x5a5)]&&this[_0x14ffed(0x48f)]()['isActor']()){if(_0x14ffed(0x151)==='UAymF')return this[_0x14ffed(0x48f)]()[_0x14ffed(0x31e)]+0.05;else{function _0x1df900(){const _0x8829ce=_0x14ffed,_0x46ef09=_0x2b55fd['boxWidth'],_0x4d4895=_0x2582bc[_0x8829ce(0x578)][_0x8829ce(0x244)](),_0x5d1be9=0x0;let _0x52a5f3=0x0;return this[_0x8829ce(0x352)]()===_0x8829ce(0x42b)?_0x52a5f3=0x0:_0x52a5f3=_0x40d2c4['boxHeight']-_0x4d4895,new _0x7802a9(_0x5d1be9,_0x52a5f3,_0x46ef09,_0x4d4895);}}}else return this[_0x14ffed(0x48f)]()[_0x14ffed(0x31e)];}else return 0x1;},Game_Action[_0x3d8147(0x578)][_0x3d8147(0x457)]=function(_0xb052de){const _0x297893=_0x3d8147;if(this['subject']()[_0x297893(0x205)]()===_0xb052de[_0x297893(0x205)]())return 0x0;if(this['isPhysical']()){if(VisuMZ['CoreEngine'][_0x297893(0x2df)][_0x297893(0x672)][_0x297893(0x5a5)]&&_0xb052de['isEnemy']()){if(_0x297893(0x323)!==_0x297893(0x71f))return _0xb052de[_0x297893(0x620)]-0.05;else{function _0xf7921(){_0x36948a+=_0x1e8ac5(_0x4926e3);}}}else return _0xb052de[_0x297893(0x620)];}else return this['isMagical']()?_0xb052de['mev']:0x0;},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x6aa)]=Game_Action[_0x3d8147(0x578)][_0x3d8147(0x2d9)],Game_Action[_0x3d8147(0x578)][_0x3d8147(0x2d9)]=function(_0x5f49f2){const _0x294f30=_0x3d8147;VisuMZ[_0x294f30(0x385)]['Game_Action_updateLastTarget'][_0x294f30(0x3f6)](this,_0x5f49f2);if(VisuMZ[_0x294f30(0x385)]['Settings'][_0x294f30(0x672)][_0x294f30(0x592)])return;const _0x5633f0=_0x5f49f2[_0x294f30(0x33a)]();_0x5633f0[_0x294f30(0x724)]&&(0x1-this[_0x294f30(0x39a)](_0x5f49f2)>this['itemHit'](_0x5f49f2)&&(_0x5633f0[_0x294f30(0x724)]=![],_0x5633f0[_0x294f30(0x646)]=!![]));},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x5a8)]=Game_BattlerBase['prototype']['initMembers'],Game_BattlerBase['prototype']['initMembers']=function(){const _0x2a215b=_0x3d8147;this[_0x2a215b(0x63d)]={},VisuMZ[_0x2a215b(0x385)][_0x2a215b(0x5a8)]['call'](this);},VisuMZ[_0x3d8147(0x385)]['Game_BattlerBase_refresh']=Game_BattlerBase[_0x3d8147(0x578)][_0x3d8147(0x718)],Game_BattlerBase[_0x3d8147(0x578)][_0x3d8147(0x718)]=function(){const _0x44153c=_0x3d8147;this[_0x44153c(0x63d)]={},VisuMZ[_0x44153c(0x385)][_0x44153c(0x2fe)][_0x44153c(0x3f6)](this);},Game_BattlerBase[_0x3d8147(0x578)]['checkCacheKey']=function(_0x515827){const _0x4c2295=_0x3d8147;return this[_0x4c2295(0x63d)]=this['_cache']||{},this['_cache'][_0x515827]!==undefined;},Game_BattlerBase[_0x3d8147(0x578)][_0x3d8147(0x582)]=function(_0xd2f8d){const _0x3840a2=_0x3d8147,_0x267671=(_0x4af74d,_0x16a7d6)=>{const _0x2ce935=_0x4916;if(!_0x16a7d6)return _0x4af74d;if(_0x16a7d6[_0x2ce935(0x297)]['match'](VisuMZ[_0x2ce935(0x385)][_0x2ce935(0x2a1)][_0x2ce935(0x582)][_0xd2f8d])){if(_0x2ce935(0x70b)!=='hkIja'){var _0x5de7ba=Number(RegExp['$1']);_0x4af74d+=_0x5de7ba;}else{function _0x33c8f2(){const _0x12ea04=_0x2ce935;return _0x2b0506[_0x12ea04(0x385)][_0x12ea04(0x2df)][_0x12ea04(0x672)][_0x12ea04(0x592)]?this[_0x12ea04(0x3ae)](_0x5f32da):_0x426a70[_0x12ea04(0x385)][_0x12ea04(0x71e)][_0x12ea04(0x3f6)](this,_0x4c57a2);}}}if(_0x16a7d6['note'][_0x2ce935(0x143)](VisuMZ[_0x2ce935(0x385)][_0x2ce935(0x2a1)][_0x2ce935(0x18f)][_0xd2f8d])){var _0x352542=String(RegExp['$1']);try{if(_0x2ce935(0x30d)===_0x2ce935(0x207)){function _0x113938(){const _0x1ea8fe=_0x2ce935;for(const _0x122c77 of this[_0x1ea8fe(0x5c3)]){this['removeFauxAnimation'](_0x122c77);}}}else _0x4af74d+=eval(_0x352542);}catch(_0x1577a6){if(_0x2ce935(0x17f)!=='NRvrr'){if($gameTemp[_0x2ce935(0x397)]())console['log'](_0x1577a6);}else{function _0x54b457(){const _0x164f98=_0x2ce935;this[_0x164f98(0x1f0)]()?this[_0x164f98(0x7af)]():_0x4dfeae['CoreEngine'][_0x164f98(0x44d)]['call'](this);}}}}return _0x4af74d;};return this[_0x3840a2(0x635)]()[_0x3840a2(0x2f0)](_0x267671,this[_0x3840a2(0x366)][_0xd2f8d]);},Game_BattlerBase[_0x3d8147(0x578)][_0x3d8147(0x69a)]=function(_0x5bd50d){const _0x1205ac=_0x3d8147;var _0x528284=_0x1205ac(0x747)+(this[_0x1205ac(0x205)]()?'Actor':_0x1205ac(0x1ac))+_0x1205ac(0x686)+_0x5bd50d;if(this['checkCacheKey'](_0x528284))return this['_cache'][_0x528284];this[_0x1205ac(0x63d)][_0x528284]=eval(VisuMZ['CoreEngine']['Settings'][_0x1205ac(0x641)][_0x528284]);const _0x460c1c=(_0x5bc7ab,_0x32123d)=>{const _0x17781e=_0x1205ac;if(!_0x32123d)return _0x5bc7ab;if(_0x32123d[_0x17781e(0x297)][_0x17781e(0x143)](VisuMZ['CoreEngine']['RegExp'][_0x17781e(0x69a)][_0x5bd50d])){if(_0x17781e(0x433)!==_0x17781e(0x433)){function _0x1a86c8(){const _0x425f22=_0x17781e;_0x5b4945+=_0x425f22(0x3eb);}}else{var _0x3361e2=Number(RegExp['$1']);if(_0x3361e2===0x0)_0x3361e2=Number[_0x17781e(0x527)];_0x5bc7ab=Math[_0x17781e(0x19b)](_0x5bc7ab,_0x3361e2);}}if(_0x32123d[_0x17781e(0x297)][_0x17781e(0x143)](VisuMZ[_0x17781e(0x385)][_0x17781e(0x2a1)][_0x17781e(0x246)][_0x5bd50d])){if(_0x17781e(0x591)!==_0x17781e(0x431)){var _0x160d64=String(RegExp['$1']);try{_0x5bc7ab=Math[_0x17781e(0x19b)](_0x5bc7ab,Number(eval(_0x160d64)));}catch(_0x13aa5a){if($gameTemp[_0x17781e(0x397)]())console[_0x17781e(0x694)](_0x13aa5a);}}else{function _0x1c1eb3(){const _0x195995=_0x17781e;_0x6dd2c8['CoreEngine']['Spriteset_Base_update'][_0x195995(0x3f6)](this),this['updatePictureAntiZoom'](),this[_0x195995(0x20c)]();}}}return _0x5bc7ab;};if(this[_0x1205ac(0x63d)][_0x528284]===0x0)this[_0x1205ac(0x63d)][_0x528284]=Number[_0x1205ac(0x527)];return this[_0x1205ac(0x63d)][_0x528284]=this['traitObjects']()[_0x1205ac(0x2f0)](_0x460c1c,this[_0x1205ac(0x63d)][_0x528284]),this['_cache'][_0x528284];},Game_BattlerBase['prototype']['paramRate']=function(_0x495de7){const _0x217ac5=_0x3d8147,_0x5c627d=this[_0x217ac5(0x187)](Game_BattlerBase[_0x217ac5(0x3b7)],_0x495de7),_0x366a51=(_0x4f9970,_0x1d1084)=>{const _0x386af8=_0x217ac5;if(!_0x1d1084)return _0x4f9970;if(_0x1d1084[_0x386af8(0x297)][_0x386af8(0x143)](VisuMZ[_0x386af8(0x385)][_0x386af8(0x2a1)][_0x386af8(0x340)][_0x495de7])){var _0x8f8bf5=Number(RegExp['$1'])/0x64;_0x4f9970*=_0x8f8bf5;}if(_0x1d1084['note'][_0x386af8(0x143)](VisuMZ[_0x386af8(0x385)][_0x386af8(0x2a1)]['paramRate2'][_0x495de7])){var _0x8f8bf5=Number(RegExp['$1']);_0x4f9970*=_0x8f8bf5;}if(_0x1d1084[_0x386af8(0x297)][_0x386af8(0x143)](VisuMZ[_0x386af8(0x385)][_0x386af8(0x2a1)][_0x386af8(0x449)][_0x495de7])){if(_0x386af8(0x391)!=='RyGKb'){var _0x506cb5=String(RegExp['$1']);try{_0x4f9970*=eval(_0x506cb5);}catch(_0x3e520a){if($gameTemp['isPlaytest']())console[_0x386af8(0x694)](_0x3e520a);}}else{function _0x5e6ebc(){const _0x1f5134=_0x386af8;return _0x5a6f8f[_0x1f5134(0x385)]['Game_Event_isCollidedWithEvents']['call'](this,_0x2d541b,_0x59f9fc);}}}return _0x4f9970;};return this[_0x217ac5(0x635)]()[_0x217ac5(0x2f0)](_0x366a51,_0x5c627d);},Game_BattlerBase['prototype'][_0x3d8147(0x480)]=function(_0x1bbc3b){const _0x57036f=_0x3d8147,_0x54b97b=(_0x1be5b1,_0xc6fdac)=>{const _0x2c45a4=_0x4916;if(!_0xc6fdac)return _0x1be5b1;if(_0xc6fdac[_0x2c45a4(0x297)][_0x2c45a4(0x143)](VisuMZ[_0x2c45a4(0x385)]['RegExp'][_0x2c45a4(0x65c)][_0x1bbc3b])){if(_0x2c45a4(0x329)==='SMnrb'){var _0x242222=Number(RegExp['$1']);_0x1be5b1+=_0x242222;}else{function _0x445031(){const _0x4de677=_0x2c45a4;return _0x5ef721[_0x4de677(0x385)]['Settings']['QoL']['DigitGroupingGaugeSprites'];}}}if(_0xc6fdac[_0x2c45a4(0x297)][_0x2c45a4(0x143)](VisuMZ[_0x2c45a4(0x385)][_0x2c45a4(0x2a1)][_0x2c45a4(0x594)][_0x1bbc3b])){if('uKBaB'==='ZfDNj'){function _0x39f587(){const _0x4431b1=_0x2c45a4;this['bitmap'][_0x4431b1(0x734)]();}}else{var _0x46f052=String(RegExp['$1']);try{_0x1be5b1+=eval(_0x46f052);}catch(_0x3a2647){if($gameTemp[_0x2c45a4(0x397)]())console['log'](_0x3a2647);}}}return _0x1be5b1;};return this[_0x57036f(0x635)]()['reduce'](_0x54b97b,0x0);},Game_BattlerBase[_0x3d8147(0x578)][_0x3d8147(0x34c)]=function(_0x2f22d0){const _0x100b60=_0x3d8147;let _0x2ad6d0=_0x100b60(0x34c)+_0x2f22d0+_0x100b60(0x661);if(this[_0x100b60(0x1ff)](_0x2ad6d0))return this[_0x100b60(0x63d)][_0x2ad6d0];return this[_0x100b60(0x63d)][_0x2ad6d0]=Math[_0x100b60(0x687)](VisuMZ[_0x100b60(0x385)][_0x100b60(0x2df)]['Param'][_0x100b60(0x327)][_0x100b60(0x3f6)](this,_0x2f22d0)),this[_0x100b60(0x63d)][_0x2ad6d0];},Game_BattlerBase[_0x3d8147(0x578)][_0x3d8147(0x1af)]=function(_0x1046a9){const _0x23ce0d=_0x3d8147,_0x4f8ff3=(_0x45296e,_0x4a494b)=>{const _0x15200b=_0x4916;if(_0x15200b(0x4f1)==='NFVBB'){if(!_0x4a494b)return _0x45296e;if(_0x4a494b[_0x15200b(0x297)][_0x15200b(0x143)](VisuMZ[_0x15200b(0x385)][_0x15200b(0x2a1)][_0x15200b(0x4ec)][_0x1046a9])){var _0x1eddfc=Number(RegExp['$1'])/0x64;_0x45296e+=_0x1eddfc;}if(_0x4a494b[_0x15200b(0x297)][_0x15200b(0x143)](VisuMZ['CoreEngine']['RegExp'][_0x15200b(0x29d)][_0x1046a9])){var _0x1eddfc=Number(RegExp['$1']);_0x45296e+=_0x1eddfc;}if(_0x4a494b[_0x15200b(0x297)][_0x15200b(0x143)](VisuMZ[_0x15200b(0x385)][_0x15200b(0x2a1)][_0x15200b(0x60c)][_0x1046a9])){if(_0x15200b(0x1ce)===_0x15200b(0x1ce)){var _0x3cccfd=String(RegExp['$1']);try{if(_0x15200b(0x308)==='WseWu'){function _0x245b5a(){const _0x1be0e2=_0x15200b;_0x503afd[_0x1be0e2(0x385)][_0x1be0e2(0x2e1)][_0x1be0e2(0x3f6)](this,_0x128679,_0x38c59f),this[_0x1be0e2(0x4e1)]();}}else _0x45296e+=eval(_0x3cccfd);}catch(_0x2e8de6){if('gYfxE'==='gYfxE'){if($gameTemp[_0x15200b(0x397)]())console[_0x15200b(0x694)](_0x2e8de6);}else{function _0x2a57b1(){const _0x535596=_0x15200b;return _0x11fc84['randomJS'][_0x535596(0x3f6)](this);}}}}else{function _0x1e41f1(){this['_forcedTroopView']='FV';}}}return _0x45296e;}else{function _0x1025dc(){const _0x5b6689=_0x15200b,_0xefc55=_0x4f9a7c[_0x5b6689(0x300)]-_0x13d68f['boxWidth']-_0x1c8bab[_0x5b6689(0x385)][_0x5b6689(0x2df)]['UI'][_0x5b6689(0x52f)]*0x2,_0x3e9d7a=_0x4c65e7[_0x5b6689(0x578)][_0x5b6689(0x632)][_0x5b6689(0x3f6)](this)*0x4;if(_0xefc55>=_0x3e9d7a)_0x51bc5a[_0x5b6689(0x797)](!![]);}}};return this[_0x23ce0d(0x635)]()[_0x23ce0d(0x2f0)](_0x4f8ff3,0x0);},Game_BattlerBase[_0x3d8147(0x578)][_0x3d8147(0x6fa)]=function(_0x532034){const _0x549859=_0x3d8147,_0x45c04b=(_0x1a2390,_0xfc6780)=>{const _0x827dbc=_0x4916;if(!_0xfc6780)return _0x1a2390;if(_0xfc6780[_0x827dbc(0x297)]['match'](VisuMZ[_0x827dbc(0x385)][_0x827dbc(0x2a1)][_0x827dbc(0x454)][_0x532034])){var _0x2b5cfd=Number(RegExp['$1'])/0x64;_0x1a2390*=_0x2b5cfd;}if(_0xfc6780[_0x827dbc(0x297)]['match'](VisuMZ[_0x827dbc(0x385)][_0x827dbc(0x2a1)][_0x827dbc(0x1d2)][_0x532034])){if(_0x827dbc(0x4c7)!==_0x827dbc(0x247)){var _0x2b5cfd=Number(RegExp['$1']);_0x1a2390*=_0x2b5cfd;}else{function _0x56b19b(){const _0x5d5cbc=_0x827dbc;this[_0x5d5cbc(0x3ab)][_0x5d5cbc(0x305)](_0x5aa0e9[_0x5d5cbc(0x4b8)]['NumberBgType']);}}}if(_0xfc6780[_0x827dbc(0x297)]['match'](VisuMZ[_0x827dbc(0x385)]['RegExp'][_0x827dbc(0x770)][_0x532034])){var _0x42f8b6=String(RegExp['$1']);try{_0x1a2390*=eval(_0x42f8b6);}catch(_0x12f5d8){if($gameTemp[_0x827dbc(0x397)]())console[_0x827dbc(0x694)](_0x12f5d8);}}return _0x1a2390;};return this[_0x549859(0x635)]()[_0x549859(0x2f0)](_0x45c04b,0x1);},Game_BattlerBase[_0x3d8147(0x578)][_0x3d8147(0x235)]=function(_0x3f69a8){const _0x5e579f=_0x3d8147,_0x442f79=(_0x48e77c,_0x1d8cae)=>{const _0x26f981=_0x4916;if(!_0x1d8cae)return _0x48e77c;if(_0x1d8cae[_0x26f981(0x297)][_0x26f981(0x143)](VisuMZ[_0x26f981(0x385)]['RegExp'][_0x26f981(0x245)][_0x3f69a8])){var _0x4a0aae=Number(RegExp['$1'])/0x64;_0x48e77c+=_0x4a0aae;}if(_0x1d8cae[_0x26f981(0x297)]['match'](VisuMZ[_0x26f981(0x385)][_0x26f981(0x2a1)]['xparamFlat2'][_0x3f69a8])){if(_0x26f981(0x378)===_0x26f981(0x560)){function _0x53aae1(){const _0x72af16=_0x26f981;this[_0x72af16(0x610)][_0x72af16(0x305)](_0x45b0dd[_0x72af16(0x4b8)][_0x72af16(0x466)]);}}else{var _0x4a0aae=Number(RegExp['$1']);_0x48e77c+=_0x4a0aae;}}if(_0x1d8cae[_0x26f981(0x297)][_0x26f981(0x143)](VisuMZ['CoreEngine'][_0x26f981(0x2a1)][_0x26f981(0x1fe)][_0x3f69a8])){var _0x56a931=String(RegExp['$1']);try{_0x48e77c+=eval(_0x56a931);}catch(_0x530ab3){if(_0x26f981(0x2c1)==='JAFof'){function _0x4d3095(){const _0x4e315c=_0x26f981,_0x5d736f=_0xa81fe8[_0x4e315c(0x385)][_0x4e315c(0x2df)][_0x4e315c(0x42e)];if(_0x5d736f&&_0x5d736f[_0x4e315c(0x3a9)])return _0x5d736f['randomJS'][_0x4e315c(0x3f6)](this);const _0x432c06=_0x201a93[_0x4e315c(0x4b7)]*0.75,_0x4a952c=_0x240ea8[_0x4e315c(0x4bf)]*0.6,_0x36836f=_0x18bc53['_shakeDuration'];this['x']+=_0x297c64[_0x4e315c(0x687)](_0x2c554a['randomInt'](_0x432c06)-_0xfa693c[_0x4e315c(0x573)](_0x4a952c))*(_0xa2552[_0x4e315c(0x495)](_0x36836f,0x1e)*0.5),this['y']+=_0x5ccff1['round'](_0x1ea164[_0x4e315c(0x573)](_0x432c06)-_0x328c50['randomInt'](_0x4a952c))*(_0x2a1f33['min'](_0x36836f,0x1e)*0.5);}}else{if($gameTemp[_0x26f981(0x397)]())console[_0x26f981(0x694)](_0x530ab3);}}}return _0x48e77c;};return this[_0x5e579f(0x635)]()[_0x5e579f(0x2f0)](_0x442f79,0x0);},Game_BattlerBase[_0x3d8147(0x578)]['xparam']=function(_0x1e4921){const _0x29ccc7=_0x3d8147;let _0x3022f8=_0x29ccc7(0x3bb)+_0x1e4921+_0x29ccc7(0x661);if(this[_0x29ccc7(0x1ff)](_0x3022f8))return this['_cache'][_0x3022f8];return this['_cache'][_0x3022f8]=VisuMZ[_0x29ccc7(0x385)]['Settings']['Param'][_0x29ccc7(0x3b3)]['call'](this,_0x1e4921),this['_cache'][_0x3022f8];},Game_BattlerBase[_0x3d8147(0x578)][_0x3d8147(0x277)]=function(_0x53815a){const _0x5ee6ba=_0x3d8147,_0x2200e1=(_0x16f936,_0x277ea9)=>{const _0x5ac766=_0x4916;if('vfryn'!==_0x5ac766(0x56a)){function _0x21ff15(){const _0xd1ca2c=_0x5ac766;return this[_0xd1ca2c(0x48f)]()[_0xd1ca2c(0x31e)]+0.05;}}else{if(!_0x277ea9)return _0x16f936;if(_0x277ea9[_0x5ac766(0x297)][_0x5ac766(0x143)](VisuMZ[_0x5ac766(0x385)][_0x5ac766(0x2a1)][_0x5ac766(0x24f)][_0x53815a])){if('DgXvD'==='MdXsI'){function _0x56c26a(){const _0x49a338=_0x5ac766;this['changeTextColor'](_0xaf407c[_0x49a338(0x394)]()),this[_0x49a338(0x248)](_0x3d5426,_0x5782aa,_0x391bb3,_0x23f437,_0x49a338(0x5eb)),_0x363347-=this[_0x49a338(0x597)](_0x34bd76)+0x6;}}else{var _0x59141e=Number(RegExp['$1'])/0x64;_0x16f936+=_0x59141e;}}if(_0x277ea9[_0x5ac766(0x297)]['match'](VisuMZ['CoreEngine']['RegExp'][_0x5ac766(0x673)][_0x53815a])){var _0x59141e=Number(RegExp['$1']);_0x16f936+=_0x59141e;}if(_0x277ea9['note'][_0x5ac766(0x143)](VisuMZ[_0x5ac766(0x385)]['RegExp'][_0x5ac766(0x583)][_0x53815a])){if(_0x5ac766(0x31a)!==_0x5ac766(0x31a)){function _0x3c1ddb(){this['_forcedBattleSys']='CTB';}}else{var _0x174812=String(RegExp['$1']);try{if(_0x5ac766(0x2b0)!==_0x5ac766(0x2b0)){function _0x4e3ec8(){const _0xf62877=_0x5ac766;_0x5dbb50[_0xf62877(0x385)][_0xf62877(0x6f1)][_0xf62877(0x3f6)](this,_0x3683df,_0xe6682e,_0x3f5cb8,_0x117ef4,_0x1a5c0f,_0x1b7bc0,_0x334b89,_0x871285,_0x5a0c89),this[_0xf62877(0x4e1)]();}}else _0x16f936+=eval(_0x174812);}catch(_0x56d7c7){if($gameTemp['isPlaytest']())console[_0x5ac766(0x694)](_0x56d7c7);}}}return _0x16f936;}};return this[_0x5ee6ba(0x635)]()['reduce'](_0x2200e1,0x0);},Game_BattlerBase[_0x3d8147(0x578)][_0x3d8147(0x2ee)]=function(_0x3df524){const _0x32c4be=_0x3d8147,_0x1abe16=(_0x16af42,_0x849191)=>{const _0x121a26=_0x4916;if(!_0x849191)return _0x16af42;if(_0x849191[_0x121a26(0x297)][_0x121a26(0x143)](VisuMZ['CoreEngine'][_0x121a26(0x2a1)][_0x121a26(0x276)][_0x3df524])){if(_0x121a26(0x402)===_0x121a26(0x216)){function _0x345411(){const _0x5e4957=_0x121a26;if(this['_CoreEngineSettings']===_0x358833)this['initCoreEngine']();if(this[_0x5e4957(0x295)][_0x5e4957(0x769)]===_0xeaf4a0)this[_0x5e4957(0x7a0)]();return this['_CoreEngineSettings'][_0x5e4957(0x769)];}}else{var _0x5eb5d7=Number(RegExp['$1'])/0x64;_0x16af42*=_0x5eb5d7;}}if(_0x849191[_0x121a26(0x297)][_0x121a26(0x143)](VisuMZ[_0x121a26(0x385)]['RegExp'][_0x121a26(0x3f8)][_0x3df524])){var _0x5eb5d7=Number(RegExp['$1']);_0x16af42*=_0x5eb5d7;}if(_0x849191['note']['match'](VisuMZ['CoreEngine']['RegExp'][_0x121a26(0x772)][_0x3df524])){var _0x514b93=String(RegExp['$1']);try{_0x16af42*=eval(_0x514b93);}catch(_0x53ad54){if($gameTemp['isPlaytest']())console['log'](_0x53ad54);}}return _0x16af42;};return this[_0x32c4be(0x635)]()['reduce'](_0x1abe16,0x1);},Game_BattlerBase[_0x3d8147(0x578)][_0x3d8147(0x3e7)]=function(_0x3d858f){const _0x1175ca=(_0x42638b,_0x5c064d)=>{const _0x57f780=_0x4916;if(_0x57f780(0x4f9)!==_0x57f780(0x5e3)){if(!_0x5c064d)return _0x42638b;if(_0x5c064d[_0x57f780(0x297)][_0x57f780(0x143)](VisuMZ['CoreEngine'][_0x57f780(0x2a1)][_0x57f780(0x6da)][_0x3d858f])){var _0x540c3b=Number(RegExp['$1'])/0x64;_0x42638b+=_0x540c3b;}if(_0x5c064d[_0x57f780(0x297)][_0x57f780(0x143)](VisuMZ[_0x57f780(0x385)]['RegExp'][_0x57f780(0x1e7)][_0x3d858f])){var _0x540c3b=Number(RegExp['$1']);_0x42638b+=_0x540c3b;}if(_0x5c064d[_0x57f780(0x297)][_0x57f780(0x143)](VisuMZ['CoreEngine']['RegExp'][_0x57f780(0x585)][_0x3d858f])){var _0x1b77ff=String(RegExp['$1']);try{if('sbiiu'!==_0x57f780(0x514))_0x42638b+=eval(_0x1b77ff);else{function _0x4d4e3f(){const _0x2a093e=_0x57f780;return _0x2e82d5['CoreEngine'][_0x2a093e(0x2df)][_0x2a093e(0x7a7)][_0x2a093e(0x278)];}}}catch(_0x3395a2){if($gameTemp['isPlaytest']())console['log'](_0x3395a2);}}return _0x42638b;}else{function _0x18f6d1(){const _0x33a4cb=_0x57f780;_0x4434d2['log'](_0x5aaa42,_0x4025e1),_0x20ddef[_0x33a4cb(0x7a5)](_0x4d6f0f,_0x42b0a);}}};return this['traitObjects']()['reduce'](_0x1175ca,0x0);},Game_BattlerBase[_0x3d8147(0x578)]['sparam']=function(_0x325816){const _0x126b0b=_0x3d8147;let _0x139923='sparam'+_0x325816+_0x126b0b(0x661);if(this['checkCacheKey'](_0x139923))return this['_cache'][_0x139923];return this[_0x126b0b(0x63d)][_0x139923]=VisuMZ[_0x126b0b(0x385)]['Settings'][_0x126b0b(0x641)][_0x126b0b(0x77e)][_0x126b0b(0x3f6)](this,_0x325816),this[_0x126b0b(0x63d)][_0x139923];},Game_BattlerBase['prototype'][_0x3d8147(0x65b)]=function(_0x23e642,_0x40a31b){const _0x2e76be=_0x3d8147;if(typeof paramId===_0x2e76be(0x3c6))return this[_0x2e76be(0x34c)](_0x23e642);_0x23e642=String(_0x23e642||'')[_0x2e76be(0x7bb)]();if(_0x23e642===_0x2e76be(0x456))return this['param'](0x0);if(_0x23e642==='MAXMP')return this[_0x2e76be(0x34c)](0x1);if(_0x23e642===_0x2e76be(0x3ef))return this['param'](0x2);if(_0x23e642===_0x2e76be(0x3b2))return this[_0x2e76be(0x34c)](0x3);if(_0x23e642===_0x2e76be(0x77f))return this[_0x2e76be(0x34c)](0x4);if(_0x23e642===_0x2e76be(0x2c8))return this[_0x2e76be(0x34c)](0x5);if(_0x23e642===_0x2e76be(0x6a4))return this[_0x2e76be(0x34c)](0x6);if(_0x23e642===_0x2e76be(0x2c2))return this[_0x2e76be(0x34c)](0x7);if(_0x23e642===_0x2e76be(0x3b0))return _0x40a31b?String(Math[_0x2e76be(0x687)](this['xparam'](0x0)*0x64))+'%':this[_0x2e76be(0x3bb)](0x0);if(_0x23e642===_0x2e76be(0x73e))return _0x40a31b?String(Math[_0x2e76be(0x687)](this['xparam'](0x1)*0x64))+'%':this[_0x2e76be(0x3bb)](0x1);if(_0x23e642===_0x2e76be(0x1ec))return _0x40a31b?String(Math[_0x2e76be(0x687)](this[_0x2e76be(0x3bb)](0x2)*0x64))+'%':this['xparam'](0x2);if(_0x23e642===_0x2e76be(0x166))return _0x40a31b?String(Math['round'](this[_0x2e76be(0x3bb)](0x3)*0x64))+'%':this['xparam'](0x3);if(_0x23e642==='MEV')return _0x40a31b?String(Math[_0x2e76be(0x687)](this['xparam'](0x4)*0x64))+'%':this[_0x2e76be(0x3bb)](0x4);if(_0x23e642===_0x2e76be(0x7ba))return _0x40a31b?String(Math[_0x2e76be(0x687)](this[_0x2e76be(0x3bb)](0x5)*0x64))+'%':this[_0x2e76be(0x3bb)](0x5);if(_0x23e642===_0x2e76be(0x2b6))return _0x40a31b?String(Math['round'](this[_0x2e76be(0x3bb)](0x6)*0x64))+'%':this[_0x2e76be(0x3bb)](0x6);if(_0x23e642===_0x2e76be(0x762))return _0x40a31b?String(Math['round'](this['xparam'](0x7)*0x64))+'%':this[_0x2e76be(0x3bb)](0x7);if(_0x23e642===_0x2e76be(0x3f1))return _0x40a31b?String(Math[_0x2e76be(0x687)](this[_0x2e76be(0x3bb)](0x8)*0x64))+'%':this[_0x2e76be(0x3bb)](0x8);if(_0x23e642===_0x2e76be(0x61c))return _0x40a31b?String(Math[_0x2e76be(0x687)](this['xparam'](0x9)*0x64))+'%':this[_0x2e76be(0x3bb)](0x9);if(_0x23e642===_0x2e76be(0x4f0))return _0x40a31b?String(Math['round'](this[_0x2e76be(0x50f)](0x0)*0x64))+'%':this[_0x2e76be(0x50f)](0x0);if(_0x23e642===_0x2e76be(0x712))return _0x40a31b?String(Math[_0x2e76be(0x687)](this['sparam'](0x1)*0x64))+'%':this['sparam'](0x1);if(_0x23e642==='REC')return _0x40a31b?String(Math[_0x2e76be(0x687)](this['sparam'](0x2)*0x64))+'%':this[_0x2e76be(0x50f)](0x2);if(_0x23e642===_0x2e76be(0x3df))return _0x40a31b?String(Math['round'](this[_0x2e76be(0x50f)](0x3)*0x64))+'%':this['sparam'](0x3);if(_0x23e642==='MCR')return _0x40a31b?String(Math[_0x2e76be(0x687)](this['sparam'](0x4)*0x64))+'%':this['sparam'](0x4);if(_0x23e642===_0x2e76be(0x4a5))return _0x40a31b?String(Math['round'](this[_0x2e76be(0x50f)](0x5)*0x64))+'%':this[_0x2e76be(0x50f)](0x5);if(_0x23e642===_0x2e76be(0x6e8))return _0x40a31b?String(Math[_0x2e76be(0x687)](this[_0x2e76be(0x50f)](0x6)*0x64))+'%':this[_0x2e76be(0x50f)](0x6);if(_0x23e642===_0x2e76be(0x650))return _0x40a31b?String(Math[_0x2e76be(0x687)](this[_0x2e76be(0x50f)](0x7)*0x64))+'%':this[_0x2e76be(0x50f)](0x7);if(_0x23e642===_0x2e76be(0x1a8))return _0x40a31b?String(Math[_0x2e76be(0x687)](this[_0x2e76be(0x50f)](0x8)*0x64))+'%':this[_0x2e76be(0x50f)](0x8);if(_0x23e642===_0x2e76be(0x299))return _0x40a31b?String(Math[_0x2e76be(0x687)](this[_0x2e76be(0x50f)](0x9)*0x64))+'%':this['sparam'](0x9);if(VisuMZ[_0x2e76be(0x385)][_0x2e76be(0x5ed)][_0x23e642]){if(_0x2e76be(0x7a3)!==_0x2e76be(0x455)){const _0x590fde=VisuMZ[_0x2e76be(0x385)][_0x2e76be(0x5ed)][_0x23e642],_0x1cded5=this[_0x590fde];return VisuMZ[_0x2e76be(0x385)]['CustomParamType'][_0x23e642]===_0x2e76be(0x5e9)?_0x1cded5:_0x40a31b?String(Math[_0x2e76be(0x687)](_0x1cded5*0x64))+'%':_0x1cded5;}else{function _0x75d99a(){this['moveCancelButtonSideButtonLayout']();}}}return'';},Game_BattlerBase['prototype'][_0x3d8147(0x685)]=function(){const _0x66d242=_0x3d8147;return this[_0x66d242(0x4af)]()&&this[_0x66d242(0x6ed)]<this[_0x66d242(0x629)]*VisuMZ[_0x66d242(0x385)][_0x66d242(0x2df)][_0x66d242(0x641)][_0x66d242(0x39d)];},Game_Battler[_0x3d8147(0x578)][_0x3d8147(0x59f)]=function(){const _0x1e3939=_0x3d8147;SoundManager[_0x1e3939(0x79f)](),this['requestMotion'](_0x1e3939(0x5d1));},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x3fb)]=Game_Actor[_0x3d8147(0x578)][_0x3d8147(0x37e)],Game_Actor[_0x3d8147(0x578)][_0x3d8147(0x37e)]=function(_0x25f689){const _0x36ac3f=_0x3d8147;if(this[_0x36ac3f(0x773)]>0x63)return this[_0x36ac3f(0x46a)](_0x25f689);return VisuMZ['CoreEngine'][_0x36ac3f(0x3fb)][_0x36ac3f(0x3f6)](this,_0x25f689);},Game_Actor[_0x3d8147(0x578)][_0x3d8147(0x46a)]=function(_0x4191d7){const _0x56fbf7=_0x3d8147,_0x4423e8=this['currentClass']()[_0x56fbf7(0x1de)][_0x4191d7][0x63],_0x4f341c=this[_0x56fbf7(0x322)]()[_0x56fbf7(0x1de)][_0x4191d7][0x62];return _0x4423e8+(_0x4423e8-_0x4f341c)*(this[_0x56fbf7(0x773)]-0x63);},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x203)]=Game_Actor[_0x3d8147(0x578)][_0x3d8147(0x234)],Game_Actor[_0x3d8147(0x578)][_0x3d8147(0x234)]=function(_0x550298,_0x57fc74){const _0x2b61b1=_0x3d8147;$gameTemp[_0x2b61b1(0x61b)]=!![],VisuMZ[_0x2b61b1(0x385)][_0x2b61b1(0x203)][_0x2b61b1(0x3f6)](this,_0x550298,_0x57fc74),$gameTemp['_changingClass']=undefined;},VisuMZ['CoreEngine'][_0x3d8147(0x52b)]=Game_Actor[_0x3d8147(0x578)][_0x3d8147(0x67d)],Game_Actor[_0x3d8147(0x578)]['levelUp']=function(){const _0x30b660=_0x3d8147;VisuMZ[_0x30b660(0x385)][_0x30b660(0x52b)][_0x30b660(0x3f6)](this);if(!$gameTemp[_0x30b660(0x61b)])this[_0x30b660(0x341)]();},Game_Actor['prototype'][_0x3d8147(0x341)]=function(){const _0x5351bf=_0x3d8147;this['_cache']={};if(VisuMZ[_0x5351bf(0x385)]['Settings']['QoL'][_0x5351bf(0x625)])this[_0x5351bf(0x6ed)]=this[_0x5351bf(0x629)];if(VisuMZ[_0x5351bf(0x385)][_0x5351bf(0x2df)]['QoL'][_0x5351bf(0x6c8)])this[_0x5351bf(0x6c3)]=this[_0x5351bf(0x6b2)];},Game_Actor[_0x3d8147(0x578)]['expRate']=function(){const _0xead810=_0x3d8147;if(this[_0xead810(0x1f6)]())return 0x1;const _0x239974=this['nextLevelExp']()-this[_0xead810(0x624)](),_0x222925=this[_0xead810(0x3e8)]()-this['currentLevelExp']();return(_0x222925/_0x239974)[_0xead810(0x7ae)](0x0,0x1);},Game_Actor['prototype'][_0x3d8147(0x635)]=function(){const _0x4fd139=_0x3d8147,_0x53963c=Game_Battler['prototype']['traitObjects'][_0x4fd139(0x3f6)](this);for(const _0x5c11a0 of this[_0x4fd139(0x236)]()){if(_0x5c11a0){if('sbfuw'===_0x4fd139(0x22d))_0x53963c[_0x4fd139(0x58a)](_0x5c11a0);else{function _0x59519a(){const _0x1b9d57=_0x4fd139;_0x17c00b[_0x1b9d57(0x174)](_0x256b46);}}}}return _0x53963c[_0x4fd139(0x58a)](this[_0x4fd139(0x322)](),this[_0x4fd139(0x67b)]()),_0x53963c;},Object['defineProperty'](Game_Enemy[_0x3d8147(0x578)],_0x3d8147(0x773),{'get':function(){const _0x56ed19=_0x3d8147;return this[_0x56ed19(0x286)]();},'configurable':!![]}),Game_Enemy[_0x3d8147(0x578)][_0x3d8147(0x286)]=function(){const _0x28e4e5=_0x3d8147;return this['enemy']()[_0x28e4e5(0x773)];},Game_Enemy[_0x3d8147(0x578)][_0x3d8147(0x6d6)]=function(){const _0x20305b=_0x3d8147;if(!this['_repositioned']){this[_0x20305b(0x6be)]+=Math[_0x20305b(0x687)]((Graphics['height']-0x270)/0x2),this[_0x20305b(0x6be)]-=Math[_0x20305b(0x27e)]((Graphics['height']-Graphics['boxHeight'])/0x2);if($gameSystem[_0x20305b(0x53b)]()){if(_0x20305b(0x407)!==_0x20305b(0x5be))this[_0x20305b(0x214)]-=Math[_0x20305b(0x27e)]((Graphics[_0x20305b(0x300)]-Graphics[_0x20305b(0x7d7)])/0x2);else{function _0xfb8bdf(){const _0x38f5d4=_0x20305b;return _0x16c558?_0x12d5e1(_0x123e1e[_0x38f5d4(0x687)](_0x3c9a04*0x64))+'%':_0x192a7b;}}}else{if(_0x20305b(0x342)!==_0x20305b(0x342)){function _0x2960df(){const _0x36d76c=_0x20305b;this[_0x36d76c(0x192)]();}}else this[_0x20305b(0x214)]+=Math[_0x20305b(0x687)]((Graphics[_0x20305b(0x7d7)]-0x330)/0x2);}}this[_0x20305b(0x513)]=!![];},Game_Party[_0x3d8147(0x578)][_0x3d8147(0x382)]=function(){const _0x3c0bf0=_0x3d8147;return VisuMZ[_0x3c0bf0(0x385)][_0x3c0bf0(0x2df)][_0x3c0bf0(0x75d)]['GoldMax'];},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x56b)]=Game_Party[_0x3d8147(0x578)]['consumeItem'],Game_Party[_0x3d8147(0x578)][_0x3d8147(0x379)]=function(_0x23eb44){const _0x17aa40=_0x3d8147;if(VisuMZ[_0x17aa40(0x385)][_0x17aa40(0x2df)][_0x17aa40(0x672)][_0x17aa40(0x558)]&&DataManager[_0x17aa40(0x1c6)](_0x23eb44))return;VisuMZ[_0x17aa40(0x385)]['Game_Party_consumeItem']['call'](this,_0x23eb44);},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x564)]=Game_Troop['prototype'][_0x3d8147(0x31c)],Game_Troop[_0x3d8147(0x578)][_0x3d8147(0x31c)]=function(_0x23f6f0){const _0x4e7ca1=_0x3d8147;$gameTemp[_0x4e7ca1(0x6cc)](),$gameTemp[_0x4e7ca1(0x5e1)](_0x23f6f0),VisuMZ[_0x4e7ca1(0x385)][_0x4e7ca1(0x564)][_0x4e7ca1(0x3f6)](this,_0x23f6f0);},VisuMZ['CoreEngine'][_0x3d8147(0x36b)]=Game_Map[_0x3d8147(0x578)]['setup'],Game_Map[_0x3d8147(0x578)][_0x3d8147(0x31c)]=function(_0x511d5d){const _0x323ec3=_0x3d8147;VisuMZ[_0x323ec3(0x385)][_0x323ec3(0x36b)][_0x323ec3(0x3f6)](this,_0x511d5d),this[_0x323ec3(0x42c)](_0x511d5d);},Game_Map[_0x3d8147(0x578)]['setupCoreEngine']=function(){const _0x64a3b5=_0x3d8147;this[_0x64a3b5(0x2cc)]=VisuMZ[_0x64a3b5(0x385)]['Settings'][_0x64a3b5(0x672)][_0x64a3b5(0x1c1)]||![];if($dataMap&&$dataMap[_0x64a3b5(0x297)]){if($dataMap['note'][_0x64a3b5(0x143)](/<SHOW TILE SHADOWS>/i))this[_0x64a3b5(0x2cc)]=![];if($dataMap['note'][_0x64a3b5(0x143)](/<HIDE TILE SHADOWS>/i))this['_hideTileShadows']=!![];}},Game_Map[_0x3d8147(0x578)][_0x3d8147(0x4fd)]=function(){const _0x533034=_0x3d8147;if(this[_0x533034(0x2cc)]===undefined)this[_0x533034(0x42c)]();return this[_0x533034(0x2cc)];},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x543)]=Game_Character['prototype'][_0x3d8147(0x349)],Game_Character[_0x3d8147(0x578)][_0x3d8147(0x349)]=function(_0x16dd25){const _0x5176d5=_0x3d8147;try{VisuMZ[_0x5176d5(0x385)][_0x5176d5(0x543)]['call'](this,_0x16dd25);}catch(_0x5b9396){if($gameTemp[_0x5176d5(0x397)]())console[_0x5176d5(0x694)](_0x5b9396);}},Game_Player[_0x3d8147(0x578)][_0x3d8147(0x4d6)]=function(){const _0xdb268=_0x3d8147,_0x252abd=$gameMap['encounterStep']();this['_encounterCount']=Math[_0xdb268(0x573)](_0x252abd)+Math[_0xdb268(0x573)](_0x252abd)+this[_0xdb268(0x314)]();},Game_Player[_0x3d8147(0x578)]['encounterStepsMinimum']=function(){const _0x50bd1d=_0x3d8147;if($dataMap&&$dataMap[_0x50bd1d(0x297)]&&$dataMap[_0x50bd1d(0x297)]['match'](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)){if(_0x50bd1d(0x6d4)!==_0x50bd1d(0x135))return Number(RegExp['$1']);else{function _0x5069f2(){const _0x21f795=_0x50bd1d;if(_0x5d0735['isPlaytest']())_0x50d4b9[_0x21f795(0x694)](_0x1d605b);}}}else{if('DRzTH'===_0x50bd1d(0x23a)){function _0x194eea(){return!![];}}else return VisuMZ[_0x50bd1d(0x385)][_0x50bd1d(0x2df)]['QoL'][_0x50bd1d(0x42a)];}},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x2b2)]=Game_Event[_0x3d8147(0x578)][_0x3d8147(0x3e6)],Game_Event[_0x3d8147(0x578)][_0x3d8147(0x3e6)]=function(_0x2a5466,_0x4c2103){const _0x3c6c8d=_0x3d8147;if(this[_0x3c6c8d(0x18d)]()){if('UyWoP'!=='UyWoP'){function _0x28d91a(){return _0xe3ee48['ApplyEasing'](_0x9c01aa,this['_coreEasingType']);}}else return this['checkSmartEventCollision'](_0x2a5466,_0x4c2103);}else{if(_0x3c6c8d(0x6bd)==='tiFlM'){function _0x12969d(){const _0x59fe04=_0x3c6c8d;var _0x58e54f=_0x408a2d(_0x59fe04(0x1aa))[_0x59fe04(0x73a)]['get']();_0x523e0a[_0x59fe04(0x550)]();if(_0xf6897d)_0x217ec4(_0x58e54f[_0x59fe04(0x55d)]['bind'](_0x58e54f),0x190);}}else return VisuMZ[_0x3c6c8d(0x385)][_0x3c6c8d(0x2b2)][_0x3c6c8d(0x3f6)](this,_0x2a5466,_0x4c2103);}},Game_Event['prototype']['isSmartEventCollisionOn']=function(){const _0x5cced2=_0x3d8147;return VisuMZ[_0x5cced2(0x385)][_0x5cced2(0x2df)][_0x5cced2(0x672)][_0x5cced2(0x5f5)];},Game_Event[_0x3d8147(0x578)]['checkSmartEventCollision']=function(_0xbf2f87,_0x1b103a){const _0x55fe8c=_0x3d8147;if(!this['isNormalPriority']())return![];else{const _0x434cfd=$gameMap[_0x55fe8c(0x531)](_0xbf2f87,_0x1b103a)[_0x55fe8c(0x354)](_0x4da88c=>_0x4da88c[_0x55fe8c(0x2cf)]());return _0x434cfd[_0x55fe8c(0x278)]>0x0;}},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x271)]=Game_Interpreter['prototype'][_0x3d8147(0x639)],Game_Interpreter['prototype']['command111']=function(_0x27119f){const _0x9b44b9=_0x3d8147;try{VisuMZ[_0x9b44b9(0x385)]['Game_Interpreter_command111'][_0x9b44b9(0x3f6)](this,_0x27119f);}catch(_0x40f6d1){if(_0x9b44b9(0x57c)==='eRsgp'){if($gameTemp[_0x9b44b9(0x397)]()){if(_0x9b44b9(0x5d6)!==_0x9b44b9(0x7a8))console[_0x9b44b9(0x694)](_0x9b44b9(0x38d)),console[_0x9b44b9(0x694)](_0x40f6d1);else{function _0x27234f(){const _0x234836=_0x9b44b9,_0x18baca=new _0x4ebbe9[(_0x234836(0x6f9))]();_0x18baca[_0x234836(0x57e)](0x800,0x800),_0x25ed7a[_0x234836(0x385)][_0x234836(0x2df)][_0x234836(0x672)][_0x234836(0x6e4)]&&(_0x18baca[_0x234836(0x462)]=_0xe7a4a3[_0x234836(0x6d8)][_0x234836(0x2dd)]),this[_0x234836(0x59e)]['push'](_0x18baca);}}}this['skipBranch']();}else{function _0x1a1dc8(){this['select'](-0x1);}}}return!![];},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x27f)]=Game_Interpreter[_0x3d8147(0x578)][_0x3d8147(0x63e)],Game_Interpreter[_0x3d8147(0x578)][_0x3d8147(0x63e)]=function(_0xd8d8e4){const _0x5114d0=_0x3d8147;try{if(_0x5114d0(0x6fb)==='ixojo')VisuMZ[_0x5114d0(0x385)][_0x5114d0(0x27f)]['call'](this,_0xd8d8e4);else{function _0x2d566f(){const _0x578565=_0x5114d0;_0x5b0b2d[_0x578565(0x385)][_0x578565(0x7a9)][_0x578565(0x3f6)](this),this[_0x578565(0x35d)]();}}}catch(_0x569fb4){if($gameTemp[_0x5114d0(0x397)]()){if(_0x5114d0(0x424)!==_0x5114d0(0x257))console['log'](_0x5114d0(0x7c1)),console[_0x5114d0(0x694)](_0x569fb4);else{function _0x13d766(){const _0x2a5b09=_0x5114d0;return _0x4d003b[_0x2a5b09(0x4b8)]['SlotRect'][_0x2a5b09(0x3f6)](this);}}}}return!![];},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x377)]=Game_Interpreter[_0x3d8147(0x578)][_0x3d8147(0x66c)],Game_Interpreter[_0x3d8147(0x578)][_0x3d8147(0x66c)]=function(){const _0x45f7ca=_0x3d8147;try{VisuMZ['CoreEngine']['Game_Interpreter_command355'][_0x45f7ca(0x3f6)](this);}catch(_0x4406e1){$gameTemp['isPlaytest']()&&(console['log'](_0x45f7ca(0x473)),console[_0x45f7ca(0x694)](_0x4406e1));}return!![];},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x2ab)]=Game_Interpreter[_0x3d8147(0x578)][_0x3d8147(0x58e)],Game_Interpreter['prototype'][_0x3d8147(0x58e)]=function(_0x5c7206){const _0x578233=_0x3d8147;return $gameTemp[_0x578233(0x74d)](this),VisuMZ[_0x578233(0x385)][_0x578233(0x2ab)]['call'](this,_0x5c7206);},Scene_Base[_0x3d8147(0x578)]['fadeSpeed']=function(){const _0x3f0658=_0x3d8147;return VisuMZ[_0x3f0658(0x385)][_0x3f0658(0x2df)]['UI']['FadeSpeed'];},Scene_Base[_0x3d8147(0x578)][_0x3d8147(0x3d3)]=function(){const _0x2d01a7=_0x3d8147;return VisuMZ['CoreEngine'][_0x2d01a7(0x2df)]['UI'][_0x2d01a7(0x3fe)];},Scene_Base[_0x3d8147(0x578)][_0x3d8147(0x3b1)]=function(){const _0x16fc99=_0x3d8147;return VisuMZ[_0x16fc99(0x385)][_0x16fc99(0x2df)]['UI'][_0x16fc99(0x5bf)];},Scene_Base[_0x3d8147(0x578)]['isRightInputMode']=function(){const _0xebb956=_0x3d8147;return VisuMZ[_0xebb956(0x385)][_0xebb956(0x2df)]['UI'][_0xebb956(0x75e)];},Scene_Base[_0x3d8147(0x578)]['mainCommandWidth']=function(){const _0x23be9f=_0x3d8147;return VisuMZ[_0x23be9f(0x385)][_0x23be9f(0x2df)]['UI'][_0x23be9f(0x59c)];},Scene_Base[_0x3d8147(0x578)][_0x3d8147(0x6b8)]=function(){const _0x47ce67=_0x3d8147;return VisuMZ['CoreEngine'][_0x47ce67(0x2df)]['UI'][_0x47ce67(0x401)];},Scene_Base[_0x3d8147(0x578)][_0x3d8147(0x5f4)]=function(){const _0x55a55a=_0x3d8147;return VisuMZ[_0x55a55a(0x385)][_0x55a55a(0x2df)][_0x55a55a(0x73a)][_0x55a55a(0x1a0)];},VisuMZ['CoreEngine'][_0x3d8147(0x74f)]=Scene_Base['prototype'][_0x3d8147(0x274)],Scene_Base['prototype'][_0x3d8147(0x274)]=function(){const _0x56c575=_0x3d8147;VisuMZ[_0x56c575(0x385)][_0x56c575(0x74f)][_0x56c575(0x3f6)](this),this[_0x56c575(0x723)](),this[_0x56c575(0x76a)]['x']=Math[_0x56c575(0x687)](this[_0x56c575(0x76a)]['x']),this[_0x56c575(0x76a)]['y']=Math[_0x56c575(0x687)](this[_0x56c575(0x76a)]['y']);},Scene_Base[_0x3d8147(0x578)]['createButtonAssistWindow']=function(){},Scene_Base[_0x3d8147(0x578)][_0x3d8147(0x2ba)]=function(){const _0x30812f=_0x3d8147;return TextManager[_0x30812f(0x1e4)]('pageup',_0x30812f(0x568));},Scene_Base[_0x3d8147(0x578)][_0x3d8147(0x7b7)]=function(){const _0x157cb4=_0x3d8147;return TextManager['getInputButtonString'](_0x157cb4(0x35a));},Scene_Base[_0x3d8147(0x578)][_0x3d8147(0x309)]=function(){const _0x1d7b72=_0x3d8147;return TextManager[_0x1d7b72(0x55b)](_0x1d7b72(0x4be));},Scene_Base['prototype'][_0x3d8147(0x54f)]=function(){const _0x93f79=_0x3d8147;return TextManager[_0x93f79(0x55b)]('ok');},Scene_Base['prototype'][_0x3d8147(0x414)]=function(){const _0x2d43ba=_0x3d8147;return TextManager[_0x2d43ba(0x55b)](_0x2d43ba(0x69b));},Scene_Base[_0x3d8147(0x578)][_0x3d8147(0x22c)]=function(){const _0x38ad5e=_0x3d8147;if(this[_0x38ad5e(0x719)]&&this[_0x38ad5e(0x719)]['visible']){if(_0x38ad5e(0x4c2)!==_0x38ad5e(0x627))return TextManager[_0x38ad5e(0x63a)];else{function _0x1ae5da(){const _0x582145=_0x38ad5e;this['_forcedBattleSys']=_0x582145(0x508);}}}else return'';},Scene_Base[_0x3d8147(0x578)][_0x3d8147(0x649)]=function(){return'';},Scene_Base[_0x3d8147(0x578)][_0x3d8147(0x7c0)]=function(){return'';},Scene_Base[_0x3d8147(0x578)][_0x3d8147(0x30f)]=function(){const _0x42a5bd=_0x3d8147;return TextManager[_0x42a5bd(0x789)];},Scene_Base[_0x3d8147(0x578)]['buttonAssistText5']=function(){const _0x178f62=_0x3d8147;return TextManager[_0x178f62(0x1f5)];},Scene_Base[_0x3d8147(0x578)][_0x3d8147(0x754)]=function(){return 0x0;},Scene_Base[_0x3d8147(0x578)]['buttonAssistOffset2']=function(){return 0x0;},Scene_Base['prototype'][_0x3d8147(0x5c5)]=function(){return 0x0;},Scene_Base[_0x3d8147(0x578)][_0x3d8147(0x422)]=function(){return 0x0;},Scene_Base[_0x3d8147(0x578)]['buttonAssistOffset5']=function(){return 0x0;},VisuMZ['CoreEngine'][_0x3d8147(0x7a9)]=Scene_Boot[_0x3d8147(0x578)][_0x3d8147(0x350)],Scene_Boot[_0x3d8147(0x578)][_0x3d8147(0x350)]=function(){const _0x1a65dc=_0x3d8147;VisuMZ[_0x1a65dc(0x385)][_0x1a65dc(0x7a9)]['call'](this),this[_0x1a65dc(0x35d)]();},Scene_Boot[_0x3d8147(0x578)][_0x3d8147(0x35d)]=function(){const _0x125ec9=_0x3d8147,_0x5adf69=[_0x125ec9(0x58d),_0x125ec9(0x14b),_0x125ec9(0x5e8),_0x125ec9(0x541),'enemies',_0x125ec9(0x4ae),_0x125ec9(0x44f),_0x125ec9(0x289),_0x125ec9(0x29b),_0x125ec9(0x26e),_0x125ec9(0x164),_0x125ec9(0x71d),_0x125ec9(0x222),_0x125ec9(0x7b9)];for(const _0x5e9c8e of _0x5adf69){if(_0x125ec9(0x320)!==_0x125ec9(0x320)){function _0x57f52c(){const _0x21a32f=_0x125ec9;if(_0xb153d4['isPlaytest']())_0x1217bb[_0x21a32f(0x694)](_0x3721df);}}else{const _0x3658f0=VisuMZ[_0x125ec9(0x385)][_0x125ec9(0x2df)][_0x125ec9(0x1d1)][_0x5e9c8e],_0x2ab497=_0x125ec9(0x5b6)[_0x125ec9(0x440)](_0x5e9c8e);for(const _0x47bb54 of _0x3658f0){if(_0x125ec9(0x793)!==_0x125ec9(0x793)){function _0x536c0d(){const _0x2668e7=_0x125ec9,_0x5d18af=_0x355b18['Symbol'];let _0x2b7072=_0x5a9fda[_0x2668e7(0x1eb)];if(['',_0x2668e7(0x577)][_0x2668e7(0x760)](_0x2b7072))_0x2b7072=_0x5f21f6[_0x2668e7(0x5b5)][_0x2668e7(0x3f6)](this);const _0xc31884=_0x234359['EnableJS'][_0x2668e7(0x3f6)](this),_0x244fb9=_0x5799da['ExtJS'][_0x2668e7(0x3f6)](this);this[_0x2668e7(0x51a)](_0x2b7072,_0x5d18af,_0xc31884,_0x244fb9),this[_0x2668e7(0x545)](_0x5d18af,_0x280489[_0x2668e7(0x2c0)]['bind'](this,_0x244fb9));}}else ImageManager[_0x125ec9(0x53f)](_0x2ab497,_0x47bb54);}}}},VisuMZ[_0x3d8147(0x385)]['Scene_Boot_startNormalGame']=Scene_Boot[_0x3d8147(0x578)][_0x3d8147(0x60a)],Scene_Boot[_0x3d8147(0x578)][_0x3d8147(0x60a)]=function(){const _0x44f901=_0x3d8147;if(Utils[_0x44f901(0x13b)](_0x44f901(0x5a3))&&VisuMZ[_0x44f901(0x385)]['Settings'][_0x44f901(0x672)]['NewGameBoot']){if(_0x44f901(0x5b7)===_0x44f901(0x54c)){function _0x496412(){const _0x2ec1de=_0x44f901;this[_0x2ec1de(0x3c7)]['clear'](),this[_0x2ec1de(0x18b)][_0x2ec1de(0x684)](),this['resetTextColor']();let _0x6b6d6d=_0x1a4d02[_0x2ec1de(0x385)][_0x2ec1de(0x2df)][_0x2ec1de(0x470)]['NameInputMessage'][_0x2ec1de(0x159)]('\x0a'),_0x5d0de5=_0x6b6d6d[_0x2ec1de(0x278)],_0x57298e=(this['innerHeight']-_0x5d0de5*this['lineHeight']())/0x2;for(let _0xa3d556=0x0;_0xa3d556<_0x5d0de5;++_0xa3d556){let _0x1016d8=_0x6b6d6d[_0xa3d556],_0x850926=this[_0x2ec1de(0x1d5)](_0x1016d8)[_0x2ec1de(0x300)],_0x4fa54a=_0x134278[_0x2ec1de(0x27e)]((this[_0x2ec1de(0x3c7)][_0x2ec1de(0x300)]-_0x850926)/0x2);this[_0x2ec1de(0x421)](_0x1016d8,_0x4fa54a,_0x57298e),_0x57298e+=this['lineHeight']();}}}else this['startAutoNewGame']();}else{if(_0x44f901(0x2d7)==='SjfqM'){function _0x335416(){const _0x4537a4=_0x44f901;this[_0x4537a4(0x768)]=new _0x2af737(_0x30cc7a['loadTitle1'](_0x1e21df[_0x4537a4(0x1dc)])),this[_0x4537a4(0x1b5)]=new _0xbc52cd(_0x4a88ab['loadTitle2'](_0x2e8512['BgFilename2'])),this[_0x4537a4(0x2cd)](this[_0x4537a4(0x768)]),this[_0x4537a4(0x2cd)](this['_backSprite2']),this['_backSprite1'][_0x4537a4(0x61f)][_0x4537a4(0x12f)](this[_0x4537a4(0x6ad)][_0x4537a4(0x2f9)](this,this[_0x4537a4(0x768)])),this[_0x4537a4(0x1b5)]['bitmap'][_0x4537a4(0x12f)](this['adjustSprite'][_0x4537a4(0x2f9)](this,this[_0x4537a4(0x1b5)]));}}else VisuMZ['CoreEngine'][_0x44f901(0x6ef)]['call'](this);}},Scene_Boot[_0x3d8147(0x578)]['startAutoNewGame']=function(){DataManager['setupNewGame'](),SceneManager['goto'](Scene_Map);},Scene_Boot[_0x3d8147(0x578)][_0x3d8147(0x5e2)]=function(){const _0x38513f=_0x3d8147,_0x21fe73=$dataSystem[_0x38513f(0x36d)][_0x38513f(0x1a4)],_0x2b2105=$dataSystem[_0x38513f(0x36d)][_0x38513f(0x6c5)],_0xc654e4=VisuMZ[_0x38513f(0x385)]['Settings']['UI'][_0x38513f(0x52f)];Graphics[_0x38513f(0x7d7)]=_0x21fe73-_0xc654e4*0x2,Graphics[_0x38513f(0x6b0)]=_0x2b2105-_0xc654e4*0x2,this[_0x38513f(0x6cb)]();},VisuMZ['CoreEngine'][_0x3d8147(0x44d)]=Scene_Boot[_0x3d8147(0x578)][_0x3d8147(0x51c)],Scene_Boot['prototype'][_0x3d8147(0x51c)]=function(){const _0x45c1b1=_0x3d8147;if(this[_0x45c1b1(0x1f0)]()){if('FtIUL'!==_0x45c1b1(0x232)){function _0x25677a(){const _0x4f565e=_0x45c1b1;this[_0x4f565e(0x4da)]=_0x441cf1;}}else this[_0x45c1b1(0x7af)]();}else{if(_0x45c1b1(0x38e)!==_0x45c1b1(0x38e)){function _0x27371d(){const _0xf56a2f=_0x45c1b1;this[_0xf56a2f(0x662)](_0x172e28[_0xf56a2f(0x495)](this['index'](),0x0));}}else VisuMZ[_0x45c1b1(0x385)]['Scene_Boot_updateDocumentTitle'][_0x45c1b1(0x3f6)](this);}},Scene_Boot[_0x3d8147(0x578)][_0x3d8147(0x1f0)]=function(){const _0x595718=_0x3d8147;if(Scene_Title[_0x595718(0x5f1)]==='')return![];if(Scene_Title['subtitle']==='Subtitle')return![];if(Scene_Title['version']==='')return![];if(Scene_Title[_0x595718(0x79a)]===_0x595718(0x509))return![];return!![];},Scene_Boot['prototype'][_0x3d8147(0x7af)]=function(){const _0x5cb302=_0x3d8147,_0x2895bc=$dataSystem[_0x5cb302(0x7b0)],_0x157192=Scene_Title[_0x5cb302(0x5f1)]||'',_0x28ef0b=Scene_Title[_0x5cb302(0x79a)]||'',_0x1efe47=VisuMZ[_0x5cb302(0x385)][_0x5cb302(0x2df)][_0x5cb302(0x647)][_0x5cb302(0x667)][_0x5cb302(0x6b9)],_0x57ef23=_0x1efe47[_0x5cb302(0x440)](_0x2895bc,_0x157192,_0x28ef0b);document[_0x5cb302(0x505)]=_0x57ef23;},Scene_Boot['prototype'][_0x3d8147(0x6cb)]=function(){const _0x513a59=_0x3d8147;if(VisuMZ[_0x513a59(0x385)]['Settings']['UI'][_0x513a59(0x461)]){const _0x5ecf4a=Graphics[_0x513a59(0x300)]-Graphics[_0x513a59(0x7d7)]-VisuMZ['CoreEngine']['Settings']['UI'][_0x513a59(0x52f)]*0x2,_0x5714cb=Sprite_Button[_0x513a59(0x578)][_0x513a59(0x632)][_0x513a59(0x3f6)](this)*0x4;if(_0x5ecf4a>=_0x5714cb)SceneManager[_0x513a59(0x797)](!![]);}},Scene_Title[_0x3d8147(0x5f1)]=VisuMZ['CoreEngine'][_0x3d8147(0x2df)][_0x3d8147(0x647)][_0x3d8147(0x667)][_0x3d8147(0x59a)],Scene_Title[_0x3d8147(0x79a)]=VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x2df)][_0x3d8147(0x647)]['Title'][_0x3d8147(0x2e9)],Scene_Title[_0x3d8147(0x3c8)]=VisuMZ['CoreEngine'][_0x3d8147(0x2df)][_0x3d8147(0x153)],VisuMZ[_0x3d8147(0x385)]['Scene_Title_drawGameTitle']=Scene_Title[_0x3d8147(0x578)][_0x3d8147(0x172)],Scene_Title['prototype'][_0x3d8147(0x172)]=function(){const _0x1fd5e7=_0x3d8147;VisuMZ[_0x1fd5e7(0x385)][_0x1fd5e7(0x2df)][_0x1fd5e7(0x647)][_0x1fd5e7(0x667)][_0x1fd5e7(0x172)]['call'](this);if(Scene_Title[_0x1fd5e7(0x5f1)]!==''&&Scene_Title[_0x1fd5e7(0x5f1)]!==_0x1fd5e7(0x59a))this['drawGameSubtitle']();if(Scene_Title[_0x1fd5e7(0x79a)]!==''&&Scene_Title[_0x1fd5e7(0x79a)]!==_0x1fd5e7(0x509))this[_0x1fd5e7(0x3f9)]();},Scene_Title[_0x3d8147(0x578)]['drawGameSubtitle']=function(){const _0x594714=_0x3d8147;VisuMZ[_0x594714(0x385)]['Settings'][_0x594714(0x647)][_0x594714(0x667)]['drawGameSubtitle']['call'](this);},Scene_Title[_0x3d8147(0x578)][_0x3d8147(0x3f9)]=function(){const _0x5409c4=_0x3d8147;VisuMZ['CoreEngine'][_0x5409c4(0x2df)]['MenuLayout']['Title'][_0x5409c4(0x3f9)]['call'](this);},Scene_Title['prototype']['createCommandWindow']=function(){const _0xeed93a=_0x3d8147;this['createTitleButtons']();const _0x26790a=$dataSystem[_0xeed93a(0x2a9)][_0xeed93a(0x370)],_0x37809e=this[_0xeed93a(0x4f7)]();this[_0xeed93a(0x7ad)]=new Window_TitleCommand(_0x37809e),this['_commandWindow']['setBackgroundType'](_0x26790a);const _0x325d91=this[_0xeed93a(0x4f7)]();this[_0xeed93a(0x7ad)]['move'](_0x325d91['x'],_0x325d91['y'],_0x325d91[_0xeed93a(0x300)],_0x325d91[_0xeed93a(0x195)]),this['addWindow'](this[_0xeed93a(0x7ad)]);},Scene_Title[_0x3d8147(0x578)][_0x3d8147(0x5aa)]=function(){const _0x30c5df=_0x3d8147;if(this[_0x30c5df(0x7ad)]){if(_0x30c5df(0x4dd)!=='Wsgjh')return this[_0x30c5df(0x7ad)][_0x30c5df(0x259)]();else{function _0x3ca246(){const _0x1f1513=_0x30c5df;return this[_0x1f1513(0x317)]();}}}else return VisuMZ[_0x30c5df(0x385)]['Settings']['TitleCommandList'][_0x30c5df(0x278)];},Scene_Title[_0x3d8147(0x578)][_0x3d8147(0x4f7)]=function(){const _0x398d74=_0x3d8147;return VisuMZ[_0x398d74(0x385)]['Settings'][_0x398d74(0x647)][_0x398d74(0x667)][_0x398d74(0x4ef)][_0x398d74(0x3f6)](this);},Scene_Title[_0x3d8147(0x578)][_0x3d8147(0x301)]=function(){const _0x23e2cf=_0x3d8147;for(const _0x5bdc5b of Scene_Title['pictureButtons']){const _0x41e57f=new Sprite_TitlePictureButton(_0x5bdc5b);this[_0x23e2cf(0x2cd)](_0x41e57f);}},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x76f)]=Scene_Map['prototype'][_0x3d8147(0x5b9)],Scene_Map[_0x3d8147(0x578)][_0x3d8147(0x5b9)]=function(){const _0x4d113f=_0x3d8147;VisuMZ[_0x4d113f(0x385)][_0x4d113f(0x76f)][_0x4d113f(0x3f6)](this),$gameTemp[_0x4d113f(0x6cc)]();},VisuMZ['CoreEngine'][_0x3d8147(0x288)]=Scene_Map[_0x3d8147(0x578)]['updateMainMultiply'],Scene_Map['prototype'][_0x3d8147(0x516)]=function(){const _0x32a713=_0x3d8147;VisuMZ['CoreEngine'][_0x32a713(0x288)][_0x32a713(0x3f6)](this),$gameTemp[_0x32a713(0x458)]&&!$gameMessage[_0x32a713(0x77d)]()&&(this[_0x32a713(0x45b)](),SceneManager[_0x32a713(0x1c2)]());},Scene_Map[_0x3d8147(0x578)][_0x3d8147(0x26a)]=function(){const _0x8702e=_0x3d8147;Scene_Message['prototype']['terminate']['call'](this);if(!SceneManager[_0x8702e(0x73d)](Scene_Battle)){if('BszjR'!=='BszjR'){function _0x1841cc(){const _0x1d37f0=_0x8702e;return _0x43ef68['CoreEngine'][_0x1d37f0(0x2df)]['UI'][_0x1d37f0(0x7cc)];}}else this[_0x8702e(0x70c)]['update'](),this['_mapNameWindow']['hide'](),this[_0x8702e(0x76a)][_0x8702e(0x660)]=![],SceneManager[_0x8702e(0x774)]();}$gameScreen[_0x8702e(0x67f)]();},VisuMZ['CoreEngine'][_0x3d8147(0x2ad)]=Scene_Map[_0x3d8147(0x578)]['createMenuButton'],Scene_Map[_0x3d8147(0x578)][_0x3d8147(0x66d)]=function(){const _0x2846d3=_0x3d8147;VisuMZ[_0x2846d3(0x385)][_0x2846d3(0x2ad)][_0x2846d3(0x3f6)](this),SceneManager[_0x2846d3(0x481)]()&&this[_0x2846d3(0x2aa)]();},Scene_Map[_0x3d8147(0x578)][_0x3d8147(0x2aa)]=function(){const _0x270311=_0x3d8147;this['_menuButton']['x']=Graphics[_0x270311(0x7d7)]+0x4;},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x230)]=Scene_MenuBase[_0x3d8147(0x578)]['helpAreaTop'],Scene_MenuBase[_0x3d8147(0x578)]['helpAreaTop']=function(){const _0x4e7a81=_0x3d8147;let _0x502e2c=0x0;if(SceneManager[_0x4e7a81(0x3ee)]())_0x502e2c=this[_0x4e7a81(0x7d3)]();else{if(_0x4e7a81(0x27c)==='YMgiw')_0x502e2c=VisuMZ[_0x4e7a81(0x385)][_0x4e7a81(0x230)][_0x4e7a81(0x3f6)](this);else{function _0x4e18a7(){const _0x41d659=_0x4e7a81,_0x4ff8b8=_0x41d659(0x506);this[_0x41d659(0x7d5)]=this[_0x41d659(0x7d5)]||{};if(this[_0x41d659(0x7d5)][_0x4ff8b8])return this[_0x41d659(0x7d5)][_0x4ff8b8];const _0x44a99d=_0x62cf1e['CoreEngine'][_0x41d659(0x2df)][_0x41d659(0x19d)][_0x41d659(0x22f)];return this[_0x41d659(0x565)](_0x4ff8b8,_0x44a99d);}}}if(this[_0x4e7a81(0x223)]()&&this[_0x4e7a81(0x352)]()===_0x4e7a81(0x42b)){if(_0x4e7a81(0x46d)==='CcxCY'){function _0x2e1079(){const _0x103e77=_0x4e7a81;this[_0x103e77(0x421)](_0x4c5c4a[_0x103e77(0x322)]()['name'],_0x63eedc,_0x3dab0a,_0x5c5302);}}else _0x502e2c+=Window_ButtonAssist[_0x4e7a81(0x578)]['lineHeight']();}return _0x502e2c;},Scene_MenuBase[_0x3d8147(0x578)][_0x3d8147(0x7d3)]=function(){const _0x585ff5=_0x3d8147;return this[_0x585ff5(0x3d3)]()?this[_0x585ff5(0x1a9)]():0x0;},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x680)]=Scene_MenuBase[_0x3d8147(0x578)]['mainAreaTop'],Scene_MenuBase[_0x3d8147(0x578)]['mainAreaTop']=function(){const _0x4b3ace=_0x3d8147;return SceneManager[_0x4b3ace(0x3ee)]()?this['mainAreaTopSideButtonLayout']():VisuMZ['CoreEngine'][_0x4b3ace(0x680)]['call'](this);},Scene_MenuBase['prototype'][_0x3d8147(0x20b)]=function(){const _0x56dabf=_0x3d8147;return!this[_0x56dabf(0x3d3)]()?this['helpAreaBottom']():0x0;},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x1b3)]=Scene_MenuBase['prototype'][_0x3d8147(0x41b)],Scene_MenuBase['prototype'][_0x3d8147(0x41b)]=function(){const _0x48b30e=_0x3d8147;let _0x2cd031=0x0;if(SceneManager[_0x48b30e(0x3ee)]()){if('cnBnr'===_0x48b30e(0x74a)){function _0x10033d(){const _0x4b835a=_0x48b30e;this[_0x4b835a(0x702)](_0x4b835a(0x2de)),this[_0x4b835a(0x763)]=_0x419790;}}else _0x2cd031=this['mainAreaHeightSideButtonLayout']();}else{if(_0x48b30e(0x444)!==_0x48b30e(0x444)){function _0x101c16(){const _0x10de6e=_0x48b30e;this[_0x10de6e(0x358)]()?this[_0x10de6e(0x603)]():_0x22de2b[_0x10de6e(0x385)][_0x10de6e(0x737)][_0x10de6e(0x3f6)](this);}}else _0x2cd031=VisuMZ[_0x48b30e(0x385)]['Scene_MenuBase_mainAreaHeight']['call'](this);}if(this[_0x48b30e(0x223)]()&&this[_0x48b30e(0x352)]()!==_0x48b30e(0x4e4)){if(_0x48b30e(0x66b)!=='XGtSt'){function _0x6620ac(){const _0x4ce6d8=_0x48b30e;this['_editWindow'][_0x4ce6d8(0x305)](_0x26f7ff[_0x4ce6d8(0x4b8)][_0x4ce6d8(0x595)]);}}else _0x2cd031-=Window_ButtonAssist[_0x48b30e(0x578)][_0x48b30e(0x244)]();}return _0x2cd031;},Scene_MenuBase[_0x3d8147(0x578)][_0x3d8147(0x5ba)]=function(){const _0x25e6e6=_0x3d8147;return Graphics[_0x25e6e6(0x6b0)]-this[_0x25e6e6(0x5ff)]();},VisuMZ['CoreEngine'][_0x3d8147(0x4e5)]=Scene_MenuBase[_0x3d8147(0x578)][_0x3d8147(0x781)],Scene_MenuBase[_0x3d8147(0x578)][_0x3d8147(0x781)]=function(){const _0x252fd6=_0x3d8147;this[_0x252fd6(0x561)]=new PIXI[(_0x252fd6(0x35f))][(_0x252fd6(0x674))](clamp=!![]),this['_backgroundSprite']=new Sprite(),this[_0x252fd6(0x79c)][_0x252fd6(0x61f)]=SceneManager[_0x252fd6(0x626)](),this[_0x252fd6(0x79c)]['filters']=[this[_0x252fd6(0x561)]],this[_0x252fd6(0x2cd)](this[_0x252fd6(0x79c)]),this[_0x252fd6(0x716)](0xc0),this[_0x252fd6(0x716)](this[_0x252fd6(0x5d9)]()),this['createCustomBackgroundImages']();},Scene_MenuBase[_0x3d8147(0x578)]['getBackgroundOpacity']=function(){const _0x336202=_0x3d8147,_0x317efc=String(this['constructor']['name']),_0x3146e4=this['getCustomBackgroundSettings'](_0x317efc);return _0x3146e4?_0x3146e4[_0x336202(0x48b)]:0xc0;},Scene_MenuBase[_0x3d8147(0x578)][_0x3d8147(0x63c)]=function(){const _0x187b12=_0x3d8147,_0x2b2e08=String(this['constructor']['name']),_0x1c5c08=this[_0x187b12(0x504)](_0x2b2e08);_0x1c5c08&&(_0x1c5c08[_0x187b12(0x1dc)]!==''||_0x1c5c08[_0x187b12(0x1bb)]!=='')&&(this['_backSprite1']=new Sprite(ImageManager[_0x187b12(0x533)](_0x1c5c08[_0x187b12(0x1dc)])),this['_backSprite2']=new Sprite(ImageManager[_0x187b12(0x2c5)](_0x1c5c08[_0x187b12(0x1bb)])),this[_0x187b12(0x2cd)](this[_0x187b12(0x768)]),this[_0x187b12(0x2cd)](this[_0x187b12(0x1b5)]),this[_0x187b12(0x768)]['bitmap'][_0x187b12(0x12f)](this['adjustSprite']['bind'](this,this[_0x187b12(0x768)])),this['_backSprite2'][_0x187b12(0x61f)][_0x187b12(0x12f)](this[_0x187b12(0x6ad)][_0x187b12(0x2f9)](this,this[_0x187b12(0x1b5)])));},Scene_MenuBase[_0x3d8147(0x578)]['getCustomBackgroundSettings']=function(_0x419ac7){const _0x3511d5=_0x3d8147;return VisuMZ['CoreEngine']['Settings'][_0x3511d5(0x165)][_0x419ac7]||VisuMZ[_0x3511d5(0x385)][_0x3511d5(0x2df)][_0x3511d5(0x165)][_0x3511d5(0x336)];},Scene_MenuBase['prototype']['adjustSprite']=function(_0x42bde1){const _0x11f156=_0x3d8147;this[_0x11f156(0x413)](_0x42bde1),this[_0x11f156(0x690)](_0x42bde1);},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x5de)]=Scene_MenuBase[_0x3d8147(0x578)][_0x3d8147(0x40f)],Scene_MenuBase[_0x3d8147(0x578)][_0x3d8147(0x40f)]=function(){const _0x55cc8a=_0x3d8147;VisuMZ[_0x55cc8a(0x385)]['Scene_MenuBase_createCancelButton'][_0x55cc8a(0x3f6)](this),SceneManager[_0x55cc8a(0x481)]()&&this['moveCancelButtonSideButtonLayout']();},Scene_MenuBase[_0x3d8147(0x578)][_0x3d8147(0x474)]=function(){const _0x2c7286=_0x3d8147;this['_cancelButton']['x']=Graphics[_0x2c7286(0x7d7)]+0x4;},VisuMZ[_0x3d8147(0x385)]['Scene_MenuBase_createPageButtons']=Scene_MenuBase[_0x3d8147(0x578)][_0x3d8147(0x4e6)],Scene_MenuBase[_0x3d8147(0x578)]['createPageButtons']=function(){const _0x510efd=_0x3d8147;VisuMZ[_0x510efd(0x385)][_0x510efd(0x4cc)][_0x510efd(0x3f6)](this),SceneManager[_0x510efd(0x481)]()&&this['movePageButtonSideButtonLayout']();},Scene_MenuBase[_0x3d8147(0x578)][_0x3d8147(0x375)]=function(){const _0x419024=_0x3d8147;this['_pageupButton']['x']=-0x1*(this['_pageupButton'][_0x419024(0x300)]+this['_pagedownButton'][_0x419024(0x300)]+0x8),this[_0x419024(0x5a1)]['x']=-0x1*(this[_0x419024(0x5a1)][_0x419024(0x300)]+0x4);},Scene_MenuBase['prototype']['isMenuButtonAssistEnabled']=function(){const _0xab09a7=_0x3d8147;return VisuMZ[_0xab09a7(0x385)][_0xab09a7(0x2df)][_0xab09a7(0x30a)]['Enable'];},Scene_MenuBase[_0x3d8147(0x578)][_0x3d8147(0x352)]=function(){const _0x138e92=_0x3d8147;if(SceneManager[_0x138e92(0x481)]()||SceneManager[_0x138e92(0x3b6)]()){if('InlQI'!==_0x138e92(0x4ee))return VisuMZ[_0x138e92(0x385)][_0x138e92(0x2df)][_0x138e92(0x30a)][_0x138e92(0x631)];else{function _0x444b8c(){return![];}}}else return _0x138e92(0x4e4);},Scene_MenuBase[_0x3d8147(0x578)][_0x3d8147(0x723)]=function(){const _0x1c8643=_0x3d8147;if(!this['isMenuButtonAssistEnabled']())return;const _0x1fc41a=this[_0x1c8643(0x191)]();this[_0x1c8643(0x3c3)]=new Window_ButtonAssist(_0x1fc41a),this[_0x1c8643(0x226)](this['_buttonAssistWindow']);},Scene_MenuBase[_0x3d8147(0x578)][_0x3d8147(0x191)]=function(){const _0x30e3cf=_0x3d8147;if(this[_0x30e3cf(0x352)]()===_0x30e3cf(0x4e4))return this[_0x30e3cf(0x17c)]();else{if(_0x30e3cf(0x2ea)===_0x30e3cf(0x729)){function _0x580158(){const _0x19863c=_0x30e3cf;this[_0x19863c(0x708)][_0x19863c(0x69d)](_0x5950b0[_0x150b2a])?_0x30018e[_0x19863c(0x2be)]():_0x1d2802[_0x19863c(0x1a2)]();}}else return this[_0x30e3cf(0x6a1)]();}},Scene_MenuBase[_0x3d8147(0x578)][_0x3d8147(0x17c)]=function(){const _0x1f8645=_0x3d8147,_0x4855d7=ConfigManager[_0x1f8645(0x239)]?(Sprite_Button[_0x1f8645(0x578)][_0x1f8645(0x632)]()+0x6)*0x2:0x0,_0x139465=this['buttonY'](),_0x3dd708=Graphics[_0x1f8645(0x7d7)]-_0x4855d7*0x2,_0x5f56c9=this[_0x1f8645(0x6b8)]();return new Rectangle(_0x4855d7,_0x139465,_0x3dd708,_0x5f56c9);},Scene_MenuBase[_0x3d8147(0x578)][_0x3d8147(0x6a1)]=function(){const _0x187286=_0x3d8147,_0x3343d5=Graphics[_0x187286(0x7d7)],_0x3438a6=Window_ButtonAssist[_0x187286(0x578)][_0x187286(0x244)](),_0x460efe=0x0;let _0x1cabd6=0x0;if(this['getButtonAssistLocation']()===_0x187286(0x42b))_0x1cabd6=0x0;else{if(_0x187286(0x499)!=='YXRmq'){function _0x1758c9(){const _0x179018=_0x187286;_0x46a244[_0x179018(0x484)](_0x14cc70,_0x5d701a);const _0xb5210b=_0xe5fdb2[_0x179018(0x642)]||0x0;_0x43d031[_0x179018(0x47c)](_0xb5210b);}}else _0x1cabd6=Graphics[_0x187286(0x6b0)]-_0x3438a6;}return new Rectangle(_0x460efe,_0x1cabd6,_0x3343d5,_0x3438a6);},Scene_Menu[_0x3d8147(0x4b8)]=VisuMZ['CoreEngine'][_0x3d8147(0x2df)][_0x3d8147(0x647)][_0x3d8147(0x468)],VisuMZ[_0x3d8147(0x385)]['Scene_Menu_create']=Scene_Menu[_0x3d8147(0x578)][_0x3d8147(0x313)],Scene_Menu[_0x3d8147(0x578)][_0x3d8147(0x313)]=function(){const _0x2b36cc=_0x3d8147;VisuMZ[_0x2b36cc(0x385)][_0x2b36cc(0x709)][_0x2b36cc(0x3f6)](this),this[_0x2b36cc(0x188)]();},Scene_Menu[_0x3d8147(0x578)][_0x3d8147(0x188)]=function(){const _0x2547ef=_0x3d8147;if(this['_commandWindow']){if('oYHAt'!==_0x2547ef(0x538)){function _0x829035(){const _0x5cd0f8=_0x2547ef;this[_0x5cd0f8(0x4c3)]();}}else this[_0x2547ef(0x7ad)][_0x2547ef(0x305)](Scene_Menu[_0x2547ef(0x4b8)][_0x2547ef(0x5db)]);}if(this[_0x2547ef(0x2a8)]){if(_0x2547ef(0x1d0)!=='HWpLz'){function _0x49802b(){const _0x1a8829=_0x2547ef;return _0x439dc3[_0x1a8829(0x4b8)][_0x1a8829(0x147)][_0x1a8829(0x3f6)](this);}}else this[_0x2547ef(0x2a8)][_0x2547ef(0x305)](Scene_Menu['layoutSettings']['GoldBgType']);}this[_0x2547ef(0x610)]&&this[_0x2547ef(0x610)][_0x2547ef(0x305)](Scene_Menu[_0x2547ef(0x4b8)]['StatusBgType']);},Scene_Menu[_0x3d8147(0x578)]['commandWindowRect']=function(){const _0x4aed65=_0x3d8147;return Scene_Menu[_0x4aed65(0x4b8)]['CommandRect'][_0x4aed65(0x3f6)](this);},Scene_Menu[_0x3d8147(0x578)][_0x3d8147(0x1ca)]=function(){const _0x387954=_0x3d8147;return Scene_Menu[_0x387954(0x4b8)][_0x387954(0x147)][_0x387954(0x3f6)](this);},Scene_Menu['prototype'][_0x3d8147(0x28e)]=function(){const _0x1cc7ef=_0x3d8147;return Scene_Menu['layoutSettings']['StatusRect'][_0x1cc7ef(0x3f6)](this);},Scene_Item[_0x3d8147(0x4b8)]=VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x2df)]['MenuLayout']['ItemMenu'],VisuMZ['CoreEngine'][_0x3d8147(0x437)]=Scene_Item['prototype']['create'],Scene_Item[_0x3d8147(0x578)][_0x3d8147(0x313)]=function(){const _0xff8396=_0x3d8147;VisuMZ[_0xff8396(0x385)]['Scene_Item_create'][_0xff8396(0x3f6)](this),this[_0xff8396(0x188)]();},Scene_Item['prototype'][_0x3d8147(0x188)]=function(){const _0x5e167a=_0x3d8147;this['_helpWindow']&&this[_0x5e167a(0x4f8)]['setBackgroundType'](Scene_Item[_0x5e167a(0x4b8)][_0x5e167a(0x1d6)]),this['_categoryWindow']&&this[_0x5e167a(0x51f)][_0x5e167a(0x305)](Scene_Item[_0x5e167a(0x4b8)]['CategoryBgType']),this[_0x5e167a(0x450)]&&this[_0x5e167a(0x450)][_0x5e167a(0x305)](Scene_Item[_0x5e167a(0x4b8)]['ItemBgType']),this[_0x5e167a(0x132)]&&this[_0x5e167a(0x132)][_0x5e167a(0x305)](Scene_Item[_0x5e167a(0x4b8)]['ActorBgType']);},Scene_Item[_0x3d8147(0x578)][_0x3d8147(0x429)]=function(){const _0x44b780=_0x3d8147;return Scene_Item[_0x44b780(0x4b8)][_0x44b780(0x14e)][_0x44b780(0x3f6)](this);},Scene_Item['prototype']['categoryWindowRect']=function(){const _0x573b10=_0x3d8147;return Scene_Item[_0x573b10(0x4b8)]['CategoryRect'][_0x573b10(0x3f6)](this);},Scene_Item[_0x3d8147(0x578)][_0x3d8147(0x671)]=function(){const _0x4eedb6=_0x3d8147;return Scene_Item[_0x4eedb6(0x4b8)][_0x4eedb6(0x54e)][_0x4eedb6(0x3f6)](this);},Scene_Item['prototype'][_0x3d8147(0x68c)]=function(){const _0x440210=_0x3d8147;return Scene_Item['layoutSettings']['ActorRect'][_0x440210(0x3f6)](this);},Scene_Skill['layoutSettings']=VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x2df)]['MenuLayout']['SkillMenu'],VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x590)]=Scene_Skill['prototype'][_0x3d8147(0x313)],Scene_Skill[_0x3d8147(0x578)][_0x3d8147(0x313)]=function(){const _0x31f2d5=_0x3d8147;VisuMZ[_0x31f2d5(0x385)][_0x31f2d5(0x590)]['call'](this),this[_0x31f2d5(0x188)]();},Scene_Skill[_0x3d8147(0x578)][_0x3d8147(0x188)]=function(){const _0x113ff8=_0x3d8147;if(this[_0x113ff8(0x4f8)]){if(_0x113ff8(0x405)===_0x113ff8(0x198)){function _0x368597(){this['_cancelButton']['x']=_0xb16dc4['boxWidth']+0x4;}}else this[_0x113ff8(0x4f8)][_0x113ff8(0x305)](Scene_Skill['layoutSettings'][_0x113ff8(0x1d6)]);}this[_0x113ff8(0x396)]&&this[_0x113ff8(0x396)]['setBackgroundType'](Scene_Skill[_0x113ff8(0x4b8)]['SkillTypeBgType']);this[_0x113ff8(0x610)]&&this[_0x113ff8(0x610)]['setBackgroundType'](Scene_Skill[_0x113ff8(0x4b8)][_0x113ff8(0x466)]);if(this[_0x113ff8(0x450)]){if(_0x113ff8(0x69c)!==_0x113ff8(0x69c)){function _0x518bd6(){const _0xc47941=_0x113ff8;if(_0x1b54e5[_0xc47941(0x170)]())return;_0x500c3f[_0xc47941(0x484)](_0x4b502a,_0x520491);const _0x4f8913=[_0xc47941(0x6ae),_0xc47941(0x6bc),'me','se'];for(const _0x1e6995 of _0x4f8913){const _0x37926b=_0x3a7ee3[_0x1e6995],_0x193898=_0xc47941(0x688)['format'](_0x1e6995);for(const _0xa31e7a of _0x37926b){_0x368357[_0xc47941(0x694)](_0x193898,_0xa31e7a),_0x201b30[_0xc47941(0x7a5)](_0x193898,_0xa31e7a);}}}}else this[_0x113ff8(0x450)]['setBackgroundType'](Scene_Skill['layoutSettings'][_0x113ff8(0x439)]);}if(this[_0x113ff8(0x132)]){if(_0x113ff8(0x2a4)!==_0x113ff8(0x742))this[_0x113ff8(0x132)][_0x113ff8(0x305)](Scene_Skill[_0x113ff8(0x4b8)][_0x113ff8(0x5d4)]);else{function _0x429253(){var _0x113da6=_0x2128ec(_0x1e8ceb['$1']);_0x57ec12+=_0x113da6;}}}},Scene_Skill[_0x3d8147(0x578)]['helpWindowRect']=function(){const _0x551513=_0x3d8147;return Scene_Skill[_0x551513(0x4b8)][_0x551513(0x14e)]['call'](this);},Scene_Skill['prototype'][_0x3d8147(0x442)]=function(){return Scene_Skill['layoutSettings']['SkillTypeRect']['call'](this);},Scene_Skill[_0x3d8147(0x578)][_0x3d8147(0x28e)]=function(){const _0x4c4981=_0x3d8147;return Scene_Skill[_0x4c4981(0x4b8)]['StatusRect'][_0x4c4981(0x3f6)](this);},Scene_Skill[_0x3d8147(0x578)][_0x3d8147(0x671)]=function(){const _0x1f2fb2=_0x3d8147;return Scene_Skill['layoutSettings'][_0x1f2fb2(0x54e)]['call'](this);},Scene_Skill[_0x3d8147(0x578)]['actorWindowRect']=function(){const _0x3b4e56=_0x3d8147;return Scene_Skill[_0x3b4e56(0x4b8)][_0x3b4e56(0x2e3)][_0x3b4e56(0x3f6)](this);},Scene_Equip['layoutSettings']=VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x2df)][_0x3d8147(0x647)]['EquipMenu'],VisuMZ[_0x3d8147(0x385)]['Scene_Equip_create']=Scene_Equip[_0x3d8147(0x578)][_0x3d8147(0x313)],Scene_Equip[_0x3d8147(0x578)][_0x3d8147(0x313)]=function(){const _0x2aebeb=_0x3d8147;VisuMZ[_0x2aebeb(0x385)][_0x2aebeb(0x2ce)][_0x2aebeb(0x3f6)](this),this[_0x2aebeb(0x188)]();},Scene_Equip['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0xbc04e5=_0x3d8147;this[_0xbc04e5(0x4f8)]&&this['_helpWindow'][_0xbc04e5(0x305)](Scene_Equip[_0xbc04e5(0x4b8)][_0xbc04e5(0x1d6)]);if(this[_0xbc04e5(0x610)]){if(_0xbc04e5(0x64c)===_0xbc04e5(0x64c))this[_0xbc04e5(0x610)]['setBackgroundType'](Scene_Equip[_0xbc04e5(0x4b8)][_0xbc04e5(0x466)]);else{function _0x3171bf(){const _0x3a9b5e=_0xbc04e5;return _0x37ac13[_0x3a9b5e(0x385)][_0x3a9b5e(0x2df)]['Window'][_0x3a9b5e(0x210)];}}}this[_0xbc04e5(0x7ad)]&&this[_0xbc04e5(0x7ad)][_0xbc04e5(0x305)](Scene_Equip[_0xbc04e5(0x4b8)][_0xbc04e5(0x5db)]),this[_0xbc04e5(0x1e2)]&&this[_0xbc04e5(0x1e2)][_0xbc04e5(0x305)](Scene_Equip[_0xbc04e5(0x4b8)]['SlotBgType']),this['_itemWindow']&&this['_itemWindow']['setBackgroundType'](Scene_Equip[_0xbc04e5(0x4b8)]['ItemBgType']);},Scene_Equip[_0x3d8147(0x578)]['helpWindowRect']=function(){const _0x2b8fbf=_0x3d8147;return Scene_Equip[_0x2b8fbf(0x4b8)][_0x2b8fbf(0x14e)]['call'](this);},Scene_Equip['prototype'][_0x3d8147(0x28e)]=function(){const _0x23e9a6=_0x3d8147;return Scene_Equip[_0x23e9a6(0x4b8)]['StatusRect'][_0x23e9a6(0x3f6)](this);},Scene_Equip[_0x3d8147(0x578)][_0x3d8147(0x4f7)]=function(){const _0xf336e1=_0x3d8147;return Scene_Equip[_0xf336e1(0x4b8)][_0xf336e1(0x4ef)][_0xf336e1(0x3f6)](this);},Scene_Equip['prototype']['slotWindowRect']=function(){const _0x5be47e=_0x3d8147;return Scene_Equip[_0x5be47e(0x4b8)]['SlotRect'][_0x5be47e(0x3f6)](this);},Scene_Equip[_0x3d8147(0x578)][_0x3d8147(0x671)]=function(){const _0x4b5884=_0x3d8147;return Scene_Equip['layoutSettings'][_0x4b5884(0x54e)][_0x4b5884(0x3f6)](this);},Scene_Status[_0x3d8147(0x4b8)]=VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x2df)][_0x3d8147(0x647)][_0x3d8147(0x62b)],VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x134)]=Scene_Status[_0x3d8147(0x578)]['create'],Scene_Status['prototype'][_0x3d8147(0x313)]=function(){const _0x48380e=_0x3d8147;VisuMZ[_0x48380e(0x385)][_0x48380e(0x134)]['call'](this),this[_0x48380e(0x188)]();},Scene_Status[_0x3d8147(0x578)][_0x3d8147(0x188)]=function(){const _0x58e26e=_0x3d8147;this[_0x58e26e(0x4e2)]&&this[_0x58e26e(0x4e2)][_0x58e26e(0x305)](Scene_Status[_0x58e26e(0x4b8)][_0x58e26e(0x37b)]),this[_0x58e26e(0x610)]&&this['_statusWindow'][_0x58e26e(0x305)](Scene_Status[_0x58e26e(0x4b8)][_0x58e26e(0x466)]),this['_statusParamsWindow']&&this['_statusParamsWindow'][_0x58e26e(0x305)](Scene_Status[_0x58e26e(0x4b8)][_0x58e26e(0x78b)]),this[_0x58e26e(0x1bd)]&&this[_0x58e26e(0x1bd)][_0x58e26e(0x305)](Scene_Status[_0x58e26e(0x4b8)][_0x58e26e(0x3a7)]);},Scene_Status[_0x3d8147(0x578)][_0x3d8147(0x17d)]=function(){const _0x3014be=_0x3d8147;return Scene_Status[_0x3014be(0x4b8)][_0x3014be(0x14f)]['call'](this);},Scene_Status[_0x3d8147(0x578)]['statusWindowRect']=function(){const _0x3e87bc=_0x3d8147;return Scene_Status[_0x3e87bc(0x4b8)][_0x3e87bc(0x306)][_0x3e87bc(0x3f6)](this);},Scene_Status[_0x3d8147(0x578)][_0x3d8147(0x68e)]=function(){const _0x80e1a1=_0x3d8147;return Scene_Status[_0x80e1a1(0x4b8)][_0x80e1a1(0x3ad)][_0x80e1a1(0x3f6)](this);},Scene_Status[_0x3d8147(0x578)][_0x3d8147(0x2f4)]=function(){const _0x3e8272=_0x3d8147;return Scene_Status['layoutSettings'][_0x3e8272(0x638)][_0x3e8272(0x3f6)](this);},Scene_Options[_0x3d8147(0x4b8)]=VisuMZ['CoreEngine'][_0x3d8147(0x2df)][_0x3d8147(0x647)][_0x3d8147(0x4a3)],VisuMZ['CoreEngine'][_0x3d8147(0x4fb)]=Scene_Options[_0x3d8147(0x578)][_0x3d8147(0x313)],Scene_Options[_0x3d8147(0x578)]['create']=function(){const _0x4d7158=_0x3d8147;VisuMZ[_0x4d7158(0x385)][_0x4d7158(0x4fb)][_0x4d7158(0x3f6)](this),this[_0x4d7158(0x188)]();},Scene_Options[_0x3d8147(0x578)]['setCoreEngineUpdateWindowBg']=function(){const _0x1308a9=_0x3d8147;if(this[_0x1308a9(0x7c3)]){if(_0x1308a9(0x4c5)!=='KFmTD')this['_optionsWindow'][_0x1308a9(0x305)](Scene_Options[_0x1308a9(0x4b8)][_0x1308a9(0x43a)]);else{function _0x3836e9(){this['catchNormalError'](_0x4cc824);}}}},Scene_Options[_0x3d8147(0x578)][_0x3d8147(0x367)]=function(){return Scene_Options['layoutSettings']['OptionsRect']['call'](this);},Scene_Save[_0x3d8147(0x4b8)]=VisuMZ[_0x3d8147(0x385)]['Settings'][_0x3d8147(0x647)][_0x3d8147(0x6ee)],Scene_Save['prototype'][_0x3d8147(0x313)]=function(){const _0x395a12=_0x3d8147;Scene_File[_0x395a12(0x578)][_0x395a12(0x313)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Save['prototype'][_0x3d8147(0x188)]=function(){const _0x1abb38=_0x3d8147;if(this[_0x1abb38(0x4f8)]){if(_0x1abb38(0x169)==='aAbOM'){function _0xbc2b3e(){const _0xf11b38=_0x1abb38;this[_0xf11b38(0x65f)]='FV';}}else this['_helpWindow'][_0x1abb38(0x305)](Scene_Save[_0x1abb38(0x4b8)]['HelpBgType']);}this[_0x1abb38(0x63b)]&&this[_0x1abb38(0x63b)][_0x1abb38(0x305)](Scene_Save['layoutSettings'][_0x1abb38(0x2b1)]);},Scene_Save[_0x3d8147(0x578)][_0x3d8147(0x429)]=function(){const _0xe3e13b=_0x3d8147;return Scene_Save[_0xe3e13b(0x4b8)]['HelpRect'][_0xe3e13b(0x3f6)](this);},Scene_Save[_0x3d8147(0x578)][_0x3d8147(0x497)]=function(){const _0x5d34cb=_0x3d8147;return Scene_Save[_0x5d34cb(0x4b8)][_0x5d34cb(0x291)][_0x5d34cb(0x3f6)](this);},Scene_Load[_0x3d8147(0x4b8)]=VisuMZ['CoreEngine'][_0x3d8147(0x2df)][_0x3d8147(0x647)][_0x3d8147(0x371)],Scene_Load[_0x3d8147(0x578)][_0x3d8147(0x313)]=function(){const _0x6e7afb=_0x3d8147;Scene_File['prototype'][_0x6e7afb(0x313)][_0x6e7afb(0x3f6)](this),this[_0x6e7afb(0x188)]();},Scene_Load[_0x3d8147(0x578)]['setCoreEngineUpdateWindowBg']=function(){const _0x46af16=_0x3d8147;if(this[_0x46af16(0x4f8)]){if(_0x46af16(0x212)===_0x46af16(0x212))this['_helpWindow'][_0x46af16(0x305)](Scene_Load[_0x46af16(0x4b8)]['HelpBgType']);else{function _0x4a0021(){const _0x2bca3b=_0x46af16;this[_0x2bca3b(0x4f8)][_0x2bca3b(0x305)](_0x37b81a['layoutSettings'][_0x2bca3b(0x1d6)]);}}}if(this[_0x46af16(0x63b)]){if(_0x46af16(0x3f7)===_0x46af16(0x3f7))this['_listWindow'][_0x46af16(0x305)](Scene_Load['layoutSettings'][_0x46af16(0x2b1)]);else{function _0x25c136(){const _0xf62922=_0x46af16;this[_0xf62922(0x7ad)]['setBackgroundType'](_0x108858[_0xf62922(0x4b8)][_0xf62922(0x5db)]);}}}},Scene_Load['prototype']['helpWindowRect']=function(){return Scene_Load['layoutSettings']['HelpRect']['call'](this);},Scene_Load[_0x3d8147(0x578)][_0x3d8147(0x497)]=function(){const _0x2d7a7c=_0x3d8147;return Scene_Load[_0x2d7a7c(0x4b8)]['ListRect'][_0x2d7a7c(0x3f6)](this);},Scene_GameEnd['layoutSettings']=VisuMZ['CoreEngine'][_0x3d8147(0x2df)]['MenuLayout'][_0x3d8147(0x3a6)],VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x68b)]=Scene_GameEnd[_0x3d8147(0x578)][_0x3d8147(0x781)],Scene_GameEnd[_0x3d8147(0x578)]['createBackground']=function(){const _0x1a550f=_0x3d8147;Scene_MenuBase['prototype'][_0x1a550f(0x781)][_0x1a550f(0x3f6)](this);},Scene_GameEnd['prototype'][_0x3d8147(0x7c2)]=function(){const _0x3d95a3=_0x3d8147,_0x1209ff=this[_0x3d95a3(0x4f7)]();this[_0x3d95a3(0x7ad)]=new Window_GameEnd(_0x1209ff),this[_0x3d95a3(0x7ad)][_0x3d95a3(0x545)]('cancel',this['popScene'][_0x3d95a3(0x2f9)](this)),this[_0x3d95a3(0x226)](this[_0x3d95a3(0x7ad)]),this[_0x3d95a3(0x7ad)][_0x3d95a3(0x305)](Scene_GameEnd[_0x3d95a3(0x4b8)]['CommandBgType']);},Scene_GameEnd[_0x3d8147(0x578)][_0x3d8147(0x4f7)]=function(){const _0x1fff21=_0x3d8147;return Scene_GameEnd[_0x1fff21(0x4b8)]['CommandRect']['call'](this);},Scene_Shop[_0x3d8147(0x4b8)]=VisuMZ[_0x3d8147(0x385)]['Settings'][_0x3d8147(0x647)][_0x3d8147(0x2e4)],VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x72f)]=Scene_Shop['prototype'][_0x3d8147(0x313)],Scene_Shop['prototype'][_0x3d8147(0x313)]=function(){const _0x3ed83e=_0x3d8147;VisuMZ[_0x3ed83e(0x385)]['Scene_Shop_create'][_0x3ed83e(0x3f6)](this),this[_0x3ed83e(0x188)]();},Scene_Shop['prototype'][_0x3d8147(0x188)]=function(){const _0x24ec51=_0x3d8147;this['_helpWindow']&&this['_helpWindow'][_0x24ec51(0x305)](Scene_Shop['layoutSettings']['HelpBgType']);this[_0x24ec51(0x2a8)]&&this[_0x24ec51(0x2a8)]['setBackgroundType'](Scene_Shop[_0x24ec51(0x4b8)][_0x24ec51(0x3b4)]);this['_commandWindow']&&this[_0x24ec51(0x7ad)][_0x24ec51(0x305)](Scene_Shop[_0x24ec51(0x4b8)][_0x24ec51(0x5db)]);if(this['_dummyWindow']){if(_0x24ec51(0x7cd)!==_0x24ec51(0x4c4))this[_0x24ec51(0x38c)][_0x24ec51(0x305)](Scene_Shop['layoutSettings'][_0x24ec51(0x6f3)]);else{function _0x40caf9(){const _0xc6e95c=_0x24ec51;if(this[_0xc6e95c(0x5d3)]())_0x2722c4=_0x326be8[_0xc6e95c(0x498)](_0x4a54fa);_0x381e90[_0xc6e95c(0x385)][_0xc6e95c(0x4e7)]['call'](this,_0x5e7e21,_0x4af2d4,_0x497d10,_0x2c5fad,_0x2f9580);}}}this[_0x24ec51(0x3ab)]&&this[_0x24ec51(0x3ab)][_0x24ec51(0x305)](Scene_Shop[_0x24ec51(0x4b8)][_0x24ec51(0x21d)]);if(this[_0x24ec51(0x610)]){if(_0x24ec51(0x5a7)!==_0x24ec51(0x1fb))this[_0x24ec51(0x610)]['setBackgroundType'](Scene_Shop['layoutSettings'][_0x24ec51(0x466)]);else{function _0x1afed5(){const _0x55e3c2=_0x24ec51;_0x269699&&_0x303ea5&&_0x15ea0c[_0x55e3c2(0x297)]&&this[_0x55e3c2(0x69e)](_0x3a48bb['note']);const _0x596554=_0x3df845[_0x14a46a];_0x596554&&this[_0x55e3c2(0x69e)](_0x596554[_0x55e3c2(0x665)]);}}}this[_0x24ec51(0x2e0)]&&this['_buyWindow'][_0x24ec51(0x305)](Scene_Shop['layoutSettings'][_0x24ec51(0x4b1)]),this[_0x24ec51(0x51f)]&&this[_0x24ec51(0x51f)][_0x24ec51(0x305)](Scene_Shop[_0x24ec51(0x4b8)][_0x24ec51(0x372)]),this[_0x24ec51(0x4df)]&&this[_0x24ec51(0x4df)][_0x24ec51(0x305)](Scene_Shop[_0x24ec51(0x4b8)][_0x24ec51(0x6e6)]);},Scene_Shop[_0x3d8147(0x578)]['helpWindowRect']=function(){const _0x1e464a=_0x3d8147;return Scene_Shop[_0x1e464a(0x4b8)][_0x1e464a(0x14e)][_0x1e464a(0x3f6)](this);},Scene_Shop[_0x3d8147(0x578)][_0x3d8147(0x1ca)]=function(){const _0x578558=_0x3d8147;return Scene_Shop[_0x578558(0x4b8)][_0x578558(0x147)][_0x578558(0x3f6)](this);},Scene_Shop[_0x3d8147(0x578)][_0x3d8147(0x4f7)]=function(){const _0x4db383=_0x3d8147;return Scene_Shop[_0x4db383(0x4b8)][_0x4db383(0x4ef)][_0x4db383(0x3f6)](this);},Scene_Shop[_0x3d8147(0x578)][_0x3d8147(0x3ba)]=function(){const _0x42975d=_0x3d8147;return Scene_Shop[_0x42975d(0x4b8)][_0x42975d(0x4e9)][_0x42975d(0x3f6)](this);},Scene_Shop['prototype'][_0x3d8147(0x40c)]=function(){const _0x24e584=_0x3d8147;return Scene_Shop[_0x24e584(0x4b8)][_0x24e584(0x1a1)][_0x24e584(0x3f6)](this);},Scene_Shop[_0x3d8147(0x578)]['statusWindowRect']=function(){const _0x5946f0=_0x3d8147;return Scene_Shop[_0x5946f0(0x4b8)][_0x5946f0(0x306)][_0x5946f0(0x3f6)](this);},Scene_Shop[_0x3d8147(0x578)]['buyWindowRect']=function(){const _0xfc59ec=_0x3d8147;return Scene_Shop[_0xfc59ec(0x4b8)][_0xfc59ec(0x412)][_0xfc59ec(0x3f6)](this);},Scene_Shop[_0x3d8147(0x578)]['categoryWindowRect']=function(){const _0x2cced3=_0x3d8147;return Scene_Shop[_0x2cced3(0x4b8)][_0x2cced3(0x71b)][_0x2cced3(0x3f6)](this);},Scene_Shop[_0x3d8147(0x578)]['sellWindowRect']=function(){const _0x15136e=_0x3d8147;return Scene_Shop[_0x15136e(0x4b8)]['SellRect'][_0x15136e(0x3f6)](this);},Scene_Name[_0x3d8147(0x4b8)]=VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x2df)][_0x3d8147(0x647)]['NameMenu'],VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x4ab)]=Scene_Name[_0x3d8147(0x578)][_0x3d8147(0x313)],Scene_Name[_0x3d8147(0x578)][_0x3d8147(0x313)]=function(){const _0x5b8897=_0x3d8147;VisuMZ[_0x5b8897(0x385)][_0x5b8897(0x4ab)][_0x5b8897(0x3f6)](this),this[_0x5b8897(0x188)]();},Scene_Name[_0x3d8147(0x578)]['setCoreEngineUpdateWindowBg']=function(){const _0x4f51c3=_0x3d8147;if(this[_0x4f51c3(0x708)]){if(_0x4f51c3(0x1bf)===_0x4f51c3(0x587)){function _0x125462(){const _0x18ba63=_0x4f51c3;this['_statusEquipWindow'][_0x18ba63(0x305)](_0x3a7095[_0x18ba63(0x4b8)][_0x18ba63(0x3a7)]);}}else this[_0x4f51c3(0x708)][_0x4f51c3(0x305)](Scene_Name[_0x4f51c3(0x4b8)][_0x4f51c3(0x595)]);}this[_0x4f51c3(0x4d3)]&&this[_0x4f51c3(0x4d3)]['setBackgroundType'](Scene_Name[_0x4f51c3(0x4b8)][_0x4f51c3(0x381)]);},Scene_Name[_0x3d8147(0x578)][_0x3d8147(0x5ff)]=function(){return 0x0;},Scene_Name[_0x3d8147(0x578)][_0x3d8147(0x57a)]=function(){const _0x351e5e=_0x3d8147;return Scene_Name['layoutSettings']['EditRect'][_0x351e5e(0x3f6)](this);},Scene_Name['prototype'][_0x3d8147(0x60e)]=function(){const _0x4f5abd=_0x3d8147;return Scene_Name[_0x4f5abd(0x4b8)][_0x4f5abd(0x6a2)][_0x4f5abd(0x3f6)](this);},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x40a)]=Scene_Battle[_0x3d8147(0x578)][_0x3d8147(0x50c)],Scene_Battle[_0x3d8147(0x578)][_0x3d8147(0x50c)]=function(){const _0x1b0fd7=_0x3d8147;VisuMZ[_0x1b0fd7(0x385)][_0x1b0fd7(0x40a)]['call'](this);if($gameTemp['_playTestFastMode'])this['updatePlayTestF7']();},Scene_Battle[_0x3d8147(0x578)][_0x3d8147(0x4e0)]=function(){const _0x23a9ed=_0x3d8147;!BattleManager[_0x23a9ed(0x1ee)]()&&!this['_playtestF7Looping']&&!$gameMessage[_0x23a9ed(0x77d)]()&&(this['_playtestF7Looping']=!![],this[_0x23a9ed(0x50c)](),SceneManager[_0x23a9ed(0x1c2)](),this['_playtestF7Looping']=![]);},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x51d)]=Scene_Battle[_0x3d8147(0x578)][_0x3d8147(0x40f)],Scene_Battle[_0x3d8147(0x578)][_0x3d8147(0x40f)]=function(){const _0x2c1f04=_0x3d8147;VisuMZ[_0x2c1f04(0x385)][_0x2c1f04(0x51d)][_0x2c1f04(0x3f6)](this),SceneManager['isSideButtonLayout']()&&this['repositionCancelButtonSideButtonLayout']();},Scene_Battle['prototype'][_0x3d8147(0x21a)]=function(){const _0x4d376c=_0x3d8147;this[_0x4d376c(0x3ea)]['x']=Graphics['boxWidth']+0x4;if(this[_0x4d376c(0x3b1)]())this[_0x4d376c(0x3ea)]['y']=Graphics['boxHeight']-this[_0x4d376c(0x6b8)]();else{if(_0x4d376c(0x24d)===_0x4d376c(0x24d))this['_cancelButton']['y']=0x0;else{function _0x26b265(){const _0x2d102a=_0x4d376c,_0x2a3536=this['picture']();!_0x2a3536[_0x2d102a(0x233)]()?_0x22a5ea[_0x2d102a(0x385)]['Sprite_Picture_updateOrigin']['call'](this):(this[_0x2d102a(0x233)]['x']=_0x2a3536[_0x2d102a(0x233)]()['x'],this[_0x2d102a(0x233)]['y']=_0x2a3536[_0x2d102a(0x233)]()['y']);}}}},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x211)]=Sprite_Button[_0x3d8147(0x578)]['initialize'],Sprite_Button[_0x3d8147(0x578)][_0x3d8147(0x5b9)]=function(_0x29d1e5){const _0x239489=_0x3d8147;VisuMZ['CoreEngine'][_0x239489(0x211)][_0x239489(0x3f6)](this,_0x29d1e5),this[_0x239489(0x78d)]();},Sprite_Button[_0x3d8147(0x578)][_0x3d8147(0x78d)]=function(){const _0x498477=_0x3d8147,_0x478c4d=VisuMZ[_0x498477(0x385)]['Settings']['UI'];this[_0x498477(0x556)]=![];switch(this['_buttonType']){case'cancel':this['_isButtonHidden']=!_0x478c4d[_0x498477(0x425)];break;case _0x498477(0x3af):case _0x498477(0x568):this['_isButtonHidden']=!_0x478c4d['pagedownShowButton'];break;case'down':case'up':case _0x498477(0x663):case'up2':case'ok':this[_0x498477(0x556)]=!_0x478c4d[_0x498477(0x48a)];break;case'menu':this[_0x498477(0x556)]=!_0x478c4d[_0x498477(0x3e9)];break;}},VisuMZ['CoreEngine'][_0x3d8147(0x14d)]=Sprite_Button['prototype']['updateOpacity'],Sprite_Button['prototype']['updateOpacity']=function(){const _0x1b40d4=_0x3d8147;if(SceneManager[_0x1b40d4(0x3b6)]()||this[_0x1b40d4(0x556)])this['hideButtonFromView']();else{if(_0x1b40d4(0x77c)!==_0x1b40d4(0x29a))VisuMZ['CoreEngine'][_0x1b40d4(0x14d)][_0x1b40d4(0x3f6)](this);else{function _0x420286(){const _0x3d6268=_0x1b40d4;_0x1de8c6[_0x3d6268(0x64a)]&&(this[_0x3d6268(0x7b8)]=_0x3d6268(0x1dd));}}}},Sprite_Button[_0x3d8147(0x578)][_0x3d8147(0x485)]=function(){const _0x498c83=_0x3d8147;this[_0x498c83(0x660)]=![],this[_0x498c83(0x364)]=0x0,this['x']=Graphics[_0x498c83(0x300)]*0xa,this['y']=Graphics[_0x498c83(0x195)]*0xa;},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x598)]=Sprite_Battler['prototype'][_0x3d8147(0x7be)],Sprite_Battler['prototype'][_0x3d8147(0x7be)]=function(_0x50b053,_0x5c239a,_0x4c52cd){const _0x24f6f1=_0x3d8147;(this[_0x24f6f1(0x72d)]!==_0x50b053||this[_0x24f6f1(0x1d8)]!==_0x5c239a)&&(this[_0x24f6f1(0x702)](_0x24f6f1(0x2de)),this[_0x24f6f1(0x763)]=_0x4c52cd),VisuMZ[_0x24f6f1(0x385)][_0x24f6f1(0x598)]['call'](this,_0x50b053,_0x5c239a,_0x4c52cd);},Sprite_Battler[_0x3d8147(0x578)][_0x3d8147(0x702)]=function(_0x134956){const _0xdeca9=_0x3d8147;this[_0xdeca9(0x395)]=_0x134956;},Sprite_Battler['prototype']['updateMove']=function(){const _0x125be4=_0x3d8147;if(this[_0x125be4(0x731)]<=0x0)return;const _0x2cf432=this[_0x125be4(0x731)],_0x4718e6=this[_0x125be4(0x763)],_0x22812f=this[_0x125be4(0x395)];this[_0x125be4(0x43b)]=this[_0x125be4(0x54b)](this[_0x125be4(0x43b)],this[_0x125be4(0x72d)],_0x2cf432,_0x4718e6,_0x22812f),this[_0x125be4(0x5ca)]=this[_0x125be4(0x54b)](this['_offsetY'],this[_0x125be4(0x1d8)],_0x2cf432,_0x4718e6,_0x22812f),this[_0x125be4(0x731)]--;if(this[_0x125be4(0x731)]<=0x0)this[_0x125be4(0x710)]();},Sprite_Battler[_0x3d8147(0x578)][_0x3d8147(0x54b)]=function(_0x3002c9,_0x2646e1,_0x2080f9,_0x2a3d9b,_0x4c1734){const _0x2b4094=_0x3d8147,_0x3ef699=VisuMZ[_0x2b4094(0x427)]((_0x2a3d9b-_0x2080f9)/_0x2a3d9b,_0x4c1734||_0x2b4094(0x2de)),_0x5a5084=VisuMZ[_0x2b4094(0x427)]((_0x2a3d9b-_0x2080f9+0x1)/_0x2a3d9b,_0x4c1734||'Linear'),_0x4612f4=(_0x3002c9-_0x2646e1*_0x3ef699)/(0x1-_0x3ef699);return _0x4612f4+(_0x2646e1-_0x4612f4)*_0x5a5084;},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x563)]=Sprite_Actor[_0x3d8147(0x578)][_0x3d8147(0x28f)],Sprite_Actor[_0x3d8147(0x578)]['setActorHome']=function(_0x53efa1){const _0x17428c=_0x3d8147;if(VisuMZ[_0x17428c(0x385)][_0x17428c(0x2df)]['UI'][_0x17428c(0x44c)]){if(_0x17428c(0x177)===_0x17428c(0x2d2)){function _0x19e98a(){const _0x449e1d=_0x17428c;_0x1dd708-=_0xb853d0['prototype'][_0x449e1d(0x244)]();}}else this[_0x17428c(0x74c)](_0x53efa1);}else VisuMZ['CoreEngine'][_0x17428c(0x563)][_0x17428c(0x3f6)](this,_0x53efa1);},Sprite_Actor[_0x3d8147(0x578)][_0x3d8147(0x74c)]=function(_0x5bd6b4){const _0x183aa5=_0x3d8147;let _0xef438f=Math[_0x183aa5(0x687)](Graphics['width']/0x2+0xc0);_0xef438f-=Math[_0x183aa5(0x27e)]((Graphics['width']-Graphics[_0x183aa5(0x7d7)])/0x2),_0xef438f+=_0x5bd6b4*0x20;let _0x4cfecc=Graphics['height']-0xc8-$gameParty[_0x183aa5(0x283)]()*0x30;_0x4cfecc-=Math[_0x183aa5(0x27e)]((Graphics[_0x183aa5(0x195)]-Graphics[_0x183aa5(0x6b0)])/0x2),_0x4cfecc+=_0x5bd6b4*0x30,this[_0x183aa5(0x279)](_0xef438f,_0x4cfecc);},Sprite_Actor[_0x3d8147(0x578)][_0x3d8147(0x5f0)]=function(){const _0x2b8b4a=_0x3d8147;this[_0x2b8b4a(0x7be)](0x4b0,0x0,0x78);},Sprite_Animation['prototype'][_0x3d8147(0x2e6)]=function(_0x25272e){const _0x38900b=_0x3d8147;this[_0x38900b(0x4da)]=_0x25272e;},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x312)]=Sprite_Animation[_0x3d8147(0x578)][_0x3d8147(0x2a5)],Sprite_Animation['prototype'][_0x3d8147(0x2a5)]=function(){const _0x35df06=_0x3d8147;if(this[_0x35df06(0x4da)])return;VisuMZ['CoreEngine'][_0x35df06(0x312)][_0x35df06(0x3f6)](this);},Sprite_Animation[_0x3d8147(0x578)][_0x3d8147(0x168)]=function(_0x192eee){const _0x4f2c63=_0x3d8147;if(_0x192eee[_0x4f2c63(0x4bc)]){}const _0x281fd8=this[_0x4f2c63(0x219)][_0x4f2c63(0x665)];let _0x2005b9=_0x192eee['height']*_0x192eee[_0x4f2c63(0x459)]['y'],_0xdcd14e=0x0,_0x316b25=-_0x2005b9/0x2;if(_0x281fd8[_0x4f2c63(0x143)](/<(?:HEAD|HEADER|TOP)>/i))_0x316b25=-_0x2005b9;if(_0x281fd8[_0x4f2c63(0x143)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x316b25=0x0;if(_0x281fd8[_0x4f2c63(0x143)](/<(?:LEFT)>/i))_0xdcd14e=-_0x192eee[_0x4f2c63(0x300)]/0x2;if(_0x281fd8['match'](/<(?:RIGHT)>/i))_0x316b25=_0x192eee[_0x4f2c63(0x300)]/0x2;if(_0x281fd8[_0x4f2c63(0x143)](/<ANCHOR X:[ ](\d+\.?\d*)>/i))_0xdcd14e=Number(RegExp['$1'])*_0x192eee[_0x4f2c63(0x300)];_0x281fd8[_0x4f2c63(0x143)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x316b25=(0x1-Number(RegExp['$1']))*-_0x2005b9);if(_0x281fd8[_0x4f2c63(0x143)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)){if(_0x4f2c63(0x339)===_0x4f2c63(0x2ac)){function _0x4be962(){const _0x5d2b8b=_0x4f2c63,_0x23b319=_0x268d7f['Abbreviation'],_0x23427d=_0x294f16[_0x5d2b8b(0x400)],_0x4681ea=_0x37ffee[_0x5d2b8b(0x6b5)],_0x2fb816=_0x9d7155[_0x5d2b8b(0x242)],_0x4302ba=new _0x3aee2e(_0x182a37['ValueJS']);_0x39a526[_0x5d2b8b(0x385)]['CustomParamNames'][_0x23b319[_0x5d2b8b(0x7bb)]()['trim']()]=_0x23427d,_0x443b31[_0x5d2b8b(0x385)][_0x5d2b8b(0x1e3)][_0x23b319[_0x5d2b8b(0x7bb)]()[_0x5d2b8b(0x34a)]()]=_0x4681ea,_0x172844[_0x5d2b8b(0x385)][_0x5d2b8b(0x175)][_0x23b319[_0x5d2b8b(0x7bb)]()[_0x5d2b8b(0x34a)]()]=_0x2fb816,_0x2aa55f[_0x5d2b8b(0x385)]['CustomParamAbb'][_0x23b319[_0x5d2b8b(0x7bb)]()[_0x5d2b8b(0x34a)]()]=_0x23b319,_0x40e264[_0x5d2b8b(0x5b0)](_0xc7b24d[_0x5d2b8b(0x578)],_0x23b319,{'get'(){const _0x40adce=_0x5d2b8b,_0xc00665=_0x4302ba['call'](this);return _0x2fb816===_0x40adce(0x5e9)?_0x4e5ddb[_0x40adce(0x687)](_0xc00665):_0xc00665;}});}}else _0xdcd14e=Number(RegExp['$1'])*_0x192eee['width'],_0x316b25=(0x1-Number(RegExp['$2']))*-_0x2005b9;}if(_0x281fd8[_0x4f2c63(0x143)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0xdcd14e+=Number(RegExp['$1']);if(_0x281fd8[_0x4f2c63(0x143)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x316b25+=Number(RegExp['$1']);if(_0x281fd8['match'](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x4f2c63(0x75f)===_0x4f2c63(0x41a)){function _0x453efa(){const _0x5300bf=_0x4f2c63;return _0x5cd641[_0x5300bf(0x385)][_0x5300bf(0x2df)]['QoL']['AccuracyBoost']&&this[_0x5300bf(0x48f)]()[_0x5300bf(0x205)]()?this[_0x5300bf(0x48f)]()[_0x5300bf(0x31e)]+0.05:this[_0x5300bf(0x48f)]()['hit'];}}else _0xdcd14e+=Number(RegExp['$1']),_0x316b25+=Number(RegExp['$2']);}const _0x506b42=new Point(_0xdcd14e,_0x316b25);return _0x192eee['updateTransform'](),_0x192eee[_0x4f2c63(0x53e)][_0x4f2c63(0x3ff)](_0x506b42);},Sprite_AnimationMV[_0x3d8147(0x578)]['setMute']=function(_0x5368db){const _0x3c846f=_0x3d8147;this[_0x3c846f(0x4da)]=_0x5368db;},VisuMZ['CoreEngine']['Sprite_AnimationMV_processTimingData']=Sprite_AnimationMV['prototype']['processTimingData'],Sprite_AnimationMV['prototype']['processTimingData']=function(_0x4a86bb){const _0x548629=_0x3d8147;if(this[_0x548629(0x4da)]){if(_0x548629(0x5ea)===_0x548629(0x5ea))_0x4a86bb=JsonEx[_0x548629(0x34d)](_0x4a86bb),_0x4a86bb['se'][_0x548629(0x741)]=0x0;else{function _0x3dc6a1(){const _0x19ad6f=_0x548629;_0x1424f2=_0x387ec5||0x10e,this[_0x19ad6f(0x133)]();if(_0x3c5f71[_0x19ad6f(0x385)][_0x19ad6f(0x2df)]['UI']['TextCodeNicknames'])this[_0x19ad6f(0x421)](_0x48c277[_0x19ad6f(0x3e4)](),_0x4c026e,_0x3d98ec,_0x4c4a47);else{const _0x13bbaf=_0x44ef54[_0x19ad6f(0x3e4)]()[_0x19ad6f(0x5a9)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x3e2148[_0x19ad6f(0x3e4)](),_0x5d7ba4,_0x567382,_0x4cf62c);}}}}VisuMZ[_0x548629(0x385)][_0x548629(0x6d2)][_0x548629(0x3f6)](this,_0x4a86bb);},Sprite_Damage[_0x3d8147(0x578)][_0x3d8147(0x4a0)]=function(_0x40bc96){const _0x3644b0=_0x3d8147;let _0x3bf8e9=Math['abs'](_0x40bc96)[_0x3644b0(0x4ea)]();this[_0x3644b0(0x5d3)]()&&(_0x3bf8e9=VisuMZ[_0x3644b0(0x498)](_0x3bf8e9));const _0xd53a86=this['fontSize'](),_0x3199de=Math['floor'](_0xd53a86*0.75);for(let _0x1792b3=0x0;_0x1792b3<_0x3bf8e9[_0x3644b0(0x278)];_0x1792b3++){if('pzrJg'!=='pzrJg'){function _0x23b6ad(){const _0x57b883=_0x3644b0;if(this[_0x57b883(0x588)][_0x57b883(0x7c3)])this['_scene'][_0x57b883(0x7c3)][_0x57b883(0x718)]();if(this['_scene'][_0x57b883(0x63b)])this[_0x57b883(0x588)][_0x57b883(0x63b)]['refresh']();}}else{const _0x2f8180=this[_0x3644b0(0x5ee)](_0x3199de,_0xd53a86);_0x2f8180[_0x3644b0(0x61f)]['drawText'](_0x3bf8e9[_0x1792b3],0x0,0x0,_0x3199de,_0xd53a86,_0x3644b0(0x56f)),_0x2f8180['x']=(_0x1792b3-(_0x3bf8e9[_0x3644b0(0x278)]-0x1)/0x2)*_0x3199de,_0x2f8180['dy']=-_0x1792b3;}}},Sprite_Damage[_0x3d8147(0x578)]['useDigitGrouping']=function(){const _0xfa83d3=_0x3d8147;return VisuMZ[_0xfa83d3(0x385)][_0xfa83d3(0x2df)][_0xfa83d3(0x672)][_0xfa83d3(0x3de)];},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x683)]=Sprite_Gauge['prototype'][_0x3d8147(0x4d9)],Sprite_Gauge[_0x3d8147(0x578)][_0x3d8147(0x4d9)]=function(){const _0x578849=_0x3d8147;return VisuMZ[_0x578849(0x385)][_0x578849(0x683)][_0x578849(0x3f6)](this)[_0x578849(0x7ae)](0x0,0x1);},VisuMZ['CoreEngine']['Sprite_Gauge_currentValue']=Sprite_Gauge['prototype'][_0x3d8147(0x3f5)],Sprite_Gauge[_0x3d8147(0x578)]['currentValue']=function(){const _0xc84fd0=_0x3d8147;let _0x4b4ec1=VisuMZ[_0xc84fd0(0x385)][_0xc84fd0(0x593)][_0xc84fd0(0x3f6)](this);return _0x4b4ec1;},Sprite_Gauge[_0x3d8147(0x578)][_0x3d8147(0x748)]=function(){const _0x2c4f54=_0x3d8147;let _0x50b5d2=this[_0x2c4f54(0x3f5)]();this[_0x2c4f54(0x5d3)]()&&(_0x50b5d2=VisuMZ['GroupDigits'](_0x50b5d2));const _0x4e67b7=this[_0x2c4f54(0x1cf)]()-0x1,_0x440b6e=this[_0x2c4f54(0x20f)]();this[_0x2c4f54(0x1ad)](),this[_0x2c4f54(0x61f)][_0x2c4f54(0x248)](_0x50b5d2,0x0,0x0,_0x4e67b7,_0x440b6e,_0x2c4f54(0x5eb));},Sprite_Gauge['prototype'][_0x3d8147(0x14a)]=function(){return 0x3;},Sprite_Gauge['prototype'][_0x3d8147(0x5d3)]=function(){const _0x2276db=_0x3d8147;return VisuMZ['CoreEngine']['Settings'][_0x2276db(0x672)][_0x2276db(0x3b8)];};function Sprite_TitlePictureButton(){const _0x4f96d5=_0x3d8147;this[_0x4f96d5(0x5b9)](...arguments);}Sprite_TitlePictureButton['prototype']=Object[_0x3d8147(0x313)](Sprite_Clickable[_0x3d8147(0x578)]),Sprite_TitlePictureButton[_0x3d8147(0x578)][_0x3d8147(0x460)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x3d8147(0x578)][_0x3d8147(0x5b9)]=function(_0x3fd7cf){const _0x36b68b=_0x3d8147;Sprite_Clickable[_0x36b68b(0x578)][_0x36b68b(0x5b9)]['call'](this),this[_0x36b68b(0x262)]=_0x3fd7cf,this[_0x36b68b(0x451)]=null,this[_0x36b68b(0x31c)]();},Sprite_TitlePictureButton[_0x3d8147(0x578)][_0x3d8147(0x31c)]=function(){const _0x3b014f=_0x3d8147;this['x']=Graphics['width'],this['y']=Graphics[_0x3b014f(0x195)],this[_0x3b014f(0x660)]=![],this[_0x3b014f(0x2a0)]();},Sprite_TitlePictureButton[_0x3d8147(0x578)][_0x3d8147(0x2a0)]=function(){const _0x2e4763=_0x3d8147;this[_0x2e4763(0x61f)]=ImageManager[_0x2e4763(0x243)](this[_0x2e4763(0x262)][_0x2e4763(0x13d)]),this[_0x2e4763(0x61f)][_0x2e4763(0x12f)](this[_0x2e4763(0x617)][_0x2e4763(0x2f9)](this));},Sprite_TitlePictureButton[_0x3d8147(0x578)][_0x3d8147(0x617)]=function(){const _0xc5802=_0x3d8147;this[_0xc5802(0x262)][_0xc5802(0x1a5)][_0xc5802(0x3f6)](this),this[_0xc5802(0x262)][_0xc5802(0x795)][_0xc5802(0x3f6)](this),this['setClickHandler'](this[_0xc5802(0x262)][_0xc5802(0x2c0)][_0xc5802(0x2f9)](this));},Sprite_TitlePictureButton[_0x3d8147(0x578)][_0x3d8147(0x50c)]=function(){const _0x267157=_0x3d8147;Sprite_Clickable[_0x267157(0x578)][_0x267157(0x50c)]['call'](this),this['updateOpacity'](),this[_0x267157(0x634)]();},Sprite_TitlePictureButton['prototype'][_0x3d8147(0x31d)]=function(){const _0x1e6f1e=_0x3d8147;return VisuMZ[_0x1e6f1e(0x385)][_0x1e6f1e(0x2df)][_0x1e6f1e(0x647)][_0x1e6f1e(0x667)][_0x1e6f1e(0x398)];},Sprite_TitlePictureButton[_0x3d8147(0x578)][_0x3d8147(0x73c)]=function(){const _0x28d5a5=_0x3d8147;if(this['_pressed']){if(_0x28d5a5(0x23b)==='hBTMk')this[_0x28d5a5(0x364)]=0xff;else{function _0x41edbb(){const _0x53810b=_0x28d5a5,_0x1743ed=_0x739cb7[_0x53810b(0x578)]['traitObjects'][_0x53810b(0x3f6)](this);for(const _0x43b824 of this[_0x53810b(0x236)]()){_0x43b824&&_0x1743ed[_0x53810b(0x58a)](_0x43b824);}return _0x1743ed['push'](this[_0x53810b(0x322)](),this['actor']()),_0x1743ed;}}}else this[_0x28d5a5(0x364)]+=this[_0x28d5a5(0x660)]?this['fadeSpeed']():-0x1*this[_0x28d5a5(0x31d)](),this[_0x28d5a5(0x364)]=Math[_0x28d5a5(0x495)](0xc0,this[_0x28d5a5(0x364)]);},Sprite_TitlePictureButton['prototype'][_0x3d8147(0x436)]=function(_0x1f6339){const _0x3b014b=_0x3d8147;this[_0x3b014b(0x451)]=_0x1f6339;},Sprite_TitlePictureButton[_0x3d8147(0x578)][_0x3d8147(0x4fa)]=function(){const _0x4b2871=_0x3d8147;this['_clickHandler']&&this[_0x4b2871(0x451)]();},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x562)]=Spriteset_Base[_0x3d8147(0x578)]['initialize'],Spriteset_Base['prototype'][_0x3d8147(0x5b9)]=function(){const _0x4826cb=_0x3d8147;VisuMZ['CoreEngine']['Spriteset_Base_initialize'][_0x4826cb(0x3f6)](this),this[_0x4826cb(0x5c3)]=[];},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x6c2)]=Spriteset_Base[_0x3d8147(0x578)][_0x3d8147(0x734)],Spriteset_Base[_0x3d8147(0x578)][_0x3d8147(0x734)]=function(_0x6a1efa){const _0x4e6a86=_0x3d8147;this[_0x4e6a86(0x325)](),VisuMZ[_0x4e6a86(0x385)][_0x4e6a86(0x6c2)][_0x4e6a86(0x3f6)](this,_0x6a1efa);},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x2f6)]=Spriteset_Base['prototype'][_0x3d8147(0x50c)],Spriteset_Base['prototype']['update']=function(){const _0x35841b=_0x3d8147;VisuMZ['CoreEngine'][_0x35841b(0x2f6)][_0x35841b(0x3f6)](this),this[_0x35841b(0x1c4)](),this[_0x35841b(0x20c)]();},Spriteset_Base[_0x3d8147(0x578)][_0x3d8147(0x1c4)]=function(){const _0x15530c=_0x3d8147;if(!VisuMZ[_0x15530c(0x385)][_0x15530c(0x2df)][_0x15530c(0x672)][_0x15530c(0x302)])return;this[_0x15530c(0x459)]['x']!==0x0&&(this[_0x15530c(0x730)]['scale']['x']=0x1/this[_0x15530c(0x459)]['x'],this[_0x15530c(0x730)]['x']=-(this['x']/this[_0x15530c(0x459)]['x'])),this[_0x15530c(0x459)]['y']!==0x0&&(this[_0x15530c(0x730)][_0x15530c(0x459)]['y']=0x1/this[_0x15530c(0x459)]['y'],this['_pictureContainer']['y']=-(this['y']/this[_0x15530c(0x459)]['y']));},Spriteset_Base[_0x3d8147(0x578)][_0x3d8147(0x20c)]=function(){const _0x33d655=_0x3d8147;for(const _0x2b5778 of this[_0x33d655(0x5c3)]){if(_0x33d655(0x552)===_0x33d655(0x1d9)){function _0x4ea4d0(){const _0x138c16=_0x33d655;return _0x59850f[_0x138c16(0x385)][_0x138c16(0x2df)]['UI'][_0x138c16(0x75e)];}}else{if(!_0x2b5778[_0x33d655(0x2ca)]()){if(_0x33d655(0x5fb)===_0x33d655(0x757)){function _0x55f610(){const _0x2f4b33=_0x33d655;this[_0x2f4b33(0x450)][_0x2f4b33(0x305)](_0x7ce67[_0x2f4b33(0x4b8)][_0x2f4b33(0x439)]);}}else this[_0x33d655(0x258)](_0x2b5778);}}}this[_0x33d655(0x707)]();},Spriteset_Base[_0x3d8147(0x578)][_0x3d8147(0x707)]=function(){const _0x9ba79b=_0x3d8147;for(;;){const _0x2d5403=$gameTemp[_0x9ba79b(0x751)]();if(_0x2d5403){if(_0x9ba79b(0x664)!==_0x9ba79b(0x664)){function _0x2f5d16(){const _0x92384b=_0x9ba79b;return _0x29e41e[_0x92384b(0x4b8)][_0x92384b(0x306)][_0x92384b(0x3f6)](this);}}else this[_0x9ba79b(0x374)](_0x2d5403);}else{if(_0x9ba79b(0x303)===_0x9ba79b(0x6de)){function _0x1bfe04(){const _0x429592=_0x9ba79b;return _0x403ad1[_0x429592(0x385)][_0x429592(0x2df)]['Color']['OutlineColor'];}}else break;}}},Spriteset_Base['prototype'][_0x3d8147(0x374)]=function(_0x28e794){const _0x574626=_0x3d8147,_0x42bfc9=$dataAnimations[_0x28e794[_0x574626(0x7ce)]],_0x2c7861=_0x28e794['targets'],_0x4b8daa=_0x28e794['mirror'],_0x1e6582=_0x28e794[_0x574626(0x74e)];let _0x399bab=this[_0x574626(0x479)]();const _0x15ed92=this[_0x574626(0x5e4)]();if(this[_0x574626(0x4d4)](_0x42bfc9)){if(_0x574626(0x403)===_0x574626(0x6e2)){function _0x4d3860(){const _0x23d567=_0x574626;this[_0x23d567(0x589)]={'duration':0x0,'wholeDuration':0x0,'type':_0x23d567(0x3fc),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this['scale']['x'],'targetScaleY':this['scale']['y'],'targetOpacity':this[_0x23d567(0x364)],'targetBackOpacity':this[_0x23d567(0x6f4)],'targetContentsOpacity':this[_0x23d567(0x512)]};}}else for(const _0x3bb1a0 of _0x2c7861){if(_0x574626(0x70a)!==_0x574626(0x171))this['createFauxAnimationSprite']([_0x3bb1a0],_0x42bfc9,_0x4b8daa,_0x399bab,_0x1e6582),_0x399bab+=_0x15ed92;else{function _0x540cf9(){const _0x49e7b3=_0x574626;this['_itemWindow'][_0x49e7b3(0x305)](_0x491fae[_0x49e7b3(0x4b8)]['ItemBgType']);}}}}else this[_0x574626(0x3f2)](_0x2c7861,_0x42bfc9,_0x4b8daa,_0x399bab,_0x1e6582);},Spriteset_Base['prototype'][_0x3d8147(0x3f2)]=function(_0x2c3bad,_0x40ba57,_0x21b0bb,_0x184612,_0xc346c9){const _0x2536dd=_0x3d8147,_0x5637ef=this[_0x2536dd(0x287)](_0x40ba57),_0x339c09=new(_0x5637ef?Sprite_AnimationMV:Sprite_Animation)(),_0x3d8193=this[_0x2536dd(0x3e2)](_0x2c3bad);this['animationShouldMirror'](_0x2c3bad[0x0])&&(_0x21b0bb=!_0x21b0bb),_0x339c09[_0x2536dd(0x621)]=_0x2c3bad,_0x339c09[_0x2536dd(0x31c)](_0x3d8193,_0x40ba57,_0x21b0bb,_0x184612),_0x339c09['setMute'](_0xc346c9),this['_effectsContainer']['addChild'](_0x339c09),this[_0x2536dd(0x5c3)][_0x2536dd(0x58a)](_0x339c09);},Spriteset_Base[_0x3d8147(0x578)][_0x3d8147(0x258)]=function(_0x76201c){const _0x3f180f=_0x3d8147;this[_0x3f180f(0x5c3)][_0x3f180f(0x7bf)](_0x76201c),this[_0x3f180f(0x5bc)][_0x3f180f(0x68a)](_0x76201c);for(const _0x41be42 of _0x76201c[_0x3f180f(0x621)]){if(_0x3f180f(0x39f)===_0x3f180f(0x39f))_0x41be42[_0x3f180f(0x3c1)]&&_0x41be42[_0x3f180f(0x3c1)]();else{function _0x56fcfd(){const _0x1083fd=_0x3f180f;this['_helpWindow']&&this[_0x1083fd(0x4f8)][_0x1083fd(0x305)](_0x41c461[_0x1083fd(0x4b8)][_0x1083fd(0x1d6)]),this[_0x1083fd(0x63b)]&&this[_0x1083fd(0x63b)][_0x1083fd(0x305)](_0x36ee7b[_0x1083fd(0x4b8)][_0x1083fd(0x2b1)]);}}}_0x76201c['destroy']();},Spriteset_Base[_0x3d8147(0x578)][_0x3d8147(0x325)]=function(){const _0x4f19d9=_0x3d8147;for(const _0x406189 of this[_0x4f19d9(0x5c3)]){this[_0x4f19d9(0x258)](_0x406189);}},Spriteset_Base[_0x3d8147(0x578)][_0x3d8147(0x33e)]=function(){const _0x1b8d47=_0x3d8147;return this['_fauxAnimationSprites'][_0x1b8d47(0x278)]>0x0;},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x1b8)]=Spriteset_Base['prototype'][_0x3d8147(0x6d3)],Spriteset_Base[_0x3d8147(0x578)][_0x3d8147(0x6d3)]=function(){const _0x5f4369=_0x3d8147;VisuMZ[_0x5f4369(0x385)][_0x5f4369(0x1b8)]['call'](this),this[_0x5f4369(0x157)]();},Spriteset_Base[_0x3d8147(0x578)]['updatePositionCoreEngine']=function(){const _0xaec48e=_0x3d8147;if(!$gameScreen)return;if($gameScreen[_0xaec48e(0x202)]<=0x0)return;this['x']-=Math['round']($gameScreen[_0xaec48e(0x703)]());const _0x2206c0=$gameScreen[_0xaec48e(0x221)]();switch($gameScreen['getCoreEngineScreenShakeStyle']()){case _0xaec48e(0x3c5):this[_0xaec48e(0x5df)]();break;case _0xaec48e(0x183):this['updatePositionCoreEngineShakeHorz']();break;case'vertical':this[_0xaec48e(0x656)]();break;default:this['updatePositionCoreEngineShakeRand']();break;}},Spriteset_Base['prototype'][_0x3d8147(0x5df)]=function(){const _0xbcc0c2=_0x3d8147,_0x16c760=VisuMZ[_0xbcc0c2(0x385)]['Settings']['ScreenShake'];if(_0x16c760&&_0x16c760['originalJS'])return _0x16c760[_0xbcc0c2(0x38a)][_0xbcc0c2(0x3f6)](this);this['x']+=Math[_0xbcc0c2(0x687)]($gameScreen[_0xbcc0c2(0x703)]());},Spriteset_Base[_0x3d8147(0x578)]['updatePositionCoreEngineShakeRand']=function(){const _0x13ab7a=_0x3d8147,_0x1932bd=VisuMZ[_0x13ab7a(0x385)][_0x13ab7a(0x2df)][_0x13ab7a(0x42e)];if(_0x1932bd&&_0x1932bd['randomJS']){if(_0x13ab7a(0x6c0)===_0x13ab7a(0x3d4)){function _0x24457e(){const _0x385910=_0x13ab7a;var _0x37c517=_0x149e4d(_0x5dbbb5['$1']);try{_0x50b535+=_0x57bd6f(_0x37c517);}catch(_0x1b0156){if(_0x1f9ffb[_0x385910(0x397)]())_0x159187[_0x385910(0x694)](_0x1b0156);}}}else return _0x1932bd['randomJS'][_0x13ab7a(0x3f6)](this);}const _0x286616=$gameScreen[_0x13ab7a(0x4b7)]*0.75,_0x268172=$gameScreen['_shakeSpeed']*0.6,_0x5d2456=$gameScreen[_0x13ab7a(0x202)];this['x']+=Math[_0x13ab7a(0x687)](Math[_0x13ab7a(0x573)](_0x286616)-Math['randomInt'](_0x268172))*(Math[_0x13ab7a(0x495)](_0x5d2456,0x1e)*0.5),this['y']+=Math[_0x13ab7a(0x687)](Math[_0x13ab7a(0x573)](_0x286616)-Math[_0x13ab7a(0x573)](_0x268172))*(Math[_0x13ab7a(0x495)](_0x5d2456,0x1e)*0.5);},Spriteset_Base[_0x3d8147(0x578)]['updatePositionCoreEngineShakeHorz']=function(){const _0x8c9988=_0x3d8147,_0x5f4e7e=VisuMZ[_0x8c9988(0x385)][_0x8c9988(0x2df)]['ScreenShake'];if(_0x5f4e7e&&_0x5f4e7e[_0x8c9988(0x16f)])return _0x5f4e7e[_0x8c9988(0x16f)]['call'](this);const _0x1d690f=$gameScreen[_0x8c9988(0x4b7)]*0.75,_0x2af728=$gameScreen[_0x8c9988(0x4bf)]*0.6,_0x49984d=$gameScreen[_0x8c9988(0x202)];this['x']+=Math[_0x8c9988(0x687)](Math[_0x8c9988(0x573)](_0x1d690f)-Math['randomInt'](_0x2af728))*(Math['min'](_0x49984d,0x1e)*0.5);},Spriteset_Base[_0x3d8147(0x578)][_0x3d8147(0x656)]=function(){const _0x65d966=_0x3d8147,_0x1a5bee=VisuMZ['CoreEngine']['Settings'][_0x65d966(0x42e)];if(_0x1a5bee&&_0x1a5bee['vertJS'])return _0x1a5bee[_0x65d966(0x5e7)][_0x65d966(0x3f6)](this);const _0x1ebf48=$gameScreen['_shakePower']*0.75,_0x1206ed=$gameScreen[_0x65d966(0x4bf)]*0.6,_0x204962=$gameScreen[_0x65d966(0x202)];this['y']+=Math[_0x65d966(0x687)](Math[_0x65d966(0x573)](_0x1ebf48)-Math[_0x65d966(0x573)](_0x1206ed))*(Math[_0x65d966(0x495)](_0x204962,0x1e)*0.5);},Spriteset_Battle[_0x3d8147(0x578)][_0x3d8147(0x781)]=function(){const _0x5b61=_0x3d8147;this['_backgroundFilter']=new PIXI[(_0x5b61(0x35f))][(_0x5b61(0x674))](clamp=!![]),this[_0x5b61(0x79c)]=new Sprite(),this['_backgroundSprite'][_0x5b61(0x61f)]=SceneManager[_0x5b61(0x626)](),this[_0x5b61(0x79c)][_0x5b61(0x35f)]=[this[_0x5b61(0x561)]],this['_baseSprite']['addChild'](this[_0x5b61(0x79c)]);},VisuMZ[_0x3d8147(0x385)]['Spriteset_Battle_createEnemies']=Spriteset_Battle[_0x3d8147(0x578)][_0x3d8147(0x623)],Spriteset_Battle['prototype'][_0x3d8147(0x623)]=function(){const _0x4ae82b=_0x3d8147;VisuMZ['CoreEngine'][_0x4ae82b(0x2df)]['UI'][_0x4ae82b(0x570)]&&this[_0x4ae82b(0x614)](),VisuMZ['CoreEngine']['Spriteset_Battle_createEnemies'][_0x4ae82b(0x3f6)](this);},Spriteset_Battle[_0x3d8147(0x578)][_0x3d8147(0x614)]=function(){const _0x1a3689=_0x3d8147;for(member of $gameTroop[_0x1a3689(0x1ea)]()){member[_0x1a3689(0x6d6)]();}},VisuMZ[_0x3d8147(0x385)]['Window_Base_initialize']=Window_Base[_0x3d8147(0x578)][_0x3d8147(0x5b9)],Window_Base['prototype']['initialize']=function(_0x3ef550){const _0x2ae40b=_0x3d8147;_0x3ef550['x']=Math['round'](_0x3ef550['x']),_0x3ef550['y']=Math[_0x2ae40b(0x687)](_0x3ef550['y']),_0x3ef550[_0x2ae40b(0x300)]=Math['round'](_0x3ef550[_0x2ae40b(0x300)]),_0x3ef550['height']=Math[_0x2ae40b(0x687)](_0x3ef550[_0x2ae40b(0x195)]),this[_0x2ae40b(0x575)](),VisuMZ[_0x2ae40b(0x385)]['Window_Base_initialize'][_0x2ae40b(0x3f6)](this,_0x3ef550),this[_0x2ae40b(0x2f8)]();},Window_Base[_0x3d8147(0x578)][_0x3d8147(0x575)]=function(){const _0x334a95=_0x3d8147;this['_digitGrouping']=VisuMZ[_0x334a95(0x385)][_0x334a95(0x2df)][_0x334a95(0x672)][_0x334a95(0x3c9)],this[_0x334a95(0x49c)]=VisuMZ[_0x334a95(0x385)]['Settings'][_0x334a95(0x672)][_0x334a95(0x478)];},Window_Base[_0x3d8147(0x578)]['lineHeight']=function(){const _0x461383=_0x3d8147;return VisuMZ[_0x461383(0x385)][_0x461383(0x2df)][_0x461383(0x73a)][_0x461383(0x210)];},Window_Base[_0x3d8147(0x578)]['itemPadding']=function(){const _0x3e9f5e=_0x3d8147;return VisuMZ[_0x3e9f5e(0x385)][_0x3e9f5e(0x2df)][_0x3e9f5e(0x73a)][_0x3e9f5e(0x197)];},Window_Base[_0x3d8147(0x578)][_0x3d8147(0x3d0)]=function(){const _0x11db30=_0x3d8147;this[_0x11db30(0x6f4)]=VisuMZ[_0x11db30(0x385)][_0x11db30(0x2df)]['Window']['BackOpacity'];},Window_Base[_0x3d8147(0x578)]['translucentOpacity']=function(){const _0x3c6104=_0x3d8147;return VisuMZ[_0x3c6104(0x385)]['Settings'][_0x3c6104(0x73a)][_0x3c6104(0x786)];},Window_Base[_0x3d8147(0x578)][_0x3d8147(0x446)]=function(){const _0x465529=_0x3d8147;return VisuMZ['CoreEngine'][_0x465529(0x2df)][_0x465529(0x73a)]['OpenSpeed'];},VisuMZ[_0x3d8147(0x385)]['Window_Base_update']=Window_Base[_0x3d8147(0x578)][_0x3d8147(0x50c)],Window_Base[_0x3d8147(0x578)][_0x3d8147(0x50c)]=function(){const _0x353e23=_0x3d8147;VisuMZ['CoreEngine']['Window_Base_update'][_0x353e23(0x3f6)](this),this[_0x353e23(0x6ff)]();},Window_Base[_0x3d8147(0x578)][_0x3d8147(0x4c0)]=function(){const _0x5bb7c0=_0x3d8147;this[_0x5bb7c0(0x1fd)]&&(this[_0x5bb7c0(0x138)]+=this[_0x5bb7c0(0x446)](),this[_0x5bb7c0(0x75a)]()&&(this[_0x5bb7c0(0x1fd)]=![]));},Window_Base['prototype'][_0x3d8147(0x4e3)]=function(){const _0x15f1e6=_0x3d8147;if(this[_0x15f1e6(0x344)]){if(_0x15f1e6(0x534)===_0x15f1e6(0x1ef)){function _0x4068a5(){const _0x249fb4=_0x15f1e6;return this[_0x249fb4(0x48f)]()[_0x249fb4(0x31e)];}}else{this[_0x15f1e6(0x138)]-=this[_0x15f1e6(0x446)]();if(this[_0x15f1e6(0x5cb)]()){if(_0x15f1e6(0x19e)!==_0x15f1e6(0x346))this[_0x15f1e6(0x344)]=![];else{function _0x3a4a60(){const _0x84b401=_0x15f1e6;_0x4cb89e[_0x84b401(0x547)][0x23]='end',_0x23bfa5[_0x84b401(0x547)][0x24]=_0x84b401(0x47b);}}}}}},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x4e7)]=Window_Base[_0x3d8147(0x578)][_0x3d8147(0x248)],Window_Base[_0x3d8147(0x578)][_0x3d8147(0x248)]=function(_0x1ca144,_0x486c97,_0x41cc29,_0x2ed6e9,_0x24a26a){const _0x2042c9=_0x3d8147;if(this[_0x2042c9(0x5d3)]())_0x1ca144=VisuMZ['GroupDigits'](_0x1ca144);VisuMZ[_0x2042c9(0x385)]['Window_Base_drawText'][_0x2042c9(0x3f6)](this,_0x1ca144,_0x486c97,_0x41cc29,_0x2ed6e9,_0x24a26a);},Window_Base[_0x3d8147(0x578)][_0x3d8147(0x5d3)]=function(){const _0x44f3ee=_0x3d8147;return this[_0x44f3ee(0x318)];},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x51b)]=Window_Base[_0x3d8147(0x578)]['createTextState'],Window_Base[_0x3d8147(0x578)]['createTextState']=function(_0x1187e8,_0x2caae4,_0x2da174,_0x4bc95f){const _0x31cf8f=_0x3d8147;var _0x50b453=VisuMZ[_0x31cf8f(0x385)]['Window_Base_createTextState']['call'](this,_0x1187e8,_0x2caae4,_0x2da174,_0x4bc95f);if(this[_0x31cf8f(0x357)]())_0x50b453[_0x31cf8f(0x361)]=VisuMZ['GroupDigits'](_0x50b453[_0x31cf8f(0x361)]);return _0x50b453;},Window_Base['prototype'][_0x3d8147(0x357)]=function(){const _0x3e065a=_0x3d8147;return this[_0x3e065a(0x49c)];},Window_Base[_0x3d8147(0x578)][_0x3d8147(0x744)]=function(_0x2f4fae){const _0x3b8c71=_0x3d8147;this[_0x3b8c71(0x318)]=_0x2f4fae;},Window_Base[_0x3d8147(0x578)][_0x3d8147(0x338)]=function(_0x508dd8){const _0x5f26aa=_0x3d8147;this[_0x5f26aa(0x49c)]=_0x508dd8;},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x7b3)]=Window_Base[_0x3d8147(0x578)][_0x3d8147(0x1d5)],Window_Base[_0x3d8147(0x578)][_0x3d8147(0x1d5)]=function(_0x2bed6e){const _0x42bcbb=_0x3d8147;return this[_0x42bcbb(0x6ea)]=this[_0x42bcbb(0x6ea)]||{},!this[_0x42bcbb(0x6ea)][_0x2bed6e]&&(this[_0x42bcbb(0x6ea)][_0x2bed6e]=VisuMZ[_0x42bcbb(0x385)][_0x42bcbb(0x7b3)]['call'](this,_0x2bed6e)),this[_0x42bcbb(0x6ea)][_0x2bed6e];},VisuMZ['CoreEngine'][_0x3d8147(0x26d)]=Window_Base['prototype'][_0x3d8147(0x35e)],Window_Base[_0x3d8147(0x578)][_0x3d8147(0x35e)]=function(_0x175061,_0x2bda7c,_0x101be3){const _0x109844=_0x3d8147;_0x2bda7c=Math[_0x109844(0x687)](_0x2bda7c),_0x101be3=Math[_0x109844(0x687)](_0x101be3),VisuMZ[_0x109844(0x385)][_0x109844(0x26d)][_0x109844(0x3f6)](this,_0x175061,_0x2bda7c,_0x101be3);},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x549)]=Window_Base[_0x3d8147(0x578)]['drawFace'],Window_Base[_0x3d8147(0x578)][_0x3d8147(0x176)]=function(_0x5e57b7,_0x156426,_0x17877e,_0x31ffce,_0x2ae5e8,_0x19a541){const _0x48b353=_0x3d8147;_0x2ae5e8=_0x2ae5e8||ImageManager[_0x48b353(0x4d1)],_0x19a541=_0x19a541||ImageManager['faceHeight'],_0x17877e=Math[_0x48b353(0x687)](_0x17877e),_0x31ffce=Math['round'](_0x31ffce),_0x2ae5e8=Math[_0x48b353(0x687)](_0x2ae5e8),_0x19a541=Math[_0x48b353(0x687)](_0x19a541),VisuMZ[_0x48b353(0x385)]['Window_Base_drawFace']['call'](this,_0x5e57b7,_0x156426,_0x17877e,_0x31ffce,_0x2ae5e8,_0x19a541);},VisuMZ['CoreEngine'][_0x3d8147(0x799)]=Window_Base[_0x3d8147(0x578)][_0x3d8147(0x386)],Window_Base['prototype'][_0x3d8147(0x386)]=function(_0x4c28d1,_0x1d117c,_0x2426f6,_0x1a0232){const _0x15300c=_0x3d8147;_0x2426f6=Math[_0x15300c(0x687)](_0x2426f6),_0x1a0232=Math[_0x15300c(0x687)](_0x1a0232),VisuMZ[_0x15300c(0x385)][_0x15300c(0x799)][_0x15300c(0x3f6)](this,_0x4c28d1,_0x1d117c,_0x2426f6,_0x1a0232);},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x51e)]=Window_Selectable['prototype'][_0x3d8147(0x3dc)],Window_Selectable[_0x3d8147(0x578)][_0x3d8147(0x3dc)]=function(_0x255ee2){const _0x553aad=_0x3d8147;let _0x5a7921=VisuMZ[_0x553aad(0x385)][_0x553aad(0x51e)][_0x553aad(0x3f6)](this,_0x255ee2);return _0x5a7921['x']=Math['round'](_0x5a7921['x']),_0x5a7921['y']=Math[_0x553aad(0x687)](_0x5a7921['y']),_0x5a7921[_0x553aad(0x300)]=Math[_0x553aad(0x687)](_0x5a7921[_0x553aad(0x300)]),_0x5a7921[_0x553aad(0x195)]=Math[_0x553aad(0x687)](_0x5a7921[_0x553aad(0x195)]),_0x5a7921;},VisuMZ['CoreEngine'][_0x3d8147(0x5c7)]=Window_StatusBase[_0x3d8147(0x578)][_0x3d8147(0x2b7)],Window_StatusBase[_0x3d8147(0x578)]['drawActorSimpleStatus']=function(_0x3b8ecd,_0x3894fd,_0x3b47a9){const _0x17f4b1=_0x3d8147;_0x3894fd=Math[_0x17f4b1(0x687)](_0x3894fd),_0x3b47a9=Math[_0x17f4b1(0x687)](_0x3b47a9),VisuMZ[_0x17f4b1(0x385)]['Window_StatusBase_drawActorSimpleStatus'][_0x17f4b1(0x3f6)](this,_0x3b8ecd,_0x3894fd,_0x3b47a9);},Window_Base[_0x3d8147(0x578)][_0x3d8147(0x2f8)]=function(){const _0x5999f5=_0x3d8147;this['_coreEasing']={'duration':0x0,'wholeDuration':0x0,'type':'LINEAR','targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x5999f5(0x459)]['x'],'targetScaleY':this[_0x5999f5(0x459)]['y'],'targetOpacity':this['opacity'],'targetBackOpacity':this['backOpacity'],'targetContentsOpacity':this[_0x5999f5(0x512)]};},Window_Base[_0x3d8147(0x578)][_0x3d8147(0x6ff)]=function(){const _0xf8d2db=_0x3d8147;if(!this[_0xf8d2db(0x589)])return;if(this['_coreEasing']['duration']<=0x0)return;this['x']=this[_0xf8d2db(0x3a5)](this['x'],this['_coreEasing'][_0xf8d2db(0x6cd)]),this['y']=this[_0xf8d2db(0x3a5)](this['y'],this[_0xf8d2db(0x589)][_0xf8d2db(0x220)]),this[_0xf8d2db(0x459)]['x']=this[_0xf8d2db(0x3a5)](this['scale']['x'],this[_0xf8d2db(0x589)]['targetScaleX']),this[_0xf8d2db(0x459)]['y']=this[_0xf8d2db(0x3a5)](this[_0xf8d2db(0x459)]['y'],this[_0xf8d2db(0x589)]['targetScaleY']),this['opacity']=this[_0xf8d2db(0x3a5)](this[_0xf8d2db(0x364)],this[_0xf8d2db(0x589)]['targetOpacity']),this[_0xf8d2db(0x6f4)]=this[_0xf8d2db(0x3a5)](this[_0xf8d2db(0x6f4)],this[_0xf8d2db(0x589)][_0xf8d2db(0x1ba)]),this[_0xf8d2db(0x512)]=this[_0xf8d2db(0x3a5)](this[_0xf8d2db(0x512)],this[_0xf8d2db(0x589)]['targetContentsOpacity']),this[_0xf8d2db(0x589)][_0xf8d2db(0x6df)]--;},Window_Base[_0x3d8147(0x578)][_0x3d8147(0x3a5)]=function(_0x544f85,_0x1c4c38){const _0x234c81=_0x3d8147;if(!this[_0x234c81(0x589)])return _0x1c4c38;const _0x419746=this[_0x234c81(0x589)]['duration'],_0x17ca7e=this['_coreEasing'][_0x234c81(0x77b)],_0x336209=this[_0x234c81(0x2db)]((_0x17ca7e-_0x419746)/_0x17ca7e),_0x156e84=this[_0x234c81(0x2db)]((_0x17ca7e-_0x419746+0x1)/_0x17ca7e),_0x3ea843=(_0x544f85-_0x1c4c38*_0x336209)/(0x1-_0x336209);return _0x3ea843+(_0x1c4c38-_0x3ea843)*_0x156e84;},Window_Base[_0x3d8147(0x578)]['calcCoreEasing']=function(_0x14f4f8){const _0x142961=_0x3d8147;if(!this[_0x142961(0x589)])return _0x14f4f8;return VisuMZ['ApplyEasing'](_0x14f4f8,this['_coreEasing'][_0x142961(0x2f7)]||_0x142961(0x3fc));},Window_Base['prototype'][_0x3d8147(0x37d)]=function(_0x35fd9a,_0x5a3945){const _0x49dc55=_0x3d8147;if(!this[_0x49dc55(0x589)])return;this['x']=this['_coreEasing'][_0x49dc55(0x6cd)],this['y']=this[_0x49dc55(0x589)]['targetY'],this[_0x49dc55(0x459)]['x']=this[_0x49dc55(0x589)][_0x49dc55(0x537)],this[_0x49dc55(0x459)]['y']=this[_0x49dc55(0x589)]['targetScaleY'],this[_0x49dc55(0x364)]=this[_0x49dc55(0x589)][_0x49dc55(0x2c3)],this[_0x49dc55(0x6f4)]=this[_0x49dc55(0x589)][_0x49dc55(0x1ba)],this['contentsOpacity']=this[_0x49dc55(0x589)][_0x49dc55(0x3cf)],this[_0x49dc55(0x137)](_0x35fd9a,_0x5a3945,this['x'],this['y'],this[_0x49dc55(0x459)]['x'],this['scale']['y'],this[_0x49dc55(0x364)],this['backOpacity'],this[_0x49dc55(0x512)]);},Window_Base[_0x3d8147(0x578)][_0x3d8147(0x137)]=function(_0x52f780,_0x361e82,_0x354fa0,_0x5711e0,_0x375ff1,_0x28c1dc,_0x3780cd,_0x1e0079,_0x238edf){const _0x42c089=_0x3d8147;this[_0x42c089(0x589)]={'duration':_0x52f780,'wholeDuration':_0x52f780,'type':_0x361e82,'targetX':_0x354fa0,'targetY':_0x5711e0,'targetScaleX':_0x375ff1,'targetScaleY':_0x28c1dc,'targetOpacity':_0x3780cd,'targetBackOpacity':_0x1e0079,'targetContentsOpacity':_0x238edf};},Window_Base[_0x3d8147(0x578)][_0x3d8147(0x548)]=function(_0x3f984d,_0x505c8a,_0x26005f,_0x211a6c,_0x2da2a6){const _0x47d833=_0x3d8147;this['resetFontSettings'](),this[_0x47d833(0x3c7)][_0x47d833(0x767)]=VisuMZ[_0x47d833(0x385)][_0x47d833(0x2df)][_0x47d833(0x75d)]['GoldFontSize'];const _0x3ddeb6=VisuMZ[_0x47d833(0x385)][_0x47d833(0x2df)][_0x47d833(0x75d)][_0x47d833(0x7a2)];if(_0x3ddeb6>0x0&&_0x505c8a===TextManager['currencyUnit']){const _0x2c2bfe=_0x211a6c+(this[_0x47d833(0x244)]()-ImageManager['iconHeight'])/0x2;this[_0x47d833(0x35e)](_0x3ddeb6,_0x26005f+(_0x2da2a6-ImageManager['iconWidth']),_0x2c2bfe),_0x2da2a6-=ImageManager[_0x47d833(0x717)]+0x4;}else this['changeTextColor'](ColorManager[_0x47d833(0x394)]()),this[_0x47d833(0x248)](_0x505c8a,_0x26005f,_0x211a6c,_0x2da2a6,'right'),_0x2da2a6-=this[_0x47d833(0x597)](_0x505c8a)+0x6;this[_0x47d833(0x133)]();const _0x1f7ce5=this[_0x47d833(0x597)](this[_0x47d833(0x318)]?VisuMZ[_0x47d833(0x498)](_0x3f984d):_0x3f984d);_0x1f7ce5>_0x2da2a6?this['drawText'](VisuMZ['CoreEngine'][_0x47d833(0x2df)][_0x47d833(0x75d)]['GoldOverlap'],_0x26005f,_0x211a6c,_0x2da2a6,_0x47d833(0x5eb)):this[_0x47d833(0x248)](_0x3f984d,_0x26005f,_0x211a6c,_0x2da2a6,'right'),this[_0x47d833(0x411)]();},Window_Base['prototype']['drawIconBySize']=function(_0x371b38,_0x163730,_0x485e82,_0x7f83e7,_0x13d7a2){const _0x2782e6=_0x3d8147,_0x26681b=ImageManager[_0x2782e6(0x26b)](_0x2782e6(0x41d)),_0x374b9e=ImageManager['iconWidth'],_0x11e375=ImageManager[_0x2782e6(0x36c)],_0x3a1fc5=_0x371b38%0x10*_0x374b9e,_0x581b0f=Math['floor'](_0x371b38/0x10)*_0x11e375,_0x53bb74=_0x7f83e7,_0x4b16af=_0x7f83e7;this[_0x2782e6(0x3c7)][_0x2782e6(0x3be)][_0x2782e6(0x5da)]=_0x13d7a2,this[_0x2782e6(0x3c7)][_0x2782e6(0x315)](_0x26681b,_0x3a1fc5,_0x581b0f,_0x374b9e,_0x11e375,_0x163730,_0x485e82,_0x53bb74,_0x4b16af),this[_0x2782e6(0x3c7)][_0x2782e6(0x3be)]['imageSmoothingEnabled']=!![];},Window_Base[_0x3d8147(0x578)][_0x3d8147(0x605)]=function(_0x5e7f81,_0x1d0030,_0x67a2b5,_0x2de48c,_0x386531,_0xd5fa60){const _0xa29dac=_0x3d8147,_0x34ef75=Math[_0xa29dac(0x27e)]((_0x67a2b5-0x2)*_0x2de48c),_0x4f5bf8=Sprite_Gauge[_0xa29dac(0x578)]['gaugeHeight'][_0xa29dac(0x3f6)](this),_0x16e7f9=_0x1d0030+this['lineHeight']()-_0x4f5bf8-0x2;this[_0xa29dac(0x3c7)][_0xa29dac(0x333)](_0x5e7f81,_0x16e7f9,_0x67a2b5,_0x4f5bf8,ColorManager[_0xa29dac(0x584)]()),this[_0xa29dac(0x3c7)][_0xa29dac(0x57d)](_0x5e7f81+0x1,_0x16e7f9+0x1,_0x34ef75,_0x4f5bf8-0x2,_0x386531,_0xd5fa60);},Window_Selectable['prototype']['cursorDown']=function(_0x549653){const _0x5501b3=_0x3d8147;let _0x442210=this[_0x5501b3(0x2ff)]();const _0x287078=this['maxItems'](),_0x1687cd=this[_0x5501b3(0x4a1)]();if(this[_0x5501b3(0x358)]()&&(_0x442210<_0x287078||_0x549653&&_0x1687cd===0x1)){if(_0x5501b3(0x39c)!==_0x5501b3(0x39c)){function _0x2d3f54(){const _0x30b68a=_0x5501b3;_0x3f6baa[_0x30b68a(0x385)][_0x30b68a(0x271)]['call'](this,_0x3a801c);}}else{_0x442210+=_0x1687cd;if(_0x442210>=_0x287078)_0x442210=_0x287078-0x1;this[_0x5501b3(0x662)](_0x442210);}}else!this[_0x5501b3(0x358)]()&&((_0x442210<_0x287078-_0x1687cd||_0x549653&&_0x1687cd===0x1)&&this[_0x5501b3(0x662)]((_0x442210+_0x1687cd)%_0x287078));},Window_Selectable[_0x3d8147(0x578)][_0x3d8147(0x358)]=function(){const _0x36fdaa=_0x3d8147;return VisuMZ[_0x36fdaa(0x385)][_0x36fdaa(0x2df)][_0x36fdaa(0x672)]['ModernControls'];},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x193)]=Window_Selectable[_0x3d8147(0x578)][_0x3d8147(0x173)],Window_Selectable[_0x3d8147(0x578)]['processCursorMove']=function(){const _0xf57e3=_0x3d8147;this[_0xf57e3(0x358)]()?(this['processCursorMoveModernControls'](),this[_0xf57e3(0x3d8)]()):VisuMZ['CoreEngine'][_0xf57e3(0x193)][_0xf57e3(0x3f6)](this);},Window_Selectable['prototype'][_0x3d8147(0x390)]=function(){const _0x2004b2=_0x3d8147;if(this[_0x2004b2(0x492)]()){const _0x3f6b94=this[_0x2004b2(0x2ff)]();Input[_0x2004b2(0x6f2)]('down')&&(Input[_0x2004b2(0x35c)](_0x2004b2(0x4be))?this['cursorPagedown']():this[_0x2004b2(0x37c)](Input[_0x2004b2(0x4cd)](_0x2004b2(0x28b))));if(Input[_0x2004b2(0x6f2)]('up')){if(Input[_0x2004b2(0x35c)](_0x2004b2(0x4be))){if('fUZXC'===_0x2004b2(0x4ac))this[_0x2004b2(0x6c1)]();else{function _0x58a0f2(){const _0x599b43=_0x2004b2;this[_0x599b43(0x262)][_0x599b43(0x1a5)]['call'](this),this[_0x599b43(0x262)][_0x599b43(0x795)]['call'](this),this['setClickHandler'](this[_0x599b43(0x262)][_0x599b43(0x2c0)]['bind'](this));}}}else{if(_0x2004b2(0x615)===_0x2004b2(0x615))this['cursorUp'](Input[_0x2004b2(0x4cd)]('up'));else{function _0x43dee3(){const _0x5ec1ca=_0x2004b2;return this[_0x5ec1ca(0x318)];}}}}Input['isRepeated']('right')&&this[_0x2004b2(0x186)](Input[_0x2004b2(0x4cd)](_0x2004b2(0x5eb)));Input[_0x2004b2(0x6f2)](_0x2004b2(0x6d9))&&this['cursorLeft'](Input[_0x2004b2(0x4cd)](_0x2004b2(0x6d9)));!this['isHandled'](_0x2004b2(0x568))&&Input[_0x2004b2(0x6f2)](_0x2004b2(0x568))&&this['cursorPagedown']();!this[_0x2004b2(0x267)]('pageup')&&Input[_0x2004b2(0x6f2)](_0x2004b2(0x3af))&&this['cursorPageup']();if(this[_0x2004b2(0x2ff)]()!==_0x3f6b94){if(_0x2004b2(0x539)!==_0x2004b2(0x351))this[_0x2004b2(0x2ed)]();else{function _0x11818d(){const _0xd80323=_0x2004b2,_0x5f331e=_0xd80323(0x612);this['_colorCache']=this['_colorCache']||{};if(this[_0xd80323(0x7d5)][_0x5f331e])return this[_0xd80323(0x7d5)][_0x5f331e];const _0x2b9089=_0x148933[_0xd80323(0x385)][_0xd80323(0x2df)][_0xd80323(0x19d)][_0xd80323(0x445)];return this['getColorDataFromPluginParameters'](_0x5f331e,_0x2b9089);}}}}},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x16d)]=Window_Selectable[_0x3d8147(0x578)][_0x3d8147(0x37c)],Window_Selectable[_0x3d8147(0x578)]['cursorDown']=function(_0x13f3b1){const _0x390411=_0x3d8147;if(this[_0x390411(0x358)]()&&_0x13f3b1&&this['maxCols']()===0x1&&this['index']()===this[_0x390411(0x259)]()-0x1)this[_0x390411(0x662)](0x0);else{if('xkVzN'!=='RQReN')VisuMZ['CoreEngine']['Window_Selectable_cursorDown'][_0x390411(0x3f6)](this,_0x13f3b1);else{function _0x3a367c(){const _0x2d9d9f=_0x390411;try{_0x32995d[_0x2d9d9f(0x385)][_0x2d9d9f(0x543)][_0x2d9d9f(0x3f6)](this,_0x2014ab);}catch(_0x14af69){if(_0x8d8c1e['isPlaytest']())_0x3d3ae1['log'](_0x14af69);}}}}},Window_Selectable[_0x3d8147(0x578)][_0x3d8147(0x3d8)]=function(){const _0x27bdc1=_0x3d8147;if(this[_0x27bdc1(0x492)]()){const _0x21da19=this[_0x27bdc1(0x2ff)]();Input[_0x27bdc1(0x4cd)](_0x27bdc1(0x47b))&&this[_0x27bdc1(0x662)](Math[_0x27bdc1(0x495)](this['index'](),0x0));if(Input[_0x27bdc1(0x4cd)](_0x27bdc1(0x307))){if('OZDZn'!==_0x27bdc1(0x489)){function _0x5a4993(){_0x4132a3*=_0x40569a(_0x316868);}}else this[_0x27bdc1(0x662)](Math['max'](this[_0x27bdc1(0x2ff)](),this[_0x27bdc1(0x259)]()-0x1));}if(this[_0x27bdc1(0x2ff)]()!==_0x21da19){if(_0x27bdc1(0x3a8)===_0x27bdc1(0x727)){function _0x1ce4a1(){const _0x73b14d=_0x27bdc1;_0x2f30db['CoreEngine']['Settings']['UI'][_0x73b14d(0x570)]&&this[_0x73b14d(0x614)](),_0x2abda2[_0x73b14d(0x385)][_0x73b14d(0x347)][_0x73b14d(0x3f6)](this);}}else this['playCursorSound']();}}},VisuMZ['CoreEngine'][_0x3d8147(0x737)]=Window_Selectable['prototype'][_0x3d8147(0x634)],Window_Selectable['prototype'][_0x3d8147(0x634)]=function(){const _0x42a357=_0x3d8147;if(this[_0x42a357(0x358)]()){if(_0x42a357(0x25f)!==_0x42a357(0x25f)){function _0x5c85c9(){const _0x90688c=_0x42a357;this[_0x90688c(0x561)]=new _0x46665d[(_0x90688c(0x35f))][(_0x90688c(0x674))](_0x2d40ac=!![]),this[_0x90688c(0x79c)]=new _0xff178a(),this[_0x90688c(0x79c)][_0x90688c(0x61f)]=_0x48fa01[_0x90688c(0x626)](),this['_backgroundSprite']['filters']=[this[_0x90688c(0x561)]],this[_0x90688c(0x2cd)](this[_0x90688c(0x79c)]),this[_0x90688c(0x716)](0xc0),this['setBackgroundOpacity'](this['getBackgroundOpacity']()),this[_0x90688c(0x63c)]();}}else this[_0x42a357(0x603)]();}else VisuMZ[_0x42a357(0x385)][_0x42a357(0x737)][_0x42a357(0x3f6)](this);},Window_Selectable[_0x3d8147(0x578)][_0x3d8147(0x603)]=function(){const _0x3a8a22=_0x3d8147;VisuMZ[_0x3a8a22(0x385)]['Window_Selectable_processTouch'][_0x3a8a22(0x3f6)](this);},Window_Selectable['prototype']['colSpacing']=function(){const _0x57a5e7=_0x3d8147;return VisuMZ['CoreEngine'][_0x57a5e7(0x2df)]['Window'][_0x57a5e7(0x3dd)];},Window_Selectable[_0x3d8147(0x578)][_0x3d8147(0x1f7)]=function(){const _0x42eb5b=_0x3d8147;return VisuMZ['CoreEngine'][_0x42eb5b(0x2df)][_0x42eb5b(0x73a)]['RowSpacing'];},Window_Selectable[_0x3d8147(0x578)][_0x3d8147(0x5b3)]=function(){const _0x337471=_0x3d8147;return Window_Scrollable['prototype'][_0x337471(0x5b3)][_0x337471(0x3f6)](this)+VisuMZ[_0x337471(0x385)]['Settings'][_0x337471(0x73a)][_0x337471(0x507)];;},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x3c2)]=Window_Selectable[_0x3d8147(0x578)][_0x3d8147(0x334)],Window_Selectable[_0x3d8147(0x578)][_0x3d8147(0x334)]=function(_0x299245){const _0x11d9ba=_0x3d8147,_0x2c72f2=VisuMZ['CoreEngine'][_0x11d9ba(0x2df)][_0x11d9ba(0x73a)];if(_0x2c72f2[_0x11d9ba(0x2a2)]===![])return;if(_0x2c72f2['DrawItemBackgroundJS']){if(_0x11d9ba(0x7c7)===_0x11d9ba(0x4db)){function _0x4ac33c(){const _0x4a62ee=_0x11d9ba;this[_0x4a62ee(0x3c7)][_0x4a62ee(0x767)]>=0x18&&(this[_0x4a62ee(0x3c7)]['fontSize']-=0x6);}}else _0x2c72f2[_0x11d9ba(0x766)]['call'](this,_0x299245);}else VisuMZ[_0x11d9ba(0x385)][_0x11d9ba(0x3c2)][_0x11d9ba(0x3f6)](this,_0x299245);},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x72a)]=Window_Gold[_0x3d8147(0x578)]['refresh'],Window_Gold[_0x3d8147(0x578)][_0x3d8147(0x718)]=function(){const _0x37a93e=_0x3d8147;if(this[_0x37a93e(0x182)]()){if('nMjNP'!==_0x37a93e(0x48d))this[_0x37a93e(0x201)]();else{function _0x461ac1(){const _0x59340e=_0x37a93e;var _0x106c57=_0x38050f['ApplyEasing'](_0x44de41*0x2,_0x59340e(0x654))*0.5;}}}else VisuMZ[_0x37a93e(0x385)][_0x37a93e(0x72a)][_0x37a93e(0x3f6)](this);},Window_Gold[_0x3d8147(0x578)][_0x3d8147(0x182)]=function(){const _0x3f1890=_0x3d8147;if(TextManager[_0x3f1890(0x150)]!==this[_0x3f1890(0x150)]())return![];return VisuMZ[_0x3f1890(0x385)]['Settings'][_0x3f1890(0x75d)][_0x3f1890(0x4bd)];},Window_Gold[_0x3d8147(0x578)][_0x3d8147(0x201)]=function(){const _0x3dcd8b=_0x3d8147;this['resetFontSettings'](),this[_0x3dcd8b(0x3c7)][_0x3dcd8b(0x684)](),this['contents']['fontSize']=VisuMZ[_0x3dcd8b(0x385)][_0x3dcd8b(0x2df)]['Gold'][_0x3dcd8b(0x76e)];const _0x3ae6d5=VisuMZ[_0x3dcd8b(0x385)][_0x3dcd8b(0x2df)][_0x3dcd8b(0x75d)]['GoldIcon'],_0x6e7089=this[_0x3dcd8b(0x678)](0x0);if(_0x3ae6d5>0x0){const _0x468b9e=_0x6e7089['y']+(this[_0x3dcd8b(0x244)]()-ImageManager['iconHeight'])/0x2;this[_0x3dcd8b(0x35e)](_0x3ae6d5,_0x6e7089['x'],_0x468b9e);const _0xcca304=ImageManager[_0x3dcd8b(0x717)]+0x4;_0x6e7089['x']+=_0xcca304,_0x6e7089['width']-=_0xcca304;}this[_0x3dcd8b(0x25d)](ColorManager['systemColor']()),this['drawText'](this['currencyUnit'](),_0x6e7089['x'],_0x6e7089['y'],_0x6e7089['width'],'left');const _0x493923=this[_0x3dcd8b(0x597)](this[_0x3dcd8b(0x150)]())+0x6;;_0x6e7089['x']+=_0x493923,_0x6e7089[_0x3dcd8b(0x300)]-=_0x493923,this[_0x3dcd8b(0x133)]();const _0xb69887=this['value'](),_0x5ccebb=this[_0x3dcd8b(0x597)](this[_0x3dcd8b(0x318)]?VisuMZ[_0x3dcd8b(0x498)](this[_0x3dcd8b(0x642)]()):this[_0x3dcd8b(0x642)]());if(_0x5ccebb>_0x6e7089[_0x3dcd8b(0x300)])this[_0x3dcd8b(0x248)](VisuMZ[_0x3dcd8b(0x385)]['Settings'][_0x3dcd8b(0x75d)][_0x3dcd8b(0x4d0)],_0x6e7089['x'],_0x6e7089['y'],_0x6e7089['width'],_0x3dcd8b(0x5eb));else{if(_0x3dcd8b(0x3ec)!==_0x3dcd8b(0x6bf))this[_0x3dcd8b(0x248)](this['value'](),_0x6e7089['x'],_0x6e7089['y'],_0x6e7089['width'],_0x3dcd8b(0x5eb));else{function _0xeb844d(){const _0x2d8c80=_0x3dcd8b;_0x38bfd7[_0x2d8c80(0x694)]('Control\x20Variables\x20Script\x20Error'),_0x138018['log'](_0x163894);}}}this['resetFontSettings']();},Window_StatusBase[_0x3d8147(0x578)]['drawParamText']=function(_0x4fb072,_0xc95d43,_0x4eb2ff,_0x3c977d,_0x2762ed){const _0x37e478=_0x3d8147;_0x3c977d=String(_0x3c977d||'')[_0x37e478(0x7bb)]();if(VisuMZ[_0x37e478(0x385)][_0x37e478(0x2df)]['Param'][_0x37e478(0x141)]){const _0x46f0ce=VisuMZ['GetParamIcon'](_0x3c977d);if(_0x2762ed){if('amuTi'===_0x37e478(0x1e8))this[_0x37e478(0x161)](_0x46f0ce,_0x4fb072,_0xc95d43,this[_0x37e478(0x6b7)]()),_0x4eb2ff-=this['gaugeLineHeight']()+0x2,_0x4fb072+=this[_0x37e478(0x6b7)]()+0x2;else{function _0x930110(){const _0x5d4213=_0x37e478;if(_0x334cc5)_0x18393b[_0x5d4213(0x608)](_0xea5931);}}}else this['drawIcon'](_0x46f0ce,_0x4fb072+0x2,_0xc95d43+0x2),_0x4eb2ff-=ImageManager['iconWidth']+0x4,_0x4fb072+=ImageManager['iconWidth']+0x4;}const _0x186ee6=TextManager[_0x37e478(0x34c)](_0x3c977d);this['resetFontSettings'](),this[_0x37e478(0x25d)](ColorManager[_0x37e478(0x394)]());if(_0x2762ed)this[_0x37e478(0x3c7)][_0x37e478(0x767)]=this[_0x37e478(0x48e)](),this[_0x37e478(0x3c7)][_0x37e478(0x248)](_0x186ee6,_0x4fb072,_0xc95d43,_0x4eb2ff,this[_0x37e478(0x6b7)](),_0x37e478(0x6d9));else{if(_0x37e478(0x2af)===_0x37e478(0x721)){function _0x2bd08e(){const _0x4ec67f=_0x37e478;return _0x483344[_0x4ec67f(0x385)][_0x4ec67f(0x71e)]['call'](this,_0x31b90a);}}else this[_0x37e478(0x248)](_0x186ee6,_0x4fb072,_0xc95d43,_0x4eb2ff);}this[_0x37e478(0x411)]();},Window_StatusBase['prototype']['smallParamFontSize']=function(){return $gameSystem['mainFontSize']()-0x8;},Window_StatusBase[_0x3d8147(0x578)][_0x3d8147(0x4b3)]=function(_0x44270c,_0x20863c,_0x580dda,_0x4905c4){const _0xd9cec6=_0x3d8147;_0x4905c4=_0x4905c4||0xa8,this[_0xd9cec6(0x133)]();if(VisuMZ[_0xd9cec6(0x385)]['Settings']['UI'][_0xd9cec6(0x15e)]){if(_0xd9cec6(0x41c)!==_0xd9cec6(0x41c)){function _0x2b467c(){const _0x5e4fbe=_0xd9cec6;_0xf0a608[_0x5e4fbe(0x3c1)]&&_0x306ea8[_0x5e4fbe(0x3c1)]();}}else this['drawTextEx'](_0x44270c[_0xd9cec6(0x322)]()[_0xd9cec6(0x665)],_0x20863c,_0x580dda,_0x4905c4);}else{const _0x4fe217=_0x44270c[_0xd9cec6(0x322)]()[_0xd9cec6(0x665)][_0xd9cec6(0x5a9)](/\\I\[(\d+)\]/gi,'');this[_0xd9cec6(0x248)](_0x4fe217,_0x20863c,_0x580dda,_0x4905c4);}},Window_StatusBase['prototype'][_0x3d8147(0x6f5)]=function(_0x291385,_0x4c99e6,_0x9062f6,_0x4cd536){const _0x1d6a6c=_0x3d8147;_0x4cd536=_0x4cd536||0x10e,this[_0x1d6a6c(0x133)]();if(VisuMZ[_0x1d6a6c(0x385)][_0x1d6a6c(0x2df)]['UI']['TextCodeNicknames']){if(_0x1d6a6c(0x3f0)==='JyTJb'){function _0x196f72(){_0x4ae01e*=_0x18e90d(_0x4d5f45);}}else this[_0x1d6a6c(0x421)](_0x291385['nickname'](),_0x4c99e6,_0x9062f6,_0x4cd536);}else{if(_0x1d6a6c(0x6dd)!==_0x1d6a6c(0x6dd)){function _0x5f1fbb(){const _0xac6728=_0x1d6a6c;this[_0xac6728(0x262)]={},_0xd95de1[_0xac6728(0x578)]['initialize'][_0xac6728(0x3f6)](this,_0x457251),this['setBackgroundType'](_0x7dcd0[_0xac6728(0x385)][_0xac6728(0x2df)]['ButtonAssist']['BgType']||0x0),this[_0xac6728(0x718)]();}}else{const _0x4973da=_0x291385[_0x1d6a6c(0x3e4)]()[_0x1d6a6c(0x5a9)](/\\I\[(\d+)\]/gi,'');this[_0x1d6a6c(0x248)](_0x291385[_0x1d6a6c(0x3e4)](),_0x4c99e6,_0x9062f6,_0x4cd536);}}},VisuMZ[_0x3d8147(0x385)]['Window_StatusBase_drawActorLevel']=Window_StatusBase['prototype'][_0x3d8147(0x5dc)],Window_StatusBase['prototype'][_0x3d8147(0x5dc)]=function(_0x2ad238,_0xb7e125,_0x13d664){const _0x5e3d44=_0x3d8147;if(this[_0x5e3d44(0x224)]())this[_0x5e3d44(0x18e)](_0x2ad238,_0xb7e125,_0x13d664);VisuMZ['CoreEngine'][_0x5e3d44(0x783)]['call'](this,_0x2ad238,_0xb7e125,_0x13d664);},Window_StatusBase['prototype'][_0x3d8147(0x224)]=function(){const _0x41c096=_0x3d8147;return VisuMZ['CoreEngine'][_0x41c096(0x2df)]['UI'][_0x41c096(0x3ce)];},Window_StatusBase[_0x3d8147(0x578)]['drawActorExpGauge']=function(_0x1bc12a,_0x129c7b,_0x533fa3){const _0x5aaf4e=_0x3d8147;if(!_0x1bc12a)return;if(!_0x1bc12a[_0x5aaf4e(0x205)]())return;const _0x5bdef5=0x80,_0x3d89ac=_0x1bc12a[_0x5aaf4e(0x681)]();let _0x39eef4=ColorManager['expGaugeColor1'](),_0x40bef2=ColorManager[_0x5aaf4e(0x7aa)]();_0x3d89ac>=0x1&&(_0x39eef4=ColorManager[_0x5aaf4e(0x72e)](),_0x40bef2=ColorManager[_0x5aaf4e(0x78c)]()),this[_0x5aaf4e(0x605)](_0x129c7b,_0x533fa3,_0x5bdef5,_0x3d89ac,_0x39eef4,_0x40bef2);},Window_EquipStatus['prototype'][_0x3d8147(0x36a)]=function(){const _0x4d1ed2=_0x3d8147;let _0x2f3e57=0x0;for(const _0x1ca076 of VisuMZ[_0x4d1ed2(0x385)][_0x4d1ed2(0x2df)]['Param'][_0x4d1ed2(0x21f)]){if('ygpbX'===_0x4d1ed2(0x619)){function _0x3752a1(){const _0x45292e=_0x4d1ed2;_0x18def8['CoreEngine'][_0x45292e(0x51d)][_0x45292e(0x3f6)](this),_0x321a68[_0x45292e(0x481)]()&&this[_0x45292e(0x21a)]();}}else{const _0x5beab7=this[_0x4d1ed2(0x275)](),_0x410188=this[_0x4d1ed2(0x434)](_0x2f3e57);this['drawItem'](_0x5beab7,_0x410188,_0x1ca076),_0x2f3e57++;}}},Window_EquipStatus['prototype'][_0x3d8147(0x6fd)]=function(_0x44bb7c,_0xb1a949,_0x51f42f){const _0x2b880c=_0x3d8147,_0x190def=this['paramX']()-this[_0x2b880c(0x275)]()*0x2;this[_0x2b880c(0x4ca)](_0x44bb7c,_0xb1a949,_0x190def,_0x51f42f,![]);},Window_EquipStatus['prototype'][_0x3d8147(0x387)]=function(_0x25e8b3,_0x28911f,_0x23f318){const _0x38b22b=_0x3d8147,_0x3e26da=this['paramWidth']();this[_0x38b22b(0x133)](),this[_0x38b22b(0x248)](this['_actor'][_0x38b22b(0x65b)](_0x23f318,!![]),_0x25e8b3,_0x28911f,_0x3e26da,_0x38b22b(0x5eb));},Window_EquipStatus['prototype'][_0x3d8147(0x4a9)]=function(_0x1ac688,_0x253f20){const _0x253091=_0x3d8147,_0x48e5a0=this[_0x253091(0x3b5)]();this['changeTextColor'](ColorManager[_0x253091(0x394)]());const _0x1965b0=VisuMZ[_0x253091(0x385)]['Settings']['UI']['ParamArrow'];this['drawText'](_0x1965b0,_0x1ac688,_0x253f20,_0x48e5a0,'center');},Window_EquipStatus[_0x3d8147(0x578)][_0x3d8147(0x76c)]=function(_0x18271d,_0x2de1e6,_0x429804){const _0x24c6e4=_0x3d8147,_0x27238e=this[_0x24c6e4(0x2f1)](),_0x577e3d=this[_0x24c6e4(0x231)]['paramValueByName'](_0x429804),_0x4def8a=_0x577e3d-this[_0x24c6e4(0x2d8)][_0x24c6e4(0x65b)](_0x429804);this[_0x24c6e4(0x25d)](ColorManager[_0x24c6e4(0x34e)](_0x4def8a)),this[_0x24c6e4(0x248)](VisuMZ[_0x24c6e4(0x677)](_0x577e3d,0x0),_0x18271d,_0x2de1e6,_0x27238e,'right');},Window_StatusParams[_0x3d8147(0x578)]['maxItems']=function(){const _0x135987=_0x3d8147;return VisuMZ[_0x135987(0x385)][_0x135987(0x2df)][_0x135987(0x641)][_0x135987(0x21f)][_0x135987(0x278)];},Window_StatusParams['prototype']['drawItem']=function(_0x32c992){const _0x500437=_0x3d8147,_0xcba77d=this[_0x500437(0x678)](_0x32c992),_0x6b226e=VisuMZ[_0x500437(0x385)]['Settings'][_0x500437(0x641)][_0x500437(0x21f)][_0x32c992],_0x4b2ac7=TextManager[_0x500437(0x34c)](_0x6b226e),_0x5d03a0=this[_0x500437(0x2d8)]['paramValueByName'](_0x6b226e,!![]);this[_0x500437(0x4ca)](_0xcba77d['x'],_0xcba77d['y'],0xa0,_0x6b226e,![]),this[_0x500437(0x133)](),this[_0x500437(0x248)](_0x5d03a0,_0xcba77d['x']+0xa0,_0xcba77d['y'],0x3c,_0x500437(0x5eb));};if(VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x2df)][_0x3d8147(0x470)]['EnableNameInput']){VisuMZ['CoreEngine'][_0x3d8147(0x2df)][_0x3d8147(0x470)][_0x3d8147(0x1e0)]&&(Window_NameInput['LATIN1']=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x3d8147(0x58c),'OK']);;VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x776)]=Window_NameInput[_0x3d8147(0x578)][_0x3d8147(0x5b9)],Window_NameInput[_0x3d8147(0x578)][_0x3d8147(0x5b9)]=function(_0x364027){const _0x2a9f80=_0x3d8147;this[_0x2a9f80(0x4d7)]=_0x2a9f80(0x544),VisuMZ['CoreEngine'][_0x2a9f80(0x776)][_0x2a9f80(0x3f6)](this,_0x364027),Input[_0x2a9f80(0x684)](),this[_0x2a9f80(0x369)]();},VisuMZ[_0x3d8147(0x385)]['Window_NameInput_processHandling']=Window_NameInput[_0x3d8147(0x578)]['processHandling'],Window_NameInput[_0x3d8147(0x578)][_0x3d8147(0x58f)]=function(){const _0x41343c=_0x3d8147;if(!this[_0x41343c(0x75a)]())return;if(!this[_0x41343c(0x4c1)])return;if(Input[_0x41343c(0x253)](_0x41343c(0x477)))Input[_0x41343c(0x684)](),this[_0x41343c(0x7c4)]();else{if(this['_mode']===_0x41343c(0x544)){if(_0x41343c(0x618)===_0x41343c(0x7b1)){function _0x47d7e2(){const _0x4a9867=_0x41343c;_0x5e991e[_0x4a9867(0x64a)]&&(this[_0x4a9867(0x7b8)]='CTB');}}else this[_0x41343c(0x640)]();}else{if(Input[_0x41343c(0x253)]('escape'))Input[_0x41343c(0x684)](),this[_0x41343c(0x1d3)](_0x41343c(0x544));else{if(_0x41343c(0x1cb)==='YqBfP'){function _0x3d15ec(){const _0x398109=_0x41343c;if(_0x29b54b)_0x393055[_0x398109(0x389)](_0x23f8b4);}}else VisuMZ[_0x41343c(0x385)]['Window_NameInput_processHandling'][_0x41343c(0x3f6)](this);}}}},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x1a3)]=Window_NameInput[_0x3d8147(0x578)][_0x3d8147(0x634)],Window_NameInput[_0x3d8147(0x578)][_0x3d8147(0x634)]=function(){const _0x2eb1ab=_0x3d8147;if(!this[_0x2eb1ab(0x5cd)]())return;if(this['_mode']===_0x2eb1ab(0x544)){if(TouchInput[_0x2eb1ab(0x4cd)]()&&this[_0x2eb1ab(0x6e5)]())this['switchModes'](_0x2eb1ab(0x3ac));else TouchInput['isCancelled']()&&this[_0x2eb1ab(0x1d3)](_0x2eb1ab(0x3ac));}else{if(_0x2eb1ab(0x546)!==_0x2eb1ab(0x546)){function _0x548d49(){return _0x302b14;}}else VisuMZ[_0x2eb1ab(0x385)][_0x2eb1ab(0x1a3)][_0x2eb1ab(0x3f6)](this);}},Window_NameInput[_0x3d8147(0x578)]['processKeyboardHandling']=function(){const _0x561f9=_0x3d8147;if(Input[_0x561f9(0x253)](_0x561f9(0x353))){if('RYDCf'===_0x561f9(0x1b7))this[_0x561f9(0x20e)]();else{function _0x2fd6a6(){const _0x53c953=_0x561f9;if(this[_0x53c953(0x4da)])return;_0x11deea[_0x53c953(0x385)][_0x53c953(0x312)][_0x53c953(0x3f6)](this);}}}else{if(Input[_0x561f9(0x1c0)]!==undefined){let _0x537e88=Input[_0x561f9(0x1c0)],_0xd4006c=_0x537e88[_0x561f9(0x278)];for(let _0x91a468=0x0;_0x91a468<_0xd4006c;++_0x91a468){if('LDpOB'==='LDpOB'){if(this[_0x561f9(0x708)][_0x561f9(0x69d)](_0x537e88[_0x91a468])){if(_0x561f9(0x3bc)!==_0x561f9(0x49f))SoundManager[_0x561f9(0x2be)]();else{function _0x2e47ab(){const _0x4ed616=_0x561f9;this[_0x4ed616(0x63b)][_0x4ed616(0x305)](_0x4a35f8[_0x4ed616(0x4b8)][_0x4ed616(0x2b1)]);}}}else SoundManager['playBuzzer']();}else{function _0x2792c6(){return 0x0;}}}Input[_0x561f9(0x684)]();}}},Window_NameInput[_0x3d8147(0x578)]['switchModes']=function(_0x3c7c1d){const _0x42ae86=_0x3d8147;let _0x6cd96c=this[_0x42ae86(0x4d7)];this['_mode']=_0x3c7c1d;if(_0x6cd96c!==this[_0x42ae86(0x4d7)]){if(_0x42ae86(0x715)!==_0x42ae86(0x29e)){this['refresh'](),SoundManager[_0x42ae86(0x2be)]();if(this['_mode']==='default')this[_0x42ae86(0x501)](0x0);else{if(_0x42ae86(0x5e5)!==_0x42ae86(0x701))this[_0x42ae86(0x501)](-0x1);else{function _0x43042f(){const _0x2157b9=_0x42ae86;this[_0x2157b9(0x467)]=!![],this[_0x2157b9(0x4a2)]();}}}}else{function _0x5c0a6b(){const _0x960cf2=_0x42ae86;for(_0x48a9c7 of _0x4501fe[_0x960cf2(0x1ea)]()){_0x22d5d6['moveRelativeToResolutionChange']();}}}}},VisuMZ[_0x3d8147(0x385)]['Window_NameInput_cursorDown']=Window_NameInput[_0x3d8147(0x578)][_0x3d8147(0x37c)],Window_NameInput[_0x3d8147(0x578)][_0x3d8147(0x37c)]=function(_0x868bbd){const _0x3abb29=_0x3d8147;if(this['_mode']==='keyboard'&&!Input['isArrowPressed']())return;if(Input[_0x3abb29(0x237)]())return;VisuMZ['CoreEngine'][_0x3abb29(0x52e)][_0x3abb29(0x3f6)](this,_0x868bbd),this[_0x3abb29(0x1d3)](_0x3abb29(0x3ac));},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x524)]=Window_NameInput[_0x3d8147(0x578)][_0x3d8147(0x65a)],Window_NameInput['prototype'][_0x3d8147(0x65a)]=function(_0x27aace){const _0x390e61=_0x3d8147;if(this[_0x390e61(0x4d7)]===_0x390e61(0x544)&&!Input[_0x390e61(0x6ca)]())return;if(Input[_0x390e61(0x237)]())return;VisuMZ['CoreEngine'][_0x390e61(0x524)][_0x390e61(0x3f6)](this,_0x27aace),this[_0x390e61(0x1d3)](_0x390e61(0x3ac));},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x3d1)]=Window_NameInput[_0x3d8147(0x578)]['cursorRight'],Window_NameInput[_0x3d8147(0x578)]['cursorRight']=function(_0x57ee17){const _0x386283=_0x3d8147;if(this[_0x386283(0x4d7)]===_0x386283(0x544)&&!Input[_0x386283(0x6ca)]())return;if(Input[_0x386283(0x237)]())return;VisuMZ[_0x386283(0x385)]['Window_NameInput_cursorRight'][_0x386283(0x3f6)](this,_0x57ee17),this['switchModes'](_0x386283(0x3ac));},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x2bb)]=Window_NameInput[_0x3d8147(0x578)][_0x3d8147(0x31b)],Window_NameInput[_0x3d8147(0x578)][_0x3d8147(0x31b)]=function(_0x4b9a38){const _0x30e241=_0x3d8147;if(this['_mode']===_0x30e241(0x544)&&!Input['isArrowPressed']())return;if(Input[_0x30e241(0x237)]())return;VisuMZ[_0x30e241(0x385)][_0x30e241(0x2bb)][_0x30e241(0x3f6)](this,_0x4b9a38),this[_0x30e241(0x1d3)](_0x30e241(0x3ac));},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x50a)]=Window_NameInput[_0x3d8147(0x578)][_0x3d8147(0x269)],Window_NameInput['prototype']['cursorPagedown']=function(){const _0x142570=_0x3d8147;if(this[_0x142570(0x4d7)]===_0x142570(0x544))return;if(Input[_0x142570(0x237)]())return;VisuMZ[_0x142570(0x385)][_0x142570(0x50a)][_0x142570(0x3f6)](this),this[_0x142570(0x1d3)](_0x142570(0x3ac));},VisuMZ[_0x3d8147(0x385)]['Window_NameInput_cursorPageup']=Window_NameInput['prototype'][_0x3d8147(0x6c1)],Window_NameInput['prototype'][_0x3d8147(0x6c1)]=function(){const _0x4c05c=_0x3d8147;if(this[_0x4c05c(0x4d7)]==='keyboard')return;if(Input['isNumpadPressed']())return;VisuMZ[_0x4c05c(0x385)]['Window_NameInput_cursorPageup'][_0x4c05c(0x3f6)](this),this['switchModes'](_0x4c05c(0x3ac));},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x70f)]=Window_NameInput[_0x3d8147(0x578)][_0x3d8147(0x718)],Window_NameInput[_0x3d8147(0x578)]['refresh']=function(){const _0x460913=_0x3d8147;if(this[_0x460913(0x4d7)]===_0x460913(0x544)){if(_0x460913(0x376)===_0x460913(0x419)){function _0x262805(){const _0x25c628=_0x460913;return _0x49ed8c[_0x25c628(0x4b8)][_0x25c628(0x14e)]['call'](this);}}else{this[_0x460913(0x3c7)][_0x460913(0x684)](),this[_0x460913(0x18b)][_0x460913(0x684)](),this[_0x460913(0x133)]();let _0x28e22f=VisuMZ[_0x460913(0x385)]['Settings'][_0x460913(0x470)]['NameInputMessage']['split']('\x0a'),_0xcc40fb=_0x28e22f[_0x460913(0x278)],_0x40aa04=(this['innerHeight']-_0xcc40fb*this[_0x460913(0x244)]())/0x2;for(let _0x3718cb=0x0;_0x3718cb<_0xcc40fb;++_0x3718cb){let _0x1ecd6b=_0x28e22f[_0x3718cb],_0x252f08=this['textSizeEx'](_0x1ecd6b)[_0x460913(0x300)],_0x4310ec=Math['floor']((this['contents'][_0x460913(0x300)]-_0x252f08)/0x2);this[_0x460913(0x421)](_0x1ecd6b,_0x4310ec,_0x40aa04),_0x40aa04+=this[_0x460913(0x244)]();}}}else{if(_0x460913(0x6e7)!==_0x460913(0x15c))VisuMZ['CoreEngine'][_0x460913(0x70f)][_0x460913(0x3f6)](this);else{function _0x8466bc(){const _0x2373bb=_0x460913;return this[_0x2373bb(0x4de)](_0x16104c)&&_0x2c7b70['itypeId']===0x2;}}}};};VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x4f2)]=Window_ShopSell['prototype']['isEnabled'],Window_ShopSell[_0x3d8147(0x578)][_0x3d8147(0x185)]=function(_0x1ad704){const _0x485e12=_0x3d8147;if(VisuMZ[_0x485e12(0x385)][_0x485e12(0x2df)]['QoL'][_0x485e12(0x558)]&&DataManager[_0x485e12(0x1c6)](_0x1ad704)){if(_0x485e12(0x22b)===_0x485e12(0x22b))return![];else{function _0x37b96d(){const _0x72efb5=_0x485e12,_0x125a97=_0x72efb5(0x441);this[_0x72efb5(0x7d5)]=this[_0x72efb5(0x7d5)]||{};if(this[_0x72efb5(0x7d5)][_0x125a97])return this[_0x72efb5(0x7d5)][_0x125a97];const _0xaccfa1=_0x36fb07[_0x72efb5(0x385)][_0x72efb5(0x2df)][_0x72efb5(0x19d)][_0x72efb5(0x410)];return this[_0x72efb5(0x565)](_0x125a97,_0xaccfa1);}}}else return VisuMZ[_0x485e12(0x385)]['Window_ShopSell_isEnabled'][_0x485e12(0x3f6)](this,_0x1ad704);},Window_NumberInput[_0x3d8147(0x578)]['isUseModernControls']=function(){return![];};VisuMZ['CoreEngine']['Settings'][_0x3d8147(0x470)][_0x3d8147(0x535)]&&(VisuMZ['CoreEngine'][_0x3d8147(0x28d)]=Window_NumberInput[_0x3d8147(0x578)][_0x3d8147(0x572)],Window_NumberInput[_0x3d8147(0x578)][_0x3d8147(0x572)]=function(){const _0x3f22d2=_0x3d8147;VisuMZ[_0x3f22d2(0x385)][_0x3f22d2(0x28d)][_0x3f22d2(0x3f6)](this),this['select'](this[_0x3f22d2(0x7d6)]-0x1);},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x1c8)]=Window_NumberInput[_0x3d8147(0x578)][_0x3d8147(0x3d2)],Window_NumberInput[_0x3d8147(0x578)]['processDigitChange']=function(){const _0x41f7f2=_0x3d8147;if(!this[_0x41f7f2(0x5cd)]())return;if(Input[_0x41f7f2(0x237)]()){if(_0x41f7f2(0x2a7)===_0x41f7f2(0x2a7))this['processKeyboardDigitChange']();else{function _0x26f580(){const _0x345587=_0x41f7f2;this['_statusWindow'][_0x345587(0x305)](_0x13a400['layoutSettings'][_0x345587(0x466)]);}}}else{if(Input[_0x41f7f2(0x253)](_0x41f7f2(0x477))){if(_0x41f7f2(0x190)==='BmqbL'){function _0x3368f2(){const _0x117866=_0x41f7f2;return _0x25c4fa[_0x117866(0x481)]()||_0x206716[_0x117866(0x3b6)]()?_0xbf856a[_0x117866(0x385)]['Settings'][_0x117866(0x30a)]['Location']:_0x117866(0x4e4);}}else this[_0x41f7f2(0x523)]();}else{if(Input[_0x41f7f2(0x1ae)]===0x2e){if(_0x41f7f2(0x4b6)!==_0x41f7f2(0x4b6)){function _0x42ece5(){const _0x2355fa=_0x41f7f2;_0x489236[_0x2355fa(0x53f)](_0x538b23,_0x9b1af8);}}else this['processKeyboardDelete']();}else{if(Input[_0x41f7f2(0x1ae)]===0x24)this[_0x41f7f2(0x34f)]();else{if(Input[_0x41f7f2(0x1ae)]===0x23)this[_0x41f7f2(0x5dd)]();else{if(_0x41f7f2(0x4e8)!==_0x41f7f2(0x6eb))VisuMZ['CoreEngine'][_0x41f7f2(0x1c8)][_0x41f7f2(0x3f6)](this),Input[_0x41f7f2(0x684)]();else{function _0x417e33(){const _0x1a2bcd=_0x41f7f2;if(this[_0x1a2bcd(0x262)][_0x1a2bcd(0x6a8)[_0x1a2bcd(0x440)](_0x5531bb)]!==_0x5e69e1['buttonAssistKey%1'[_0x1a2bcd(0x440)](_0x9e20bc)]())return this[_0x1a2bcd(0x718)]();if(this[_0x1a2bcd(0x262)]['text%1'[_0x1a2bcd(0x440)](_0x59b4f8)]!==_0x6db973[_0x1a2bcd(0x36e)[_0x1a2bcd(0x440)](_0xfd230b)]())return this[_0x1a2bcd(0x718)]();}}}}}}}},Window_NumberInput[_0x3d8147(0x578)][_0x3d8147(0x173)]=function(){const _0x4604dc=_0x3d8147;if(!this[_0x4604dc(0x492)]())return;if(Input[_0x4604dc(0x237)]())this[_0x4604dc(0x432)]();else{if(_0x4604dc(0x622)===_0x4604dc(0x622))Window_Selectable[_0x4604dc(0x578)][_0x4604dc(0x173)][_0x4604dc(0x3f6)](this);else{function _0x25892f(){const _0x576c97=_0x4604dc;this[_0x576c97(0x269)]();}}}},Window_NumberInput[_0x3d8147(0x578)]['processCursorHomeEndTrigger']=function(){},Window_NumberInput[_0x3d8147(0x578)]['processKeyboardDigitChange']=function(){const _0x16ab36=_0x3d8147;if(String(this[_0x16ab36(0x67e)])[_0x16ab36(0x278)]>=this['_maxDigits'])return;this[_0x16ab36(0x67e)]=Number(String(this[_0x16ab36(0x67e)])+Input['_inputString']);const _0x2b41b7='9'[_0x16ab36(0x28c)](this[_0x16ab36(0x7d6)]);this['_number']=this[_0x16ab36(0x67e)][_0x16ab36(0x7ae)](0x0,_0x2b41b7),Input[_0x16ab36(0x684)](),this[_0x16ab36(0x718)](),SoundManager[_0x16ab36(0x691)](),this[_0x16ab36(0x501)](this[_0x16ab36(0x7d6)]-0x1);},Window_NumberInput[_0x3d8147(0x578)][_0x3d8147(0x523)]=function(){const _0x238562=_0x3d8147;this['_number']=Number(String(this[_0x238562(0x67e)])[_0x238562(0x7ab)](0x0,-0x1)),this[_0x238562(0x67e)]=Math[_0x238562(0x19b)](0x0,this[_0x238562(0x67e)]),Input[_0x238562(0x684)](),this[_0x238562(0x718)](),SoundManager[_0x238562(0x691)](),this[_0x238562(0x501)](this['_maxDigits']-0x1);},Window_NumberInput[_0x3d8147(0x578)][_0x3d8147(0x6e0)]=function(){const _0x40b990=_0x3d8147;this['_number']=Number(String(this['_number'])[_0x40b990(0x3d5)](0x1)),this['_number']=Math[_0x40b990(0x19b)](0x0,this[_0x40b990(0x67e)]),Input['clear'](),this['refresh'](),SoundManager[_0x40b990(0x691)](),this[_0x40b990(0x501)](this[_0x40b990(0x7d6)]-0x1);});;Window_TitleCommand[_0x3d8147(0x294)]=VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x2df)]['TitleCommandList'],Window_TitleCommand[_0x3d8147(0x578)]['makeCommandList']=function(){const _0x1141cd=_0x3d8147;this[_0x1141cd(0x192)]();},Window_TitleCommand[_0x3d8147(0x578)][_0x3d8147(0x192)]=function(){const _0x30bf58=_0x3d8147;for(const _0x254446 of Window_TitleCommand[_0x30bf58(0x294)]){if(_0x30bf58(0x6ab)!==_0x30bf58(0x430)){if(_0x254446[_0x30bf58(0x46b)][_0x30bf58(0x3f6)](this)){if('GuJKS'!=='LfWNe'){const _0x4bc0ce=_0x254446[_0x30bf58(0x3e0)];let _0x414808=_0x254446[_0x30bf58(0x1eb)];if(['',_0x30bf58(0x577)][_0x30bf58(0x760)](_0x414808))_0x414808=_0x254446['TextJS']['call'](this);const _0x45dca6=_0x254446[_0x30bf58(0x4c6)][_0x30bf58(0x3f6)](this),_0x526401=_0x254446[_0x30bf58(0x6a5)][_0x30bf58(0x3f6)](this);this[_0x30bf58(0x51a)](_0x414808,_0x4bc0ce,_0x45dca6,_0x526401),this[_0x30bf58(0x545)](_0x4bc0ce,_0x254446['CallHandlerJS']['bind'](this,_0x526401));}else{function _0x4dc3c4(){this['_coreEasingType']=_0x13a29f;}}}}else{function _0x4d9bc7(){const _0x4dd690=_0x30bf58;this[_0x4dd690(0x662)](0x0);}}}},Window_GameEnd['_commandList']=VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x2df)][_0x3d8147(0x647)]['GameEnd'][_0x3d8147(0x304)],Window_GameEnd[_0x3d8147(0x578)][_0x3d8147(0x64e)]=function(){const _0x186610=_0x3d8147;this[_0x186610(0x192)]();},Window_GameEnd[_0x3d8147(0x578)]['makeCoreEngineCommandList']=function(){const _0x12b818=_0x3d8147;for(const _0x4cfa9e of Window_GameEnd[_0x12b818(0x294)]){if(_0x4cfa9e[_0x12b818(0x46b)][_0x12b818(0x3f6)](this)){const _0x51b147=_0x4cfa9e[_0x12b818(0x3e0)];let _0x322a12=_0x4cfa9e[_0x12b818(0x1eb)];if(['',_0x12b818(0x577)][_0x12b818(0x760)](_0x322a12))_0x322a12=_0x4cfa9e['TextJS'][_0x12b818(0x3f6)](this);const _0x4eb5f2=_0x4cfa9e['EnableJS'][_0x12b818(0x3f6)](this),_0x25a3b6=_0x4cfa9e['ExtJS'][_0x12b818(0x3f6)](this);this[_0x12b818(0x51a)](_0x322a12,_0x51b147,_0x4eb5f2,_0x25a3b6),this[_0x12b818(0x545)](_0x51b147,_0x4cfa9e[_0x12b818(0x2c0)]['bind'](this,_0x25a3b6));}}};function Window_ButtonAssist(){const _0x1b07f9=_0x3d8147;this[_0x1b07f9(0x5b9)](...arguments);}Window_ButtonAssist[_0x3d8147(0x578)]=Object[_0x3d8147(0x313)](Window_Base['prototype']),Window_ButtonAssist[_0x3d8147(0x578)][_0x3d8147(0x460)]=Window_ButtonAssist,Window_ButtonAssist[_0x3d8147(0x578)]['initialize']=function(_0x277997){const _0x3a33a7=_0x3d8147;this[_0x3a33a7(0x262)]={},Window_Base[_0x3a33a7(0x578)][_0x3a33a7(0x5b9)][_0x3a33a7(0x3f6)](this,_0x277997),this['setBackgroundType'](VisuMZ['CoreEngine']['Settings'][_0x3a33a7(0x30a)][_0x3a33a7(0x27b)]||0x0),this[_0x3a33a7(0x718)]();},Window_ButtonAssist['prototype']['makeFontBigger']=function(){const _0x42ede1=_0x3d8147;if(this[_0x42ede1(0x3c7)][_0x42ede1(0x767)]<=0x60){if(_0x42ede1(0x5c9)===_0x42ede1(0x2d1)){function _0x4450f4(){const _0x4ebc0c=_0x42ede1;return _0x26de8d=_0x337162(_0xc77f58),this['_colorCache']=this[_0x4ebc0c(0x7d5)]||{},_0x1aed49[_0x4ebc0c(0x143)](/#(.*)/i)?this[_0x4ebc0c(0x7d5)][_0x3709b3]=_0x4ebc0c(0x780)[_0x4ebc0c(0x440)](_0xdeb337(_0x319d9c['$1'])):this['_colorCache'][_0x54d235]=this[_0x4ebc0c(0x1b4)](_0x533c02(_0x523494)),this[_0x4ebc0c(0x7d5)][_0x1b960e];}}else this[_0x42ede1(0x3c7)][_0x42ede1(0x767)]+=0x6;}},Window_ButtonAssist[_0x3d8147(0x578)]['makeFontSmaller']=function(){const _0x412a64=_0x3d8147;this[_0x412a64(0x3c7)][_0x412a64(0x767)]>=0x18&&(this[_0x412a64(0x3c7)][_0x412a64(0x767)]-=0x6);},Window_ButtonAssist[_0x3d8147(0x578)][_0x3d8147(0x50c)]=function(){const _0x22e670=_0x3d8147;Window_Base[_0x22e670(0x578)][_0x22e670(0x50c)][_0x22e670(0x3f6)](this),this[_0x22e670(0x529)]();},Window_ButtonAssist['prototype'][_0x3d8147(0x6af)]=function(){const _0x32d422=_0x3d8147;this[_0x32d422(0x196)]=SceneManager['_scene'][_0x32d422(0x352)]()!=='button'?0x0:0x8;},Window_ButtonAssist['prototype'][_0x3d8147(0x529)]=function(){const _0x229310=_0x3d8147,_0x2e9f8e=SceneManager[_0x229310(0x588)];for(let _0x557f8a=0x1;_0x557f8a<=0x5;_0x557f8a++){if(_0x229310(0x7d8)!==_0x229310(0x453)){if(this[_0x229310(0x262)][_0x229310(0x6a8)[_0x229310(0x440)](_0x557f8a)]!==_0x2e9f8e[_0x229310(0x3da)['format'](_0x557f8a)]()){if(_0x229310(0x5fe)==='ATEJW'){function _0x55d86f(){const _0x439370=_0x229310;_0x3c1632[_0x439370(0x385)][_0x439370(0x193)][_0x439370(0x3f6)](this);}}else return this[_0x229310(0x718)]();}if(this['_data']['text%1'[_0x229310(0x440)](_0x557f8a)]!==_0x2e9f8e['buttonAssistText%1'[_0x229310(0x440)](_0x557f8a)]())return this[_0x229310(0x718)]();}else{function _0x2ac70d(){const _0x3b5739=_0x229310;if(_0x4d02e5['inBattle']())return;_0x386f0b['ConvertParams'](_0x575cf5,_0x4016d8);const _0x21c77a=['animations',_0x3b5739(0x14b),'battlebacks2',_0x3b5739(0x541),_0x3b5739(0x6d7),_0x3b5739(0x4ae),_0x3b5739(0x44f),'pictures',_0x3b5739(0x29b),_0x3b5739(0x26e),'system','tilesets',_0x3b5739(0x222),_0x3b5739(0x7b9)];for(const _0xed9406 of _0x21c77a){const _0x4142c9=_0x11dbc6[_0xed9406],_0x4af903=_0x3b5739(0x5b6)[_0x3b5739(0x440)](_0xed9406);for(const _0x1aaf59 of _0x4142c9){_0xb7d1a8[_0x3b5739(0x53f)](_0x4af903,_0x1aaf59);}}}}}},Window_ButtonAssist['prototype']['refresh']=function(){const _0x2714bd=_0x3d8147;this[_0x2714bd(0x3c7)][_0x2714bd(0x684)]();for(let _0x14ca99=0x1;_0x14ca99<=0x5;_0x14ca99++){this[_0x2714bd(0x296)](_0x14ca99);}},Window_ButtonAssist['prototype'][_0x3d8147(0x296)]=function(_0x2e5476){const _0x1d634c=_0x3d8147,_0x46db1c=this[_0x1d634c(0x518)]/0x5,_0x2f42a8=SceneManager['_scene'],_0x5b1a20=_0x2f42a8[_0x1d634c(0x3da)[_0x1d634c(0x440)](_0x2e5476)](),_0x378af7=_0x2f42a8[_0x1d634c(0x36e)[_0x1d634c(0x440)](_0x2e5476)]();this[_0x1d634c(0x262)][_0x1d634c(0x6a8)[_0x1d634c(0x440)](_0x2e5476)]=_0x5b1a20,this[_0x1d634c(0x262)][_0x1d634c(0x60b)['format'](_0x2e5476)]=_0x378af7;if(_0x5b1a20==='')return;if(_0x378af7==='')return;const _0x54de9a=_0x2f42a8[_0x1d634c(0x6e3)['format'](_0x2e5476)](),_0x47678e=this['itemPadding'](),_0x362e20=_0x46db1c*(_0x2e5476-0x1)+_0x47678e+_0x54de9a,_0x5b3956=VisuMZ[_0x1d634c(0x385)][_0x1d634c(0x2df)]['ButtonAssist'][_0x1d634c(0x503)];this[_0x1d634c(0x421)](_0x5b3956[_0x1d634c(0x440)](_0x5b1a20,_0x378af7),_0x362e20,0x0,_0x46db1c-_0x47678e*0x2);},VisuMZ[_0x3d8147(0x5d0)]=function(_0x1b09a5){const _0x8c3b2b=_0x3d8147;if(Utils[_0x8c3b2b(0x13b)](_0x8c3b2b(0x5a3))){if(_0x8c3b2b(0x599)==='suMrx'){function _0x233aab(){const _0x1bd8dd=_0x8c3b2b,_0x4954eb=_0x1e15d2[_0x20d422],_0x439f1b=_0x1bd8dd(0x5b6)['format'](_0x3e00f9);for(const _0x1ae92f of _0x4954eb){_0x4a729d[_0x1bd8dd(0x53f)](_0x439f1b,_0x1ae92f);}}}else{var _0x4d1030=require(_0x8c3b2b(0x1aa))[_0x8c3b2b(0x73a)][_0x8c3b2b(0x1e6)]();SceneManager[_0x8c3b2b(0x550)]();if(_0x1b09a5)setTimeout(_0x4d1030[_0x8c3b2b(0x55d)][_0x8c3b2b(0x2f9)](_0x4d1030),0x190);}}},VisuMZ[_0x3d8147(0x427)]=function(_0x116724,_0x194c40){const _0x396670=_0x3d8147;_0x194c40=_0x194c40[_0x396670(0x7bb)]();var _0x467cce=1.70158,_0x86c38f=0.7;switch(_0x194c40){case _0x396670(0x3fc):return _0x116724;case _0x396670(0x15b):return-0x1*Math[_0x396670(0x66f)](_0x116724*(Math['PI']/0x2))+0x1;case _0x396670(0x62c):return Math[_0x396670(0x5c6)](_0x116724*(Math['PI']/0x2));case _0x396670(0x735):return-0.5*(Math[_0x396670(0x66f)](Math['PI']*_0x116724)-0x1);case _0x396670(0x408):return _0x116724*_0x116724;case'OUTQUAD':return _0x116724*(0x2-_0x116724);case _0x396670(0x6ac):return _0x116724<0.5?0x2*_0x116724*_0x116724:-0x1+(0x4-0x2*_0x116724)*_0x116724;case _0x396670(0x739):return _0x116724*_0x116724*_0x116724;case _0x396670(0x345):var _0xf1a004=_0x116724-0x1;return _0xf1a004*_0xf1a004*_0xf1a004+0x1;case _0x396670(0x218):return _0x116724<0.5?0x4*_0x116724*_0x116724*_0x116724:(_0x116724-0x1)*(0x2*_0x116724-0x2)*(0x2*_0x116724-0x2)+0x1;case'INQUART':return _0x116724*_0x116724*_0x116724*_0x116724;case _0x396670(0x5bd):var _0xf1a004=_0x116724-0x1;return 0x1-_0xf1a004*_0xf1a004*_0xf1a004*_0xf1a004;case _0x396670(0x37f):var _0xf1a004=_0x116724-0x1;return _0x116724<0.5?0x8*_0x116724*_0x116724*_0x116724*_0x116724:0x1-0x8*_0xf1a004*_0xf1a004*_0xf1a004*_0xf1a004;case _0x396670(0x13a):return _0x116724*_0x116724*_0x116724*_0x116724*_0x116724;case _0x396670(0x45d):var _0xf1a004=_0x116724-0x1;return 0x1+_0xf1a004*_0xf1a004*_0xf1a004*_0xf1a004*_0xf1a004;case _0x396670(0x56d):var _0xf1a004=_0x116724-0x1;return _0x116724<0.5?0x10*_0x116724*_0x116724*_0x116724*_0x116724*_0x116724:0x1+0x10*_0xf1a004*_0xf1a004*_0xf1a004*_0xf1a004*_0xf1a004;case _0x396670(0x5fd):if(_0x116724===0x0)return 0x0;return Math['pow'](0x2,0xa*(_0x116724-0x1));case'OUTEXPO':if(_0x116724===0x1)return 0x1;return-Math[_0x396670(0x6ce)](0x2,-0xa*_0x116724)+0x1;case _0x396670(0x1fa):if(_0x116724===0x0||_0x116724===0x1)return _0x116724;var _0x198aa9=_0x116724*0x2,_0x17be74=_0x198aa9-0x1;if(_0x198aa9<0x1)return 0.5*Math[_0x396670(0x6ce)](0x2,0xa*_0x17be74);return 0.5*(-Math[_0x396670(0x6ce)](0x2,-0xa*_0x17be74)+0x2);case _0x396670(0x722):var _0x198aa9=_0x116724/0x1;return-0x1*(Math['sqrt'](0x1-_0x198aa9*_0x116724)-0x1);case _0x396670(0x4ce):var _0xf1a004=_0x116724-0x1;return Math[_0x396670(0x41f)](0x1-_0xf1a004*_0xf1a004);case'INOUTCIRC':var _0x198aa9=_0x116724*0x2,_0x17be74=_0x198aa9-0x2;if(_0x198aa9<0x1)return-0.5*(Math['sqrt'](0x1-_0x198aa9*_0x198aa9)-0x1);return 0.5*(Math[_0x396670(0x41f)](0x1-_0x17be74*_0x17be74)+0x1);case'INBACK':return _0x116724*_0x116724*((_0x467cce+0x1)*_0x116724-_0x467cce);case'OUTBACK':var _0x198aa9=_0x116724/0x1-0x1;return _0x198aa9*_0x198aa9*((_0x467cce+0x1)*_0x198aa9+_0x467cce)+0x1;break;case _0x396670(0x2b9):var _0x198aa9=_0x116724*0x2,_0x23182d=_0x198aa9-0x2,_0x26cb61=_0x467cce*1.525;if(_0x198aa9<0x1)return 0.5*_0x198aa9*_0x198aa9*((_0x26cb61+0x1)*_0x198aa9-_0x26cb61);return 0.5*(_0x23182d*_0x23182d*((_0x26cb61+0x1)*_0x23182d+_0x26cb61)+0x2);case _0x396670(0x229):if(_0x116724===0x0||_0x116724===0x1){if(_0x396670(0x657)!==_0x396670(0x657)){function _0x544ba8(){const _0x2caf09=_0x396670;return this[_0x2caf09(0x1a9)]();}}else return _0x116724;}var _0x198aa9=_0x116724/0x1,_0x17be74=_0x198aa9-0x1,_0x302575=0x1-_0x86c38f,_0x26cb61=_0x302575/(0x2*Math['PI'])*Math['asin'](0x1);return-(Math[_0x396670(0x6ce)](0x2,0xa*_0x17be74)*Math[_0x396670(0x5c6)]((_0x17be74-_0x26cb61)*(0x2*Math['PI'])/_0x302575));case _0x396670(0x586):var _0x302575=0x1-_0x86c38f,_0x198aa9=_0x116724*0x2;if(_0x116724===0x0||_0x116724===0x1){if(_0x396670(0x250)!=='IlslZ'){function _0xbee0d8(){const _0x29316d=_0x396670;this[_0x29316d(0x45b)](),_0x49aaab[_0x29316d(0x1c2)]();}}else return _0x116724;}var _0x26cb61=_0x302575/(0x2*Math['PI'])*Math[_0x396670(0x7a1)](0x1);return Math[_0x396670(0x6ce)](0x2,-0xa*_0x198aa9)*Math[_0x396670(0x5c6)]((_0x198aa9-_0x26cb61)*(0x2*Math['PI'])/_0x302575)+0x1;case'INOUTELASTIC':var _0x302575=0x1-_0x86c38f;if(_0x116724===0x0||_0x116724===0x1)return _0x116724;var _0x198aa9=_0x116724*0x2,_0x17be74=_0x198aa9-0x1,_0x26cb61=_0x302575/(0x2*Math['PI'])*Math[_0x396670(0x7a1)](0x1);if(_0x198aa9<0x1){if(_0x396670(0x3a3)===_0x396670(0x47e)){function _0x57f384(){const _0x39d129=_0x396670;_0x2eba02['CoreEngine'][_0x39d129(0x2df)]['QoL'][_0x39d129(0x360)]&&_0x1a07f1['ShowDevTools'](!![]),_0x5429f2[_0x39d129(0x385)][_0x39d129(0x2df)][_0x39d129(0x672)][_0x39d129(0x40d)]&&(_0x132155[_0x39d129(0x547)][0x23]=_0x39d129(0x307),_0x449ec2[_0x39d129(0x547)][0x24]=_0x39d129(0x47b));}}else return-0.5*(Math[_0x396670(0x6ce)](0x2,0xa*_0x17be74)*Math['sin']((_0x17be74-_0x26cb61)*(0x2*Math['PI'])/_0x302575));}return Math[_0x396670(0x6ce)](0x2,-0xa*_0x17be74)*Math[_0x396670(0x5c6)]((_0x17be74-_0x26cb61)*(0x2*Math['PI'])/_0x302575)*0.5+0x1;case _0x396670(0x609):var _0x198aa9=_0x116724/0x1;if(_0x198aa9<0x1/2.75)return 7.5625*_0x198aa9*_0x198aa9;else{if(_0x198aa9<0x2/2.75){if(_0x396670(0x553)===_0x396670(0x554)){function _0x1e9fa6(){const _0x2c7084=_0x396670;_0x151282+=_0x7a7095['prototype'][_0x2c7084(0x244)]();}}else{var _0x23182d=_0x198aa9-1.5/2.75;return 7.5625*_0x23182d*_0x23182d+0.75;}}else{if(_0x198aa9<2.5/2.75){if(_0x396670(0x604)===_0x396670(0x604)){var _0x23182d=_0x198aa9-2.25/2.75;return 7.5625*_0x23182d*_0x23182d+0.9375;}else{function _0x533389(){const _0x56d584=_0x396670;return _0x1f4a98['layoutSettings'][_0x56d584(0x6a2)]['call'](this);}}}else{if(_0x396670(0x359)==='RhDao'){var _0x23182d=_0x198aa9-2.625/2.75;return 7.5625*_0x23182d*_0x23182d+0.984375;}else{function _0x22a5d9(){const _0x5c5379=_0x396670;_0x4af22d=_0x84bb9d[_0x5c5379(0x385)][_0x5c5379(0x1b3)]['call'](this);}}}}}case _0x396670(0x2b5):var _0x54f7d9=0x1-VisuMZ[_0x396670(0x427)](0x1-_0x116724,'outbounce');return _0x54f7d9;case _0x396670(0x765):if(_0x116724<0.5)var _0x54f7d9=VisuMZ[_0x396670(0x427)](_0x116724*0x2,_0x396670(0x654))*0.5;else{if('MmejX'===_0x396670(0x1b6)){function _0x3036a1(){const _0x1d813d=_0x396670;return _0x79967a[_0x1d813d(0x3ee)]()?this[_0x1d813d(0x20b)]():_0x5a2c4d[_0x1d813d(0x385)]['Scene_MenuBase_mainAreaTop'][_0x1d813d(0x3f6)](this);}}else var _0x54f7d9=VisuMZ[_0x396670(0x427)](_0x116724*0x2-0x1,'outbounce')*0.5+0.5;}return _0x54f7d9;default:return _0x116724;}},VisuMZ['GetParamIcon']=function(_0x2ff367){const _0x3efc0a=_0x3d8147;_0x2ff367=String(_0x2ff367)[_0x3efc0a(0x7bb)]();const _0xaa5605=VisuMZ[_0x3efc0a(0x385)][_0x3efc0a(0x2df)][_0x3efc0a(0x641)];if(_0x2ff367==='MAXHP')return _0xaa5605['IconParam0'];if(_0x2ff367===_0x3efc0a(0x264))return _0xaa5605[_0x3efc0a(0x20d)];if(_0x2ff367===_0x3efc0a(0x3ef))return _0xaa5605['IconParam2'];if(_0x2ff367==='DEF')return _0xaa5605['IconParam3'];if(_0x2ff367===_0x3efc0a(0x77f))return _0xaa5605[_0x3efc0a(0x764)];if(_0x2ff367===_0x3efc0a(0x2c8))return _0xaa5605[_0x3efc0a(0x158)];if(_0x2ff367===_0x3efc0a(0x6a4))return _0xaa5605[_0x3efc0a(0x5c1)];if(_0x2ff367==='LUK')return _0xaa5605['IconParam7'];if(_0x2ff367==='HIT')return _0xaa5605['IconXParam0'];if(_0x2ff367===_0x3efc0a(0x73e))return _0xaa5605[_0x3efc0a(0x5fa)];if(_0x2ff367===_0x3efc0a(0x1ec))return _0xaa5605[_0x3efc0a(0x330)];if(_0x2ff367===_0x3efc0a(0x166))return _0xaa5605[_0x3efc0a(0x2ec)];if(_0x2ff367===_0x3efc0a(0x19a))return _0xaa5605[_0x3efc0a(0x1db)];if(_0x2ff367===_0x3efc0a(0x7ba))return _0xaa5605['IconXParam5'];if(_0x2ff367===_0x3efc0a(0x2b6))return _0xaa5605[_0x3efc0a(0x238)];if(_0x2ff367===_0x3efc0a(0x762))return _0xaa5605[_0x3efc0a(0x4f5)];if(_0x2ff367===_0x3efc0a(0x3f1))return _0xaa5605[_0x3efc0a(0x241)];if(_0x2ff367==='TRG')return _0xaa5605[_0x3efc0a(0x3cb)];if(_0x2ff367===_0x3efc0a(0x4f0))return _0xaa5605[_0x3efc0a(0x771)];if(_0x2ff367===_0x3efc0a(0x712))return _0xaa5605[_0x3efc0a(0x2fb)];if(_0x2ff367==='REC')return _0xaa5605[_0x3efc0a(0x24b)];if(_0x2ff367===_0x3efc0a(0x3df))return _0xaa5605['IconSParam3'];if(_0x2ff367===_0x3efc0a(0x68d))return _0xaa5605['IconSParam4'];if(_0x2ff367===_0x3efc0a(0x4a5))return _0xaa5605[_0x3efc0a(0x4a8)];if(_0x2ff367===_0x3efc0a(0x6e8))return _0xaa5605['IconSParam6'];if(_0x2ff367===_0x3efc0a(0x650))return _0xaa5605[_0x3efc0a(0x32b)];if(_0x2ff367===_0x3efc0a(0x1a8))return _0xaa5605[_0x3efc0a(0x476)];if(_0x2ff367==='EXR')return _0xaa5605[_0x3efc0a(0x606)];if(VisuMZ[_0x3efc0a(0x385)]['CustomParamIcons'][_0x2ff367]){if(_0x3efc0a(0x20a)!=='zwiFF'){function _0x3fc4c5(){const _0x33f249=_0x3efc0a;var _0x352ac3=_0x122096(_0x17a55f['$1']);try{_0x2ddbf8+=_0x3195c5(_0x352ac3);}catch(_0x1dcc9a){if(_0x27890['isPlaytest']())_0x1cc7b9[_0x33f249(0x694)](_0x1dcc9a);}}}else return VisuMZ[_0x3efc0a(0x385)][_0x3efc0a(0x1e3)][_0x2ff367]||0x0;}return 0x0;},VisuMZ[_0x3d8147(0x677)]=function(_0x5a8b58,_0xa172e1){const _0x296232=_0x3d8147;if(_0x5a8b58%0x1===0x0)return _0x5a8b58;return _0xa172e1=_0xa172e1||0x0,String((_0x5a8b58*0x64)[_0x296232(0x493)](_0xa172e1))+'%';},VisuMZ[_0x3d8147(0x498)]=function(_0x4df07e){const _0xea591a=_0x3d8147;_0x4df07e=String(_0x4df07e);if(!_0x4df07e)return _0x4df07e;if(typeof _0x4df07e!==_0xea591a(0x5b8))return _0x4df07e;const _0x50171d=VisuMZ[_0xea591a(0x385)][_0xea591a(0x2df)][_0xea591a(0x672)][_0xea591a(0x46c)]||_0xea591a(0x2dc),_0x226734={'maximumFractionDigits':0x6};_0x4df07e=_0x4df07e[_0xea591a(0x5a9)](/\[(.*?)\]/g,(_0x15660d,_0x7a7ba4)=>{const _0x4960ff=_0xea591a;return VisuMZ[_0x4960ff(0x725)](_0x7a7ba4,'[',']');}),_0x4df07e=_0x4df07e[_0xea591a(0x5a9)](/<(.*?)>/g,(_0x4d2e44,_0x1d2e32)=>{const _0xfe8700=_0xea591a;return VisuMZ[_0xfe8700(0x725)](_0x1d2e32,'<','>');}),_0x4df07e=_0x4df07e['replace'](/\{\{(.*?)\}\}/g,(_0x313d5a,_0x3e99b3)=>{const _0x215ddf=_0xea591a;return VisuMZ[_0x215ddf(0x725)](_0x3e99b3,'','');}),_0x4df07e=_0x4df07e[_0xea591a(0x5a9)](/(\d+\.?\d*)/g,(_0x5e2324,_0x1e2723)=>{const _0x2ebfe3=_0xea591a;if(_0x2ebfe3(0x2d0)!==_0x2ebfe3(0x2d0)){function _0x3e464c(){const _0x5c1072=_0x2ebfe3;_0x4664e6[_0x5c1072(0x644)](_0x1a0dc1);}}else{let _0x507edf=_0x1e2723;if(_0x507edf[0x0]==='0')return _0x507edf;if(_0x507edf[_0x507edf['length']-0x1]==='.'){if('vybmJ'!==_0x2ebfe3(0x5ab)){function _0x10c9ba(){this['_customModified']=!![];}}else return Number(_0x507edf)[_0x2ebfe3(0x6bb)](_0x50171d,_0x226734)+'.';}else{if(_0x507edf[_0x507edf[_0x2ebfe3(0x278)]-0x1]===','){if('dXHyY'===_0x2ebfe3(0x26c))return Number(_0x507edf)['toLocaleString'](_0x50171d,_0x226734)+',';else{function _0x379af7(){const _0x44c7e2=_0x2ebfe3,_0x4358e8=_0x44c7e2(0x21b);this['_colorCache']=this[_0x44c7e2(0x7d5)]||{};if(this[_0x44c7e2(0x7d5)][_0x4358e8])return this[_0x44c7e2(0x7d5)][_0x4358e8];const _0x5b1663=_0x424799[_0x44c7e2(0x385)][_0x44c7e2(0x2df)][_0x44c7e2(0x19d)][_0x44c7e2(0x706)];return this['getColorDataFromPluginParameters'](_0x4358e8,_0x5b1663);}}}else{if('CwNcq'!==_0x2ebfe3(0x285))return Number(_0x507edf)['toLocaleString'](_0x50171d,_0x226734);else{function _0x55feb3(){const _0x2c42f6=_0x2ebfe3;this[_0x2c42f6(0x2e0)][_0x2c42f6(0x305)](_0x2eec6c[_0x2c42f6(0x4b8)]['BuyBgType']);}}}}}});let _0x57fd98=0x3;while(_0x57fd98--){if(_0xea591a(0x4b4)!==_0xea591a(0x4b4)){function _0x504f37(){const _0x10afe9=_0xea591a;if(_0x4ddbe6[_0x10afe9(0x65f)]==='SV')return!![];else{if(_0x56990f[_0x10afe9(0x65f)]==='FV')return![];}if(this[_0x10afe9(0x295)]===_0x5e5096)this[_0x10afe9(0x7a0)]();if(this['_CoreEngineSettings']['SideView']===_0x145934)this[_0x10afe9(0x7a0)]();return this[_0x10afe9(0x295)][_0x10afe9(0x3fd)];}}else _0x4df07e=VisuMZ[_0xea591a(0x3e5)](_0x4df07e);}return _0x4df07e;},VisuMZ[_0x3d8147(0x725)]=function(_0x5c81f5,_0x1a5f6f,_0x4d17ce){const _0x565633=_0x3d8147;return _0x5c81f5=_0x5c81f5[_0x565633(0x5a9)](/(\d)/gi,(_0x4c3515,_0x46333a)=>_0x565633(0x3f4)[_0x565633(0x440)](Number(_0x46333a))),_0x565633(0x363)[_0x565633(0x440)](_0x5c81f5,_0x1a5f6f,_0x4d17ce);},VisuMZ[_0x3d8147(0x3e5)]=function(_0x2cab76){const _0x34bd24=_0x3d8147;return _0x2cab76=_0x2cab76[_0x34bd24(0x5a9)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x30c487,_0x143cd1)=>Number(parseInt(_0x143cd1))),_0x2cab76;},VisuMZ[_0x3d8147(0x4ad)]=function(_0x57483e){const _0x205911=_0x3d8147;SoundManager[_0x205911(0x2be)]();if(!Utils[_0x205911(0x4f4)]()){if(_0x205911(0x2c7)!=='nwTbS'){const _0x50e163=window[_0x205911(0x74b)](_0x57483e,_0x205911(0x6c9));}else{function _0x4337bd(){const _0x301f5a=_0x205911;if(_0x1b5516[_0x301f5a(0x143)](/backspace/i))return this[_0x301f5a(0x1ae)]===0x8;if(_0x3c3e76[_0x301f5a(0x143)](/enter/i))return this[_0x301f5a(0x1ae)]===0xd;if(_0x3afd5a[_0x301f5a(0x143)](/escape/i))return this[_0x301f5a(0x1ae)]===0x1b;}}}else{if('ySTOz'===_0x205911(0x4d5)){function _0x1347df(){this['_forcedTroopView']='SV';}}else{const _0x48037d=process[_0x205911(0x6d5)]=='darwin'?_0x205911(0x74b):process[_0x205911(0x6d5)]==_0x205911(0x557)?'start':'xdg-open';require(_0x205911(0x37a))[_0x205911(0x404)](_0x48037d+'\x20'+_0x57483e);}}},Sprite_Clickable[_0x3d8147(0x578)]['processTouch']=function(){const _0x39a636=_0x3d8147;if(this[_0x39a636(0x23e)]()){if(this[_0x39a636(0x15f)]()){if(_0x39a636(0x199)!==_0x39a636(0x199)){function _0x40b514(){_0x362976*=_0x400b88(_0x48c391);}}else{if(!this[_0x39a636(0x467)]&&TouchInput[_0x39a636(0x1cc)]()){if('ONihP'!==_0x39a636(0x530)){function _0x3aab3f(){const _0x4d3347=_0x39a636;return _0x311cce[_0x4d3347(0x385)]['Game_Action_itemEva'][_0x4d3347(0x3f6)](this,_0x3de033);}}else this[_0x39a636(0x467)]=!![],this['onMouseEnter']();}if(TouchInput['isTriggered']()){if('worSt'!==_0x39a636(0x693)){function _0x58eca1(){const _0x8f0602=_0x39a636;return this[_0x8f0602(0x20b)]();}}else this[_0x39a636(0x14c)]=!![],this[_0x39a636(0x7c5)]();}}}else{if(_0x39a636(0x19c)===_0x39a636(0x19c))this['_hovered']&&this[_0x39a636(0x5d2)](),this[_0x39a636(0x14c)]=![],this[_0x39a636(0x467)]=![];else{function _0x181fb2(){const _0x2dd879=_0x39a636;this['_dummyWindow'][_0x2dd879(0x305)](_0x2fa281[_0x2dd879(0x4b8)][_0x2dd879(0x6f3)]);}}}this[_0x39a636(0x14c)]&&TouchInput['isReleased']()&&(this[_0x39a636(0x14c)]=![],this[_0x39a636(0x4fa)]());}else this[_0x39a636(0x14c)]=![],this[_0x39a636(0x467)]=![];},Game_Picture[_0x3d8147(0x578)]['anchor']=function(){return this['_anchor'];},VisuMZ['CoreEngine'][_0x3d8147(0x3a2)]=Game_Picture[_0x3d8147(0x578)][_0x3d8147(0x326)],Game_Picture[_0x3d8147(0x578)][_0x3d8147(0x326)]=function(){const _0x5f1629=_0x3d8147;VisuMZ[_0x5f1629(0x385)]['Game_Picture_initBasic'][_0x5f1629(0x3f6)](this),this[_0x5f1629(0x1ab)]={'x':0x0,'y':0x0},this[_0x5f1629(0x511)]={'x':0x0,'y':0x0};},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x6fc)]=Game_Picture[_0x3d8147(0x578)][_0x3d8147(0x34b)],Game_Picture['prototype'][_0x3d8147(0x34b)]=function(){const _0x5a56a1=_0x3d8147;this[_0x5a56a1(0x1c9)](),VisuMZ[_0x5a56a1(0x385)][_0x5a56a1(0x6fc)][_0x5a56a1(0x3f6)](this);},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x1f1)]=Game_Picture['prototype'][_0x3d8147(0x5ef)],Game_Picture[_0x3d8147(0x578)]['show']=function(_0x4d3958,_0x5976b1,_0x1becb1,_0x2ed88c,_0x539607,_0x160c3b,_0x4fd8fe,_0x11a6b4){const _0x393146=_0x3d8147;VisuMZ[_0x393146(0x385)][_0x393146(0x1f1)][_0x393146(0x3f6)](this,_0x4d3958,_0x5976b1,_0x1becb1,_0x2ed88c,_0x539607,_0x160c3b,_0x4fd8fe,_0x11a6b4),this['setAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x5976b1]||{'x':0x0,'y':0x0});},VisuMZ[_0x3d8147(0x385)][_0x3d8147(0x2bc)]=Game_Picture['prototype'][_0x3d8147(0x1b9)],Game_Picture[_0x3d8147(0x578)][_0x3d8147(0x1b9)]=function(_0x32ba5a,_0x81f76d,_0x497aa2,_0x861329,_0x485e7c,_0xfe131d,_0xa292eb,_0x1ba714,_0x375c8e){const _0x44d619=_0x3d8147;VisuMZ[_0x44d619(0x385)][_0x44d619(0x2bc)]['call'](this,_0x32ba5a,_0x81f76d,_0x497aa2,_0x861329,_0x485e7c,_0xfe131d,_0xa292eb,_0x1ba714,_0x375c8e),this[_0x44d619(0x2c4)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x32ba5a]||{'x':0x0,'y':0x0});},Game_Picture[_0x3d8147(0x578)][_0x3d8147(0x1c9)]=function(){const _0x2c6b10=_0x3d8147;this['_duration']>0x0&&(this[_0x2c6b10(0x1ab)]['x']=this[_0x2c6b10(0x54b)](this[_0x2c6b10(0x1ab)]['x'],this[_0x2c6b10(0x511)]['x']),this['_anchor']['y']=this[_0x2c6b10(0x54b)](this[_0x2c6b10(0x1ab)]['y'],this[_0x2c6b10(0x511)]['y']));},Game_Picture[_0x3d8147(0x578)][_0x3d8147(0x321)]=function(_0x12432e){const _0x2555b4=_0x3d8147;this[_0x2555b4(0x1ab)]=_0x12432e,this[_0x2555b4(0x511)]=JsonEx[_0x2555b4(0x34d)](this[_0x2555b4(0x1ab)]);},Game_Picture[_0x3d8147(0x578)]['setTargetAnchor']=function(_0xcadd49){const _0xbf35c1=_0x3d8147;this[_0xbf35c1(0x511)]=_0xcadd49;},VisuMZ['CoreEngine'][_0x3d8147(0x254)]=Sprite_Picture[_0x3d8147(0x578)][_0x3d8147(0x7cf)],Sprite_Picture[_0x3d8147(0x578)][_0x3d8147(0x7cf)]=function(){const _0x50ec1d=_0x3d8147,_0x108352=this[_0x50ec1d(0x57b)]();!_0x108352[_0x50ec1d(0x233)]()?VisuMZ[_0x50ec1d(0x385)][_0x50ec1d(0x254)][_0x50ec1d(0x3f6)](this):(this['anchor']['x']=_0x108352[_0x50ec1d(0x233)]()['x'],this[_0x50ec1d(0x233)]['y']=_0x108352[_0x50ec1d(0x233)]()['y']);},Game_Action['prototype'][_0x3d8147(0x616)]=function(_0x158d92){const _0x4a9f21=_0x3d8147;if(_0x158d92){const _0x57a854=_0x158d92[_0x4a9f21(0x794)];if(_0x57a854===0x1&&this[_0x4a9f21(0x48f)]()[_0x4a9f21(0x750)]()!==0x1){if('bKVSq'!==_0x4a9f21(0x62d))this[_0x4a9f21(0x798)]();else{function _0x351636(){const _0x132b21=_0x4a9f21;return _0x57fd25[_0x132b21(0x385)][_0x132b21(0x2df)][_0x132b21(0x30a)][_0x132b21(0x4b0)];}}}else _0x57a854===0x2&&this[_0x4a9f21(0x48f)]()[_0x4a9f21(0x53c)]()!==0x2?this[_0x4a9f21(0x7b2)]():this[_0x4a9f21(0x1be)](_0x57a854);}else this[_0x4a9f21(0x684)]();},Game_Actor['prototype'][_0x3d8147(0x6a6)]=function(){const _0x16c26d=_0x3d8147;return this['skills']()['filter'](_0x1ef0e5=>this[_0x16c26d(0x66a)](_0x1ef0e5)&&this[_0x16c26d(0x331)]()[_0x16c26d(0x760)](_0x1ef0e5[_0x16c26d(0x3d6)]));},Window_Base['prototype'][_0x3d8147(0x355)]=function(){const _0x30100b=_0x3d8147;if(this[_0x30100b(0x39e)]){if(_0x30100b(0x6ec)!==_0x30100b(0x6ec)){function _0x12ba47(){const _0x6f2985=_0x30100b;return _0x2e2989[_0x6f2985(0x63a)];}}else{const _0x56ae14=this['_dimmerSprite'][_0x30100b(0x61f)],_0xc7036e=this[_0x30100b(0x300)],_0x1632cc=this[_0x30100b(0x195)],_0x101019=this['padding'],_0x379ab9=ColorManager[_0x30100b(0x180)](),_0x519215=ColorManager[_0x30100b(0x23c)]();_0x56ae14[_0x30100b(0x785)](_0xc7036e,_0x1632cc),_0x56ae14[_0x30100b(0x57d)](0x0,0x0,_0xc7036e,_0x101019,_0x519215,_0x379ab9,!![]),_0x56ae14[_0x30100b(0x333)](0x0,_0x101019,_0xc7036e,_0x1632cc-_0x101019*0x2,_0x379ab9),_0x56ae14[_0x30100b(0x57d)](0x0,_0x1632cc-_0x101019,_0xc7036e,_0x101019,_0x379ab9,_0x519215,!![]),this[_0x30100b(0x39e)][_0x30100b(0x373)](0x0,0x0,_0xc7036e,_0x1632cc);}}},Game_Actor[_0x3d8147(0x578)]['makeAutoBattleActions']=function(){const _0x45b188=_0x3d8147;for(let _0x244f3d=0x0;_0x244f3d<this[_0x45b188(0x33c)]();_0x244f3d++){if('dzzkB'!==_0x45b188(0x736)){const _0x187be0=this['makeActionList']();let _0x51265f=Number[_0x45b188(0x2da)];this[_0x45b188(0x21e)](_0x244f3d,_0x187be0[0x0]);for(const _0x56f815 of _0x187be0){const _0xe76f2d=_0x56f815[_0x45b188(0x784)]();_0xe76f2d>_0x51265f&&(_0x51265f=_0xe76f2d,this[_0x45b188(0x21e)](_0x244f3d,_0x56f815));}}else{function _0x1a68d5(){const _0xad2720=_0x45b188;this[_0xad2720(0x5c3)][_0xad2720(0x7bf)](_0x2f3092),this[_0xad2720(0x5bc)][_0xad2720(0x68a)](_0x434861);for(const _0x15c440 of _0x2353b6[_0xad2720(0x621)]){_0x15c440[_0xad2720(0x3c1)]&&_0x15c440[_0xad2720(0x3c1)]();}_0x99d796[_0xad2720(0x734)]();}}}this[_0x45b188(0x4d2)](_0x45b188(0x25a));};