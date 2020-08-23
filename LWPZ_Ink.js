//=============================================================================
// RPG Maker MZ - Ink Plugin
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Integrates the Ink story scripting language (https://www.inklestudios.com/ink/) into RPG Maker.
 * @author Logan Pickup
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @url https://github.com/theartofme/rmmv-ink
 * 
 * @param inkScript
 * @text Ink script
 * @desc Name of the Ink script. Must be exported with the "export to JSON" option, and must be in the data folder.
 * @type text
 * @default inkscript.ink.json
 * 
 * @param enableFormatting
 * @text Enable formatting
 * @desc Turn this on to enable basic formatting. Currently the only thing it does is convert _text_ to \C[1]text\C, so emphasis looks more natural in the script.
 * @type boolean
 * @default true
 * 
 * @param emphasisColour
 * @text Emphasis colour
 * @desc If "Enable formatting" is turned on, this controls the colour used for _emphasis_. It can be any colour allowed for the \C[] escape.
 * @type number
 * @default 1
 * 
 * @param useNameBox
 * @text Use name boxes
 * @desc Turn this on to enable using name boxes when the name is known
 * @type boolean
 * @default true
 * 
 * @command ink
 * @text Execute Ink script
 * @desc Makes the specified picture clickable.
 *
 * @arg target
 * @type text
 * @text Ink target
 * @desc can either be a knot by itself, or a knot and a stitch in the format knot.stitch, just like redirects in Ink itself.
 * 
 * @help 

Integrates the Ink (https://www.inklestudios.com/ink/) scripting language
into RPG Maker MV. Provides plugin commands for triggering Ink, allows
sharing variables between Ink and RMMV, and provides some extension
functions and hashtags that allow more control over RMMV from within Ink.

Getting Started

Download the javascript port of the Ink engine from here:
https://github.com/y-lohse/inkjs
Take the copy of ink.js from the templates/browser_serverless folder and put
it in your RMMV plugins folder (js/plugins). Download LWP_Ink.js from this
repo and put it in your RMMV plugins folder, too.

Add both ink.js and LWP_Ink.js to your plugins in RMMV. ink.js must be
higher in the list than LWP_Ink.js; drag them around to make sure this is the
case if it's not already.

It's also highly recommended to use a word wrapping plugin. The
following word wrap plugins have been tested and confirmed to work:
* VisuMZ_1_MessageCore

Usage

First you need to export your Ink script as JSON. From Inkle, select
File->Export to JSON... and save the file as inkscript.ink.json in your game's
data folder. You need to repeat this export process whenever you make changes
to the script in Inkle.

In order to start running Ink from RMMV, just use the plugin command INK.
Without parameters it starts the Ink script from the begnning and continues
until it reaches the end. It is probably more useful to use it to start at
specific paths; just put the knot's name (including a dot and the stitch, if
	desired), for example:

INK admitted_to_something.i_know_where

This plugin will continue to run Ink until it stops via -> END or -> DONE,
although some special tags can affect this behaviour; see the section on
hashtags below. This makes it convenient to, for example, have a knot in Ink
per NPC or per scene:

	=== npc_alice ===
	* [Just ask Alice]
		When I was ten feet tall?
	+ [I'll be on my way]
	- -> DONE

And then when you interact with this NPC in game, use the plugin command INK
npc_alice, and have Ink figure out what the dialogue options are. See below
for more integration options.
Integration with RPG Maker MV
Message Boxes

The text from Ink is passed as-is to RPG Maker MV. This means that you can
use any RMMV escape codes you want to, as long as anything that conflicts
with Ink syntax is escaped properly. You should also be able to use custom
escape codes and notetags that any plugins you use allow.

LWP_Ink also has its own set of controls over the message boxes using Ink
hashtags and by setting up a cast; see the section on hashtags below.

Initialisation

Ink is initialised the first time the Ink plugin is called from an event.
Initialising causes the following things to happen:
1.	The Ink script is run from the beginning. The output from this is
	discarded, but any extension functions that were called have their
	normal effect, and any Ink state (such as knot/stitch view counts
	and variables) is kept. This makes it a good place for any one-time
	setup, like defining Ink variables and linking Ink variables to RMMZ
	variables.
2.	The plugin looks for the knot == init ==. If it finds it, it runs it
	using the same rules as above; output is discarded but state is kept.
	This is an alternate place to perform initialisation if you want to
	organise your Ink scripts.
3.	The plugin looks for cast knots - both == cast == and
	== dramatis_personae == are allowed, and if either or both of these
	knots are present they will be run. Unlike the initialisation knots,
	RMMZ state is not passed in before running or exported after running;
	this shouldn't be an issue except if you modify linked variables in
	this section, which is not recommended.
	The contents of this section are used to define the cast. It uses the
	following format:
	name: options
	name is the name that this character should be known by in the script.
	options can include the following:
	actor(index) - causes this character to be linked to an RMMZ actor with
		the specified index. This will make any text spoken by this character
		to use the actor's face image, and the actor's name in the name box.
	image(filename, index) - associates an image with this character. When
		text is spoken by this character, this image will be used.
	name(name) - specifies the name to appear in the name box when this
		character speaks. This is useful for overriding the default name.

Variables

RMMV variables can be accessed from Ink using the external functions
rmmv_var() and rmmv_switch() (see the seection on external functions below).
These functions return the current value of a variable or a switch. If you
want to check the state of an Ink variable from RMMV, you must use the
link_var() and link_switch() external functions instead. These functions link
an Ink variable to an RMMV variable or switch, allowing updates to pass
between both engines; if a change to a variable is made in Ink, it is updated
in RMMV; and if a variable is updated in RMMV, it is also changed in Inky.

Example:

VAR foo = 0
~ link_var(foo, 1)

And from then on, the variable "foo" is synced between Ink and the RMMV
variable 1. If you do the following in Ink:

~ foo = 13

Then RMMV will see the updated value in variable 1; similarly, if you change
variable 1 in RMMV, then foo in Ink will also get the changed value.

Only number and string variables are supported for syncing between Ink and
RMMV.

If the Ink variable type is a boolean (i.e. it is initially set to true or
false) then it should be synced with an RMMV switch instead using
link_switch(). If the Ink variable is then later assigned a non-boolean type
(something other than true or false) in Ink then you will not get the results
you expect; please don't do this.

There is no method for getting Ink variables from RMMV plugin code.

Loading and Saving

Ink state is saved as a part of the savegame. Certain pieces of state are not
saved if the game is saved in the middle of displaying content, and any
currently-running common event is not saved either. It shouldn't be possible
to save the game at these points, so it shouldn't be a problem.

When Ink Can Be Called

Ink can be called anywhere the plugin command action is allowed - i.e. the map
or in a battle. It doesn't work as well inside a battle, though, and you should
first use RMMV commands to disable the battle input if you're planning on
showing a lot of dialogue. Ink has no commands for controlling RMMV state except
for the #common_event hashtag; see the section on hashtags below.

Plugin Commands

	INK Starts Ink from wherever it left off; starts at the beginning if it hasn't
		started yet. Does nothing if the Ink script has ended. Once started, Ink
		will keep running until an interrupt allows RPG Maker to take over again.
		Ink will not start running until it is able to show a message box; it will
		not pause the current event or stop it from running.
	INK path Starts Ink at the specified knot (You can use "." to specify a stitch,
		too) instead of where it left off or where it would normally start.

Using Ink in other places

Ink can be called to supply text for other places too - anywhere that RMMV escape
codes will work. This includes:

	character profiles
	item descriptions
	state messages

It does not include:

	character names
	item names
	monster names
	terms

If you are using a plugin that changes where escape codes work, this may, depending
on the plugin, also change where Ink is able to be called from too.

In order to use this functionality, just use the code {ink:knot.stitch} to include
the text from the specified knot/stitch. For example, if you have the following in
an Ink script:

	== main_character ==
	= bio
	A simple farm girl, everything changed when she discovered she was the chosen one!

Then you can show this by entering {ink:main_character.bio} in the "Profile" section
of a character in the RPG Maker database.

Ink content included this way is different from Ink content from the plugin command:

	It never changes state. In order to stop other parts of this script from breaking,
	any changes to state are undone. This includes any changes to what is considered
	the current location in the text, as well as the "seen" counters on knots and
	stitches. There is a known bug related to this that will cause changes to be
	synced to RPG Maker before the state change is undone, so please don't change any
	synced variables.
	Choices have no effect. Choices will not be shown and only text from before the
	choice will be seen.

External Functions

The following external functions are available in Ink. They need to be defined at the
top of one of your ink files using the syntax shown.

	EXTERNAL link_var(ref varname, x) Links the variable varname to the RMMV variable x.
		The values will be automatically synced when going from/to Ink. Also, this will
		set the current value of varname to the RMMV variable it is linked to immediately.
	EXTERNAL link_switch(ref varname, x) Links the variable varname to the RMMV switch x.
		The values will be automatically synced when going from/to Ink. Also, this will
		set the current value of varname to the RMMV switch it is linked to immediately.
	EXTERNAL rmmv_var(x) Retrives the value of RMMV variable x.
	EXTERNAL rmmv_switch(x) Retrives the value of RMMV switch x.
	EXTERNAL link_actor_name(ref varname, actor_index) Links the name of an Actor to an Ink
		variable. Unlike link_var and link_switch the RMMV Actor name will be set based on
		the Ink variable when this is called.
	EXTERNAL cast(name, image, default_index) Sets up a member of the cast. The name given
		is associated with an image (should be the filename of an image in img/faces) and
		a default index in the image. This image is used whenever you use the name as a
		hashtag.
	EXTERNAL cast_link(ref name, actor_index, image, default_index) This is a combination
		of cast() and link_actor(). If you're using both, this will save you some setup!
		The difference is that the first parameter is a variable, not a string, and it will
		both link the variable to the actor's name in RMMV and allow the variable's name
		(not the actor's name, as that can change!) to be used as a hashtag like with cast().
	EXTERNAL expression(expression_name, index) Sets up an expression, e.g. happy,
		frustrated, etc. When the expression is used as a hashtag, the same image file will
		be used but the index within the file will be changed to the specified index.

Hashtags

This plugin processes certain hashtags from Ink. The hashtags can be defined at the top of a
knot or even at the top of an Ink script if you need the same flags for all messages; there
is no "override" mechanism though, so if you have #bottom at the top of a knot and then #middle
for a single line of text, that line of text will get both #top and #bottom hashtags, and the
final location of the message box might not be where you want it, so make sure you really want
the hashtag to appear everywhere before you do this.

"Action" hashtags like #common_event or #battle should only ever be used for single lines.

The following hashtags can be used:

	#top, #middle and #bottom Move the message window to the top, middle or bottom - same as
		the "Window Position" field in RMMV's show text command.
	#window, #dim and #transparent Controls the background of the message box - same as the
		"Background" field in RMMV's show text command.
	#interrupt Stops running Ink after showing the tagged content. Calling the plugin command
		INK without any parameters will continue from the next piece of content.
	#common_event(x) Runs the common event x. Control will pass over to the common event until
		it finishes, after which Ink will resume again. If Ink is called again from the common
		event then the current Ink knot will be overwritten by the new target, but Ink will
		still not start running until the common event finishes; this is unintuitive, so it is
		best to just avoid calling Ink from a common event called by Ink.
	#battle(troopId,winTarget,escapeTarget,loseTarget) Starts a battle. It is possible to just
		pass control to a common event and start the battle from there, but this way allows you
		to jump easily jump to different Ink paths based on the outcome of the battle (it is
		still possible with a common event by using linked variables). This hashtag also
		stops Ink running, just like #interrupt - if you want to continue the Ink dialogue
		during the battle, do the INK plugin command from within the battle itself. troopId
		is the number of the troop to use for the battle. If set to 0, or not set, the troop
		is determined randomly using RMMV's normal mechanism. winTarget is the path to go to
		in Ink if the battle is won. escapeTarget is the path to go to in Ink if the battle
		is escaped from or aborted. loseTarget is the path to go to in Ink if the battle is
		lost. winTarget,escapeTarget, and loseTarget can take the same format of paths that
		Ink can: either a knot, a knot.stitch, or a stitch by itself, provided the stitch is in
		the current knot and the stitch does not have the same name as a knot. Any parameter can
		be omitted, and if escapeTarget ot loseTarget are omitted then the battle cannot be
		escaped from or will end in game over if the battle is lost, respectively. For example,
		to prevent escape but prevent a game over: #battle(0,win,,lose)
	#name If the hashtag is the name of a character defined with cast(name, image, index) or
		cast_link(ref name, image, index) then it will cause that image to be used. Equivalent
		to using the image name and index directly as a hashtag, but easier to read.
		Additionally, if the "Use name boxes" option is enabled, then the name will be set in
		the name box. If the cast_link variant was used to set this up, then the current value of
		the name variable will be used in the name box.
	#expression If the hashtag is the name of an expression defined with
		expression(expression, index) then it will cause the image index to change to the one
		specified for the expression. The image used will not change.

A full example of using cast() and expression with hashtags:

	VAR PRAXIS = 'Praxis'
	~ cast('Ingrid', 'Actor1', 0)
	~ cast_link(PRAXIS, 2, 'Alien3', 0)
	~ expression('ecstatic', 1)
	~ expression('inscrutable', 2)

	Hi. #PRAXIS

	OMG you're the new alien! #Ingrid #ecstatic

	I could be. #PRAXIS #inscrutible

Localisation

This plugin supports both IAVRA.MasterLocalization and DKTools_Localization. It can go above or
below either of those two scripts, it's not important. It will use the currently-set language
from whichever localisation plugin you have installed to load a localised version of the Ink
script. If your Ink script is normally "data/script.ink.json" then the localised version should
be named "data/script.ink-es.json". The text in the "languages" list for the IAVRA.MasterLocalization
plugin will be used if it is active, which is normally a short language code. The text in the
"Short language name", also known as "Locale", in the DKTools_Localization plugin will be used if
it is active.

It supports changing languages part-way through the game.

Note that there's no need to add anything to either plugin's JSON files; the Ink script itself
should be fully translated instead and exported. This should make it convenient to hand off to a
translator, since you can just give them the Ink script instead of trying to extract all the strings
from RPG Maker.

IMPORTANT: When translating, the structure of the Ink script must stay exactly the same, including
the names of variables, knots and stitches, and number and location of choices (including choice
	labels if they are used). If the structure is different, switching languages mid- game will not
	work, and loading savegames from a different language will also not work.

If this can't be avoided, you must not allow the player to change languages after the game starts.
This includes changing language then loading a saved game from a different language!

Troubleshooting

If calling the plugin command doesn't do anything, it's possible Ink has gotten into a
corrupted state. The most common causes are:
-	not correctly defining fallback functions in the Ink file (they shouldn't be necessary since
	they're implemented by this plugin, but in practice they are still necessary - see the Ink
	help for how to define fallback functions for external functions).
-	trying to branch to a function. Since functions are defined as knots this doesn't immediately
	cause an error like branching to a knot that doesn't exists, but it will instead put Ink
	into a bad state.

 */
var Imported = Imported || {};
Imported.LWP_Ink = true;

(function () {
	'use strict';
    const script = document.currentScript;
    const param  = PluginManagerEx.createParameter(script);

//////////////////////////////////////////////////////////////////
// StoryWrapper
// An internal class that wraps Ink's Story type, providing
// accessors for the methods/properties needed and convenience
// methods for some common logic.
//////////////////////////////////////////////////////////////////
class StoryWrapper {
	constructor(inkStory) {
		this._story = inkStory;
	}

	getVariable(name) {
		return this._story.variablesState[name];
	}

	setVariable(name, value) {
		this._story.variablesState[name] = value;
	}

	getNextLine() {
		const content = this._story.Continue().trim();
		const tags = this._story.currentTags;
		return {content, tags};
	}

	getAllAvailableLines() {
		let lines = [];
		while (this.canContinue) {
			lines.push(this.getNextLine());
		}
		return lines;
	}

	get canContinue() {
		return this._story.canContinue;
	}

	get hasChoices() {
		return this._story.currentChoices.length > 0;
	}

	get currentChoices() {
		return this._story.currentChoices;
	}

	get jsonState() {
		return this._story.state.ToJson();
	}

	set jsonState(state) {
		this._story.state.LoadJson(state);
	}

	jumpTo(path) {
		this._story.ChoosePathString(path);
	}

	/**
	 * Takes what might be a partial path (stitch only), and returns a fully qualified
	 * path including the knot. If the path is already qualified, returns it as-is; if
	 * the path is already the name of a knot, also returns it as-is. If neither of
	 * those conditions are true, prepends the current knot to the path.
	 * This does not guarantee that the result is a valid path; Ink provides no mechanism
	 * to list paths, and the only way to validate it is by attempting to use it, which
	 * we might not want to do yet.
	 */
	resolvePath(path) {
		if (path === null || path === undefined) return path;
		// already fully qualified
		if (path.indexOf('.') !== -1) return path;
		// the name of a knot - doesn't need further qualification
		if (this._story.KnotContainerWithName(path)) return path;
		// getting the current knot is *really* hacky
		const previousPath = this._story.state.callStack.currentThread.previousPointer.path.toString();
		const dotIndex = previousPath.indexOf('.');
		const currentKnot = dotIndex === -1 ? previousPath : previousPath.substring(0, dotIndex);
		return currentKnot + '.' + path;
	}

	choose(index) {
		this._story.ChooseChoiceIndex(index);
	}

	bindExternal(name, func) {
		this._story.BindExternalFunction(name, func)
	}
}

//////////////////////////////////////////////////////////////////
// ChildInterpreter
// Class to wrap a Game_Interpreter instance running as a child of
// another class.
//////////////////////////////////////////////////////////////////
class ChildInterpreter {
	constructor() {
		this._gameInterpreter = null;
	}

	initFromCommonEvent(eventNumber) {
		list = $dataCommonEvents[eventNumber].list;
		this.initFromList(list);
	}

	initFromList(list) {
		this._gameInterpreter = new Game_Interpreter(1);
		this._gameInterpreter.setup(list, 0);
	}

	update() {
		if (this._gameInterpreter) {
			this._gameInterpreter.update();
			if (this._gameInterpreter.isRunning()) {
				return true;
			} else {
				this._gameInterpreter = null;
			}
		}
		return false;
	}

	isActive() {
		return this._gameInterpreter && this._gameInterpreter.isRunning();
	}
}

//////////////////////////////////////////////////////////////////
// CastManager
// Keeps track of character names and other attributes for use in
// Ink stories.
//////////////////////////////////////////////////////////////////
class CastManager {
	constructor() {
		this.cast = {};
		this.expressions = {};
		this.initialised = false;
	}

	initFromStory(story) {
		if (!this.initialised) {
			this.initialised = true;
			['cast', 'dramatis_personae'].forEach(knot => {
				try {
					story.jumpTo(knot);
					this.parseCast(story.getAllAvailableLines());
				} catch (error) {
					// ignore - defining cast in a knot is an optional feature
					console.log("no == " + knot + " == knot found", error);
				}
			});
		}
	}

	getDisplayData(line, tags, story) {
		const displayData = {
			face: '',
			faceIndex: 0,
			nameBox: null,
			content: line
		};
		let expression = null;
		let characterData = null;

		for (let tag of tags) {
			if (typeof(this.cast[tag]) !== 'undefined') {
				characterData = Object.assign({defaultName: tag}, this.cast[tag]);
			} else if (typeof(this.expressions[tag]) !== "undefined") {
				expression = {tag, imageIndex: this.expressions[tag]};
			}
		}

		let playScriptMatch = line.match(/^([\w\s]+):\s*/);
		if (playScriptMatch) {
			const name = playScriptMatch[1];
			if (this.cast[name]) {
				displayData.content = line.substring(playScriptMatch[0].length);
				characterData = Object.assign({defaultName: name}, this.cast[name]);
			} else {
				console.warn("Could not find cast member " + name + " from line, ignoring: " + line);
			}
		}

		if (characterData) {
			console.log('#cast', characterData);
			displayData.face = characterData.image;
			displayData.faceIndex = characterData.index;
			if (param.useNameBox) {
				let name = characterData.defaultName;
				if (characterData.useVariable) {
					name = story.getVariable(name);
				}
				displayData.nameBox = name;
			}
			if (characterData.actorIndex) {
				let actor = $gameActors.actor(characterData.actorIndex);
				if (param.useNameBox && !characterData.useVariable) {
					displayData.nameBox = actor.name();
				}
				if (!displayData.faceIndex) {
					displayData.faceIndex = actor.faceIndex();
				}
				if (displayData.face === '' || !displayData.face) {
					displayData.face = actor.faceName();
				}
			}
			if (characterData.realName && param.useNameBox && !characterData.useVariable) {
				displayData.nameBox = characterData.realName;
			}
		}

		if (expression) {
			console.log('#expression', expression);
			displayData.faceIndex = expression.imageIndex;
		}

		return displayData;
	}

	addCastEntry(name, useVariable, image, index, actorIndex, realName) {
		this.cast[name] = {useVariable, image, index, actorIndex, realName};
	}

	addGenericExpression(name, imageIndex) {
		this.expressions[name] = imageIndex;
	}

	_mapRegex(text, regex, mapper, defaultValue) {
		if (text === null || typeof(text) === 'undefined') {
			return defaultValue;
		}
		let match = text.match(regex);
		if (match) {
			return mapper(match);
		} else {
			return defaultValue;
		}
	}
	
	parseCast(castLines) {
		castLines.forEach(line => {
			let [name, data] = line.content.split(':', 2);
			let actor = this._mapRegex(data, /actor\s*\(\s*([0-9]+)\s*\)/, match => Number.parseInt(match[1]), null);
			let realName = this._mapRegex(data, /name\s*\(\s*([^,)]+)\s*\)/, match => match[1], null);
			let [image, index] = this._mapRegex(data, /image\s*\(\s*([^\s,)]+)\s*(?:,\s*([0-9]+)\s*)\)/, match => {
				return [match[1], match[2] ? Number.parseInt(match[2]) : null]
			}, [null, null]);
			this.addCastEntry(name, false, image, index, actor, realName);
			// line.tags; // not used
		});
	}

	makeSaveContents() {
		return {
			cast: this.cast,
			expressions: this.expressions
		}
	}

	extractSaveContents(data) {
		this.cast = data.cast;
		this.expressions = data.expressions;
	}
}

//////////////////////////////////////////////////////////////////
// OutputHandler
// Takes care of outputting Ink content to RPG Maker.
//////////////////////////////////////////////////////////////////
class OutputHandler {
	showContentInMessageBox(displayData) {
		$gameMessage.setFaceImage(displayData.face, displayData.faceIndex);
		$gameMessage.setBackground(displayData.background);
		$gameMessage.setPositionType(displayData.position);
		$gameMessage.setSpeakerName(displayData.nameBox);
		const content = this.formatText(displayData.content);
		$gameMessage.add(content);
	}

	showChoices(choices, callback) {
		// TODO: error on choices that are too long?
		$gameMessage.setChoices(choices, 0 /*defaultType*/, -1 /*cancelType*/);
		$gameMessage.setChoiceBackground(0);
		$gameMessage.setChoicePositionType(2);
		$gameMessage.setChoiceCallback(callback);
	}

	// this method only parses hashtags that directly affect displayed
	// content. See processActionHashtags for hashtags that cause other
	// effects. The general rule is that this method should have no side
	// effects - it should only return an object that will later be
	// passed to LWP_InkManager.showContentInMessageBox so the content
	// can be displayed appropriately.
	getDisplayData(line, tags) {
		const displayData = {
			position: 2,
			background: 0,
			content: line
		};

		for (let tag of tags) {
			if (/top/i.test(tag)) {
				displayData.position = 0;
			} else if (/middle/i.test(tag)) {
				displayData.position = 1;
			} else if (/bottom/i.test(tag)) {
				displayData.position = 2;
			} else if (/window/i.test(tag)) {
				displayData.background = 0;
			} else if (/dim/i.test(tag)) {
				displayData.background = 1;
			} else if (/transparent/i.test(tag)) {
				displayData.background = 2;
			}
		}
		return displayData;
	}

	formatText(text)  {
		console.log("Formatting enabled?", param.enableFormatting);
		if (!param.enableFormatting) return text;
		return text.replace(/_([^_]+)_/g, (match, group1) => {
			return '\\C[' + param.emphasisColour + ']' + group1 + '\\C';
		});
	}
}

//////////////////////////////////////////////////////////////////
// LWP_InkManager
// A global to hold all the Ink methods and data, so it can be
// used and overridden more easily by other plugins
//////////////////////////////////////////////////////////////////
const LWP_InkManager = {

	//----------------------------------------------------
	// init

	inkStoryFilename: "data/" + param.inkScript.trim(),

	_inkStory: null,    // only accessed directly by LWP_InkManager.getStory()
	active: false,
	stopAfterMessage: false,
	variableBindings: {},
	switchBindings: {},
	actorNameBindings: {},
	cast: new CastManager(),
	_queuedActions: [],
	_childInterpreter: new ChildInterpreter(),
	_currentLocalisationTag: "",
	_ranInitialiserKnot: false,
	_outputHandler: new OutputHandler(),

	getLocalisationTag: function() {
		if (Imported.DKTools_Localization) {
			//return DKTools.Localization.language;
			return DKTools.Localization.locale;
		} else if (Imported.IAVRA_MasterLocalization) {
			return IAVRA.MasterLocalization.I18N.language;
		}
		return "";
	},

	getStory: function() {
		let currentLocalisationTag = this.getLocalisationTag();
		if (!this._inkStory || currentLocalisationTag != this._currentLocalisationTag) {
			this._currentLocalisationTag = currentLocalisationTag;
			const saveData = this._inkStory ? this._inkStory.jsonState : null;
			this._inkStory = this.loadInkStory(this.inkStoryFilename, currentLocalisationTag);
			this.bindFunctions(this._inkStory);
			if (saveData) {
				// preserve the current story state when switching languages
				this._inkStory.jsonState = saveData;
			}
			this.initFromKnot(this._inkStory);
			this.cast.initFromStory(this._inkStory);
		}
		return this._inkStory;
	},

	initFromKnot: function(story) {
		if (!this._ranInitialiserKnot) {
			// init can be the top level of the Ink script
			this.getBulkContent(story);
			try {
				story.jumpTo('init');
				this.getBulkContent(story);
			} catch (error) {
				// ignore - defining an init knot is an optional feature
				console.log("INK: no == init == knot found, skipping");
			}
			this._ranInitialiserKnot = true;
		}
	},

	loadInkData: function(filename, localisationTag) {
		const fs = require('fs');
		const path = require('path');
		const base = path.dirname(process.mainModule.filename);
		const pathname = path.join(base, filename);
		const withoutSuffix = pathname.substring(0, pathname.lastIndexOf('.'));
		const suffix = pathname.substring(pathname.lastIndexOf('.'));
		const localisedSuffix = localisationTag === "" ? "" : ("-" + localisationTag);
		const localisedFilename = withoutSuffix + localisedSuffix + suffix;
		// TODO: handle a file not exists error and fall back to the default filename
		return fs.readFileSync(localisedFilename, { encoding: 'utf8' }).replace(/^\uFEFF/, ''); //strips the BOM
	},

	loadInkStory: function(filename, localisationTag) {
		const Story = inkjs.Story;
		return new StoryWrapper(new Story(this.loadInkData(filename, localisationTag)));
	},

	//----------------------------------------------------
	// external function bindings

	bindFunctions: function(story) {
		[
			["link_var", this.external_LinkVar],
			["link_switch", this.external_LinkSwitch],
			["link_actor_name", this.external_LinkActorName],
			["rmmv_var", this.external_rmmvVar],
			["rmmv_switch", this.external_rmmvSwitch],
			["cast", this.external_cast],
			["cast_link", this.external_castLink],
			["expression", this.external_expression],
		].forEach(([name, func]) => {
			story.bindExternal(name, func.bind(this));
		});
	},

	external_LinkVar: function(variableRef, rmmvVariable) {
		console.log('link_var', variableRef, rmmvVariable);
		this.variableBindings[variableRef] = rmmvVariable;
		this.getStory().getVariable(variableRef, $gameVariables.value(rmmvVariable));
	},

	external_LinkSwitch: function(variableRef, rmmvSwitch) {
		console.log('link_switch', variableRef, rmmvSwitch);
		this.switchBindings[variableRef] = rmmvSwitch;
		this.getStory().setVariable(variableRef, $gameSwitches.value(rmmvSwitch));
	},

	external_LinkActorName: function(variableRef, rmmvActorIndex) {
		console.log('link_actor_name', variableRef, rmmvActorIndex);
		this.actorNameBindings[variableRef] = rmmvActorIndex;
		// works the opposite way to linking variables - the RMMV name is overwritten with
		// the name defined in the story. This is to allow Ink to control localised names.
		$gameActors.actor(rmmvActorIndex).setName(this.getStory().getVariable(variableRef));
	},

	external_cast: function(name, rmmvImageName, defaultImageIndex) {
		console.log('cast', name, rmmvImageName, defaultImageIndex);
		this.cast.addCastEntry(name, false, rmmvImageName, defaultImageIndex);
	},

	external_castLink: function(nameRef, rmmvActorIndex, rmmvImageName, defaultImageIndex) {
		console.log('cast_link', nameRef, rmmvActorIndex, rmmvImageName, defaultImageIndex);
		this.cast.addCastEntry(nameRef, true, rmmvImageName, defaultImageIndex);
		this.external_LinkActorName(nameRef, rmmvActorIndex);
	},

	external_expression: function(expression, rmmvImageIndex) {
		console.log('expression', expression, rmmvImageIndex);
		this.cast.addGenericExpression(expression, rmmvImageIndex);
	},

	external_rmmvVar: function(variable) {
		return $gameVariables.value(variable);
	},

	external_rmmvSwitch: function(variable) {
		return $gameSwitches.value(variable);
	},

	//----------------------------------------------------
	// save/load

	makeSaveContents: function() {
		return {
			state: this.getStory().jsonState,
			variables: this.variableBindings,
			switches: this.switchBindings,
			actorNames: this.actorNameBindings,
			cast: this.cast.makeSaveContents(),
		};
	},

	extractSaveContents: function(savedData) {
		console.log("LOAD", savedData, savedData.state);
		this.getStory().jsonState = savedData.state;
		this.variableBindings = savedData.variables;
		this.switchBindings = savedData.switches;
		this.actorNameBindings = savedData.actorNames;
		this.cast.extractSaveContents(savedData.cast);
	},

	//----------------------------------------------------
	// state

	go: function(optionalPath) {
		console.log("INK ", optionalPath);
		if (optionalPath) {
			this.setInkPath(optionalPath);
		}
		this.active = true;
		this.stopAfterMessage = false;
	},

	stop: function() {
		console.log("INK: stopping");
		this.stopAfterMessage = true;
	},

	isActive: function() {
		return this._childInterpreter.isActive() || this.active;
	},

	//----------------------------------------------------
	// Ink paths

	setInkPath: function(target) {
		// TODO: call resolvePath on this?
		console.log("setting target to", target)
		this.getStory().jumpTo(target);
	},

	//----------------------------------------------------
	// action queue - for when we want to do something when
	// the message box isn't busy

	enqueueAction: function(action) {
		this._queuedActions.push(action);
	},

	dequeueAndRunAction: function() {
		if (this._queuedActions.length > 0) {
			const next = this._queuedActions.splice(0, 1)[0];
			console.log("Ink: running queued action", next);
			next();
			return true;
		}
		return false;
	},

	//----------------------------------------------------
	// variable syncing for automatically synced variables

	syncVariablesToRmmv: function(story) {
		for (let inkVariable of Object.keys(this.variableBindings)) {
			$gameVariables.setValue(this.variableBindings[inkVariable], story.getVariable(inkVariable));
		}
		for (let inkVariable of Object.keys(this.switchBindings)) {
			$gameSwitches.setValue(this.switchBindings[inkVariable], story.getVariable(inkVariable));
		}
		for (let inkVariable of Object.keys(this.actorNameBindings)) {
			let actor = $gameActors.actor(this.actorNameBindings[inkVariable]);
			actor.setName(story.getVariable(inkVariable));
		}
	},

	syncVariablesToInk: function(story) {
		for (let inkVariable of Object.keys(this.variableBindings)) {
			story.setVariable(inkVariable, $gameVariables.value(this.variableBindings[inkVariable]));
		}
		for (let inkVariable of Object.keys(this.switchBindings)) {
			story.getVariable(inkVariable, $gameSwitches.value(this.switchBindings[inkVariable]));
		}
		for (let inkVariable of Object.keys(this.actorNameBindings)) {
			let actor = $gameActors.actor(this.actorNameBindings[inkVariable]);
			story.getVariable(inkVariable, actor.name());
		}
	},

	//----------------------------------------------------
	// update

	update: function() {
		if (this._childInterpreter.update() || $gameMessage.isBusy()) {
			return;
		}
		if (!this.dequeueAndRunAction() && this.active) {
			const story = this.getStory();
			const tags = this.advanceStory(story);
			const canShowChoices = this.processActionHashtags(tags);
			if(canShowChoices) {
				this.checkChoices(story);
			}
			if (!story.canContinue && !story.hasChoices) {
				this.stop();
			}
			if (this.stopAfterMessage && !$gameMessage.hasText()) {
				console.log("Ink: deactivating");
				this.active = false;
			}
		}
	},

	/**
	 * Only used for internal setup, like running the init knot or getting the cast.
	 */
	getBulkContent: function(story) {
		this.syncVariablesToInk(story);
		let lines = story.getAllAvailableLines();
		this.syncVariablesToRmmv(story);
		return lines;
	},

	advanceStory: function(story) {
		if (story.canContinue) {
			this.syncVariablesToInk(story);
			const {content, tags} = story.getNextLine();
			this.syncVariablesToRmmv(story);
			console.log("Ink: content with tags: ", content, tags);
			if (content != "") {
				this.showContent(content, tags);
			}
			return tags;
		}
		return [];
	},

	checkChoices: function(story) {
		if(!story.canContinue && story.hasChoices) {
			const choicesText = story.currentChoices.map( choice => choice.text );
			this._outputHandler.showChoices(choicesText, selection => {
				this.getStory().choose(selection);
			});
		}
	},

	showContent: function(content, tags) {
		// TODO: word wrapping, buffering leftover text for next time
		const displayData = this._outputHandler.getDisplayData(content, tags)
		Object.assign(
			displayData,
			this.cast.getDisplayData(displayData.content, tags, this.getStory())
		);
		console.log(displayData);
		this._outputHandler.showContentInMessageBox(displayData);
	},

	//----------------------------------------------------
	// non-display hashtag processing

	matchHashtagCommand: function(tag, command) {
		return tag.startsWith(command + '(')
	},

	getHashtagCommandParams: function(tag) {
		let paramStart = tag.indexOf('(') + 1;
		let paramEnd = tag.indexOf(')', paramStart);
		if (paramEnd === -1) return [];
		let parameterText = tag.substring(paramStart, paramEnd);
		return parameterText.split(/,/).map(x => {
			let trimmed = x.trim();
			if (trimmed.length === 0) return null;
			else return trimmed;
		});
	},

	// return true if choices can be shown this tick, false if something
	// else is going on and the choices (if any) should be shown when
	// the engine is next free
	processActionHashtag: function(tag) {
		if (tag === 'interrupt') {
			this.stop();
		} else if (this.matchHashtagCommand(tag, 'common_event')) {
			let params = this.getHashtagCommandParams(tag);
			let commonEventIndex = Number.parseInt(params[0]);
			console.log("LWP_Ink running common event " + commonEventIndex);
			this.runCommonEvent(commonEventIndex);
			return false;
		} else if (this.matchHashtagCommand(tag, 'battle')) {
			let params = this.getHashtagCommandParams(tag);
			this.enqueueAction(() => {
				this.startBattle(
					Number.parseInt(params[0]),
					this.getStory().resolvePath(params[1]),
					this.getStory().resolvePath(params[2]),
					this.getStory().resolvePath(params[3])
				);
			});
			this.stop();
			return false;
		}
		return true;
	},

	processActionHashtags: function(tags) {
		let canShowChoices = true;
		for (let tag of tags) {
			canShowChoices = canShowChoices && this.processActionHashtag(tag);
		}
		return canShowChoices;
	},

	//----------------------------------------------------
	// embedded interpreter for running common events

	runCommonEvent: function(event) {
		this._childInterpreter.initFromCommonEvent(event);
	},

	//----------------------------------------------------
	// battle

	startBattle: function(troopId, winTarget, escapeTarget, loseTarget) {
		// this is a copy of the code for starting a battle in Game_Interpreter.prototype.command301
		if (!$gameParty.inBattle()) {
			troopId = troopId || $gamePlayer.makeEncounterTroopId();
			if ($dataTroops[troopId]) {
				BattleManager.setup(troopId, !!escapeTarget, !!loseTarget);
				BattleManager.setEventCallback(result => {
					if (result === 0 && winTarget) {
						// success
						this.go(winTarget);
					} else if (result === 1 && escapeTarget) {
						// escape/abort
						this.go(escapeTarget);
					} else if (result === 2 && loseTarget) {
						// defeat
						this.go(loseTarget);
					}
				});
				$gamePlayer.makeEncounterCount();
				SceneManager.push(Scene_Battle);
			}
		}
	}
}

//////////////////////////////////////////////////////////////////
// Game_Map - hooking into the update cycle
//////////////////////////////////////////////////////////////////

const Game_MapUpdateEvents = Game_Map.prototype.updateEvents;
Game_Map.prototype.updateEvents = function() {
	Game_MapUpdateEvents.call(this);
	LWP_InkManager.update();
}

//////////////////////////////////////////////////////////////////
// BattleManager - hooking into the update cycle
//////////////////////////////////////////////////////////////////

const oldBattleManagerUpdateEventMain = BattleManager.updateEventMain;
BattleManager.updateEventMain = function() {
	let isBusy = oldBattleManagerUpdateEventMain.call(this);
	if (!isBusy) {
		LWP_InkManager.update();
		return LWP_InkManager.isActive();
	} else {
		return isBusy;
	}
}

//////////////////////////////////////////////////////////////////
// Game_Interpreter - handling the plugin command that starts everything
//////////////////////////////////////////////////////////////////

PluginManager.registerCommand("LWP_Ink", "ink", function(args) {
	this.setWaitMode('ink');
	LWP_InkManager.go(args.target);
});

const oldGame_InterpreterUpdateWaitMode = Game_Interpreter.prototype.updateWaitMode;
Game_Interpreter.prototype.updateWaitMode = function() {
	if (this._waitMode === 'ink' && LWP_InkManager.isActive()) {
		return true;
	}
	return oldGame_InterpreterUpdateWaitMode.call(this);
}

//////////////////////////////////////////////////////////////////
// DataManager
// for hooking into save/load
//////////////////////////////////////////////////////////////////
const oldDataManagerMakeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
	let contents = oldDataManagerMakeSaveContents.call(this);
	contents.LWP_Ink = LWP_InkManager.makeSaveContents();
	return contents;
}

const oldDataManagerExtractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
	oldDataManagerExtractSaveContents.call(this, contents);
	LWP_InkManager.extractSaveContents(contents.LWP_Ink);
}

//////////////////////////////////////////////////////////////////
// Window_Base - allowing Ink to be called to supply text
// anywhere. In theory this includes output from Ink itself that
// is showing in a message window, but please don't do that! It
// may work, but it is not supported. It is intended for item
// names and descriptions, etc.
// It also does not support choices - if it finds a choice, it
// won't show it, only the text preceeding it.
// Ink shown this way also won't change state - it won't update
// "seen" counts, and it won't make any other changes to the Ink
// state. This is another reason why it shouldn't be used for
// message bog messages!
//////////////////////////////////////////////////////////////////

const oldWindow_Base_convertEscapeCharacters =
	Window_Base.prototype.convertEscapeCharacters;
const inkAnywhereRegex = /\{ink:([^}]+)\}/ig;
Window_Base.prototype.convertEscapeCharacters = function(text) {
	text = oldWindow_Base_convertEscapeCharacters.call(this, text);
	let savedData = null;
	const story = () => {
		const _story = LWP_InkManager.getStory();
		savedData = _story ? _story.jsonState : null;
		return _story;
	};
	text = text.replace(inkAnywhereRegex, (match, inkAddress) => {
		LWP_InkManager.setInkPath(inkAddress);
		return LWP_InkManager.getBulkContent(story()).map( x => x.content ).join("\n");
	});
	if (savedData) {
		LWP_InkManager.getStory().jsonState = savedData;
	}
	return text;
};


//////////////////////////////////////////////////////////////////
// Global export, so other scripts can call it
//////////////////////////////////////////////////////////////////
window.LWP_InkManager = LWP_InkManager;

})();
