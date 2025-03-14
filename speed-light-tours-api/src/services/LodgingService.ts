import Lodging from '../models/LodgingModel';
import Service from '../models/ServiceModel';
import { InferAttributes, Transaction } from 'sequelize';
import { makeErrorResponse } from '../utils/ErrorHandler';

/**
 * Obtener todos los hospedajes con sus servicios asociados
 */
export const getAllLodgings = async (): Promise<Lodging[]> => {
    try {
        return await Lodging.findAll({
            include: [
                {
                    model: Service,
                    attributes: ['id', 'name', 'description'],
                    through: { attributes: [] },
                },
            ],
        });
    } catch (error) {
        throw error;
    }
};

/**
 * Obtener un hospedaje por ID, incluyendo sus servicios
 */
export const getLodgingById = async (id: number): Promise<Lodging> => {
    try {
        const lodging = await Lodging.findByPk(id, {
            include: [
                {
                    model: Service,
                    attributes: ['id', 'name', 'description'],
                    through: { attributes: [] },
                },
            ],
        });
        if (!lodging) throw makeErrorResponse(404, 'Hospedaje');
        return lodging;
    } catch (error) {
        throw error;
    }
};

export const getLodgingByPlanet = async (planet: string): Promise<Lodging[]> => {
    try {
        planet = planet.toLowerCase();
        const lodgingList = await Lodging.findAll({
            where: { planet },
            include: [
                {
                    model: Service,
                    attributes: ['id', 'name', 'description'],
                    through: { attributes: [] },
                },
            ],
        });

        return lodgingList;
    } catch (error) {
        throw error;
    }
};

/**
 * Obtener todos los hospedajes de un planeta específico con sus servicios asociados
 */
export const getLodgingsByPlanet = async (planet: string): Promise<Lodging[]> => {
    try {
        return await Lodging.findAll({
            where: { planet },
            include: [
                {
                    model: Service,
                    attributes: ['id', 'name', 'description'],
                    through: { attributes: [] },
                },
            ],
        });
    } catch (error) {
        throw error;
    }
};

/**
 * Crear un nuevo hospedaje y asociar servicios opcionales
 */
export const createLodging = async (
    lodgingData: Partial<Lodging> & { services?: Partial<Service>[] },
): Promise<Lodging> => {
    return await Lodging.sequelize!.transaction(async (transaction: Transaction) => {
        try {
            const existingLodging = await Lodging.findOne({
                where: { name: lodgingData.name },
                transaction,
            });
            if (existingLodging)
                throw makeErrorResponse(
                    409,
                    `El hospedaje con nombre "${lodgingData.name}" ya existe.`,
                );
            lodgingData.planet = lodgingData.planet?.toLowerCase();

            const newLodging = await Lodging.create(lodgingData, { transaction });

            if (lodgingData.services?.length) {
                const serviceNames = lodgingData.services.map((service) => service.name!);
                const existingServices = await Service.findAll({
                    where: { name: serviceNames },
                    transaction,
                });

                const servicesToCreate = lodgingData.services.filter(
                    (service) =>
                        !existingServices.some((existing) => existing.name === service.name),
                );

                let createdServices: Service[] = [];
                if (servicesToCreate.length) {
                    createdServices = await Service.bulkCreate(
                        servicesToCreate as InferAttributes<Service>[],
                        { transaction },
                    );
                }

                const allServices = [...existingServices, ...createdServices];

                // ✅ Usar `addServices()` para insertar en `lodging_services`
                await newLodging.$add(
                    'services',
                    allServices.map((service) => service.id),
                    { transaction },
                );
            }

            return (await Lodging.findByPk(newLodging.id, {
                include: [{ model: Service }],
                transaction,
            })) as Lodging;
        } catch (error) {
            throw error;
        }
    });
};

/**
 * Actualizar un hospedaje existente y sus servicios
 */
export const updateLodging = async (
    id: number,
    lodgingData: Partial<Lodging> & { services?: Partial<Service>[] },
): Promise<Lodging> => {
    return await Lodging.sequelize!.transaction(async (transaction: Transaction) => {
        try {
            const lodging = await Lodging.findByPk(id, {
                include: [{ model: Service }],
                transaction,
            });
            if (!lodging) throw makeErrorResponse(404, 'Hospedaje no encontrado.');

            if (lodgingData.name && lodgingData.name !== lodging.name) {
                const existingLodging = await Lodging.findOne({
                    where: { name: lodgingData.name },
                    transaction,
                });
                if (existingLodging)
                    throw makeErrorResponse(
                        409,
                        `El hospedaje con nombre "${lodgingData.name}" ya existe.`,
                    );
            }

            await lodging.update(lodgingData, { transaction });

            if (lodgingData.services?.length) {
                const serviceNames = lodgingData.services.map((service) => service.name!);
                const existingServices = await Service.findAll({
                    where: { name: serviceNames },
                    transaction,
                });

                const servicesToCreate = lodgingData.services.filter(
                    (service) =>
                        !existingServices.some((existing) => existing.name === service.name),
                );

                let createdServices: Service[] = [];
                if (servicesToCreate.length) {
                    createdServices = await Service.bulkCreate(
                        servicesToCreate as InferAttributes<Service>[],
                        { transaction },
                    );
                }

                const allServices = [...existingServices, ...createdServices];

                await lodging.$set(
                    'services',
                    allServices.map((service) => service.id),
                    { transaction },
                );
            }

            return (await Lodging.findByPk(id, {
                include: [{ model: Service }],
                transaction,
            })) as Lodging;
        } catch (error) {
            throw error;
        }
    });
};

/**
 * Eliminar un hospedaje y desasociar servicios
 */
export const deleteLodging = async (id: number): Promise<void> => {
    return await Lodging.sequelize!.transaction(async (transaction: Transaction) => {
        try {
            const lodging = await Lodging.findByPk(id, { transaction });
            if (!lodging) throw makeErrorResponse(404, 'Hospedaje');

            await lodging.$set('services', [], { transaction });
            await lodging.destroy({ transaction });
        } catch (error) {
            throw error;
        }
    });
};
