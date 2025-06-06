import mongoose, { Schema, Document } from 'mongoose';

interface Line {
  angle: number;
  id: string;
}

interface Texts {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
}

export interface IShape extends Document {
  texts: Texts;
  lines: Line[];
  rotationHistory: number[];
  createdAt: Date;
  updatedAt: Date;
}

const TextsSchema = new Schema({
  left: { type: String, default: '' },
  right: { type: String, default: '' },
  top: { type: String, default: '' },
  bottom: { type: String, default: '' }
}, { _id: false });

const LineSchema = new Schema({
  angle: { 
    type: Number, 
    required: [true, 'Angle is required'],
    validate: {
      validator: Number.isFinite,
      message: 'Angle must be a valid number'
    }
  },
  id: { 
    type: String, 
    required: [true, 'ID is required']
  }
}, { _id: false });

const ShapeSchema = new Schema({
  texts: {
    type: TextsSchema,
    required: true,
    default: {}
  },
  lines: {
    type: [LineSchema],
    required: true,
    validate: {
      validator: function(lines: Line[]) {
        return Array.isArray(lines);
      },
      message: 'Lines must be an array'
    }
  },
  rotationHistory: {
    type: [Number],
    required: true,
    default: [],
    validate: {
      validator: function(history: number[]) {
        return history.every(angle => Number.isFinite(angle));
      },
      message: 'Rotation history must contain valid numbers'
    }
  }
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.model<IShape>('Shape', ShapeSchema);
