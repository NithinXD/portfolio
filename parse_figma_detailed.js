const fs = require('fs');

const data = JSON.parse(fs.readFileSync('figma_data.json', 'utf8'));

let md = '# Figma Design Analysis\n\n';

md += `**Document Name:** ${data.name || 'Untitled'}\n`;
md += `**Last Modified:** ${data.lastModified}\n\n`;

function formatColor(fill) {
  if (!fill || !fill.color) return 'none';
  const r = Math.round(fill.color.r * 255);
  const g = Math.round(fill.color.g * 255);
  const b = Math.round(fill.color.b * 255);
  const a = fill.color.a.toFixed(2);
  const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return `rgba(${r}, ${g}, ${b}, ${a}) / #${hex}`;
}

function processNode(node, depth = 0) {
  const indent = '  '.repeat(depth);
  const bbox = node.absoluteBoundingBox;
  let bg = node.fills && node.fills[0] ? formatColor(node.fills[0]) : 'none';
  
  md += `${indent}- **[${node.type}]** ${node.name}\n`;
  
  if (bbox) {
    md += `${indent}  - Size: ${Math.round(bbox.width)}x${Math.round(bbox.height)}, Position: (${Math.round(bbox.x)}, ${Math.round(bbox.y)})\n`;
  }
  
  if (bg !== 'none') {
    md += `${indent}  - Fill: ${bg}\n`;
  }
  
  if (node.strokes && node.strokes.length > 0) {
    let stroke = formatColor(node.strokes[0]);
    md += `${indent}  - Stroke: ${stroke} (${node.strokeWeight}px)\n`;
  }
  
  if (node.type === 'TEXT') {
    md += `${indent}  - Text Content: "${node.characters}"\n`;
    md += `${indent}  - Font: ${node.style?.fontFamily} ${node.style?.fontWeight}, Size: ${node.style?.fontSize}px\n`;
  }

  if (node.children) {
    for (let child of node.children) {
      processNode(child, depth + 1);
    }
  }
}

const rootNodes = data.document.children;
for (let child of rootNodes) {
  md += `## Page: ${child.name}\n\n`;
  if (child.children) {
    for (let n of child.children) {
      processNode(n, 0);
    }
  }
  md += '\n';
}

fs.writeFileSync('C:\\Users\\nithi\\.gemini\\antigravity-ide\\brain\\1951b695-62ed-4d84-a205-9a2ea3f2afc3\\figma_analysis.md', md, 'utf-8');
console.log('Analysis written to figma_analysis.md');
