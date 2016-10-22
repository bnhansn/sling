defmodule Sling.ApplicationView do
  use Sling.Web, :view

  def render("not_found.json", _) do
    %{error: "Not found"}
  end
end
