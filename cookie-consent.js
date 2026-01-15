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
          <a href="#" class="cookie-link" id="cookie-learn-more">Saiba mais</a>
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

    // Event listener para o link "Saiba mais"
    document.getElementById('cookie-learn-more').addEventListener('click', (e) => {
      e.preventDefault();
      this.showPrivacyModal();
    });
  }

  showPrivacyModal() {
    // Criar modal overlay
    const overlay = document.createElement('div');
    overlay.id = 'privacy-modal-overlay';
    overlay.className = 'privacy-modal-overlay';
    
    // Criar conteúdo do modal
    const modal = document.createElement('div');
    modal.className = 'privacy-modal';
    modal.innerHTML = `
      <div class="privacy-modal-content">
        <div class="privacy-modal-header">
          <h2>Política de Cookies</h2>
          <button class="privacy-modal-close" id="privacy-modal-close" aria-label="Fechar modal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="privacy-modal-body">
          <h3>O que são cookies?</h3>
          <p>Cookies são pequenos arquivos de texto armazenados no seu dispositivo que nos ajudam a melhorar sua experiência no site.</p>
          
          <h3>Como usamos cookies?</h3>
          <p>Utilizamos cookies para:</p>
          <ul>
            <li>Melhorar a funcionalidade do site</li>
            <li>Entender como você usa nosso site</li>
            <li>Personalizar sua experiência</li>
            <li>Análise de tráfego</li>
          </ul>
          
          <h3>Tipos de cookies</h3>
          <p>Usamos cookies essenciais e cookies de análise. Cookies essenciais são necessários para o funcionamento do site, enquanto cookies de análise nos ajudam a entender melhor seu comportamento.</p>
          
          <h3>Sua privacidade</h3>
          <p>Respeitamos sua privacidade. Você pode rejeitar cookies não essenciais a qualquer momento através do banner de consentimento.</p>
        </div>
        <div class="privacy-modal-footer">
          <button class="privacy-modal-btn-secondary" id="privacy-modal-reject">Rejeitar</button>
          <button class="privacy-modal-btn-primary" id="privacy-modal-accept">Aceitar</button>
        </div>
      </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Trigger animação de entrada
    setTimeout(() => {
      overlay.classList.add('active');
      modal.classList.add('active');
    }, 10);
    
    // Event listeners do modal
    document.getElementById('privacy-modal-close').addEventListener('click', () => {
      this.closePrivacyModal();
    });
    
    document.getElementById('privacy-modal-accept').addEventListener('click', () => {
      this.setConsent(true);
      this.closePrivacyModal();
      this.closeBanner();
      this.loadAnalytics();
    });
    
    document.getElementById('privacy-modal-reject').addEventListener('click', () => {
      this.setConsent(false);
      this.closePrivacyModal();
      this.closeBanner();
    });
    
    // Fechar ao clicar no overlay
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        this.closePrivacyModal();
      }
    });
  }

  closePrivacyModal() {
    const overlay = document.getElementById('privacy-modal-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      setTimeout(() => overlay.remove(), 300);
    }
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
