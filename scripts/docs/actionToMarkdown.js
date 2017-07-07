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
          descriptionParagraphs.push(values.map(v => ':----').join(' | '));
        }
      });
    }
  });

  return descriptionParagraphs.join('\n');
};

const paramsToRows = params => params
  .filter(({ title }) => title === 'param')
  .map(
    ({ name, description, type }) =>
      `\`${name}\` | \`${type.name}\` | ${appendDescriptions(description)}`
  );

const paramSignature = params => params
  .filter(({ title }) => title === 'param')
  .map(({ name, type }) => `${name}: ${type.name}`)
  .join(', ');

const docActionCreatorExample = examples => {
  if (examples.length < 1) {
    return;
  }

  return `
##### Example
\`\`\` javascript
${examples.map(example => example.description.split('\n').map(l => l.trim()).join('\n'))}
\`\`\`
  `
}

module.exports = (name, doc) => `### ${name}<a name="${name.toLowerCase()}"></a>

*${doc.summary.children ? doc.summary.children[0].children[0].value : ''}*

![${name} state diagram](./${name.toLowerCase()}.svg)

${appendDescriptions(doc.description)}

${name} actions must contain the following:

Field        | Type       | Description
:----------- | :--------- | :----------
\`type\`     | \`string\` | "\`${name}\`"
${paramsToRows(doc.params).join('\n')}

#### Action creator
\`actionCreators.${name}(${paramSignature(doc.params)})\`

${docActionCreatorExample(doc.examples)}
  `;
