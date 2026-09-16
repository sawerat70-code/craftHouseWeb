const express = require('express');
const {
  addOrderItems,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addOrderItems);
router.get('/', protect, authorize('employee', 'admin'), getAllOrders);
router.patch('/:id/status', protect, authorize('employee', 'admin'), updateOrderStatus);

module.exports = router;