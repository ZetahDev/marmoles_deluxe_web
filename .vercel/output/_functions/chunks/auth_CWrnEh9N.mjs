import { A as API_URL } from './config_Dec4CqDx.mjs';

const validateToken = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/validate`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.ok;
  } catch (error) {
    console.error("Error validating token:", error);
    return false;
  }
};

export { validateToken as v };
