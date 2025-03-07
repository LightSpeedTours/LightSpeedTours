export const HttpResponses: Record<number, string | ((entity?: string) => string)> = {
    400: (entity?: string) => `${entity || 'la entidad'}. Verifique los datos ingresados.`,
    401: 'No tiene autorización para acceder a este recurso. Verifique su autenticación.',
    403: 'Acceso denegado. Inicie sesión nuevamente para continuar.',
    404: (entity?: string) =>
        `${entity || 'El recurso'} no fue encontrado. Verifique el ID o la URL.`,
    409: (entity?: string) => `Conflicto: ${entity || 'El recurso'} ya existe en el sistema.`,
    500: 'Error interno del servidor. Inténtelo de nuevo más tarde o contacte al soporte técnico.',
    200: 'OK',
    201: 'Created',
};
