async function guardarDato() {
    event.preventDefault();
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let mail = document.getElementById('mail').value;
    let user = document.getElementById('username').value;
    let password = document.getElementById('contrasenia').value;

    //Verificar campos del formulario
    if(user == "" || password == "" || nombre == "" || apellido == "" || mail == "") {
        alert("Faltan datos en el formulario.");
        return;
    };
    if(!esCorreoValido(mail)){
        alert("Correo electronico invalido.");
        return;
    };
    
    // Verificar si el nombre de usuario o correo ya existe
    const usuariosExistente = await obtenerUsuarios();
    if(usuariosExistente.some(usuario => usuario.mail === mail))
    {
        alert("El correo ya está registrado. Inicia sesión con tu usuario.");
        return;
    }
    else if (usuariosExistente.some(usuario => usuario.username === user)) {
        alert("El nombre de usuario ya existe. Por favor, elige otro.");
        return;
    }

    const dato = {
        name: nombre,
        lastname: apellido,
        mail: mail,
        username: user,
        password: password
    }
    const response = await fetch('/guardar-datos', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify([dato])
    });
    const result = await response.json();
    alert(result.message);
    window.location.href = '../index.html';
}

async function obtenerUsuarios() {
    const response = await fetch('/obtener-usuarios');
    const usuarios = await response.json();
    return usuarios;
}

function esCorreoValido(correo) {
    // Expresión regular para validar un correo electrónico simple
    const expresionRegularCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionRegularCorreo.test(correo);
}