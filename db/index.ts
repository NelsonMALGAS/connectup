import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, type Analytics } from "firebase/analytics";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  type Auth,
} from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCa-cJyunBNOXkDPissft5kmunPmIC6QIk",
  authDomain: "connect-up-6cc47.firebaseapp.com",
  projectId: "connect-up-6cc47",
  storageBucket: "connect-up-6cc47.firebasestorage.app",
  messagingSenderId: "205242905726",
  appId: "1:205242905726:web:99420520c97e00c9c9142f",
  measurementId: "G-Y17JB814N3",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

let analytics: Analytics | null = null;

if (typeof window !== "undefined") {
  // Only runs on client
  analytics = getAnalytics(app);
}
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { db, auth, analytics, googleProvider, githubProvider };
