import React from 'react'
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from 'baseui/header-navigation'
import {StyledLink as Link} from 'baseui/link'
import {getOverrides} from 'baseui/helpers/overrides'

import {AuthAvatar} from 'tidbits/auth-avatar'

import {HeaderTabs} from './header-tabs'

export function Header({
  logo: Logo,
  tabs,
  activeTab,
  onTabChange,
  navigation,
  pathDepth,
  overrides = {}
}) {
  const [Avatar, avatarProps] = getOverrides(overrides.Avatar, AuthAvatar)
  return (
    <React.Fragment>
      <HeaderNavigation
        overrides={{
          Root: {
            style: ({$theme}) => ({
              backgroundColor: $theme.colors.header,
              paddingTop: 0,
              paddingRight: '1rem',
              paddingBottom: 0
            })
          }
        }}
      >
        {Logo && <Logo />}
        <NavigationList $align={ALIGN.center}>
          {navigation}
        </NavigationList>
        <NavigationList $align={ALIGN.right}>
          <NavigationItem>
            <Avatar {...avatarProps} />
          </NavigationItem>
        </NavigationList>
      </HeaderNavigation>
      {
        !!tabs && (
          <HeaderTabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={onTabChange}
            pathDepth={pathDepth}
          />
        )
      }
    </React.Fragment>
  )
}
