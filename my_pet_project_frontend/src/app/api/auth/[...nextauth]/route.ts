import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import ky from "ky";


type TokensResponse = {
  accessToken: string;
  accessTokenExpiresAt: string;
};

async function refreshAccessToken(refreshToken: string): Promise<TokensResponse | null> {
  try {
    const refreshedTokens = await ky
      .post("http://localhost:8080/api/v1/auth/refresh_token", {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
        throwHttpErrors: false,
      })
      .json<TokensResponse>();

    console.log(`refreshedTokens: ${refreshedTokens}`)

    if (!refreshedTokens.accessToken) {
      throw new Error("Failed to refresh access token");
    }

    return {
      accessToken: refreshedTokens.accessToken,
      accessTokenExpiresAt: refreshedTokens.accessTokenExpiresAt,
    };

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
        token.refreshTokenExpiresAt = user.refreshTokenExpiresAt;
        token.accessTokenExpiresAt = user.accessTokenExpiresAt;
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

        console.log(`BufferTime: ${bufferTime}`);
        console.log(`ExpiresAt: ${expiresAt}`);
      
        if (now + bufferTime > expiresAt) {
          const refreshedAccessToken = await refreshAccessToken(token.refreshToken)
          console.log(`refreshedAccessToken: ${refreshedAccessToken}`);
          if (refreshedAccessToken === null){
            return {};
          }
          token.accessToken = refreshedAccessToken.accessToken;
          token.accessTokenExpiresAt = refreshedAccessToken.accessTokenExpiresAt;
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
