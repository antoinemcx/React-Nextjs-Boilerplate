Here's how to retrieve the values to put in the **.env** file :

### NextAuth.js : NEXTAUTH_SECRET and NEXTAUTH_URL

The `NEXTAUTH_SECRET` is the secret used to sign JWTs, make it strong.
As our authentication system is on the root URL, you will put your website URL at `NEXTAUTH_URL`.

### Website : SITE_URL

The `SITE_URL` is basically your website URL, nothing more 🙂

### Google provider for next-auth : GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET

-   Go on https://console.cloud.google.com/, create a project
-   Now, go on https://console.developers.google.com/apis/credentials
-   Click "Create credentials" and "OAuth client ID"
    -   Select the "Web Application" type
    -   Under "Authorized JavaScript origins", add "http://localhost:3000" and your website's URL
    -   Under "Authorized redirect URIs", add the same links but with "/api/auth/callback/google" at the end
    -   Finally, click "Create"
-   You'll find the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` on a pop-up

### Database : DATABASE_URL

The ` DATABASE_URL` is following this path : `mysql://USER:PASSSWORD@HOST:PORT/DATABASE`
