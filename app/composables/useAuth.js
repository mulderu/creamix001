// composables/useAuth.js
// not use 
export const useAuth = () => {
  const token = useState("auth_token", () => null);
  const user = useState("auth_user", () => null);
  const config = useRuntimeConfig();

  const login = async (identifier, password) => {
    try {
      const res = await $fetch(`${config.public.apiBaseUrl}/api/auth/local`, {
        method: "POST",
        body: {
          identifier,
          password,
        },
      });

      token.value = res.jwt;
      user.value = res.user;
      localStorage.setItem("jwt", res.jwt);
      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem("jwt");
  };

  const restoreSession = () => {
    const stored = localStorage.getItem("jwt");
    if (stored) token.value = stored;
  };

  return {
    token,
    user,
    login,
    logout,
    restoreSession,
  };
};
