const express = require('express');
const familyController = require('../controllers/familyController');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

router.get('/all', familyController.getAllFamilies);
router.post('/addMember', authenticate, familyController.addMember);
router.delete('/removeMember', familyController.removeMember);
router.get('/myFamily', authenticate, familyController.getMyFamilyDetails);
router.get('/:familyId', familyController.getFamilyDetails);
router.post('/', authenticate, familyController.createFamily);

module.exports = router;
