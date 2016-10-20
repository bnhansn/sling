# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :sling,
  ecto_repos: [Sling.Repo]

# Configures the endpoint
config :sling, Sling.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "3/ptKPtOVJInaP3ZdNcpPes+1/wohETcmNWRIAv7Ynj4MIzBBDhlPtYTkxwQBk6w",
  render_errors: [view: Sling.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Sling.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :guardian, Guardian,
  issuer: "Sling",
  ttl: {30, :days},
  verify_issuer: true,
  serializer: Sling.GuardianSerializer

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
