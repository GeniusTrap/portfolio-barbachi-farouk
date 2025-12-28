import express from 'express';
import {
    createContact,
    getAllContacts,
    getContactById,
    updateContact,
    deleteContact,
    getContactStats,
    updateContactStatus
} from '../controllers/contactController.js';

const router = express.Router();

router.post('/', createContact);

router.get('/', getAllContacts);
router.get('/stats', getContactStats);
router.get('/:id', getContactById);
router.put('/:id', updateContact);
router.put('/:id/status', updateContactStatus);
router.delete('/:id', deleteContact);

export default router;