import { db } from "./firebase";

export const getUserGames = async (userEmail) => {
  if (userEmail) {
    const userDoc = await db
      .collection("users")
      .where("email", "==", userEmail)
      .get();
    const userDocId = userDoc.docs[0]?.id;
    const doc = await db.collection("users").doc(userDocId).get();

    let games = [];
    doc.exists ? games = doc.data().games : games = [];
    return games;
  } else {
    return [];
  }
};

export const getApiReserveToken = async (userEmail) => {
  if (userEmail) {
    const userDoc = await db
      .collection("users")
      .where("email", "==", userEmail)
      .get();
    const userDocId = userDoc.docs[0]?.id;
    const doc = await db.collection("users").doc(userDocId).get();

    let reserveToken = "";
    doc.exists ? (reserveToken = doc.data().reserveIgbdToken) : (reserveToken = "");
    return reserveToken;
  } else {
    return "";
  }
};