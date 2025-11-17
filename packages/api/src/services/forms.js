
/**
 * @typedef {Object} LoanForm
 * @property {number} idloanform - Clave primaria.
 * @property {number} idclient - ID del cliente (Foreign Key).
 * @property {number} idproduct - ID del producto financiero (Foreign Key).
 * @property {number} value - Monto solicitado.
 * @property {number} cuotes - Número de cuotas.
 * @property {string} initdate - Fecha de inicio del préstamo (formato 'YYYY-MM-DD').
 * @property {number} status - Estado de la solicitud (1: Pendiente, 2: Aprobado, 3: Rechazado).
 * @property {number | null} score - Puntuación de riesgo asignada por el modelo (RQF-03).
 * @property {string} createdat - Fecha de creación.
 * @property {string} updatedat - Fecha de última actualización.
 */

/** @type {LoanForm[]} */
let LOAN_FORMS = [
    {
        idloanform: 1,
        idclient: 101,
        idproduct: 1,
        value: 5000.00,
        cuotes: 12,
        initdate: '2025-11-20',
        status: 1, // Pendiente
        score: null,
        createdat: '2025-11-16',
        updatedat: '2025-11-16'
    }
];

let nextId = LOAN_FORMS.length + 1; // Contador para simular AUTO_INCREMENT

// Función auxiliar para obtener la fecha actual en formato 'YYYY-MM-DD'
const getTodayDate = () => new Date().toISOString().split('T')[0];

/**
 * @typedef {Object} LoanFormResult
 * @property {boolean} success - Indica si la operación fue exitosa.
 * @property {string} message - Mensaje descriptivo del resultado.
 * @property {LoanForm | LoanForm[] | null} data - El formulario o lista de formularios afectados.
 */


/**
 * Crea un nuevo registro de solicitud de préstamo (RQF-01).
 * @param {number} idclient - ID del cliente solicitante.
 * @param {number} idproduct - ID del producto financiero.
 * @param {number} value - Monto solicitado.
 * @param {number} cuotes - Número de cuotas.
 * @param {string} initdate - Fecha de inicio propuesta (YYYY-MM-DD).
 * @returns {LoanFormResult} Resultado de la operación.
 */
function createLoanForm(idclient, idproduct, value, cuotes, initdate) {
    if (!idclient || !idproduct || value <= 0 || cuotes <= 0) {
        return {
            success: false,
            message: "Los campos idclient, idproduct, value y cuotes son obligatorios y deben ser válidos.",
            data: null,
        };
    }

    const today = getTodayDate();

    /** @type {LoanForm} */
    const newForm = {
        idloanform: nextId++,
        idclient,
        idproduct,
        value: parseFloat(value).toFixed(2),
        cuotes,
        initdate,
        status: 1, // Estado inicial: Pendiente de evaluación (RQF-03)
        score: null, // El score se asigna después por el servicio de predicción
        createdat: today,
        updatedat: today,
    };

    LOAN_FORMS.push(newForm);
    return {
        success: true,
        message: `Solicitud de préstamo #${newForm.idloanform} creada exitosamente.`,
        data: newForm,
    };
}

/**
 * Actualiza los campos de una solicitud de préstamo existente.
 * Se usa para cambiar el estado (RQF-03), asignar el score o modificar el monto/cuotas.
 * @param {number} idloanform - ID del formulario a actualizar.
 * @param {Object} updates - Objeto con los campos a actualizar ({ value?: number, cuotes?: number, status?: number, score?: number }).
 * @returns {LoanFormResult} Resultado de la operación.
 */
function updateLoanForm(idloanform, updates) {
    const formIndex = LOAN_FORMS.findIndex(f => f.idloanform === idloanform);

    if (formIndex === -1) {
        return {
            success: false,
            message: `Solicitud #${idloanform} no encontrada.`,
            data: null,
        };
    }

    const form = LOAN_FORMS[formIndex];
    let changesMade = false;
    const today = getTodayDate();

    // Actualización del Monto
    if (updates.value && updates.value > 0 && updates.value !== form.value) {
        form.value = parseFloat(updates.value).toFixed(2);
        changesMade = true;
    }

    // Actualización de Cuotas
    if (updates.cuotes && updates.cuotes > 0 && updates.cuotes !== form.cuotes) {
        form.cuotes = updates.cuotes;
        changesMade = true;
    }

    // Actualización del Estado (por ejemplo, después de la evaluación del Analista)
    if (updates.status && updates.status !== form.status) {
        form.status = updates.status;
        changesMade = true;
    }
    
    // Actualización del Score (por el servicio de Predicción - RQF-03)
    if (updates.score !== undefined && updates.score !== null && updates.score !== form.score) {
        form.score = updates.score;
        changesMade = true;
    }

    if (changesMade) {
        form.updatedat = today;
        LOAN_FORMS[formIndex] = form;
        return {
            success: true,
            message: `Solicitud #${idloanform} actualizada correctamente.`,
            data: form,
        };
    } else {
        return {
            success: false,
            message: `No se realizaron cambios para la Solicitud #${idloanform}.`,
            data: form,
        };
    }
}


/**
 * Obtiene el detalle de una solicitud específica por su ID (RQF-05).
 * @param {number} idloanform - ID del formulario a obtener.
 * @returns {LoanFormResult} Resultado de la operación.
 */
function getLoanForm(idloanform) {
    const form = LOAN_FORMS.find(f => f.idloanform === idloanform);

    if (!form) {
        return {
            success: false,
            message: `Solicitud #${idloanform} no encontrada.`,
            data: null,
        };
    }

    return {
        success: true,
        message: `Detalle de la Solicitud #${idloanform} obtenido.`,
        data: form,
    };
}

export default {
    createLoanForm,
    updateLoanForm,
    getLoanForm,
};