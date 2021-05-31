// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
// const path = require('path')
// const util = require('util')
// const inspector = require('inspector')

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // console.log('Congratulations, your extension "todo-show" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('todo-show.TodoShow', function() {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        const editor = vscode.window.activeTextEditor;

        // vscode.window.showInformationMessage('Hello World from ToDo Show!');

        if (!editor) {
            vscode.window.showInformationMessage('Error: editor does not exist');
            return;
        }

        const text = editor.document.getText()

        var arr = []
        for (var i = 0; i < text.length; i++) {
            if (text.slice(i, i + 7) == "//ToDo:") {
                arr.push(text.slice(i + 7, text.indexOf("\n", i + 7)))
            }
            if (text.slice(i, i + 7) == "/*ToDo:") {
                arr.push(text.slice(i + 7, text.indexOf("*/", i + 7)))
            }
        }

        vscode.window.terminals.forEach(function(terminal) {
            terminal.dispose()
        })

        const terminal = vscode.window.createTerminal()
        terminal.show()

        // if (ensureTerminalExists()) {
        //     selectTerminal().then(terminal => {
        //         if (terminal) {
        //             terminal.show();
        //         }
        //     });
        // }
        if (arr.length === 0) {
            vscode.window.showInformationMessage("Error: ToDo's does not exist ");
        } else {
            terminal.sendText(`ToDo's:`)
            for (var i = 0; i < arr.length; i++) {
                terminal.sendText(`${i + 1}: ${arr[i]}`)
            }
        }

    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
}