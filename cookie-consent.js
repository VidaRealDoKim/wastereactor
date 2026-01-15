// Cookie Consent Manager
class CookieConsent {
  constructor() {
    this.cookieName = 'wastereactor_cookie_consent';
    this.init();
  }

  init() {
    if (!this.hasConsent()) {
      this.showBanner();
    }
  }

  hasConsent() {
    return localStorage.getItem(this.cookieName) !== null;
  }

  showBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.innerHTML = `
      <div class="cookie-content">
        <div class="cookie-text">
          <h3>🍪 Política de Cookies</h3>
          <p>Utilizamos cookies para melhorar sua experiência no site. Ao continuar navegando, você concorda com nossa política de cookies.</p>
          <a href="#privacy-policy" class="cookie-link">Saiba mais</a>
        </div>
        <div class="cookie-buttons">
          <button class="cookie-btn cookie-reject" id="cookie-reject">Rejeitar</button>
          <button class="cookie-btn cookie-accept" id="cookie-accept">Aceitar</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(banner);

    // Event listeners
    document.getElementById('cookie-accept').addEventListener('click', () => {
      this.setConsent(true);
      this.closeBanner();
      this.loadAnalytics();
    });

    document.getElementById('cookie-reject').addEventListener('click', () => {
      this.setConsent(false);
      this.closeBanner();
    });
  }

  setConsent(accepted) {
    localStorage.setItem(this.cookieName, JSON.stringify({
      accepted,
      date: new Date().toISOString()
    }));
  }

  closeBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => banner.remove(), 300);
    }
  }

  loadAnalytics() {
    // Google Analytics ou outro serviço aqui
    console.log('Analytics habilitados');
  }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  new CookieConsent();
});
