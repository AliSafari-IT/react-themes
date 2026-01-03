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
  execSync('git add .', { stdio: 'inherit' });
  
  // Only commit if there are changes
  try {
    execSync(`git commit -m "chore: bump version to v${version}"`, { stdio: 'inherit' });
  } catch (commitError) {
    if (commitError.message.includes('nothing to commit')) {
      console.log('No changes to commit, proceeding with tag...');
    } else {
      throw commitError;
    }
  }
  
  // Only tag if it doesn't exist
  try {
    execSync(`git tag v${version}`, { stdio: 'inherit' });
  } catch (tagError) {
    if (tagError.message.includes('already exists')) {
      console.log(`Tag v${version} already exists, proceeding with push...`);
    } else {
      throw tagError;
    }
  }
  
  execSync('git push', { stdio: 'inherit' });
  execSync('git push --tags', { stdio: 'inherit' });
  
  console.log(`✅ Released v${version} successfully!`);
} catch (error) {
  console.error('❌ Release failed:', error.message);
  process.exit(1);
}
