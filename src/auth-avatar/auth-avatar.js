import React from 'react'
import {Avatar} from 'baseui/avatar'
import {StatefulMenu} from 'baseui/menu'
import {StatefulPopover, PLACEMENT, TRIGGER_TYPE} from 'baseui/popover'
import {Block} from 'baseui/block'
import {styled} from 'baseui'

import {handleEvent} from 'tidbits/utils'

export function AuthAvatar({user, promptLink}) {
  if (!user) {
    return <AuthPrompt link={promptLink} />
  }
  else {
    return (
      <StatefulPopover
        content={<AuthMenu />}
        placement={PLACEMENT.bottomRight}
        triggerType={TRIGGER_TYPE.hover}
        accessibilityType="tooltip"
      >
        <Block display="inline-block">
          <Avatar
            name={user.name || 'Anonymous User'}
            size="scale1000"
          />
        </Block>
      </StatefulPopover>
    )
  }
}

export function AuthPrompt({prompt, link}) {
  return (
    <StyledAuthPrompt
      href="#"
      onClick={handleEvent(() => history.push(link))}
    >
      {prompt || 'Sign in'}
    </StyledAuthPrompt>
  )
}

const StyledAuthPrompt = styled('a', ({$theme}) => ({
  ...$theme.typography.menu,
  color: $theme.colors.background,
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline'
  }
}))

export function AuthMenu() {
  const ITEMS = [
    {
      label: 'Profile'
    },
    {
      label: 'Sign out'
    }
  ]
  return (
    <StatefulMenu
      items={ITEMS}
      rootRef={React.createRef()}
    />
  )
}
