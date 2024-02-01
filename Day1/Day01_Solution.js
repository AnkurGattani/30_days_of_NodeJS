const fs = require('fs');

function readFileContents(filePath) {
	fs.readFile(filePath, "utf8", (err, data) => {
		if (err) {
			console.log("Error Occured: Cannot Read File \n");
			return;
		}
		if (data === "") {
			console.log("[empty File!]");
			return;
		}
		else {
			console.log("File Contents:");
			console.log(data, "\n");
		}
	});
}

readFileContents("./test/text.txt");
readFileContents("./test/emptyFile.txt");
readFileContents("./test/nonexistent.txt");