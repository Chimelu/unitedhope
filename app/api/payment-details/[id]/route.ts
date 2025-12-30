import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import PaymentDetails from '../../../../models/PaymentDetails';

// GET - Get single payment detail
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const paymentDetails = await PaymentDetails.findById(id);

    if (!paymentDetails) {
      return NextResponse.json(
        { error: 'Payment details not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ paymentDetails }, { status: 200 });
  } catch (error) {
    console.error('Error fetching payment details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payment details' },
      { status: 500 }
    );
  }
}

// PUT - Update payment details
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const { type, currency, accountName, accountNumber, routingNumber, bankName, swift, iban, walletAddress, network, cashTag, email, isActive } = body;

    const updatedPaymentDetails = await PaymentDetails.findByIdAndUpdate(
      id,
      {
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
      },
      { new: true, runValidators: true }
    );

    if (!updatedPaymentDetails) {
      return NextResponse.json(
        { error: 'Payment details not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ paymentDetails: updatedPaymentDetails }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating payment details:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update payment details' },
      { status: 500 }
    );
  }
}

// DELETE - Delete payment details
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const deletedPaymentDetails = await PaymentDetails.findByIdAndDelete(id);

    if (!deletedPaymentDetails) {
      return NextResponse.json(
        { error: 'Payment details not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Payment details deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting payment details:', error);
    return NextResponse.json(
      { error: 'Failed to delete payment details' },
      { status: 500 }
    );
  }
}

