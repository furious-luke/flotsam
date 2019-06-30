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
        {...props}
      />
      <TextareaStatus status={status} lastSaved={lastSaved} />
    </Block>
  )
}

function TextareaStatus({status, lastSaved}) {
  return (
    <Block $style={{
      color: '#888',
      paddingTop: '.5em',
      paddingBottom: '.5em',
      paddingLeft: '.5em',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    }}>
      <Timestamp value={lastSaved} prefix="Saved" />
      <Status status={status}/>
    </Block>
  )
}
