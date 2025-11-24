export function initTestimonialCarousel() {
    const carouselTrack = document.querySelector('.main-testimonial-grid');
    const cards = document.querySelectorAll('.testimonial-card');
    const leftArrow = document.querySelector('.arrow:first-child');
    const rightArrow = document.querySelector('.arrow:last-child');

    const totalCards = cards.length;
    let cardsToShow = getCardsToShow(); // define de acordo com a tela
    let currentPosition = 0;

    // 🔹 Função que ajusta quantos cards mostrar conforme a largura da janela
    function getCardsToShow() {
        const width = window.innerWidth;
        if (width <= 768) return 1;      // Celulares
        if (width <= 1100) return 2;     // Tablets
        return 3;                        // Desktop
    }

    // 🔹 Configuração inicial e ao redimensionar
    function setupCarousel() {
        cardsToShow = getCardsToShow();

        cards.forEach((card, index) => {
            if (index >= currentPosition && index < currentPosition + cardsToShow) {
                card.style.display = 'flex';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
            card.style.transition = 'opacity 0.3s ease-in-out';
        });

        updateArrowStates();
    }

    // 🔹 Atualiza visibilidade das setas
    function updateArrowStates() {
        leftArrow.style.opacity = currentPosition === 0 ? '0.3' : '1';
        leftArrow.style.cursor = currentPosition === 0 ? 'default' : 'pointer';

        const isLastSet = currentPosition + cardsToShow >= totalCards;
        rightArrow.style.opacity = isLastSet ? '0.3' : '1';
        rightArrow.style.cursor = isLastSet ? 'default' : 'pointer';
    }

    // 🔹 Movimenta o carrossel
    function moveCarousel(direction) {
        const nextPosition =
            direction === 'next'
                ? currentPosition + cardsToShow
                : currentPosition - cardsToShow;

        if (nextPosition < 0 || nextPosition >= totalCards) return;

        cards.forEach((card) => {
            card.style.opacity = '0';
            setTimeout(() => (card.style.display = 'none'), 300);
        });

        currentPosition = nextPosition;

        setTimeout(() => {
            cards.forEach((card, index) => {
                if (index >= currentPosition && index < currentPosition + cardsToShow) {
                    card.style.display = 'flex';
                    setTimeout(() => (card.style.opacity = '1'), 50);
                }
            });
            updateArrowStates();
        }, 300);
    }

    // 🔹 Listeners das setas
    leftArrow.addEventListener('click', () => {
        if (currentPosition > 0) moveCarousel('prev');
    });

    rightArrow.addEventListener('click', () => {
        if (currentPosition + cardsToShow < totalCards) moveCarousel('next');
    });

    // 🔹 Atualiza o carrossel ao redimensionar a janela
    window.addEventListener('resize', () => {
        setupCarousel();
    });

    // Inicializa
    setupCarousel();
}