const {
  collection,
  addDoc,
  getDocs,
} = require("firebase/firestore");
const { db } = require("../config/firebase");

const getUserFavorite = async (req, res) => {
  const { userId } = req.params;

  try {
    const querySnapshot = await getDocs(
      collection(db, `users/${userId}/favorites`)
    );
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json({
      data,
    });
  } catch (error) {
    console.log("Error in getting user favorites", error);
    res.status(500).json({ error: "Error fetching user favorites" });
  }
};

const addUserFavorite = async (req, res) => {
  const { userId, favorite } = req.body;

  try {
    const docRef = await addDoc(collection(db, `users/${userId}/favorites`), {
      favorite,
    });
    res.json({
      message: "User favorite added successfully",
    });
  } catch (error) {
    console.log("Adding user favorite error", error);
    res.status(500).json({ error: "Failed to add user favorite" });
  }
};

module.exports = {
  getUserFavorite,
  addUserFavorite,
};
