// --- SIMULACIÓN DE BASE DE DATOS Y ESTADO DE SESIÓN ---
const USERS = [
    { email: "admin@example.com", password: "password123", name: "Admin User" },
    { email: "test@example.com", password: "secure", name: "Test Client" },
];

let currentUser = null; // Variable global para simular el estado de la sesión


/**
 * @typedef {Object} LoginResult
 * @property {boolean} success - Indica si la operación fue exitosa.
 * @property {string} message - Mensaje descriptivo del resultado.
 * @property {string | null} userEmail - El email del usuario logueado o null.
 */

/**
 * Intenta iniciar sesión con email y password.
 * Si el usuario no existe, sugiere la creación.
 * * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {LoginResult} Resultado de la operación.
 */
function login(email, password) {
    const user = USERS.find(u => u.email === email);

    if (!user) {
        // El usuario no existe
        return {
            success: false,
            message: `Usuario con email ${email} no encontrado. ¿Desea crear una cuenta?`,
            userEmail: null,
        };
    }

    if (user.password === password) {
        // Credenciales correctas
        currentUser = user.email; // Establece la sesión
        return {
            success: true,
            message: `¡Bienvenido, ${user.name}! Sesión iniciada correctamente.`,
            userEmail: user.email,
        };
    } else {
        // Contraseña incorrecta
        return {
            success: false,
            message: "Contraseña incorrecta. Inténtelo de nuevo.",
            userEmail: null,
        };
    }
}

/**
 * Cierra la sesión del usuario actual.
 * * @returns {string} Mensaje del estado de la sesión.
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

export default {
  login,
};