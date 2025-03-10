import Tour from '../models/TourModel';
import Service from '../models/ServiceModel';
import { InferAttributes, Transaction } from 'sequelize';
import { makeErrorResponse } from '../utils/ErrorHandler';

/**
 * Obtener todos los tours con sus servicios asociados
 */
export const getAllTours = async (): Promise<Tour[]> => {
    try {
        return await Tour.findAll({
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
 * Obtener un tour por ID, incluyendo sus servicios
 */
export const getTourById = async (id: number): Promise<Tour> => {
    try {
        const tour = await Tour.findByPk(id, {
            include: [
                {
                    model: Service,
                    attributes: ['id', 'name', 'description'],
                    through: { attributes: [] },
                },
            ],
        });
        if (!tour) throw makeErrorResponse(404, 'Tour');
        return tour;
    } catch (error) {
        throw error;
    }
};

/**
 * Obtener un tour por ID, incluyendo sus servicios
 */
export const getTourByPlanet = async (planet: string): Promise<Tour[]> => {
    try {
        planet = planet.toLowerCase();
        const tours = await Tour.findAll({
            where: { planet },
            include: [
                {
                    model: Service,
                    attributes: ['id', 'name', 'description'],
                    through: { attributes: [] },
                },
            ],
        });
        return tours;
    } catch (error) {
        throw error;
    }
};

/**
 * Crear un nuevo tour y asociar servicios opcionales
 */
export const createTour = async (
    tourData: Partial<Tour> & { services?: Partial<Service>[] },
): Promise<Tour> => {
    return await Tour.sequelize!.transaction(async (transaction: Transaction) => {
        try {
            const existingTour = await Tour.findOne({
                where: { name: tourData.name },
                transaction,
            });
            if (existingTour)
                throw makeErrorResponse(409, `El tour con nombre "${tourData.name}" ya existe.`);
            tourData.planet = tourData.planet?.toLowerCase();
            const newTour = await Tour.create(tourData, { transaction });

            if (tourData.services?.length) {
                const serviceNames = tourData.services.map((service) => service.name!);
                const existingServices = await Service.findAll({
                    where: { name: serviceNames },
                    transaction,
                });

                const servicesToCreate = tourData.services.filter(
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

                await newTour.$add(
                    'services',
                    allServices.map((service) => service.id),
                    { transaction },
                );
            }

            return (await Tour.findByPk(newTour.id, {
                include: [{ model: Service }],
                transaction,
            })) as Tour;
        } catch (error) {
            throw error;
        }
    });
};

/**
 * Actualizar un tour existente y sus servicios
 */
export const updateTour = async (
    id: number,
    tourData: Partial<Tour> & { services?: Partial<Service>[] },
): Promise<Tour> => {
    return await Tour.sequelize!.transaction(async (transaction: Transaction) => {
        try {
            const tour = await Tour.findByPk(id, { include: [{ model: Service }], transaction });
            if (!tour) throw makeErrorResponse(404, 'Tour no encontrado.');

            if (tourData.name && tourData.name !== tour.name) {
                const existingTour = await Tour.findOne({
                    where: { name: tourData.name },
                    transaction,
                });
                if (existingTour)
                    throw makeErrorResponse(
                        409,
                        `El tour con nombre "${tourData.name}" ya existe.`,
                    );
            }

            await tour.update(tourData, { transaction });

            if (tourData.services?.length) {
                const serviceNames = tourData.services.map((service) => service.name!);
                const existingServices = await Service.findAll({
                    where: { name: serviceNames },
                    transaction,
                });

                const servicesToCreate = tourData.services.filter(
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

                await tour.$set(
                    'services',
                    allServices.map((service) => service.id),
                    { transaction },
                );
            }

            return (await Tour.findByPk(id, {
                include: [{ model: Service }],
                transaction,
            })) as Tour;
        } catch (error) {
            throw error;
        }
    });
};

/**
 * Eliminar un tour y desasociar servicios
 */
export const deleteTour = async (id: number): Promise<void> => {
    return await Tour.sequelize!.transaction(async (transaction: Transaction) => {
        try {
            const tour = await Tour.findByPk(id, { transaction });
            if (!tour) throw makeErrorResponse(404, 'Tour');

            await tour.$set('services', [], { transaction });
            await tour.destroy({ transaction });
        } catch (error) {
            throw error;
        }
    });
};
