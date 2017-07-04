# WarCode Core

[![Build Status](https://travis-ci.org/matthewspivey/warcode-core.svg?branch=master)](https://travis-ci.org/matthewspivey/warcode-core)
[![Code Climate](https://codeclimate.com/github/matthewspivey/warcode-core/badges/gpa.svg)](https://codeclimate.com/github/matthewspivey/warcode-core)
[![Test Coverage](https://codeclimate.com/github/matthewspivey/warcode-core/badges/coverage.svg)](https://codeclimate.com/github/matthewspivey/warcode-core/coverage)
[![Dependency Status](https://gemnasium.com/badges/github.com/matthewspivey/warcode-core.svg)](https://gemnasium.com/github.com/matthewspivey/warcode-core)

WarCode Core is used by standalone Risk browser games, bots, and multiplayer game services.

Notable characteristics
* ♿ ES5 - transpiled code works in old browser and Node versions
* 🚫 small package ~ 24 KB uncompressed
* 🎲 caller controls randomness of dice and cards
* λ functional JavaScript using an immutable data structure

It borrows from both the [event sourcing](https://martinfowler.com/eaaDev/EventSourcing.html)  and [State-Action-Model](http://sam.js.org/) patterns. It captures player actions and returns the state of the game as a single data structure.
