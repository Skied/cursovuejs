var fs = require('fs');
var path = require('path');

if (process.argv.length != 3) {
    console.log('Error executing script');
    console.log('Usage: node translations.js lang.json');
    return;
}

if (process.argv[2].indexOf('.json') === -1) {
    console.log('Error executing script');
    console.log('File must be JSON file');
    return;
}

var fileName = process.argv[2];
const directoryPath = path.join(__dirname, 'src/locales/');
var desiredFilePath = path.join(directoryPath, fileName);
if (!fs.existsSync(desiredFilePath)) {
    console.log('Error executing script');
    console.log(`File \'${desiredFilePath}\' does not exist`);
    return;
}

function recursivelySort(data) {
    if (typeof (data) === 'object') {
        var result = {};
        var orderedKeys = Object.keys(data).sort();
        orderedKeys.forEach((key) => {
            result[key] = recursivelySort(data[key]);
        });
        return result;
    } else {
        return data;
    }
}

function checkMissingTranslations(ori, dest) {
    var oriKeys = Object.keys(ori);
    oriKeys.forEach((key) => {
        if (!dest.hasOwnProperty(key)) {
            if (typeof (ori[key]) === 'object') {
                dest[key] = {};
                checkMissingTranslations(ori[key], dest[key]);
            } else {
                dest[key] = '';
            }
        } else {
            if (typeof (ori[key]) === 'object') {
                checkMissingTranslations(ori[key], dest[key]);
            }
        }
    });
}

var dataTranslations = fs.readFileSync(desiredFilePath, 'utf8');
var translations = recursivelySort(JSON.parse(dataTranslations.toString()));
fs.writeFileSync(desiredFilePath, JSON.stringify(translations, null, 2));

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        console.log('Unable to scan directory: ' + err);
        return;
    }
    files.forEach(function (file) {
        if (file !== fileName) {
            var filePath = directoryPath + file;
            var dataFile = fs.readFileSync(filePath, 'utf8');
            var translationsFile = JSON.parse(dataFile.toString());
            checkMissingTranslations(translations, translationsFile);
            translationsFile = recursivelySort(translationsFile);
            fs.writeFileSync(filePath, JSON.stringify(translationsFile, null, 2));
        }
    });
});
