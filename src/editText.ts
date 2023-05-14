import * as vscode from "vscode";

export function addCommaAfterText(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("yru-extension.addCommaAfterText", () => {
      // Get the active text editor
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const document = editor.document;
        const selection = editor.selection;

        // Get the word within the selection
        const word = document.getText(selection);
        const reversed = word.split("\n").join(",\n");
        editor.edit((editBuilder) => {
          editBuilder.replace(selection, reversed);
        });
      }
    })
  );
}
