import { NextRequest, NextResponse } from 'next/server';
import {
  sendDonationConfirmation,
  sendNewsletterConfirmation,
  sendContactFormEmails,
} from '../../../lib/email';

// POST - Send email based on type
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, ...data } = body;

    if (!type) {
      return NextResponse.json(
        { error: 'Email type is required' },
        { status: 400 }
      );
    }

    let result;

    switch (type) {
      case 'donation':
        const { donorEmail, donorName, amount, paymentMethod } = data;
        if (!donorEmail || !donorName || !amount || !paymentMethod) {
          return NextResponse.json(
            { error: 'Missing required fields for donation email' },
            { status: 400 }
          );
        }
        result = await sendDonationConfirmation(donorEmail, donorName, amount, paymentMethod);
        break;

      case 'newsletter':
        const { subscriberEmail } = data;
        if (!subscriberEmail) {
          return NextResponse.json(
            { error: 'Subscriber email is required' },
            { status: 400 }
          );
        }
        result = await sendNewsletterConfirmation(subscriberEmail);
        break;

      case 'contact':
        const { name, email, subject, message } = data;
        if (!name || !email || !subject || !message) {
          return NextResponse.json(
            { error: 'Missing required fields for contact email' },
            { status: 400 }
          );
        }
        result = await sendContactFormEmails(name, email, subject, message);
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid email type' },
          { status: 400 }
        );
    }

    // Check success based on email type
    let isSuccess = false;
    if (type === 'contact') {
      const contactResult = result as { userEmail: { success: boolean }; adminEmail: { success: boolean } };
      isSuccess = contactResult.userEmail?.success && contactResult.adminEmail?.success;
    } else {
      const singleResult = result as { success: boolean };
      isSuccess = singleResult.success;
    }

    if (isSuccess) {
      return NextResponse.json(
        { message: 'Email sent successfully', result },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to send email', result },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error in send-email API:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}

