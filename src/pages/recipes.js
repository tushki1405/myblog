import React, { useMemo, useState } from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'

import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Hero } from '../components/Hero'
import { PageLayout } from '../components/PageLayout'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'
import pizza from '../assets/nav-pizza.png'

// TODO: add search for recipes
export default function Recipes({ data }) {
  const posts = data.recipes.edges
  const title = 'Recipes'
  const description = 'A collection of my favorite recipes and cooking experiments.'
  const [selectedCategory, setSelectedCategory] = useState('All')

  const simplifiedRecipes = useMemo(() => {
    const imageFiles = data.allFile.nodes.reduce((acc, file) => {
      const path = `${file.relativeDirectory}/${file.name}`
      return { ...acc, [path]: file }
    }, {})

    // Get simplified posts with images
    const postsWithImages = posts.map(post => {
      // Extract the path from the markdown file's absolute path
      const mdPath = post.node.fileAbsolutePath
      const relativePath = mdPath.split('/content/').pop().replace(/\.md$/, '')
      // Find matching image
      const imageFile = imageFiles[relativePath]
      return {
        ...post,
        node: {
          ...post.node,
          frontmatter: {
            ...post.node.frontmatter,
            thumbnail: imageFile
          }
        }
      }
    })
    return getSimplifiedPosts(postsWithImages, { thumbnails: true })
  }, [posts, data.allFile.nodes])

  // Get all unique categories from simplified recipes
  const allCategories = useMemo(() => {
    const categories = new Set(['All'])
    simplifiedRecipes.forEach(recipe => {
      if (recipe.categories) {
        recipe.categories.forEach(category => {
          categories.add(category)
        })
      }
    })
    categories.delete('Recipes')
    return Array.from(categories).sort()
  }, [simplifiedRecipes])

  // Filter recipes by selected category
  const filteredRecipes = useMemo(() => {
    if (selectedCategory === 'All') return simplifiedRecipes
    return simplifiedRecipes.filter(recipe =>
      recipe.categories.includes(selectedCategory)
    )
  }, [simplifiedRecipes, selectedCategory])

  return (
    <>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <SEO customDescription={description} />

      <PageLayout>
        <Hero title={title} description={description} image={pizza} hasSearch />
        
        {/* Category Filter Chips */}
        <div 
          className="alphabetical-tags"
          style={{marginBottom: '1.5rem'}}
        >
          <div className="tags">
            {allCategories.map((category) => {
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`button small ${selectedCategory === category ? 'active' : ''
                    }`}
                >
                  <span>{category}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Recipe Cards */}
        <div className="cards">
          {filteredRecipes.map((recipe) => (
            <div className="card" key={recipe.slug}>
              {recipe.thumbnail && (
                <div className="gatsby-image-wrapper">
                  <Link to={recipe.slug}>
                    <GatsbyImage
                      image={getImage(recipe.thumbnail)}
                      alt={recipe.title}
                      style={{marginBottom: '0.5rem'}}
                    />
                  </Link>
                </div>
              )}
              <div className="card-content">
                <Link to={recipe.slug} className="card-header">
                  {recipe.title}
                </Link>
                <p>{recipe.description}</p>
                <div className="card-links">
                  <Link to={recipe.slug} className="button small">
                    View Recipe
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PageLayout>
    </>
  )
}

Recipes.Layout = Layout

export const recipesQuery = graphql`
  query RecipesQuery {
    recipes: allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: {
          template: { eq: "post" }
          categories: { eq: "Recipes" }
        }
      }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          fileAbsolutePath
          frontmatter {
            title
            description
            template
            categories
          }
        }
      }
    }
    allFile(filter: {extension: {regex: "/(jpg|jpeg|png|gif)/"}}) {
      nodes {
        relativePath
        relativeDirectory
        name
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            aspectRatio: 1.33
          )
        }
      }
    }
  }
`
