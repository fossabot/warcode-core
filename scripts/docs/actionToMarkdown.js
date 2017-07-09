import getDescription from './getDescription';

const paramsToRows = params => params
  .filter(({ title }) => title === 'param')
  .map(
    ({ name, description, type }) =>
      `\`${name}\` | \`${type.name}\` | ${getDescription(description)}`
  );

const paramSignature = params => params
  .filter(({ title }) => title === 'param')
  .map(({ name, type }) => `${name}: ${type.name}`)
  .join(', ');

const docActionCreatorExample = examples =>
  examples.length === 0 ? '' : `##### Example
\`\`\` javascript
${examples.map(example => example.description.split('\n').map(l => l.trim()).join('\n'))}
\`\`\`
  `;

module.exports = (name, doc, svg) => `### ${name}<a name="${name.toLowerCase()}"></a>

*${doc.summary.children ? doc.summary.children[0].children[0].value : ''}*

${svg}

${getDescription(doc.description)}

${name} actions must contain the following:

Field        | Type       | Description
:----------- | :--------- | :----------
\`type\`     | \`string\` | "\`${name}\`"
${paramsToRows(doc.params).join('\n')}

#### Action creator
\`actionCreators.${name}(${paramSignature(doc.params)})\`
${docActionCreatorExample(doc.examples)}
  `;
