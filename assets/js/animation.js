// Animação dos cards de serviços
export function initCardAnimations() {
    const cards = document.querySelectorAll('.services-card');
    if (!cards.length) {
        console.warn('Nenhum .services-card encontrado');
        return;
    }

    cards.forEach(card => {
        card.addEventListener('mousemove', handleCardMouseMove);
        card.addEventListener('mouseleave', handleCardMouseLeave);
    });
}

function handleCardMouseMove(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.setProperty('--rotateX', `${rotateX}deg`);
    card.style.setProperty('--rotateY', `${rotateY}deg`);
}

function handleCardMouseLeave(e) {
    const card = e.currentTarget;
    card.style.setProperty('--rotateX', '0deg');
    card.style.setProperty('--rotateY', '0deg');
}

// Gerenciamento de modais
export function initModalHandlers() {
    setupModalOpenButtons();
    setupModalBackdropClose();
    setupModalEscapeKey();
}

function setupModalOpenButtons() {
    const modalButtons = document.querySelectorAll('.btn-saiba-mais, .open-modal');
    modalButtons.forEach(btn => {
        btn.addEventListener('click', handleModalOpen);
    });
}

function handleModalOpen(e) {
    const id = e.currentTarget.getAttribute('data-modal');
    if (!id) return;

    const dlg = document.getElementById(id);
    if (!dlg) return;

    if (typeof dlg.showModal === 'function') {
        dlg.showModal();
    } else {
        dlg.style.display = 'block';
        dlg.setAttribute('open', '');
    }
}

function setupModalBackdropClose() {
    document.addEventListener('click', e => {
        if (e.target?.tagName === 'DIALOG') {
            closeModal(e.target);
        }
    });
}

function setupModalEscapeKey() {
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            document.querySelectorAll('dialog[open]').forEach(closeModal);
        }
    });
}

function closeModal(dialog) {
    if (typeof dialog.close === 'function') {
        dialog.close();
    } else {
        dialog.style.display = 'none';
        dialog.removeAttribute('open');
    }
}