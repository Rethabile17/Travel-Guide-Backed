const { auth, db } = require("../config/firebase");
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} = require("firebase/auth");

const { doc, setDoc, collection } = require("firebase/firestore");

const createAccount = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userProfileRef = doc(collection(db, "users", user.uid, "profile"));
    await setDoc(userProfileRef, {
      firstName: firstName,
      lastName: lastName,
      email: email,
    });

    return res
      .status(201)
      .json({ message: "Account created successfully", userId: user.uid });
  } catch (authError) {
    console.error("Error in creating account : ", authError.message);

    return res
      .status(400)
      .json({ message: "Error in creating account", error: authError.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(`User signed in: ${user.uid}`);

    return res
      .status(200)
      .json({ message: "Login successful", userId: user.uid });
  } catch (authError) {
    console.error("Error in logging user in: ", authError.message);

    return res
      .status(400)
      .json({ message: "Error in logging user in", error: authError.message });
  }
};

const resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    await sendPasswordResetEmail(auth, email);
    res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Error sending password reset email:", error.message);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createAccount,
  login,
  resetPassword,
};
