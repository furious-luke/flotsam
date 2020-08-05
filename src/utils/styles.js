export function getBorder(attribute, color) {
  return getEdges('border', attribute, color)
}

export function getPadding(value) {
  return getEdges('padding', '', value)
}

export function getBorderRadius(radius) {
  return {
    borderTopLeftRadius: `${radius};`,
    borderTopRightRadius: `${radius};`,
    borderBottomRightRadius: `${radius};`,
    borderBottomLeftRadius: `${radius};`
  }
}

export function getEdges(prefix, attribute, value) {
  return {
    [`${prefix}Top${attribute}`]: value,
    [`${prefix}Right${attribute}`]: value,
    [`${prefix}Bottom${attribute}`]: value,
    [`${prefix}Left${attribute}`]: value
  }
}
