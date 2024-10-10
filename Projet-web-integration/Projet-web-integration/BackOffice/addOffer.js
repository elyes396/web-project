document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    clearMessages();
    validateForm();
});

document.getElementById('titre').addEventListener('keyup', function() {
    validateTitle();
});

document.getElementById('destination').addEventListener('keyup', function() {
    validateDestination();
});

function validateForm() {
    const titreInput = document.getElementById('titre');
    const destinationInput = document.getElementById('destination');
    const dateDepartInput = document.getElementById('dateDepart');
    const dateRetourInput = document.getElementById('dateRetour');
    const prixInput = document.getElementById('prix');

    const titre = titreInput.value;
    const destination = destinationInput.value;
    const dateDepart = new Date(dateDepartInput.value);
    const dateRetour = new Date(dateRetourInput.value);
    const prix = parseFloat(prixInput.value);

    let isValid = true;

    if (!validateTitle()) isValid = false;
    if (!validateDestination()) isValid = false;

    if (!isValidDate(dateDepart)) {
        createMessage(dateDepartInput, "Veuillez entrer une date de départ valide.", 'error');
        isValid = false;
    } else if (!isValidDate(dateRetour) || dateRetour <= dateDepart) {
        createMessage(dateRetourInput, "La date de retour doit être valide et ultérieure à la date de départ.", 'error');
        isValid = false;
    } else {
        createMessage(dateRetourInput, "Dates valides", 'success');
    }

    if (isNaN(prix) || prix <= 0) {
        createMessage(prixInput, "Le prix doit être un nombre positif.", 'error');
        isValid = false;
    } else {
        createMessage(prixInput, "Prix valide", 'success');
    }

    if (isValid) {
        alert("Formulaire validé avec succès !");
    }
}

function validateTitle() {
    const titreInput = document.getElementById('titre');
    const titre = titreInput.value;

    if (titre.length < 3) {
        createMessage(titreInput, "Le titre doit contenir au moins 3 caractères.", 'error');
        return false;
    } else {
        createMessage(titreInput, "Titre valide", 'success');
        return true;
    }
}

function validateDestination() {
    const destinationInput = document.getElementById('destination');
    const destination = destinationInput.value;
    const destinationRegex = /^[A-Za-z\s]{3,}$/;

    if (!destinationRegex.test(destination)) {
        createMessage(destinationInput, "La destination doit contenir uniquement des lettres et des espaces, et au moins 3 caractères.", 'error');
        return false;
    } else {
        createMessage(destinationInput, "Destination valide", 'success');
        return true;
    }
}

function createMessage(element, message, type) {
    clearMessages(element);
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageElement.className = type;
    element.parentNode.appendChild(messageElement);
}

function clearMessages(element = null) {
    if (element) {
        const messages = element.parentNode.querySelectorAll('.error, .success');
        messages.forEach(message => message.remove());
    } else {
        const messages = document.querySelectorAll('.error, .success');
        messages.forEach(message => message.remove());
    }
}

function isValidDate(date) {
    return !isNaN(date.getTime());
}
