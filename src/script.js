async function ingresar() {
    let user = document.getElementById('username').value;
    let password = document.getElementById('contrasenia').value;

    // Verificar si existe el usuario en la base de datos
    const usuariosExistente = await obtenerUsuarios();
    if(usuariosExistente.some(usuario => usuario.username === user && usuario.password === password))
    {
        alert("Inicio de sesion exitoso!");
        return;
    }
    else{
        alert("Nombre de usuario o contraseña incorrecto.");
        return;
    }
}

async function obtenerUsuarios() {
    const response = await fetch('/obtener-usuarios');
    const usuarios = await response.json();
    console.log(usuarios)
    return usuarios;
}