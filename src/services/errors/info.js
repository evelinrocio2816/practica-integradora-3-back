const generateInfoError = (user) => {
    return ` Los datos estan incompletos o no son válidos. 
    Necesitamos recibir los siguientes datos: 
    - Nombre: String, pero recibimos ${user.first_name}
    - Apellido: String, pero recibimos ${user.last_name}
    - Email: String, recibimos ${user.email}
    -Password: recibimos ${user.password}
    -Edad: recibimos ${user.age}
    `
}

module.exports = {
    generateInfoError
}