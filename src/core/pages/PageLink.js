import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { PageContext } from '../helpers/pageContext'

const PageLink = ({ page, ...rest }) => {
    const context = useContext(PageContext)

    return <Link {...rest} to={`${context.localePath}${page.path}`} />
}

PageLink.propTypes = {
    page: PropTypes.shape({
        path: PropTypes.string.isRequired
    }).isRequired
}

export default PageLink
