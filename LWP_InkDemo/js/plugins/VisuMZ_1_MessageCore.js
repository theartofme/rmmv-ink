//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.08;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.08] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<x>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<x>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace 'x' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Center:
 *   - Center the window X after changing its width?
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 *
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
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
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
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
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg Center:eval
 * @text Center Window X?
 * @parent Width
 * @type boolean
 * @on Center
 * @off Don't
 * @desc Center the window X after changing its width?
 * @default true
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MessageCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"6","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"6","Classes:str":"4","Skills:str":"4","Items:str":"4","Weapons:str":"4","Armors:str":"4","Enemies:str":"2","States:str":"4","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 6
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 6
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 2
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 */
//=============================================================================

const _0x2f62=['loadPicture','NameBoxWindowOffsetY','contentsBack','Skills','updateOffsetPosition','jnGFs','Game_Map_initialize','initMessageCore','stretchDimmerSprite','YZbJv','setSpeakerName','true','fontSize','XJEvB','ezFHj','Match','setupEvents','wIPUS','boxHeight','update','Enemies','constructor','Game_Map_setupEvents','splice','processAutoSize','textColor','Game_Party_initialize','oXfJJ','\x1bCOLORLOCK[1]','drawItem','prepareWordWrapEscapeCharacters','exec','isAutoColorAffected','MaxCols','vKbkT','selectDefault','processFsTextCode','textSpeed','startY','Window_Message_updatePlacement','terminateMessage','XQFqp','choicePositionType','CreateAutoColorFor','clearActorNameAutoColor','NameBoxWindowOffsetX','addMessageCommonEvent','length','_moveEasingType','addLoadListener','_positionType','maxFontSizeInLine','TextCodeActions','flushTextState','_cancelButton','format','updatePlacement','setTextAlignment','jBegR','updateMessageCommonEvents','COLORLOCK','makeCommandList','_dimmerSprite','resetPositionX','updateOverlappingY','paintOpacity','getChoiceListMaxColumns','isRunning','width','partyMemberName','currencyUnit','updateAutoSizePosition','\x1bITALIC[0]','General','messageWindowRect','_moveTargetX','Window_Message_isTriggered','preemptive','processPyTextCode','qmXnP','map','call','diJzX','callOkHandler','command101','applyMoveEasing','applyDatabaseAutoColor','postConvertEscapeCharacters','<COLORLOCK>','ARRAYEVAL','min','Default','_textDelayCount','maxCols','qxiAy','SJnhY','setColorLock','list','QLDhK','_textAlignment','WordWrap',')))','message','code','<B>','Rows','itemLineRect','registerActorNameAutoColorChanges','</CENTER>','qawpe','MessageWindow','resetRect','clearFlags','cFULU','aaJtA','actor','anchor','isChoiceVisible','setFaceImage','_messageCommonEvents','contents','currentCommand','processCharacter','GrTQs','\x1bTEXTALIGNMENT[0]','includes','calcMoveEasing','itemHeight','isContinuePrepareShowTextCommands','MessageWidth','updateBackground','setChoiceListMaxRows','textSizeEx','_messagePositionReset','</COLORLOCK>','processTextAlignmentChange','processActorNameAutoColorChanges','bind','MaxRows','faceWidth','obtainExp','qynBg','match','false','choice','ItJHo','map\x20party','HgeTx','CIjdh','processEscapeCharacter','</I>','VjcTJ','parameters','zCNMi','uVOGR','ChoiceWindowMaxCols','<BR>','_nameBoxWindow','PlEyi','setMessageWindowWordWrap','HnMuP','setTextDelay','TextAlign','outlineColor','processPxTextCode','outlineWidth','Window_Base_processNewLine','addExtraShowChoices','Game_Map_updateEvents','addMessageCoreCommands','setupNumInput','rtl','xAhWc','XkhHx','gainItem','rRnyL','Window_Message_synchronizeNameBox','text','substring','onDatabaseLoaded','createContents','easeOut','ParseArmorNotetags','xoRZf','Items','windowWidth','isColorLocked','processDrawPicture','messageCoreTextSpeed','itemPadding','windowX','choiceCols','_textDelay','isSceneMap','processWrapBreak','processControlCharacter','ParseSkillNotetags','escapeStart','<WORDWRAP>','Window_ChoiceList_updatePlacement','ARRAYJSON','Window_Base_processEscapeCharacter','pEdvs','\x1bTEXTALIGNMENT[1]','sCRJv','Window_ChoiceList_windowX','initialize','SortObjectByKeyLength','maxLines','colSpacing','Classes','trim','COMMONEVENT','wDPhz','setMessageWindowRows','VRIkI','textWidth','maxChoiceWidth','processCustomWait','actorName','pgVkN','_data','indexOf','getChoiceListMaxRows','_autoColorActorNames','applyData','createTextState','Window_Base_update','_moveTargetHeight','TextMacros','WAIT','processStoredAutoColorChanges','index','addCommand','AddOption','_wholeMoveDuration','HXShF','databaseObjectName','isPressed','lastGainedObjectQuantity','resetTextColor','right','innerHeight','OBnFJ','bxKAN','_scene','choiceRows','isSceneBattle','ChoiceWindowMaxRows','ocNRm','isWordWrapEnabled','FontBiggerCap','setPositionType','Window_Options_addGeneralOptions','LFwJK','_moveTargetY','ESyYI','Center','processMessageCoreEscapeActions','innerWidth','mainFontFace','process_VisuMZ_MessageCore_AutoColor','getMessageWindowWidth','findTargetSprite','changeTextColor','convertMessageCoreEscapeActions','obtainEscapeParam','SWvaq','MessageTextDelay','fontBold','initTextAlignement','_moveDuration','twXed','FontSmallerCap','_centerMessageWindow','updateAutoPosition','calcWindowHeight','BOLD','obtainGold','_list','registerResetRect','process_VisuMZ_MessageCore_TextMacros','height','convertMessageCoreEscapeReplacements','choiceLineHeight','xdbjb','push','onProcessCharacter','registerCommand','setMessageWindowWidth','setRelativePosition','none','map\x20player','isVolumeSymbol','textSpeedStatusText','</WORDWRAP>','toLowerCase','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','process_VisuMZ_MessageCore_TextCodes_Replace','setupItemChoice','Window_Options_changeVolume','isRTL','CreateAutoColorRegExpLists','CreateAutoColorRegExpListEntries','drawing','ParseItemNotetags','tentn','makeFontBigger','setup','ARRAYSTR','oHvpW','faceName','textSizeExWordWrap','processAutoPosition','FwKhp','TextColor%1','outputHeight','mainSprite','JIpXk','_lastGainedItemData','uwCBo','processFontChangeBold','MessageRows','fontFace','FUNC','_autoPositionTarget','addGeneralOptions','Window_Message_processEscapeCharacter','CscNO','Window_Base_processControlCharacter','clearCommandList','EdnGS','windowPadding','textCodeCheck','startX','indent','AutoColorRegExp','convertFontSettingsEscapeCharacters','_MessageCoreSettings','resetWordWrap','isMessageWindowWordWrap','getChoiceListLineHeight','\x1bITALIC[1]','makeFontSmaller','isItem','mainFontSize','ChoiceWindowProperties','updateEvents','TextSpeed','ParseEnemyNotetags','processAllText','changeOutlineColor','XWMuD','_autoPosRegExp','nhvLh','ygHoi','helpWordWrap','ActionJS','WRAPBREAK','boxWidth','textSizeExTextAlignment','Name','convertShowChoiceEscapeCodes','split','Armors','TEXTALIGNMENT','ftcrE','FontChangeValue','battle\x20actor','changeVolume','refreshDimmerBitmap','setChoiceListMaxColumns','TextStr','States','TextJS','isChoiceEnabled','ErPsM','\x1bBOLD[0]','NqJAn','RelativePXPY','getLastGainedItemData','currentExt','ceil','postFlushTextState','choices','left','processColorLock','padding','followers','RrCPd','commandName','Game_Interpreter_setupChoices','adjustShowChoiceDefault','CxwQJ','outputWidth','isHelpWindowWordWrap','easeIn','NPpib','textCodeResult','convertEscapeCharacters','qXSpt','_textColorStack','CENTERPICTURE','messageWidth','_messageWindow','numVisibleRows','convertTextAlignmentEscapeCharacters','vsAov','Game_Party_gainItem','isBusy','changeValue','members','oYEai','defeat','kdzcS','processTextAlignmentX','ConfigManager_makeData','changePaintOpacity','LineBreakSpace','return\x20\x27','Weapons','oRCdC','lHZcQ','getChoiceListTextAlign','CommonEvent','ParseAllNotetags','ChoiceWindowLineHeight','ConvertParams','updateMove','_interpreter','newPage','addMessageCoreTextSpeedCommand','QvOsN','status','ITALIC','clear','Width','ozgth','Window_Message_terminateMessage','ANY','return\x200','<%1>','\x1bWrapBreak[0]','synchronizeNameBox','aivXG','ALL','Type','convertLockColorsEscapeCharacters','Window_Message_newPage','ParseStateNotetags','BnOqQ','name','Undefined','Window_Base_processAllText','messageWordWrap','convertVariableEscapeCharacters','preConvertEscapeCharacters','lineHeight','value','setHelpWindowWordWrap','oTdzN','drawBackCenteredPicture','_relativePosition','DtMjs','TextColor','type','maxCommands','NameBoxWindowDefaultColor','adjustShowChoiceExtension','HIDE','AddAutoColor','Window_NameBox_refresh','xewSC','TbRBU','Window_Base_changeTextColor','processAutoColorWords','ConvertTextAutoColorRegExpFriendly','FastForwardKey','instantTextSpeed','processCommonEvent','Window_Help_refresh','PwrmS','fontItalic','ParseWeaponNotetags','Game_System_initialize','messagePositionReset','ParseClassNotetags','Settings','Actors','_commonEventId','AutoColorBypassList','battle\x20enemy','surprise','map\x20event','rQTGl','canMove','_indent','setWordWrap','nextEventCode','JSON','ConfigManager_applyData','convertBackslashCharacters','placeCancelButton','SWITCHES','pkPlm','StretchDimmedBg','MkByx','Window_Base_initialize','messageRows','\x5c%1','process_VisuMZ_MessageCore_TextCodes_Action','blt','isBreakShowTextCommands','adjustShowChoiceCancel','isWeapon','exit','floor','ipQQD','moveBy','_wordWrap','kbaJF','getConfigValue','MessageCore','easeInOut','PICTURE','Window_Message_clearFlags','_eventId','shift','\x1bC[%1]%2\x1bPREVCOLOR[0]','close','returnPreservedFontSettings','prototype','substr','kZRPf','replace','TextManager_message','parse','yCXin','onChoice','moveTo','setupChoices','round','WrpTn','lastGainedObjectName','fVNGr','_moveTargetWidth','NNbHi','getPreservedFontSettings','isTriggered','setBackground','</RIGHT>','event','getTextAlignment','toUpperCase','outLineColor','_colorLock','PGpUZ','pitWy','SjWUb','</LEFT>','MessageWindowProperties','updateRelativePosition','description','DefaultOutlineWidth','remove','AutoColor','FxPAS','setChoiceListLineHeight','Scene_Options_maxCommands','resetFontSettings','CEyeF','_autoSizeRegexp','normalColor','KhktB','</B>','awMqK','prepareShowTextCommand','PREVCOLOR','onNewPageMessageCore','center','changeTextSpeed','ANqid','messageCoreWindowX','Window_Options_statusText','getMessageWindowRows','battle\x20party','_resetRect','STR','add','UMuKW','updateDimensions','preFlushTextState','refresh','obtainEscapeString','UTXEb','Window_Options_isVolumeSymbol','EJEUF','<LINE\x20BREAK>','STRUCT','oBnwC','FJoUt','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Window_NameBox_updatePlacement','join','\x1bTEXTALIGNMENT[2]','EVAL','_spriteset','processNewLine','MvFZP','prepareAutoSizeEscapeCharacters','BfhFn','addContinuousShowChoices','_texts','choiceTextAlign','\x1bi[%1]%2','ChoiceWindowTextAlign','iconIndex','clamp','_index','setLastGainedItemData','<RIGHT>','addWrapBreakAfterPunctuation','slice','_showFast','mrxnC','drawBackPicture','launchMessageCommonEvent','convertTextMacros','clampPlacementPosition','default','TextCodeReplace','map\x20actor','makeData','statusText','ARRAYFUNC','AdjustRect'];(function(_0x1225a1,_0x2f622b){const _0x10336d=function(_0x1f1159){while(--_0x1f1159){_0x1225a1['push'](_0x1225a1['shift']());}};_0x10336d(++_0x2f622b);}(_0x2f62,0x1a5));const _0x1033=function(_0x1225a1,_0x2f622b){_0x1225a1=_0x1225a1-0x0;let _0x10336d=_0x2f62[_0x1225a1];return _0x10336d;};const _0x1d5f2b=_0x1033;var label='MessageCore',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x4b09c1){const _0x564b9b=_0x1033;return _0x4b09c1[_0x564b9b('0xc')]&&_0x4b09c1[_0x564b9b('0x8d')][_0x564b9b('0x154')]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x1d5f2b('0x6')]=function(_0x24508c,_0x217faa){const _0x3896b1=_0x1d5f2b;for(const _0xd665f1 in _0x217faa){if(_0x3896b1('0x89')!==_0x3896b1('0x89')){function _0x4d6457(){const _0x436a42=_0x3896b1;this[_0x436a42('0xaa')](_0x40bab2),_0x5c4964[_0x436a42('0x6e')][_0x436a42('0x10c')][_0x436a42('0x128')](this,_0x53aca5),this[_0x436a42('0x256')](_0x4d4484);}}else{if(_0xd665f1[_0x3896b1('0x165')](/(.*):(.*)/i)){if('xewSC'===_0x3896b1('0x33')){const _0x3f90ff=String(RegExp['$1']),_0xf35808=String(RegExp['$2'])[_0x3896b1('0x84')]()[_0x3896b1('0x1aa')]();let _0x2e39c7,_0x585745,_0x54bf7d;switch(_0xf35808){case'NUM':_0x2e39c7=_0x217faa[_0xd665f1]!==''?Number(_0x217faa[_0xd665f1]):0x0;break;case'ARRAYNUM':_0x585745=_0x217faa[_0xd665f1]!==''?JSON[_0x3896b1('0x73')](_0x217faa[_0xd665f1]):[],_0x2e39c7=_0x585745[_0x3896b1('0x127')](_0x12bd54=>Number(_0x12bd54));break;case _0x3896b1('0xb8'):_0x2e39c7=_0x217faa[_0xd665f1]!==''?eval(_0x217faa[_0xd665f1]):null;break;case _0x3896b1('0x130'):_0x585745=_0x217faa[_0xd665f1]!==''?JSON[_0x3896b1('0x73')](_0x217faa[_0xd665f1]):[],_0x2e39c7=_0x585745[_0x3896b1('0x127')](_0x40c904=>eval(_0x40c904));break;case _0x3896b1('0x4e'):_0x2e39c7=_0x217faa[_0xd665f1]!==''?JSON[_0x3896b1('0x73')](_0x217faa[_0xd665f1]):'';break;case _0x3896b1('0x19f'):_0x585745=_0x217faa[_0xd665f1]!==''?JSON[_0x3896b1('0x73')](_0x217faa[_0xd665f1]):[],_0x2e39c7=_0x585745[_0x3896b1('0x127')](_0x13f25c=>JSON[_0x3896b1('0x73')](_0x13f25c));break;case _0x3896b1('0x21b'):_0x2e39c7=_0x217faa[_0xd665f1]!==''?new Function(JSON[_0x3896b1('0x73')](_0x217faa[_0xd665f1])):new Function(_0x3896b1('0x13'));break;case _0x3896b1('0xd5'):_0x585745=_0x217faa[_0xd665f1]!==''?JSON[_0x3896b1('0x73')](_0x217faa[_0xd665f1]):[],_0x2e39c7=_0x585745[_0x3896b1('0x127')](_0x259da9=>new Function(JSON['parse'](_0x259da9)));break;case _0x3896b1('0xa6'):_0x2e39c7=_0x217faa[_0xd665f1]!==''?String(_0x217faa[_0xd665f1]):'';break;case _0x3896b1('0x20c'):_0x585745=_0x217faa[_0xd665f1]!==''?JSON[_0x3896b1('0x73')](_0x217faa[_0xd665f1]):[],_0x2e39c7=_0x585745[_0x3896b1('0x127')](_0x1bf347=>String(_0x1bf347));break;case _0x3896b1('0xb1'):_0x54bf7d=_0x217faa[_0xd665f1]!==''?JSON[_0x3896b1('0x73')](_0x217faa[_0xd665f1]):{},_0x24508c[_0x3f90ff]={},VisuMZ[_0x3896b1('0x6')](_0x24508c[_0x3f90ff],_0x54bf7d);continue;case'ARRAYSTRUCT':_0x585745=_0x217faa[_0xd665f1]!==''?JSON[_0x3896b1('0x73')](_0x217faa[_0xd665f1]):[],_0x2e39c7=_0x585745[_0x3896b1('0x127')](_0x386f00=>VisuMZ['ConvertParams']({},JSON[_0x3896b1('0x73')](_0x386f00)));break;default:continue;}_0x24508c[_0x3f90ff]=_0x2e39c7;}else{function _0x129707(){const _0x17c86e=_0x3896b1,_0x42be77=_0xb198ae[_0x17c86e('0x73')]('['+_0x265f83['$1']['match'](/\d+/g)+']');for(const _0x326907 of _0x42be77){if(_0x5891fe[_0x17c86e('0x25')](_0x326907))return![];}return!![];}}}}}return _0x24508c;},(_0x7d87b0=>{const _0x1d2ce9=_0x1d5f2b,_0x36dfe=_0x7d87b0[_0x1d2ce9('0x1e')];for(const _0x7e347d of dependencies){if(!Imported[_0x7e347d]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x36dfe,_0x7e347d)),SceneManager['exit']();break;}}const _0x2ab789=_0x7d87b0['description'];if(_0x2ab789[_0x1d2ce9('0x165')](/\[Version[ ](.*?)\]/i)){const _0x54caea=Number(RegExp['$1']);if(_0x54caea!==VisuMZ[label]['version']){if(_0x1d2ce9('0x0')!=='urQpH')alert(_0x1d2ce9('0xb4')['format'](_0x36dfe,_0x54caea)),SceneManager['exit']();else{function _0x5288b4(){const _0x5992db=_0x1d2ce9;this[_0x5992db('0x174')]&&(this[_0x5992db('0x174')]['x']+=this['x']-_0x2cf95d['x'],this[_0x5992db('0x174')]['y']+=this['y']-_0x2de741['y']);}}}}if(_0x2ab789[_0x1d2ce9('0x165')](/\[Tier[ ](\d+)\]/i)){const _0x431984=Number(RegExp['$1']);_0x431984<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x1d2ce9('0x10e')](_0x36dfe,_0x431984,tier)),SceneManager[_0x1d2ce9('0x5e')]()):tier=Math['max'](_0x431984,tier);}VisuMZ[_0x1d2ce9('0x6')](VisuMZ[label][_0x1d2ce9('0x42')],_0x7d87b0[_0x1d2ce9('0x16f')]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x1d5f2b('0x1e')],_0x1d5f2b('0x231'),_0xf82e0d=>{const _0x7b25b9=_0x1d5f2b;VisuMZ['ConvertParams'](_0xf82e0d,_0xf82e0d);const _0x3b0b3f=_0xf82e0d['LineHeight']||$gameSystem[_0x7b25b9('0x22c')]()||0x1,_0x3b3b65=_0xf82e0d[_0x7b25b9('0x161')]||$gameSystem['getChoiceListMaxRows']()||0x1,_0x39681a=_0xf82e0d[_0x7b25b9('0xf8')]||$gameSystem[_0x7b25b9('0x119')]()||0x1,_0x1578fe=_0xf82e0d[_0x7b25b9('0x179')][_0x7b25b9('0x1ff')]()||_0x7b25b9('0xd0');$gameSystem[_0x7b25b9('0x92')](_0x3b0b3f),$gameSystem[_0x7b25b9('0x15a')](_0x3b3b65),$gameSystem[_0x7b25b9('0x24a')](_0x39681a),$gameSystem['setChoiceListTextAlign'](_0x1578fe);}),PluginManager[_0x1d5f2b('0x1f7')](pluginData[_0x1d5f2b('0x1e')],_0x1d5f2b('0x8b'),_0x30a255=>{const _0x24db96=_0x1d5f2b;VisuMZ[_0x24db96('0x6')](_0x30a255,_0x30a255);const _0x584c95=_0x30a255[_0x24db96('0x140')]||$gameSystem[_0x24db96('0xa3')]()||0x1,_0x577a2a=_0x30a255[_0x24db96('0xf')]||$gameSystem['getMessageWindowWidth']()||0x1;$gameTemp[_0x24db96('0x1e9')]=_0x30a255[_0x24db96('0x1d8')]||![];const _0x237408=_0x30a255[_0x24db96('0x13b')]['toLowerCase']();$gameSystem[_0x24db96('0x1ad')](_0x584c95),$gameSystem['setMessageWindowWidth'](_0x577a2a);if([_0x24db96('0xe2'),_0x24db96('0x166')]['includes'](_0x237408)){if('YbHjY'!==_0x24db96('0x16b'))$gameSystem[_0x24db96('0x176')](eval(_0x237408));else{function _0x4afa20(){const _0x518d1b=_0x24db96,_0x397b8e=_0x1b0b75[_0x518d1b('0x101')]();if(_0x397b8e===0x1)return(_0x2ad760[_0x518d1b('0x23e')]-this[_0x518d1b('0x190')]())/0x2;else return _0x397b8e===0x2?this[_0x518d1b('0x26b')]['x']+this[_0x518d1b('0x26b')][_0x518d1b('0x11b')]-this[_0x518d1b('0x190')]():this[_0x518d1b('0x26b')]['x'];}}}const _0x528961=SceneManager[_0x24db96('0x1cc')]['_messageWindow'];_0x528961&&(_0x528961[_0x24db96('0x22a')](),_0x528961['updateDimensions'](),_0x528961[_0x24db96('0x18b')]());}),VisuMZ[_0x1d5f2b('0x65')]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x1d5f2b('0x6e')][_0x1d5f2b('0x18a')],Scene_Boot[_0x1d5f2b('0x6e')]['onDatabaseLoaded']=function(){const _0x35790e=_0x1d5f2b;VisuMZ[_0x35790e('0x65')]['Scene_Boot_onDatabaseLoaded'][_0x35790e('0x128')](this),this[_0x35790e('0x59')](),this[_0x35790e('0x201')](),this[_0x35790e('0x1f0')](),this[_0x35790e('0x1dc')]();},VisuMZ[_0x1d5f2b('0x65')]['SortObjectByKeyLength']=function(_0x3c6d2a){const _0x4f222a=_0x1d5f2b,_0x48bf51=VisuMZ[_0x4f222a('0x65')][_0x4f222a('0x42')][_0x3c6d2a];_0x48bf51['sort']((_0x3604b3,_0x23f741)=>{const _0x1f36b5=_0x4f222a;if(_0x1f36b5('0x98')==='KhktB'){if(!_0x3604b3||!_0x23f741)return-0x1;return _0x23f741[_0x1f36b5('0xe6')]['length']-_0x3604b3[_0x1f36b5('0xe6')][_0x1f36b5('0x106')];}else{function _0x389e3d(){const _0x10b1e8=_0x1f36b5,_0x18b08d=_0x2a0a7d['parse']('['+_0x2be2cb['$1'][_0x10b1e8('0x165')](/\d+/g)+']');for(const _0x48ed33 of _0x18b08d){if(_0x4b91c7[_0x10b1e8('0x25')](_0x48ed33))return!![];}return![];}}});},Scene_Boot[_0x1d5f2b('0x6e')][_0x1d5f2b('0x59')]=function(){const _0x397946=_0x1d5f2b;VisuMZ[_0x397946('0x65')][_0x397946('0x1a6')](_0x397946('0x10b'));for(const _0x3fdbb4 of VisuMZ['MessageCore'][_0x397946('0x42')][_0x397946('0x10b')]){if(_0x397946('0xbb')!==_0x397946('0x139')){_0x3fdbb4[_0x397946('0xe6')]=_0x3fdbb4['Match'][_0x397946('0x84')](),_0x3fdbb4[_0x397946('0x224')]=new RegExp('\x1b'+_0x3fdbb4[_0x397946('0xe6')],'gi'),_0x3fdbb4[_0x397946('0x265')]='\x1b'+_0x3fdbb4['Match'];if(_0x3fdbb4[_0x397946('0x19')]==='')_0x3fdbb4['textCodeResult']+='[0]';}else{function _0xb59f7a(){const _0x1a837b=_0x397946;return _0x2d2306=_0x59b7bb[_0x1a837b('0x71')](/<COLORLOCK>/gi,'\x1bCOLORLOCK[1]'),_0x4857f7=_0x251b8e[_0x1a837b('0x71')](/<\/COLORLOCK>/gi,'\x1bCOLORLOCK[0]'),_0x5da651=_0x566700['replace'](/\(\(\(/gi,'\x1bCOLORLOCK[1]'),_0x5ae7c2=_0x40f723['replace'](/\)\)\)/gi,'\x1bCOLORLOCK[0]'),_0x54d8ed;}}}},Scene_Boot['prototype'][_0x1d5f2b('0x201')]=function(){const _0x19cab4=_0x1d5f2b;VisuMZ['MessageCore'][_0x19cab4('0x1a6')](_0x19cab4('0xd1'));for(const _0x52bb3c of VisuMZ[_0x19cab4('0x65')][_0x19cab4('0x42')]['TextCodeReplace']){if(_0x19cab4('0x20d')===_0x19cab4('0x2a')){function _0x1f1b03(){const _0x442a6b=_0x19cab4;_0x4af110-=_0x58f4b5['mainSprite']()[_0x442a6b('0x1f1')]+0x18;}}else _0x52bb3c[_0x19cab4('0x224')]=new RegExp('\x1b'+_0x52bb3c['Match']+_0x52bb3c['Type'],'gi'),_0x52bb3c[_0x19cab4('0x24b')]!==''&&_0x52bb3c[_0x19cab4('0x24b')]!=='Undefined'?_0x52bb3c['textCodeResult']=new Function(_0x19cab4('0x27a')+_0x52bb3c[_0x19cab4('0x24b')][_0x19cab4('0x71')](/\\/g,'\x1b')+'\x27'):_0x52bb3c[_0x19cab4('0x265')]=_0x52bb3c[_0x19cab4('0x24d')];}},Scene_Boot[_0x1d5f2b('0x6e')]['process_VisuMZ_MessageCore_TextMacros']=function(){const _0x57b889=_0x1d5f2b;for(const _0xd44ab8 of VisuMZ['MessageCore'][_0x57b889('0x42')][_0x57b889('0x1bc')]){if(_0x57b889('0x74')===_0x57b889('0x7b')){function _0x23f866(){this['obtainEscapeParam'](_0x1e56e9);}}else _0xd44ab8[_0x57b889('0x224')]=new RegExp('\x5c['+_0xd44ab8['Match']+'\x5c]','gi'),_0xd44ab8[_0x57b889('0x24b')]!==''&&_0xd44ab8[_0x57b889('0x24b')]!==_0x57b889('0x1f')?_0xd44ab8[_0x57b889('0x265')]=new Function(_0x57b889('0x27a')+_0xd44ab8[_0x57b889('0x24b')][_0x57b889('0x71')](/\\/g,'\x1b')+'\x27'):_0xd44ab8[_0x57b889('0x265')]=_0xd44ab8[_0x57b889('0x24d')];}},Scene_Boot['prototype'][_0x1d5f2b('0x1dc')]=function(){const _0x4019f8=_0x1d5f2b,_0x1098c9=VisuMZ[_0x4019f8('0x65')][_0x4019f8('0x42')][_0x4019f8('0x90')];!VisuMZ[_0x4019f8('0x4')]&&(VisuMZ['MessageCore'][_0x4019f8('0x31')]($dataClasses,_0x1098c9['Classes']),VisuMZ['MessageCore'][_0x4019f8('0x31')]($dataSkills,_0x1098c9['Skills']),VisuMZ[_0x4019f8('0x65')][_0x4019f8('0x31')]($dataItems,_0x1098c9[_0x4019f8('0x18f')]),VisuMZ[_0x4019f8('0x65')][_0x4019f8('0x31')]($dataWeapons,_0x1098c9[_0x4019f8('0x27b')]),VisuMZ['MessageCore']['AddAutoColor']($dataArmors,_0x1098c9['Armors']),VisuMZ[_0x4019f8('0x65')][_0x4019f8('0x31')]($dataEnemies,_0x1098c9[_0x4019f8('0xeb')]),VisuMZ['MessageCore'][_0x4019f8('0x31')]($dataStates,_0x1098c9[_0x4019f8('0x24c')])),VisuMZ[_0x4019f8('0x65')][_0x4019f8('0x205')]();},VisuMZ[_0x1d5f2b('0x65')]['AutoColorBypassList']=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x1d5f2b('0x13f'),_0x1d5f2b('0x99'),'<I>',_0x1d5f2b('0x16d'),'<LEFT>',_0x1d5f2b('0x8a'),'<CENTER>',_0x1d5f2b('0x143'),_0x1d5f2b('0xc7'),_0x1d5f2b('0x81'),_0x1d5f2b('0x12f'),_0x1d5f2b('0x15d'),'(((',_0x1d5f2b('0x13c'),_0x1d5f2b('0x19d'),_0x1d5f2b('0x1fe'),_0x1d5f2b('0x173'),_0x1d5f2b('0xb0'),_0x1d5f2b('0x67'),_0x1d5f2b('0x269'),_0x1d5f2b('0x1ab'),_0x1d5f2b('0x1bd'),'SHOW',_0x1d5f2b('0x30'),'ENABLE','DISABLE','SWITCH',_0x1d5f2b('0x52'),_0x1d5f2b('0x18'),_0x1d5f2b('0x12')],VisuMZ[_0x1d5f2b('0x65')][_0x1d5f2b('0x31')]=function(_0x28d47e,_0x522861){const _0x5cd71e=_0x1d5f2b;if(_0x522861<=0x0)return;const _0x3d5472=_0x28d47e;for(const _0x5b5f3d of _0x3d5472){if(_0x5cd71e('0x1f4')===_0x5cd71e('0x1a3')){function _0x10feaf(){const _0x427863=_0x5cd71e;_0x4664f0['textCodeCheck']=new _0x6ccd69('\x5c['+_0x4d7f4f[_0x427863('0xe6')]+'\x5c]','gi'),_0x582c9a[_0x427863('0x24b')]!==''&&_0x3ed068['TextStr']!==_0x427863('0x1f')?_0xd9048[_0x427863('0x265')]=new _0x2976b3('return\x20\x27'+_0x259dfd[_0x427863('0x24b')][_0x427863('0x71')](/\\/g,'\x1b')+'\x27'):_0x13ccd4['textCodeResult']=_0x4f09a1[_0x427863('0x24d')];}}else{if(!_0x5b5f3d)continue;VisuMZ['MessageCore'][_0x5cd71e('0x102')](_0x5b5f3d,_0x522861);}}},VisuMZ[_0x1d5f2b('0x65')]['CreateAutoColorRegExpLists']=function(){const _0x143459=_0x1d5f2b;VisuMZ['MessageCore'][_0x143459('0x227')]=[];for(let _0x3bbaa6=0x1;_0x3bbaa6<=0x1f;_0x3bbaa6++){const _0x46edf8=_0x143459('0x212')[_0x143459('0x10e')](_0x3bbaa6),_0x30fe7f=VisuMZ[_0x143459('0x65')][_0x143459('0x42')][_0x143459('0x90')][_0x46edf8];_0x30fe7f['sort']((_0x405ffd,_0xde0938)=>{const _0x414c19=_0x143459;if(_0x414c19('0xad')===_0x414c19('0x3c')){function _0x1d92dc(){return!![];}}else{if(!_0x405ffd||!_0xde0938)return-0x1;return _0xde0938[_0x414c19('0x106')]-_0x405ffd['length'];}}),this[_0x143459('0x206')](_0x30fe7f,_0x3bbaa6);}},VisuMZ['MessageCore']['CreateAutoColorRegExpListEntries']=function(_0x2727ed,_0x195072){const _0xd3e7b5=_0x1d5f2b;for(const _0x4404d2 of _0x2727ed){if(_0xd3e7b5('0x184')==='sdLxV'){function _0x553640(){const _0x495289=_0xd3e7b5;if(this[_0x495289('0x216')]===_0x2a5b4a)this[_0x495289('0xde')]();return this[_0x495289('0x216')];}}else{if(_0x4404d2[_0xd3e7b5('0x106')]<=0x0)continue;let _0x2e1398=VisuMZ[_0xd3e7b5('0x65')]['ConvertTextAutoColorRegExpFriendly'](_0x4404d2);if(_0x4404d2['match'](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0x1f12d7=new RegExp(_0x2e1398,'i');else var _0x1f12d7=new RegExp('\x5cb'+_0x2e1398+'\x5cb','g');VisuMZ['MessageCore'][_0xd3e7b5('0x227')][_0xd3e7b5('0x1f5')]([_0x1f12d7,'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0xd3e7b5('0x10e')](_0x195072,_0x4404d2)]);}}},VisuMZ[_0x1d5f2b('0x65')][_0x1d5f2b('0x37')]=function(_0x2812ff){const _0x2c28f1=_0x1d5f2b;return _0x2812ff=_0x2812ff[_0x2c28f1('0x71')](/(\W)/gi,(_0x2bd129,_0x24f02f)=>_0x2c28f1('0x58')[_0x2c28f1('0x10e')](_0x24f02f)),_0x2812ff;},VisuMZ[_0x1d5f2b('0x65')]['ParseClassNotetags']=VisuMZ[_0x1d5f2b('0x41')],VisuMZ['ParseClassNotetags']=function(_0x4ad012){const _0x5a1674=_0x1d5f2b;VisuMZ['MessageCore'][_0x5a1674('0x41')][_0x5a1674('0x128')](this,_0x4ad012);const _0x481f92=VisuMZ['MessageCore'][_0x5a1674('0x42')][_0x5a1674('0x90')];VisuMZ[_0x5a1674('0x65')][_0x5a1674('0x102')](_0x4ad012,_0x481f92[_0x5a1674('0x1a9')]);},VisuMZ[_0x1d5f2b('0x65')]['ParseSkillNotetags']=VisuMZ[_0x1d5f2b('0x19b')],VisuMZ[_0x1d5f2b('0x19b')]=function(_0x494deb){const _0x2daa7b=_0x1d5f2b;VisuMZ[_0x2daa7b('0x65')][_0x2daa7b('0x19b')][_0x2daa7b('0x128')](this,_0x494deb);const _0x2c2dde=VisuMZ['MessageCore'][_0x2daa7b('0x42')][_0x2daa7b('0x90')];VisuMZ[_0x2daa7b('0x65')]['CreateAutoColorFor'](_0x494deb,_0x2c2dde['Skills']);},VisuMZ[_0x1d5f2b('0x65')][_0x1d5f2b('0x208')]=VisuMZ[_0x1d5f2b('0x208')],VisuMZ[_0x1d5f2b('0x208')]=function(_0x5d7033){const _0x2c87d2=_0x1d5f2b;VisuMZ['MessageCore'][_0x2c87d2('0x208')][_0x2c87d2('0x128')](this,_0x5d7033);const _0x19113=VisuMZ[_0x2c87d2('0x65')][_0x2c87d2('0x42')][_0x2c87d2('0x90')];VisuMZ['MessageCore']['CreateAutoColorFor'](_0x5d7033,_0x19113[_0x2c87d2('0x18f')]);},VisuMZ['MessageCore'][_0x1d5f2b('0x3e')]=VisuMZ[_0x1d5f2b('0x3e')],VisuMZ['ParseWeaponNotetags']=function(_0x4ef460){const _0x3c7cb3=_0x1d5f2b;VisuMZ[_0x3c7cb3('0x65')][_0x3c7cb3('0x3e')]['call'](this,_0x4ef460);const _0x5d75ee=VisuMZ[_0x3c7cb3('0x65')][_0x3c7cb3('0x42')][_0x3c7cb3('0x90')];VisuMZ[_0x3c7cb3('0x65')][_0x3c7cb3('0x102')](_0x4ef460,_0x5d75ee[_0x3c7cb3('0x27b')]);},VisuMZ[_0x1d5f2b('0x65')][_0x1d5f2b('0x18d')]=VisuMZ[_0x1d5f2b('0x18d')],VisuMZ['ParseArmorNotetags']=function(_0x6b4ad3){const _0x4f081b=_0x1d5f2b;VisuMZ['MessageCore'][_0x4f081b('0x18d')][_0x4f081b('0x128')](this,_0x6b4ad3);const _0x286ae4=VisuMZ[_0x4f081b('0x65')]['Settings'][_0x4f081b('0x90')];VisuMZ[_0x4f081b('0x65')][_0x4f081b('0x102')](_0x6b4ad3,_0x286ae4[_0x4f081b('0x243')]);},VisuMZ['MessageCore']['ParseEnemyNotetags']=VisuMZ['ParseEnemyNotetags'],VisuMZ[_0x1d5f2b('0x234')]=function(_0x1faea9){const _0x55abc2=_0x1d5f2b;VisuMZ[_0x55abc2('0x65')][_0x55abc2('0x234')][_0x55abc2('0x128')](this,_0x1faea9);const _0x539cc2=VisuMZ['MessageCore']['Settings'][_0x55abc2('0x90')];VisuMZ[_0x55abc2('0x65')][_0x55abc2('0x102')](_0x1faea9,_0x539cc2[_0x55abc2('0xeb')]);},VisuMZ[_0x1d5f2b('0x65')][_0x1d5f2b('0x1c')]=VisuMZ['ParseStateNotetags'],VisuMZ[_0x1d5f2b('0x1c')]=function(_0x2cbc36){const _0x48091f=_0x1d5f2b;VisuMZ['MessageCore'][_0x48091f('0x1c')]['call'](this,_0x2cbc36);const _0x48d113=VisuMZ['MessageCore'][_0x48091f('0x42')][_0x48091f('0x90')];VisuMZ['MessageCore'][_0x48091f('0x102')](_0x2cbc36,_0x48d113['States']);},VisuMZ[_0x1d5f2b('0x65')][_0x1d5f2b('0x102')]=function(_0x2c4423,_0x378b3b){const _0x33fbb0=_0x1d5f2b;if(_0x378b3b<=0x0)return;const _0x2af21b=VisuMZ[_0x33fbb0('0x65')]['Settings'][_0x33fbb0('0x90')][_0x33fbb0('0x2b')+_0x378b3b];let _0x544751=_0x2c4423['name']['trim']();if(VisuMZ[_0x33fbb0('0x65')][_0x33fbb0('0x45')]['includes'](_0x544751[_0x33fbb0('0x84')]()))return;_0x544751=_0x544751[_0x33fbb0('0x71')](/\\I\[(\d+)\]/gi,''),_0x544751=_0x544751[_0x33fbb0('0x71')](/\x1bI\[(\d+)\]/gi,'');if(_0x544751[_0x33fbb0('0x106')]<=0x0)return;if(_0x544751[_0x33fbb0('0x165')](/-----/i))return;_0x2af21b[_0x33fbb0('0x1f5')](_0x544751);},SceneManager['isSceneBattle']=function(){const _0x3d51d7=_0x1d5f2b;return this[_0x3d51d7('0x1cc')]&&this[_0x3d51d7('0x1cc')][_0x3d51d7('0xec')]===Scene_Battle;},SceneManager[_0x1d5f2b('0x198')]=function(){const _0x5adccc=_0x1d5f2b;return this[_0x5adccc('0x1cc')]&&this[_0x5adccc('0x1cc')]['constructor']===Scene_Map;},VisuMZ[_0x1d5f2b('0x65')]['TextManager_message']=TextManager[_0x1d5f2b('0x13d')],TextManager[_0x1d5f2b('0x13d')]=function(_0x4e6c76){const _0x48830a=_0x1d5f2b,_0xf641c2=['levelUp','emerge',_0x48830a('0x124'),_0x48830a('0x47'),'victory',_0x48830a('0x274'),_0x48830a('0x19c'),_0x48830a('0x163'),_0x48830a('0x1ed'),'obtainItem'];let _0x5b10fd=VisuMZ['MessageCore'][_0x48830a('0x72')][_0x48830a('0x128')](this,_0x4e6c76);if(_0xf641c2['includes'](_0x4e6c76)){if(_0x48830a('0x16e')!==_0x48830a('0x1cb'))_0x5b10fd=_0x48830a('0x1fe')+_0x5b10fd;else{function _0x3bd66b(){const _0x5a2d15=_0x48830a;if(_0x444ae3[_0x5a2d15('0xe6')]===_0x34c0b7){if(_0xffbec8['Type']==='')this['obtainEscapeParam'](_0x2af1a2);_0x4f4e19[_0x5a2d15('0x23c')][_0x5a2d15('0x128')](this,_0x4f9a21);if(this['constructor']===_0x281ee7){const _0xbfbb2=_0x753611[_0x5a2d15('0x3')]||0x0;if(_0xbfbb2>0x0)this[_0x5a2d15('0xcd')](_0xbfbb2);}}}}}return _0x5b10fd;},ConfigManager['textSpeed']=VisuMZ['MessageCore']['Settings'][_0x1d5f2b('0x233')][_0x1d5f2b('0x132')],VisuMZ[_0x1d5f2b('0x65')][_0x1d5f2b('0x277')]=ConfigManager[_0x1d5f2b('0xd3')],ConfigManager[_0x1d5f2b('0xd3')]=function(){const _0x5d1457=_0x1d5f2b,_0xd71014=VisuMZ[_0x5d1457('0x65')][_0x5d1457('0x277')]['call'](this);return _0xd71014[_0x5d1457('0xfc')]=this[_0x5d1457('0xfc')],_0xd71014;},VisuMZ['MessageCore'][_0x1d5f2b('0x4f')]=ConfigManager[_0x1d5f2b('0x1b8')],ConfigManager['applyData']=function(_0x4c9000){const _0x1264ed=_0x1d5f2b;VisuMZ[_0x1264ed('0x65')][_0x1264ed('0x4f')][_0x1264ed('0x128')](this,_0x4c9000);if(_0x1264ed('0xfc')in _0x4c9000){if('MkByx'===_0x1264ed('0x55'))this['textSpeed']=Number(_0x4c9000[_0x1264ed('0xfc')])[_0x1264ed('0xc4')](0x1,0xb);else{function _0x32df0c(){return _0xe4e31c;}}}else this[_0x1264ed('0xfc')]=VisuMZ[_0x1264ed('0x65')]['Settings'][_0x1264ed('0x233')][_0x1264ed('0x132')];},TextManager['messageCoreTextSpeed']=VisuMZ[_0x1d5f2b('0x65')][_0x1d5f2b('0x42')][_0x1d5f2b('0x233')][_0x1d5f2b('0x240')],TextManager['instantTextSpeed']=VisuMZ['MessageCore'][_0x1d5f2b('0x42')][_0x1d5f2b('0x233')]['Instant'],VisuMZ[_0x1d5f2b('0x65')][_0x1d5f2b('0x3f')]=Game_System[_0x1d5f2b('0x6e')][_0x1d5f2b('0x1a5')],Game_System['prototype'][_0x1d5f2b('0x1a5')]=function(){const _0x186322=_0x1d5f2b;VisuMZ['MessageCore']['Game_System_initialize'][_0x186322('0x128')](this),this[_0x186322('0xde')]();},Game_System['prototype'][_0x1d5f2b('0xde')]=function(){const _0x4847f6=_0x1d5f2b,_0x45597c=VisuMZ[_0x4847f6('0x65')][_0x4847f6('0x42')]['General'],_0x3dc491=VisuMZ['MessageCore'][_0x4847f6('0x42')][_0x4847f6('0x13b')];this[_0x4847f6('0x229')]={'messageRows':_0x45597c[_0x4847f6('0x219')],'messageWidth':_0x45597c[_0x4847f6('0x158')],'messageWordWrap':_0x3dc491[_0x4847f6('0x145')],'helpWordWrap':_0x3dc491['HelpWindow'],'choiceLineHeight':_0x45597c[_0x4847f6('0x5')],'choiceRows':_0x45597c[_0x4847f6('0x1cf')],'choiceCols':_0x45597c[_0x4847f6('0x172')],'choiceTextAlign':_0x45597c[_0x4847f6('0xc2')]};},Game_System[_0x1d5f2b('0x6e')][_0x1d5f2b('0xa3')]=function(){const _0x25f1be=_0x1d5f2b;if(this[_0x25f1be('0x229')]===undefined)this[_0x25f1be('0xde')]();if(this[_0x25f1be('0x229')][_0x25f1be('0x57')]===undefined)this[_0x25f1be('0xde')]();return this[_0x25f1be('0x229')][_0x25f1be('0x57')];},Game_System[_0x1d5f2b('0x6e')][_0x1d5f2b('0x1ad')]=function(_0x59f476){const _0x5dc8b0=_0x1d5f2b;if(this[_0x5dc8b0('0x229')]===undefined)this[_0x5dc8b0('0xde')]();if(this[_0x5dc8b0('0x229')][_0x5dc8b0('0x57')]===undefined)this['initMessageCore']();this[_0x5dc8b0('0x229')][_0x5dc8b0('0x57')]=_0x59f476||0x1;},Game_System[_0x1d5f2b('0x6e')][_0x1d5f2b('0x1dd')]=function(){const _0x5b6618=_0x1d5f2b;if(this[_0x5b6618('0x229')]===undefined)this[_0x5b6618('0xde')]();if(this[_0x5b6618('0x229')][_0x5b6618('0x26a')]===undefined)this['initMessageCore']();return this[_0x5b6618('0x229')][_0x5b6618('0x26a')];},Game_System[_0x1d5f2b('0x6e')][_0x1d5f2b('0x1f8')]=function(_0x1f1520){const _0x197013=_0x1d5f2b;if(this[_0x197013('0x229')]===undefined)this[_0x197013('0xde')]();if(this['_MessageCoreSettings'][_0x197013('0x26a')]===undefined)this['initMessageCore']();this[_0x197013('0x229')][_0x197013('0x26a')]=_0x1f1520||0x1;},Game_System['prototype'][_0x1d5f2b('0x22b')]=function(){const _0x1543da=_0x1d5f2b;if(this[_0x1543da('0x229')]===undefined)this['initMessageCore']();if(this[_0x1543da('0x229')][_0x1543da('0x21')]===undefined)this['initMessageCore']();return this['_MessageCoreSettings'][_0x1543da('0x21')];},Game_System['prototype'][_0x1d5f2b('0x176')]=function(_0x26aaf3){const _0x17b644=_0x1d5f2b;if(this[_0x17b644('0x229')]===undefined)this[_0x17b644('0xde')]();if(this['_MessageCoreSettings'][_0x17b644('0x21')]===undefined)this[_0x17b644('0xde')]();this['_MessageCoreSettings']['messageWordWrap']=_0x26aaf3;},Game_System['prototype'][_0x1d5f2b('0x262')]=function(){const _0xaf4e0a=_0x1d5f2b;if(this[_0xaf4e0a('0x229')]===undefined)this[_0xaf4e0a('0xde')]();if(this['_MessageCoreSettings'][_0xaf4e0a('0x23b')]===undefined)this[_0xaf4e0a('0xde')]();return this[_0xaf4e0a('0x229')][_0xaf4e0a('0x23b')];},Game_System['prototype'][_0x1d5f2b('0x26')]=function(_0x3a55bc){const _0x2871df=_0x1d5f2b;if(this['_MessageCoreSettings']===undefined)this[_0x2871df('0xde')]();if(this[_0x2871df('0x229')][_0x2871df('0x23b')]===undefined)this['initMessageCore']();this[_0x2871df('0x229')][_0x2871df('0x23b')]=_0x3a55bc;},Game_System['prototype'][_0x1d5f2b('0x22c')]=function(){const _0x4ea24a=_0x1d5f2b;if(this[_0x4ea24a('0x229')]===undefined)this[_0x4ea24a('0xde')]();if(this['_MessageCoreSettings'][_0x4ea24a('0x1f3')]===undefined)this[_0x4ea24a('0xde')]();return this['_MessageCoreSettings'][_0x4ea24a('0x1f3')];},Game_System[_0x1d5f2b('0x6e')]['setChoiceListLineHeight']=function(_0x57498){const _0x34efde=_0x1d5f2b;if(this[_0x34efde('0x229')]===undefined)this[_0x34efde('0xde')]();if(this[_0x34efde('0x229')][_0x34efde('0x1f3')]===undefined)this['initMessageCore']();this['_MessageCoreSettings'][_0x34efde('0x1f3')]=_0x57498||0x1;},Game_System[_0x1d5f2b('0x6e')][_0x1d5f2b('0x1b6')]=function(){const _0x1e5c5d=_0x1d5f2b;if(this[_0x1e5c5d('0x229')]===undefined)this[_0x1e5c5d('0xde')]();if(this['_MessageCoreSettings'][_0x1e5c5d('0x1cd')]===undefined)this[_0x1e5c5d('0xde')]();return this[_0x1e5c5d('0x229')][_0x1e5c5d('0x1cd')];},Game_System[_0x1d5f2b('0x6e')][_0x1d5f2b('0x15a')]=function(_0xcf3615){const _0x4715aa=_0x1d5f2b;if(this['_MessageCoreSettings']===undefined)this[_0x4715aa('0xde')]();if(this['_MessageCoreSettings'][_0x4715aa('0x1cd')]===undefined)this[_0x4715aa('0xde')]();this[_0x4715aa('0x229')][_0x4715aa('0x1cd')]=_0xcf3615||0x1;},Game_System[_0x1d5f2b('0x6e')]['getChoiceListMaxColumns']=function(){const _0x47d658=_0x1d5f2b;if(this[_0x47d658('0x229')]===undefined)this['initMessageCore']();if(this[_0x47d658('0x229')][_0x47d658('0x196')]===undefined)this[_0x47d658('0xde')]();return this[_0x47d658('0x229')]['choiceCols'];},Game_System['prototype'][_0x1d5f2b('0x24a')]=function(_0x29de6a){const _0x7bc1e3=_0x1d5f2b;if(this[_0x7bc1e3('0x229')]===undefined)this[_0x7bc1e3('0xde')]();if(this[_0x7bc1e3('0x229')][_0x7bc1e3('0x196')]===undefined)this[_0x7bc1e3('0xde')]();this['_MessageCoreSettings'][_0x7bc1e3('0x196')]=_0x29de6a||0x1;},Game_System[_0x1d5f2b('0x6e')][_0x1d5f2b('0x2')]=function(){const _0x301b69=_0x1d5f2b;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x301b69('0x229')][_0x301b69('0xc0')]===undefined)this[_0x301b69('0xde')]();return this[_0x301b69('0x229')][_0x301b69('0xc0')];},Game_System[_0x1d5f2b('0x6e')]['setChoiceListTextAlign']=function(_0x32852c){const _0x4f647a=_0x1d5f2b;if(this[_0x4f647a('0x229')]===undefined)this[_0x4f647a('0xde')]();if(this['_MessageCoreSettings'][_0x4f647a('0xc0')]===undefined)this[_0x4f647a('0xde')]();this[_0x4f647a('0x229')]['choiceTextAlign']=_0x32852c[_0x4f647a('0x1ff')]();},VisuMZ[_0x1d5f2b('0x65')][_0x1d5f2b('0xf1')]=Game_Party['prototype'][_0x1d5f2b('0x1a5')],Game_Party[_0x1d5f2b('0x6e')][_0x1d5f2b('0x1a5')]=function(){const _0x3181ad=_0x1d5f2b;VisuMZ[_0x3181ad('0x65')][_0x3181ad('0xf1')]['call'](this),this[_0x3181ad('0xde')]();},Game_Party[_0x1d5f2b('0x6e')]['initMessageCore']=function(){const _0x5af8d6=_0x1d5f2b;this[_0x5af8d6('0x216')]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x1d5f2b('0x6e')]['getLastGainedItemData']=function(){const _0x12f8e4=_0x1d5f2b;if(this[_0x12f8e4('0x216')]===undefined)this[_0x12f8e4('0xde')]();return this[_0x12f8e4('0x216')];},Game_Party['prototype'][_0x1d5f2b('0xc6')]=function(_0x2f1a17,_0xba6683){const _0x3552f7=_0x1d5f2b;if(this[_0x3552f7('0x216')]===undefined)this[_0x3552f7('0xde')]();if(!_0x2f1a17)return;if(DataManager[_0x3552f7('0x22f')](_0x2f1a17)){if(_0x3552f7('0x126')!==_0x3552f7('0x126')){function _0x598a06(){const _0x1fb23f=_0x3552f7;this[_0x1fb23f('0x216')][_0x1fb23f('0x2c')]=0x2;}}else this[_0x3552f7('0x216')]['type']=0x0;}else{if(DataManager[_0x3552f7('0x5d')](_0x2f1a17))this[_0x3552f7('0x216')][_0x3552f7('0x2c')]=0x1;else DataManager['isArmor'](_0x2f1a17)&&(this[_0x3552f7('0x216')][_0x3552f7('0x2c')]=0x2);}this['_lastGainedItemData']['id']=_0x2f1a17['id'],this[_0x3552f7('0x216')]['quantity']=_0xba6683;},VisuMZ['MessageCore'][_0x1d5f2b('0x26f')]=Game_Party[_0x1d5f2b('0x6e')][_0x1d5f2b('0x185')],Game_Party[_0x1d5f2b('0x6e')][_0x1d5f2b('0x185')]=function(_0x46d6c8,_0x862b6e,_0x25482e){const _0x31c704=_0x1d5f2b;VisuMZ['MessageCore'][_0x31c704('0x26f')][_0x31c704('0x128')](this,_0x46d6c8,_0x862b6e,_0x25482e);if(_0x862b6e>0x0){if('EdnGS'!==_0x31c704('0x222')){function _0x4c3eae(){const _0x276d57=_0x31c704;this[_0x276d57('0x8')][_0x276d57('0xea')]();}}else this[_0x31c704('0xc6')](_0x46d6c8,_0x862b6e);}},VisuMZ['MessageCore'][_0x1d5f2b('0xdd')]=Game_Map[_0x1d5f2b('0x6e')][_0x1d5f2b('0x1a5')],Game_Map[_0x1d5f2b('0x6e')][_0x1d5f2b('0x1a5')]=function(){const _0x3dcb5e=_0x1d5f2b;VisuMZ[_0x3dcb5e('0x65')][_0x3dcb5e('0xdd')][_0x3dcb5e('0x128')](this),this['_messageCommonEvents']=[];},VisuMZ['MessageCore'][_0x1d5f2b('0xed')]=Game_Map['prototype']['setupEvents'],Game_Map[_0x1d5f2b('0x6e')][_0x1d5f2b('0xe7')]=function(){const _0x2eb790=_0x1d5f2b;VisuMZ['MessageCore'][_0x2eb790('0xed')]['call'](this),this['_messageCommonEvents']=[];},VisuMZ['MessageCore'][_0x1d5f2b('0x17f')]=Game_Map[_0x1d5f2b('0x6e')]['updateEvents'],Game_Map[_0x1d5f2b('0x6e')][_0x1d5f2b('0x232')]=function(){const _0x46c6fd=_0x1d5f2b;VisuMZ[_0x46c6fd('0x65')][_0x46c6fd('0x17f')]['call'](this),this[_0x46c6fd('0x112')]();},Game_Map[_0x1d5f2b('0x6e')][_0x1d5f2b('0x105')]=function(_0x1b5c2c){const _0xf41d81=_0x1d5f2b;this[_0xf41d81('0x14e')]=this['_messageCommonEvents']||[];const _0x1691b4=this[_0xf41d81('0x8')][_0xf41d81('0x69')],_0x580b32=new Game_MessageCommonEvent(_0x1b5c2c,_0x1691b4);this[_0xf41d81('0x14e')][_0xf41d81('0x1f5')](_0x580b32);},Game_Map[_0x1d5f2b('0x6e')][_0x1d5f2b('0x112')]=function(){const _0x3f8999=_0x1d5f2b;this['_messageCommonEvents']=this[_0x3f8999('0x14e')]||[];for(const _0xda6975 of this[_0x3f8999('0x14e')]){if(_0x3f8999('0x211')!==_0x3f8999('0x1d7')){if(!_0xda6975[_0x3f8999('0x8')]){if('BnOqQ'===_0x3f8999('0x1d'))this[_0x3f8999('0x14e')]['remove'](_0xda6975);else{function _0x47dfe9(){const _0x3bb6b3=_0x3f8999;return this[_0x3bb6b3('0xef')](_0x35ae94,!![],!![]),this[_0x3bb6b3('0x210')](_0x3bb6b3('0x247'),_0x257b86(_0x381b6e)||0x1),'';}}}else _0xda6975[_0x3f8999('0xea')]();}else{function _0x42a247(){const _0x3b3607=_0x3f8999;this[_0x3b3607('0x1b7')]===_0x33119b&&this[_0x3b3607('0x142')]();for(_0x2938d4 of this[_0x3b3607('0x1b7')]){_0x12beca=_0x42ff29['replace'](_0x43b1d7[0x0],_0x5f2152[0x1]);}return _0x5056c2;}}}},Game_Interpreter['prototype'][_0x1d5f2b('0x12b')]=function(_0x4d279e){const _0xa30740=_0x1d5f2b;if($gameMessage[_0xa30740('0x270')]())return![];return this[_0xa30740('0x9b')](_0x4d279e),this['addContinuousShowTextCommands'](_0x4d279e),this['prepareShowTextFollowups'](_0x4d279e),this['setWaitMode'](_0xa30740('0x13d')),!![];},Game_Interpreter[_0x1d5f2b('0x6e')][_0x1d5f2b('0x9b')]=function(_0x1bc402){const _0x2ec07b=_0x1d5f2b;$gameMessage[_0x2ec07b('0x14d')](_0x1bc402[0x0],_0x1bc402[0x1]),$gameMessage['setBackground'](_0x1bc402[0x2]),$gameMessage[_0x2ec07b('0x1d3')](_0x1bc402[0x3]),$gameMessage[_0x2ec07b('0xe1')](_0x1bc402[0x4]);},Game_Interpreter[_0x1d5f2b('0x6e')]['addContinuousShowTextCommands']=function(_0xeddc8){const _0xa57f04=_0x1d5f2b;while(this[_0xa57f04('0x157')]()){this[_0xa57f04('0xc5')]++;if(this[_0xa57f04('0x150')]()['code']===0x191){if(_0xa57f04('0x267')===_0xa57f04('0x267'))$gameMessage[_0xa57f04('0xa7')](this[_0xa57f04('0x150')]()['parameters'][0x0]);else{function _0x399026(){const _0x2856bc=_0xa57f04;if(_0x2c1b73===_0x2856bc('0xfc'))return this['changeTextSpeed'](_0x5b4d4e,_0x3f563d,_0x35eeea);_0x3d2cf1[_0x2856bc('0x65')][_0x2856bc('0x203')][_0x2856bc('0x128')](this,_0x30d82,_0x52dee1,_0x2b7ba5);}}}if(this[_0xa57f04('0x5b')]())break;}},Game_Interpreter[_0x1d5f2b('0x6e')][_0x1d5f2b('0x157')]=function(){const _0x577614=_0x1d5f2b;if(this[_0x577614('0x4d')]()===0x65&&$gameSystem[_0x577614('0xa3')]()>0x4)return!![];else{if(_0x577614('0x24f')===_0x577614('0x24f'))return this[_0x577614('0x4d')]()===0x191;else{function _0x26b2e1(){const _0x5493b1=_0x577614;return this['processAutoSize'](_0x2e7b75,!![],!![]),this[_0x5493b1('0x210')]('none'),'';}}}},Game_Interpreter[_0x1d5f2b('0x6e')][_0x1d5f2b('0x5b')]=function(){const _0x4bfc4e=_0x1d5f2b;return $gameMessage[_0x4bfc4e('0xbf')][_0x4bfc4e('0x106')]>=$gameSystem[_0x4bfc4e('0xa3')]()&&this[_0x4bfc4e('0x4d')]()!==0x191;},Game_Interpreter[_0x1d5f2b('0x6e')]['prepareShowTextFollowups']=function(_0x34c902){const _0x1c75e1=_0x1d5f2b;switch(this[_0x1c75e1('0x4d')]()){case 0x66:this[_0x1c75e1('0xc5')]++,this[_0x1c75e1('0x77')](this[_0x1c75e1('0x150')]()[_0x1c75e1('0x16f')]);break;case 0x67:this[_0x1c75e1('0xc5')]++,this[_0x1c75e1('0x181')](this['currentCommand']()[_0x1c75e1('0x16f')]);break;case 0x68:this[_0x1c75e1('0xc5')]++,this[_0x1c75e1('0x202')](this[_0x1c75e1('0x150')]()[_0x1c75e1('0x16f')]);break;}},VisuMZ[_0x1d5f2b('0x65')][_0x1d5f2b('0x25e')]=Game_Interpreter[_0x1d5f2b('0x6e')][_0x1d5f2b('0x77')],Game_Interpreter['prototype'][_0x1d5f2b('0x77')]=function(_0x17643c){const _0x597ca4=_0x1d5f2b;_0x17643c=this[_0x597ca4('0xbe')](),VisuMZ[_0x597ca4('0x65')][_0x597ca4('0x25e')][_0x597ca4('0x128')](this,_0x17643c);},Game_Interpreter[_0x1d5f2b('0x6e')]['addContinuousShowChoices']=function(){const _0x12a593=_0x1d5f2b,_0x582ad0=this[_0x12a593('0xc5')],_0x27fb0e=[];let _0x32e9d8=0x0;this[_0x12a593('0xc5')]++;while(this['_index']<this['_list'][_0x12a593('0x106')]){if(_0x12a593('0x177')===_0x12a593('0x177')){if(this[_0x12a593('0x150')]()[_0x12a593('0x226')]===this[_0x12a593('0x4b')]){if(this[_0x12a593('0x150')]()[_0x12a593('0x13e')]===0x194&&this['nextEventCode']()!==0x66)break;else{if(this[_0x12a593('0x150')]()['code']===0x66)this[_0x12a593('0x2f')](_0x32e9d8,this[_0x12a593('0x150')](),_0x582ad0),this['_index']-=0x2;else{if(this[_0x12a593('0x150')]()['code']===0x192){if(_0x12a593('0xbd')===_0x12a593('0xa0')){function _0x3cf159(){const _0x2715c6=_0x12a593;_0x319066(_0x2715c6('0x200')['format'](_0x448cfa,_0x29788c,_0x19b899)),_0x5a7d7e[_0x2715c6('0x5e')]();}}else this['currentCommand']()[_0x12a593('0x16f')][0x0]=_0x32e9d8,_0x32e9d8++;}}}}this[_0x12a593('0xc5')]++;}else{function _0x4b770b(){const _0x1e1090=_0x12a593;this[_0x1e1090('0xdf')]();}}}return this[_0x12a593('0xc5')]=_0x582ad0,this[_0x12a593('0x150')]()[_0x12a593('0x16f')];},Game_Interpreter[_0x1d5f2b('0x6e')][_0x1d5f2b('0x2f')]=function(_0x1dfe41,_0x51dfc0,_0x3c519){const _0x291795=_0x1d5f2b;this[_0x291795('0x25f')](_0x1dfe41,_0x51dfc0,_0x3c519),this['adjustShowChoiceCancel'](_0x1dfe41,_0x51dfc0,_0x3c519),this['addExtraShowChoices'](_0x51dfc0,_0x3c519);},Game_Interpreter[_0x1d5f2b('0x6e')]['adjustShowChoiceDefault']=function(_0xd3156,_0x5dcd47,_0x300c5f){const _0x54cc86=_0x1d5f2b;if(_0x5dcd47[_0x54cc86('0x16f')][0x2]<0x0)return;const _0x4aaf80=_0x5dcd47[_0x54cc86('0x16f')][0x2]+_0xd3156;this[_0x54cc86('0x1ee')][_0x300c5f]['parameters'][0x2]=_0x4aaf80;},Game_Interpreter[_0x1d5f2b('0x6e')][_0x1d5f2b('0x5c')]=function(_0x4587b0,_0x4a7d1a,_0xbe8117){const _0x250bcc=_0x1d5f2b;if(_0x4a7d1a[_0x250bcc('0x16f')][0x1]>=0x0){if(_0x250bcc('0x144')!==_0x250bcc('0x144')){function _0x48245c(){const _0x45bdfc=_0x250bcc;_0x2a954c[_0x45bdfc('0x14d')](_0x13f250[0x0],_0x55d978[0x1]),_0x29315d[_0x45bdfc('0x80')](_0x21e2f9[0x2]),_0x3f6c8a['setPositionType'](_0x171edb[0x3]),_0x3013d3['setSpeakerName'](_0x2316e9[0x4]);}}else{var _0x348c6d=_0x4a7d1a[_0x250bcc('0x16f')][0x1]+_0x4587b0;this[_0x250bcc('0x1ee')][_0xbe8117][_0x250bcc('0x16f')][0x1]=_0x348c6d;}}else _0x4a7d1a[_0x250bcc('0x16f')][0x1]===-0x2&&(this[_0x250bcc('0x1ee')][_0xbe8117]['parameters'][0x1]=_0x4a7d1a[_0x250bcc('0x16f')][0x1]);},Game_Interpreter[_0x1d5f2b('0x6e')][_0x1d5f2b('0x17e')]=function(_0x2798a6,_0x2c2aae){const _0x2e6313=_0x1d5f2b;for(const _0x1b3c57 of _0x2798a6['parameters'][0x0]){this[_0x2e6313('0x1ee')][_0x2c2aae][_0x2e6313('0x16f')][0x0][_0x2e6313('0x1f5')](_0x1b3c57);}this['_list'][_0x2e6313('0xee')](this[_0x2e6313('0xc5')]-0x1,0x2);};function Game_MessageCommonEvent(){const _0x473437=_0x1d5f2b;this[_0x473437('0x1a5')](...arguments);}Game_MessageCommonEvent['prototype'][_0x1d5f2b('0x1a5')]=function(_0x334804,_0x27e9ea){const _0x622d04=_0x1d5f2b;this[_0x622d04('0x44')]=_0x334804,this[_0x622d04('0x69')]=_0x27e9ea||0x0,this[_0x622d04('0xab')]();},Game_MessageCommonEvent[_0x1d5f2b('0x6e')]['event']=function(){const _0xd36bf7=_0x1d5f2b;return $dataCommonEvents[this[_0xd36bf7('0x44')]];},Game_MessageCommonEvent[_0x1d5f2b('0x6e')][_0x1d5f2b('0x138')]=function(){const _0x36b717=_0x1d5f2b;return this[_0x36b717('0x82')]()[_0x36b717('0x138')];},Game_MessageCommonEvent[_0x1d5f2b('0x6e')][_0x1d5f2b('0xab')]=function(){const _0x5eec54=_0x1d5f2b;this[_0x5eec54('0x8')]=new Game_Interpreter(),this[_0x5eec54('0x8')][_0x5eec54('0x20b')](this['list'](),this[_0x5eec54('0x69')]);},Game_MessageCommonEvent['prototype'][_0x1d5f2b('0xea')]=function(){const _0x4ed976=_0x1d5f2b;this[_0x4ed976('0x8')]&&(this[_0x4ed976('0x8')]['isRunning']()?this[_0x4ed976('0x8')][_0x4ed976('0xea')]():this[_0x4ed976('0xe')]());},Game_MessageCommonEvent[_0x1d5f2b('0x6e')][_0x1d5f2b('0xe')]=function(){const _0x4ff772=_0x1d5f2b;this[_0x4ff772('0x8')]=null;},Scene_Message[_0x1d5f2b('0x6e')][_0x1d5f2b('0x121')]=function(){const _0x421f77=_0x1d5f2b,_0x26ca67=Math['min'](Graphics[_0x421f77('0x11b')],$gameSystem[_0x421f77('0x1dd')]()),_0x5bd61f=$gameSystem[_0x421f77('0xa3')](),_0x2686f2=this[_0x421f77('0x1eb')](_0x5bd61f,![]),_0x2f4e34=(Graphics[_0x421f77('0x23e')]-_0x26ca67)/0x2,_0x14e3a3=0x0;return new Rectangle(_0x2f4e34,_0x14e3a3,_0x26ca67,_0x2686f2);},VisuMZ[_0x1d5f2b('0x65')][_0x1d5f2b('0x93')]=Scene_Options[_0x1d5f2b('0x6e')][_0x1d5f2b('0x2d')],Scene_Options[_0x1d5f2b('0x6e')][_0x1d5f2b('0x2d')]=function(){const _0x2e30c9=_0x1d5f2b;let _0x23f486=VisuMZ[_0x2e30c9('0x65')]['Scene_Options_maxCommands']['call'](this);const _0x97f600=VisuMZ['MessageCore'][_0x2e30c9('0x42')];if(_0x97f600[_0x2e30c9('0x233')][_0x2e30c9('0x1c1')]&&_0x97f600['TextSpeed'][_0x2e30c9('0xd6')])_0x23f486++;return _0x23f486;},VisuMZ[_0x1d5f2b('0x65')]['Window_Base_initialize']=Window_Base['prototype']['initialize'],Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x1a5')]=function(_0x24b086){const _0x3d278f=_0x1d5f2b;this['initMessageCore'](_0x24b086),VisuMZ[_0x3d278f('0x65')][_0x3d278f('0x56')][_0x3d278f('0x128')](this,_0x24b086);},Window_Base[_0x1d5f2b('0x6e')]['initMessageCore']=function(_0x131f08){const _0x885aae=_0x1d5f2b;this['initTextAlignement'](),this[_0x885aae('0x22a')](),this[_0x885aae('0x1ef')](_0x131f08);},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x1e5')]=function(){const _0x4e1cff=_0x1d5f2b;this[_0x4e1cff('0x110')](_0x4e1cff('0xd0'));},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x110')]=function(_0x254b2f){const _0x3b98c8=_0x1d5f2b;this[_0x3b98c8('0x13a')]=_0x254b2f;},Window_Base['prototype'][_0x1d5f2b('0x83')]=function(){const _0x3c6772=_0x1d5f2b;return this[_0x3c6772('0x13a')];},VisuMZ[_0x1d5f2b('0x65')][_0x1d5f2b('0x20')]=Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x235')],Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x235')]=function(_0x265a48){const _0xbb27ef=_0x1d5f2b;VisuMZ[_0xbb27ef('0x65')][_0xbb27ef('0x20')][_0xbb27ef('0x128')](this,_0x265a48);if(_0x265a48['drawing'])this[_0xbb27ef('0x110')]('default');},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x22a')]=function(){const _0x1a22e3=_0x1d5f2b;this[_0x1a22e3('0x4c')](![]);},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x1d1')]=function(){return this['_wordWrap'];},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x4c')]=function(_0x4fe921){const _0x302726=_0x1d5f2b;return this[_0x302726('0x62')]=_0x4fe921,'';},Window_Base[_0x1d5f2b('0x6e')]['registerResetRect']=function(_0xf5c464){const _0x3726b1=_0x1d5f2b;this[_0x3726b1('0xa5')]=JsonEx['makeDeepCopy'](_0xf5c464);},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x94')]=function(){const _0x51fdac=_0x1d5f2b;this['contents'][_0x51fdac('0x21a')]=$gameSystem[_0x51fdac('0x1db')](),this[_0x51fdac('0x14f')][_0x51fdac('0xe3')]=$gameSystem[_0x51fdac('0x230')](),this[_0x51fdac('0x14f')][_0x51fdac('0x1e4')]=![],this[_0x51fdac('0x14f')]['fontItalic']=![],this[_0x51fdac('0x1c7')]();},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x1c7')]=function(){const _0x55259f=_0x1d5f2b;this[_0x55259f('0x1df')](ColorManager[_0x55259f('0x97')]()),this[_0x55259f('0x236')](ColorManager[_0x55259f('0x17a')]());const _0x4387f7=VisuMZ[_0x55259f('0x65')]['Settings'][_0x55259f('0x120')];_0x4387f7[_0x55259f('0x8e')]===undefined&&(_0x4387f7[_0x55259f('0x8e')]=0x3),this[_0x55259f('0x14f')][_0x55259f('0x17c')]=_0x4387f7['DefaultOutlineWidth'],this['setColorLock'](![]);},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x137')]=function(_0x222fcc){const _0x4f6068=_0x1d5f2b;this[_0x4f6068('0x86')]=_0x222fcc;},Window_Base['prototype'][_0x1d5f2b('0x191')]=function(){const _0x493981=_0x1d5f2b;return this[_0x493981('0x86')];},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0xf7')]=function(){return![];},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x7e')]=function(){const _0x5cb28e=_0x1d5f2b,_0x40f6e5=[_0x5cb28e('0x21a'),_0x5cb28e('0xe3'),'fontBold',_0x5cb28e('0x3d'),_0x5cb28e('0xf0'),_0x5cb28e('0x85'),_0x5cb28e('0x17c'),_0x5cb28e('0x118')];let _0x119e12={};for(const _0x2b7ffd of _0x40f6e5){_0x119e12[_0x2b7ffd]=this[_0x5cb28e('0x14f')][_0x2b7ffd];}return _0x119e12;},Window_Base[_0x1d5f2b('0x6e')]['returnPreservedFontSettings']=function(_0x2f0202){const _0x554686=_0x1d5f2b;for(const _0x2b361a in _0x2f0202){this[_0x554686('0x14f')][_0x2b361a]=_0x2f0202[_0x2b361a];}},VisuMZ[_0x1d5f2b('0x65')][_0x1d5f2b('0x1ba')]=Window_Base['prototype'][_0x1d5f2b('0xea')],Window_Base['prototype'][_0x1d5f2b('0xea')]=function(){const _0x1364e6=_0x1d5f2b;VisuMZ['MessageCore'][_0x1364e6('0x1ba')][_0x1364e6('0x128')](this),this[_0x1364e6('0x7')]();},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x4a')]=function(){return![];},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x7')]=function(){const _0xfe722d=_0x1d5f2b;if(this[_0xfe722d('0x1e6')]>0x0){if(_0xfe722d('0xaf')!==_0xfe722d('0xaf')){function _0x26e843(){const _0x3d1927=_0xfe722d,_0x37b45a=_0x25ec7e['parse']('['+_0x106c3d['$1'][_0x3d1927('0x165')](/\d+/g)+']');for(const _0x59dcdc of _0x37b45a){if(_0x47b1a6[_0x3d1927('0x25')](_0x59dcdc))return![];}return!![];}}else{if(this[_0xfe722d('0x4a')]()){if('HoBfs'==='HoBfs')this['x']=this[_0xfe722d('0x12c')](this['x'],this[_0xfe722d('0x122')]),this['y']=this[_0xfe722d('0x12c')](this['y'],this[_0xfe722d('0x1d6')]),this[_0xfe722d('0x11b')]=this[_0xfe722d('0x12c')](this['width'],this[_0xfe722d('0x7c')]),this[_0xfe722d('0x1f1')]=this[_0xfe722d('0x12c')](this[_0xfe722d('0x1f1')],this[_0xfe722d('0x1bb')]),this[_0xfe722d('0xcf')]();else{function _0x2637c9(){const _0x405207=_0xfe722d;this[_0x405207('0x1ee')][_0x1b18a3][_0x405207('0x16f')][0x0][_0x405207('0x1f5')](_0x6e6291);}}}this[_0xfe722d('0x1e6')]--;}}},Window_Base[_0x1d5f2b('0x6e')]['clampPlacementPosition']=function(_0x3037cf,_0x233209){const _0xa375f0=_0x1d5f2b;if(!_0x3037cf){if('twXed'!==_0xa375f0('0x1e7')){function _0x3eae23(){const _0x39cbfb=_0xa375f0;if(!_0x499dce[_0x39cbfb('0x25')](_0xb9fe2c))return![];}}else this[_0xa375f0('0x11b')]=Math[_0xa375f0('0x131')](this[_0xa375f0('0x11b')],Graphics[_0xa375f0('0x11b')]),this[_0xa375f0('0x1f1')]=Math['min'](this[_0xa375f0('0x1f1')],Graphics[_0xa375f0('0x1f1')]);}if(!_0x233209){if(_0xa375f0('0x88')!==_0xa375f0('0x88')){function _0x5240ab(){const _0x3baf50=_0xa375f0;if(this[_0x3baf50('0x229')]===_0x232f62)this[_0x3baf50('0xde')]();if(this[_0x3baf50('0x229')]['choiceLineHeight']===_0x1a2a3d)this[_0x3baf50('0xde')]();this['_MessageCoreSettings'][_0x3baf50('0x1f3')]=_0x32cd15||0x1;}}else{const _0x300c83=-(Math[_0xa375f0('0x5f')](Graphics['width']-Graphics[_0xa375f0('0x23e')])/0x2),_0x5e7a70=_0x300c83+Graphics[_0xa375f0('0x11b')]-this[_0xa375f0('0x11b')],_0x12624c=-(Math[_0xa375f0('0x5f')](Graphics[_0xa375f0('0x1f1')]-Graphics[_0xa375f0('0xe9')])/0x2),_0x12a598=_0x12624c+Graphics[_0xa375f0('0x1f1')]-this[_0xa375f0('0x1f1')];this['x']=this['x']['clamp'](_0x300c83,_0x5e7a70),this['y']=this['y'][_0xa375f0('0xc4')](_0x12624c,_0x12a598);}}},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x12c')]=function(_0x5a72b6,_0xb773d){const _0x3b4d3a=_0x1d5f2b,_0xafc5fe=this[_0x3b4d3a('0x1e6')],_0x44d6f5=this[_0x3b4d3a('0x1c2')],_0x460a7e=this[_0x3b4d3a('0x155')]((_0x44d6f5-_0xafc5fe)/_0x44d6f5),_0x46bafc=this[_0x3b4d3a('0x155')]((_0x44d6f5-_0xafc5fe+0x1)/_0x44d6f5),_0x367d9c=(_0x5a72b6-_0xb773d*_0x460a7e)/(0x1-_0x460a7e);return _0x367d9c+(_0xb773d-_0x367d9c)*_0x46bafc;},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x155')]=function(_0x5a1165){const _0x1812c7=_0x1d5f2b,_0x29f24d=0x2;switch(this[_0x1812c7('0x107')]){case 0x0:return _0x5a1165;case 0x1:return this[_0x1812c7('0x263')](_0x5a1165,_0x29f24d);case 0x2:return this[_0x1812c7('0x18c')](_0x5a1165,_0x29f24d);case 0x3:return this[_0x1812c7('0x66')](_0x5a1165,_0x29f24d);default:if(Imported['VisuMZ_0_CoreEngine'])return VisuMZ[_0x1812c7('0x12c')](_0x5a1165,this[_0x1812c7('0x107')]);else{if(_0x1812c7('0x63')===_0x1812c7('0x215')){function _0x412aad(){const _0xe5a6ac=_0x1812c7,_0x10424b=_0x5ea489>=0x1?_0x437eed[_0xe5a6ac('0x14a')](_0x5baec8):null,_0x2fb9cc=_0x10424b?_0x10424b['name']():'',_0x3f8b44=_0xe15d58(_0x4c32e1[_0xe5a6ac('0x65')][_0xe5a6ac('0x42')][_0xe5a6ac('0x90')][_0xe5a6ac('0x43')]);return this[_0xe5a6ac('0xf7')]()&&_0x3f8b44!==0x0?_0xe5a6ac('0x6b')['format'](_0x3f8b44,_0x2fb9cc):_0x2fb9cc;}}else return _0x5a1165;}}},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x76')]=function(_0x3cfbbd,_0x212770,_0x4e9b28,_0x167cc3,_0x12830d,_0x4e457d){const _0x133911=_0x1d5f2b;this[_0x133911('0x122')]=_0x3cfbbd,this['_moveTargetY']=_0x212770,this['_moveTargetWidth']=_0x4e9b28||this[_0x133911('0x11b')],this[_0x133911('0x1bb')]=_0x167cc3||this['height'],this[_0x133911('0x1e6')]=_0x12830d||0x1;if(this[_0x133911('0x1e6')]<=0x0)this[_0x133911('0x1e6')]=0x1;this['_wholeMoveDuration']=this[_0x133911('0x1e6')],this[_0x133911('0x107')]=_0x4e457d||0x0;},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x61')]=function(_0x541910,_0x57fc73,_0x233817,_0x9b5cfa,_0xaefbdc,_0x490be2){const _0x2ce886=_0x1d5f2b;this[_0x2ce886('0x122')]=this['x']+_0x541910,this[_0x2ce886('0x1d6')]=this['y']+_0x57fc73,this[_0x2ce886('0x7c')]=this[_0x2ce886('0x11b')]+(_0x233817||0x0),this[_0x2ce886('0x1bb')]=this['height']+(_0x9b5cfa||0x0),this[_0x2ce886('0x1e6')]=_0xaefbdc||0x1;if(this[_0x2ce886('0x1e6')]<=0x0)this[_0x2ce886('0x1e6')]=0x1;this[_0x2ce886('0x1c2')]=this[_0x2ce886('0x1e6')],this[_0x2ce886('0x107')]=_0x490be2||0x0;},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x146')]=function(_0x8d5aa5,_0x5999b4){const _0x30b1ce=_0x1d5f2b;this['moveTo'](this[_0x30b1ce('0xa5')]['x'],this[_0x30b1ce('0xa5')]['y'],this[_0x30b1ce('0xa5')][_0x30b1ce('0x11b')],this['_resetRect'][_0x30b1ce('0x1f1')],_0x8d5aa5,_0x5999b4);},VisuMZ[_0x1d5f2b('0x65')]['Window_Base_changeTextColor']=Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x1df')],Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x1df')]=function(_0x21b1d0){const _0x48c67d=_0x1d5f2b;if(this['isColorLocked']())return;_0x21b1d0=_0x21b1d0[_0x48c67d('0x71')](/\,/g,''),this[_0x48c67d('0x268')]=this['_textColorStack']||[],this['_textColorStack']['unshift'](this[_0x48c67d('0x14f')]['textColor']),VisuMZ['MessageCore'][_0x48c67d('0x35')]['call'](this,_0x21b1d0);},Window_Base[_0x1d5f2b('0x6e')]['processPreviousColor']=function(_0x4e3694){const _0x273bba=_0x1d5f2b;this[_0x273bba('0x1e1')](_0x4e3694);if(this[_0x273bba('0x191')]())return;_0x4e3694[_0x273bba('0x207')]&&(this[_0x273bba('0x268')]=this['_textColorStack']||[],this[_0x273bba('0x14f')][_0x273bba('0xf0')]=this[_0x273bba('0x268')][_0x273bba('0x6a')]()||ColorManager['normalColor']());},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x266')]=function(_0x1f4d90){const _0x507b88=_0x1d5f2b;return _0x1f4d90=this['convertTextMacros'](_0x1f4d90),_0x1f4d90=this[_0x507b88('0x50')](_0x1f4d90),_0x1f4d90=this['convertVariableEscapeCharacters'](_0x1f4d90),_0x1f4d90=this[_0x507b88('0x23')](_0x1f4d90),_0x1f4d90=this[_0x507b88('0x241')](_0x1f4d90),_0x1f4d90=this[_0x507b88('0x228')](_0x1f4d90),_0x1f4d90=this[_0x507b88('0x26d')](_0x1f4d90),_0x1f4d90=this[_0x507b88('0x1a')](_0x1f4d90),_0x1f4d90=this['convertBaseEscapeCharacters'](_0x1f4d90),_0x1f4d90=this[_0x507b88('0x1e0')](_0x1f4d90),_0x1f4d90=this[_0x507b88('0x1f2')](_0x1f4d90),_0x1f4d90=this[_0x507b88('0x12e')](_0x1f4d90),_0x1f4d90=this[_0x507b88('0x22')](_0x1f4d90),_0x1f4d90=this[_0x507b88('0x36')](_0x1f4d90),_0x1f4d90=this[_0x507b88('0xf5')](_0x1f4d90),_0x1f4d90;},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0xce')]=function(_0x28a285){const _0x3cf46c=_0x1d5f2b;for(const _0x16d8db of VisuMZ[_0x3cf46c('0x65')][_0x3cf46c('0x42')]['TextMacros']){if(_0x3cf46c('0x170')===_0x3cf46c('0x34')){function _0x4f916a(){_0x5c3475=_0x214570['max'](_0xd6f995,_0x38c215);}}else _0x28a285[_0x3cf46c('0x165')](_0x16d8db[_0x3cf46c('0x224')])&&(_0x28a285=_0x28a285[_0x3cf46c('0x71')](_0x16d8db[_0x3cf46c('0x224')],_0x16d8db[_0x3cf46c('0x265')][_0x3cf46c('0x160')](this)));}return _0x28a285;},Window_Base['prototype'][_0x1d5f2b('0x50')]=function(_0xc15ffd){const _0x569a94=_0x1d5f2b;return _0xc15ffd=_0xc15ffd[_0x569a94('0x71')](/\\/g,'\x1b'),_0xc15ffd=_0xc15ffd[_0x569a94('0x71')](/\x1b\x1b/g,'\x5c'),_0xc15ffd;},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x22')]=function(_0x2ac76b){const _0x5cb9e4=_0x1d5f2b;for(;;){if('qsdIj'==='qsdIj'){if(_0x2ac76b[_0x5cb9e4('0x165')](/\\V\[(\d+)\]/gi)){if('VUFIP'==='VUFIP')_0x2ac76b=_0x2ac76b['replace'](/\\V\[(\d+)\]/gi,(_0x5b7826,_0x97ee6b)=>this[_0x5cb9e4('0x50')](String($gameVariables['value'](parseInt(_0x97ee6b)))));else{function _0x48b39e(){_0x584a5c['x']+=_0x596b9a['startX'];}}}else{if(_0x2ac76b[_0x5cb9e4('0x165')](/\x1bV\[(\d+)\]/gi))_0x2ac76b=_0x2ac76b[_0x5cb9e4('0x71')](/\x1bV\[(\d+)\]/gi,(_0x24d520,_0x3dbf77)=>this[_0x5cb9e4('0x50')](String($gameVariables[_0x5cb9e4('0x25')](parseInt(_0x3dbf77)))));else break;}}else{function _0x22a0a9(){const _0x5e8d98=_0x5cb9e4;this[_0x5e8d98('0xfc')]=_0x374c48(_0x18f591['textSpeed'])[_0x5e8d98('0xc4')](0x1,0xb);}}}return _0x2ac76b;},Window_Base[_0x1d5f2b('0x6e')]['preConvertEscapeCharacters']=function(_0x8258c3){const _0x557035=_0x1d5f2b;return this[_0x557035('0x142')](),_0x8258c3;},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x12e')]=function(_0x2d6322){return _0x2d6322;},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x241')]=function(_0x47d78c){const _0x10fd1d=_0x1d5f2b;return _0x47d78c=_0x47d78c[_0x10fd1d('0x71')](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/i,''),_0x47d78c=_0x47d78c['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x47d78c=_0x47d78c[_0x10fd1d('0x71')](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x47d78c;},Window_Base['prototype'][_0x1d5f2b('0x228')]=function(_0x5a4f50){const _0x40b918=_0x1d5f2b;return _0x5a4f50=_0x5a4f50['replace'](/<B>/gi,'\x1bBOLD[1]'),_0x5a4f50=_0x5a4f50[_0x40b918('0x71')](/<\/B>/gi,_0x40b918('0x250')),_0x5a4f50=_0x5a4f50[_0x40b918('0x71')](/<I>/gi,_0x40b918('0x22d')),_0x5a4f50=_0x5a4f50['replace'](/<\/I>/gi,_0x40b918('0x11f')),_0x5a4f50;},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x26d')]=function(_0x2fd785){const _0x1f783d=_0x1d5f2b;return _0x2fd785=_0x2fd785[_0x1f783d('0x71')](/<LEFT>/gi,_0x1f783d('0x1a2')),_0x2fd785=_0x2fd785[_0x1f783d('0x71')](/<\/LEFT>/gi,_0x1f783d('0x153')),_0x2fd785=_0x2fd785[_0x1f783d('0x71')](/<CENTER>/gi,_0x1f783d('0xb7')),_0x2fd785=_0x2fd785[_0x1f783d('0x71')](/<\/CENTER>/gi,_0x1f783d('0x153')),_0x2fd785=_0x2fd785['replace'](/<RIGHT>/gi,'\x1bTEXTALIGNMENT[3]'),_0x2fd785=_0x2fd785['replace'](/<\/RIGHT>/gi,_0x1f783d('0x153')),_0x2fd785;},Window_Base[_0x1d5f2b('0x6e')]['convertLockColorsEscapeCharacters']=function(_0x5310ac){const _0x3568a7=_0x1d5f2b;return _0x5310ac=_0x5310ac[_0x3568a7('0x71')](/<COLORLOCK>/gi,'\x1bCOLORLOCK[1]'),_0x5310ac=_0x5310ac['replace'](/<\/COLORLOCK>/gi,'\x1bCOLORLOCK[0]'),_0x5310ac=_0x5310ac['replace'](/\(\(\(/gi,_0x3568a7('0xf3')),_0x5310ac=_0x5310ac[_0x3568a7('0x71')](/\)\)\)/gi,'\x1bCOLORLOCK[0]'),_0x5310ac;},Window_Base[_0x1d5f2b('0x6e')]['convertBaseEscapeCharacters']=function(_0x1ba8f4){const _0x29c7ad=_0x1d5f2b;return _0x1ba8f4=_0x1ba8f4[_0x29c7ad('0x71')](/\x1bN\[(\d+)\]/gi,(_0xfa376,_0x5e5902)=>this[_0x29c7ad('0x1b2')](parseInt(_0x5e5902))),_0x1ba8f4=_0x1ba8f4[_0x29c7ad('0x71')](/\x1bP\[(\d+)\]/gi,(_0x4141e5,_0x13835b)=>this[_0x29c7ad('0x11c')](parseInt(_0x13835b))),_0x1ba8f4=_0x1ba8f4[_0x29c7ad('0x71')](/\x1bG/gi,TextManager[_0x29c7ad('0x11d')]),_0x1ba8f4;},Window_Base[_0x1d5f2b('0x6e')]['convertMessageCoreEscapeActions']=function(_0x277b6d){const _0x21a983=_0x1d5f2b;for(const _0x5270e0 of VisuMZ['MessageCore']['Settings'][_0x21a983('0x10b')]){_0x277b6d[_0x21a983('0x165')](_0x5270e0[_0x21a983('0x224')])&&(_0x277b6d=_0x277b6d['replace'](_0x5270e0['textCodeCheck'],_0x5270e0[_0x21a983('0x265')]),_0x277b6d=this[_0x21a983('0x22')](_0x277b6d));}return _0x277b6d;},Window_Base['prototype'][_0x1d5f2b('0x1f2')]=function(_0xaedae1){const _0x8a84e4=_0x1d5f2b;for(const _0x12ab7c of VisuMZ['MessageCore'][_0x8a84e4('0x42')]['TextCodeReplace']){if(_0xaedae1[_0x8a84e4('0x165')](_0x12ab7c[_0x8a84e4('0x224')])){if('KXGbI'==='KXGbI')_0xaedae1=_0xaedae1[_0x8a84e4('0x71')](_0x12ab7c[_0x8a84e4('0x224')],_0x12ab7c['textCodeResult'][_0x8a84e4('0x160')](this)),_0xaedae1=this['convertVariableEscapeCharacters'](_0xaedae1);else{function _0x520fef(){const _0x308920=_0x8a84e4;this[_0x308920('0x1a5')](...arguments);}}}}return _0xaedae1;},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x1b2')]=function(_0x241a5b){const _0x58a254=_0x1d5f2b,_0x73682b=_0x241a5b>=0x1?$gameActors[_0x58a254('0x14a')](_0x241a5b):null,_0x2be889=_0x73682b?_0x73682b[_0x58a254('0x1e')]():'',_0x5cac39=Number(VisuMZ[_0x58a254('0x65')][_0x58a254('0x42')]['AutoColor'][_0x58a254('0x43')]);if(this['isAutoColorAffected']()&&_0x5cac39!==0x0){if(_0x58a254('0x1a1')!==_0x58a254('0x1a1')){function _0x30b5d8(){_0xf711d0='';}}else return _0x58a254('0x6b')[_0x58a254('0x10e')](_0x5cac39,_0x2be889);}else{if(_0x58a254('0xcb')===_0x58a254('0xcb'))return _0x2be889;else{function _0x2e7043(){const _0x3e7eac=_0x58a254;return _0x5c2a8e=_0x3e7b71[_0x3e7eac('0x71')](/\x1bN\[(\d+)\]/gi,(_0x359efc,_0x410cf0)=>this[_0x3e7eac('0x1b2')](_0x19d203(_0x410cf0))),_0x24f4ec=_0x17ed61[_0x3e7eac('0x71')](/\x1bP\[(\d+)\]/gi,(_0x304efc,_0x206b65)=>this[_0x3e7eac('0x11c')](_0x261f46(_0x206b65))),_0x2c76f8=_0x2b7415['replace'](/\x1bG/gi,_0x475055[_0x3e7eac('0x11d')]),_0xad6152;}}}},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x11c')]=function(_0x273e65){const _0x56c847=_0x1d5f2b,_0x107748=_0x273e65>=0x1?$gameParty[_0x56c847('0x272')]()[_0x273e65-0x1]:null,_0x59efbf=_0x107748?_0x107748[_0x56c847('0x1e')]():'',_0x538e99=Number(VisuMZ['MessageCore'][_0x56c847('0x42')]['AutoColor'][_0x56c847('0x43')]);if(this[_0x56c847('0xf7')]()&&_0x538e99!==0x0)return _0x56c847('0x6b')['format'](_0x538e99,_0x59efbf);else{if(_0x56c847('0x53')!==_0x56c847('0x53')){function _0x15bb61(){const _0x186dce=_0x56c847;if(_0x3a532c[_0x186dce('0x19')]==='')this[_0x186dce('0x1e1')](_0x2c8d38);_0x3df1f7[_0x186dce('0x23c')]['call'](this,_0x16d4c1);if(this[_0x186dce('0xec')]===_0x200c48){const _0x226c8a=_0x12b203[_0x186dce('0x3')]||0x0;if(_0x226c8a>0x0)this[_0x186dce('0xcd')](_0x226c8a);}}}else return _0x59efbf;}},Window_Base['prototype'][_0x1d5f2b('0x36')]=function(_0xcdbdc5){const _0x37d8cc=_0x1d5f2b;if(this[_0x37d8cc('0xf7')]()){if(_0x37d8cc('0x148')===_0x37d8cc('0x148'))_0xcdbdc5=this[_0x37d8cc('0x1be')](_0xcdbdc5),_0xcdbdc5=this[_0x37d8cc('0x15f')](_0xcdbdc5);else{function _0xf1e62(){const _0x14d9bb=_0x37d8cc;if(this[_0x14d9bb('0x229')]===_0x5c8621)this[_0x14d9bb('0xde')]();if(this['_MessageCoreSettings']['choiceRows']===_0x5b451d)this['initMessageCore']();this[_0x14d9bb('0x229')][_0x14d9bb('0x1cd')]=_0x40912a||0x1;}}}return _0xcdbdc5;},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x1be')]=function(_0xa74db1){const _0x42848e=_0x1d5f2b;for(autoColor of VisuMZ[_0x42848e('0x65')]['AutoColorRegExp']){if(_0x42848e('0x183')===_0x42848e('0x183'))_0xa74db1=_0xa74db1[_0x42848e('0x71')](autoColor[0x0],autoColor[0x1]);else{function _0x1a1d74(){const _0x17a399=_0x42848e;return _0x15cc4a=_0x42f0fe[_0x17a399('0x71')](/<LEFT>/gi,this[_0x17a399('0x1f9')]['bind'](this,0x0)),_0x3c835d=_0x289298['replace'](/<CENTER>/gi,this['setRelativePosition'][_0x17a399('0x160')](this,0x5)),_0x5aec52=_0x3537ec['replace'](/<RIGHT>/gi,this[_0x17a399('0x1f9')][_0x17a399('0x160')](this,0xa)),_0x3e92f7=_0x87810a[_0x17a399('0x71')](/<POSITION:[ ](\d+)>/gi,(_0x565ff7,_0x479e25)=>this[_0x17a399('0x1f9')](_0x3d225e(_0x479e25))),_0xd9400e=_0x55cc21[_0x17a399('0x71')](/<\/LEFT>/gi,''),_0xbb905a=_0x1af357[_0x17a399('0x71')](/<\/CENTER>/gi,''),_0x1b840b=_0x30f8d9[_0x17a399('0x71')](/<\/RIGHT>/gi,''),_0x200f87['prototype'][_0x17a399('0x23')][_0x17a399('0x128')](this,_0x51afde);}}}return _0xa74db1;},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x103')]=function(){const _0x33cc6e=_0x1d5f2b;this[_0x33cc6e('0x1b7')]=[];},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x142')]=function(){const _0x567bc1=_0x1d5f2b;this[_0x567bc1('0x103')]();const _0x5f1dd3=VisuMZ[_0x567bc1('0x65')][_0x567bc1('0x42')][_0x567bc1('0x90')],_0x1e1b85=_0x5f1dd3['Actors'];if(_0x1e1b85<=0x0)return;for(const _0x56c058 of $gameActors[_0x567bc1('0x1b4')]){if(_0x567bc1('0x79')!==_0x567bc1('0x1c3')){if(!_0x56c058)continue;const _0xf02e0e=_0x56c058[_0x567bc1('0x1e')]();if(_0xf02e0e[_0x567bc1('0x1aa')]()['length']<=0x0)continue;if(_0xf02e0e[_0x567bc1('0x165')](/-----/i))continue;let _0x3c07d8=VisuMZ[_0x567bc1('0x65')][_0x567bc1('0x37')](_0xf02e0e);const _0x1667ea=new RegExp('\x5cb'+_0x3c07d8+'\x5cb','g'),_0x14e358='\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x567bc1('0x10e')](_0x1e1b85,_0xf02e0e);this[_0x567bc1('0x1b7')]['push']([_0x1667ea,_0x14e358]);}else{function _0x2ddbe5(){return _0x54b169;}}}},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x15f')]=function(_0x30508f){const _0x3d2b58=_0x1d5f2b;if(this['_autoColorActorNames']===undefined){if(_0x3d2b58('0x100')===_0x3d2b58('0x100'))this[_0x3d2b58('0x142')]();else{function _0x1a9686(){const _0x177e43=_0x3d2b58;return _0x1e8699[_0x177e43('0x39')];}}}for(autoColor of this['_autoColorActorNames']){_0x30508f=_0x30508f[_0x3d2b58('0x71')](autoColor[0x0],autoColor[0x1]);}return _0x30508f;},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x1c4')]=function(_0x357f43,_0x32707e,_0x53b371){const _0x3062d7=_0x1d5f2b;if(!_0x357f43)return'';const _0x5e7e56=_0x357f43[_0x32707e];let _0xeeb007='';if(_0x5e7e56&&_0x53b371&&_0x5e7e56[_0x3062d7('0xc3')]){if(_0x3062d7('0x164')!=='BKBIW'){const _0x12cc00=_0x3062d7('0xc1');_0xeeb007=_0x12cc00[_0x3062d7('0x10e')](_0x5e7e56[_0x3062d7('0xc3')],_0x5e7e56[_0x3062d7('0x1e')]);}else{function _0x257ebf(){const _0x518d4a=_0x3062d7;var _0x58bf04=_0x130406[_0x518d4a('0x16f')][0x1]+_0x3ba02e;this['_list'][_0x26b681][_0x518d4a('0x16f')][0x1]=_0x58bf04;}}}else{if(_0x5e7e56){if(_0x3062d7('0xa8')===_0x3062d7('0xe4')){function _0x19ded8(){const _0x405683=_0x3062d7;_0x3bee4c['MessageCore'][_0x405683('0x42')][_0x405683('0x233')]['AddOption']&&this[_0x405683('0xa')]();}}else _0xeeb007=_0x5e7e56['name'];}else _0xeeb007='';}if(this[_0x3062d7('0xf7')]()){if(_0x3062d7('0x1e2')===_0x3062d7('0xe0')){function _0x4e0c88(){const _0x45fe69=_0x3062d7;this['_messageCommonEvents'][_0x45fe69('0x8f')](_0x8db1a7);}}else _0xeeb007=this[_0x3062d7('0x12d')](_0xeeb007,_0x357f43);}return _0xeeb007;},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x7a')]=function(_0x2bb728){const _0x43010d=_0x1d5f2b,_0x3b54d0=$gameParty[_0x43010d('0x253')]();if(_0x3b54d0['id']<0x0)return'';let _0x13c814=null;if(_0x3b54d0[_0x43010d('0x2c')]===0x0)_0x13c814=$dataItems[_0x3b54d0['id']];if(_0x3b54d0['type']===0x1)_0x13c814=$dataWeapons[_0x3b54d0['id']];if(_0x3b54d0[_0x43010d('0x2c')]===0x2)_0x13c814=$dataArmors[_0x3b54d0['id']];if(!_0x13c814)return'';return _0x2bb728?_0x43010d('0xc1')[_0x43010d('0x10e')](_0x13c814[_0x43010d('0xc3')],_0x13c814[_0x43010d('0x1e')]):_0x13c814[_0x43010d('0x1e')];},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x1c6')]=function(){const _0x26c6f1=$gameParty['getLastGainedItemData']();if(_0x26c6f1['id']<=0x0)return'';return _0x26c6f1['quantity'];},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x12d')]=function(_0x368635,_0x73bdfa){const _0x4b153d=_0x1d5f2b,_0x1830a7=VisuMZ[_0x4b153d('0x65')]['Settings'][_0x4b153d('0x90')];let _0x267a46=0x0;if(_0x73bdfa===$dataActors)_0x267a46=_0x1830a7[_0x4b153d('0x43')];if(_0x73bdfa===$dataClasses)_0x267a46=_0x1830a7[_0x4b153d('0x1a9')];if(_0x73bdfa===$dataSkills)_0x267a46=_0x1830a7['Skills'];if(_0x73bdfa===$dataItems)_0x267a46=_0x1830a7['Items'];if(_0x73bdfa===$dataWeapons)_0x267a46=_0x1830a7['Weapons'];if(_0x73bdfa===$dataArmors)_0x267a46=_0x1830a7[_0x4b153d('0x243')];if(_0x73bdfa===$dataEnemies)_0x267a46=_0x1830a7[_0x4b153d('0xeb')];if(_0x73bdfa===$dataStates)_0x267a46=_0x1830a7[_0x4b153d('0x24c')];if(_0x267a46>0x0){if(_0x4b153d('0x9a')===_0x4b153d('0x9a'))_0x368635=_0x4b153d('0x6b')[_0x4b153d('0x10e')](_0x267a46,_0x368635);else{function _0x1dd7c0(){const _0x36a68d=_0x4b153d;_0x30a0d7[_0x36a68d('0x65')]['ParseStateNotetags'][_0x36a68d('0x128')](this,_0x8c3c33);const _0x1b37a6=_0x480cf5[_0x36a68d('0x65')][_0x36a68d('0x42')][_0x36a68d('0x90')];_0x222e2f['MessageCore'][_0x36a68d('0x102')](_0x51894e,_0x1b37a6[_0x36a68d('0x24c')]);}}}return _0x368635;},Window_Base['prototype']['prepareWordWrapEscapeCharacters']=function(_0x49aecf){const _0x3cbaf6=_0x1d5f2b;_0x49aecf=_0x49aecf['replace'](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x2c6d28,_0x109f34)=>this[_0x3cbaf6('0x4c')](!![])),_0x49aecf=_0x49aecf[_0x3cbaf6('0x71')](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x49bb96,_0x5ea2e5)=>this['setWordWrap'](![])),_0x49aecf=_0x49aecf[_0x3cbaf6('0x71')](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x36866c,_0x3261ce)=>this[_0x3cbaf6('0x4c')](![]));if(_0x49aecf[_0x3cbaf6('0x165')](Window_Message[_0x3cbaf6('0x96')])){if('mHzWL'!=='mHzWL'){function _0x5bcfb2(){const _0x4e5ea1=_0x3cbaf6;!_0x154a2f[_0x4e5ea1('0x8')]?this['_messageCommonEvents'][_0x4e5ea1('0x8f')](_0x58527a):_0x4cdc22[_0x4e5ea1('0xea')]();}}else this[_0x3cbaf6('0x4c')](![]);}else _0x49aecf[_0x3cbaf6('0x165')](Window_Message[_0x3cbaf6('0x238')])&&this[_0x3cbaf6('0x4c')](![]);if(!this[_0x3cbaf6('0x1d1')]())return _0x49aecf;if(_0x49aecf[_0x3cbaf6('0x106')]<=0x0)return _0x49aecf;if(VisuMZ[_0x3cbaf6('0x65')][_0x3cbaf6('0x42')][_0x3cbaf6('0x13b')][_0x3cbaf6('0x279')]){if(_0x3cbaf6('0x149')===_0x3cbaf6('0x149'))_0x49aecf=_0x49aecf[_0x3cbaf6('0x71')](/[\n\r]+/g,'\x20'),_0x49aecf=_0x49aecf['replace'](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a');else{function _0x3b0359(){const _0x35a789=_0x3cbaf6;_0x2cd866['MessageCore'][_0x35a789('0x19e')][_0x35a789('0x128')](this),this[_0x35a789('0xcf')]();}}}else _0x49aecf=_0x49aecf['replace'](/[\n\r]+/g,''),_0x49aecf=_0x49aecf[_0x3cbaf6('0x71')](/<(?:BR|LINEBREAK)>/gi,'\x0a');return _0x49aecf=this[_0x3cbaf6('0xc8')](_0x49aecf),_0x49aecf=_0x49aecf[_0x3cbaf6('0x242')]('\x20')[_0x3cbaf6('0xb6')](_0x3cbaf6('0x15')),_0x49aecf=_0x49aecf[_0x3cbaf6('0x71')](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x49aecf=_0x49aecf['replace'](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x49aecf;},Window_Base[_0x1d5f2b('0x6e')]['addWrapBreakAfterPunctuation']=function(_0x49dbec){return _0x49dbec;},VisuMZ[_0x1d5f2b('0x65')][_0x1d5f2b('0x17d')]=Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0xba')],Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0xba')]=function(_0x354bc8){const _0x57b956=_0x1d5f2b;VisuMZ[_0x57b956('0x65')]['Window_Base_processNewLine'][_0x57b956('0x128')](this,_0x354bc8),this[_0x57b956('0x276')](_0x354bc8);},VisuMZ[_0x1d5f2b('0x65')][_0x1d5f2b('0x220')]=Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x19a')],Window_Base[_0x1d5f2b('0x6e')]['processControlCharacter']=function(_0x4fa10e,_0x11d2e9){const _0x597572=_0x1d5f2b;VisuMZ[_0x597572('0x65')]['Window_Base_processControlCharacter']['call'](this,_0x4fa10e,_0x11d2e9);if(_0x11d2e9==='\x1bWrapBreak[0]'){if('XDqaI'==='GJeyf'){function _0x15f4f3(){const _0x1e7db1=_0x597572;_0x1e85ad=_0x10a7b2[_0x1e7db1('0x71')](/[\n\r]+/g,''),_0x4b322e=_0x8df0f5[_0x1e7db1('0x71')](/<(?:BR|LINEBREAK)>/gi,'\x0a');}}else this[_0x597572('0x199')](_0x4fa10e);}},Window_Base['prototype'][_0x1d5f2b('0xac')]=function(_0x2b5ee8){const _0x1f7da7=_0x1d5f2b;var _0x1edd3b=/^\<(.*?)\>/[_0x1f7da7('0xf6')](_0x2b5ee8['text'][_0x1f7da7('0xc9')](_0x2b5ee8['index']));if(_0x1edd3b){if(_0x1f7da7('0xf2')!==_0x1f7da7('0x1d5'))return _0x2b5ee8['index']+=_0x1edd3b[0x0][_0x1f7da7('0x106')],String(_0x1edd3b[0x0][_0x1f7da7('0xc9')](0x1,_0x1edd3b[0x0][_0x1f7da7('0x106')]-0x1));else{function _0x5b2d88(){const _0x55e27a=_0x1f7da7,_0x10932c=_0x718f49[_0x55e27a('0x65')][_0x55e27a('0x42')][_0x55e27a('0x90')];!_0x24448c[_0x55e27a('0x4')]&&(_0x4ae540[_0x55e27a('0x65')][_0x55e27a('0x31')](_0xb4ae0c,_0x10932c[_0x55e27a('0x1a9')]),_0x461296[_0x55e27a('0x65')][_0x55e27a('0x31')](_0x2a6011,_0x10932c[_0x55e27a('0xda')]),_0x2482e3[_0x55e27a('0x65')]['AddAutoColor'](_0x3e5b6d,_0x10932c[_0x55e27a('0x18f')]),_0x1bafb9[_0x55e27a('0x65')][_0x55e27a('0x31')](_0x11d601,_0x10932c['Weapons']),_0x225143[_0x55e27a('0x65')][_0x55e27a('0x31')](_0xe86c7a,_0x10932c[_0x55e27a('0x243')]),_0x5d5cd2[_0x55e27a('0x65')][_0x55e27a('0x31')](_0x3ffe5d,_0x10932c['Enemies']),_0x240751[_0x55e27a('0x65')]['AddAutoColor'](_0x25ce77,_0x10932c['States'])),_0x7e1475[_0x55e27a('0x65')]['CreateAutoColorRegExpLists']();}}}else{if(_0x1f7da7('0x168')!==_0x1f7da7('0x168')){function _0x3ae301(){const _0x560355=_0x1f7da7;var _0x1d2961=/^\<(.*?)\>/[_0x560355('0xf6')](_0x5a5e4d['text'][_0x560355('0xc9')](_0x240f1b[_0x560355('0x1bf')]));return _0x1d2961?(_0x309ad6[_0x560355('0x1bf')]+=_0x1d2961[0x0][_0x560355('0x106')],_0x2d47e3(_0x1d2961[0x0][_0x560355('0xc9')](0x1,_0x1d2961[0x0]['length']-0x1))):'';}}else return'';}},VisuMZ[_0x1d5f2b('0x65')][_0x1d5f2b('0x1a0')]=Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x16c')],Window_Base['prototype'][_0x1d5f2b('0x16c')]=function(_0x714a63,_0x5731ad){const _0x4dc723=_0x1d5f2b;switch(_0x714a63){case'C':if(_0x5731ad[_0x4dc723('0x207')]){if('uwCBo'===_0x4dc723('0x217'))VisuMZ[_0x4dc723('0x65')][_0x4dc723('0x1a0')][_0x4dc723('0x128')](this,_0x714a63,_0x5731ad);else{function _0x162ea5(){const _0x2dc0cc=_0x4dc723;_0x1a32a3=this[_0x2dc0cc('0xbe')](),_0x34d03d[_0x2dc0cc('0x65')][_0x2dc0cc('0x25e')][_0x2dc0cc('0x128')](this,_0x4ec6c3);}}}else this[_0x4dc723('0x1e1')](_0x5731ad);break;case'I':case'{':case'}':VisuMZ[_0x4dc723('0x65')]['Window_Base_processEscapeCharacter'][_0x4dc723('0x128')](this,_0x714a63,_0x5731ad);break;case'FS':this[_0x4dc723('0xfb')](_0x5731ad);break;case'PX':this['processPxTextCode'](_0x5731ad);break;case'PY':this[_0x4dc723('0x125')](_0x5731ad);break;case _0x4dc723('0x1ec'):this['processFontChangeBold'](this['obtainEscapeParam'](_0x5731ad));break;case _0x4dc723('0x269'):this['processDrawCenteredPicture'](_0x5731ad);break;case _0x4dc723('0x113'):this[_0x4dc723('0x259')](_0x5731ad);break;case _0x4dc723('0x1ab'):this[_0x4dc723('0x3a')](_0x5731ad);break;case _0x4dc723('0xd'):this['processFontChangeItalic'](this[_0x4dc723('0x1e1')](_0x5731ad));break;case'PICTURE':this[_0x4dc723('0x192')](_0x5731ad);break;case _0x4dc723('0x9c'):this['processPreviousColor'](_0x5731ad);break;case _0x4dc723('0x244'):this[_0x4dc723('0x15e')](_0x5731ad);break;case _0x4dc723('0x1bd'):this[_0x4dc723('0x1b1')](_0x5731ad);break;case _0x4dc723('0x23d'):this['processWrapBreak'](_0x5731ad);break;default:this[_0x4dc723('0x1d9')](_0x714a63,_0x5731ad);}},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x1d9')]=function(_0x176f48,_0x211cde){const _0x562637=_0x1d5f2b;for(const _0x557181 of VisuMZ['MessageCore'][_0x562637('0x42')][_0x562637('0x10b')]){if('etGpX'!=='etGpX'){function _0x11d477(){const _0x4fc708=_0x562637;this[_0x4fc708('0x44')]=_0x531973,this[_0x4fc708('0x69')]=_0x5bf790||0x0,this[_0x4fc708('0xab')]();}}else{if(_0x557181[_0x562637('0xe6')]===_0x176f48){if(_0x562637('0x87')!==_0x562637('0x87')){function _0x49d7eb(){const _0x3d4f99=_0x562637;this[_0x3d4f99('0x14e')]=this[_0x3d4f99('0x14e')]||[];const _0x3978e9=this[_0x3d4f99('0x8')][_0x3d4f99('0x69')],_0xd15908=new _0x3a133b(_0xab1556,_0x3978e9);this['_messageCommonEvents'][_0x3d4f99('0x1f5')](_0xd15908);}}else{if(_0x557181['Type']==='')this[_0x562637('0x1e1')](_0x211cde);_0x557181[_0x562637('0x23c')][_0x562637('0x128')](this,_0x211cde);if(this[_0x562637('0xec')]===Window_Message){const _0x151721=_0x557181[_0x562637('0x3')]||0x0;if(_0x151721>0x0)this['launchMessageCommonEvent'](_0x151721);}}}}}},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x20a')]=function(){const _0x54bb98=_0x1d5f2b;this[_0x54bb98('0x14f')]['fontSize']+=VisuMZ[_0x54bb98('0x65')]['Settings'][_0x54bb98('0x120')]['FontChangeValue'],this[_0x54bb98('0x14f')][_0x54bb98('0xe3')]=Math['min'](this[_0x54bb98('0x14f')][_0x54bb98('0xe3')],VisuMZ['MessageCore'][_0x54bb98('0x42')][_0x54bb98('0x120')][_0x54bb98('0x1d2')]);},Window_Base['prototype'][_0x1d5f2b('0x22e')]=function(){const _0x4e79b1=_0x1d5f2b;this[_0x4e79b1('0x14f')][_0x4e79b1('0xe3')]-=VisuMZ[_0x4e79b1('0x65')]['Settings']['General'][_0x4e79b1('0x246')],this[_0x4e79b1('0x14f')][_0x4e79b1('0xe3')]=Math['max'](this[_0x4e79b1('0x14f')][_0x4e79b1('0xe3')],VisuMZ['MessageCore']['Settings'][_0x4e79b1('0x120')][_0x4e79b1('0x1e8')]);},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0xfb')]=function(_0xbb10cd){const _0x455b0c=_0x1d5f2b,_0x1e08cc=this[_0x455b0c('0x1e1')](_0xbb10cd);this[_0x455b0c('0x14f')][_0x455b0c('0xe3')]=_0x1e08cc[_0x455b0c('0xc4')](VisuMZ[_0x455b0c('0x65')]['Settings'][_0x455b0c('0x120')]['FontSmallerCap'],VisuMZ['MessageCore'][_0x455b0c('0x42')][_0x455b0c('0x120')][_0x455b0c('0x1d2')]);},Window_Base['prototype'][_0x1d5f2b('0x10a')]=function(_0x50aec4){const _0x13298d=_0x1d5f2b;let _0x2873e1=this[_0x13298d('0x14f')][_0x13298d('0xe3')];const _0x508c17=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0x5b5a61=_0x508c17[_0x13298d('0xf6')](_0x50aec4);if(!_0x5b5a61)break;const _0x358755=String(_0x5b5a61[0x1])[_0x13298d('0x84')]();if(_0x358755==='{')this[_0x13298d('0x20a')]();else{if(_0x358755==='}')this[_0x13298d('0x22e')]();else{if(_0x358755==='FS'){if('hYwUb'!==_0x13298d('0x60'))this[_0x13298d('0x14f')][_0x13298d('0xe3')]=parseInt(_0x5b5a61[0x3])['clamp'](VisuMZ[_0x13298d('0x65')][_0x13298d('0x42')][_0x13298d('0x120')]['FontSmallerCap'],VisuMZ['MessageCore'][_0x13298d('0x42')][_0x13298d('0x120')]['FontBiggerCap']);else{function _0x1be82c(){const _0x388756=_0x13298d;return _0x388756('0x6b')['format'](_0x24291d,_0x48a935);}}}}}if(this[_0x13298d('0x14f')][_0x13298d('0xe3')]>_0x2873e1){if('NVAIR'===_0x13298d('0x10')){function _0x29247(){const _0x29206f=_0x13298d,_0xc15aab=this[_0x29206f('0x26b')],_0x232553=_0xc15aab['y'],_0x4662e6=_0x36de50[_0x29206f('0x65')]['Settings'][_0x29206f('0x120')][_0x29206f('0xd8')];_0x232553>this['y']&&_0x232553<this['y']+this['height']-_0x4662e6&&(this['y']=_0xc15aab['y']+_0xc15aab[_0x29206f('0x1f1')]);}}else _0x2873e1=this[_0x13298d('0x14f')]['fontSize'];}}return _0x2873e1;},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x17b')]=function(_0x142878){const _0x380112=_0x1d5f2b;_0x142878['x']=this[_0x380112('0x1e1')](_0x142878);if(VisuMZ[_0x380112('0x65')]['Settings'][_0x380112('0x120')][_0x380112('0x252')]){if(_0x380112('0x1')!==_0x380112('0x49'))_0x142878['x']+=_0x142878[_0x380112('0x225')];else{function _0x8bc6f(){_0x2fd2cc['addMessageCommonEvent'](_0x165c3b);}}}},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x125')]=function(_0x4cd57d){const _0x56196f=_0x1d5f2b;_0x4cd57d['y']=this['obtainEscapeParam'](_0x4cd57d);if(VisuMZ[_0x56196f('0x65')][_0x56196f('0x42')]['General']['RelativePXPY']){if(_0x56196f('0xdc')==='mBlAW'){function _0x2fcc7f(){const _0x3a8fef=_0x56196f;if(this[_0x3a8fef('0x229')]===_0xf71649)this['initMessageCore']();if(this[_0x3a8fef('0x229')][_0x3a8fef('0x57')]===_0x59c73f)this[_0x3a8fef('0xde')]();this['_MessageCoreSettings'][_0x3a8fef('0x57')]=_0x5cc58f||0x1;}}else _0x4cd57d['y']+=_0x4cd57d['startY'];}},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x218')]=function(_0x42efd4){const _0x5a4836=_0x1d5f2b;this[_0x5a4836('0x14f')][_0x5a4836('0x1e4')]=!!_0x42efd4;},Window_Base[_0x1d5f2b('0x6e')]['processFontChangeItalic']=function(_0x16b158){const _0x396b9c=_0x1d5f2b;this[_0x396b9c('0x14f')][_0x396b9c('0x3d')]=!!_0x16b158;},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x15e')]=function(_0x350b70){const _0x67e9b3=_0x1d5f2b,_0x304222=this['obtainEscapeParam'](_0x350b70);if(!_0x350b70[_0x67e9b3('0x207')])return;switch(_0x304222){case 0x0:this[_0x67e9b3('0x110')](_0x67e9b3('0xd0'));return;case 0x1:this[_0x67e9b3('0x110')]('left');break;case 0x2:this[_0x67e9b3('0x110')](_0x67e9b3('0x9e'));break;case 0x3:this['setTextAlignment'](_0x67e9b3('0x1c8'));break;}this[_0x67e9b3('0x276')](_0x350b70);},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x276')]=function(_0x5303b1){const _0x59ca7d=_0x1d5f2b;if(!_0x5303b1[_0x59ca7d('0x207')])return;if(_0x5303b1['rtl'])return;if(this['getTextAlignment']()===_0x59ca7d('0xd0'))return;let _0x4de83f=_0x5303b1[_0x59ca7d('0x188')][_0x59ca7d('0x1b5')]('\x1bTEXTALIGNMENT',_0x5303b1[_0x59ca7d('0x1bf')]+0x1),_0x47d175=_0x5303b1['text']['indexOf']('\x0a',_0x5303b1['index']+0x1);if(_0x4de83f<0x0)_0x4de83f=_0x5303b1[_0x59ca7d('0x188')][_0x59ca7d('0x106')]+0x1;if(_0x47d175>0x0)_0x4de83f=Math[_0x59ca7d('0x131')](_0x4de83f,_0x47d175);const _0x53f8c3=_0x5303b1[_0x59ca7d('0x188')][_0x59ca7d('0x189')](_0x5303b1[_0x59ca7d('0x1bf')],_0x4de83f),_0x5e2cb1=this[_0x59ca7d('0x23f')](_0x53f8c3)[_0x59ca7d('0x11b')],_0x237179=_0x5303b1['width']||this[_0x59ca7d('0x1da')],_0x5597b8=this[_0x59ca7d('0xec')]===Window_Message&&$gameMessage[_0x59ca7d('0x20e')]()!=='';switch(this['getTextAlignment']()){case _0x59ca7d('0x258'):_0x5303b1['x']=_0x5303b1['startX'];break;case _0x59ca7d('0x9e'):_0x5303b1['x']=_0x5303b1[_0x59ca7d('0x225')],_0x5303b1['x']+=Math[_0x59ca7d('0x5f')]((_0x237179-_0x5e2cb1)/0x2);if(_0x5597b8){if('TSuXm'===_0x59ca7d('0x16a')){function _0x2c71f5(){const _0x5774eb=_0x59ca7d;_0x50c89a[_0x5774eb('0x65')][_0x5774eb('0xb5')][_0x5774eb('0x128')](this),this[_0x5774eb('0x8c')](),this['updateOffsetPosition'](),this[_0x5774eb('0xcf')](),this['updateOverlappingY']();}}else _0x5303b1['x']-=_0x5303b1[_0x59ca7d('0x225')]/0x2;}break;case'right':_0x5303b1['x']=_0x237179-_0x5e2cb1+_0x5303b1[_0x59ca7d('0x225')];if(_0x5597b8){if('mdGku'!=='xhvwA')_0x5303b1['x']-=_0x5303b1[_0x59ca7d('0x225')];else{function _0x2d6236(){const _0x91bbf3=_0x59ca7d;return _0x674a5e['prototype']['preConvertEscapeCharacters'][_0x91bbf3('0x128')](this,_0x1758dd);}}}break;}},Window_Base['prototype']['textSizeExTextAlignment']=function(_0x338588){const _0x33f0d8=_0x1d5f2b;_0x338588=_0x338588[_0x33f0d8('0x71')](/\x1b!/g,''),_0x338588=_0x338588[_0x33f0d8('0x71')](/\x1b\|/g,''),_0x338588=_0x338588['replace'](/\x1b\./g,'');const _0x569066=this[_0x33f0d8('0x1b9')](_0x338588,0x0,0x0,0x0),_0x45c571=this['getPreservedFontSettings']();return _0x569066[_0x33f0d8('0x207')]=![],this[_0x33f0d8('0x235')](_0x569066),this[_0x33f0d8('0x6d')](_0x45c571),{'width':_0x569066[_0x33f0d8('0x261')],'height':_0x569066[_0x33f0d8('0x213')]};},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x199')]=function(_0xaee177){const _0x25d5bf=_0x1d5f2b,_0x90fee8=(_0xaee177[_0x25d5bf('0x182')]?-0x1:0x1)*this[_0x25d5bf('0x1af')]('\x20');_0xaee177['x']+=_0x90fee8;if(this[_0x25d5bf('0x1e1')](_0xaee177)>0x0)_0xaee177['x']+=_0x90fee8;if(_0xaee177[_0x25d5bf('0x182')])return;let _0x9da149=_0xaee177[_0x25d5bf('0x188')][_0x25d5bf('0x1b5')](_0x25d5bf('0x15'),_0xaee177['index']+0x1),_0x29e38b=_0xaee177[_0x25d5bf('0x188')][_0x25d5bf('0x1b5')]('\x0a',_0xaee177[_0x25d5bf('0x1bf')]+0x1);if(_0x9da149<0x0)_0x9da149=_0xaee177[_0x25d5bf('0x188')][_0x25d5bf('0x106')]+0x1;if(_0x29e38b>0x0)_0x9da149=Math['min'](_0x9da149,_0x29e38b);const _0x48994d=_0xaee177[_0x25d5bf('0x188')][_0x25d5bf('0x189')](_0xaee177['index'],_0x9da149),_0x3f7fc1=this[_0x25d5bf('0x20f')](_0x48994d)[_0x25d5bf('0x11b')];let _0xef36ad=_0xaee177[_0x25d5bf('0x11b')]||this[_0x25d5bf('0x1da')];if(this['constructor']===Window_Message){const _0x56c22c=$gameMessage[_0x25d5bf('0x20e')]()===''?0x0:ImageManager[_0x25d5bf('0x162')]+0x14;_0xef36ad-=_0x56c22c;if(VisuMZ['MessageCore'][_0x25d5bf('0x42')][_0x25d5bf('0x13b')]['TightWrap']){if(_0x25d5bf('0x111')!==_0x25d5bf('0x111')){function _0x498c6f(){const _0x136c24=_0x25d5bf;_0x431256['x']-=_0x41dd26[_0x136c24('0x225')]/0x2;}}else _0xef36ad-=_0x56c22c;}}let _0x48b855=![];if(_0xaee177['x']+_0x3f7fc1>_0xaee177['startX']+_0xef36ad)_0x48b855=!![];if(_0x3f7fc1===0x0)_0x48b855=!![];if(_0x48b855){if(_0x25d5bf('0x7d')===_0x25d5bf('0x7d'))_0xaee177['text']=_0xaee177[_0x25d5bf('0x188')]['slice'](0x0,_0xaee177[_0x25d5bf('0x1bf')])+'\x0a'+_0xaee177[_0x25d5bf('0x188')][_0x25d5bf('0x6f')](_0xaee177[_0x25d5bf('0x1bf')]);else{function _0x314893(){const _0x3797d8=_0x25d5bf;_0x355818[_0x3797d8('0x65')]['Game_Party_gainItem'][_0x3797d8('0x128')](this,_0x556095,_0x2ab1c1,_0xef940f),_0x44f713>0x0&&this[_0x3797d8('0xc6')](_0x56c69e,_0x59f53b);}}}},Window_Base[_0x1d5f2b('0x6e')]['textSizeExWordWrap']=function(_0x37f527){const _0x41fd21=_0x1d5f2b,_0x2bad28=this[_0x41fd21('0x1b9')](_0x37f527,0x0,0x0,0x0),_0x4a7a44=this[_0x41fd21('0x7e')]();return _0x2bad28[_0x41fd21('0x207')]=![],this['setWordWrap'](![]),this[_0x41fd21('0x235')](_0x2bad28),this[_0x41fd21('0x4c')](!![]),this[_0x41fd21('0x6d')](_0x4a7a44),{'width':_0x2bad28['outputWidth'],'height':_0x2bad28[_0x41fd21('0x213')]};},Window_Base[_0x1d5f2b('0x6e')]['processCommonEvent']=function(_0x3c664e){const _0xa7f964=_0x1d5f2b;return this[_0xa7f964('0x1e1')](_0x3c664e);},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x192')]=function(_0x569c7c){const _0x1dee61=_0x1d5f2b,_0x43a8f5=this[_0x1dee61('0xac')](_0x569c7c)[_0x1dee61('0x242')](',');if(!_0x569c7c['drawing'])return;const _0x31ff7e=_0x43a8f5[0x0][_0x1dee61('0x1aa')](),_0x59ffb7=_0x43a8f5[0x1]||0x0,_0x15f564=_0x43a8f5[0x2]||0x0,_0x43125d=ImageManager['loadPicture'](_0x31ff7e),_0x5eaa9f=this[_0x1dee61('0x14f')][_0x1dee61('0x118')];_0x43125d[_0x1dee61('0x108')](this[_0x1dee61('0xcc')][_0x1dee61('0x160')](this,_0x43125d,_0x569c7c['x'],_0x569c7c['y'],_0x59ffb7,_0x15f564,_0x5eaa9f));},Window_Base['prototype']['drawBackPicture']=function(_0xe5cd5d,_0x16cae3,_0x588905,_0x2c7d72,_0x1be0c0,_0x5830b1){const _0x4e398e=_0x1d5f2b;_0x2c7d72=_0x2c7d72||_0xe5cd5d[_0x4e398e('0x11b')],_0x1be0c0=_0x1be0c0||_0xe5cd5d['height'],this[_0x4e398e('0xd9')][_0x4e398e('0x118')]=_0x5830b1,this[_0x4e398e('0xd9')]['blt'](_0xe5cd5d,0x0,0x0,_0xe5cd5d[_0x4e398e('0x11b')],_0xe5cd5d[_0x4e398e('0x1f1')],_0x16cae3,_0x588905,_0x2c7d72,_0x1be0c0),this[_0x4e398e('0xd9')][_0x4e398e('0x118')]=0xff;},Window_Base[_0x1d5f2b('0x6e')]['processDrawCenteredPicture']=function(_0x32f5ae){const _0x25229f=_0x1d5f2b,_0x11a3cd=this[_0x25229f('0xac')](_0x32f5ae)[_0x25229f('0x242')](',');if(!_0x32f5ae[_0x25229f('0x207')])return;const _0x317de0=_0x11a3cd[0x0][_0x25229f('0x1aa')](),_0x3482f2=ImageManager[_0x25229f('0xd7')](_0x317de0),_0x13079d=JsonEx['makeDeepCopy'](_0x32f5ae),_0x1e443f=this[_0x25229f('0x14f')][_0x25229f('0x118')];_0x3482f2['addLoadListener'](this[_0x25229f('0x28')][_0x25229f('0x160')](this,_0x3482f2,_0x13079d,_0x1e443f));},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x28')]=function(_0x59a4db,_0x1801cb,_0x2b98c1){const _0x37ab77=_0x1d5f2b,_0x11643a=_0x1801cb[_0x37ab77('0x11b')]||this['innerWidth'],_0x4adcef=this[_0x37ab77('0xc5')]!==undefined?this[_0x37ab77('0x156')]():this[_0x37ab77('0x1c9')],_0x2b3daa=_0x11643a/_0x59a4db[_0x37ab77('0x11b')],_0x20bc3b=_0x4adcef/_0x59a4db[_0x37ab77('0x1f1')],_0x3f9b5f=Math[_0x37ab77('0x131')](_0x2b3daa,_0x20bc3b,0x1),_0xd090e1=this[_0x37ab77('0xc5')]!==undefined?(this['itemRectWithPadding'](0x0)[_0x37ab77('0x1f1')]-this['lineHeight']())/0x2:0x0,_0x5460ee=_0x59a4db[_0x37ab77('0x11b')]*_0x3f9b5f,_0x52c507=_0x59a4db[_0x37ab77('0x1f1')]*_0x3f9b5f,_0x29f678=Math['floor']((_0x11643a-_0x5460ee)/0x2)+_0x1801cb[_0x37ab77('0x225')],_0x134777=Math[_0x37ab77('0x5f')]((_0x4adcef-_0x52c507)/0x2)+_0x1801cb[_0x37ab77('0xfd')]-_0xd090e1*0x2;this['contentsBack'][_0x37ab77('0x118')]=_0x2b98c1,this['contentsBack'][_0x37ab77('0x5a')](_0x59a4db,0x0,0x0,_0x59a4db[_0x37ab77('0x11b')],_0x59a4db[_0x37ab77('0x1f1')],_0x29f678,_0x134777,_0x5460ee,_0x52c507),this[_0x37ab77('0xd9')][_0x37ab77('0x118')]=0xff;},Window_Base[_0x1d5f2b('0x6e')]['processColorLock']=function(_0x46aaf8){const _0xf03177=_0x1d5f2b,_0x41771e=this[_0xf03177('0x1e1')](_0x46aaf8);if(_0x46aaf8[_0xf03177('0x207')])this[_0xf03177('0x137')](_0x41771e>0x0);},Window_Base[_0x1d5f2b('0x6e')][_0x1d5f2b('0x1b1')]=function(_0xb194ab){const _0x1b3aa3=_0x1d5f2b,_0x2b9ae1=this[_0x1b3aa3('0x1e1')](_0xb194ab);this['constructor']===Window_Message&&_0xb194ab['drawing']&&this['startWait'](_0x2b9ae1);},Window_Help[_0x1d5f2b('0x6e')][_0x1d5f2b('0x22a')]=function(){const _0x3d97ea=_0x1d5f2b;this['setWordWrap']($gameSystem[_0x3d97ea('0x262')]());},Window_Help['prototype']['isAutoColorAffected']=function(){return!![];},VisuMZ['MessageCore'][_0x1d5f2b('0x3b')]=Window_Help['prototype'][_0x1d5f2b('0xab')],Window_Help[_0x1d5f2b('0x6e')]['refresh']=function(){const _0x1dada4=_0x1d5f2b;this[_0x1dada4('0x103')](),VisuMZ[_0x1dada4('0x65')][_0x1dada4('0x3b')]['call'](this),this[_0x1dada4('0x22a')]();},VisuMZ[_0x1d5f2b('0x65')]['Window_Options_addGeneralOptions']=Window_Options[_0x1d5f2b('0x6e')][_0x1d5f2b('0x21d')],Window_Options['prototype'][_0x1d5f2b('0x21d')]=function(){const _0xf443a6=_0x1d5f2b;VisuMZ['MessageCore'][_0xf443a6('0x1d4')][_0xf443a6('0x128')](this),this[_0xf443a6('0x180')]();},Window_Options[_0x1d5f2b('0x6e')]['addMessageCoreCommands']=function(){const _0x4051c8=_0x1d5f2b;if(VisuMZ[_0x4051c8('0x65')][_0x4051c8('0x42')][_0x4051c8('0x233')]['AddOption']){if('CscNO'!==_0x4051c8('0x21f')){function _0x4f1676(){const _0x56f5c5=_0x4051c8,_0x304d47=_0x5d9d82['MessageCore'][_0x56f5c5('0x42')][_0x56f5c5('0x120')]['NameBoxWindowDefaultColor'];return _0x28c851[_0x56f5c5('0xf0')](_0x304d47);}}else this[_0x4051c8('0xa')]();}},Window_Options['prototype'][_0x1d5f2b('0xa')]=function(){const _0x1f3fe0=_0x1d5f2b,_0xf38039=TextManager[_0x1f3fe0('0x193')],_0x2b3877=_0x1f3fe0('0xfc');this['addCommand'](_0xf38039,_0x2b3877);},VisuMZ[_0x1d5f2b('0x65')][_0x1d5f2b('0xa2')]=Window_Options[_0x1d5f2b('0x6e')][_0x1d5f2b('0xd4')],Window_Options[_0x1d5f2b('0x6e')]['statusText']=function(_0x422c61){const _0x13065f=_0x1d5f2b,_0x1c71da=this['commandSymbol'](_0x422c61);if(_0x1c71da===_0x13065f('0xfc'))return this[_0x13065f('0x1fd')]();return VisuMZ[_0x13065f('0x65')]['Window_Options_statusText'][_0x13065f('0x128')](this,_0x422c61);},VisuMZ[_0x1d5f2b('0x65')][_0x1d5f2b('0xae')]=Window_Options[_0x1d5f2b('0x6e')][_0x1d5f2b('0x1fc')],Window_Options[_0x1d5f2b('0x6e')][_0x1d5f2b('0x1fc')]=function(_0x43c449){const _0x5351f2=_0x1d5f2b;if(_0x43c449==='textSpeed')return!![];return VisuMZ[_0x5351f2('0x65')][_0x5351f2('0xae')]['call'](this,_0x43c449);},Window_Options[_0x1d5f2b('0x6e')][_0x1d5f2b('0x1fd')]=function(){const _0x538f96=_0x1d5f2b,_0x495914=this[_0x538f96('0x64')]('textSpeed');if(_0x495914>0xa){if('jVHed'==='jVHed')return TextManager[_0x538f96('0x39')];else{function _0x5ebbce(){const _0xa9ba22=_0x538f96;_0xe86f66[_0xa9ba22('0x75')](this[_0xa9ba22('0x254')]()),this[_0xa9ba22('0x26b')][_0xa9ba22('0xff')](),this[_0xa9ba22('0x6c')]();}}}else return _0x495914;},VisuMZ['MessageCore'][_0x1d5f2b('0x203')]=Window_Options[_0x1d5f2b('0x6e')]['changeVolume'],Window_Options[_0x1d5f2b('0x6e')][_0x1d5f2b('0x248')]=function(_0x3d1038,_0x227b80,_0x291969){const _0x5141ed=_0x1d5f2b;if(_0x3d1038===_0x5141ed('0xfc'))return this[_0x5141ed('0x9f')](_0x3d1038,_0x227b80,_0x291969);VisuMZ[_0x5141ed('0x65')][_0x5141ed('0x203')]['call'](this,_0x3d1038,_0x227b80,_0x291969);},Window_Options[_0x1d5f2b('0x6e')][_0x1d5f2b('0x9f')]=function(_0x27676c,_0x251c5c,_0x3031c3){const _0x4e2e51=_0x1d5f2b,_0x21b81b=this[_0x4e2e51('0x64')](_0x27676c),_0xa55335=0x1,_0x6ed43c=_0x21b81b+(_0x251c5c?_0xa55335:-_0xa55335);if(_0x6ed43c>0xb&&_0x3031c3)this[_0x4e2e51('0x271')](_0x27676c,0x1);else{if(_0x4e2e51('0x152')!=='GrTQs'){function _0x1be1ef(){const _0x3e02f0=_0x4e2e51;return this[_0x3e02f0('0x1cc')]&&this['_scene'][_0x3e02f0('0xec')]===_0x4693c3;}}else this[_0x4e2e51('0x271')](_0x27676c,_0x6ed43c[_0x4e2e51('0xc4')](0x1,0xb));}},Window_Message['prototype'][_0x1d5f2b('0x249')]=function(){const _0x2cfb10=_0x1d5f2b;Window_Base['prototype']['refreshDimmerBitmap'][_0x2cfb10('0x128')](this),VisuMZ[_0x2cfb10('0x65')][_0x2cfb10('0x42')][_0x2cfb10('0x120')][_0x2cfb10('0x54')]&&this[_0x2cfb10('0xdf')]();},Window_Message[_0x1d5f2b('0x6e')][_0x1d5f2b('0xdf')]=function(){const _0x226820=_0x1d5f2b;this[_0x226820('0x115')]['x']=Math[_0x226820('0x78')](this[_0x226820('0x11b')]/0x2),this[_0x226820('0x115')][_0x226820('0x14b')]['x']=0.5,this[_0x226820('0x115')]['scale']['x']=Graphics[_0x226820('0x11b')];},VisuMZ[_0x1d5f2b('0x65')][_0x1d5f2b('0x68')]=Window_Message[_0x1d5f2b('0x6e')][_0x1d5f2b('0x147')],Window_Message[_0x1d5f2b('0x6e')]['clearFlags']=function(){const _0x5cb858=_0x1d5f2b;VisuMZ[_0x5cb858('0x65')]['Window_Message_clearFlags'][_0x5cb858('0x128')](this),this[_0x5cb858('0x103')](),this[_0x5cb858('0x22a')](),this[_0x5cb858('0x137')](![]),this[_0x5cb858('0x110')](_0x5cb858('0xd0')),this['setTextDelay'](VisuMZ['MessageCore']['Settings'][_0x5cb858('0x120')][_0x5cb858('0x1e3')]);},Window_Message[_0x1d5f2b('0x6e')][_0x1d5f2b('0x22a')]=function(){const _0x43c430=_0x1d5f2b;this[_0x43c430('0x4c')]($gameSystem[_0x43c430('0x22b')]());},Window_Message['prototype'][_0x1d5f2b('0xf7')]=function(){return!![];},Window_Message[_0x1d5f2b('0x6e')][_0x1d5f2b('0x178')]=function(_0x2b2e2b){const _0x419852=_0x1d5f2b,_0x208ddc=0xb-ConfigManager[_0x419852('0xfc')];_0x2b2e2b=Math[_0x419852('0x78')](_0x2b2e2b*_0x208ddc),this['_textDelayCount']=_0x2b2e2b,this[_0x419852('0x197')]=_0x2b2e2b;},VisuMZ[_0x1d5f2b('0x65')][_0x1d5f2b('0x123')]=Window_Message[_0x1d5f2b('0x6e')]['isTriggered'],Window_Message['prototype'][_0x1d5f2b('0x7f')]=function(){const _0x1076b7=_0x1d5f2b;return VisuMZ[_0x1076b7('0x65')]['Window_Message_isTriggered']['call'](this)||Input['isPressed'](VisuMZ['MessageCore'][_0x1076b7('0x42')][_0x1076b7('0x120')][_0x1076b7('0x38')]);},VisuMZ[_0x1d5f2b('0x65')][_0x1d5f2b('0xfe')]=Window_Message['prototype'][_0x1d5f2b('0x10f')],Window_Message[_0x1d5f2b('0x6e')][_0x1d5f2b('0x10f')]=function(){const _0x18c95a=_0x1d5f2b;let _0x454846=this['y'];VisuMZ[_0x18c95a('0x65')][_0x18c95a('0xfe')][_0x18c95a('0x128')](this);if(this['_autoPositionTarget'])this['y']=_0x454846;this[_0x18c95a('0xcf')]();},VisuMZ[_0x1d5f2b('0x65')][_0x1d5f2b('0x1b')]=Window_Message[_0x1d5f2b('0x6e')][_0x1d5f2b('0x9')],Window_Message[_0x1d5f2b('0x6e')]['newPage']=function(_0x4afc2a){const _0x4292db=_0x1d5f2b;this[_0x4292db('0x9d')](_0x4afc2a),VisuMZ[_0x4292db('0x65')][_0x4292db('0x1b')][_0x4292db('0x128')](this,_0x4afc2a),this[_0x4292db('0x18b')]();},Window_Message[_0x1d5f2b('0x6e')][_0x1d5f2b('0x9d')]=function(_0x1fffbd){const _0xf96a8=_0x1d5f2b;this[_0xf96a8('0xbc')](_0x1fffbd),this[_0xf96a8('0xa9')]();},VisuMZ['MessageCore'][_0x1d5f2b('0x11')]=Window_Message[_0x1d5f2b('0x6e')][_0x1d5f2b('0xff')],Window_Message['prototype'][_0x1d5f2b('0xff')]=function(){const _0x3ebcb1=_0x1d5f2b;VisuMZ[_0x3ebcb1('0x65')]['Window_Message_terminateMessage'][_0x3ebcb1('0x128')](this),this[_0x3ebcb1('0x147')]();if(this[_0x3ebcb1('0x15c')])this[_0x3ebcb1('0x40')]();},Window_Message[_0x1d5f2b('0x6e')][_0x1d5f2b('0xa9')]=function(){const _0x50c36b=_0x1d5f2b;this[_0x50c36b('0x11b')]=$gameSystem['getMessageWindowWidth'](),this[_0x50c36b('0x11b')]=Math[_0x50c36b('0x131')](Graphics[_0x50c36b('0x11b')],this[_0x50c36b('0x11b')]);const _0x4cd81a=$gameSystem[_0x50c36b('0xa3')]();this[_0x50c36b('0x1f1')]=SceneManager[_0x50c36b('0x1cc')]['calcWindowHeight'](_0x4cd81a,![]),this[_0x50c36b('0x1f1')]=Math['min'](Graphics[_0x50c36b('0x1f1')],this[_0x50c36b('0x1f1')]);if($gameTemp[_0x50c36b('0x1e9')])this[_0x50c36b('0x116')]();},Window_Message['prototype'][_0x1d5f2b('0x116')]=function(){const _0x154446=_0x1d5f2b;this['x']=(Graphics[_0x154446('0x23e')]-this[_0x154446('0x11b')])/0x2,$gameTemp[_0x154446('0x1e9')]=undefined,this['clampPlacementPosition']();},Window_Message['prototype'][_0x1d5f2b('0x7')]=function(){const _0x2c4331=_0x1d5f2b,_0x237bf4={'x':this['x'],'y':this['y']};Window_Base[_0x2c4331('0x6e')]['updateMove']['call'](this),this['updateNameBoxMove'](_0x237bf4);},Window_Message[_0x1d5f2b('0x6e')][_0x1d5f2b('0x4a')]=function(){return!![];},Window_Message['prototype']['updateNameBoxMove']=function(_0x1650f2){const _0x55b11c=_0x1d5f2b;if(this[_0x55b11c('0x174')]){if(_0x55b11c('0x91')===_0x55b11c('0x27')){function _0x2a161b(){const _0x151550=_0x55b11c,_0x1a4cba=_0x50ae01[_0x151550('0x73')]('['+_0x1c871b['$1'][_0x151550('0x165')](/\d+/g)+']');for(const _0x2b94e9 of _0x1a4cba){if(!_0x53ecbe[_0x151550('0x25')](_0x2b94e9))return![];}return!![];}}else this[_0x55b11c('0x174')]['x']+=this['x']-_0x1650f2['x'],this[_0x55b11c('0x174')]['y']+=this['y']-_0x1650f2['y'];}},Window_Message['prototype'][_0x1d5f2b('0x146')]=function(_0x1a2f78,_0xcb4f02){const _0x392b8b=_0x1d5f2b;this[_0x392b8b('0x76')](this[_0x392b8b('0xa5')]['x'],this[_0x392b8b('0x109')]*(Graphics[_0x392b8b('0xe9')]-this[_0x392b8b('0x1f1')])/0x2,this[_0x392b8b('0xa5')][_0x392b8b('0x11b')],this[_0x392b8b('0xa5')]['height'],_0x1a2f78,_0xcb4f02);},Window_Message[_0x1d5f2b('0x6e')][_0x1d5f2b('0x3a')]=function(_0x451149){const _0x269cf5=_0x1d5f2b,_0x59285e=Window_Base[_0x269cf5('0x6e')][_0x269cf5('0x3a')][_0x269cf5('0x128')](this,_0x451149);this[_0x269cf5('0xcd')](_0x59285e);},Window_Message[_0x1d5f2b('0x6e')][_0x1d5f2b('0xcd')]=function(_0x3cd174){const _0xb42117=_0x1d5f2b;if($gameParty['inBattle']()){}else{if(_0xb42117('0x260')===_0xb42117('0x25c')){function _0x456d10(){const _0x5d0b40=_0xb42117;if(!_0x4e0617||!_0x3b43f2)return-0x1;return _0x1fb285[_0x5d0b40('0xe6')][_0x5d0b40('0x106')]-_0x3cc77f[_0x5d0b40('0xe6')][_0x5d0b40('0x106')];}}else $gameMap[_0xb42117('0x105')](_0x3cd174);}},Window_Message[_0x1d5f2b('0x6e')]['processCharacter']=function(_0x2da44f){const _0x4d0234=_0x1d5f2b;this[_0x4d0234('0x133')]--,this['_textDelayCount']<=0x0&&(this[_0x4d0234('0x1f6')](_0x2da44f),Window_Base['prototype'][_0x4d0234('0x151')][_0x4d0234('0x128')](this,_0x2da44f));},Window_Message['prototype'][_0x1d5f2b('0x1f6')]=function(_0x2d7b01){const _0x2fce99=_0x1d5f2b;this[_0x2fce99('0x133')]=this['_textDelay'];if(this[_0x2fce99('0x197')]<=0x0)this[_0x2fce99('0xca')]=!![];},VisuMZ[_0x1d5f2b('0x65')][_0x1d5f2b('0x21e')]=Window_Message[_0x1d5f2b('0x6e')][_0x1d5f2b('0x16c')],Window_Message[_0x1d5f2b('0x6e')][_0x1d5f2b('0x16c')]=function(_0x264877,_0x53504b){const _0x107cd4=_0x1d5f2b;if(!_0x53504b[_0x107cd4('0x207')]){if(_0x107cd4('0x273')!==_0x107cd4('0x186'))Window_Base['prototype'][_0x107cd4('0x16c')][_0x107cd4('0x128')](this,_0x264877,_0x53504b);else{function _0x324e8a(){const _0x2aabbf=_0x107cd4,_0x5dd0bb=0xb-_0x2e212b['textSpeed'];_0x13213a=_0x29db83['round'](_0x334267*_0x5dd0bb),this['_textDelayCount']=_0x3ed7c0,this[_0x2aabbf('0x197')]=_0x24155a;}}}else{if(_0x107cd4('0x171')===_0x107cd4('0x171'))VisuMZ[_0x107cd4('0x65')]['Window_Message_processEscapeCharacter']['call'](this,_0x264877,_0x53504b);else{function _0x8c92fa(){const _0xcea995=_0x107cd4;_0x4e9d8e['add'](this[_0xcea995('0x150')]()[_0xcea995('0x16f')][0x0]);}}}},Window_Message['prototype'][_0x1d5f2b('0xbc')]=function(_0x40b211){const _0xbfe42=_0x1d5f2b;let _0x49ff47=_0x40b211[_0xbfe42('0x188')];_0x49ff47=_0x49ff47[_0xbfe42('0x71')](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x538acd=_0xbfe42;return this[_0x538acd('0xef')](_0x49ff47,!![],!![]),this[_0x538acd('0x210')]('none'),'';}),_0x49ff47=_0x49ff47[_0xbfe42('0x71')](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x491739=_0xbfe42;return this['processAutoSize'](_0x49ff47,!![],![]),this[_0x491739('0x210')](_0x491739('0x1fa')),'';}),_0x49ff47=_0x49ff47[_0xbfe42('0x71')](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x2ab129=_0xbfe42;return this[_0x2ab129('0xef')](_0x49ff47,![],!![]),this[_0x2ab129('0x210')](_0x2ab129('0x1fa')),'';});if(SceneManager[_0xbfe42('0x1ce')]())_0x49ff47=_0x49ff47[_0xbfe42('0x71')](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x37d72c,_0x106113)=>{const _0x8e2459=_0xbfe42;return this[_0x8e2459('0xef')](_0x49ff47,!![],!![]),this[_0x8e2459('0x210')]('battle\x20actor',Number(_0x106113)||0x1),'';}),_0x49ff47=_0x49ff47[_0xbfe42('0x71')](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x32f7fc,_0x5e92fc)=>{const _0x47d055=_0xbfe42;if(_0x47d055('0x251')===_0x47d055('0x251'))return this[_0x47d055('0xef')](_0x49ff47,!![],!![]),this['processAutoPosition'](_0x47d055('0xa4'),Number(_0x5e92fc)||0x0),'';else{function _0x436050(){const _0x886f02=_0x47d055;return this[_0x886f02('0xef')](_0x1b576c,!![],![]),this[_0x886f02('0x210')](_0x886f02('0x1fa')),'';}}}),_0x49ff47=_0x49ff47[_0xbfe42('0x71')](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x348074,_0x538855)=>{const _0x11bf38=_0xbfe42;return this[_0x11bf38('0xef')](_0x49ff47,!![],!![]),this['processAutoPosition']('battle\x20enemy',Number(_0x538855)||0x0),'';});else{if(SceneManager['isSceneMap']()){if(_0xbfe42('0x209')!==_0xbfe42('0x209')){function _0x3ccd22(){const _0x19f8f2=_0xbfe42;this[_0x19f8f2('0x8')]&&(this['_interpreter'][_0x19f8f2('0x11a')]()?this[_0x19f8f2('0x8')][_0x19f8f2('0xea')]():this[_0x19f8f2('0xe')]());}}else _0x49ff47=_0x49ff47[_0xbfe42('0x71')](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x4ab400,_0xcb6414)=>{const _0x19aa90=_0xbfe42;return this[_0x19aa90('0xef')](_0x49ff47,!![],!![]),this[_0x19aa90('0x210')]('map\x20player',0x0),'';}),_0x49ff47=_0x49ff47[_0xbfe42('0x71')](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x51f1a6,_0x15676d)=>{const _0x1d9398=_0xbfe42;if(_0x1d9398('0x70')===_0x1d9398('0x1b3')){function _0x5a004f(){const _0x16c637=_0x1d9398;this[_0x16c637('0x221')](),this['makeCommandList'](),this[_0x16c637('0x26b')]&&(this[_0x16c637('0x10f')](),this['placeCancelButton']()),this[_0x16c637('0x18b')](),_0x1a7a15[_0x16c637('0x6e')][_0x16c637('0xab')]['call'](this);}}else return this['processAutoSize'](_0x49ff47,!![],!![]),this[_0x1d9398('0x210')]('map\x20actor',Number(_0x15676d)||0x1),'';}),_0x49ff47=_0x49ff47['replace'](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x44a976,_0x5b29ea)=>{const _0x4f9415=_0xbfe42;if(_0x4f9415('0xb3')!==_0x4f9415('0xb3')){function _0x426581(){_0x5f2e1c=_0x1f7807;}}else return this['processAutoSize'](_0x49ff47,!![],!![]),this[_0x4f9415('0x210')](_0x4f9415('0x169'),Number(_0x5b29ea)||0x0),'';}),_0x49ff47=_0x49ff47['replace'](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x4f94a0,_0x21d972)=>{const _0x3d86a6=_0xbfe42;if('jrQAl'!=='jrQAl'){function _0x9fa11f(){const _0x166dd6=_0x1033;this[_0x166dd6('0x122')]=this['x']+_0x4e3889,this[_0x166dd6('0x1d6')]=this['y']+_0x4ace14,this['_moveTargetWidth']=this[_0x166dd6('0x11b')]+(_0x39f5a3||0x0),this[_0x166dd6('0x1bb')]=this[_0x166dd6('0x1f1')]+(_0x23c77||0x0),this['_moveDuration']=_0x195e9b||0x1;if(this[_0x166dd6('0x1e6')]<=0x0)this[_0x166dd6('0x1e6')]=0x1;this[_0x166dd6('0x1c2')]=this[_0x166dd6('0x1e6')],this['_moveEasingType']=_0x3bf96b||0x0;}}else return this[_0x3d86a6('0xef')](_0x49ff47,!![],!![]),this[_0x3d86a6('0x210')](_0x3d86a6('0x48'),Number(_0x21d972)||0x0),'';});}}_0x40b211[_0xbfe42('0x188')]=_0x49ff47;},Window_Message['_autoSizeRegexp']=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x1d5f2b('0x238')]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message['prototype'][_0x1d5f2b('0xef')]=function(_0x1b3245,_0x1a3ccd,_0x242cd5){const _0x1d6eb8=_0x1d5f2b;_0x1b3245=_0x1b3245[_0x1d6eb8('0x71')](Window_Message[_0x1d6eb8('0x96')],''),_0x1b3245=_0x1b3245['replace'](Window_Message[_0x1d6eb8('0x238')],''),this['_autoSizeCheck']=!![];const _0x5e0433=this[_0x1d6eb8('0x15b')](_0x1b3245);if(_0x1a3ccd){let _0x37b960=_0x5e0433[_0x1d6eb8('0x11b')]+$gameSystem[_0x1d6eb8('0x223')]()*0x2+0x6;const _0x268add=$gameMessage[_0x1d6eb8('0x20e')]()!=='',_0x2aeb29=ImageManager[_0x1d6eb8('0x162')],_0x5285f2=0x14;_0x37b960+=_0x268add?_0x2aeb29+_0x5285f2:0x4,$gameSystem['setMessageWindowWidth'](_0x37b960);}if(_0x242cd5){let _0x3d3c7a=Math['ceil'](_0x5e0433[_0x1d6eb8('0x1f1')]/this['lineHeight']());$gameSystem['setMessageWindowRows'](_0x3d3c7a);}this[_0x1d6eb8('0x11e')](),this['_autoSizeCheck']=![],this[_0x1d6eb8('0x15c')]=!![];},Window_Message['prototype'][_0x1d5f2b('0x11e')]=function(){const _0x968903=_0x1d5f2b;this[_0x968903('0xa9')](),this[_0x968903('0x10f')](),this[_0x968903('0x116')](),this['updateTransform'](),this[_0x968903('0x14f')][_0x968903('0xe')](),this[_0x968903('0x18b')]();},Window_Message[_0x1d5f2b('0x6e')]['processAutoPosition']=function(_0x14d8f7,_0x377dc6){const _0x54f299=_0x1d5f2b;switch(_0x14d8f7['toLowerCase']()[_0x54f299('0x1aa')]()){case _0x54f299('0x247'):this[_0x54f299('0x21c')]=$gameActors['actor'](_0x377dc6);break;case _0x54f299('0xa4'):this[_0x54f299('0x21c')]=$gameParty[_0x54f299('0x272')]()[_0x377dc6-0x1];break;case _0x54f299('0x46'):this[_0x54f299('0x21c')]=$gameTroop[_0x54f299('0x272')]()[_0x377dc6-0x1];break;case _0x54f299('0x1fb'):this[_0x54f299('0x21c')]=$gamePlayer;break;case _0x54f299('0xd2'):const _0x3a5470=$gameActors[_0x54f299('0x14a')](_0x377dc6)[_0x54f299('0x1bf')]();if(_0x3a5470===0x0)this[_0x54f299('0x21c')]=$gamePlayer;else{if(_0x54f299('0x239')!=='nhvLh'){function _0x17621f(){const _0x5a890f=_0x54f299;for(_0x347373 of _0x5b65e1['MessageCore'][_0x5a890f('0x227')]){_0x1bd0dc=_0x2f870e[_0x5a890f('0x71')](_0x5c4f31[0x0],_0x183bd1[0x1]);}return _0x5a4108;}}else this[_0x54f299('0x21c')]=$gamePlayer['followers']()[_0x3a5470-0x1];}break;case _0x54f299('0x169'):this[_0x54f299('0x21c')]=$gamePlayer[_0x54f299('0x25b')]()[_0x377dc6-0x1];break;case'map\x20event':this[_0x54f299('0x21c')]=$gameMap[_0x54f299('0x82')](_0x377dc6);break;}this[_0x54f299('0x21c')]&&this[_0x54f299('0x1ea')]();},VisuMZ[_0x1d5f2b('0x65')]['Window_Message_synchronizeNameBox']=Window_Message[_0x1d5f2b('0x6e')][_0x1d5f2b('0x16')],Window_Message[_0x1d5f2b('0x6e')]['synchronizeNameBox']=function(){const _0x46b0b4=_0x1d5f2b;this[_0x46b0b4('0x1ea')](),VisuMZ[_0x46b0b4('0x65')][_0x46b0b4('0x187')][_0x46b0b4('0x128')](this);},Window_Message['prototype'][_0x1d5f2b('0x1ea')]=function(){const _0x2e493b=_0x1d5f2b;if(!this[_0x2e493b('0x21c')])return;const _0x2a06c9=SceneManager[_0x2e493b('0x1cc')];if(!_0x2a06c9)return;if(!_0x2a06c9[_0x2e493b('0xb9')])return;const _0x4536ae=_0x2a06c9[_0x2e493b('0xb9')][_0x2e493b('0x1de')](this[_0x2e493b('0x21c')]);if(!_0x4536ae)return;let _0x13128b=_0x4536ae['x'];_0x13128b-=this[_0x2e493b('0x11b')]/0x2,_0x13128b-=(Graphics['width']-Graphics[_0x2e493b('0x23e')])/0x2;let _0x4f3f62=_0x4536ae['y'];_0x4f3f62-=this[_0x2e493b('0x1f1')],_0x4f3f62-=(Graphics[_0x2e493b('0x1f1')]-Graphics[_0x2e493b('0xe9')])/0x2,_0x4536ae[_0x2e493b('0x214')]?_0x4f3f62-=_0x4536ae[_0x2e493b('0x214')]()[_0x2e493b('0x1f1')]+0x18:_0x4f3f62-=_0x4536ae[_0x2e493b('0x1f1')]+0x8,this['x']=Math[_0x2e493b('0x78')](_0x13128b),this['y']=Math[_0x2e493b('0x78')](_0x4f3f62),this[_0x2e493b('0xcf')](!![],![]),this[_0x2e493b('0x174')][_0x2e493b('0x10f')]();},Window_Message[_0x1d5f2b('0x6e')][_0x1d5f2b('0x40')]=function(){const _0x7ca311=_0x1d5f2b;this[_0x7ca311('0x15c')]=![],this[_0x7ca311('0x21c')]=undefined,$gameSystem[_0x7ca311('0xde')](),this['updateAutoSizePosition'](),this['openness']=0x0;},Window_Message[_0x1d5f2b('0x6e')][_0x1d5f2b('0x23')]=function(_0x1e1b63){const _0x3f2f92=_0x1d5f2b;return Window_Base['prototype'][_0x3f2f92('0x23')][_0x3f2f92('0x128')](this,_0x1e1b63);},Window_Message['prototype'][_0x1d5f2b('0x12e')]=function(_0x195c6e){const _0x36b092=_0x1d5f2b;return Window_Base[_0x36b092('0x6e')]['postConvertEscapeCharacters']['call'](this,_0x195c6e);},Window_Message[_0x1d5f2b('0x6e')][_0x1d5f2b('0x10c')]=function(_0x275811){const _0x25d301=_0x1d5f2b;this[_0x25d301('0xaa')](_0x275811),Window_Base[_0x25d301('0x6e')][_0x25d301('0x10c')][_0x25d301('0x128')](this,_0x275811),this['postFlushTextState'](_0x275811);},Window_Message[_0x1d5f2b('0x6e')][_0x1d5f2b('0xaa')]=function(_0x48de35){},Window_Message[_0x1d5f2b('0x6e')]['postFlushTextState']=function(_0x4bf800){},Window_NameBox[_0x1d5f2b('0x6e')][_0x1d5f2b('0xf7')]=function(){return![];},Window_NameBox[_0x1d5f2b('0x6e')][_0x1d5f2b('0x1c7')]=function(){const _0x33b90a=_0x1d5f2b;Window_Base['prototype']['resetTextColor'][_0x33b90a('0x128')](this),this[_0x33b90a('0x1df')](this['defaultColor']());},Window_NameBox[_0x1d5f2b('0x6e')]['defaultColor']=function(){const _0x514e10=_0x1d5f2b,_0x1208b7=VisuMZ['MessageCore'][_0x514e10('0x42')][_0x514e10('0x120')][_0x514e10('0x2e')];return ColorManager[_0x514e10('0xf0')](_0x1208b7);},VisuMZ[_0x1d5f2b('0x65')]['Window_NameBox_updatePlacement']=Window_NameBox['prototype'][_0x1d5f2b('0x10f')],Window_NameBox['prototype'][_0x1d5f2b('0x10f')]=function(){const _0x356c6c=_0x1d5f2b;VisuMZ[_0x356c6c('0x65')][_0x356c6c('0xb5')][_0x356c6c('0x128')](this),this[_0x356c6c('0x8c')](),this[_0x356c6c('0xdb')](),this[_0x356c6c('0xcf')](),this['updateOverlappingY']();},Window_NameBox[_0x1d5f2b('0x6e')]['preConvertEscapeCharacters']=function(_0x23374e){const _0x2eb0c9=_0x1d5f2b;return _0x23374e=_0x23374e[_0x2eb0c9('0x71')](/<LEFT>/gi,this['setRelativePosition'][_0x2eb0c9('0x160')](this,0x0)),_0x23374e=_0x23374e[_0x2eb0c9('0x71')](/<CENTER>/gi,this[_0x2eb0c9('0x1f9')][_0x2eb0c9('0x160')](this,0x5)),_0x23374e=_0x23374e[_0x2eb0c9('0x71')](/<RIGHT>/gi,this[_0x2eb0c9('0x1f9')][_0x2eb0c9('0x160')](this,0xa)),_0x23374e=_0x23374e['replace'](/<POSITION:[ ](\d+)>/gi,(_0x4c265c,_0x19fa53)=>this[_0x2eb0c9('0x1f9')](parseInt(_0x19fa53))),_0x23374e=_0x23374e['replace'](/<\/LEFT>/gi,''),_0x23374e=_0x23374e['replace'](/<\/CENTER>/gi,''),_0x23374e=_0x23374e[_0x2eb0c9('0x71')](/<\/RIGHT>/gi,''),Window_Base['prototype']['preConvertEscapeCharacters'][_0x2eb0c9('0x128')](this,_0x23374e);},Window_NameBox[_0x1d5f2b('0x6e')][_0x1d5f2b('0x1f9')]=function(_0x31f768){const _0x158cda=_0x1d5f2b;return this[_0x158cda('0x29')]=_0x31f768,'';},Window_NameBox[_0x1d5f2b('0x6e')][_0x1d5f2b('0x8c')]=function(){const _0x36fbd1=_0x1d5f2b;if($gameMessage[_0x36fbd1('0x204')]())return;this[_0x36fbd1('0x29')]=this[_0x36fbd1('0x29')]||0x0;const _0x3740e1=this[_0x36fbd1('0x26b')],_0x128263=Math[_0x36fbd1('0x5f')](_0x3740e1[_0x36fbd1('0x11b')]*this['_relativePosition']/0xa);this['x']=_0x3740e1['x']+_0x128263-Math[_0x36fbd1('0x5f')](this[_0x36fbd1('0x11b')]/0x2),this['x']=this['x']['clamp'](_0x3740e1['x'],_0x3740e1['x']+_0x3740e1['width']-this[_0x36fbd1('0x11b')]);},Window_NameBox[_0x1d5f2b('0x6e')][_0x1d5f2b('0xdb')]=function(){const _0x5b3fbd=_0x1d5f2b;if($gameMessage[_0x5b3fbd('0x204')]())return;this[_0x5b3fbd('0x29')]=this[_0x5b3fbd('0x29')]||0x0;const _0x235a89=VisuMZ[_0x5b3fbd('0x65')]['Settings'][_0x5b3fbd('0x120')][_0x5b3fbd('0x104')],_0x4afd4b=VisuMZ[_0x5b3fbd('0x65')][_0x5b3fbd('0x42')]['General'][_0x5b3fbd('0xd8')],_0x301e93=(0x5-this[_0x5b3fbd('0x29')])/0x5;this['x']+=Math[_0x5b3fbd('0x5f')](_0x235a89*_0x301e93),this['y']+=_0x4afd4b;},Window_NameBox[_0x1d5f2b('0x6e')][_0x1d5f2b('0x117')]=function(){const _0x4ffbb3=_0x1d5f2b,_0x24422b=this[_0x4ffbb3('0x26b')],_0x48ef2e=_0x24422b['y'],_0x4fa88e=VisuMZ[_0x4ffbb3('0x65')]['Settings'][_0x4ffbb3('0x120')][_0x4ffbb3('0xd8')];if(_0x48ef2e>this['y']&&_0x48ef2e<this['y']+this[_0x4ffbb3('0x1f1')]-_0x4fa88e){if(_0x4ffbb3('0x1ae')==='wqCPd'){function _0x549c3a(){const _0x1dc6d6=_0x4ffbb3;this[_0x1dc6d6('0x21c')]=_0x190ee8;}}else this['y']=_0x24422b['y']+_0x24422b['height'];}},VisuMZ[_0x1d5f2b('0x65')]['Window_NameBox_refresh']=Window_NameBox['prototype'][_0x1d5f2b('0xab')],Window_NameBox[_0x1d5f2b('0x6e')][_0x1d5f2b('0xab')]=function(){const _0x3ecffd=_0x1d5f2b;this[_0x3ecffd('0x29')]=0x0,VisuMZ[_0x3ecffd('0x65')][_0x3ecffd('0x32')][_0x3ecffd('0x128')](this);},Window_ChoiceList[_0x1d5f2b('0x6e')]['isWordWrapEnabled']=function(){return![];},Window_ChoiceList[_0x1d5f2b('0x6e')][_0x1d5f2b('0xf7')]=function(){return!![];},Window_ChoiceList[_0x1d5f2b('0x6e')][_0x1d5f2b('0x24')]=function(){const _0x5b44f1=_0x1d5f2b;return $gameSystem[_0x5b44f1('0x22c')]();},Window_ChoiceList[_0x1d5f2b('0x6e')][_0x1d5f2b('0x134')]=function(){const _0x2ee64b=_0x1d5f2b;return $gameSystem[_0x2ee64b('0x119')]();},Window_ChoiceList[_0x1d5f2b('0x6e')]['start']=function(){const _0x50050b=_0x1d5f2b;this[_0x50050b('0x159')](),this['refresh'](),this[_0x50050b('0xfa')](),this['open'](),this['activate']();},Window_ChoiceList['prototype'][_0x1d5f2b('0xab')]=function(){const _0x559af7=_0x1d5f2b;this['clearCommandList'](),this[_0x559af7('0x114')](),this['_messageWindow']&&(this[_0x559af7('0x10f')](),this[_0x559af7('0x51')]()),this[_0x559af7('0x18b')](),Window_Selectable['prototype'][_0x559af7('0xab')][_0x559af7('0x128')](this);},Window_ChoiceList[_0x1d5f2b('0x6e')]['makeCommandList']=function(){const _0x3b189a=_0x1d5f2b,_0x48a03c=$gameMessage['choices']();let _0x3cb53d=0x0;for(const _0xe0763c of _0x48a03c){if(this['isChoiceVisible'](_0xe0763c)){const _0x590fff=_0xe0763c,_0x47cea2=this['isChoiceEnabled'](_0xe0763c);this['addCommand'](_0x590fff,_0x3b189a('0x167'),_0x47cea2,_0x3cb53d);}_0x3cb53d++;}},Window_ChoiceList[_0x1d5f2b('0x6e')][_0x1d5f2b('0x14c')]=function(_0xe399b5){const _0xd559b5=_0x1d5f2b;if(_0xe399b5['match'](/<HIDE>/i))return![];if(_0xe399b5[_0xd559b5('0x165')](/<SHOW>/i))return!![];if(_0xe399b5[_0xd559b5('0x165')](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('IdXjM'==='UtvCo'){function _0x5e17f7(){const _0x50cf9a=_0xd559b5;if(!this[_0x50cf9a('0x10d')])return;const _0x56f29d=0x8,_0x45d035=this['_cancelButton'],_0x1ba224=this['x']+this[_0x50cf9a('0x11b')],_0x101e03=_0x2c843f['floor']((_0x17649d[_0x50cf9a('0x11b')]-_0x4ec00c[_0x50cf9a('0x23e')])/0x2);_0x1ba224>=_0x627d1d[_0x50cf9a('0x23e')]+_0x101e03-_0x45d035[_0x50cf9a('0x11b')]+_0x56f29d?_0x45d035['x']=-_0x45d035['width']-_0x56f29d:_0x45d035['x']=this['width']+_0x56f29d,_0x45d035['y']=this[_0x50cf9a('0x1f1')]/0x2-_0x45d035[_0x50cf9a('0x1f1')]/0x2;}}else{const _0x35ee90=JSON[_0xd559b5('0x73')]('['+RegExp['$1'][_0xd559b5('0x165')](/\d+/g)+']');for(const _0x19ffa5 of _0x35ee90){if(_0xd559b5('0xb2')!==_0xd559b5('0xb2')){function _0x4bea19(){const _0x2751ef=_0xd559b5;return this[_0x2751ef('0x86')];}}else{if(!$gameSwitches[_0xd559b5('0x25')](_0x19ffa5))return![];}}return!![];}}if(_0xe399b5[_0xd559b5('0x165')](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('reDOM'!=='JYBAe'){const _0x2efcd3=JSON[_0xd559b5('0x73')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x55f09c of _0x2efcd3){if(!$gameSwitches[_0xd559b5('0x25')](_0x55f09c))return![];}return!![];}else{function _0x43baf5(){const _0x4595ea=_0xd559b5,_0x16924c=_0x135076[_0x4595ea('0x65')][_0x4595ea('0x277')][_0x4595ea('0x128')](this);return _0x16924c[_0x4595ea('0xfc')]=this[_0x4595ea('0xfc')],_0x16924c;}}}if(_0xe399b5[_0xd559b5('0x165')](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('byzNy'!==_0xd559b5('0x135')){const _0x4a419a=JSON[_0xd559b5('0x73')]('['+RegExp['$1'][_0xd559b5('0x165')](/\d+/g)+']');for(const _0x1f452c of _0x4a419a){if($gameSwitches['value'](_0x1f452c))return!![];}return![];}else{function _0x11f581(){const _0x3dfb78=_0x3ba073['parse']('['+_0x20a92a['$1']['match'](/\d+/g)+']');for(const _0x49b859 of _0x3dfb78){if(!_0x4902d7['value'](_0x49b859))return!![];}return![];}}}if(_0xe399b5['match'](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x19c37e=JSON[_0xd559b5('0x73')]('['+RegExp['$1'][_0xd559b5('0x165')](/\d+/g)+']');for(const _0x4e63ad of _0x19c37e){if(_0xd559b5('0x23a')===_0xd559b5('0x23a')){if(!$gameSwitches[_0xd559b5('0x25')](_0x4e63ad))return!![];}else{function _0x5c9c1f(){const _0x575e50=_0xd559b5;this['adjustShowChoiceDefault'](_0x1d9f92,_0x2a1504,_0x2fefb3),this['adjustShowChoiceCancel'](_0xa9e04c,_0x12f0e4,_0x2c24e4),this[_0x575e50('0x17e')](_0x5a91e3,_0x3def9d);}}}return![];}if(_0xe399b5['match'](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xd559b5('0x264')!=='NPpib'){function _0x344eeb(){const _0x5d896a=_0xd559b5;this[_0x5d896a('0x13a')]=_0x4788f0;}}else{const _0x35e7c6=JSON[_0xd559b5('0x73')]('['+RegExp['$1'][_0xd559b5('0x165')](/\d+/g)+']');for(const _0x28b637 of _0x35e7c6){if(_0xd559b5('0x17')===_0xd559b5('0x17')){if(!$gameSwitches[_0xd559b5('0x25')](_0x28b637))return!![];}else{function _0x1a8556(){const _0x8b2785=_0xd559b5,_0x1c84d4=_0x218622(_0x3beba0['$1']);_0x1c84d4!==_0x45652e[_0x7bdbfa]['version']&&(_0x48a735(_0x8b2785('0xb4')[_0x8b2785('0x10e')](_0x24003a,_0x1c84d4)),_0x9525b0[_0x8b2785('0x5e')]());}}}return![];}}if(_0xe399b5['match'](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x42bf04=JSON[_0xd559b5('0x73')]('['+RegExp['$1'][_0xd559b5('0x165')](/\d+/g)+']');for(const _0x42ee88 of _0x42bf04){if(_0xd559b5('0xf9')===_0xd559b5('0xf9')){if($gameSwitches[_0xd559b5('0x25')](_0x42ee88))return![];}else{function _0x1f06d2(){const _0x2021c5=_0xd559b5;return _0x5ea5a4['MessageCore'][_0x2021c5('0x123')][_0x2021c5('0x128')](this)||_0x286a9c[_0x2021c5('0x1c5')](_0x1f2126[_0x2021c5('0x65')][_0x2021c5('0x42')][_0x2021c5('0x120')]['FastForwardKey']);}}}return!![];}return!![];},Window_ChoiceList['prototype'][_0x1d5f2b('0x24e')]=function(_0x23e329){const _0x6427f1=_0x1d5f2b;if(_0x23e329['match'](/<DISABLE>/i))return![];if(_0x23e329[_0x6427f1('0x165')](/<ENABLE>/i))return!![];if(_0x23e329[_0x6427f1('0x165')](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x6427f1('0xe5')!==_0x6427f1('0xe5')){function _0xdd32ef(){return _0x24cbdd;}}else{const _0x1e062a=JSON[_0x6427f1('0x73')]('['+RegExp['$1'][_0x6427f1('0x165')](/\d+/g)+']');for(const _0x145b62 of _0x1e062a){if(_0x6427f1('0x1ca')===_0x6427f1('0x1ca')){if(!$gameSwitches[_0x6427f1('0x25')](_0x145b62))return![];}else{function _0x1e634f(){const _0x19f4eb=_0x6427f1;return this[_0x19f4eb('0x26b')]['x'];}}}return!![];}}if(_0x23e329[_0x6427f1('0x165')](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x6427f1('0x1ac')===_0x6427f1('0x175')){function _0xffe0fd(){const _0x4daeaf=_0x6427f1;return this['processAutoSize'](_0x247879,!![],!![]),this[_0x4daeaf('0x210')](_0x4daeaf('0xd2'),_0x1ca621(_0x21eede)||0x1),'';}}else{const _0x6cfeef=JSON[_0x6427f1('0x73')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2761b3 of _0x6cfeef){if(!$gameSwitches[_0x6427f1('0x25')](_0x2761b3))return![];}return!![];}}if(_0x23e329['match'](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xe5a170=JSON['parse']('['+RegExp['$1'][_0x6427f1('0x165')](/\d+/g)+']');for(const _0x1e2414 of _0xe5a170){if(_0x6427f1('0xb')!=='QvOsN'){function _0x150d96(){const _0x1fa71a=_0x6427f1;_0x2bab61[_0x1fa71a('0x265')]=_0x594878['TextJS'];}}else{if($gameSwitches[_0x6427f1('0x25')](_0x1e2414))return!![];}}return![];}if(_0x23e329[_0x6427f1('0x165')](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1eef53=JSON['parse']('['+RegExp['$1'][_0x6427f1('0x165')](/\d+/g)+']');for(const _0x31cc43 of _0x1eef53){if(_0x6427f1('0x237')!=='XWMuD'){function _0x5ad63f(){const _0x5f1615=_0x6427f1;if(this[_0x5f1615('0x229')]===_0x129dee)this[_0x5f1615('0xde')]();if(this[_0x5f1615('0x229')]['choiceRows']===_0x50737c)this['initMessageCore']();return this[_0x5f1615('0x229')][_0x5f1615('0x1cd')];}}else{if(!$gameSwitches['value'](_0x31cc43))return!![];}}return![];}if(_0x23e329[_0x6427f1('0x165')](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5e0a5e=JSON[_0x6427f1('0x73')]('['+RegExp['$1'][_0x6427f1('0x165')](/\d+/g)+']');for(const _0x350f25 of _0x5e0a5e){if(_0x6427f1('0x275')===_0x6427f1('0x245')){function _0x47e622(){const _0x1ffc6e=_0x6427f1;_0x2ea140[_0x1ffc6e('0x22a')](),_0x5a2837[_0x1ffc6e('0xa9')](),_0xd27758['createContents']();}}else{if(!$gameSwitches['value'](_0x350f25))return!![];}}return![];}if(_0x23e329[_0x6427f1('0x165')](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('RrAJl'===_0x6427f1('0xe8')){function _0x50dc3b(){const _0x42d99b=_0x6427f1;return _0x551427[_0x42d99b('0x65')]['Window_ChoiceList_windowX'][_0x42d99b('0x128')](this);}}else{const _0x19c22d=JSON[_0x6427f1('0x73')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x497878 of _0x19c22d){if($gameSwitches[_0x6427f1('0x25')](_0x497878))return![];}return!![];}}return!![];},VisuMZ[_0x1d5f2b('0x65')]['Window_ChoiceList_updatePlacement']=Window_ChoiceList[_0x1d5f2b('0x6e')][_0x1d5f2b('0x10f')],Window_ChoiceList[_0x1d5f2b('0x6e')][_0x1d5f2b('0x10f')]=function(){const _0x2dfee0=_0x1d5f2b;VisuMZ[_0x2dfee0('0x65')][_0x2dfee0('0x19e')][_0x2dfee0('0x128')](this),this[_0x2dfee0('0xcf')]();},Window_ChoiceList[_0x1d5f2b('0x6e')][_0x1d5f2b('0x51')]=function(){const _0x352361=_0x1d5f2b;if(!this[_0x352361('0x10d')])return;const _0x50bfc1=0x8,_0x5192bd=this['_cancelButton'],_0x19bb2a=this['x']+this[_0x352361('0x11b')],_0xd0bb61=Math[_0x352361('0x5f')]((Graphics[_0x352361('0x11b')]-Graphics[_0x352361('0x23e')])/0x2);_0x19bb2a>=Graphics[_0x352361('0x23e')]+_0xd0bb61-_0x5192bd[_0x352361('0x11b')]+_0x50bfc1?_0x5192bd['x']=-_0x5192bd[_0x352361('0x11b')]-_0x50bfc1:_0x5192bd['x']=this[_0x352361('0x11b')]+_0x50bfc1,_0x5192bd['y']=this[_0x352361('0x1f1')]/0x2-_0x5192bd['height']/0x2;},VisuMZ[_0x1d5f2b('0x65')][_0x1d5f2b('0x1a4')]=Window_ChoiceList[_0x1d5f2b('0x6e')]['windowX'],Window_ChoiceList['prototype'][_0x1d5f2b('0x195')]=function(){const _0x359ccf=_0x1d5f2b;if(this[_0x359ccf('0x26b')]){if(_0x359ccf('0x26e')===_0x359ccf('0x95')){function _0x56d083(){const _0x4c9975=_0x359ccf,_0x148836=_0x336a74[_0x4c9975('0x255')](_0x99cdd0[_0x4c9975('0x257')]()['length']/this[_0x4c9975('0x134')]());return _0x126112[_0x4c9975('0x131')](_0x148836,this[_0x4c9975('0x1a7')]());}}else return this[_0x359ccf('0xa1')]();}else{if('ocNRm'===_0x359ccf('0x1d0'))return VisuMZ[_0x359ccf('0x65')][_0x359ccf('0x1a4')]['call'](this);else{function _0x570de1(){const _0x3ef77b=_0x359ccf;if(_0x15cdce[_0x3ef77b('0x25')](_0x3ab43a))return![];}}}},Window_ChoiceList[_0x1d5f2b('0x6e')]['messageCoreWindowX']=function(){const _0x44ba03=_0x1d5f2b,_0x37b7a1=$gameMessage[_0x44ba03('0x101')]();if(_0x37b7a1===0x1)return(Graphics[_0x44ba03('0x23e')]-this[_0x44ba03('0x190')]())/0x2;else{if(_0x37b7a1===0x2)return this[_0x44ba03('0x26b')]['x']+this[_0x44ba03('0x26b')][_0x44ba03('0x11b')]-this[_0x44ba03('0x190')]();else{if(_0x44ba03('0x129')!==_0x44ba03('0x18e'))return this['_messageWindow']['x'];else{function _0x3bd040(){const _0x1eacf6=_0x44ba03,_0x31c610=[_0x1eacf6('0x21a'),'fontSize',_0x1eacf6('0x1e4'),'fontItalic','textColor',_0x1eacf6('0x85'),_0x1eacf6('0x17c'),_0x1eacf6('0x118')];let _0x25e62e={};for(const _0x4486cf of _0x31c610){_0x25e62e[_0x4486cf]=this[_0x1eacf6('0x14f')][_0x4486cf];}return _0x25e62e;}}}}},Window_ChoiceList['prototype'][_0x1d5f2b('0x190')]=function(){const _0x3d0234=_0x1d5f2b,_0x5e5139=(this[_0x3d0234('0x1b0')]()+this[_0x3d0234('0x1a8')]())*this[_0x3d0234('0x134')]()+this[_0x3d0234('0x25a')]*0x2;return Math[_0x3d0234('0x131')](_0x5e5139,Graphics[_0x3d0234('0x11b')]);},Window_ChoiceList[_0x1d5f2b('0x6e')][_0x1d5f2b('0x26c')]=function(){const _0x111eb6=_0x1d5f2b,_0x1f1fbc=Math['ceil']($gameMessage['choices']()['length']/this[_0x111eb6('0x134')]());return Math[_0x111eb6('0x131')](_0x1f1fbc,this[_0x111eb6('0x1a7')]());},Window_ChoiceList[_0x1d5f2b('0x6e')][_0x1d5f2b('0x1a7')]=function(){const _0x2d2a86=_0x1d5f2b,_0x2d7a43=this[_0x2d2a86('0x26b')],_0x5be244=_0x2d7a43?_0x2d7a43['y']:0x0,_0x3b1b92=_0x2d7a43?_0x2d7a43['height']:0x0,_0xc844c5=Graphics[_0x2d2a86('0xe9')]/0x2;if(_0x5be244<_0xc844c5&&_0x5be244+_0x3b1b92>_0xc844c5)return 0x4;else{if('xfxMH'!=='MvqGF')return $gameSystem[_0x2d2a86('0x1b6')]();else{function _0x2920bc(){const _0x28cab7=_0x2d2a86,_0x5ebbea=_0x5a0720[_0x28cab7('0x257')]();let _0x54a88b=0x0;for(const _0x25d558 of _0x5ebbea){if(this[_0x28cab7('0x14c')](_0x25d558)){const _0x230b73=_0x25d558,_0x10f3ac=this['isChoiceEnabled'](_0x25d558);this[_0x28cab7('0x1c0')](_0x230b73,_0x28cab7('0x167'),_0x10f3ac,_0x54a88b);}_0x54a88b++;}}}}},Window_ChoiceList[_0x1d5f2b('0x6e')][_0x1d5f2b('0x1b0')]=function(){const _0x377806=_0x1d5f2b;let _0x5b4cea=0x60;for(const _0x94638d of this['_list']){const _0x2dda27=_0x94638d[_0x377806('0x1e')],_0x14c0b1=this['textSizeEx'](_0x2dda27)[_0x377806('0x11b')],_0x14fbdb=Math['ceil'](_0x14c0b1)+this[_0x377806('0x194')]()*0x2;if(_0x5b4cea<_0x14fbdb){if(_0x377806('0x136')!=='SJnhY'){function _0x2569ed(){const _0x3ac81a=_0x377806;this[_0x3ac81a('0x4c')](![]);}}else _0x5b4cea=_0x14fbdb;}}return _0x5b4cea;},Window_ChoiceList[_0x1d5f2b('0x6e')][_0x1d5f2b('0xf4')]=function(_0x438016){const _0x5df74=_0x1d5f2b,_0x3b21a4=this[_0x5df74('0x141')](_0x438016),_0x4fac0a=$gameSystem[_0x5df74('0x2')]()!==_0x5df74('0xd0')?_0x5df74('0x14')[_0x5df74('0x10e')]($gameSystem[_0x5df74('0x2')]()):'',_0x1afc8e=_0x4fac0a+this[_0x5df74('0x25d')](_0x438016);this[_0x5df74('0x278')](this['isCommandEnabled'](_0x438016)),this['drawTextEx'](_0x1afc8e,_0x3b21a4['x'],_0x3b21a4['y'],_0x3b21a4[_0x5df74('0x11b')]);},Window_ChoiceList[_0x1d5f2b('0x6e')][_0x1d5f2b('0x12a')]=function(){const _0x299fe7=_0x1d5f2b;$gameMessage[_0x299fe7('0x75')](this['currentExt']()),this[_0x299fe7('0x26b')][_0x299fe7('0xff')](),this[_0x299fe7('0x6c')]();};