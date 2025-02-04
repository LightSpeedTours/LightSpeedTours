import Tour from '../models/TourModel';
import Service from '../models/ServiceModel';
import { Transaction } from 'sequelize';

/**
 * Obtener todos los tours con sus servicios asociados
 */
export const getAllTours = async (): Promise<Tour[]> => {
  return await Tour.findAll({
    include: [{ model: Service }]
  });
};

/**
 * Obtener un tour por ID, incluyendo sus servicios
 */
export const getTourById = async (id: number): Promise<Tour | null> => {
  return await Tour.findByPk(id, {
    include: [{ model: Service }]
  });
};

/**
 * Crear un nuevo tour y asociar servicios opcionales (creando nuevos servicios si es necesario).
 */
export const createTour = async (tourData: Partial<Tour> & { services?: Partial<Service>[] }): Promise<Tour> => {
  return await Tour.sequelize!.transaction(async (transaction: Transaction) => {

    const existingTour = await Tour.findOne({ where: { name: tourData.name }, transaction });
    if (existingTour) {
      throw new Error(`Tour with name "${tourData.name}" already exists.`);
    }

    const newTour = await Tour.create(tourData, { transaction });

    if (tourData.services && tourData.services.length > 0) {
      const serviceNames = tourData.services.map(service => service.name);

      const existingServices = await Service.findAll({ where: { name: serviceNames }, transaction });

      const existingServiceNames = existingServices.map(service => service.name);
      const servicesToCreate = tourData.services
        .filter(service => !existingServiceNames.includes(service.name))
        .map(service => ({
          name: service.name,
          description: service.description
        }));

      let createdServices: Service[] = [];
      if (servicesToCreate.length > 0) {
        createdServices = await Service.bulkCreate(servicesToCreate as any, { transaction });
      }

      const allServiceIds = [...existingServices.map(service => service.id), ...createdServices.map(service => service.id)];

      if (allServiceIds.length > 0) {
        const servicesToAssociate = await Service.findAll({ where: { id: allServiceIds }, transaction });
        await newTour.$set('services', servicesToAssociate, { transaction });
      }
    }

    return await Tour.findByPk(newTour.id, {
      include: [{ model: Service }],
      transaction
    }) as Tour;
  });
};


/**
 * Actualizar un tour existente y sus servicios (relación N:M)
 */
export const updateTour = async (id: number, tourData: Partial<Tour> & { services?: Partial<Service>[] }): Promise<Tour | null> => {
  return await Tour.sequelize!.transaction(async (transaction: Transaction) => {
    const tour = await Tour.findByPk(id, { include: [{ model: Service }], transaction });
    if (!tour) throw new Error('Tour not found');

    if (tourData.name && tourData.name !== tour.name) {
      const existingTour = await Tour.findOne({ where: { name: tourData.name }, transaction });
      if (existingTour) {
        throw new Error(`Tour with name "${tourData.name}" already exists.`);
      }
    }

    await tour.update(tourData, { transaction });

    if (tourData.services && tourData.services.length > 0) {
      const validServices = tourData.services.filter(service => service.name && service.description);

      const serviceNames = validServices.map(service => service.name!);

      const existingServices = await Service.findAll({ where: { name: serviceNames }, transaction });

      const existingServiceNames = existingServices.map(service => service.name);
      const servicesToCreate = validServices
        .filter(service => !existingServiceNames.includes(service.name!))
        .map(service => ({
          name: service.name!,
          description: service.description!
        }));

      let createdServices: Service[] = [];
      if (servicesToCreate.length > 0) {
        createdServices = await Service.bulkCreate(servicesToCreate as any, { transaction });
      }

      const allServiceIds = [...existingServices.map(service => service.id), ...createdServices.map(service => service.id)];

      if (allServiceIds.length > 0) {
        const servicesToAssociate = await Service.findAll({ where: { id: allServiceIds }, transaction });
        await tour.$set('services', servicesToAssociate, { transaction });
      }
    }

    return await Tour.findByPk(id, {
      include: [{ model: Service }],
      transaction
    }) as Tour;
  });
};



export const deleteTour = async (id: number): Promise<void> => {
  return await Tour.sequelize!.transaction(async (transaction: Transaction) => {
    const lodging = await Tour.findByPk(id, { transaction });
    if (!lodging) throw new Error('Tour not found');

    await lodging.$set('services', [], { transaction });

    await lodging.destroy({ transaction });
  });
};
