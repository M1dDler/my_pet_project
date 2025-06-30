import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import ky from "ky";
import { jwtDecode } from "jwt-decode";


interface JwtPayload {
  exp: number;
  iat?: number;
  sub?: string;
  [key: string]: any;
}

export function getTokenExpirationDate(token: string): Date | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return null;
    return new Date(decoded.exp * 1000);
  } catch (e) {
    console.error("Invalid token", e);
    return null;
  }
}

interface TokensResponse {
  accessToken: string;
}

async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  try {
    console.log(`refreshToken : ${refreshToken}`);

    const response = await ky.post("http://localhost:8080/api/v1/auth/refresh_token", {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      throwHttpErrors: false,
    });

    const data = await response.json<TokensResponse>();

    console.log("refreshedToken :", data.accessToken);

    if (!data.accessToken) {
      throw new Error("Failed to refresh access token");
    }

    return data.accessToken;

  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
}

export const authOptions = {

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        login: { label: "Login", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:8080/api/v1/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            login: credentials?.login,
            password: credentials?.password,
          }),
        });

        if (!res.ok) return null;

        const user = await res.json();

        if (user?.accessToken) {
          return { ...user };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },


  secret: process.env.NEXTAUTH_SECRET,


  callbacks: {

    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.refreshTokenExpiresAt = getTokenExpirationDate(user.refreshToken);
        token.accessTokenExpiresAt = getTokenExpirationDate(user.accessToken);
      }
      
      console.log(`refreshTokenExpiresAt : ${token.refreshTokenExpiresAt}`)
      console.log(`accessTokenExpiresAt : ${token.accessTokenExpiresAt}`)

      if (token.refreshTokenExpiresAt) {
          const expiresAt = new Date(token.refreshTokenExpiresAt);
          const now = new Date();

          if (now > expiresAt) {
            return {}
          }
        }
      
      if (token.accessTokenExpiresAt) {
        const expiresAt = new Date(token.accessTokenExpiresAt).getTime();
        const now = Date.now();
        const bufferTime = 60 * 1000;
      
        if (now + bufferTime > expiresAt) {
          const refreshedAccessToken = await refreshAccessToken(token.refreshToken)
          
          if (refreshedAccessToken === null){
            return {};
          }
          token.accessToken = refreshedAccessToken;
          token.accessTokenExpiresAt = getTokenExpirationDate(refreshedAccessToken);
        }
      }
      return token;
    },

    session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
