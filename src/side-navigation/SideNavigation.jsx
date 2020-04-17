import React, {useGlobal, useEffect} from 'reactn'
import {useNavigate} from '@reach/router'
import {Navigation as BaseNavigation} from 'baseui/side-navigation'

export function SideNavigation({items}) {
  const [nav, setNav] = useGlobal('nav')
  const navigate = useNavigate()
  const mappedItems = items.map(mapItem)
  function handleChange({event, item}) {
    event.preventDefault()
    setNav({...nav, navId: item.itemId})
    navigate(item.itemId)
  }
  // useEffect(() => {
  //   // TODO: Should look at where we are and decide where to navigate
  //   // to.
  //   handleChange({item: {itemId: '#attributes'}})
  // }, [])
  return (
    <BaseNavigation
      items={mappedItems}
      activeItemId={nav.navId}
      onChange={handleChange}
    />
  )
}

function mapItem(item) {
  return {
    ...item,
    itemId: item.route
  }
}
