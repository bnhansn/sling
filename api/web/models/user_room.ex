defmodule Sling.UserRoom do
  use Sling.Web, :model

  schema "user_rooms" do
    belongs_to :user, Sling.User
    belongs_to :room, Sling.Room

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:user_id, :room_id])
    |> validate_required([:user_id, :room_id])
    |> unique_constraint(:user_id_room_id)
  end
end
