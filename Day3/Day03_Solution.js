const cp = require('child_process');
const { error } = require('console');
const { stdout, stderr } = require('process');

function executeCommand(command) {
	cp.exec(command, (error, stdout, stderr) => {
		if (error) {
			console.log(`Error occured ececuting ${command}`);
			return;
		}

		if (stderr) {
			console.log(`Command had errors ${stderr}`);
			return;
		}

		console.log(`Command Output: \n${stdout}`);
	})
}

executeCommand('dir Day3/b');	//showing contents of directory 

executeCommand('echo "Hello, Node.js!"');
// Expected Output: Hello, Node.js!