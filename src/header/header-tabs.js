import React from 'react'
import {Tabs, Tab} from 'baseui/tabs'

export function HeaderTabs({tabs, activeTab, onChange}) {
  return (
    <Tabs
      activeKey={`${activeTab}`}
      onChange={({activeKey}) => onChange(activeKey)}
      overrides={{
        TabBar: {
          style: {
            backgroundColor: 'white',
            boxShadow: '0 2px 4px 0 rgba(204,204,204,0.5)'
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
                style: {
                  backgroundColor: 'white',
                  paddingTop: '.5em',
                  paddingBottom: '.5em'
                }
              }
            }}
          />
        ))
      }
    </Tabs>
  )
}
