import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User,
  signInWithPopup,
  AuthError,
} from "firebase/auth";
import { auth, googleProvider } from "@/db";

const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setUserLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getFriendlyErrorMessage = (error: unknown) => {
    if (error instanceof Error) {
      // Check for Firebase AuthError code if available
      const authError = error as AuthError;
      switch (authError.code) {
        case "auth/email-already-in-use":
          return "This email is already in use. Try logging in instead.";
        case "auth/invalid-email":
          return "Please enter a valid email address.";
        case "auth/user-not-found":
          return "No account found with this email.";
        case "auth/wrong-password":
          return "Incorrect password. Please try again.";
        case "auth/popup-closed-by-user":
          return "Popup closed before completing the sign-in.";
        case "auth/popup-blocked":
          return "Popup blocked by browser. Please allow popups.";
        default:
          return authError.message || "Something went wrong. Please try again.";
      }
    }
    return "Something went wrong. Please try again.";
  };

  const signUp = async (email: string, password: string) => {
    setAuthError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (error: unknown) {
      setAuthError(getFriendlyErrorMessage(error));
    }
  };

  const signIn = async (email: string, password: string) => {
    setAuthError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (error: unknown) {
      setAuthError(getFriendlyErrorMessage(error));
    }
  };

  const resetPassword = async (email: string) => {
    setAuthError(null);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: unknown) {
      setAuthError(getFriendlyErrorMessage(error));
    }
  };

  const signInWithGoogle = async () => {
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error: unknown) {
      setAuthError(getFriendlyErrorMessage(error));
    }
  };

  return {
    user,
    userLoading,
    authError,
    signUp,
    signIn,
    resetPassword,
    signInWithGoogle,
  };
};

export default useCurrentUser;

/**
 * showSuccessToast("Event created successfully", {
              description: "Sunday, December 03, 2023 at 9:00 AM",
              icon: <CheckCircle className="w-6 h-6 mr-2 text-green-500" />,
})
 */

/**
 *  showErrorToast("Failed to create event", {
              description: "Please try again later",
              icon: <AlertCircle className="w-5 h-5 mr-2 text-red-500" />,
            })
 */
