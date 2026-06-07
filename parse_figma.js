const fs = require('fs');

const data = JSON.parse(fs.readFileSync('figma_data.json', 'utf8'));

function extractNodes(node, depth = 0) {
  let indent = '  '.repeat(depth);
  if (node.type === 'TEXT') {
    console.log(`${indent}[TEXT] "${node.characters}"`);
    console.log(`${indent}  Font: ${node.style?.fontFamily} ${node.style?.fontWeight}, Size: ${node.style?.fontSize}`);
    console.log(`${indent}  Color: rgba(${node.fills?.[0]?.color?.r}, ${node.fills?.[0]?.color?.g}, ${node.fills?.[0]?.color?.b}, ${node.fills?.[0]?.color?.a})`);
  } else {
    let bg = node.fills?.[0]?.color ? `rgba(${node.fills[0].color.r}, ${node.fills[0].color.g}, ${node.fills[0].color.b}, ${node.fills[0].color.a})` : 'none';
    console.log(`${indent}[${node.type}] ${node.name} (bg: ${bg})`);
  }

  if (node.children) {
    for (let child of node.children) {
      extractNodes(child, depth + 1);
    }
  }
}

const rootNodes = data.document.children;
for (let child of rootNodes) {
  console.log(`\n=== PAGE: ${child.name} ===`);
  extractNodes(child);
}
