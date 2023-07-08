import app from "../../lib/firebase/firebaseConfig"
import { NextResponse } from 'next/server'

export async function GET() {
  const fetchFirebaseData = async (path: string): Promise<any> => {
    try {
      const snapshot = await app.database().ref(path).once('value');
      const data = snapshot.val();
      return data;
    } catch (error) {
      console.log('Error fetching data:', error);
      throw error;
    }
  };

  const dataPath = 'todos';
  const fetchedData = await fetchFirebaseData(dataPath);
  return NextResponse.json(fetchedData)
}


export async function POST(request: Request) {
  const body = await request.json()
  const { item, isDone } = body;
  try {
    const database = app.database();
    await database.ref(`todos`).push({ item, isDone });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json({ error: 'Failed to create todo' });
  }
}