import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAA1NB3xLMUvAGg1ni4m1JK_qrI96CSnGI",
    authDomain: "filmy-6bd1a.firebaseapp.com",
    databaseURL: "https://filmy-6bd1a-default-rtdb.firebaseio.com",
    projectId: "filmy-6bd1a",
    storageBucket: "filmy-6bd1a.appspot.com",
    messagingSenderId: "409354230199",
    appId: "1:409354230199:web:978e2be5c80f52a197b032",
    measurementId: "G-3CGY3MPEKT"
  };
  

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function POST(req) {
  try {
    const { token } = await req.json();
    if (!token) return Response.json({ error: "Token is required" }, { status: 400 });

    await addDoc(collection(db, "tokens"), { token, createdAt: new Date() });
    return Response.json({ message: "Token saved successfully" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
