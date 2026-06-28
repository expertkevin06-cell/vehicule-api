const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;
const ADMIN_PIN = process.env.ADMIN_PIN || "Non configuré";

// Permet à l'API de recevoir et lire du texte au format JSON
app.use(express.json());

// Notre base de données temporaire (en mémoire)
let vehicules = [
    { id: 1, marque: "Peugeot", modele: "208", statut: "Disponible" },
    { id: 2, marque: "Renault", modele: "Clio", statut: "En maintenance" }
];

// 1. Page d'accueil
app.get('/', (req, res) => {
    res.json({ message: "L'API Véhicule est en ligne !", status: "OK" });
});

// 2. Voir tous les véhicules
app.get('/vehicules', (req, res) => {
    res.json(vehicules);
});

// 3. Ajouter un véhicule (Sécurisé par Code PIN)
app.post('/vehicules', (req, res) => {
    const { pin, marque, modele, statut } = req.body;

    // Vérification du code PIN envoyé dans la requête
    if (!pin || pin !== ADMIN_PIN) {
        return res.status(401).json({ error: "Code PIN incorrect ou manquant." });
    }

    if (!marque || !modele) {
        return res.status(400).json({ error: "La marque et le modèle sont obligatoires." });
    }

    const nouveauVehicule = {
        id: vehicules.length + 1,
        marque,
        modele,
        statut: statut || "Disponible"
    };

    vehicules.push(nouveauVehicule);
    res.status(201).json({ message: "Véhicule ajouté !", vehicule: nouveauVehicule });
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
