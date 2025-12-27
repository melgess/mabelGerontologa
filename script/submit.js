const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const serviceInput = document.getElementById('service');

function validateName() {
    const value = nameInput.value.trim();
    const regex = /^[A-Za-zÀ-ú\s]{2,}$/;
    if (value === '') {
        showError(nameInput, 'O nome é obrigatório.');
        return false;
    }else {
        clearError(nameInput);
        return true;
    }
}

function validateService() {
    const value = serviceInput.value.trim();
    if (value === '') {
        showError(serviceInput, 'Selecione o tipo de atendimento.');
        return false;
    } else {
        clearError(serviceInput);
        return true;
    }
}


function showError(input, message) {
    const wrapper = input.closest('.form-field') || input.parentNode;
    input.style.borderColor = 'red';
    let error = wrapper.querySelector('.error-message');
    if (!error) {
        error = document.createElement('span');
        error.className = 'error-message';
        wrapper.appendChild(error);
    }
    error.textContent = message;
}


function clearError(input) {
    const wrapper = input.closest('.form-field') || input.parentNode;
    input.style.borderColor = '#B0B0B0';
    const error = wrapper.querySelector('.error-message');
    if (error) error.remove();
}


[nameInput, serviceInput].forEach(input => {
    input.addEventListener('input', () => {
        if (input === nameInput) validateName();
        else if (input === serviceInput) validateService();
    });
});

[nameInput, serviceInput].forEach(input => {
    input.addEventListener('blur', () => {
        if (input === nameInput) validateName();
        else if (input === serviceInput) validateService();
    });
});


form.addEventListener('submit', function(e) {
    e.preventDefault();
    const isNameValid = validateName();
    const isServiceValid = validateService();

    if (isNameValid && isServiceValid) {
        const name = nameInput.value.trim();
        const service = (serviceInput?.value || '').trim();

        const message =
`Olá, meu nome é ${name}.
Tenho interesse no atendimento ${service}.
Podemos falar por aqui?`;

        const encoded = encodeURIComponent(message);
        const rawNumber = (form?.dataset?.whatsappNumber || '').replace(/\D/g, '');
        const url = rawNumber
            ? `https://wa.me/55${rawNumber}?text=${encoded}`
            : `https://wa.me/?text=${encoded}`;

        window.open(url, '_blank');
    }
});
