import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "@/apis/auth";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@domain.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials) {
            return null;
          }
          const res = await login({
            email: credentials.email,
            password: credentials.password,
            // requestFrom: "CMS",
          });

          if (res) {
            const user = res.data.data;

            return user;
            //return new object user contain token
          }
          return null; //if the data is null, return null
        } catch (e: any) {
          console.log("error", e);
          //if the server response is an error, throw an error with the message from the server
        }
      },
      // async authorize(credentials, req) {
      //   const { email, password } = credentials as any;
      //   const res = await login({
      //     email: email,
      //     password: password,
      //   });
      //   const {access_token}=res.data.access_token
      //   const user = await res.data.data;
      //   if (res.data.err === 0 && user) {
      //     return {user,access_token};
      //   } else return null;
      // },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ user, token }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;

      return session;
    },
  },
};

export default NextAuth(authOptions);
