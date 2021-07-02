
Integrates the Ink (https://www.inklestudios.com/ink/) scripting language into RPG Maker MV. Provides plugin
commands for triggering Ink, allows sharing variables between Ink and RMMV, and provides some extension
functions and hashtags that allow more control over RMMV from within Ink.

Please see the plugin files themselves for the most up-to-date documentation.

## Getting Started

If you are using RPG Maker MV, download `LWP_Ink.js`. If you are using RPG Maker MZ, download `LWPZ_Ink.js`. Work has mostly stopped on `LWP_Ink.js`, so `LWPZ_Ink.js` has additional functionality not present in `LWP_Ink.js`.

### Installation

~Download the javascript port of the Ink engine from here: https://github.com/y-lohse/inkjs
Take the copy of `ink.js` from the `templates/browser_serverless` folder and put it in your RMMV plugins
folder (`js/plugins`).~ The current distribution of inkjs has an old version of ink.js. You must build it yourself from https://github.com/y-lohse/inkjs. As a convenience, I've included a pre-built copy of `ink.js` and `ink-es2015.js` in the included demo project, they can both be found in the folder `LWP_InkDemo/js/plugins`. Copy one into your RPG Maker plugins folder.

Both `ink.js` and `ink-es2015.js` should be ok for RPG Maker MZ, but you should use `ink.js` for RPG Maker MV. Only use one!

Download `LWP_Ink.js` or `LWPZ_Ink.js` from this repo and put it in your RPG Maker plugins folder, too.

Add both `ink.js` and `LWP_Ink.js`/`LWPZ_Ink.js` to your plugins in RPG Maker. `ink.js` *must* be higher in the list than
`LWP_Ink.js`; drag them around to make sure this is the case if it's not already. If using RPG Maker MZ, it will complain that `the plugin "ink" may not support RPG Maker MZ.` This error can be safely ignored.

It's also highly recommended to use `YEP_MessageCore` (http://www.yanfly.moe/wiki/Message_Core_(YEP) in RPG Maker MV, or `VisuMZ_1_MessageCore` in RPG Maker MZ, to handle word wrapping. Another plugin that provides word wrapping should work equally well.

