## About

Sling is a Slack clone built with Phoenix and React. Check out the blog post on medium.

https://medium.com/@benhansen/lets-build-a-slack-clone-with-elixir-phoenix-and-react-part-1-project-setup-3252ae780a1

## Getting started

To run the project locally:

#### Running the Phoenix app

Download dependencies

```
cd api
mix deps.get
```

Edit the database connection config in `/config/dev.exs` or `config/dev.secret.exs`
with your postgres user info if needed

Create and migrate the database

```
mix ecto.create ecto.migrate
```

Start the server

```
mix phoenix.server
```

#### Running the React app

Install [Yarn](https://github.com/yarnpkg/yarn)

Install dependencies

```
cd web
yarn
```

Copy `.env.example` contents into to a new `.env` file

Start the dev server

```
npm start
```
