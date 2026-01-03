const fs = require('fs');
const path = require('path');

function walk(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fp = path.join(dir, file);
    const stat = fs.statSync(fp);
    if (stat.isDirectory()) walk(fp, filelist);
    else filelist.push(fp);
  });
  return filelist;
}

function patch() {
  const pkgDir = path.join(__dirname, '..', 'node_modules', 'stylis-plugin-rtl');
  if (!fs.existsSync(pkgDir)) {
    console.warn('stylis-plugin-rtl not found in node_modules — skipping patch');
    return;
  }

  const files = walk(pkgDir).filter((f) => f.endsWith('.js') || f.endsWith('.mjs') || f.endsWith('.cjs'));
  const tsSourceMapRegex = /\/\/[#@]\s?sourceMappingURL=.*\.ts(?:\.map)?\s*$/im;
  let changed = 0;

  files.forEach((file) => {
    try {
      let content = fs.readFileSync(file, 'utf8');
      if (tsSourceMapRegex.test(content)) {
        content = content.replace(tsSourceMapRegex, '');
        fs.writeFileSync(file, content, 'utf8');
        changed += 1;
        console.log('Patched', file);
      }
    } catch (err) {
      // ignore individual file errors
    }
  });

  if (!changed) console.log('No stylis-plugin-rtl JS files required patching.');
}

patch();
