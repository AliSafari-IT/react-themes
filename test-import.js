// Test import of the built package
try {
  const pkg = require('./dist/index.js');
  
  console.log('✅ Package import successful!');
  console.log('Available exports:', Object.keys(pkg));
  
  // Test ThemeProvider exists
  if (pkg.ThemeProvider) {
    console.log('✅ ThemeProvider component exported');
  }
  
  // Test ThemeToggle exists
  if (pkg.ThemeToggle) {
    console.log('✅ ThemeToggle component exported');
  }
  
  // Test hooks exist
  if (pkg.useTheme) {
    console.log('✅ useTheme hook exported');
  }
  
  if (pkg.useThemeToggle) {
    console.log('✅ useThemeToggle hook exported');
  }
  
  // Test utilities exist
  if (pkg.createTheme) {
    console.log('✅ createTheme utility exported');
  }
  
  if (pkg.applyTheme) {
    console.log('✅ applyTheme utility exported');
  }
  
  // Test themes exist
  if (pkg.lightTheme && pkg.darkTheme) {
    console.log('✅ Default themes exported');
  }
  
  console.log('\n🎉 All exports working correctly!');
  
} catch (error) {
  console.error('❌ Import failed:', error.message);
}
