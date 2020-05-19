/*:
 * @plugindesc Integrates the Ink story scripting language (https://www.inklestudios.com/ink/) into RPG Maker.
 * @author Logan Pickup
 * 
 * @help 

Integrates the [Ink](https://www.inklestudios.com/ink/) scripting language into RPG Maker MV. Provides plugin
commands for triggering Ink, allows sharing variables between Ink and RMMV, and provides some extension
functions and hashtags that allow more control over RMMV from within Ink.

## Quick Start

### Installation

Download the javascript port of the Ink engine from here: https://github.com/y-lohse/inkjs
Take the copy of `ink.js` from the `templates/browser_serverless` folder and put it in your RMMV plugins
folder (`js/plugins`). Download `LWP_Ink.js` from this repo and put it in your RMMV plugins folder, too.

Add both `ink.js` and `LWP_Ink.js` to your plugins in RMMV. `ink.js` *must* be higher in the list than
`LWP_Ink.js`; drag them around to make sure this is the case if it's not already.

It's also highly recommended to use the [YEP_MessageCore](http://www.yanfly.moe/wiki/Message_Core_(YEP))
plugin to handle word wrapping. This plugin has only been tested with YEP_MessageCore; if you need it to work
with a different word wrapping plugin let me know.

### Usage

First you need to export your Ink script as JSON. From Inkle, select File->Export to JSON... and save the
file as `inkscript.ink.json` in your game's `data` folder. You need to repeat this export process whenever
you make changes to the script in Inkle.

In order to start running Ink from RMMV, just use the plugin command `INK`. Without parameters it starts the
Ink script from the begnning and continues until it reaches the end. It is probably more useful to use it
to start at specific paths; just put the knot's name (including a dot and the stitch, if desired), for example:

```
INK admitted_to_something.i_know_where
```

This plugin will continue to run Ink until it stops via `-> END` or `-> DONE`, although some special tags can
affect this behaviour; see the section on hashtags below. This makes it convenient to, for example, have a knot
in Ink per NPC or per scene:

```
=== npc_alice ===
* [Just ask Alice]
	When I was ten feet tall?
+ [I'll be on my way]
- -> DONE
```

And then when you interact with this NPC in game, use the plugin command `INK npc_alice`, and have Ink figure
out what the dialogue options are. See below for more integration options.

## Integration with RPG Maker MV

### Message Boxes

The text from Ink is passed as-is to RPG Maker MV. This means that you can use any RMMV escape codes you want to,
as long as anything that conflicts with Ink syntax is escaped properly. You should also be able to use custom
escape codes and notetags that any plugins you use allow.

LWP_Ink also has its own set of controls over the message boxes using Ink hashtags; see the section on hashtags
below.

### Variables

RMMV variables can be accessed from Ink using the external functions `rmmv_var()` and `rmmv_switch()` (see the
seection on external functions below). These functions return the current value of a variable or a switch. If
you want to check the state of an Ink variable from RMMV, you must use the `link_var()` and `link_switch()`
external functions instead. These functions link an Ink variable to an RMMV variable or switch, allowing updates
to pass between both engines; if a change to a variable is made in Ink, it is updated in RMMV; and if a variable
is updated in RMMV, it is also changed in Inky.

Example:

```
VAR foo = 0
~ link_var(foo, 1)
```

And from then on, the variable "foo" is synced between Ink and the RMMV variable 1. If you do the following
in Ink:

```
~ foo = 13
```

Then RMMV will see the updated value in variable 1; similarly, if you change variable 1 in RMMV, then
`foo` in Ink will also get the changed value.

Only number and string variables are supported for syncing between Ink and RMMV.

If the Ink variable type is a boolean (i.e. it is initially set to true or false) then it should be synced
with an RMMV switch instead using `link_switch()`. If the Ink variable is then later assigned a non-boolean type
(something other than true or false) in Ink then you will not get the results you expect; please don't do
this.

There is no method for getting Ink variables from RMMV plugin code.

### Loading and Saving

Ink state is saved as a part of the savegame. Certain pieces of state are not saved if the game is saved in the
middle of displaying content, and any currently-running common event is not saved either. It shouldn't be possible
to save the game at these points, so it shouldn't be a problem.

### When Ink Can Be Called

Ink can be called anywhere the plugin command action is allowed - i.e. the map or in a battle. It doesn't work as
well inside a battle, though, and you should first use RMMV commands to disable the battle input if you're planning
on showing a lot of dialogue. Ink has no commands for controlling RMMV state except for the `#common_event` hashtag;
see the section on hashtags below.

### Plugin Commands

* `INK`
     Starts Ink from wherever it left off; starts at the beginning if it hasn't started yet. Does nothing
     if the Ink script has ended.
     Once started, Ink will keep running until an interrupt allows RPG Maker to take over again.
     Ink will not start running until it is able to show a message box; it will not pause the current
     event or stop it from running.
* `INK path`
     Starts Ink at the specified knot (You can use "." to specify a stitch, too) instead of where
     it left off or where it would normally start.

### External Functions
The following external functions are available in Ink. They need to be defined
at the top of one of your ink files using the syntax shown.

* `EXTERNAL link_var(ref varname, x)`
     Links the variable `varname` to the RMMV variable `x`. The values will be automatically synced when
     going from/to Ink. Also, this will set the current value of `varname` to the RMMV variable it is
     linked to immediately.
* `EXTERNAL link_switch(ref varname, x)`
     Links the variable `varname` to the RMMV switch `x`. The values will be automatically synced when
     going from/to Ink. Also, this will set the current value of `varname` to the RMMV switch it is
     linked to immediately.
* `EXTERNAL rmmv_var(x)`
     Retrives the value of RMMV variable `x`.
* `EXTERNAL rmmv_switch(x)`
     Retrives the value of RMMV switch `x`.

### Hashtags

This plugin processes certain hashtags from Ink. The hashtags can be defined at the top of a knot or even
at the top of an Ink script if you need the same flags for all messages; there is no "override" mechanism
though, so if you have `#bottom` at the top of a knot and then `#middle` for a single line of text, that
line of text will get _both_ `#top` and `#bottom` hashtags, and the final location of the message box might
not be where you want it, so make sure you really want the hashtag to appear everywhere before you do this.

"Action" hashtags like `#common_event` or `#battle` should only ever be used for single lines.

The following hashtags can be used:

* `#top`, `#middle` and `#bottom`
	Move the message window to the top, middle or bottom - same as the "Window Position" field in RMMV's
	show text command.
* `#window`, `#dim` and `#transparent`
	Controls the background of the message box - same as the "Background" field in RMMV's show text command.
* `#Actor1`, `#Actor1,4`
	If the hashtag is the name of a face image, then it will be used as the face for the message box. Case is
	important - it will not find the image if the capitalisation is wrong. Optionally you can also put the
	subimage to use; if not specified, it defaults to 0.
* `#interrupt`
	Stops running Ink after showing the tagged content. Calling the plugin command `INK` without
	any parameters will continue from the next piece of content.
* `#common_event(x)`
	Runs the common event x. Control will pass over to the common event until it finishes, after which Ink
	will resume again. If Ink is called again from the common event then the current Ink knot will be
	overwritten by the new target, but Ink will still not start running until the common event finishes;
	this is unintuitive, so it is best to just avoid calling Ink from a common event called by Ink.
* `#battle(troopId,winTarget,escapeTarget,loseTarget)`
	Starts a battle. It is possible to just pass control to a common event and start the battle from there,
	but this way allows you to jump easily jump to different Ink paths based on the outcome of the battle
	(it is still possible with a common event by using linked variables). This hashtag also stops Ink
	running, just like `#interrupt` - if you want to continue the Ink dialogue during the battle, do the
	`INK` plugin command from within the battle itself.
	`troopId` is the number of the troop to use for the battle. If set to 0, or not set, the troop is
	determined randomly using RMMV's normal mechanism.
	`winTarget` is the path to go to in Ink if the battle is won.
	`escapeTarget` is the path to go to in Ink if the battle is escaped from or aborted.
	`loseTarget` is the path to go to in Ink if the battle is lost.
	`winTarget`,`escapeTarget`, and `loseTarget` can take the same format of paths that Ink can: either
	a knot, a knot.stitch, or a stitch by itself, provided the stitch is in the current knot and the
	stitch does not have the same name as a knot.
	Any parameter can be omitted, and if `escapeTarget` ot `loseTarget` are omitted then the battle
	cannot be escaped from or will end in game over if the battle is lost, respectively. For example,
	to prevent escape but prevent a game over: `#battle(0,win,,lose)`

 */
(function () {

//////////////////////////////////////////////////////////////////
// LWP_InkManager
// A class to hold all the Ink methods and data, so it can be
// used and overridden more easily by other plugins
//////////////////////////////////////////////////////////////////

// global visibility
LWP_InkManager = function() {
    throw new Error('This is a static class');
}

//----------------------------------------------------
// init

LWP_InkManager._inkStory = null;    // only accessed directly by LWP_InkManager.getStory()
LWP_InkManager.inkStoryFilename = "data/inkscript.ink.json";
LWP_InkManager.active = false;
LWP_InkManager.variableBindings = {};
LWP_InkManager.switchBindings = {};
LWP_InkManager._queuedActions = [];
LWP_InkManager._childInterpreter = null;

LWP_InkManager.getStory = function() {
    if (!this._inkStory) {
        this._inkStory = this.loadInkStory(this.inkStoryFilename);
        this.bindFunctions(this._inkStory);
    }
    return this._inkStory;
}

LWP_InkManager.loadInkData = function(filename) {
    const fs = require('fs');
    const path = require('path');
    const base = path.dirname(process.mainModule.filename);
    const pathname = path.join(base, filename);
    return fs.readFileSync(pathname, { encoding: 'utf8' }).replace(/^\uFEFF/, ''); //strips the BOM
}

LWP_InkManager.loadInkStory = function(filename) {
    const Story = inkjs.Story;
    return new Story(this.loadInkData(filename));
}

//----------------------------------------------------
// external function bindings

LWP_InkManager.bindFunctions = function(story) {
    story.BindExternalFunction ("link_var", this.external_LinkVar);
    story.BindExternalFunction ("link_switch", this.external_LinkSwitch);
    story.BindExternalFunction ("rmmv_var", this.external_rmmvVar);
    story.BindExternalFunction ("rmmv_switch", this.external_rmmvSwitch);
}

LWP_InkManager.external_LinkVar = function(variableRef, rmmvVariable) {
    console.log(variableRef, rmmvVariable);
    this.variableBindings[variableRef] = rmmvVariable;
    this.getStory().variablesState[variableRef] = $gameVariables.value(rmmvVariable);
}.bind(LWP_InkManager);

LWP_InkManager.external_LinkSwitch = function(variableRef, rmmvSwitch) {
    console.log(variableRef, rmmvSwitch);
    this.switchBindings[variableRef] = rmmvSwitch;
    this.getStory().variablesState[variableRef] = $gameSwitches.value(rmmvSwitch);
}.bind(LWP_InkManager);

LWP_InkManager.external_rmmvVar = function(variable) {
    return $gameVariables.value(variable);
}.bind(LWP_InkManager);

LWP_InkManager.external_rmmvSwitch = function(variable) {
    return $gameSwitches.value(variable);
}.bind(LWP_InkManager);

//----------------------------------------------------
// save/load

LWP_InkManager.makeSaveContents = function() {
    const story = this.getStory();
    return {
        state: story.state.ToJson(),
        variables: this.variableBindings,
        switches: this.switchBindings
    };
}

LWP_InkManager.extractSaveContents = function(savedData) {
    const story = this.getStory();
    console.log("LOAD", savedData, savedData.state);
    story.state.LoadJson(savedData.state);
    this.variableBindings = savedData.variables;
    this.switchBindings = savedData.switches;
}

//----------------------------------------------------
// state

LWP_InkManager.go = function(optionalPath) {
    if (optionalPath) {
        this.setInkPath(optionalPath);
    }
    this.active = true;
}

LWP_InkManager.stop = function() {
    this.active = false;
}

LWP_InkManager.isActive = function() {
    return (this._childInterpreter && this._childInterpreter.isRunning()) || this.active;
}

//----------------------------------------------------
// Ink paths

LWP_InkManager.setInkPath = function(target) {
    // TODO: call resolvePath on this?
    this.getStory().ChoosePathString(target);
}

// Takes what might be a partial path (stitch only), and returns a fully qualified
// path including the knot. If the path is already qualified, returns it as-is; if
// the path is already the name of a knot, also returns it as-is. If neither of
// those conditions are true, prepends the current knot to the path.
// This does not guarantee that the result is a valid path; Ink provides no mechanism
// to list paths, and the only way to validate it is by attempting to use it, which
// we might not want to do yet.
LWP_InkManager.resolvePath = function(path) {
    if (path === null || path === undefined) return path;
    // already fully qualified
    if (path.indexOf('.') !== -1) return path;
    const story = this.getStory();
    // the name of a knot - doesn't need further qualification
    if (story.KnotContainerWithName(path)) return path;
    // getting the current knot is *really* hacky
    const previousPath = story.state.callStack.currentThread.previousPointer.path.toString();
    const dotIndex = previousPath.indexOf('.');
    const currentKnot = dotIndex === -1 ? previousPath : previousPath.substring(0, dotIndex);
    return currentKnot + '.' + path;
}

//----------------------------------------------------
// action queue - for when we want to do something when
// the message box isn't busy

LWP_InkManager.enqueueAction = function(action) {
    this._queuedActions.push(action);
}

LWP_InkManager.dequeueAndRunAction = function() {
    if (this._queuedActions.length > 0) {
        const next = this._queuedActions.splice(0, 1)[0];
        next();
        return true;
    }
    return false;
}

//----------------------------------------------------
// variable syncing for automatically synced variables

LWP_InkManager.syncVariablesToRmmv = function(story) {
    for (let inkVariable of Object.keys(this.variableBindings)) {
        $gameVariables.setValue(this.variableBindings[inkVariable], story.variablesState[inkVariable]);
    }
    for (let inkVariable of Object.keys(this.switchBindings)) {
        $gameSwitches.setValue(this.switchBindings[inkVariable], story.variablesState[inkVariable]);
    }
}

LWP_InkManager.syncVariablesToInk = function(story) {
    for (let inkVariable of Object.keys(this.variableBindings)) {
        story.variablesState[inkVariable] = $gameVariables.value(this.variableBindings[inkVariable]);
    }
    for (let inkVariable of Object.keys(this.switchBindings)) {
        story.variablesState[inkVariable] = $gameSwitches.value(this.switchBindings[inkVariable]);
    }
}

//----------------------------------------------------
// core output: content and choices

LWP_InkManager.showContentInMessageBox = function(content, displayData) {
    $gameMessage.setFaceImage(displayData.face, displayData.faceIndex);
    $gameMessage.setBackground(displayData.background);
    $gameMessage.setPositionType(displayData.position);
    if ($gameMessage.addText) {
        // YEP_MessageCore support - this will use word wrapping if enabled
        $gameMessage.addText(content);
    } else {
        $gameMessage.add(content);
    }
}

LWP_InkManager.checkFaceTag = function(tag) {
    const validFaceNames = listInPath('img/faces', 'png');
    faceTagCandidate = tag.split(',');
    if (validFaceNames.indexOf(faceTagCandidate[0]) !== -1) {
        let face = faceTagCandidate[0];
        let faceIndex = 0;
        if (faceTagCandidate.length > 1) {
            faceIndex = Number.parseInt(faceTagCandidate[1]);
        }
        return {face: face, faceIndex: faceIndex};
    }
    return null;
}

// this method only parses hashtags that directly affect displayed
// content. See processActionHashtags for hashtags that cause other
// effects. The general rule is that this method should have no side
// effects - it should only return an object that will later be
// passed to LWP_InkManager.showContentInMessageBox so the content
// can be displayed appropriately.
LWP_InkManager.parseDisplayHashtags = function(tags) {
    const displayData = {
        face: '',
        faceIndex: 0,
        position: 2,
        background: 0
    };
    for (let tag of tags) {
        faceTagData = this.checkFaceTag(tag);
        if (faceTagData) {
            displayData.face = faceTagData.face;
            displayData.faceIndex = faceTagData.faceIndex;
        } else if (/top/i.test(tag)) {
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

LWP_InkManager.showContent = function(content, tags) {
    // TODO: word wrapping, buffering leftover text for next time
    const displayData = this.parseDisplayHashtags(tags);
    this.showContentInMessageBox(content, displayData);
}

LWP_InkManager.showChoices = function(choices, callback) {
    // TODO: error on choices that are too long?
    $gameMessage.setChoices(choices, 0 /*defaultType*/, -1 /*cancelType*/);
    $gameMessage.setChoiceBackground(0);
    $gameMessage.setChoicePositionType(2);
    $gameMessage.setChoiceCallback(callback);
}

//----------------------------------------------------
// update

LWP_InkManager.update = function() {
    if (this.updateChild() || $gameMessage.isBusy()) {
        return;
    }
    if (!this.dequeueAndRunAction() && this.active) {
        const story = this.getStory();
        const tags = this.advanceStory(story);
        const canShowChoices = this.processActionHashtags(tags);
        if(canShowChoices) {
            this.checkChoices(story);
        }
        if (!story.canContinue && story.currentChoices.length === 0) {
            this.stop();
        }
    }
}

LWP_InkManager.advanceStory = function(story) {
    if (story.canContinue) {
        this.syncVariablesToInk(story);
        const content = story.Continue();
        this.syncVariablesToRmmv(story);
        const tags = story.currentTags;
        if (!content.match(/^\s*$/)) {
            this.showContent(content, tags);
        }
        return tags;
    }
    return [];
}

LWP_InkManager.checkChoices = function(story) {
    if(!story.canContinue && story.currentChoices.length > 0) {
        const choices = story.currentChoices;
        const choicesText = choices.map( choice => choice.text );
        this.showChoices(choicesText, selection => {
            this.getStory().ChooseChoiceIndex(selection);
        });
    }
}

//----------------------------------------------------
// non-display hashtag processing

LWP_InkManager.matchHashtagCommand = function(tag, command) {
    return tag.startsWith(command + '(')
}

LWP_InkManager.getHashtagCommandParams = function(tag) {
    let paramStart = tag.indexOf('(') + 1;
    let paramEnd = tag.indexOf(')', paramStart);
    if (paramEnd === -1) return [];
    let parameterText = tag.substring(paramStart, paramEnd);
    return parameterText.split(/,/).map(x => {
        let trimmed = x.trim();
        if (trimmed.length === 0) return null;
        else return trimmed;
    });
}

// return true if choices can be shown this tick, false if something
// else is going on and the choices (if any) should be shown when
// the engine is next free
LWP_InkManager.processActionHashtag = function(tag) {
    if (tag === 'interrupt') {
        this.stop();
    } else if (this.matchHashtagCommand(tag, 'common_event')) {
        let params = this.getHashtagCommandParams(tag);
        this.runCommonEvent(Number.parseInt(params[0]));
        canShowChoices = false;
    } else if (this.matchHashtagCommand(tag, 'battle')) {
        let params = this.getHashtagCommandParams(tag);
        this.enqueueAction(() => {
            this.startBattle(
                Number.parseInt(params[0]),
                this.resolvePath(params[1]),
                this.resolvePath(params[2]),
                this.resolvePath(params[3])
            );
        });
        this.stop();
        return false;
    }
    return true;
}

LWP_InkManager.processActionHashtags = function(tags) {
    let canShowChoices = true;
    for (tag of tags) {
        canShowChoices = canShowChoices && this.processActionHashtag(tag);
    }
    return canShowChoices;
}

//----------------------------------------------------
// embedded interpreter for running common events

LWP_InkManager.updateChild = function() {
    if (this._childInterpreter) {
        this._childInterpreter.update();
        if (this._childInterpreter.isRunning()) {
            return true;
        } else {
            this._childInterpreter = null;
        }
    }
    return false;
};

LWP_InkManager.runCommonEvent = function(event) {
    const list = $dataCommonEvents[event].list
    this._childInterpreter = new Game_Interpreter(1);
    this._childInterpreter.setup(list, 0);
}

//----------------------------------------------------
// battle

LWP_InkManager.startBattle = function(troopId, winTarget, escapeTarget, loseTarget) {
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

const oldGame_InterpreterPluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    if (/ink/i.test(command)) {
        const target = args[0];
        LWP_InkManager.go(target);
        this.setWaitMode('ink');
        return;
    };
    oldGame_InterpreterPluginCommand.call(this, command, args);
};

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
// filesystem - utility functions. Not exposed externally.
//////////////////////////////////////////////////////////////////

function getExtension(filename) {
    const dot = filename.lastIndexOf('.');
    if (dot === -1) return '';
    return filename.substring(dot + 1, filename.length);
}

function arrayify(maybeAnArrayOrMaybeNot) {
    if (Array.isArray(maybeAnArrayOrMaybeNot)) {
        return maybeAnArrayOrMaybeNot;
    } else {
        return [maybeAnArrayOrMaybeNot];
    }
}

const _listInPath_cache = {};
function listInPath(dir, allowedFileTypes) {
    allowedFileTypes = arrayify(allowedFileTypes);
    const key = dir + ':' + allowedFileTypes.join(',');
    let cachedValue = _listInPath_cache[key];
    if (cachedValue === undefined) {
        allowedFileTypes = allowedFileTypes.map( x => x.toLowerCase() );
        const fs = require('fs');
        const path = require('path');
        const base = path.dirname(process.mainModule.filename);
        const fullpath = path.join(base, dir);
        const entries = fs.readdirSync(fullpath);
        if (allowedFileTypes) {
            cachedValue = entries
                .filter( filename => allowedFileTypes.indexOf(getExtension(filename).toLowerCase()) !== -1)
                .map( filename => filename.substring(0, filename.lastIndexOf('.')));
        } else {
            cachedValue = entries;
        }
        _listInPath_cache[key] = cachedValue;
    }
    return cachedValue;
}

})();
