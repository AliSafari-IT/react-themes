#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

// Get current version
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const version = packageJson.version;

console.log(`Releasing version ${version}...`);

// Run commands
try {
  execSync('npm run build', { stdio: 'inherit' });
  
  // Check if tag already exists
  let tagExists = false;
  try {
    execSync(`git rev-parse v${version}`, { stdio: 'pipe' });
    tagExists = true;
  } catch (checkError) {
    tagExists = false;
  }
  
  if (tagExists) {
    console.log(`✅ Tag v${version} already exists. Release already published!`);
    process.exit(0);
  }
  
  // Try to commit package.json changes if any
  try {
    execSync('git add package.json package-lock.json pnpm-lock.yaml 2>/dev/null || true', { stdio: 'pipe' });
    execSync(`git commit -m "chore: bump version to v${version}"`, { stdio: 'inherit' });
  } catch (commitError) {
    // No changes to commit is fine, we'll just tag
    console.log('No version changes to commit, proceeding with tag...');
  }
  
  // Create and push tag
  execSync(`git tag v${version}`, { stdio: 'inherit' });
  execSync('git push', { stdio: 'inherit' });
  execSync('git push --tags', { stdio: 'inherit' });
  
  console.log(`✅ Released v${version} successfully!`);
} catch (error) {
  console.error('❌ Release failed:', error.message);
  process.exit(1);
}
