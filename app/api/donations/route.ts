import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Donation from '../../../models/Donation';
import Project from '../../../models/Project';

// POST - Create a new donation
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { projectId, name, email, phone, amount, paymentMethod, message } = body;

    // Validation
    if (!name || !email || !amount || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // If projectId is provided, verify it exists and update current amount
    if (projectId) {
      const project = await Project.findById(projectId);
      if (!project) {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 }
        );
      }

      // Update project's current amount
      project.currentAmount += Number(amount);
      await project.save();
    }

    const newDonation = new Donation({
      projectId: projectId || null,
      name,
      email,
      phone: phone || '',
      amount: Number(amount),
      paymentMethod,
      message: message || '',
    });

    const savedDonation = await newDonation.save();

    return NextResponse.json({ donation: savedDonation }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating donation:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create donation' },
      { status: 500 }
    );
  }
}

// GET - Get all donations (optional, for admin use)
export async function GET() {
  try {
    await connectDB();
    const donations = await Donation.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ donations });
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch donations' },
      { status: 500 }
    );
  }
}

