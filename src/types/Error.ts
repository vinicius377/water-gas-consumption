export interface Error {
  status_code: number
  error: {
    error_description: string
    error_code: string
  }
}
