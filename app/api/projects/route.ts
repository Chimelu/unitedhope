import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Project from '../../../models/Project';

// GET - List all projects
export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST - Create a new project
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { title, category, description, imageUrl, targetAmount, currentAmount, status } = body;

    // Validation
    if (!title || !category || !description || !imageUrl || !targetAmount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newProject = new Project({
      title,
      category,
      description,
      imageUrl,
      targetAmount: Number(targetAmount),
      currentAmount: Number(currentAmount || 0),
      status: status || 'active',
    });

    const savedProject = await newProject.save();

    return NextResponse.json({ project: savedProject }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create project' },
      { status: 500 }
    );
  }
}

