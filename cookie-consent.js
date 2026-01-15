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
        </div>
        <div class="cookie-buttons">
          <button class="cookie-btn cookie-learn-more" id="cookie-learn-more">Saiba mais</button>
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

    // Event listener para o link "Saiba mais"
    document.getElementById('cookie-learn-more').addEventListener('click', (e) => {
      e.preventDefault();
      this.showPrivacyPopup(e.target);
    });
  }

  showPrivacyPopup(triggerElement) {
    // Remover popup anterior se existir
    const existingPopup = document.getElementById('privacy-popup');
    if (existingPopup) {
      existingPopup.remove();
      return;
    }

    // Criar popup
    const popup = document.createElement('div');
    popup.id = 'privacy-popup';
    popup.className = 'privacy-popup';
    popup.innerHTML = `
      <div class="privacy-popup-content">
        <h3>Política de Cookies</h3>
        <p>Cookies são pequenos arquivos que nos ajudam a melhorar sua experiência. Utilizamos cookies essenciais para o funcionamento do site e cookies de análise para entender melhor como você usa nosso site.</p>
        <p><strong>Você pode rejeitar cookies não essenciais a qualquer momento.</strong></p>
      </div>
    `;
    
    document.body.appendChild(popup);
    
    // Trigger animação
    setTimeout(() => {
      popup.classList.add('active');
    }, 10);
    
    // Fechar ao clicar fora
    const closePopup = () => {
      popup.classList.remove('active');
      setTimeout(() => popup.remove(), 300);
      document.removeEventListener('click', handleClickOutside);
    };

    const handleClickOutside = (e) => {
      if (!popup.contains(e.target) && e.target !== triggerElement) {
        closePopup();
      }
    };

    setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 100);
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
