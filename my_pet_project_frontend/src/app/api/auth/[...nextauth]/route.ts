import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import ky from "ky";
import { jwtDecode } from "jwt-decode";


interface JwtPayload {
  exp: number;
  iat?: number;
  sub?: string;
  [key: string]: unknown;
}

export function getTokenExpirationDate(token: string): Date | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return null;
    return new Date(decoded.exp * 1000);
  } catch (_) {
    return null;
  }
}

interface TokensResponse {
  accessToken: string;
}

async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  try {
    const response = await ky.post("http://localhost:8080/api/v1/auth/refresh_token", {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      throwHttpErrors: false,
    });

    const data = await response.json<TokensResponse>();

    if (!data.accessToken) {
      throw new Error("Failed to refresh access token");
    }

    return data.accessToken;

  } catch (_) {
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
        token.user = {
          id: user.userDTO.id,
          role: user.userDTO.role,
          name: user.userDTO.username,
          email: user.userDTO.email
        };
      }

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
      session.user.id = token.user.id;
      session.user.email = token.user.email;
      session.user.name = token.user.name;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
