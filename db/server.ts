import {
  cert,
  getApps,
  initializeApp,
  type ServiceAccount,
} from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

const serviceAccount = {
  type: process.env.FIREBASE_TYPE as string,
  project_id: process.env.FIREBASE_PROJECT_ID as string,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID as string,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
  ) as string,
  client_email: process.env.FIREBASE_CLIENT_EMAIL as string,
  client_id: process.env.FIREBASE_CLIENT_ID as string,
  auth_uri: process.env.FIREBASE_AUTH_URI as string,
  token_uri: process.env.FIREBASE_TOKEN_URI as string,
  auth_provider_x509_cert_url: process.env
    .FIREBASE_AUTH_PROVIDER_CERT_URL as string,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL as string,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN as string,
};

const currentApps = getApps();
let db: Firestore;
let auth: Auth;

if (currentApps.length <= 0) {
  const app = initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });

  db = getFirestore(app);
  auth = getAuth(app);
} else {
  db = getFirestore(currentApps[0]);
  auth = getAuth(currentApps[0]);
}

export { db, auth };
