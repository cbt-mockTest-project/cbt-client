const fs = require('fs');

const vfsBefore = 'this.pdfMake = this.pdfMake || {}; this.pdfMake.vfs = ';
const vfsAfter = ';';
const sourcePath = './public/fonts';
const vfsFilename = './node_modules/pdfmake/build/vfs_fonts.js';

var vfs = {};

if (!fs.existsSync(sourcePath)) {
  console.error('Source path "' + sourcePath + '" not found.');
  return;
}

console.log('Source path:', sourcePath);
console.log('');

var files = fs.readdirSync(sourcePath);

files.forEach(function (file) {
  var fileBase64 = fs.readFileSync(sourcePath + '/' + file).toString('base64');
  console.log('FILE:', file);

  vfs[file] = fileBase64;
});

const vfsFileContent = vfsBefore + JSON.stringify(vfs, null, 2) + vfsAfter;
fs.writeFileSync(vfsFilename, vfsFileContent);

console.log('');
console.log('Builded ' + files.length + ' files to ' + vfsFilename + '.');
