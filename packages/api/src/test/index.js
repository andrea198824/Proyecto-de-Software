/**
 * Para ejecutar estas pruebas, se necesita Jest instalado:
 * npm install --save-dev jest
 * Luego, se ejecutaría: npx jest
 *
 * NOTA: Aquí simulamos los 'require' de los archivos de servicio.
 */

// Simulación de los módulos (debes tener estos archivos creados con el código anterior)
const UserService = require('./userService');
const LoanService = require('./loanService');
const MasterDataService = require('./masterDataServices');


// ----------------------------------------------------------------------
// GRUPO 1: PRUEBAS DEL SERVICIO DE USUARIOS
// ----------------------------------------------------------------------
describe('Servicio de Usuarios (UserService)', () => {
    
    // Al inicio de cada prueba, aseguramos que el estado global de sesión esté limpio
    beforeEach(() => {
        UserService.logout(); 
    });

    // --- Pruebas de CREATE (createUser) ---
    test('Debe crear un nuevo usuario exitosamente', () => {
        const result = UserService.createUser("nuevo@cliente.com", "pass123", "Cliente Nuevo");
        expect(result.success).toBe(true);
        expect(result.userEmail).toBe("nuevo@cliente.com");
        expect(result.message).toContain("exitosa");
    });

    test('Debe fallar al crear un usuario si el email ya existe', () => {
        // El usuario 'admin@example.com' existe en la simulación inicial
        const result = UserService.createUser("admin@example.com", "pass123", "Duplicado");
        expect(result.success).toBe(false);
        expect(result.message).toContain("ya está registrado");
    });

    // --- Pruebas de UPDATE (updateUser) ---
    test('Debe actualizar el nombre de un usuario existente', () => {
        // Aseguramos que existe un usuario conocido para actualizar
        const initialUser = UserService.createUser("cambio@test.com", "oldpass", "Initial Name");
        const updateResult = UserService.updateUser("cambio@test.com", { name: "Nombre Actualizado" });
        
        expect(updateResult.success).toBe(true);
        expect(updateResult.message).toContain("actualizado correctamente");
        // Nota: En un entorno real, verificaríamos el estado de la DB simulada.
    });

    test('Debe fallar al actualizar un usuario que no existe', () => {
        const result = UserService.updateUser("inexistente@test.com", { name: "X" });
        expect(result.success).toBe(false);
        expect(result.message).toContain("no encontrado para actualizar");
    });

    // --- Pruebas de LOGIN y LOGOUT ---
    test('Debe iniciar sesión con credenciales válidas', () => {
        const result = UserService.login("admin@example.com", "password123");
        expect(result.success).toBe(true);
        expect(result.message).toContain("Bienvenido");
    });

    test('Debe fallar al iniciar sesión con contraseña incorrecta', () => {
        const result = UserService.login("admin@example.com", "wrongpassword");
        expect(result.success).toBe(false);
        expect(result.message).toContain("Contraseña incorrecta");
    });

    test('Debe cerrar la sesión activa', () => {
        UserService.login("admin@example.com", "password123");
        const result = UserService.logout();
        expect(result).toContain("Sesión cerrada");
    });
});

// ----------------------------------------------------------------------
// GRUPO 2: PRUEBAS DEL SERVICIO DE FORMULARIOS DE PRÉSTAMO
// ----------------------------------------------------------------------
describe('Servicio de Formularios de Préstamo (LoanService)', () => {
    let createdFormId;

    // --- Pruebas de CREATE (createLoanForm) ---
    test('Debe crear un formulario de préstamo con el estado inicial Pendiente (1)', () => {
        const result = LoanService.createLoanForm(105, 1, 15000.00, 48, '2026-03-01');
        
        expect(result.success).toBe(true);
        expect(result.data.value).toBe("15000.00");
        expect(result.data.status).toBe(1); // Pendiente
        createdFormId = result.data.idloanform;
    });

    test('Debe fallar al crear un formulario si faltan campos obligatorios', () => {
        const result = LoanService.createLoanForm(105, 1, 0, 48, '2026-03-01'); // Monto 0
        expect(result.success).toBe(false);
        expect(result.message).toContain("obligatorios");
    });

    // --- Pruebas de GET (getLoanForm) ---
    test('Debe obtener el detalle del formulario recién creado', () => {
        const result = LoanService.getLoanForm(createdFormId);
        expect(result.success).toBe(true);
        expect(result.data.idloanform).toBe(createdFormId);
        expect(result.data.idclient).toBe(105);
    });

    test('Debe fallar al obtener un formulario que no existe', () => {
        const result = LoanService.getLoanForm(9999);
        expect(result.success).toBe(false);
        expect(result.message).toContain("no encontrada");
    });

    // --- Pruebas de UPDATE (updateLoanForm) ---
    test('Debe actualizar el score y el estado de la solicitud (simulando RQF-03)', () => {
        const updateResult = LoanService.updateLoanForm(
            createdFormId,
            { score: 850, status: 2 } // 2: Aprobado
        );
        
        expect(updateResult.success).toBe(true);
        expect(updateResult.data.score).toBe(850);
        expect(updateResult.data.status).toBe(2);
        expect(updateResult.message).toContain("actualizada correctamente");
    });
    
    test('Debe fallar al intentar actualizar un formulario inexistente', () => {
        const updateResult = LoanService.updateLoanForm(9999, { value: 1000 });
        expect(updateResult.success).toBe(false);
        expect(updateResult.message).toContain("no encontrada");
    });
});

// ----------------------------------------------------------------------
// GRUPO 3: PRUEBAS DE SERVICIOS DE TABLAS MAESTRAS (MASTER DATA)
// ----------------------------------------------------------------------
describe('Servicios de Tablas Maestras (MasterDataService)', () => {
    
    // Usaremos Sucursales y Productos Financieros para demostrar el patrón de prueba
    let newProductId;
    let newSubsidiaryId;

    // --- Pruebas CRUD para PRODUCTOS FINANCIEROS ---
    describe('CRUD de Productos Financieros', () => {
        
        test('CREATE: Debe crear un nuevo producto con su ID y tasa de interés formateada', () => {
            const newProduct = MasterDataService.createProductoFinanciero('Préstamo Pymes', 12.75);
            newProductId = newProduct.idproduct;
            
            expect(newProduct).toBeDefined();
            expect(newProduct.name).toBe('Préstamo Pymes');
            expect(newProduct.bankInterest).toBe("12.75");
        });

        test('GET: Debe obtener el producto financiero recién creado', () => {
            const product = MasterDataService.getProductoFinanciero(newProductId);
            expect(product.idproduct).toBe(newProductId);
            expect(product.status).toBe(1);
        });

        test('UPDATE: Debe actualizar el estado y la tasa de interés', () => {
            const updated = MasterDataService.updateProductoFinanciero(newProductId, { status: 0, bankInterest: 10.50 });
            
            expect(updated.status).toBe(0);
            expect(updated.bankInterest).toBe("10.50"); // Verifica la actualización y el formato
        });
    });

    // --- Pruebas CRUD para SUCURSALES ---
    describe('CRUD de Sucursales', () => {
        test('CREATE: Debe crear una nueva Sucursal', () => {
            const newSubsidiary = MasterDataService.createSucursal("Sede Sur");
            newSubsidiaryId = newSubsidiary.idsubsidiary;
            expect(newSubsidiary.description).toBe("Sede Sur");
            expect(newSubsidiary.createdat).toBe(getTodayDate());
        });

        test('GET: Debe obtener la lista completa de Sucursales', () => {
            const allSubsidiaries = MasterDataService.getSucursal();
            expect(allSubsidiaries.length).toBeGreaterThan(2); // Al menos las 2 iniciales + la creada
        });

        test('UPDATE: Debe cambiar la descripción de la Sucursal', () => {
            const updated = MasterDataService.updateSucursal(newSubsidiaryId, { description: "Sede Sur - Renovada" });
            expect(updated.description).toBe("Sede Sur - Renovada");
        });
    });

    // --- Verificación Conceptual para el resto de las tablas (Prueba Rápida) ---
    describe('Verificación de otras tablas maestras (Lectura)', () => {
        test('Debe obtener una lista de Niveles Académicos', () => {
            const list = MasterDataService.getNivelAcademico();
            expect(list.length).toBeGreaterThan(0);
            expect(list[0].description).toBeDefined();
        });

        test('Debe poder crear y leer una Ocupación', () => {
            const newO = MasterDataService.createOcupacion('Consultor');
            const fetchedO = MasterDataService.getOcupacion(newO.idocupation);
            expect(fetchedO.description).toBe('Consultor');
        });
    });
});

// Simulación de la función getTodayDate para que las pruebas de fecha sean consistentes
function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}