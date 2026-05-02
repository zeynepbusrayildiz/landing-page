export function Button(text: string, id?: string) {
  return `<button class="btn" data-id="${id || ''}">${text}</button>`;
}