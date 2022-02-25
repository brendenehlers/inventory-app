export type Fuzzy<T> = T & {[key: string]: any}

export type ProfileData = {
  title: string
  subtitle: string
  imageURL?: string
}

export type Column = {
  name: string
  display: string // visible name
  visible: boolean
  minWidth: string // percent in the form 'xx%'
  formatter?: (x: string | number) => string
}

export type Product = {
  id: number
  name: string
  price: number
  amt: number
}

export type Order = {
  id: number
  product_id: number
  amt: number
}