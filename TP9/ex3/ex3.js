function reboursF() {
    let jour = document.getElementById("jour"),
        heure = document.getElementById("heure"),
        minute = document.getElementById("minute"),
        seconde = document.getElementById("seconde");

    let maintenant = new Date();
    let finEvenement = new Date('July 14, 2025 00:00:00');

    let total_secondes = Math.floor((finEvenement - maintenant) / 1000);
     
    if (total_secondes > 0) {
        let nb_jours = Math.floor(total_secondes / (60 * 60 * 24));
        let nb_heures = Math.floor((total_secondes % (60 * 60 * 24)) / (60 * 60));
        let nb_minutes = Math.floor((total_secondes % (60 * 60)) / 60);
        let nb_secondes = total_secondes % 60;

        jour.textContent = caractere(nb_jours);
        heure.textContent = caractere(nb_heures);
        minute.textContent = caractere(nb_minutes);
        seconde.textContent = caractere(nb_secondes);
    } else {
        jour.textContent = "00";
        heure.textContent = "00";
        minute.textContent = "00";
        seconde.textContent = "00";
        clearInterval(minuteur);
    }
}

function caractere(nb) {
    return (nb < 10) ? '0' + nb : nb;
}

// Mise à jour du compte à rebours toutes les secondes
let minuteur = setInterval(reboursF, 1000);
reboursF(); // Appel initial