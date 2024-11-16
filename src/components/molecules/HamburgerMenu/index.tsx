import React, { useEffect, useState, useCallback, MouseEvent } from 'react'
import cn from 'classnames'

import HamburgerIcon from '../HamburgerIcon'
import Link from '../../atoms/Link'
import SiteLogo from '../SiteLogo'
import { logEvent } from '@dvcorg/gatsby-theme-iterative/src/utils/front/plausible'

import { getFirstPage } from '../../../utils/shared/sidebar'

import { ReactComponent as TwitterIcon } from '@media/icons/twitter.svg'
import { ReactComponent as GithubIcon } from '@media/icons/github.svg'
import { ReactComponent as MailIcon } from '@media/icons/mail.svg'
import { ReactComponent as DiscordIcon } from '@media/icons/discord.svg'

import * as styles from './styles.module.css'

const docsPage = getFirstPage()

export type HamburgerHelpers = {
  opened: boolean
  setOpened: (newState: boolean) => void
  handleToggle: () => void
  handleClose: () => void
  handleItemClick: (name?: string) => (e: MouseEvent) => void
}

export const useHamburgerMenu: () => HamburgerHelpers = () => {
  const [opened, setOpened] = useState(false)

  const handleToggle = useCallback(() => setOpened(!opened), [opened])

  const handleClose = useCallback(() => setOpened(false), [opened])

  const handleItemClick = useCallback<HamburgerHelpers['handleItemClick']>(
    item => (): void => {
      handleClose()
      if (item) {
        logEvent('Hamburger Menu', { Item: item })
      }
    },
    []
  )

  useEffect(() => {
    const method = opened ? 'add' : 'remove'
    document.body.classList[method](styles.hiddenScrollbar)
  }, [opened])

  return {
    opened,
    setOpened,
    handleToggle,
    handleClose,
    handleItemClick
  }
}

export const HamburgerMenu: React.FC<
  Pick<HamburgerHelpers, 'opened' | 'handleItemClick' | 'handleToggle'> & {
    collapsed: boolean
  }
> = ({ opened, handleItemClick }) => {
  return (
    <div className={cn(styles.wrapper, opened && styles.opened)}>
      <div className={styles.logoRow}>
        <span className={styles.logo}>
          <SiteLogo />
        </span>
        <Link
          className={styles.company}
          href="https://iterative.ai/"
          target="_blank"
        >
          by <span className={styles.companyName}>iterative.ai</span>
        </Link>
      </div>
      <ul className={styles.sections}>
        <li className={styles.section}>
          <Link
            href="/#use-cases"
            className={styles.sectionHeading}
            onClick={handleItemClick('use-cases')}
          >
            Use Cases
          </Link>
        </li>
        <li className={styles.section}>
          <Link
            href={docsPage}
            className={styles.sectionHeading}
            onClick={handleItemClick('doc')}
          >
            Doc
          </Link>
        </li>

        <li className={styles.section}>
          <div className={styles.sectionHeading}>Support</div>
          <ul className={styles.subSections}>
            <li className={styles.subSection}>
              <Link
                className={styles.subSectionLink}
                href="mailto:support@dvc.org"
                target="_blank"
                onClick={handleItemClick('mail')}
              >
                <MailIcon className={styles.subSectionLinkImage} />
                <span className={styles.subSectionLinkTitle}>E-Mail</span>
              </Link>
            </li>
            <li className={styles.subSection}>
              <Link
                className={styles.subSectionLink}
                href="https://github.com/iterative/cml"
                onClick={handleItemClick('github')}
                target="_blank"
              >
                <GithubIcon className={styles.subSectionLinkImage} />
                <span className={styles.subSectionLinkTitle}>GitHub</span>
              </Link>
            </li>
            <li className={styles.subSection}>
              <Link
                className={styles.subSectionLink}
                href="https://cml.dev/chat"
                onClick={handleItemClick('chat')}
                target="_blank"
              >
                <DiscordIcon className={styles.subSectionLinkImage} />
                <span className={styles.subSectionLinkTitle}>Discord</span>
              </Link>
            </li>
            <li className={styles.subSection}>
              <Link
                className={styles.subSectionLink}
                href="https://twitter.com/DVCorg"
                onClick={handleItemClick('twitter')}
                target="_blank"
              >
                <TwitterIcon className={styles.subSectionLinkImage} />
                <span className={styles.subSectionLinkTitle}>Twitter</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={styles.section}>
          <p className={styles.sectionHeading}>All Tools</p>
          <ul className={styles.subSections}>
            <li className={styles.subSection}>
              <Link
                href="https://studio.iterative.ai/"
                className={styles.subSectionLink}
              >
                <div
                  className={cn(styles.subSectionLinkImage, styles.bgImgStudio)}
                />
                <span className={styles.subSectionLinkTitle}>Studio</span>
              </Link>
            </li>
            <li className={styles.subSection}>
              <Link href="https://dvc.org" className={styles.subSectionLink}>
                <div
                  className={cn(styles.subSectionLinkImage, styles.bgImgDvc)}
                />
                <span className={styles.subSectionLinkTitle}>DVC</span>
              </Link>
            </li>
            <li className={styles.subSection}>
              <Link href="/" className={styles.subSectionLink}>
                <div
                  className={cn(styles.subSectionLinkImage, styles.bgImgCml)}
                />
                <span className={styles.subSectionLinkTitle}>CML</span>
              </Link>
            </li>
            <li className={styles.subSection}>
              <Link href="https://mlem.ai/" className={styles.subSectionLink}>
                <div
                  className={cn(styles.subSectionLinkImage, styles.bgImgMlem)}
                />
                <span className={styles.subSectionLinkTitle}>MLEM</span>
              </Link>
            </li>
            <li className={styles.subSection}>
              <Link
                href="https://marketplace.visualstudio.com/items?itemName=Iterative.dvc"
                className={styles.subSectionLink}
              >
                <div
                  className={cn(styles.subSectionLinkImage, styles.bgImgDvc)}
                />
                <span className={styles.subSectionLinkTitle}>
                  VS Code Extension
                </span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
      <Link
        href="/doc/start"
        className={styles.linkButton}
        onClick={handleItemClick('get-started')}
      >
        Get started
      </Link>
    </div>
  )
}

export const HamburgerButton: React.FC<{
  opened: boolean
  collapsed: boolean
  handleClick: (e: MouseEvent) => void
}> = ({ opened, handleClick }) => (
  <button
    className={cn(styles.toggleButton, opened && styles.opened)}
    onClick={handleClick}
    aria-label="Toggle Mobile Menu"
  >
    <HamburgerIcon opened={opened} />
  </button>
)
