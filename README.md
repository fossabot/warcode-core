# WarCode Core

Core package used by Risk browser games, bots, and multiplayer game services.

[![Build Status](https://travis-ci.org/matthewspivey/warcode-core.svg?branch=master)](https://travis-ci.org/matthewspivey/warcode-core)
[![Code Climate](https://codeclimate.com/github/matthewspivey/warcode-core/badges/gpa.svg)](https://codeclimate.com/github/matthewspivey/warcode-core)
[![Test Coverage](https://codeclimate.com/github/matthewspivey/warcode-core/badges/coverage.svg)](https://codeclimate.com/github/matthewspivey/warcode-core/coverage)
[![Dependency Status](https://gemnasium.com/badges/github.com/matthewspivey/warcode-core.svg)](https://gemnasium.com/github.com/matthewspivey/warcode-core)

* _Customizable_ - caller controlls randomness, game board, and rules
* _ES5_ - transpiled code works in older browser and Node versions
* _Small_ ~6 KB gzipped

Send it the curreng game state and a player's move, and it returns the updated game state. 
Game rules are modeled as a state diagram ([docs](http://matthewspivey.com/warcode-core/)). Its design borrows from both the [event sourcing](https://martinfowler.com/eaaDev/EventSourcing.html)  and [State-Action-Model](http://sam.js.org/) patterns. 
