export function Card(title: string, text: string) {
  return `
    <div class="card">
      <h3 class="card__title">${title}</h3>
      <p class="card__text">${text}</p>
    </div>
  `;
}