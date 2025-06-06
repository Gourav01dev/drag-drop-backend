import { Request, Response } from 'express';
import Shape, { IShape } from '../models/Shape';

export const createShape = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log("Hehee")
    const { texts, lines, rotationHistory } = req.body;

    if (!texts || !Array.isArray(lines)) {
      return res.status(400).json({ message: 'Invalid shape data. Required fields missing or invalid.' });
    }

    const validLines = lines.every(line => 
      typeof line.angle === 'number' && 
      typeof line.id === 'string'
    );

    if (!validLines) {
      return res.status(400).json({ message: 'Invalid lines data structure.' });
    }

    const shape = new Shape({
      texts: {
        left: texts.left || '',
        right: texts.right || '',
        top: texts.top || '',
        bottom: texts.bottom || ''
      },
      lines,
      rotationHistory: Array.isArray(rotationHistory) ? rotationHistory : []
    });

    const savedShape = await shape.save();
    res.status(201).json(savedShape);
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Error creating shape' });
  }
};

export const getShape = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid shape ID format' });
    }

    const shape = await Shape.findById(id);
    if (!shape) {
      return res.status(404).json({ message: 'Shape not found' });
    }
    res.json(shape);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error retrieving shape' });
  }
};

export const getAllShapes = async (_req: Request, res: Response): Promise<any> => {
  try {
    const shapes = await Shape.find()
      .sort({ createdAt: -1 })
      .select('-__v');
    res.json(shapes);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error retrieving shapes' });
  }
};

export const updateShape = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { texts, lines, rotationHistory } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid shape ID format' });
    }

    if (!texts || !Array.isArray(lines)) {
      return res.status(400).json({ message: 'Invalid shape data. Required fields missing or invalid.' });
    }

    const validLines = lines.every(line => 
      typeof line.angle === 'number' && 
      typeof line.id === 'string'
    );

    if (!validLines) {
      return res.status(400).json({ message: 'Invalid lines data structure.' });
    }

    const shape = await Shape.findByIdAndUpdate(
      id,
      {
        texts: {
          left: texts.left || '',
          right: texts.right || '',
          top: texts.top || '',
          bottom: texts.bottom || ''
        },
        lines,
        rotationHistory: Array.isArray(rotationHistory) ? rotationHistory : []
      },
      { new: true, runValidators: true }
    );

    if (!shape) {
      return res.status(404).json({ message: 'Shape not found' });
    }
    res.json(shape);
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Error updating shape' });
  }
};

export const deleteShape = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid shape ID format' });
    }

    const shape = await Shape.findByIdAndDelete(id);
    if (!shape) {
      return res.status(404).json({ message: 'Shape not found' });
    }
    res.json({ message: 'Shape deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error deleting shape' });
  }
};
