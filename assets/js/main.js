document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.services-card');
    if (!cards.length) {
        console.warn('Nenhum .services-card encontrado');
        return;
    }

    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.setProperty('--rotateX', `${rotateX}deg`);
            card.style.setProperty('--rotateY', `${rotateY}deg`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--rotateX', '0deg');
            card.style.setProperty('--rotateY', '0deg');
        });
    });
});

// Código simples e fácil de entender para abrir/fechar <dialog>
const modalButtons = document.querySelectorAll('.btn-saiba-mais, .open-modal');

modalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-modal');
        if (!id) return; // nada a fazer se não houver id

        const dlg = document.getElementById(id);
        if (!dlg) return; // modal não encontrado

        // abrir modal: preferir showModal() (comportamento nativo)
        if (typeof dlg.showModal === 'function') {
            dlg.showModal();
        } else {
            // fallback simples para navegadores sem <dialog>
            dlg.style.display = 'block';
            dlg.setAttribute('open', '');
        }
    });
});

// Fechar quando clicar no backdrop (fácil de entender)
document.addEventListener('click', (e) => {
    if (e.target && e.target.tagName === 'DIALOG') {
        const d = e.target;
        if (typeof d.close === 'function') d.close();
        else { d.style.display = 'none'; d.removeAttribute('open'); }
    }
});

// Fechar todos os dialogs abertos ao pressionar Esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('dialog[open]').forEach(d => {
            if (typeof d.close === 'function') d.close();
            else { d.style.display = 'none'; d.removeAttribute('open'); }
        });
    }
});