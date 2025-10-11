# Spaces: Your Space, Your Place

## Overview

Spaces is a social media site where users can interact with others through posts and create customizable spaces, enabling users to tailor the content they consume to their wants or needs. This app was also created to showcase my skills in full-stack web development.

### Links

- [LIVE Link](https://daxyca.github.io/spaces-client)
- [Client Repository](https://github.com/Daxyca/spaces-client)
- [Server Repository](https://github.com/Daxyca/spaces-server)

## Contents

1. [Overview](#overview)
   - [Links](#links)
1. [Features](#features)
1. [Running the Project](#running-the-project)
   - [Pre-requisites](#pre-requisites)
   - [Server](#setting-up-the-server)
   - [Client](#setting-up-the-client)
1. [Dependencies](#dependencies)
   - [Server](#server-dependencies)
   - [Client](#client-dependencies)

## Features

1. Guest login using default user.
1. User registration and login through credentials or GitHub account.
1. View and edit own profile.
1. View other users' profile.
1. View, create, edit, delete, like and unlike posts.
1. View, create, edit and delete comments on posts.
1. View, create, edit and delete spaces. Each space includes only the posts of selected followed users.
1. View and follow unfollowed users.
1. View and cancel pending follow requests.
1. View and unfollow followed users.
1. View, accept and decline follower requests.
1. View and remove followers.

## Running the Project

### Pre-requisites

1. Make sure you have a SQL database such as PostgreSQL.
1. Prepare a supabase storage and bucket for storing the avatars. The bucket base URL and a supabase anon key is needed.
1. For [GitHub OAuth](https://github.com/settings/developers), prepare the Client ID and the Client secret. Set the Homepage URL to the server URL (e.g. `http://localhost:3000`) and Authorization Callback URL to `<server_url>/api/auth/github/callback`.
1. Create a `.env` file for the server (to place in the root of your "server" repository later) with the following keys and values (change the values according to your setup):

   ```bash
   NODE_ENV="development" # other posssible values: [test, production]
   COOKIE_SECRET="<secret_string>"

   SERVER_BASE_URL="http://localhost:3000" # replace if needed
   CLIENT_BASE_URL="http://localhost:5173" # replace if needed
   CLIENT_REDIRECT_URL="http://localhost:5173" # replace if needed

   # Database
   DATABASE_URL="<database_provider_name>://<database_username>:<database_password>@localhost:5432/<database_name>?schema=public"
   DEVELOPMENT_DATABASE_URL="<database_provider_name>://<database_username>:<database_password>@localhost:5432/<database_name>?schema=public"
   TEST_DATABASE_URL="<database_provider_name>://<database_username>:<database_password>@localhost:5432/test_<database_name>?schema=public"

   # Supabase
   SUPABASE_URL="https://<subdomain_name>.supabase.co"
   AVATARS_BASE_URL="https://<subdomain_name>.supabase.co/storage/v1/object/public/<bucket_name>"
   SUPABASE_ANON_KEY="<supabase_anon_key>"

   # GitHub OAuth
   GITHUB_CLIENT_ID="<20_character_string>"
   GITHUB_CLIENT_SECRET="<40_character_string>"
   ```

1. Create a `.env` file for the client (to place in the root of your "client" repository later) with the following keys and values (change the values according to your setup):

```bash
VITE_API_URL="http://localhost:3000/api" # replace if needed
VITE_BASENAME="" # optional, if you want a separate base path for the client
```

### Setting up the Server

1. Clone [the server repo](<(https://github.com/Daxyca/spaces-server)>).
1. Run `npm install` in your bash/command line.
1. Place the corresponding `.env` file in the root of your server repository.
1. Run `npx prisma migrate` in your bash/command line to initialize the database.
1. (Optional) Run `npm run seed` in your bash/command line for initial database seeding (includes the guest/default user).
1. Run `npm run dev` in your bash/command line.
1. Create

### Setting up the Client

1. Clone [the client repo](https://github.com/Daxyca/spaces-client).
1. Run `npm install` in your bash/command line.
1. Place the corresponding `.env` file in the root of your server repository.
1. Run `npm run dev` in your bash/command line.
1. Visit the [website](http://localhost:5173)!
1. (Optional) Register a user for guest if you skipped seeding above (username: `user` | password: `123`).

## Dependencies

### Server Dependencies

### Client Dependencies
