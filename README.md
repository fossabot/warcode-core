# warcode-core

[![Build Status](https://travis-ci.org/matthewspivey/warcode-core.svg?branch=master)](https://travis-ci.org/matthewspivey/warcode-core)
[![Code Climate](https://codeclimate.com/github/matthewspivey/warcode-core/badges/gpa.svg)](https://codeclimate.com/github/matthewspivey/warcode-core)

Game state manager for WarCode. You can use it to easily build standalone
browser games, bots, history analyzers, and multiplayer game services.
To accomplish this, it

* runs in a browser or Node service running ES5,
* includes no runtime dependencies,
* allows the consumer to control randomness,
* and maintains state of a match in a single, immutable data structure.

The use of pure functions and a single, read-only data store fit Redux's
Three Principles and the State-Action-Model pattern.

All player actions are captured as simple, serializable objects. This allows
implementations to easily communicate over a message bus or websocket. It allows
us to implement the event sourcing pattern, meaning we can reliably recreate the
game state from player actions.

## Learn more
* [Gameplay](./docs/mechanics.md) - gameplay diagram and documentation
* [Example AI Bot](./examples/bot/index.js) - example bot that makes random moves
* [Documentation for action creators](./docs/action-creators.md) - API docs for action creators
