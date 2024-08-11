function validateName(name) {
    const REGEX = /^[a-zA-ZÀ-ÿ\s]{2,15}$/
    
    /* 
        Desglose de la Expresión Regular
            Mínimo de 2 caracteres
            Máximo de 15 caracteres
            Puede contener letras, espacios y puede llevar acentos.       
    */
           
    return REGEX.test(name)
}

function validateEmail(email)
{
    /*
        Es importante tener en cuenta que no cubre todos los casos posibles y específicos definidos por
        los estándares de correos electrónicos (RFC 5322), pero es adecuado para la mayoría de los
        propósitos comunes.
    */

    const REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    /* 
        Desglose de la Expresión Regular
            ^: Comienzo de la línea.
            [^\s@]+: Uno o más caracteres que no son espacios en blanco ni '@'.
            @: Exactamente un símbolo '@'.
            [^\s@]+: Uno o más caracteres que no son espacios en blanco ni '@'.
            \.: Exactamente un punto '.'.
            [^\s@]+: Uno o más caracteres que no son espacios en blanco ni '@'.
            $: Fin de la línea.
    */

    return REGEX.test(email)
}

function validatePhone(phone)
{

    /*
        Es relevante aclarar que esta validación es bastante permisiva para una gran variedad de formatos
        de números de teléfonos de distintos paises. Esta validación se podría modificar para considerar
        casos más puntuales, potencialmente mejorando el UX.
    */

    const REGEX = /^\+?[1-9]\d{0,2}[\s.-]?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/

    /*
        Desglose de la Expresión Regular
            ^        : Comienzo de la línea.
            \+?      : Un signo más (+) opcional, usado para marcación internacional.
            [1-9]    : Un dígito del 1 al 9 (asegura que el número no comience con 0).
            \d{0,2}  : 0 a 2 dígitos (permite códigos de país de 1 a 3 dígitos).
            [\s.-]?  : Un espacio, punto o guión opcional como separador.
            \(?      : un paréntesis de apertura opcional "(".
            \d{1,4}  : 1 a 4 dígitos, la primera parte del número local.
            \)?      : Un paréntesis de cierre opcional ")".
            [\s.-]?  : Un espacio, punto o guión opcional después de la primera parte del número local.
            \d{1,4}  : 1 a 4 dígitos, la segunda parte del número local.
            [\s.-]?  : Un separador opcional después de la segunda parte del número local.
            \d{1,9}  : 1 a 9 dígitos, la última parte del número local.
            $        : Fin de la línea.

        Ejemplos válidos
            +1 123-456-7890
            +44 20 1234 5678
            +91 (22) 1234-5678
            123-456-7890
    */
    
    return REGEX.test(phone)
}

function checkForm() {
    const name = document.getElementById("contactFormName")
    const email = document.getElementById("contactFormEmail")
    const phone = document.getElementById("contactFormPhone")

    //  Intencionalmente evito un early return para avisar al usuario de todos
    //  los errores al mismo tiempo en lugar del primero que se encuentre.

    //  Además, incluyo una condición extra para devolver error sii el campo
    //  en cuestión es obligatorio en el formulario (el atributo 'required')

    let error = "¡UPS! Parece que los siguientes campos no tienen información válida:\n"

    if (!validateName(name.value.trim()) && name.required)
        error = error.concat("\n* El campo 'Nombre' debe tener entre 2 y 15 caracteres; letras, espacios y acentos.")
    
    if (!validateEmail(email.value.trim()) && email.required)
        error = error.concat("\n* El campo 'Correo electrónico' debe tener un email válido.")

    if (!validatePhone(phone.value.trim()) && phone.required)
        error = error.concat("\n* El campo 'Teléfono Celular' necesita un número de teléfono válido.")

    if (error === "¡UPS! Parece que los siguientes campos no tienen información válida:\n")
    {
        // Acá irían las acciones necesarias que haría el "submit" del formulario.

        alert("FORMULARIO ENVIADO CORRECTAMENTE!")
        
        location.reload()
        return
    }

    alert(error)
}

document.addEventListener("DOMContentLoaded", () => {
    const form_contacto_submit = document.getElementById("contactFormSubmit")

    form_contacto_submit.addEventListener("click", (event) => {
        event.preventDefault()
        checkForm()
    })
})