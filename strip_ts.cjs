const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.jsx')) results.push(file);
    }
  });
  return results;
}

const files = walk('c:/Users/arshp/Desktop/vortex day 1/src');
let updatedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  content = content.replace(/ as 'en' \| 'hi' \| 'te'/g, '');
  content = content.replace(/ as const/g, '');
  content = content.replace(/ as keyof typeof itemConfig\.theme/g, '');
  content = content.replace(/ as keyof typeof config/g, '');
  content = content.replace(/ as React\.CSSProperties/g, '');
  content = content.replace(/ as keyof typeof payloadPayload/g, '');
  content = content.replace(/ as keyof typeof payload/g, '');
  content = content.replace(/ as string/g, '');
  content = content.replace(/ as FormFieldContextValue/g, '');
  content = content.replace(/ as FormItemContextValue/g, '');
  content = content.replace(/ as ToasterProps\["theme"\]/g, '');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
    updatedCount++;
  }
});

console.log('Total files updated: ' + updatedCount);
