
// Campos formulario
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');
const botonSubmit = document.getElementById('boton')
const formulario = document.querySelector('form')


// Lista inputs
const listaInputs = document.querySelectorAll('.box');

// Campos de mensaje de error debajo formulario
const errorNombre = document.getElementById('errorNombre');
const errorMail = document.getElementById('errorEmail');
const errorAsunto = document.getElementById('errorAsunto');
const errorMensaje = document.getElementById('errorMensaje')

// Lista de mensajes de error
const listaErroresInputs = document.querySelectorAll('.error');

// Mensaje de confirmación submit
const mensajeFinal = document.getElementById('successMessage')

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular simple para email

// Validar contenido de email
const validarEmail = (email) => {
    return emailRegex.test(email); // Devuelve true si coincide, false si no
}

// Limpiar todos los campos del formulario

const limpiarCampos = (listaCampos) => {
    // Iteramos sobre cada elemento en la lista
    listaCampos.forEach(campo => {
        // Establecemos el valor del campo a una cadena vacía

        campo.value = "";
    });
}

// Todos los campos válidos
// Todos los campos válidos

const todosLosCamposValidos = (listaCampos)=> {
    let validos = true

    for(let i=0;i<listaCampos.length;i++){
       if (listaCampos[i].value.trim() === ""){
            validos = false
            break
       }
    }

    return validos
}

// Para que en caso de hacer submit, se muestre mensaje de error si corresponde
const modificarCamposInvalidos = (listaCampos) =>{
    listaCampos.forEach(campo => {
        /*console.log("Campo: ",campo)*/
        valorCampo = campo.value;
        idCampo = campo.id
        console.log("Campo: ",campo)
        console.log("Campo ID: ",campo.id)
        if(valorCampo == ""){
            switch (idCampo) {
                case "nombre":
                    errorNombre.textContent = "❌ El campo nombre es obligatorio.";
                    errorNombre.style.color = 'red';
                    break;
                case "email":    
                    errorEmail.textContent = "❌ El campo email es inválido o está vacío";
                    errorEmail.style.color = 'red';
                    break;
                case "asunto":
                    errorAsunto.textContent = "❌ Por favor, selecciona un asunto válido.";
                    errorAsunto.style.color = 'red';
                    break;
                case "mensaje":
                    errorMensaje.textContent = "❌ El campo mensaje es obligatorio.";
                    errorMensaje.style.color = 'red';
                    break;
                default:
                    console.log("OK.")
                    break;
            }
        }else{
            console.log("Todo bien.")
        }
    });


}

// Validaciones para campo Nombre
nombre.addEventListener('input',(event)=>{
    if(event.target.value.length == 0){
        errorNombre.textContent = "❌ El campo nombre es obligatorio."
        errorNombre.style.color = 'red'
        nombre.style.color = 'red'
        nombre.style.borderColor = 'red'
    } else {
        errorNombre.textContent = ""
        nombre.style.borderColor = 'green'
        nombre.style.color = 'initial'
    }
})

// Validaciones para campo email
email.addEventListener('input', (event) => {
    const emailValor = event.target.value;

    if (validarEmail(emailValor) === true) {
        // Formato válido:
        errorMail.textContent = ""; // Borra el mensaje de error
        email.style.borderColor = 'green'; // Restaura el color del borde del input (o 'green' si lo prefieres)
        errorMail.style.color = 'initial'; // Restaura el color del texto de error (opcional)

    } else {

        if(emailValor.length == 0){

            errorMail.textContent = "❌ El campo mail es obligatorio. "; // Muestra el mensaje de error
            } else{
            // Formato inválido:
            errorMail.textContent = "❌ El campo mail no cuenta con formato válido. "; // Muestra el mensaje de error
        }
        // Coloco estilos a campos
        errorMail.style.color = 'red'; // Pinta el mensaje de error de rojo
        email.style.borderColor = 'red'; // Pinta el recuadro (borde) del input de rojo



      }
});

// Verificar asunto completado
asunto.addEventListener('change',(event)=>{
    // Obtener el valor actualmente seleccionado
    const valorSeleccionado = asunto.value;

    // La opción por defecto tiene el valor vacío ("")
    if (valorSeleccionado == '') {
        // Mostrar mensaje de error
        errorAsunto.textContent = '❌ Por favor, selecciona un asunto válido.';
        errorAsunto.style.display = 'block'; // Asegura que el div de error sea visible
    } else {
        // Limpiar el mensaje de error si la selección es válida
        errorAsunto.textContent = '';
        errorAsunto.style.display = 'none'; // Oculta el div de error
    }    


});


// Validaciones textarea comentarios
mensaje.addEventListener('input',(event)=>{
    if(event.target.value.length == 0){
        errorMensaje.textContent = "❌ El campo mensaje es obligatorio."
        errorMensaje.style.color = 'red'
        mensaje.style.color = 'red'
        mensaje.style.borderColor = 'red'
    } else {
        errorMensaje.textContent = ""
        mensaje.style.borderColor = 'green'
        mensaje.style.color = 'initial'
    }
})

formulario.addEventListener('submit',(event)=>{
    console.log(listaInputs)
    event.preventDefault();
   
    if(todosLosCamposValidos(listaInputs)){
        limpiarCampos(listaInputs);
        mensajeFinal.style.display = 'block';
        mensajeFinal.style.backgroundColor='green';
        mensajeFinal.textContent = "✅ Formulario enviado correctamente.";
        mensajeFinal.style.color = 'white';
        
    } else {
        event.preventDefault(); 
        console.log("Campos inválidos. 🛑");
        mensajeFinal.style.display = 'block';
        mensajeFinal.style.backgroundColor='red';
        mensajeFinal.textContent = "🛑 Error: Por favor, complete todos los campos requeridos.";
        mensajeFinal.style.color = 'white';
        modificarCamposInvalidos(listaInputs)
    }
    
})