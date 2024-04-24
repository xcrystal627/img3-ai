import { Timestamp } from 'firebase/firestore'

export class Company {
  id?: string
  createdAt: Timestamp
  updatedAt: Timestamp
  companyName: string
  zipCode: string
  prefecture: string
  city: string
  address: string
  building: string
  lastName: string
  firstName: string
  lastNameKana: string
  firstNameKana: string
  isCompletedSetup: boolean

  constructor({
    id,
    createdAt,
    updatedAt,
    companyName,
    zipCode,
    prefecture,
    city,
    address,
    building,
    lastName,
    firstName,
    lastNameKana,
    firstNameKana,
    isCompletedSetup,
  }: {
    id?: string
    createdAt: Timestamp
    updatedAt: Timestamp
    companyName: string
    zipCode: string
    prefecture: string
    city: string
    address: string
    building: string
    lastName: string
    firstName: string
    lastNameKana: string
    firstNameKana: string
    isCompletedSetup: boolean
  }) {
    this.id = id
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.companyName = companyName
    this.zipCode = zipCode
    this.prefecture = prefecture
    this.city = city
    this.address = address
    this.building = building
    this.lastName = lastName
    this.firstName = firstName
    this.lastNameKana = lastNameKana
    this.firstNameKana = firstNameKana
    this.isCompletedSetup = isCompletedSetup
  }
}
