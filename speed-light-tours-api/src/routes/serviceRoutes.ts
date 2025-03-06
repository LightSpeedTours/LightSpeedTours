import { Router } from 'express';
import { getLodgingsByService, getToursByService } from '../controllers/serviceController';

const router = Router();

router.get('/lodgings/:serviceId', getLodgingsByService);
router.get('/tours/:serviceId', getToursByService);

export default router;
