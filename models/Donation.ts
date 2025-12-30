import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDonation extends Document {
  projectId: string | null;
  name: string;
  email: string;
  phone: string;
  amount: number;
  paymentMethod: 'card' | 'bank' | 'crypto' | 'cashapp' | 'paypal';
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
      enum: ['card', 'bank', 'crypto', 'cashapp', 'paypal'],
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
  mongoose.models.UnitedHopeDonation || mongoose.model<IDonation>('UnitedHopeDonation', DonationSchema, 'unitedhopedonations');

export default Donation;

