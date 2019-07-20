import React from 'react'
import {Block} from 'baseui/block'
import {Textarea as BaseTextarea} from 'baseui/textarea'
import {Timestamp} from 'tidbits/timestamp'
import {handleEvent} from 'tidbits/utils'
import {Status} from './status'

export function Textarea({value, status, lastSaved, onChange, ...props}) {
  return (
    <Block>
      <BaseTextarea
        value={value}
        onChange={handleEvent(onChange)}
        overrides={{
          InputContainer: {
            style: {
              display: 'block'
            }
          },
          After: {
            component: TextareaStatus,
            props: {
              status: status,
              lastSaved: lastSaved
            }
          }
        }}
        {...props}
      />
    </Block>
  )
}

function TextareaStatus({status, lastSaved}) {
  return (
    <Block $style={{
      color: '#777',
      backgroundColor: '#f1f1f1',
      height: '1.5rem',
      paddingTop: '.5em',
      paddingBottom: '.5em',
      paddingLeft: '.5em',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    }}>
      <Timestamp value={lastSaved} prefix="Saved" />
      <Status status={status} />
    </Block>
  )
}
