import { Timestamp } from 'firebase/firestore'

export interface Option {
  name: string
  value: string
}

export type FunctionType = string
export type Technology = string
export type Resource = string

export interface CompanyProjectInput {
  id?: string
  createdAt: Timestamp
  updatedAt: Timestamp
  projectOverview: string
  period: number
  budget: number
  functions: FunctionType
  techUsed: Technology
  resources: Resource
  options: Option[]
}

export interface CompanyProjectInput {
  id?: string
  createdAt: Timestamp
  updatedAt: Timestamp
  projectOverview: string
  period: number
  budget: number
  functions: FunctionType
  techUsed: Technology
  resources: Resource
  options: Option[]
}

export class CompanyProject {
  id?: string
  createdAt: Timestamp
  updatedAt: Timestamp
  projectOverview: string
  period: number
  budget: number
  functions: FunctionType
  techUsed: Technology
  resources: Resource
  options: Option[]

  constructor({
    id,
    createdAt,
    updatedAt,
    projectOverview,
    period,
    budget,
    functions,
    techUsed,
    resources,
    options,
  }: CompanyProjectInput) {
    this.id = id
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.projectOverview = projectOverview
    this.period = period
    this.budget = budget
    this.functions = functions
    this.techUsed = techUsed
    this.resources = resources
    this.options = options
  }
}
