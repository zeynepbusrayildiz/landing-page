export function createPaymentModal() {
  const modal = document.createElement('div');
  modal.id = 'modal';

  modal.innerHTML = `
    <div class="modal__content">
      <h2>Ödeme Yöntemi Seç</h2>

      <label>
        <input type="radio" name="payment" value="kapida">
        Kapıda Ödeme - 3000₺
      </label>

      <label>
        <input type="radio" name="payment" value="online">
        Online Ödeme - 2900₺
      </label>

      <button id="confirmPayment">Onayla</button>
    </div>
  `;

  return modal;
}


export function createSuccessModal() {
  const successModal = document.createElement('div');
  successModal.id = 'successModal';

  successModal.innerHTML = `
    <div class="modal__content">
      <h2>Başarılı! 🎉</h2>
      <p>Ödeme sayfasına aktarılıyorsun.</p>
      <p><span id="countdown">5</span> saniye...</p>
    </div>
  `;

  return successModal;
}