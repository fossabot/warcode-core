const appendDescriptions = description => {
  const descriptionParagraphs = [];
  description.children.forEach(c1 => {
    if (c1.type === 'paragraph') {
      c1.children.forEach(c2 => {
        descriptionParagraphs.push(
          c2.value.replace(/(\r\n|\n|\r\w)/gm, ' ').replace(/\s\s+/g, ' ')
        );
      });
    } else if (c1.type === 'table') {
      descriptionParagraphs.push('');
      c1.children.forEach((row, i) => {
        const cells = row.children.map(content => content.children[0]);
        const values = cells.map(cell => (cell && cell.value ? cell.value : ''));
        descriptionParagraphs.push(values.join(' | '));
        if (i === 0) {
          descriptionParagraphs.push(values.map(v => '----').join(' | '));
        }
      });
    }
  });

  return descriptionParagraphs.join('\n');
};

const appendSummary = summary => {
  if (!summary) return;

  return `*${summary.children[0].children[0].value}*`;
};

const docAction = (name, { description, summary }, diagramURL) => `
# ${name}

${appendSummary(summary)}

${appendDescriptions(description)}

![${name} state diagram](${diagramURL})
  `;

const docActionFormat = (name, { params }) => {
  const rows = params
    .filter(({ title }) => title === 'param')
    .map(
      ({ name, description, type }) =>
        `\`${name}\` | \`${type.name}\` | ${appendDescriptions(description)}`
    );

  return `
## Action Object Format
The ${name} actions must contain the following:

Field        | Type       | Description
------------ | ---------- | -----------
\`type\`     | \`string\` | "\`${name}\`"
${rows.join('\n')}
`;
};

const docActionCreator = ({ name, params, examples }) => {
  // TODO - how do we know if the parameters are in the correct order?
  const paramSignature = params
    .filter(({ title }) => title === 'param')
    .map(({ name, type }) => `${name}: ${type.name}`)
    .join(', ');

  const example = examples
    .map(
      ({ description }) => `
### Example
\`\`\`javascript
${description.split('\n').map(l => l.trim()).join('\n')}
\`\`\`
  `
    )
    .join('\n');

  return `
## Action creator
\`${name}(${paramSignature})\`

${example}
  `;
};

// Displays guard function. Disabled due to ugly transpiled version.
// const docActionGuard = t => {
//   const f = t({}, {}).guard.toString();
//   const guardBlock = f.slice(f.indexOf('{') + 1, f.lastIndexOf('}'));
//   return `
// ## Guard
// \`\`\`javascript
// ${guardBlock}
// \`\`\`
//   `;
// };

module.exports = (actionName, doc, t, diagramURL) => `
${docAction(actionName, doc, diagramURL)}
${docActionFormat(actionName, doc)}
${docActionCreator(doc)}
  `;
