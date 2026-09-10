import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const AuthContext = createContext(null);


 const API_BASE = 'http://localhost:5001';

const LOGIN_URL = `${API_BASE}/api/auth/login`;
const SIGNUP_URL = `${API_BASE}/api/auth/signup`;
const GOOGLE_URL = `${API_BASE}/api/auth/google`;
const REFRESH_URL = `${API_BASE}/api/auth/refresh`;

const getStoredUser = () => {
  try {
    const saved = localStorage.getItem('saga_user');

    if (!saved) {
      return null;
    }

    return JSON.parse(saved);
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    getStoredUser
  );

  const [token, setToken] = useState(
    () =>
      localStorage.getItem(
        'saga_access_token'
      ) || null
  );

  const [refreshToken, setRefreshToken] =
    useState(
      () =>
        localStorage.getItem(
          'saga_refresh_token'
        ) || null
    );

  const [loading, setLoading] =
    useState(false);

  /* =========================
     STORE AUTH SESSION
  ========================= */

  const storeSession = ({
    user: nextUser,
    accessToken,
    refreshToken:
      nextRefreshToken,
  }) => {
    if (nextUser) {
      setUser(nextUser);

      localStorage.setItem(
        'saga_user',
        JSON.stringify(nextUser)
      );
    }

    if (accessToken) {
      setToken(accessToken);

      localStorage.setItem(
        'saga_access_token',
        accessToken
      );
    }

    if (nextRefreshToken) {
      setRefreshToken(
        nextRefreshToken
      );

      localStorage.setItem(
        'saga_refresh_token',
        nextRefreshToken
      );
    }
  };

  /* =========================
     CLEAR SESSION
  ========================= */

  const clearSession = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);

    localStorage.removeItem(
      'saga_user'
    );

    localStorage.removeItem(
      'saga_access_token'
    );

    localStorage.removeItem(
      'saga_refresh_token'
    );

    // Remove old demo auth
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  /* =========================
     LOGIN
  ========================= */

  const login = async (
    email,
    password
  ) => {
    setLoading(true);

    try {
      const response = await fetch(
        LOGIN_URL,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
            Accept:
              'application/json',
          },

          body: JSON.stringify({
            email: email
              .trim()
              .toLowerCase(),

            password,
          }),
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            'Login failed'
        );
      }

      const authData =
        result.data;

      if (
        !authData?.accessToken ||
        !authData?.user
      ) {
        throw new Error(
          'Invalid authentication response'
        );
      }

      storeSession({
        user: authData.user,

        accessToken:
          authData.accessToken,

        refreshToken:
          authData.refreshToken,
      });

      return {
        success: true,
        user: authData.user,
        message:
          result.message ||
          'Login successful',
      };
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     SIGNUP
  ========================= */

  const signup = async (
    payload
  ) => {
    setLoading(true);

    try {
      const response = await fetch(
        SIGNUP_URL,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
            Accept:
              'application/json',
          },

          body: JSON.stringify({
            fullName:
              payload.fullName
                .trim(),

            email:
              payload.email
                .trim()
                .toLowerCase(),

            phone:
              (
                payload.phone ||
                payload.phoneNumber ||
                ''
              ).trim(),

            password:
              payload.password,

            travelPreferences:
              payload.travelPreferences ||
              [],

            termsAccepted:
              payload.termsAccepted ??
              true,
          }),
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            'Registration failed'
        );
      }

      const authData =
        result.data;

      if (
        !authData?.accessToken ||
        !authData?.user
      ) {
        throw new Error(
          'Invalid authentication response'
        );
      }

      storeSession({
        user: authData.user,

        accessToken:
          authData.accessToken,

        refreshToken:
          authData.refreshToken,
      });

      return {
        success: true,
        user: authData.user,
        message:
          result.message ||
          'Account created successfully',
      };
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     GOOGLE LOGIN
  ========================= */

  const googleLogin = async (
    credential
  ) => {
    setLoading(true);

    try {
      const response = await fetch(
        GOOGLE_URL,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
            Accept:
              'application/json',
          },

          body: JSON.stringify({
            credential,
          }),
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            'Google login failed'
        );
      }

      const authData =
        result.data;

      storeSession({
        user: authData.user,

        accessToken:
          authData.accessToken,

        refreshToken:
          authData.refreshToken,
      });

      return {
        success: true,
        user: authData.user,
        message:
          result.message,
      };
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     REFRESH ACCESS TOKEN
  ========================= */

  const refreshAccessToken =
    async () => {
      if (!refreshToken) {
        clearSession();
        return null;
      }

      try {
        const response =
          await fetch(
            REFRESH_URL,
            {
              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json',

                Accept:
                  'application/json',
              },

              body:
                JSON.stringify({
                  refreshToken,
                }),
            }
          );

        const result =
          await response.json();

        if (
          !response.ok ||
          !result.success
        ) {
          throw new Error(
            result.message ||
              'Session expired'
          );
        }

        const newAccessToken =
          result.data
            ?.accessToken;

        if (!newAccessToken) {
          throw new Error(
            'Access token missing'
          );
        }

        setToken(
          newAccessToken
        );

        localStorage.setItem(
          'saga_access_token',
          newAccessToken
        );

        if (
          result.data
            ?.refreshToken
        ) {
          setRefreshToken(
            result.data
              .refreshToken
          );

          localStorage.setItem(
            'saga_refresh_token',
            result.data
              .refreshToken
          );
        }

        return newAccessToken;
      } catch (error) {
        clearSession();
        return null;
      }
    };

  /* =========================
     LOGOUT
  ========================= */

  const logout = () => {
    clearSession();
  };

  /* =========================
     PROFILE LOCAL SYNC
  ========================= */

  const updateProfile = (
    updatedData
  ) => {
    setUser((prev) => {
      if (!prev) {
        return prev;
      }

      const next = {
        ...prev,
        ...updatedData,
      };

      localStorage.setItem(
        'saga_user',
        JSON.stringify(next)
      );

      return next;
    });
  };

  /* =========================
     CLEAN OLD DEMO SESSION
     ON FIRST LOAD
  ========================= */

  useEffect(() => {
    const oldToken =
      localStorage.getItem(
        'token'
      );

    if (
      oldToken ===
        'demo-jwt-token' ||
      oldToken ===
        'mock-jwt-token'
    ) {
      localStorage.removeItem(
        'token'
      );
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,

        accessToken: token,
        refreshToken,

        isAuthenticated:
          Boolean(token && user),

        loading,

        login,
        signup,
        googleLogin,
        logout,
        updateProfile,
        refreshAccessToken,

        apiBase: API_BASE,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used within an AuthProvider'
    );
  }

  return context;
}