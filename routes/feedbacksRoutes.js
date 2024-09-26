const express = require('express');
const feedbackController = require('../controllers/feedbackController');
const router = express.Router();

router.get('/', feedbackController.getAllFeedbacks);
router.get('/new', feedbackController.renderCreateForm);
router.post('/', feedbackController.createFeedback);
router.get('/:id', feedbackController.getFeedbackById);
router.get('/:id/edit', feedbackController.renderEditForm);
router.put('/:id', feedbackController.updateFeedback);
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;
