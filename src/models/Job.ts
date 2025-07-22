import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IJob extends Document {
  position: string;
  company: string;
  status: 'pending' | 'interview' | 'declined' | 'offer';
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship';
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema: Schema<IJob> = new Schema({
  position: {
    type: String,
    required: [true, 'Position is required'],
    trim: true,
    maxlength: [100, 'Position cannot exceed 100 characters'],
  },
  company: {
    type: String,
    required: [true, 'Company is required'],
    trim: true,
    maxlength: [100, 'Company cannot exceed 100 characters'],
  },
  status: {
    type: String,
    enum: ['pending', 'interview', 'declined', 'offer'],
    default: 'pending',
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship'],
    default: 'full-time',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

// Index for better query performance
JobSchema.index({ userId: 1, createdAt: -1 });

const Job: Model<IJob> = mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);

export default Job;
