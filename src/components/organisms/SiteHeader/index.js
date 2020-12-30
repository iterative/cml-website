import React from "react"
import Link from "components/atoms/ThemedGatsbyLink"
import { Box, Container } from "@theme-ui/components"
import SmartLink from "components/atoms/SmartLink"
import SiteLogo from "components/atoms/SiteLogo"

const navItems = [
  {
    label: "Use Cases",
    href: "#use-cases",
  },
  {
    label: "Docs",
    href: "https://dvc.org/doc/cml",
  },
  {
    label: "GitHub",
    href: "https://github.com/iterative/cml",
  },
]

function Header() {
  return (
    <Box as="header" variant="layout.Header">
      <Container variant="layout.Header.Inner">
        <Link to="/" variant="layout.Header.Logo">
          <SiteLogo />
        </Link>
        <Box as="nav" variant="layout.Header.Nav" id="header-nav">
          {navItems.map(({ label, href }, i) => (
            <SmartLink href={href} variant="layout.Header.Nav.Link" key={i}>
              {label}
            </SmartLink>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default Header
