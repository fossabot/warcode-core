# WarCode Core

Core package used by Risk browser games, bots, and multi-player game services.

[![Build Status](https://travis-ci.org/matthewspivey/warcode-core.svg?branch=master)](https://travis-ci.org/matthewspivey/warcode-core)
[![Code Climate](https://codeclimate.com/github/matthewspivey/warcode-core/badges/gpa.svg)](https://codeclimate.com/github/matthewspivey/warcode-core)
[![Test Coverage](https://codeclimate.com/github/matthewspivey/warcode-core/badges/coverage.svg)](https://codeclimate.com/github/matthewspivey/warcode-core/coverage)
[![Dependency Status](https://gemnasium.com/badges/github.com/matthewspivey/warcode-core.svg)](https://gemnasium.com/github.com/matthewspivey/warcode-core)

* _Customizable_ - caller controls randomness, game board, and rules
* _ES5_ - transpiled code works in older browser and Node versions
* _Small_ - less than 6 KB compressed

Send WarCode Core the current game state and a player's move, and it returns the
updated game state. The design borrows from both the
[event sourcing](https://martinfowler.com/eaaDev/EventSourcing.html) and
[State-Action-Model](http://sam.js.org/) patterns.

The game rules are implemented as a state machine, and the
[docs](http://matthewspivey.com/warcode-core/) illustrate this using a state diagram.
These diagrams make the docs easier to read, even though they are generated from the code.

http://matthewspivey.com/warcode-core
