defmodule Sling.RoomChannel do
  use Sling.Web, :channel

  def join("rooms:" <> room_id, _params, socket) do
    room = Repo.get!(Sling.Room, room_id)

    response = %{
      room: Phoenix.View.render_one(room, Sling.RoomView, "room.json"),
    }

    {:ok, response, assign(socket, :room, room)}
  end

  def terminate(_reason, socket) do
    {:ok, socket}
  end
end
