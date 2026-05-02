import './style.scss';
import { Button } from './components/button/button';
import { Card } from './components/card/card';
import { Accordion } from './components/accordion/accordion';
import { createPaymentModal, createSuccessModal } from './components/modal/modal';
import { Input } from './components/input/input';
import heroImg from './assets/hero.webp';
import hero1 from './assets/hero1.webp';
import hero2 from './assets/hero2.webp';

const app = document.querySelector('#app') as HTMLElement;

/*html*/
app.innerHTML = `
  <header class="header">
    <h1 class="logo">Tencere Seti</h1>
    <div class="header__actions">
      ${Button("🌙 Koyu Mod", "theme")}
    </div>
  </header>

  <!-- hero -->
  <section id="hero">
      <div class="hero__image">
        <img id="heroImg" src="${heroImg}" alt="product" width="800" height="600"/>
      </div>

      <div class="hero__text">
        <h2>Mutfağını Yenile!</h2>
        <p>Şık ve kullanışlı granit setimizle tanışın.</p>
      </div>
    </section>

  <main>

    <!-- product -->
    <section id="product">
      <!-- product left-->
      <div class="product__left">
        <div class="gallery">
          <button id="prevImg" class="gallery-btn">←</button>
          <img id="productImage" src="${hero1}" alt="product" loading="lazy" width="800" height="600"/>
          <button id="nextImg" class="gallery-btn">→</button>
        </div>
        ${Button("Satın Al","buy")}
      </div>

      <!-- product right -->
      <div class="product__right">
        <h2>Granit Tencere Seti</h2>
        <p>7 parça tencere setimiz, çeyiz, yeni ev ve günlük mutfak kullanımı için ideal bir settir.</p>
        <div class="cards">
          ${Card("Pratik", "Ürün kullanışlıdır ve kolay temizlenir.")}
          ${Card("Sağlıklı", "Yapışmaz iç yüzeyi ile az yağ kullanarak sağlıklı pişirme imkânı sunar.")}
          ${Card("Yapışma Yapmaz","Kalın granit kaplaması, ısıyı tencere yüzeyine eşit şekilde yayarak yemeklerin yanmadan ve yapışmadan pişmesini sağlar.")}
          <div class="card card--payment">
            <h3>Ödeme Yöntemleri</h3>
            <p>Tıklayarak ödeme seçeneklerini gör</p>
          </div>
        </div>
      </div>
    </section>

    <!-- bottom -->
    <section id="bottom">
      <!-- sss -->
      <div class="bottom__left">
        <h2>Sıkça Sorulan Sorular</h2>
        ${Accordion("Ürünlerde garanti bulunuyor mu?", "Ürün, soyulmaya karşı 2 yıl garanti kapsamındadır.", 1)}
        ${Accordion("Ürünün ebatları nasıldır?", "20 cm Derin Tencere + Cam Kapak 2,30 litre<br>24 Cm Derin Tencere + Cam Kapak 3,10 litre<br>26 Cm Basık Tencere + Cam Kapak 2,90 litre<br>26 Cm Tava 1,60 litre", 2)}
        ${Accordion("Ürün hangi renklerde mevcuttur?", "Şu anlık yalnızca krem rengi setlerimiz bulunmaktadır.", 3)}
      </div>

      <!-- yalancı form -->
      <div class="bottom__right">
        <h2>Bize ulaşın:</h2>
        ${Input("name","text","İsim")}
        ${Input("email","email","Email")}
        <textarea id="message" placeholder="Mesajınız..."></textarea>
        ${Button("Gönder", "submit")}
      </div>
    </section>

  </main>
`;

/*modallar*/
const modal = createPaymentModal();
document.body.appendChild(modal);

const successModal = createSuccessModal();
document.body.appendChild(successModal);

/*ürün resim galerisi*/
const productImages = [hero1, hero2];
let currentImage = 0;

const imgEl = document.getElementById('productImage') as HTMLImageElement;
const prevBtn = document.getElementById('prevImg');
const nextBtn = document.getElementById('nextImg');

/*state*/
const buyButton = document.querySelector('[data-id="buy"]') as HTMLButtonElement;
let isPaymentSelected = false;

/*buy button initial state*/
buyButton.style.opacity = "0.5";
buyButton.style.cursor = "not-allowed";

/*payment methods card click*/
const paymentCard = document.querySelector('#product .card:last-child');

paymentCard?.addEventListener('click', () => {
  modal.style.display = 'flex';
});

/*resim büyütme*/
imgEl.addEventListener('click', () => {
  const overlay = document.createElement('div');
  overlay.className = 'img-overlay';

  const bigImg = document.createElement('img');
  bigImg.src = imgEl.src;

  overlay.appendChild(bigImg);
  document.body.appendChild(overlay);

  overlay.addEventListener('click', () => {
    overlay.remove();
  });
});

/*modal*/
const confirmBtn = document.getElementById('confirmPayment') as HTMLButtonElement;

confirmBtn?.addEventListener('click', () => {
  const selected = document.querySelector('input[name="payment"]:checked');

  if (!selected) {
    showToast("Lütfen bir ödeme yöntemi seçiniz!","error");
    return;
  }

  const value = (selected as HTMLInputElement).value;

  if (value === "kapida") showToast("Kapıda ödeme seçildi","info");
  else showToast("Online ödeme seçildi","info");

  isPaymentSelected = true;
  buyButton.style.opacity = "1";
  buyButton.style.cursor = "pointer";

  modal.style.display = 'none';
});

/*buy button*/
buyButton?.addEventListener('click', () => {

  if (!isPaymentSelected) {
    showToast("Önce ödeme yöntemi seçmelisin!","error");

    const paymentCardEl = document.querySelector('.card--payment');
    paymentCardEl?.classList.add('card--attention');

    setTimeout(() => {
      paymentCardEl?.classList.remove('card--attention');
    }, 1600);

    return;
  }

  successModal.style.display = 'flex';

  let count = 5;
  const countdownEl = document.getElementById('countdown') as HTMLElement;

  const interval = setInterval(() => {
    count--;
    countdownEl.textContent = count.toString();

    if (count === 0) {
      clearInterval(interval);
      location.reload();
    }
  }, 1000);
});

/*accordion*/
document.querySelectorAll('.accordion__header').forEach(header => {
  header.addEventListener('click', () => {
    const index = header.getAttribute('data-index');
    const content = document.getElementById(`content-${index}`);

    if (!content) return;

    const isOpen = content.style.display === 'block';

    document.querySelectorAll('[id^="content-"]').forEach(c => {
      (c as HTMLElement).style.display = 'none';
    });

    document.querySelectorAll('.accordion__icon').forEach(icon => {
      icon.textContent = '+';
    });

    if (!isOpen) {
      content.style.display = 'block';
      const icon = header.querySelector('.accordion__icon');
      if (icon) icon.textContent = '-';
    }
  });
});

/*light/dark theme*/
const themeButton = document.querySelector('[data-id="theme"]') as HTMLButtonElement;

let isDark = false;

themeButton?.addEventListener('click', () => {
  isDark = !isDark;

  document.body.classList.toggle('dark', isDark);
  themeButton.textContent = isDark ? '☀️ Açık Mod' : '🌙 Koyu Mod';
});

/*form*/
const formButton = document.querySelector('[data-id="submit"]') as HTMLButtonElement;

formButton?.addEventListener('click', () => {
  const nameInput = document.querySelector('#name') as HTMLInputElement;
  const emailInput = document.querySelector('#email') as HTMLInputElement;
  const messageInput = document.querySelector('#message') as HTMLTextAreaElement;

  const name = nameInput.value;
  const email = emailInput.value;
  const message = messageInput.value;

  if (!name) return showToast("İsim girin!","error");
  if (!email) return showToast("Mail girin!","error");
  if(!message) return showToast("Mesaj eklemelisiniz!","error");
  if (!email.includes("@")) return showToast("Email '@' içermeli!","error");

  const atIndex = email.indexOf("@"); const before = email.slice(0, atIndex); 
  const after = email.slice(atIndex + 1); 
  if (before.includes(" ") || after.includes(" ")) { 
    return showToast("Mailde boşluk olamaz!","error"); 
  }

  showToast("Başarıyla gönderildi!","success");

  nameInput.value = "";
  emailInput.value = "";
  messageInput.value = "";
});

/*toast*/
function showToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('toast--show'), 10);

  setTimeout(() => {
    toast.classList.remove('toast--show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

/*ürün slide*/
function updateImage() {
  imgEl.src = productImages[currentImage];
}

prevBtn?.addEventListener('click', () => {
  currentImage = (currentImage - 1 + productImages.length) % productImages.length;
  updateImage();
});

nextBtn?.addEventListener('click', () => {
  currentImage = (currentImage + 1) % productImages.length;
  updateImage();
});

updateImage();