# WarCode Core

[![Build Status](https://travis-ci.org/matthewspivey/warcode-core.svg?branch=master)](https://travis-ci.org/matthewspivey/warcode-core)
[![Code Climate](https://codeclimate.com/github/matthewspivey/warcode-core/badges/gpa.svg)](https://codeclimate.com/github/matthewspivey/warcode-core)
[![Test Coverage](https://codeclimate.com/github/matthewspivey/warcode-core/badges/coverage.svg)](https://codeclimate.com/github/matthewspivey/warcode-core/coverage)

JavaScript rules engine for WarCode apps.

It is being used for standalone browser games, bots, and multiplayer game services.

Notable characteristics
* ♿ ES5 - transpiled code works in old browser and Node versions
* 🚫 small package with no runtime dependencies
* 🎲 caller controls randomness of dice and cards
* λ functional JavaScript operating on an immutable data structure

It borrows from both [event sourcing](https://martinfowler.com/eaaDev/EventSourcing.html)  and [State-Action-Model](http://sam.js.org/) patterns. It captures player actions and returns the state of the game as a single data structure.
