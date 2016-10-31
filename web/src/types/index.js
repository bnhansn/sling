export type Room = {
  id: number,
  name: string,
}

export type User = {
  username: string,
  email: string,
}

export type Message = {
  id: number,
  inserted_at: string,
  text: string,
  day?: string,
  user: User
}

export type Paginatinon = {
  total_pages: number,
  total_entries: number,
  page_size: number,
  page_number: number,
}
