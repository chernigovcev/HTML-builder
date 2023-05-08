const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, '/secret-folder');


fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Произошла ошибка при чтении папки:', err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);

    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(`Ошибка при получении информации о файле "${file}":`, err);
        return;
      }
      const fileType = stats.isFile(file)
      const fileName = path.basename(file);
      const fileExtension = path.extname(file);
      const fileSize = stats.size;

      if (fileType === true)
        console.log(`${fileName.slice(0, fileName.indexOf('.'))} - ${fileExtension.slice(1)} - ${fileSize / 1000}kb`);
    });
  });
});