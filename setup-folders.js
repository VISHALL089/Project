import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = __dirname;
const src = path.join(root, 'src');

const dirs = [
  'app',
  'modules/job-portal',
  'modules/readiness',
  'modules/resume-builder',
  'shared/components',
  'shared/store',
  'shared/types',
  'shared/hooks',
  'assets'
];

// Create directories
dirs.forEach(d => {
  fs.mkdirSync(path.join(src, d), { recursive: true });
});

// Copy source files function
const copyRecursiveSync = function(srcPath, destPath) {
  if (!fs.existsSync(srcPath)) return;
  const stats = fs.statSync(srcPath);
  const isDirectory = stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(destPath)) fs.mkdirSync(destPath, { recursive: true });
    fs.readdirSync(srcPath).forEach(function(childItemName) {
      copyRecursiveSync(path.join(srcPath, childItemName), path.join(destPath, childItemName));
    });
  } else {
    fs.copyFileSync(srcPath, destPath);
  }
};

const sourceRoot = path.join(root, '..', '_source');

if (fs.existsSync(sourceRoot)) {
  console.log('Found source repositories. Migrating...');
  
  // Copy job-portal
  const jobPortalSrc = path.join(sourceRoot, 'job-portal', 'src');
  if (fs.existsSync(jobPortalSrc)) {
    copyRecursiveSync(jobPortalSrc, path.join(src, 'modules', 'job-portal'));
    console.log('✓ Migrated job-portal');
  }

  // Copy readiness
  const readinessSrc = path.join(sourceRoot, 'readiness', 'src');
  if (fs.existsSync(readinessSrc)) {
    copyRecursiveSync(readinessSrc, path.join(src, 'modules', 'readiness'));
    console.log('✓ Migrated readiness');
  }

  // Copy resume-builder
  const resumeSrc = path.join(sourceRoot, 'resume-builder', 'src');
  if (fs.existsSync(resumeSrc)) {
    copyRecursiveSync(resumeSrc, path.join(src, 'modules', 'resume-builder'));
    console.log('✓ Migrated resume-builder');
  }
} else {
  console.log('Warning: _source directory not found at ' + sourceRoot);
}

console.log('Folder structure creation and migration complete!');
