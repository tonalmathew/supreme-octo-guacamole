import { NextResponse, NextRequest } from 'next/server'
import app from '../../../lib/firebase/firebaseConfig';

export async function PATCH(req: Request,  context: { params: any }) {
  const body = await req.json()
  const {isDone} = body
  const { id } = context.params;
  try {
      const database = app.database();
      const todoRef = database.ref(`todos/${id}`);
      await todoRef.update({ isDone });
      return NextResponse.json({ success: true });
  } catch (error) {
    console.log('Error updating todo:', error);
    return NextResponse.json({ error: 'Failed to update todo' });
  }
};

