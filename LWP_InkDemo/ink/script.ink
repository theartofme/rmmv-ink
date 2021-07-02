== init ==
// the Ink compiler doesn't always work well unless the EXTERNAL definitions are
// run before any other knot, so it's wise to put them in the init knot.
EXTERNAL link_var(ref varname, x)
EXTERNAL link_switch(ref varname, x)
EXTERNAL link_actor_name(ref varname, x)
EXTERNAL rmmv_var(x)
EXTERNAL rmmv_switch(x)
EXTERNAL cast(name, image, default_index)
EXTERNAL cast_link(ref name, actor_index, image, default_index)
EXTERNAL expression(expression_name, index)

// The init knot is always called first.
// When LWP_Ink is first used, it looks for this knot first, and if it finds it,
// it runs it. If it doesn't find it it doesn't care. It doesn't matter where you
// put the init knot, it will be run first.
VAR initialised=false
~ link_switch(initialised, 1)
~ initialised=true

-> DONE

== dramatis_personae ==
// cast (or dramatis_personae if you are using the cast() function, because you can't
// have a function with the same name as a knot) is run immediately after init.
// Unlike init it does not change the Ink "state" - any variables set get reset to
// default, the current position is rewound to before, etc. The only thing that
// can happen in this knot is setting up the LWP_Ink cast.
// Each cast member is a single line, starting with the "tag" that you will use to
// refer to that person in your Ink script from now on. There are additional functions
// you can use as well:
// name(Joe) sets the name that will appear in message boxes when lines tagged with this cast member are shown. If a name is not set, then the "tag" is used as the name.
// actor(1) sets the actor that is linked to this cast member. If an actor is linked, the actor's face set in the RPG Maker database will be used as the face in the message box, and the actor's name will be synced from Ink to RPG Maker.
// image(People2, 7) sets the face that will be used in the messge box for this cast member. This takes precedence over the actor's face, if an actor is also set for this cast member. Careful with lowercase/uppercase, the filename must match exactly! Unlike many things in RPG Maker, the number of the face image starts from 0, not 1.
R: actor(1) name(Reid)
Syd: image(People2, 7)
-> DONE

== intro ==
= src_intro
You will find these books next to an event that uses Ink. #dim #middle
They usually contain the Ink script used for the event. #dim #middle
Lines usually start with a greater-than sign, in order to prevent the Ink parser from recognising cast tags, like this: #dim #middle
>This is a line from the Ink script. #dim #middle
->DONE
= hello_world
This text comes from an Ink script.
Each line in Ink becomes a new message window in RPG Maker.
This isn't much use by itself though, because we have no control over the message box!
You can use any escape codes you normally use in RPG Maker, for example:
\\\{large text \\\}normal text \\C[3]Coloured text \\C[1]\\\{BUT
You need to use \\C[1]Two\\C backslashes every place you would normally only use one.
You also need a backslash in front of any \{\}. See the "script.ink" file to see how the escape codes in this message were done.
-> DONE
= hello_world_src
>This text comes from an Ink script. #dim #middle
>Each line in Ink becomes a new message window in RPG Maker. #dim #middle
>This isn't much use by itself though, because we have no control over the message box! #dim #middle
>\\\{large text \\\}normal text \\C[3]Coloured text \\C[1]\\\{BUT
>You need to use \\C[1]Two\\C backslashes every place you would normally only use one.
>You also need a backslash in front of any \{\}. See the "script.ink" file to see how the escape codes in this message were done.
-> DONE
= message_styles
We can change message box styles using hashtags in Ink.
The \#dim hashtag shows a message box using the "Dim" background. #dim
The \#transparent hashtag shows a message box using the "Transparent" background. #transparent
You can control window position with \#top, \#middle and \#bottom. This one is using \#middle. #middle
Position and background can be combined, just like in RPG Maker. This is \#top \#dim. #top #dim
-> DONE
= message_styles_src
>We can change message box styles using hashtags in Ink. #dim #middle
>The \#dim hashtag shows a message box using the "Dim" background. \#dim #dim #middle
>The \#transparent hashtag shows a message box using the "Transparent" background. \#transparent #dim #middle
>You can control window position with \#top, \#middle and \#bottom. This one is using \#middle. \#middle #dim #middle
>Position and background can be combined, just like in RPG Maker. This is \#top \#dim. \#top \#dim #dim #middle
-> DONE

TODO: hashtags for actor images, then show the better way using dramatis personae. Save cast() for "advanced".

= setting_up_a_cast
-> DONE

= script_style_dialog
Syd: This dialogue uses the "script" format. It is a convenient way to show messages with automatic name boxes and face images.
R: How do you use the script format?
Syd: Just write a line in your ink file starting with a name, a colon, and whatever you want that person to say.
Syd: For example, if you have this line: Syd: Hi!
Syd: Hi!
Syd: Check the book next to me to see how it's done.
-> DONE
= script_style_dialog_src
>Syd: This dialogue uses the "script" format. It is a convenient way to show messages with automatic name boxes and face images. #dim #middle
>R: How do you use the script format? #dim #middle
>Syd: Just write a line in your ink file starting with a name, a colon, and whatever you want that person to say. #dim #middle
>Syd: For example, if you have this line: Syd: Hi! #dim #middle
>Syd: Hi! #dim #middle
>Syd: Check the book next to me to see how it's done. #dim #middle
-> DONE

== names
TODO
-> DONE

== faces_and_expressions
TODO
-> DONE

== talking_to_rmmv
TODO
-> DONE

== tips_and_tricks

= when_ink_is_initialised
Syd: Ink is initialised when you first call it. It is NOT initialised when the game starts!
->DONE

= ink_choices_for_dialogue_trees
* [This choice can only be chosen once]
	R: Now that you have chosen it, it cannot be chosen again, even if you save and reload.
+ [This choice can be chosen multiple times] ->
	** [But this sub-choice can only be chosen once]
	++ [This sub-choice can always be chosen]
		It doesn't do anything though.
+ [Where's the hidden choice?] You need to fight the Fox Scribe first.
+ {rmmv_switch(2)} [This choice is only available if you fought the Fox Scribe]
	R: Congratulations on beating or running away from the Fox Scribe!
	R: The choice used an Ink condition in front of a choice. The condition used the rmmv_switch() function, which checks the value of a switch in RPG Maker.
	R: (It works in RPG Maker MV and MZ, even though it's called rmmv_switch!)
	R: You can do the same thing using linked variables and switches, but rmmv_switch is convenient for one-offs like this.
- ->DONE

= ink_alternatives_for_rotating_description
{&->ink_sequences1|->ink_sequences2|R: You can embed dialogue directly into the sequence if you like, but the lines get a little long, and any hashtags you use must apply to the whole line.|->ink_sequences4|->ink_sequences5}
= ink_sequences1
R: This description is nice, but it would be boring if I repeated the same one each time.
-> DONE
= ink_sequences2
R: So it's lucky that a different description is used each time!
-> DONE
= ink_sequences4
R: Ink has other kinds of alternatives for rotating content. This is a cycle, but give sequences, shuffles, and once-only a try too!
-> DONE
= ink_sequences5
R: It will loop back to the first description, but it's still more interesting this way.
-> DONE

= mystery_characters
Myst: Sometimes you'd like a character's name to be a secret in some dialogues, and reveal the name later.
TODO: show how to do this!
->DONE

// These placeholder functions are not called; they make sure the Ink compiler
// produces a file that will run. Without these placeholders weird things can happen.
=== function link_var(ref varname, x)
{false: "placeholder"}
=== function link_switch(ref varname, x)
{false: "placeholder"}
=== function link_actor_name(ref varname, x)
{false: "placeholder"}
=== function rmmv_var(x)
~ return 0
=== function rmmv_switch(x)
~ return false
=== function cast(name, image, default_index)
{false: "placeholder"}
=== function cast_link(ref name, actor_index, image, default_index)
{false: "placeholder"}
=== function expression(expression_name, index)
{false: "placeholder"}
