import fs from 'fs';

module.exports = (actions, stateDiagramURL) => `# Match Config
To setup a game match, we need some configuration to define game board and cards.

\`\`\` javascript
${fs.readFileSync('data/traditional.json', 'utf-8')}
\`\`\`
  `;
