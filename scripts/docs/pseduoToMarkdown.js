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

module.exports = (from, to, { description }) => `### ${from} ⇒ ${to}

${appendDescriptions(description)}
  `;
