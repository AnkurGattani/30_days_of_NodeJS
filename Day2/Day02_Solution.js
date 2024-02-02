const fs = require('fs');

// function writeToFile(filepath, content) {
// 	fs.writeFileSync(filepath, content);
// 	console.log(`Data written to ${filepath}`);
// }

function writeToFile(filePath, content) {
	fs.writeFile(filePath, content, (err) => {
		if (err) {
			console.log("Error Occured: Cannot Write to File \n");
			return;
		}
		else {
			console.log(`Data Written to ${filePath}`);
		}
	});
}

writeToFile('./Day2/test.txt', "This is a sample text added by FileWriter 2");
writeToFile('./non-existent_folder/non-existing.txt', "This is a sample text added by FileWriter");