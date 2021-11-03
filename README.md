# Hello World Sample

This is a Hello World Web Extension example that shows you how to write a extension that runs in VS Code Web (alone)

Guide for this sample: https://code.visualstudio.com/api/extension-guides/web-extensions.


## VS Code API

### `vscode` module

- [`commands.registerCommand`](https://code.visualstudio.com/api/references/vscode-api#commands.registerCommand)
- [`window.showInformationMessage`](https://code.visualstudio.com/api/references/vscode-api#window.showInformationMessage)

### Contribution Points

- [`browser`](https://code.visualstudio.com/api/references/extension-manifest)

- [`contributes.commands`](https://code.visualstudio.com/api/references/contribution-points#contributes.commands)

## Running the Sample

- Run `npm install` in terminal to install dependencies
- Run the `Run Web Extension` target in the Debug View. This will:
	- Start a task `npm: watch` to compile the code
	- Run the extension in a new VS Code window that contains a web extension host
- To test in vscode.dev, run the following command in 3 terminal windows:
	- `npm run watch-web`
	- `npx serve --cors -l 5000`
	- `npx localtunnel -p 5000`
	Then install the extension via its URL at https://vscode.dev

