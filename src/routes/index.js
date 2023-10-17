const { Router } = require('express');
const router = Router();

const webpush = require('../webpush');
let pushSubscription;

router.post('/subscribe', async (req, res)=>{
    pushSubscription = req.body;
    res.status(200).json(req.body);
    const paqueteDatos = JSON.stringify({
        title: "Titulo de la notificacion",
        message: "Contenido de la notificacion"
    });
    await webpush.sendNotification(pushSubscription, paqueteDatos);
});

module.exports = router;