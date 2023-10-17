//Archivo destinado únicamente al services worker. 
//Indispensable estar separado? No. ¿Útil? Sin dudas.

console.log("Service Worker Test de acceso");

self.addEventListener('push', e => {
   const data = e.data.json(); 
   console.log(data);
   console.log("Notificacion recibida");
});

