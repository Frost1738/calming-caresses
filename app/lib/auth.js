import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  // ⬇ SINGLE callbacks object
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Only redirect to /dashboard AFTER a successful OAuth callback
      if (url.includes("/api/auth/callback")) {
        return `${baseUrl}/dashboard`;
      }
      // For all other cases, use the default or provided URL
      return url.startsWith(baseUrl) ? url : `${baseUrl}/`;
    },

    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  // ⬆ END of callbacks

  pages: {
    signIn: "/authentication", // Where to send users to sign in
    error: "/authentication", // Where to send users on auth errors
  },
};

// Export the handler for API routes
export default NextAuth(authOptions);

// ALSO export the options if you need them
export { authOptions };
