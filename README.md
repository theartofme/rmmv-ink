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
