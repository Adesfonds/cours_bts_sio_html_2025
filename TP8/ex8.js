function calculerDevis() {
    let nom = document.getElementById("nom").value.trim();
    let prenom = document.getElementById("prenom").value.trim();
    let adresse = document.getElementById("adresse").value.trim();
    let cdepost = document.getElementById("code_post").value.trim();
    let ville = document.getElementById("ville").value.trim();
    let adressemail = document.getElementById("mail").value.trim();
    let telephone = document.getElementById("telephone").value.trim();
    let longueur = parseFloat(document.getElementById("longueur").value);
    let largeur = parseFloat(document.getElementById("largeur").value);
    let epaisseur = parseFloat(document.getElementById("epaisseur").value);

    let volume = longueur * largeur * (epaisseur / 100);
    let cimentTonnes = (volume * 350) / 1000;
    let camions = Math.ceil(volume / 9);
    let prixBeton = volume * 91;
    let prixTransport = camions * 140;
    let totalHT = prixBeton + prixTransport;
    let totalTTC = totalHT * 1.2;

    if (telephone.length !== 10) {
        alert("Le numéro de téléphone doit comporter 10 chiffres.");
    }
    if (epaisseur < 15 || epaisseur > 35) {
        alert("L'épaisseur doit être comprise entre 15 et 35 cm !");
        return;
    }
    if (longueur <= 0 || largeur <= 0) {
        alert("Longueur et largeur doivent être supérieures à zéro !");
        return;
    }
    if (!adressemail.includes('@')) {
        alert("L'adresse e-mail doit contenir un '@'.");
        return; 
    }
    if(cdepost.length != 5){
        alert("Le code postal doit comporter 5 chiffres.");
    }
    document.getElementById("resultat").innerHTML = `
        <h3>Devis Béton</h3>
        <p><strong>Nom :</strong> ${nom} ${prenom}</p>
        <p><strong>Adresse :</strong> ${adresse}, ${cdepost} ${ville}</p>
        <p><strong>Email :</strong> ${adressemail}</p>
        <p><strong>Téléphone :</strong> ${telephone}</p>
        <p><strong>Volume de béton :</strong> ${volume.toFixed(2)} m³</p>
        <p><strong>Ciment (en tonnes) :</strong> ${cimentTonnes}</p>
        <p><strong>Nombre de camions :</strong> ${camions.toFixed(2)}</p>
        <p><strong>Prix du béton :</strong> ${prixBeton.toFixed(2)} € HT</p>
        <p><strong>Frais de transport :</strong> ${prixTransport.toFixed(2)} € HT</p>
        <p><strong>Total HT :</strong> ${totalHT.toFixed(2)} €</p>
        <p><strong>Total TTC :</strong> ${totalTTC.toFixed(2)} €</p>
        <h3>Termes et Conditions</h3>
        <p>Le présent devis concerne la fourniture et la livraison de béton conformément aux spécifications mentionnées. Il est valable pour une durée de trente jours à compter de sa date d’émission. Passé ce délai, les prix et conditions peuvent être révisés.</p>
        <p>Les prix indiqués sont exprimés en euros et s’entendent hors taxes. La TVA applicable est de 20 %, sauf modification réglementaire. Un acompte de 30 % est exigé à la commande, le solde devant être réglé à la livraison. Les paiements doivent être effectués par virement bancaire, chèque ou carte bancaire.</p>
        <p>La livraison sera effectuée à l’adresse indiquée par le client lors de la commande. Les délais sont donnés à titre indicatif et peuvent être modifiés en fonction des conditions météorologiques et de la disponibilité des matériaux. Il appartient au client de s’assurer que l’accès au site de livraison est adapté aux véhicules de transport.</p>
        <p>Toute modification du devis après acceptation doit être notifiée au moins quarante-huit heures avant la date prévue de livraison. En cas d’annulation après confirmation, des frais de 30 % du montant total du devis seront facturés.</p>
        <p>Le fournisseur ne peut être tenu responsable des dommages causés par une mauvaise mise en œuvre du béton après livraison. Le client est responsable de la conformité de sa commande avec les besoins de son projet. Toute réclamation doit être adressée par écrit dans un délai de quarante-huit heures après la livraison. Passé ce délai, la commande sera considérée comme conforme.</p>

        <h3>Signature du client</h3>
        <canvas id="signature-pad" width="300" height="150" style="border: 1px solid black;"></canvas>
        <br>
        <img id="signature-img" style="display:none; width:300px; height:150px;">
    `;
    let canvas = document.getElementById("signature-pad");
    let ctx = canvas.getContext("2d");
    let drawing = false;

    function getCursorPosition(event) {
        let rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
    function startDrawing(event) {
        drawing = true;
        let { x, y } = getCursorPosition(event);
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    function draw(event) {
        if (!drawing) return;
        let { x, y } = getCursorPosition(event);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    function stopDrawing() {
        drawing = false;
        ctx.closePath();
    }
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);
}

function imprimerDevis() {
    let canvas = document.getElementById("signature-pad");
    let signatureImg = document.getElementById("signature-img");
    if (canvas) {
        let imageData = canvas.toDataURL("image/png");
        signatureImg.src = imageData;
        signatureImg.style.display = "block"; 
        canvas.replaceWith(signatureImg); // Remplace le canvas par l’image
    }

    setTimeout(() => {
        let resultat = document.getElementById("resultat").innerHTML;
        let originalContent = document.body.innerHTML;
        document.body.innerHTML = `<div>${resultat}</div>`;
        window.print(); 
        document.body.innerHTML = originalContent; 
    }, 500);
}