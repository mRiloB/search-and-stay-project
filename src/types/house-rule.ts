export type HouseRule = {
  id?: number
  name: string
  active: number
  order?: number | null
}

export type HouseRuleCreate = {
  success: boolean
  message: string
  data: HouseRule | Array<unknown>
}

export type HouseRuleList = {
  success: boolean
  data: {
    entities: HouseRule[]
    pagination: {
      total: number
      count: number
      per_page: number
      current_page: number
      total_pages: number
      links: {
        next: null | string
        prev: null | string
      }
    }
  }
  message: string
}
