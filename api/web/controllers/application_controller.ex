defmodule Sling.ApplicationController do
  use Sling.Web, :controller

  def not_found(conn, _params) do
    conn
    |> put_status(:not_found)
    |> render(Sling.ApplicationView, "not_found.json")
  end
end
