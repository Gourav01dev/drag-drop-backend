import express from 'express';
import {
  createShape,
  getShape,
  getAllShapes,
  updateShape,
  deleteShape
} from '../controllers/shapeController';

const router = express.Router();

router.post('/', createShape);
router.get('/', getAllShapes);
router.get('/:id', getShape);
router.put('/:id', updateShape);
router.delete('/:id', deleteShape);

export default router;
