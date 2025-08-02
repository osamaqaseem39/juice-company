# 🧃 Juice Company GraphQL API Examples

This document provides comprehensive examples of how to use the Juice Company GraphQL API.

## 🔐 Authentication

All queries and mutations require authentication. Include your JWT token in the Authorization header:

```
Authorization: Bearer your_jwt_token
```

## 🏢 Company Operations

### Create a Company
```graphql
mutation {
  createCompany(input: {
    name: "Nature's Harvest"
    description: "Premium organic juice company specializing in fresh, natural beverages"
    logoUrl: "https://example.com/logo.png"
    website: "https://naturesharvest.com"
    contactEmail: "info@naturesharvest.com"
    contactPhone: "+1-555-123-4567"
    address: {
      street: "123 Juice Lane"
      city: "Freshville"
      state: "CA"
      zipCode: "90210"
      country: "USA"
    }
    status: "active"
  }) {
    _id
    name
    description
    logoUrl
    website
    contactEmail
    status
    createdAt
  }
}
```

### Get All Companies
```graphql
query {
  companies(search: "harvest", status: "active", sort: "name_asc", limit: 10) {
    _id
    name
    description
    logoUrl
    website
    status
    createdAt
    brands {
      _id
      name
      category
    }
  }
}
```

### Get Company by ID
```graphql
query {
  company(id: "COMPANY_ID") {
    _id
    name
    description
    logoUrl
    website
    contactEmail
    contactPhone
    address {
      street
      city
      state
      zipCode
      country
    }
    status
    brands {
      _id
      name
      category
      flavors {
        _id
        name
        flavorProfile
      }
    }
  }
}
```

## 🏷️ Brand Operations

### Create a Brand
```graphql
mutation {
  createBrand(input: {
    companyId: "COMPANY_ID"
    name: "Fresh Squeezed"
    description: "Premium organic juices made from fresh, locally sourced fruits"
    logoUrl: "https://example.com/fresh-squeezed-logo.png"
    tagline: "Nature's Best, Bottled Fresh"
    category: "organic"
    ingredients: ["organic fruits", "pure water", "natural preservatives"]
    nutritionalInfo: {
      calories: 120
      protein: 2
      carbs: 28
      fat: 0
      fiber: 3
      sugar: 25
    }
    allergens: ["none"]
    certifications: ["organic", "non-gmo", "vegan"]
    status: "active"
  }) {
    _id
    name
    description
    tagline
    category
    company {
      name
    }
    flavors {
      _id
      name
    }
  }
}
```

### Get Brands with Filtering
```graphql
query {
  brands(
    companyId: "COMPANY_ID"
    search: "fresh"
    category: "organic"
    status: "active"
    sort: "name_asc"
    limit: 5
  ) {
    _id
    name
    description
    tagline
    category
    ingredients
    nutritionalInfo {
      calories
      protein
      carbs
      fat
      fiber
      sugar
    }
    allergens
    certifications
    company {
      name
      logoUrl
    }
    flavors {
      _id
      name
      flavorProfile
    }
  }
}
```

### Get Brands by Category
```graphql
query {
  brandsByCategory(category: "organic") {
    _id
    name
    description
    tagline
    category
    company {
      name
    }
    flavors {
      _id
      name
      flavorProfile
    }
  }
}
```

## 🍹 Flavor Operations

### Create a Flavor with Sizes
```graphql
mutation {
  createFlavor(input: {
    brandId: "BRAND_ID"
    name: "Mango Tango"
    description: "Sweet and tangy mango juice with a tropical twist"
    imageUrl: "https://example.com/mango-tango.jpg"
    flavorProfile: "tropical"
    ingredients: ["organic mango", "organic pineapple", "organic lime"]
    nutritionalInfo: {
      calories: 110
      protein: 1
      carbs: 26
      fat: 0
      fiber: 2
      sugar: 24
      vitaminC: 45
      potassium: 320
    }
    allergens: ["none"]
    certifications: ["organic", "vegan"]
    sizes: [
      {
        sizeLabel: "250ml"
        price: 3.99
        imageUrl: "https://example.com/mango-250ml.jpg"
        stock: 100
        weight: 250
        dimensions: {
          height: 12
          width: 6
          depth: 6
        }
        isAvailable: true
      },
      {
        sizeLabel: "500ml"
        price: 6.99
        imageUrl: "https://example.com/mango-500ml.jpg"
        stock: 75
        weight: 500
        dimensions: {
          height: 15
          width: 8
          depth: 8
        }
        isAvailable: true
      },
      {
        sizeLabel: "1L"
        price: 12.99
        imageUrl: "https://example.com/mango-1l.jpg"
        stock: 50
        weight: 1000
        dimensions: {
          height: 20
          width: 10
          depth: 10
        }
        isAvailable: true
      }
    ]
    tags: ["tropical", "sweet", "refreshing"]
    featured: true
    status: "active"
    seasonality: {
      startMonth: 3
      endMonth: 9
    }
  }) {
    _id
    name
    description
    flavorProfile
    brand {
      name
      company {
        name
      }
    }
    sizes(sort: "price_asc") {
      _id
      sizeLabel
      price
      stock
      weight
      isAvailable
    }
    featured
    status
  }
}
```

### Get Flavors with Advanced Filtering
```graphql
query {
  flavors(
    brandId: "BRAND_ID"
    search: "mango"
    flavorProfile: "tropical"
    status: "active"
    featured: true
    sort: "name_asc"
    limit: 10
  ) {
    _id
    name
    description
    flavorProfile
    imageUrl
    ingredients
    nutritionalInfo {
      calories
      protein
      carbs
      fat
      fiber
      sugar
      vitaminC
      potassium
    }
    allergens
    certifications
    tags
    featured
    status
    brand {
      name
      category
      company {
        name
      }
    }
    sizes(sort: "price_asc") {
      _id
      sizeLabel
      price
      imageUrl
      stock
      weight
      dimensions {
        height
        width
        depth
      }
      isAvailable
    }
  }
}
```

### Get Featured Flavors
```graphql
query {
  featuredFlavors {
    _id
    name
    description
    flavorProfile
    imageUrl
    brand {
      name
      company {
        name
      }
    }
    sizes(sort: "price_asc") {
      sizeLabel
      price
      stock
    }
  }
}
```

### Get Seasonal Flavors
```graphql
query {
  seasonalFlavors {
    _id
    name
    description
    flavorProfile
    seasonality {
      startMonth
      endMonth
    }
    brand {
      name
    }
    sizes {
      sizeLabel
      price
      stock
    }
  }
}
```

## 🔧 Size Management

### Add Size to Flavor
```graphql
mutation {
  addSizeToFlavor(
    flavorId: "FLAVOR_ID"
    size: {
      sizeLabel: "750ml"
      price: 8.99
      imageUrl: "https://example.com/flavor-750ml.jpg"
      stock: 25
      weight: 750
      dimensions: {
        height: 18
        width: 9
        depth: 9
      }
      isAvailable: true
    }
  ) {
    _id
    name
    sizes(sort: "weight_asc") {
      _id
      sizeLabel
      price
      stock
      weight
    }
  }
}
```

### Update Size in Flavor
```graphql
mutation {
  updateSizeInFlavor(
    flavorId: "FLAVOR_ID"
    sizeId: "SIZE_ID"
    size: {
      sizeLabel: "500ml"
      price: 7.49
      stock: 60
      weight: 500
      isAvailable: true
    }
  ) {
    _id
    name
    sizes {
      _id
      sizeLabel
      price
      stock
    }
  }
}
```

### Remove Size from Flavor
```graphql
mutation {
  removeSizeFromFlavor(flavorId: "FLAVOR_ID", sizeId: "SIZE_ID") {
    _id
    name
    sizes {
      _id
      sizeLabel
      price
    }
  }
}
```

## 🔍 Complex Queries

### Get Complete Product Catalog
```graphql
query {
  companies(status: "active") {
    _id
    name
    logoUrl
    brands(category: "organic") {
      _id
      name
      description
      tagline
      category
      flavors(status: "active") {
        _id
        name
        description
        flavorProfile
        imageUrl
        featured
        sizes(sort: "price_asc") {
          sizeLabel
          price
          stock
          isAvailable
        }
      }
    }
  }
}
```

### Search Across All Products
```graphql
query {
  flavors(search: "organic mango", status: "active") {
    _id
    name
    description
    flavorProfile
    brand {
      name
      category
      company {
        name
      }
    }
    sizes {
      sizeLabel
      price
      stock
    }
  }
}
```

### Get Products by Price Range
```graphql
query {
  flavors(brandId: "BRAND_ID") {
    _id
    name
    sizes(sort: "price_asc") {
      sizeLabel
      price
      stock
    }
  }
}
```

## 📊 Analytics Queries

### Get Brand Performance
```graphql
query {
  brands(companyId: "COMPANY_ID") {
    _id
    name
    category
    flavors {
      _id
      name
      featured
      sizes {
        sizeLabel
        price
        stock
      }
    }
  }
}
```

### Get Featured Products by Company
```graphql
query {
  companies {
    _id
    name
    brands {
      _id
      name
      flavors(featured: true) {
        _id
        name
        description
        sizes {
          sizeLabel
          price
        }
      }
    }
  }
}
```

## 🚨 Error Handling

All mutations return proper error messages. Common errors include:

- **Authentication errors**: "Authentication required"
- **Authorization errors**: "Admin access required"
- **Validation errors**: "Company name already exists"
- **Not found errors**: "Company not found"

## 📝 Best Practices

1. **Use pagination**: Always include `limit` and `offset` for large datasets
2. **Filter efficiently**: Use specific filters to reduce data transfer
3. **Sort appropriately**: Use meaningful sort parameters
4. **Handle errors**: Always check for GraphQL errors in responses
5. **Cache results**: Implement caching for frequently accessed data
6. **Validate input**: Ensure all required fields are provided in mutations

## 🔄 Real-time Updates

For real-time updates, consider implementing GraphQL subscriptions:

```graphql
subscription {
  flavorUpdated {
    _id
    name
    sizes {
      sizeLabel
      price
      stock
    }
  }
}
```

This comprehensive API provides everything needed to build a dynamic juice company website with full CRUD operations, advanced filtering, and real-time capabilities. 