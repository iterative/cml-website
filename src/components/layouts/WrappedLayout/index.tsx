import React from 'react'

import MainLayout from '../MainLayout'
import SiteHeader from '../../organisms/SiteHeader'
import SiteFooter from '../../organisms/SiteFooter'
import { IPageProps } from '../../../@dvcorg/gatsby-theme-iterative/components/MainLayout'

const WrappedLayout: React.FC<IPageProps> = ({ children, ...restProps }) => {
  return (
    <>
      <SiteHeader isMain={false} />
      <MainLayout {...restProps}>{children}</MainLayout>
      <SiteFooter />
    </>
  )
}

export default WrappedLayout
