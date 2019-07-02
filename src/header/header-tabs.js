import React from 'react'
import useReactRouter from 'use-react-router'
import {Tabs, Tab} from 'baseui/tabs'
import {TabBar} from 'baseui/tabs/styled-components'
import {Content} from 'tidbits/layout/content'
import {firstPathSegment, notNil} from 'tidbits/utils'

export function HeaderTabs({tabs, onChange, ...props}) {
  const {history, location} = useReactRouter()
  const activeTab = notNil(props.activeTab, findActiveTab(tabs, location.pathname))
  function handleTabChange({activeKey}) {
    const tab = tabs[Number(activeKey)]
    if (tab.link) {
      history.push(tab.link)
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

function findActiveTab(tabs, path) {
  const pathSegment = firstPathSegment(path)
  return tabs.findIndex(tab => {
    const tabSegment = firstPathSegment(tab.link)
    return tabSegment && tabSegment == pathSegment
  })
}
