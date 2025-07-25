import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import blog from '../assets/nav-blog.png'
import { Hero } from '../components/Hero'
import { Layout } from '../components/Layout'
import { Search } from '../components/Search'
import { SEO } from '../components/SEO'
import { PageLayout } from '../components/PageLayout'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function Notes({ data }) {
  const posts = data.posts.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const title = 'Notes'
  // TODO add description
  const description = ''

  return (
    <>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <SEO customDescription={description} />

      <PageLayout>
        <Hero title={title} description={description} hasSearch />
        <Search data={simplifiedPosts} section="notes" categoryFilter="notes" />
      </PageLayout>
    </>
  )
}

Notes.Layout = Layout

export const notesQuery = graphql`
  query NotesQuery {
    posts: allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: {
          template: { eq: "post" }
          categories: { eq: "Notes" }
        }
      }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
