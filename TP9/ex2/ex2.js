const form = document.getElementById('visitorForm');
const tableBody = document.getElementById('visitorTableBody');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const study = document.getElementById('study').value;

    // Créer une nouvelle ligne dans le tableau
    const newRow = document.createElement('tr');
    newRow.innerHTML = `<td>${firstName}</td><td>${lastName}</td><td>${study}</td>`;
    tableBody.appendChild(newRow);

    // Réinitialiser le formulaire
    form.reset();
});