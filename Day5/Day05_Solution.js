const path = require('path');

function checkFileExtension(filePath, expectedExtension) {
	let ext = path.extname(filePath);
	if (ext === "") {
		console.log("No extension found in the given path.");
		return;
	}

	if (ext === expectedExtension) {
		console.log(`File has the expected extension: ${ext}`);
		return;
	}
	else {
		console.log(`File does not have the expected extension. Expected: ${expectedExtension}, Actual: ${ext}`);
	}
}

checkFileExtension('test-files/file1.txt', '.txt');
// Expected Output: File has the expected extension: .txt

checkFileExtension('test-files/image.png', '.jpg');
// Expected Output: File does not have the expected extension. Expected: .jpg, Actual: .png
