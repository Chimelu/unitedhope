import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import PaymentDetails from '../../../models/PaymentDetails';

// GET - Get all payment details
// Returns all details (for admin) - frontend can filter by isActive if needed
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('activeOnly') === 'true';
    
    const query = activeOnly ? { isActive: true } : {};
    const paymentDetails = await PaymentDetails.find(query).sort({ type: 1, currency: 1 });
    return NextResponse.json({ paymentDetails }, { status: 200 });
  } catch (error) {
    console.error('Error fetching payment details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payment details' },
      { status: 500 }
    );
  }
}

// POST - Create new payment details
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { type, currency, accountName, accountNumber, routingNumber, bankName, swift, iban, walletAddress, network, cashTag, email, isActive } = body;

    if (!type) {
      return NextResponse.json(
        { error: 'Type is required' },
        { status: 400 }
      );
    }

    const newPaymentDetails = new PaymentDetails({
      type,
      currency: currency || '',
      accountName: accountName || '',
      accountNumber: accountNumber || '',
      routingNumber: routingNumber || '',
      bankName: bankName || '',
      swift: swift || '',
      iban: iban || '',
      walletAddress: walletAddress || '',
      network: network || '',
      cashTag: cashTag || '',
      email: email || '',
      isActive: isActive !== undefined ? isActive : true,
    });

    await newPaymentDetails.save();
    return NextResponse.json({ paymentDetails: newPaymentDetails }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating payment details:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payment details' },
      { status: 500 }
    );
  }
}

