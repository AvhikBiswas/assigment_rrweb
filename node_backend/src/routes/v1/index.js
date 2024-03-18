import rrwebEvents from '../../controllers/rrwebEvents.js';
import session from '../../controllers/session.js';
import express from 'express'



const router = express.Router();
router.get('/session',session);
router.get('/rrweb-events',rrwebEvents);

export default router;