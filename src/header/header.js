import React from 'react'
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from 'baseui/header-navigation'
import {StyledLink as Link} from 'baseui/link'
import {Avatar} from 'baseui/avatar'
import {HeaderTabs} from './header-tabs'

export function Header({logo: Logo, tabs, activeTab, onTabChange}) {
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
        <NavigationList $align={ALIGN.center} />
        <NavigationList $align={ALIGN.right}>
          <NavigationItem>
            <Avatar
              name="user"
              size="scale1000"
            />
          </NavigationItem>
        </NavigationList>
      </HeaderNavigation>
      {
        !!tabs && (
          <HeaderTabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={onTabChange}
          />
        )
      }
    </React.Fragment>
  )
}
