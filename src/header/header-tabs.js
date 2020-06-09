import React from 'react'
import {useNavigate, useLocation} from '@reach/router'
import {Tabs, Tab} from 'baseui/tabs'
import {TabBar} from 'baseui/tabs/styled-components'

import {Content} from '../layout/content'
import {firstPathSegment, notNil} from '../utils'

export function HeaderTabs({tabs, onChange, pathDepth, ...props}) {
  const navigate = useNavigate()
  const location = useLocation()
  const activeTab = notNil(props.activeTab, findActiveTab(tabs, location.pathname, pathDepth))

  function handleTabChange({activeKey}) {
    const tab = tabs[Number(activeKey)]
    if (tab.route) {
      navigate(tab.route)
    }
    if (onChange) {
      onChange(activeKey)
    }
  }

  return (
    <Tabs
      activeKey={`${activeTab}`}
      onChange={handleTabChange}
      overrides={{
        Root: {
          style: {
            backgroundColor: 'white',
            boxShadow: '0 2px 4px 0 rgba(204,204,204,0.5)'
          }
        },
        TabBar: {
          component: ContentTabBar,
          style: {
            backgroundColor: 'white'
          }
        },
        TabContent: {
          style: {
            display: 'none'
          }
        }
      }}
    >
      {
        tabs.map(({title}, index) => (
          <Tab
            key={index}
            title={title}
            overrides={{
              Tab: {
                style: ({$theme}) => ({
                  ...$theme.typography.menu,
                  backgroundColor: 'white',
                  paddingTop: '.5em',
                  paddingBottom: '.5em',
                  outline: 'none'
                })
              }
            }}
          />
        ))
      }
    </Tabs>
  )
}

function ContentTabBar({children, ...props}) {
  return (
    <Content>
      <TabBar {...props}>
        {children}
      </TabBar>
    </Content>
  )
}

function findActiveTab(tabs, path, depth = 0) {
  const pathSegment = firstPathSegment(path, depth)
  return tabs.findIndex(tab => {
    const tabSegment = firstPathSegment(tab.route)
    return tabSegment == pathSegment
  })
}
