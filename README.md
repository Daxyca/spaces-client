# Spaces: Your Space, Your Place

## Overview

Spaces is a social media site where users can interact with others through posts and create customizable spaces, enabling users to tailor the content they consume to their wants or needs. This app was also created to showcase my skills in full-stack web development.

### Links

- [LIVE Link](https://spaces-six-rho.vercel.app/)
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
   - [Server Dependencies](#server-dependencies)
   - [Server Dev Dependencies](#server-dev-dependencies)
   - [Client Dependencies](#client-dependencies)
   - [Client Dev Dependencies](#client-dev-dependencies)

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
1. (Optional) Supabase is used for cloud storage of avatars. To be able to change avatars, prepare a supabase storage and bucket for storing the avatars. The bucket base URL and a supabase anon key is needed.
1. (Optional) To be able to use [GitHub OAuth](https://github.com/settings/developers), create an OAuth app in GitHub and prepare your Client ID and Client secret. Set your OAuth app's the Homepage URL to the server URL (e.g. `http://localhost:3000`) and Authorization Callback URL to `<server_url>/api/auth/github/callback`.
1. Create a `.env` file for the server and another for the client (to place in the root of the respective repositories later) with the following keys and values (change the values according to your setup):

   #### Server `.env` file

   ```bash
   NODE_ENV="dev" # other posssible values: [test, prod]
   COOKIE_SECRET="<secret_string>"
   SERVER_BASE_URL="http://localhost:3000" # replace if needed
   CLIENT_BASE_URL="http://localhost:5173" # replace if needed
   CLIENT_REDIRECT_URL="http://localhost:5173" # replace if needed

   # Database
   DATABASE_URL="<database_provider_name>://<database_username>:<database_password>@localhost:5432/<database_name>?schema=public"
   DEVELOPMENT_DATABASE_URL="<database_provider_name>://<database_username>:<database_password>@localhost:5432/<database_name>?schema=public"
   TEST_DATABASE_URL="<database_provider_name>://<database_username>:<database_password>@localhost:5432/test_<database_name>?schema=public"

   # Supabase (optional, for changing avatars)
   SUPABASE_URL="https://<subdomain_name>.supabase.co" # replace with "https://supabase.co" if you don't have any
   AVATARS_BASE_URL="https://<subdomain_name>.supabase.co/storage/v1/object/public/<bucket_name>" # replace with "https://supabase.co" if you don't have any
   SUPABASE_ANON_KEY="<supabase_anon_key>" # replace with "1" if you don't have any

   # GitHub OAuth  (optional, for GitHub OAuth)
   GITHUB_CLIENT_ID="<20_character_string>" # replace with "1" if you don't have any or comment out
   GITHUB_CLIENT_SECRET="<40_character_string>" # replace with "1" if you don't have any or comment out
   ```

   #### Client `.env` file

   ```bash
   VITE_API_URL="http://localhost:3000/api" # replace if needed
   VITE_BASENAME="" # optional, if you want a separate base path for the client
   ```

### Setting up the Server

1. Fork/clone the [server repo](<(https://github.com/Daxyca/spaces-server)>) and `cd` into it.
1. Run `npm install` in your bash/command line.
1. Place the corresponding `.env` file from the pre-requisites in the root of your server repository.
1. Run `npx prisma migrate` in your bash/command line to initialize the database.
1. (Optional) Run `npm run seed` in your bash/command line for initial database seeding (includes the guest/default user).
1. Run `npm run dev` in your bash/command line.

### Setting up the Client

1. Fork/clone the [client repo](https://github.com/Daxyca/spaces-client) and `cd` into it.
1. Run `npm install` in your bash/command line.
1. Place the corresponding `.env` file from the pre-requisites in the root of your client repository.
1. Run `npm run dev` in your bash/command line.
1. Visit the [website](http://localhost:5173) and have fun posting!
1. (Optional) Register a user for guest if you skipped seeding in setting up the sever above (username: `user` | password: `123`).

## Dependencies

The project is structured as a full-stack application:

- **Server**: Node.js/Express backend with PostgreSQL and Prisma ORM
- **Client**: React-based frontend built with Vite

### Server Dependencies

- [Express](https://expressjs.com/)
- [CORS](https://github.com/expressjs/cors)
- [Dotenv](https://github.com/motdotla/dotenv)
- [Multer](https://github.com/expressjs/multer)
- [Express Session](https://github.com/expressjs/session)
- [Express Validator](https://express-validator.github.io/docs/)
- [Passport](https://www.passportjs.org/)
- [BcryptJS](https://github.com/dcodeIO/bcrypt.js)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [Supabase](https://supabase.com/)

### Server Dev Dependencies

- [Babel](https://babeljs.io/)
- [Prisma CLI](https://www.prisma.io/docs)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/ladjs/supertest)
- [Faker](https://fakerjs.dev/)

### Client Dependencies

- [React](https://react.dev/)
- [React DOM](https://react.dev/reference/react-dom)
- [React Router](https://reactrouter.com/)
- [React Router DOM](https://reactrouter.com/en/main)
- [NProgress](https://ricostacruz.com/nprogress/)

### Client Dev Dependencies

- [Vite](https://vitejs.dev/)
- [ESLint](https://eslint.org/)
- [Dotenv](https://github.com/motdotla/dotenv)
