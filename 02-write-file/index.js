const fs = require('fs');
const path = require('path');
const readline = require('readline');

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

function handleInput(inputText) {
    if (inputText.toLowerCase() === 'exit') {
        rl.close();
        process.exit();
    }

    output.write(inputText + '\n');
};

rl.question('> Привет!\n> Введите текст для записи в файл: \n', handleInput);

rl.on('close', () => console.log('> Пока!.'));
rl.on('line', handleInput);
