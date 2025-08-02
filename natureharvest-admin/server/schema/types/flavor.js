const { gql } = require('graphql-tag');

const flavorTypes = gql`
  type Flavor {
    _id: ID!
    brandId: ID!
    name: String!
    description: String
    imageUrl: String
    flavorProfile: String!
    ingredients: [String!]
    nutritionalInfo: FlavorNutritionalInfo
    allergens: [String!]
    certifications: [String!]
    sizes: [Size!]
    tags: [String!]
    featured: Boolean!
    status: String!
    seasonality: Seasonality
    createdAt: String!
    updatedAt: String!
    brand: Brand
  }

  type Size {
    _id: ID!
    sizeLabel: String!
    price: Float!
    imageUrl: String
    stock: Int!
    barcode: String
    weight: Float!
    dimensions: Dimensions
    isAvailable: Boolean!
  }

  type Dimensions {
    height: Float
    width: Float
    depth: Float
  }

  type FlavorNutritionalInfo {
    calories: Float
    protein: Float
    carbs: Float
    fat: Float
    fiber: Float
    sugar: Float
    vitaminC: Float
    potassium: Float
  }

  type Seasonality {
    startMonth: Int
    endMonth: Int
  }

  input FlavorInput {
    brandId: ID!
    name: String!
    description: String
    imageUrl: String
    flavorProfile: String
    ingredients: [String!]
    nutritionalInfo: FlavorNutritionalInfoInput
    allergens: [String!]
    certifications: [String!]
    sizes: [SizeInput!]
    tags: [String!]
    featured: Boolean
    status: String
    seasonality: SeasonalityInput
  }

  input SizeInput {
    sizeLabel: String!
    price: Float!
    imageUrl: String
    stock: Int
    barcode: String
    weight: Float!
    dimensions: DimensionsInput
    isAvailable: Boolean
  }

  input DimensionsInput {
    height: Float
    width: Float
    depth: Float
  }

  input FlavorNutritionalInfoInput {
    calories: Float
    protein: Float
    carbs: Float
    fat: Float
    fiber: Float
    sugar: Float
    vitaminC: Float
    potassium: Float
  }

  input SeasonalityInput {
    startMonth: Int
    endMonth: Int
  }

  input FlavorUpdateInput {
    brandId: ID
    name: String
    description: String
    imageUrl: String
    flavorProfile: String
    ingredients: [String!]
    nutritionalInfo: FlavorNutritionalInfoInput
    allergens: [String!]
    certifications: [String!]
    sizes: [SizeInput!]
    tags: [String!]
    featured: Boolean
    status: String
    seasonality: SeasonalityInput
  }

  extend type Query {
    flavors(brandId: ID, search: String, flavorProfile: String, status: String, featured: Boolean, sort: String, limit: Int, offset: Int): [Flavor!]!
    flavor(id: ID!): Flavor
    flavorsByBrand(brandId: ID!): [Flavor!]!
    flavorsByProfile(flavorProfile: String!): [Flavor!]!
    flavorsByStatus(status: String!): [Flavor!]!
    featuredFlavors: [Flavor!]!
    seasonalFlavors: [Flavor!]!
  }

  extend type Mutation {
    createFlavor(input: FlavorInput!): Flavor!
    updateFlavor(id: ID!, input: FlavorUpdateInput!): Flavor!
    deleteFlavor(id: ID!): Boolean!
    addSizeToFlavor(flavorId: ID!, size: SizeInput!): Flavor!
    updateSizeInFlavor(flavorId: ID!, sizeId: ID!, size: SizeInput!): Flavor!
    removeSizeFromFlavor(flavorId: ID!, sizeId: ID!): Flavor!
  }
`;

module.exports = flavorTypes; 