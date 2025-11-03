export function initTestimonialCarousel() {
    const carouselTrack = document.querySelector('.main-testimonial-grid');
    const cards = document.querySelectorAll('.testimonial-card');
    const leftArrow = document.querySelector('.arrow:first-child');
    const rightArrow = document.querySelector('.arrow:last-child');

    // Configurações do carrossel
    const totalCards = cards.length;
    const cardsToShow = 3;
    let currentPosition = 0;

    // Configuração inicial
    function setupCarousel() {
        // Mostra apenas os 3 primeiros cards
        cards.forEach((card, index) => {
            if (index < cardsToShow) {
                card.style.display = 'flex';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
            card.style.transition = 'opacity 0.3s ease-in-out';
        });

        // Atualiza estado inicial das setas
        updateArrowStates();
    }

    // Função para atualizar visibilidade das setas
    function updateArrowStates() {
        leftArrow.style.opacity = currentPosition === 0 ? '0.3' : '1';
        leftArrow.style.cursor = currentPosition === 0 ? 'default' : 'pointer';
        
        const isLastSet = currentPosition + cardsToShow >= totalCards;
        rightArrow.style.opacity = isLastSet ? '0.3' : '1';
        rightArrow.style.cursor = isLastSet ? 'default' : 'pointer';
    }

    // Função para mover o carrossel
    function moveCarousel(direction) {
        const nextPosition = direction === 'next' 
            ? currentPosition + cardsToShow 
            : currentPosition - cardsToShow;

        // Verifica se o movimento é válido
        if (nextPosition < 0 || nextPosition >= totalCards) return;

        // Fade out cards atuais
        cards.forEach((card) => {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 300);
        });

        // Atualiza posição
        currentPosition = nextPosition;

        // Fade in novos cards após pequeno delay
        setTimeout(() => {
            cards.forEach((card, index) => {
                if (index >= currentPosition && index < currentPosition + cardsToShow) {
                    card.style.display = 'flex';
                    setTimeout(() => card.style.opacity = '1', 50);
                }
            });

            // Atualiza estado das setas
            updateArrowStates();
        }, 300);
    }

    // Event Listeners
    leftArrow.addEventListener('click', () => {
        if (currentPosition > 0) {
            moveCarousel('prev');
        }
    });

    rightArrow.addEventListener('click', () => {
        if (currentPosition + cardsToShow < totalCards) {
            moveCarousel('next');
        }
    });

    // Inicializa o carrossel
    setupCarousel();
}
