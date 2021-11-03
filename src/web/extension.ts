// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { PawDrawEditorProvider } from './pawDrawEditor';
import { MemFS } from './fileSystemProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(PawDrawEditorProvider.register(context));
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld-web-sample" is now active in the web extension host!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('helloworld-web-sample.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from helloworld-web-sample in a web extension host!');

		// Create and show panel
		const panel = vscode.window.createWebviewPanel(
			'catCoding',
			'Cat Coding',
			vscode.ViewColumn.One,
			{ // Enable scripts in the webview
				enableScripts: true, //Set this to true if you want to enable Javascript. 
				retainContextWhenHidden: true,
			}
        );

        // And set its HTML content
        panel.webview.html = getWebviewContent();
	});

	context.subscriptions.push(disposable);

	console.log('MemFS says "Hello"');

    const memFs = new MemFS();

    context.subscriptions.push(vscode.workspace.registerFileSystemProvider('memfs', memFs, { isCaseSensitive: true }));

    // add the folder to the current workspace
    vscode.workspace.updateWorkspaceFolders(0, 0, { uri: vscode.Uri.parse('memfs:/'), name: "MemFS - Sample" });
    // most common files types
    const enc = new TextEncoder(); // always utf-8
    const content = enc.encode("This is a string converted to a Uint8Array")
    memFs.writeFile(vscode.Uri.parse(`memfs:/file.txt`), content, { create: true, overwrite: true });
    // memFs.createDirectory(vscode.Uri.parse(`memfs:/folder/`));


    context.subscriptions.push(vscode.commands.registerCommand('memfs.reset', _ => {
        for (const [name] of memFs.readDirectory(vscode.Uri.parse('memfs:/'))) {
            memFs.delete(vscode.Uri.parse(`memfs:/${name}`));
        }
    }));

    context.subscriptions.push(vscode.commands.registerCommand('memfs.addFile', _ => {
        const enc = new TextEncoder(); // always utf-8
        const content = enc.encode("This is a string converted to a Uint8Array")
        memFs.writeFile(vscode.Uri.parse(`memfs:/file.txt`), content, { create: true, overwrite: true });
        vscode.window.showInformationMessage('File added!');

    
    }));

    context.subscriptions.push(vscode.commands.registerCommand('memfs.deleteFile', _ => {
        memFs.delete(vscode.Uri.parse('memfs:/file.txt'));
    }));

    // Create a status bar item
    const status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
    context.subscriptions.push(status);
    status.text = "Add file"
    status.tooltip = "click to add a new file"
    status.command = 'memfs.addFile'
    status.show();
    
}


function getWebviewContent() {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Cat Coding</title>
  </head>
  <body>
	  <iframe src="https://kaibu.org/#/app" width="100%" style="height: 100vh;" height="100%"></iframe>
  </body>
  </html>`;
}

// this method is called when your extension is deactivated
export function deactivate() {}

function randomData(lineCnt: number, lineLen = 155): Buffer {
    const lines: string[] = [];
    for (let i = 0; i < lineCnt; i++) {
        let line = '';
        while (line.length < lineLen) {
            line += Math.random().toString(2 + (i % 34)).substr(2);
        }
        lines.push(line.substr(0, lineLen));
    }
    return Buffer.from(lines.join('\n'), 'utf8');
}
