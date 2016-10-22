defmodule Sling.MessageController do
  use Sling.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated, handler: Sling.SessionController

  def index(conn, params) do
    last_seen_id = params["last_seen_id"] || 0
    room = Repo.get!(Sling.Room, params["room_id"])

    page =
      Sling.Message
      |> where([m], m.room_id == ^room.id)
      |> where([m], m.id < ^last_seen_id)
      |> order_by([desc: :inserted_at, desc: :id])
      |> preload(:user)
      |> Sling.Repo.paginate()

    render(conn, "index.json", %{messages: page.entries, pagination: Sling.PaginationHelpers.pagination(page)})
  end
end
