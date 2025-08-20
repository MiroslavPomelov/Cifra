/*
  Project cleanup script
  - Strips // line comments and /* *\/ block comments from code files
  - Removes noisy debug logs and emoji console lines
  - Scopes to common source folders to avoid breaking configs/build output
*/

const fs = require('fs');
const path = require('path');

const ROOTS = [
  path.join(__dirname, '..', 'backend'),
  path.join(__dirname, '..', 'frontend', 'flower-shop', 'src'),
];

const ALLOWED_DIR_PATTERNS = [
  /src\b/i,
  /order-service\b/i,
];

const EXCLUDE_DIRS = new Set([
  'node_modules', 'dist', 'build', '.next', '.nuxt', '.git', '.idea', '.vscode', 'coverage'
]);

const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.cs']);

function shouldProcessFile(filePath) {
  const ext = path.extname(filePath);
  if (!EXTENSIONS.has(ext)) return false;
  const normalized = filePath.replace(/\\/g, '/');
  return ALLOWED_DIR_PATTERNS.some((re) => re.test(normalized));
}

function stripComments(source) {
  // Remove block comments (/* ... */) conservatively
  let result = source.replace(/\/\*[\s\S]*?\*\//g, '');
  // Remove line comments (//...) but keep URLs (http://) and inside strings (best-effort)
  result = result
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('//')) return '';
      // remove trailing // comments not part of URLs
      const idx = line.indexOf('//');
      if (idx !== -1) {
        const before = line.slice(0, idx);
        const after = line.slice(idx + 2);
        if (!/https?:\/$/.test(before.trim())) {
          // naive check for being inside quotes
          const quoteCount = (before.match(/['"]/g) || []).length;
          if (quoteCount % 2 === 0) return before; // even quotes -> probably code, strip trailing comment
        }
      }
      return line;
    })
    .join('\n');
  return result;
}

function stripNoisyLogs(source) {
  const lines = source.split('\n');
  const filtered = lines.filter((line) => {
    const l = line.trim();
    if (/console\.log\(/.test(l)) return false;
    if (/this\.logger\.(debug|warn)\(/.test(l) && /\[DEBUG\]|🔍|❌|✅|📤/.test(l)) return false;
    if (/logger\.log\(\`\[DEBUG\]/.test(l)) return false;
    return true;
  });
  return filtered.join('\n');
}

function processFile(filePath) {
  try {
    const original = fs.readFileSync(filePath, 'utf8');
    let updated = stripComments(original);
    updated = stripNoisyLogs(updated);
    if (updated !== original) {
      fs.writeFileSync(filePath, updated, 'utf8');
      // eslint-disable-next-line no-console
      console.log('Cleaned:', path.relative(process.cwd(), filePath));
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Failed:', filePath, e.message);
  }
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (EXCLUDE_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.isFile()) {
      if (shouldProcessFile(fullPath)) processFile(fullPath);
    }
  }
}

for (const root of ROOTS) {
  if (fs.existsSync(root)) walk(root);
}

// eslint-disable-next-line no-console
console.log('Cleanup completed');


