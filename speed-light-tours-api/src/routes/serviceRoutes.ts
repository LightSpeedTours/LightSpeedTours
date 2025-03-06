import { Router } from 'express';
import {
    getLodgingsByService,
    getToursByService,
    getServices,
} from '../controllers/serviceController';

const router = Router();

router.get('/lodgings/:serviceId', getLodgingsByService);
router.get('/tours/:serviceId', getToursByService);
router.get('/', getServices);

export default router;
