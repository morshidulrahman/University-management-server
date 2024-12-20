import express from 'express';
import { AdminControllers } from './admin.controller';

const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);

router.get('/:id', AdminControllers.getSingleAdmin);
router.delete('/:id', AdminControllers.deleteAdmin);
router.patch('/:id', AdminControllers.updateAdmin);

export const AdminRoutes = router;
