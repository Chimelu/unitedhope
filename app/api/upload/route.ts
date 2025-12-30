import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// POST - Handle image upload
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Image upload using environment variables
    // Set up your cloud storage credentials in .env.local:
    // 
    // For Cloudinary:
    // CLOUDINARY_CLOUD_NAME=your_cloud_name
    // CLOUDINARY_API_KEY=your_api_key
    // CLOUDINARY_API_SECRET=your_api_secret
    // CLOUDINARY_UPLOAD_PRESET=your_upload_preset
    //
    // For AWS S3:
    // AWS_S3_BUCKET=your_bucket_name
    // AWS_S3_REGION=your_region
    // AWS_ACCESS_KEY_ID=your_access_key
    // AWS_SECRET_ACCESS_KEY=your_secret_key
    //
    // For other services, add your environment variables accordingly

    // Check for Cloudinary configuration
    const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
    const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY?.trim();
    const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

    if (!cloudinaryCloudName || !cloudinaryApiKey || !cloudinaryApiSecret) {
      return NextResponse.json(
        { error: 'Cloudinary configuration is missing. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your environment variables.' },
        { status: 400 }
      );
    }

    // Validate API secret format (should be a long hex string, typically 40+ characters)
    if (cloudinaryApiSecret.length < 20) {
      console.error('WARNING: CLOUDINARY_API_SECRET appears to be too short. Please verify it is correct.');
    }

    try {
      // Read the file as a stream/buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Check file size (Cloudinary has limits)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (buffer.length > maxSize) {
        return NextResponse.json(
          { error: 'File size exceeds 10MB limit' },
          { status: 400 }
        );
      }
      
      // Convert to base64 for Cloudinary
      const base64String = buffer.toString('base64');
      // Ensure base64 string is valid (no whitespace)
      const cleanBase64 = base64String.replace(/\s/g, '');
      const base64Data = `data:${file.type};base64,${cleanBase64}`;
      
      // Generate timestamp for signed uploads
      const timestamp = Math.round(new Date().getTime() / 1000);
      
      // Create form data for Cloudinary
      const cloudinaryFormData = new FormData();
      // Send base64 data as a string parameter
      cloudinaryFormData.append('file', base64Data);
      
      // Use signed upload with API key and secret
      // For base64 uploads, the file parameter should NOT be included in signature
      // Only include other parameters (timestamp, etc.) in signature calculation
      const params: Record<string, string> = {
        timestamp: timestamp.toString(),
      };
      
      // Generate signature - sort parameters and create string to sign
      // Note: file parameter is NOT included in signature for base64 uploads
      const paramsString = Object.keys(params)
        .sort()
        .map(key => `${key}=${params[key]}`)
        .join('&');
      
      // Create string to sign: sorted params + API secret
      // Format: "timestamp=1234567890" + API_SECRET
      const stringToSign = paramsString + cloudinaryApiSecret;
      
      const signature = crypto
        .createHash('sha1')
        .update(stringToSign, 'utf8')
        .digest('hex');
      
      cloudinaryFormData.append('api_key', cloudinaryApiKey);
      cloudinaryFormData.append('timestamp', timestamp.toString());
      cloudinaryFormData.append('signature', signature);

      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        {
          method: 'POST',
          body: cloudinaryFormData,
        }
      );

      if (!cloudinaryResponse.ok) {
        let errorData;
        try {
          errorData = await cloudinaryResponse.json();
        } catch {
          errorData = await cloudinaryResponse.text();
        }
        console.error('Cloudinary upload error:', errorData);
        return NextResponse.json(
          { error: `Cloudinary upload failed: ${typeof errorData === 'string' ? errorData : JSON.stringify(errorData)}` },
          { status: cloudinaryResponse.status }
        );
      }

      const cloudinaryData = await cloudinaryResponse.json();
      
      if (!cloudinaryData.secure_url && !cloudinaryData.url) {
        return NextResponse.json(
          { error: 'Cloudinary returned invalid response' },
          { status: 500 }
        );
      }
      
      // Return just the image URL
      return NextResponse.json({
        url: cloudinaryData.secure_url || cloudinaryData.url,
      });
    } catch (error: any) {
      console.error('Cloudinary upload error:', error);
      return NextResponse.json(
        { error: `Cloudinary upload failed: ${error.message || 'Unknown error'}` },
        { status: 500 }
      );
    }

    // Check for AWS S3 configuration
    const s3Bucket = process.env.AWS_S3_BUCKET;
    const s3Region = process.env.AWS_S3_REGION;

    if (s3Bucket && s3Region) {
      // TODO: Implement AWS S3 upload
      // You'll need to install @aws-sdk/client-s3 and @aws-sdk/s3-request-presigner
      // Example:
      // const s3Client = new S3Client({ region: s3Region });
      // const uploadParams = {
      //   Bucket: s3Bucket,
      //   Key: `uploads/${Date.now()}-${file.name}`,
      //   Body: buffer,
      //   ContentType: file.type,
      // };
      // const command = new PutObjectCommand(uploadParams);
      // await s3Client.send(command);
      // const imageUrl = `https://${s3Bucket}.s3.${s3Region}.amazonaws.com/${uploadParams.Key}`;
    }

    // Fallback: Return a placeholder URL or base64
    // For production, you should always configure cloud storage
    const imageUrl = `https://images.unsplash.com/photo-${Date.now()}?w=800&q=80`;
    
    // Alternative: Use base64 for small images (not recommended for production)
    // const base64 = buffer.toString('base64');
    // const imageUrl = `data:${file.type};base64,${base64}`;

    return NextResponse.json({
      url: imageUrl,
      filename: file.name,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}


