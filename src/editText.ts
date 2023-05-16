import * as vscode from "vscode";

export function addCommaAfterText(context: vscode.ExtensionContext) {
  let command = vscode.commands.registerCommand(
    "yru-extension.addCommaAfterText",
    () => {
      const activeEditor = vscode.window.activeTextEditor;

      if (activeEditor) {
        const document = activeEditor.document;
        const selection = activeEditor.selection;
        const text = document.getText(selection);
        const newlineChar = getNewlineChar();
        const replaceText = text.split(newlineChar).join("," + newlineChar);

        activeEditor.edit((editBuilder: vscode.TextEditorEdit) => {
          editBuilder.replace(selection, replaceText);
        });
      }
    }
  );

  context.subscriptions.push(command);
}

export function replaceMybatisInsertValues(context: vscode.ExtensionContext) {
  let command = vscode.commands.registerCommand(
    "yru-extension.replaceMybatisInsertValues",
    () => {
      const activeEditor = vscode.window.activeTextEditor;

      if (activeEditor) {
        const document = activeEditor.document;
        const selection = activeEditor.selection;
        const text = document.getText(selection);
        const replaceText = text
          .replace(/[-_]([a-zA-Z])/g, (group) =>
            group.toUpperCase().replace("-", "").replace("_", "")
          )
          .replace(/([a-zA-Z]+)/g, (group) =>
            group.replace(group, "#{" + group + "}")
          );

        activeEditor.edit((editBuilder: vscode.TextEditorEdit) => {
          editBuilder.replace(selection, replaceText);
        });
      }
    }
  );

  context.subscriptions.push(command);
}

let getNewlineChar = () => {
  if (process.platform === "win32") {
    return "\r\n";
  } else {
    return "\n";
  }
};
