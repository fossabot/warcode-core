const appendDescriptions = (description) => {
  const descriptionParagraphs = [];
  description.children.forEach(c1 => {
    c1.children.forEach(c2 => {
      descriptionParagraphs.push(c2.value.replace(/(\r\n|\n|\r\w)/gm,''));
    });
  });

  return descriptionParagraphs.join('\n');
};

const docAction = (name, { description }, diagramFilename) => {
  return `
# ${name}
${appendDescriptions(description)}
![${name} state diagram](${diagramFilename})
  `;
};

const docActionFormat = (name, { params }) => {
  const rows = params
    .filter(({ title }) => title === 'param')
    .map(({ name, description, type }) =>
      `\`${name}\` | \`${type.name}\` | ${appendDescriptions(description)}`);

  return `
## Action Object Format
The ${name} actions must contain the following:

Field        | Type       | Description
------------ | ---------- | -----------
\`type\`     | \`string\` | "${name}"
${rows.join('\n')}
`
};

const docActionCreator = ({ name, params, examples }) => {
  // TODO - how do we know if the parameters are in the correct order?
  const paramSignature = params
    .filter(({ title }) => title === 'param')
    .map(({ name, type }) => `${name}: ${type.name}`)
    .join(', ');

  const example = examples.map(({ description }) => `
\`\`\`javascript
${description.split('\n').map(l => l.trim()).join('\n')}
\`\`\`
  `).join('\n');

  return `
## Action creator: \`${name}(${paramSignature})\`
${example}
  `;
};

module.exports = (actionName, doc, diagramFilename) => `
${docAction(actionName, doc, diagramFilename)}
${docActionFormat(actionName, doc)}
${docActionCreator(doc)}
  `;
