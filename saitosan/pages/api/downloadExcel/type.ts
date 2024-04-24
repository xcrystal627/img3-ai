export interface EstimateItem {
  name: string
  description: string
  formula: string
  cost: number
}

export interface Estimate {
  total_cost: number
  project: string
  estimates: EstimateItem[]
}

export interface CreateEstimateRequest {
  projectOverview: string
  functions: string
  techUsed: string
  period: string
  resources: string
  budget: string
  options: string
}
