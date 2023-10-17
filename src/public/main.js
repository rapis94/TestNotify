//Archivo con las funciones principales que se comunicará con el ServiceWorker

//Esto es un string como caulquier otro, el nombre es únicamente a nivel de referencia para el Dev. 
//Podria llamarse PepitoJuarez y funcionaría igual
const PUBLIC_VAPID_KEY = "BHPyMLLfAeG11ShTWDO94gOJjORiaqkS3lgccQrFGWO5wSITg4yQjle7luIMDyFoOBsvLXaIYgnbpg_oy9h0yyc";
//*******SUPER IMPORTANTE******
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

//LA FUNCION urlBase64ToUint8Array es para poder enviar los datos codificados de forma que WebPush pueda leerlos, sin esto no funciona!!!!
//Esta funció fue brindada por la documentación de web-push, por lo cual no requiere de cambio alguna, copiá y pegá, no reinventes la rueda.

//Esto es una arrow function como las de siempre para ejectuar nuestra solicitud asíncrona con el servdior
//¿Podría ser una solicitud AJAX? Por supuesto, pero aprendamos a no depender de jQuery amigos, todos lo conocemos 
//y sabemos que queda larga vida para él por delante, pero está bueno aprender a usar JSVanilla, uno nunca sabe cuando lo puede necesitar
const subscription = async()=>{
    //registramos el ServiceWorker en el navegador
    const register = await navigator.serviceWorker.register('worker.js', {
        scope: "/" //El scope define el comportamiento de donde corre el servicio
    });
    console.log("ServiceWorker registrado sin problemas");
    //"register" hacer referencia a la constante creada anteriormente, o sea, el objeto resultante de solicitudo navigator.serviceWorker.register
    //pushManager es un método que surge de eto y conviene leer la documentación para sacar maximo provecho a sus capacidades
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true, //esta opcion indica que la notificación solo será visible para el usuario
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY) //con esta opcion idicamos al pushManager cual es la clave pública del server
    });
    
    //A partir del códiho de arriba se genera la suscripción que permitirá recibir las notificacione en todo momento
    
   await fetch("/subscribe", {
       method: "POST", //Esto si usas AJAX ya lo conoces, nada más es el método de solicitud
       body: JSON.stringify(subscription), //IMPORTANTE! El body se va como texto, por lo cual debe transformarse en string antes de ser enviado.   
       //Body es el equivalente al parámetro de AJAX "data"
       headers: { //en headers debemos delcarar ciertos parámetros, como en este caso "application/json", 
           //si vas a usar formulariso, deberias usar el parámetro "multipart/form-data"
           "Content-Type": "application/json"
       }
   });
   console.log("Suscrito");
}

subscription();