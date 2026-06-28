const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PIN = process.env.ADMIN_PIN || "Non configuré";

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "L'API Véhicule est en ligne !", status: "OK" });
});

app.get('/admin', (req, res) => {
    res.json({ info: "Zone sécurisée", pin_configure: ADMIN_PIN !== "Non configuré" });
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
