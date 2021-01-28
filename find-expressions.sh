#!/bin/sh

# Simple Linux shell script to find all lines of dialog with a hashtag. Since
# I mostly use hashtags fo expressions, this helps find all expressions so I
# can add any missing ones.
# Only works with script-style dialog, with actor names before the dialog like so:
# Canary: I only sing when I'm happy. 

grep ":.*#" *.ink | sed 's/:[^#]*#/ #/' | sort | uniq
