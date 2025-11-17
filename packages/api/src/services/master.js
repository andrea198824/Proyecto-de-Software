
const getTodayDate = () => new Date().toISOString().split('T')[0];

// 1. SUCURSALES
let SUCURSALES = [
    { idsubsidiary: 1, description: 'Sede Principal', status: 1, createdat: getTodayDate(), updatedat: getTodayDate() },
    { idsubsidiary: 2, description: 'Sede Norte', status: 1, createdat: getTodayDate(), updatedat: getTodayDate() }
];
let nextSubsidiaryId = SUCURSALES.length > 0 ? SUCURSALES[SUCURSALES.length - 1].idsubsidiary + 1 : 1;

// 2. NIVEL ACADÉMICO
let NIVEL_ACADEMICO = [
    { idstudy: 1, description: 'Bachillerato', status: 1, createdat: getTodayDate(), updatedat: getTodayDate() },
    { idstudy: 2, description: 'Universitario', status: 1, createdat: getTodayDate(), updatedat: getTodayDate() }
];
let nextStudyId = NIVEL_ACADEMICO.length > 0 ? NIVEL_ACADEMICO[NIVEL_ACADEMICO.length - 1].idstudy + 1 : 1;

// 3. OCUPACIÓN
let OCUPACION = [
    { idocupation: 1, description: 'Empleado Fijo', status: 1, createdat: getTodayDate(), updatedat: getTodayDate() },
    { idocupation: 2, description: 'Independiente', status: 1, createdat: getTodayDate(), updatedat: getTodayDate() }
];
let nextOcupationId = OCUPACION.length > 0 ? OCUPACION[OCUPACION.length - 1].idocupation + 1 : 1;

// 4. CATEGORÍAS
let CATEGORIAS = [
    { idcategory: 1, description: 'Individual', status: 1, createdat: getTodayDate(), updatedat: getTodayDate() },
    { idcategory: 2, description: 'Empresarial', status: 1, createdat: getTodayDate(), updatedat: getTodayDate() }
];
let nextCategoryId = CATEGORIAS.length > 0 ? CATEGORIAS[CATEGORIAS.length - 1].idcategory + 1 : 1;

// 5. PRODUCTOS FINANCIEROS
let PRODUCTOS_FINANCIEROS = [
    { idproduct: 1, name: 'Crédito de Consumo', status: 1, bankInterest: 15.50, createdat: getTodayDate(), updatedat: getTodayDate() },
    { idproduct: 2, name: 'Crédito Hipotecario', status: 1, bankInterest: 9.25, createdat: getTodayDate(), updatedat: getTodayDate() }
];
let nextProductId = PRODUCTOS_FINANCIEROS.length > 0 ? PRODUCTOS_FINANCIEROS[PRODUCTOS_FINANCIEROS.length - 1].idproduct + 1 : 1;

// 6. TIPO DE USUARIO
let TIPO_USUARIO = [
    { idtype: 1, name: 'Solicitante', status: 1, createdat: getTodayDate(), updatedat: getTodayDate() },
    { idtype: 2, name: 'Analista de Crédito', status: 1, createdat: getTodayDate(), updatedat: getTodayDate() }
];
let nextTypeId = TIPO_USUARIO.length > 0 ? TIPO_USUARIO[TIPO_USUARIO.length - 1].idtype + 1 : 1;


/** Crea una nueva sucursal. */
export function createSucursal(description) {
    const newSubsidiary = {
        idsubsidiary: nextSubsidiaryId++,
        description,
        status: 1,
        createdat: getTodayDate(),
        updatedat: getTodayDate(),
    };
    SUCURSALES.push(newSubsidiary);
    return newSubsidiary;
}

/** Obtiene una sucursal por ID o todas. */
export function getSucursal(idsubsidiary = null) {
    if (idsubsidiary === null) return SUCURSALES;
    return SUCURSALES.find(s => s.idsubsidiary === idsubsidiary);
}

/** Actualiza una sucursal existente. */
export function updateSucursal(idsubsidiary, updates) {
    const index = SUCURSALES.findIndex(s => s.idsubsidiary === idsubsidiary);
    if (index === -1) return null;
    SUCURSALES[index] = { ...SUCURSALES[index], ...updates, updatedat: getTodayDate() };
    return SUCURSALES[index];
}


/** Crea un nuevo nivel académico. */
export function createNivelAcademico(description) {
    const newStudy = {
        idstudy: nextStudyId++,
        description,
        status: 1,
        createdat: getTodayDate(),
        updatedat: getTodayDate(),
    };
    NIVEL_ACADEMICO.push(newStudy);
    return newStudy;
}

/** Obtiene un nivel académico por ID o todos. */
export function getNivelAcademico(idstudy = null) {
    if (idstudy === null) return NIVEL_ACADEMICO;
    return NIVEL_ACADEMICO.find(n => n.idstudy === idstudy);
}

/** Actualiza un nivel académico existente. */
export function updateNivelAcademico(idstudy, updates) {
    const index = NIVEL_ACADEMICO.findIndex(n => n.idstudy === idstudy);
    if (index === -1) return null;
    NIVEL_ACADEMICO[index] = { ...NIVEL_ACADEMICO[index], ...updates, updatedat: getTodayDate() };
    return NIVEL_ACADEMICO[index];
}


/** Crea una nueva ocupación. */
export function createOcupacion(description) {
    const newOcupation = {
        idocupation: nextOcupationId++,
        description,
        status: 1,
        createdat: getTodayDate(),
        updatedat: getTodayDate(),
    };
    OCUPACION.push(newOcupation);
    return newOcupation;
}

/** Obtiene una ocupación por ID o todas. */
export function getOcupacion(idocupation = null) {
    if (idocupation === null) return OCUPACION;
    return OCUPACION.find(o => o.idocupation === idocupation);
}

/** Actualiza una ocupación existente. */
export function updateOcupacion(idocupation, updates) {
    const index = OCUPACION.findIndex(o => o.idocupation === idocupation);
    if (index === -1) return null;
    OCUPACION[index] = { ...OCUPACION[index], ...updates, updatedat: getTodayDate() };
    return OCUPACION[index];
}


/** Crea una nueva categoría. */
export function createCategoria(description) {
    const newCategory = {
        idcategory: nextCategoryId++,
        description,
        status: 1,
        createdat: getTodayDate(),
        updatedat: getTodayDate(),
    };
    CATEGORIAS.push(newCategory);
    return newCategory;
}

/** Obtiene una categoría por ID o todas. */
export function getCategoria(idcategory = null) {
    if (idcategory === null) return CATEGORIAS;
    return CATEGORIAS.find(c => c.idcategory === idcategory);
}

/** Actualiza una categoría existente. */
export function updateCategoria(idcategory, updates) {
    const index = CATEGORIAS.findIndex(c => c.idcategory === idcategory);
    if (index === -1) return null;
    CATEGORIAS[index] = { ...CATEGORIAS[index], ...updates, updatedat: getTodayDate() };
    return CATEGORIAS[index];
}


/** Crea un nuevo producto financiero. */
export function createProductoFinanciero(name, bankInterest) {
    const newProduct = {
        idproduct: nextProductId++,
        name,
        status: 1,
        bankInterest: parseFloat(bankInterest).toFixed(2),
        createdat: getTodayDate(),
        updatedat: getTodayDate(),
    };
    PRODUCTOS_FINANCIEROS.push(newProduct);
    return newProduct;
}

/** Obtiene un producto financiero por ID o todos. */
export function getProductoFinanciero(idproduct = null) {
    if (idproduct === null) return PRODUCTOS_FINANCIEROS;
    return PRODUCTOS_FINANCIEROS.find(p => p.idproduct === idproduct);
}

/** Actualiza un producto financiero existente. */
export function updateProductoFinanciero(idproduct, updates) {
    const index = PRODUCTOS_FINANCIEROS.findIndex(p => p.idproduct === idproduct);
    if (index === -1) return null;
    
    // Asegurar que bankInterest se formatee si se actualiza
    if (updates.bankInterest !== undefined) {
        updates.bankInterest = parseFloat(updates.bankInterest).toFixed(2);
    }
    
    PRODUCTOS_FINANCIEROS[index] = { ...PRODUCTOS_FINANCIEROS[index], ...updates, updatedat: getTodayDate() };
    return PRODUCTOS_FINANCIEROS[index];
}


/** Crea un nuevo tipo de usuario. */
export function createTipoUsuario(name) {
    const newType = {
        idtype: nextTypeId++,
        name,
        status: 1,
        createdat: getTodayDate(),
        updatedat: getTodayDate(),
    };
    TIPO_USUARIO.push(newType);
    return newType;
}

/** Obtiene un tipo de usuario por ID o todos. */
export function getTipoUsuario(idtype = null) {
    if (idtype === null) return TIPO_USUARIO;
    return TIPO_USUARIO.find(t => t.idtype === idtype);
}

/** Actualiza un tipo de usuario existente. */
export function updateTipoUsuario(idtype, updates) {
    const index = TIPO_USUARIO.findIndex(t => t.idtype === idtype);
    if (index === -1) return null;
    TIPO_USUARIO[index] = { ...TIPO_USUARIO[index], ...updates, updatedat: getTodayDate() };
    return TIPO_USUARIO[index];
}