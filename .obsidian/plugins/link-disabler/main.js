export default class LinkDisablerPlugin {
  async onload() {
    this.addCommand({
      id: "disable-selected-links",
      name: "Disable selected links",
      hotkeys: [{ modifiers: ["Mod", "Shift"], key: "d" }],
      editorCallback: (editor) => {
        const selectedText = editor.getSelection();
        
        // Регулярка для поиска [[...]]
        const wikiLinkRegex = /\[\[([^\]]+)\]\]/g;
        
        if (wikiLinkRegex.test(selectedText)) {
          // Заменяем [[текст]] на → текст ←
          const disabledText = selectedText.replace(wikiLinkRegex, "→ $1 ←");
          editor.replaceSelection(disabledText);
        } else {
          // Если выделен обычный текст
          const newContent = `→ ${selectedText} ←`;
          editor.replaceSelection(newContent);
        }
      }
    });
  }
}