const fs = require('fs');
const path = require('path');

// Karena dijalankan di dalam WSL, kita gunakan format path /mnt/c/
const srcDir = '/mnt/c/Users/Administrator/.gemini/antigravity/brain/dba5fc59-64af-4799-8584-0fb08736b6e2';
const destDir = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.copyFileSync(path.join(srcDir, 'lensy_idle_1777539691306.png'), path.join(destDir, 'lensy_idle.png'));
fs.copyFileSync(path.join(srcDir, 'lensy_thinking_1777539706997.png'), path.join(destDir, 'lensy_thinking.png'));
fs.copyFileSync(path.join(srcDir, 'lensy_celebrating_1777539723889.png'), path.join(destDir, 'lensy_celebrating.png'));

console.log('Images copied successfully to:', destDir);
