const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'styles');
const output = fs.createWriteStream(path.join(__dirname, '/project-dist/bundle.css'));

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Произошла ошибка при чтении папки:', err);
    return;
  }

  let pendingFiles = files.length;

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const fileExtension = path.extname(file);
    
    if (fileExtension === '.css') {
        const input = fs.createReadStream(filePath, 'utf-8')
        input.on('data', chunk => output.write(chunk));
        input.on('end', () => {
            pendingFiles--;
            if (pendingFiles === 0) {
                output.end();
            };
        });
    };
  });
});