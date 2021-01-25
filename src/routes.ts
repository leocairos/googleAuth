import { Router } from 'express';

import controller from './controller';

const router = Router();

router.get('/', controller.getIndex);
router.get('/auth/google/callback', controller.googleCallback);
router.get('/logout', controller.googleLogout);

export default router;