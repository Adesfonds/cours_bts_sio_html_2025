function calendrier(firstDay, month, year, size = 'moyen', bgColor = '#fff', textColor = '#000') {
    const monthNames = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
    const daysInMonth = new Date(year, month, 0).getDate();
    let html = `<table class="calendrier ${size}" style="background-color: ${bgColor}; color: ${textColor};">`;
    html += `<tr><th colspan="7">${monthNames[month - 1]} ${year}</th></tr>`;
    html += `<tr><th>Lu</th><th>Ma</th><th>Me</th><th>Je</th><th>Ve</th><th>Sa</th><th>Di</th></tr><tr>`;

    // Fill in the initial empty cells
    for (let i = 1; i < firstDay; i++) {
        html += `<td></td>`;
    }

    // Fill in the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        html += `<td>${day}</td>`;
        if ((firstDay + day - 1) % 7 === 0) {
            html += `</tr><tr>`;
        }
    }
    // Complete the last row
    html += `</tr></table>`;
    
    document.getElementById('calendrier').innerHTML = html;
}
// Exemple d'utilisation
calendrier(3, 3, 2023, 'moyen', '#f0f0f0', '#333');