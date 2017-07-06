import fs from 'fs';

module.exports = () => `
---
title: WarCode Core Documentation
---

${fs.readFileSync('README.md', 'utf-8')}

## Docs
* [Getting Started](getting-started)
* [Gameplay](gameplay)
* [Match Configuration](match-config)
  `;
