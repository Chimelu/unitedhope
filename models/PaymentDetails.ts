 import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPaymentDetails extends Document {
  type: 'bank' | 'crypto' | 'cashapp' | 'paypal';
  currency?: string; // For bank: 'usd', 'eur', etc. For crypto: 'bitcoin', 'ethereum', etc.
  accountName?: string;
  accountNumber?: string;
  routingNumber?: string;
  bankName?: string;
  swift?: string;
  iban?: string;
  walletAddress?: string; // For crypto
  network?: string; // For crypto (e.g., 'BTC', 'ETH', 'ERC20')
  cashTag?: string; // For CashApp (e.g., '$UnitedHope')
  email?: string; // For PayPal
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentDetailsSchema: Schema = new Schema(
  {
    type: {
      type: String,
      enum: ['bank', 'crypto', 'cashapp', 'paypal'],
      required: true,
    },
    currency: {
      type: String,
      default: '',
    },
    accountName: {
      type: String,
      default: '',
    },
    accountNumber: {
      type: String,
      default: '',
    },
    routingNumber: {
      type: String,
      default: '',
    },
    bankName: {
      type: String,
      default: '',
    },
    swift: {
      type: String,
      default: '',
    },
    iban: {
      type: String,
      default: '',
    },
    walletAddress: {
      type: String,
      default: '',
    },
    network: {
      type: String,
      default: '',
    },
    cashTag: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const PaymentDetails: Model<IPaymentDetails> =
  mongoose.models.UnitedHopePaymentDetails || mongoose.model<IPaymentDetails>('UnitedHopePaymentDetails', PaymentDetailsSchema, 'unitedhopepaymentdetails');

export default PaymentDetails;

