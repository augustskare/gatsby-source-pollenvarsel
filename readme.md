# gatsby-source-pollenvarsel

A [Gatsby](https://www.gatsbyjs.org) source plugin for getting pollen forecast data for Norway into your Gatsby application.

## Install

`yarn add gatsby-source-pollenvarsel`

or with npm

`npm install gatsby-source-pollenvarsel`

## How to use

In your `gatsby-config.js`

```
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-pollenvarsel',
      options: {
        api_key: '',
      },
    },
  ]
}
```

### Options

#### api_key

Type: `string`<br>
Required: `true`

API key is available on request for members of [NAAF](https://naaf.no).

## How to query

```graphql
query {
  allPollenvarsel {
    edges {
      node {
        name
        slug
        forecast {
          date
          description
          pollen {
            description
            distribution
            name
          }
        }
      }
    }
  }
}
```

### Filter forecast by region

```graphql
query {
  allPollenvarsel(filter: { name: { eq: "Troms" } }) {
    edges {
      node {
        forecast {
          date
          description
          pollen {
            description
            distribution
            name
          }
        }
      }
    }
  }
}
```
