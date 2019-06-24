import React from 'react'
import {Tabs, Tab} from 'baseui/tabs'
import {TabBar} from 'baseui/tabs/styled-components'
import {Content} from 'tidbits/layout/content'

export function HeaderTabs({tabs, activeTab, onChange}) {
  return (
    <Tabs
      activeKey={`${activeTab}`}
      onChange={({activeKey}) => onChange(activeKey)}
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
        tabs.map((tab, index) => (
          <Tab
            key={index}
            title={tab}
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
