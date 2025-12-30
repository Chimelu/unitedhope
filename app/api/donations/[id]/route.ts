import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Donation from '../../../../models/Donation';

// GET - Get a single donation
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const donation = await Donation.findById(id);

    if (!donation) {
      return NextResponse.json(
        { error: 'Donation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ donation });
  } catch (error) {
    console.error('Error fetching donation:', error);
    return NextResponse.json(
      { error: 'Failed to fetch donation' },
      { status: 500 }
    );
  }
}

// PUT - Update a donation
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const { name, email, phone, amount, paymentMethod, message } = body;

    const donation = await Donation.findById(id);

    if (!donation) {
      return NextResponse.json(
        { error: 'Donation not found' },
        { status: 404 }
      );
    }

    // Update donation fields
    if (name) donation.name = name;
    if (email) donation.email = email;
    if (phone !== undefined) donation.phone = phone;
    if (amount !== undefined) donation.amount = Number(amount);
    if (paymentMethod) donation.paymentMethod = paymentMethod;
    if (message !== undefined) donation.message = message;

    const updatedDonation = await donation.save();

    return NextResponse.json({ donation: updatedDonation });
  } catch (error: any) {
    console.error('Error updating donation:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update donation' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a donation
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    
    const donation = await Donation.findById(id);

    if (!donation) {
      return NextResponse.json(
        { error: 'Donation not found' },
        { status: 404 }
      );
    }

    await Donation.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Donation deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting donation:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete donation' },
      { status: 500 }
    );
  }
}

