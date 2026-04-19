const { Router } = require('express');
const controller = require('../controllers/markersController');
const asyncHandler = require('../utils/asyncHandler');

const router = Router();

router.get('/', asyncHandler(controller.getMarkers));
router.get('/search', asyncHandler(controller.searchMarkers));
router.get('/:slug', asyncHandler(controller.getMarker));

module.exports = router;
