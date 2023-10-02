export type FetchOptions<T = unknown> = {
  page: number
  limit: number
  orderBy?: {
    [K in keyof T]?: 'asc' | 'desc'
  }
}
