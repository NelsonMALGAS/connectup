import { auth, githubProvider } from "@/db";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";

export const signInWithGitHub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;

    console.log("User info:", user);
    console.log("GitHub Access Token:", token);
  } catch (error) {
    console.error(error);
  }
};
