import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} from "firebase-admin/firestore";

initializeApp({
  credential: cert("./twitterclone-47eea-2ea3926028d0.json"),
});

var db = getFirestore();

export default db;
