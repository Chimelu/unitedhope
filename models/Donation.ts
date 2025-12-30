import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDonation extends Document {
  projectId: string | null;
  name: string;
  email: string;
  phone: string;
  amount: number;
  paymentMethod: 'card' | 'bank' | 'crypto';
  message: string;
  createdAt: Date;
}

const DonationSchema: Schema = new Schema(
  {
    projectId: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: '',
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'bank', 'crypto'],
      required: true,
    },
    message: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Donation: Model<IDonation> =
  mongoose.models.Donation || mongoose.model<IDonation>('Donation', DonationSchema);

export default Donation;

