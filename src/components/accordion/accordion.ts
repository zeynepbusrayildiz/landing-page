export function Accordion(title: string, content: string, index: number) {
  return `
    <div class="accordion">
      <div class="accordion__header" data-index="${index}">
  <span class="accordion__icon">+</span>
  ${title}
</div>
      <div class="accordion__content" id="content-${index}">
        ${content}
      </div>
    </div>
  `;
}