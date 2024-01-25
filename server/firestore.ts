const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");

initializeApp({
  credential: cert("./twitterclone-47eea-2ea3926028d0.json"),
});

const db = getFirestore();

async function getData(dbName, document) {
  const cityRef = db.collection(dbName).doc(document);
  const doc = await cityRef.get();
  console.log(doc.data());
}

getData("users", "Tesy");
