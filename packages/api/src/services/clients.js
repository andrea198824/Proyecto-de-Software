
/**
 * @typedef {Object} User
 * @property {string} email - Correo electrónico, clave única.
 * @property {string} password - Contraseña (simulada sin hashing).
 * @property {string} name - Nombre completo del usuario.
 * @property {'Client' | 'Analyst' | 'Admin'} role - Rol del usuario en el sistema.
 */

/** @type {User[]} */
const USERS = [
    { email: "admin@example.com", password: "password123", name: "Admin User", role: 'Admin' },
    { email: "test@example.com", password: "secure", name: "Test Client", role: 'Client' },
];

let currentUser = null; // Variable global para simular el estado de la sesión


/**
 * @typedef {Object} OperationResult
 * @property {boolean} success - Indica si la operación fue exitosa.
 * @property {string} message - Mensaje descriptivo del resultado.
 * @property {string | null} userEmail - El email del usuario afectado o null.
 */

// -----------------------------------------------------------------
// 1. SERVICIO DE CREACIÓN (CREATE)
// -----------------------------------------------------------------

/**
 * Crea un nuevo usuario en el sistema.
 * Simula el RQF-01: Registro de solicitud de préstamo (creando el usuario solicitante).
 * @param {string} email - Correo electrónico (debe ser único).
 * @param {string} password - Contraseña.
 * @param {string} name - Nombre del usuario.
 * @returns {OperationResult} Resultado de la operación.
 */
function createUser(email, password, name) {
    if (USERS.find(u => u.email === email)) {
        return {
            success: false,
            message: `El email ${email} ya está registrado.`,
            userEmail: null,
        };
    }

    if (!email || !password || !name) {
         return {
            success: false,
            message: "Todos los campos (email, password, name) son obligatorios.",
            userEmail: null,
        };
    }

    // Por defecto, los nuevos usuarios son 'Client' (Solicitantes)
    const newUser = {
        email,
        password,
        name,
        role: 'Client', 
    };

    USERS.push(newUser);
    console.log("DB (simulada):", USERS); // Para ver el estado interno
    return {
        success: true,
        message: `Cuenta creada exitosamente para ${name}.`,
        userEmail: email,
    };
}


// -----------------------------------------------------------------
// 2. SERVICIO DE ACTUALIZACIÓN (UPDATE)
// -----------------------------------------------------------------

/**
 * Actualiza la información de un usuario existente.
 * Permite cambiar el nombre y/o la contraseña. El email actúa como clave.
 * @param {string} email - Correo electrónico del usuario a actualizar.
 * @param {Object} updates - Objeto con los campos a actualizar ({ name?: string, password?: string }).
 * @returns {OperationResult} Resultado de la operación.
 */
function updateUser(email, updates) {
    const userIndex = USERS.findIndex(u => u.email === email);

    if (userIndex === -1) {
        return {
            success: false,
            message: `Usuario con email ${email} no encontrado para actualizar.`,
            userEmail: null,
        };
    }

    const user = USERS[userIndex];
    let changesMade = false;

    if (updates.name && updates.name !== user.name) {
        user.name = updates.name;
        changesMade = true;
    }

    // En una aplicación real, la contraseña debe hashearse
    if (updates.password && updates.password !== user.password) {
        user.password = updates.password; 
        changesMade = true;
    }

    if (!changesMade) {
        return {
            success: false,
            message: `No se realizaron cambios para el usuario ${email}.`,
            userEmail: email,
        };
    }

    USERS[userIndex] = user; // Actualiza el usuario en la 'DB'
    console.log("DB (simulada):", USERS); // Para ver el estado interno
    return {
        success: true,
        message: `Usuario ${email} actualizado correctamente.`,
        userEmail: email,
    };
}

// -----------------------------------------------------------------
// FUNCIONES DE SESIÓN (MODIFICADAS PARA EXPORTACIÓN)
// -----------------------------------------------------------------

/**
 * Intenta iniciar sesión con email y password.
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {OperationResult} Resultado de la operación.
 */
function login(email, password) {
    const user = USERS.find(u => u.email === email);

    if (!user) {
        return {
            success: false,
            message: `Usuario con email ${email} no encontrado. ¿Desea crear una cuenta?`,
            userEmail: null,
        };
    }

    if (user.password === password) {
        currentUser = user.email; // Establece la sesión
        return {
            success: true,
            message: `¡Bienvenido, ${user.name}! Sesión iniciada correctamente.`,
            userEmail: user.email,
        };
    } else {
        return {
            success: false,
            message: "Contraseña incorrecta. Inténtelo de nuevo.",
            userEmail: null,
        };
    }
}

/**
 * Cierra la sesión del usuario actual.
 * @returns {string} Mensaje del estado de la sesión.
 */
function logout() {
    if (currentUser) {
        const loggedOutUser = currentUser;
        currentUser = null; // Cierra la sesión
        return `Sesión cerrada para el usuario: ${loggedOutUser}.`;
    } else {
        return "No hay ninguna sesión activa para cerrar.";
    }
}

// -----------------------------------------------------------------
// EXPORTACIÓN DEL SERVICIO
// -----------------------------------------------------------------

export default {
    login,
    logout,
    createUser,
    updateUser,
};