export function initFormHandler() {
	const form = document.getElementById('appointment-form');
	if (!form) return;

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		clearErrors(form);

		const name = form.querySelector('#name');
		const contact = form.querySelector('#contact');
		const message = form.querySelector('#message');

		let valid = true;

		// Valida nome
		const nameValue = name.value.trim();
		if (nameValue.length < 2) {
			showError(name, 'Por favor, informe seu nome completo.');
			valid = false;
		}

		// Valida contato (telefone/whatsapp) - requer 10 ou 11 dígitos (BR)
		const digits = contact.value.replace(/\D/g, '');
		if (digits.length < 10) {
			showError(contact, 'Telefone inválido. Informe DDD + número (ex: 11999999999).');
			valid = false;
		}

		// Mensagem opcional, mas se presente deve ter tamanho mínimo
		const messageValue = message.value.trim();
		if (messageValue && messageValue.length < 10) {
			showError(message, 'A mensagem é muito curta. Conte-nos com mais detalhes.');
			valid = false;
		}

		if (!valid) {
			// foco no primeiro campo com erro
			const firstError = form.querySelector('.error-message');
			if (firstError) {
				const input = firstError.previousElementSibling || firstError.parentElement.querySelector('input, textarea');
				if (input) input.focus();
			}
			return;
		}

		// Se chegou aqui, formulário válido — simular envio / mostrar feedback
		showSuccess(form, 'Mensagem enviada com sucesso. Entraremos em contato em breve!');
		form.reset();
	});
}

function clearErrors(form) {
	form.querySelectorAll('.error-message').forEach(node => node.remove());
	form.querySelectorAll('[aria-invalid="true"]').forEach(el => el.removeAttribute('aria-invalid'));
}

function showError(input, message) {
	input.setAttribute('aria-invalid', 'true');
	const id = `${input.id}-error`;
	let err = document.createElement('div');
	err.className = 'error-message';
	err.id = id;
	err.style.color = '#b91c1c';
	err.style.fontSize = '0.9em';
	err.style.marginTop = '6px';
	err.textContent = message;
	// Inserir após o input
	input.parentNode.insertBefore(err, input.nextSibling);
	input.focus && input.focus();
}

function showSuccess(form, message) {
	// Remove mensagens anteriores
	const existing = document.getElementById('form-success');
	if (existing) existing.remove();

	const msg = document.createElement('div');
	msg.id = 'form-success';
	msg.style.background = 'linear-gradient(90deg,#10b981,#06b6d4)';
	msg.style.color = 'white';
	msg.style.padding = '10px 16px';
	msg.style.borderRadius = '8px';
	msg.style.marginTop = '12px';
	msg.textContent = message;

	form.appendChild(msg);

	// remover automaticamente após 5s
	setTimeout(() => { msg.remove(); }, 5000);
}
