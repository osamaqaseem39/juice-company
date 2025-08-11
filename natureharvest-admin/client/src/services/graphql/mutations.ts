import { gql } from '@apollo/client';

// Auth Mutations
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        fullName
        email
        phone
        roles
        isActive
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($input: UserInput!) {
    register(input: $input) {
      token
      user {
        _id
        fullName
        email
        phone
        roles
        isActive
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      _id
      fullName
      email
      phone
      roles
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UserInput!) {
    updateUser(id: $id, input: $input) {
      _id
      fullName
      email
      phone
      roles
      addresses {
        _id
        fullName
        phone
        street
        city
        state
        postalCode
        country
        isDefault
      }
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

// Blog Mutations
export const CREATE_BLOG = gql`
  mutation CreateBlog($input: BlogInput!) {
    createBlog(input: $input) {
      _id
      title
      content
      status
      slug
      featuredImage
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_BLOG = gql`
  mutation UpdateBlog($id: ID!, $input: BlogInput!) {
    updateBlog(id: $id, input: $input) {
      _id
      title
      content
      status
      slug
      featuredImage
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_BLOG = gql`
  mutation DeleteBlog($id: ID!) {
    deleteBlog(id: $id)
  }
`;

// Product Mutations
export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      _id
      name
      description
      images
      brandId {
        _id
        name
      }
      categoryId {
        _id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: ProductInput!) {
    updateProduct(id: $id, input: $input) {
      _id
      name
      description
      images
      brandId {
        _id
        name
      }
      categoryId {
        _id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

// Category Mutations
export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CategoryInput!) {
    createCategory(input: $input) {
      _id
      name
      image
      description
      status
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $input: CategoryInput!) {
    updateCategory(id: $id, input: $input) {
      _id
      name
      image
      description
      status
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;

// Brand Mutations
export const CREATE_BRAND = gql`
  mutation CreateBrand($input: BrandInput!) {
    createBrand(input: $input) {
      _id
      name
      logoUrl
      description
      tagline
      category
      status
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_BRAND = gql`
  mutation UpdateBrand($id: ID!, $input: BrandInput!) {
    updateBrand(id: $id, input: $input) {
      _id
      name
      logoUrl
      description
      tagline
      category
      status
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_BRAND = gql`
  mutation DeleteBrand($id: ID!) {
    deleteBrand(id: $id)
  }
`;











// Page Mutations
export const CREATE_PAGE = gql`
  mutation CreatePage($input: PageInput!) {
    createPage(input: $input) {
      _id
      title
      content
      slug
      seo {
        title
        description
        keywords
        slug
        canonicalUrl
        ogImage
        noIndex
        noFollow
      }
      isPublished
      publishedAt
    }
  }
`;

export const UPDATE_PAGE = gql`
  mutation UpdatePage($id: ID!, $input: PageInput!) {
    updatePage(id: $id, input: $input) {
      _id
      title
      content
      slug
      seo {
        title
        description
        keywords
        slug
        canonicalUrl
        ogImage
        noIndex
        noFollow
      }
      isPublished
      publishedAt
    }
  }
`;

export const DELETE_PAGE = gql`
  mutation DeletePage($id: ID!) {
    deletePage(id: $id)
  }
`;

// Global SEO Settings Mutations
export const UPDATE_GLOBAL_SEO_SETTINGS = gql`
  mutation UpdateGlobalSEOSettings($input: GlobalSEOSettingsInput!) {
    updateGlobalSEOSettings(input: $input) {
      _id
      siteName
      defaultTitle
      defaultDescription
      defaultOgImage
      twitterHandle
      fbAppId
      googleAnalyticsId
      defaultCanonicalUrl
    }
  }
`;

// Legacy mutations for backward compatibility
export const CREATE_SERVICE = gql`
  mutation CreateService($input: ServiceInput!) {
    createService(input: $input) {
      _id
      title
      description
      featuredImage
      status
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_SERVICE = gql`
  mutation UpdateService($id: ID!, $input: ServiceInput!) {
    updateService(id: $id, input: $input) {
      _id
      title
      description
      featuredImage
      status
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_SERVICE = gql`
  mutation DeleteService($id: ID!) {
    deleteService(id: $id)
  }
`;

export const CREATE_QUOTE = gql`
  mutation CreateQuote($input: QuoteInput!) {
    createQuote(input: $input) {
      _id
      name
      email
      phone
      message
      status
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_QUOTE = gql`
  mutation UpdateQuote($id: ID!, $input: QuoteInput!) {
    updateQuote(id: $id, input: $input) {
      _id
      name
      email
      phone
      message
      status
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_QUOTE = gql`
  mutation DeleteQuote($id: ID!) {
    deleteQuote(id: $id)
  }
`;

// Subcategory mutations
export const CREATE_SUBCATEGORY = gql`
  mutation CreateSubcategory($input: SubCategoryInput!) {
    createSubCategory(input: $input) {
      _id
      name
      description
      category {
        _id
        name
      }
      status
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_SUBCATEGORY = gql`
  mutation UpdateSubcategory($id: ID!, $input: SubCategoryUpdateInput!) {
    updateSubCategory(id: $id, input: $input) {
      _id
      name
      description
      category {
        _id
        name
      }
      status
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_SUBCATEGORY = gql`
  mutation DeleteSubcategory($id: ID!) {
    deleteSubCategory(id: $id)
  }
`;

// Company Mutations
export const CREATE_COMPANY = gql`
  mutation CreateCompany($input: CompanyInput!) {
    createCompany(input: $input) {
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
        zip
        country
      }
      status
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_COMPANY = gql`
  mutation UpdateCompany($id: ID!, $input: CompanyInput!) {
    updateCompany(id: $id, input: $input) {
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
        zip
        country
      }
      status
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_COMPANY = gql`
  mutation DeleteCompany($id: ID!) {
    deleteCompany(id: $id)
  }
`;

// Flavor mutations
export const CREATE_FLAVOR = gql`
  mutation CreateFlavor($input: FlavorInput!) {
    createFlavor(input: $input) {
      _id
      name
      description
      flavorProfile
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
      sizes {
        _id
        sizeLabel
        price
        imageUrl
        stock
        barcode
        weight
        dimensions {
          height
          width
          depth
        }
        isAvailable
      }
      seasonality {
        startMonth
        endMonth
      }
      brand {
        _id
        name
      }
      status
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_FLAVOR = gql`
  mutation UpdateFlavor($id: ID!, $input: FlavorUpdateInput!) {
    updateFlavor(id: $id, input: $input) {
      _id
      name
      description
      flavorProfile
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
      sizes {
        _id
        sizeLabel
        price
        imageUrl
        stock
        barcode
        weight
        dimensions {
          height
          width
          depth
        }
        isAvailable
      }
      seasonality {
        startMonth
        endMonth
      }
      brand {
        _id
        name
      }
      status
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_FLAVOR = gql`
  mutation DeleteFlavor($id: ID!) {
    deleteFlavor(id: $id)
  }
`;

export const ADD_SIZE_TO_FLAVOR = gql`
  mutation AddSizeToFlavor($flavorId: ID!, $size: SizeInput!) {
    addSizeToFlavor(flavorId: $flavorId, size: $size) {
      _id
      name
      sizes {
        _id
        sizeLabel
        price
        imageUrl
        stock
        barcode
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
`;

export const UPDATE_SIZE_IN_FLAVOR = gql`
  mutation UpdateSizeInFlavor($flavorId: ID!, $sizeId: ID!, $size: SizeInput!) {
    updateSizeInFlavor(flavorId: $flavorId, sizeId: $sizeId, size: $size) {
      _id
      name
      sizes {
        _id
        sizeLabel
        price
        imageUrl
        stock
        barcode
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
`;

export const REMOVE_SIZE_FROM_FLAVOR = gql`
  mutation RemoveSizeFromFlavor($flavorId: ID!, $sizeId: ID!) {
    removeSizeFromFlavor(flavorId: $flavorId, sizeId: $sizeId) {
      _id
      name
      sizes {
        _id
        sizeLabel
        price
        imageUrl
        stock
        barcode
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
`;

// Size mutations
export const CREATE_SIZE = gql`
  mutation CreateSize($input: SizeInput!) {
    createSize(input: $input) {
      _id
      name
      description
      imageUrl
      price
      weight
      dimensions {
        height
        width
        depth
      }
      isAvailable
      status
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_SIZE = gql`
  mutation UpdateSize($id: ID!, $input: SizeUpdateInput!) {
    updateSize(id: $id, input: $input) {
      _id
      name
      description
      imageUrl
      price
      weight
      dimensions {
        height
        width
        depth
      }
      isAvailable
      status
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_SIZE = gql`
  mutation DeleteSize($id: ID!) {
    deleteSize(id: $id)
  }
`;