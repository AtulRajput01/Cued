import { Auth } from 'aws-amplify';

// Function to register a user
export const registerUser = async (username, password, email) => {
  try {
    const signUpResponse = await Auth.signUp({
      username,
      password,
      attributes: {
        email,
      },
    });
    return signUpResponse;
  } catch (error) {
    throw error;
  }
};

// Function to confirm user registration
export const confirmRegistration = async (username, code) => {
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
    throw error;
  }
};

// Function to log in a user
export const loginUser = async (username, password) => {
  try {
    const user = await Auth.signIn(username, password);
    return user;
  } catch (error) {
    throw error;
  }
};

// Function to get the current authenticated user
export const getCurrentUser = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return user;
  } catch (error) {
    throw error;
  }
};

// Function to log out the current user
export const logoutUser = async () => {
  try {
    await Auth.signOut();
  } catch (error) {
    throw error;
  }
};
