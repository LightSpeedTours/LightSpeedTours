import Lodging from '../models/LodgingModel';
import Service from '../models/ServiceModel';
import Tour from '../models/TourModel';

export const getLodgingsByServiceId = async (serviceId: number): Promise<Lodging[]> => {
    try {
        const service = await Service.findByPk(serviceId, {
            include: [
                {
                    model: Lodging,
                    through: { attributes: [] },
                },
            ],
        });

        if (!service) {
            return [];
        }

        return service.lodgings || [];
    } catch (error) {
        throw error;
    }
};

export const getToursByServiceId = async (serviceId: number): Promise<Tour[]> => {
    try {
        const service = await Service.findByPk(serviceId, {
            include: [
                {
                    model: Tour,
                    through: { attributes: [] },
                },
            ],
        });

        if (!service) {
            return [];
        }

        return service.tours || [];
    } catch (error) {
        throw error;
    }
};
