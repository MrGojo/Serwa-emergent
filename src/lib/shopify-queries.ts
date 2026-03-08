/**
 * SERWA Professional - Shopify Storefront API GraphQL Queries
 * 
 * REFERENCE: Use these when connecting to real Shopify store.
 * Replace placeholder product data with API fetches.
 * 
 * Docs: https://shopify.dev/docs/api/storefront
 */

// =============================================================================
// Product & Collection Queries
// =============================================================================

export const PRODUCTS_QUERY = `
  query getProducts($first: Int = 20) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
              }
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`

export const PRODUCT_BY_HANDLE_QUERY = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
          }
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
    }
  }
`

export const COLLECTION_QUERY = `
  query getCollection($handle: String!, $first: Int = 20) {
    collection(handle: $handle) {
      id
      handle
      title
      products(first: $first) {
        edges {
          node {
            id
            handle
            title
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                  }
                }
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`

// =============================================================================
// Cart Mutations (for add to cart, update, checkout)
// =============================================================================

export const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`

export const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  product {
                    title
                  }
                  price {
                    amount
                  }
                  image {
                    url
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`

export const CART_QUERY = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      lines(first: 50) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                product {
                  title
                }
                price {
                  amount
                }
                image {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`
