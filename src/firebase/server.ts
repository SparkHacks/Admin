import type { ServiceAccount } from "firebase-admin";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const activeApps = getApps();
const serviceAccount = {
  "type": (import.meta.env.REAL_DATABASE === "true") ? import.meta.env.SERVER_TYPE : import.meta.env.SERVER_TYPE1,
  "project_id": (import.meta.env.REAL_DATABASE === "true") ? import.meta.env.SERVER_PROJECT_ID : import.meta.env.SERVER_PROJECT_ID1,
  "private_key_id": (import.meta.env.REAL_DATABASE === "true") ? import.meta.env.SERVER_PRIVATE_KEY_ID : import.meta.env.SERVER_PRIVATE_KEY_ID1,
  "private_key": (import.meta.env.REAL_DATABASE === "true") ? import.meta.env.SERVER_PRIVATE_KEY : import.meta.env.SERVER_PRIVATE_KEY1,
  "client_email": (import.meta.env.REAL_DATABASE === "true") ? import.meta.env.SERVER_CLIENT_EMAIL : import.meta.env.SERVER_CLIENT_EMAIL1,
  "client_id": (import.meta.env.REAL_DATABASE === "true") ? import.meta.env.SERVER_CLIENT_ID : import.meta.env.SERVER_CLIENT_ID1,
  "auth_uri": (import.meta.env.REAL_DATABASE === "true") ? import.meta.env.SERVER_AUTH_URI : import.meta.env.SERVER_AUTH_URI1,
  "token_uri": (import.meta.env.REAL_DATABASE === "true") ? import.meta.env.SERVER_TOKEN_URI : import.meta.env.SERVER_TOKEN_URI1,
  "auth_provider_x509_cert_url": (import.meta.env.REAL_DATABASE === "true") ? import.meta.env.SERVER_AUTH_PROVIDER_X509_CERT_URL : import.meta.env.SERVER_AUTH_PROVIDER_X509_CERT_URL1,
  "client_x509_cert_url": (import.meta.env.REAL_DATABASE === "true") ? import.meta.env.SERVER_CLIENT_X509_CERT_URL : import.meta.env.SERVER_CLIENT_X509_CERT_URL1,
  "universe_domain": (import.meta.env.REAL_DATABASE === "true") ? import.meta.env.SERVER_UNIVERSE_DOMAIN : import.meta.env.SERVER_UNIVERSE_DOMAIN1
}

// console.log(serviceAccount)
console.log("number of active apps:", activeApps.length)

const initApp = () => {
  console.info('Loading service account from env.')
  return initializeApp({
    credential: cert(serviceAccount as ServiceAccount)
  })
}

export const app = activeApps.length === 0 ? initApp() : activeApps[0];
export const auth = getAuth(app)
export const db = getFirestore(app)