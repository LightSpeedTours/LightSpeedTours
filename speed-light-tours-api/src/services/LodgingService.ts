import Lodging from '../models/LodgingModel';
import Service from '../models/ServiceModel';
import { Transaction } from 'sequelize';

/**
 * Obtener todos los hospedajes con sus servicios asociados
 */
export const getAllLodgings = async (): Promise<Lodging[]> => {
  return await Lodging.findAll({
    include: [{ model: Service }]
  });
};

/**
 * Obtener un hospedaje por ID, incluyendo sus servicios
 */
export const getLodgingById = async (id: number): Promise<Lodging | null> => {
  return await Lodging.findByPk(id, {
    include: [{ model: Service }]
  });
};

/**
 * Crear un nuevo hospedaje y asociar servicios opcionales (creando nuevos servicios si es necesario).
 */
export const createLodging = async (lodgingData: Partial<Lodging> & { services?: Partial<Service>[] }): Promise<Lodging> => {
  return await Lodging.sequelize!.transaction(async (transaction: Transaction) => {

    const existingLodging = await Lodging.findOne({ where: { name: lodgingData.name }, transaction });
    if (existingLodging) {
      throw new Error(`Lodging with name "${lodgingData.name}" already exists.`);
    }

    const newLodging = await Lodging.create(lodgingData, { transaction });

    if (lodgingData.services && lodgingData.services.length > 0) {
      const serviceNames = lodgingData.services.map(service => service.name);

      const existingServices = await Service.findAll({ where: { name: serviceNames }, transaction });
      const existingServiceNames = existingServices.map(service => service.name);
      
      const servicesToCreate = lodgingData.services
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
        await newLodging.$set('services', servicesToAssociate, { transaction });
      }
    }

    return await Lodging.findByPk(newLodging.id, {
      include: [{ model: Service }],
      transaction
    }) as Lodging;
  });
};

/**
 * Actualizar un hospedaje existente y sus servicios (relación N:M)
 */
export const updateLodging = async (id: number, lodgingData: Partial<Lodging> & { services?: Partial<Service>[] }): Promise<Lodging | null> => {
  return await Lodging.sequelize!.transaction(async (transaction: Transaction) => {
    const lodging = await Lodging.findByPk(id, { include: [{ model: Service }], transaction });
    if (!lodging) throw new Error('Lodging not found');

    if (lodgingData.name && lodgingData.name !== lodging.name) {
      const existingLodging = await Lodging.findOne({ where: { name: lodgingData.name }, transaction });
      if (existingLodging) {
        throw new Error(`Lodging with name "${lodgingData.name}" already exists.`);
      }
    }

    try {
      await lodging.update(lodgingData, { transaction });

      if (lodgingData.services && lodgingData.services.length > 0) {
        const validServices = lodgingData.services.filter(service => service.name && service.description);

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
          await lodging.$set('services', servicesToAssociate, { transaction });
        }
      }

      return await Lodging.findByPk(id, { include: [{ model: Service }], transaction }) as Lodging;
    } catch (error) {
      throw new Error(`Failed to update lodging: ${(error as Error).message}`);
    }
  });
};

/**
 * Eliminar un hospedaje y desasociar servicios (relación N:M)
 */
export const deleteLodging = async (id: number): Promise<void> => {
  return await Lodging.sequelize!.transaction(async (transaction: Transaction) => {
    const lodging = await Lodging.findByPk(id, { transaction });
    if (!lodging) throw new Error('Lodging not found');

    await lodging.$set('services', [], { transaction });

    await lodging.destroy({ transaction });
  });
};
