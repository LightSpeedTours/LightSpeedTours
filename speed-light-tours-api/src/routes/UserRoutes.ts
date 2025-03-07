import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authenticateUser, decodeUserPayload } from '../middlewares/UserMiddleware';

const router = Router();
router.get('/me', authenticateUser, UserController.getUser);
/* 
Rotorna

{
    "message": "User data retrieved successfully",
    "data": {
        "uniqueID": 1,
        "rol": "user",
        "name": "John Updated",
        "user_name": "johnupdated123",
        "email": "dummy@example.com",
        "date_of_birth": "2000-01-01",
        "gender": "male",
        "ocupation": "Senior Software Engineer",
        "contact": "+9876543210"
    }
}
*/

router.put('/update', authenticateUser, decodeUserPayload, UserController.updateUser);
/* 
{
    "message": "User updated successfully",
    "data": {
        "uniqueID": 1,
        "rol": "user",
        "name": "John Updated",
        "user_name": "johnupdated123",
        "email": "dummy@example.com",
        "date_of_birth": "2000-01-01",
        "gender": "MALE",
        "ocupation": "Senior Software Engineer",
        "contact": "+9876543210"
    }
}
*/

export default router;
