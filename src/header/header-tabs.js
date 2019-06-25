import React from 'react'
import useReactRouter from 'use-react-router'
import {Tabs, Tab} from 'baseui/tabs'
import {TabBar} from 'baseui/tabs/styled-components'
import {Content} from 'tidbits/layout/content'

export function HeaderTabs({tabs, activeTab, onChange}) {
  const {history} = useReactRouter()
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
        Tab: {
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
                  paddingBottom: '.5em'
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
