const fs = require('fs');
const { rm } = require('node:fs/promises');
const path = require('path');

const folderPath = path.join(__dirname, 'files');
const folderNewPath = path.join(__dirname, 'files-copy');

    fs.mkdir(folderNewPath, { recursive: true }, err => {
        if (err) throw err;
    });

rm(folderNewPath, {
  recursive: true,
  force: true,
}).finally(() => {
  fs.mkdir(folderNewPath, err => {
    if (err) throw err;
  });
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

          if (fileType === true) {
            files.forEach(() => {
                fs.copyFile(path.join(folderPath, fileName), path.join(folderNewPath, fileName), err => {
                    if(err) throw err
            })});
          };
        });
    });
  });
});

