export function initModal() {
  let currentModalId: string | null = null;

  // Handle click on material cards
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const materialCard = target.closest('[data-material-card]');
    
    if (materialCard) {
      const id = materialCard.getAttribute('data-material-id');
      if (id) {
        currentModalId = id;
        const event = new CustomEvent('modal-state-change', { 
          detail: { id } 
        });
        document.dispatchEvent(event);
      }
    }
  });

  // Handle modal close
  document.addEventListener('modal-close', () => {
    currentModalId = null;
    const event = new CustomEvent('modal-state-change', { 
      detail: { id: null } 
    });
    document.dispatchEvent(event);
  });

  // Handle escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentModalId) {
      const event = new CustomEvent('modal-close');
      document.dispatchEvent(event);
    }
  });

  // Handle click outside modal
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const modalContent = target.closest('[data-modal-content]');
    const modalBackdrop = target.closest('[data-modal-backdrop]');
    
    if (modalBackdrop && !modalContent && currentModalId) {
      const event = new CustomEvent('modal-close');
      document.dispatchEvent(event);
    }
  });
} 