export function filterTree(nodes = [], filterFunc) {
  const mappedNodes = nodes.map(node => {
    if (hasChildren(node)) {
      const filteredChildren = filterTree(node.children, filterFunc)
      if (filteredChildren.length) {
        return {
          ...node,
          children: filteredChildren
        }
      } else {
        return null
      }
    } else {
      if (filterFunc(node)) {
        return node
      } else {
        return null
      }
    }
  })
  return mappedNodes.filter(node => !!node)
}

export function transformTree(nodes = [], transformFunc, depth = 0) {
  return nodes.map(node => ({
    ...transformFunc(node, depth),
    children: transformTree(node.children, transformFunc, depth + 1)
  }))
}

export function flattenLeaves(nodes = []) {
  return nodes.reduce((a, b) => [...a, ...(hasChildren(b) ? [] : [b]), ...flattenLeaves(b.children)], [])
}

export function growFromLeaves(leaves = []) {
  const nodes = []
  const nodesMap = {}
  const seenBranches = {}
  leaves.forEach(leaf => {
    let seen
    while (leaf.parent) {
      seen = true
      if (!nodesMap[leaf.parent.id]) {
        nodesMap[leaf.parent.id] = {...leaf.parent, children: []}
        seen = false
      }
      if (!seenBranches[leaf.id]) {
        nodesMap[leaf.parent.id].children.push(leaf)
        seenBranches[leaf.id] = true
      }
      leaf = nodesMap[leaf.parent.id]
    }
    if (!seen) {
      nodes.push(leaf)
    }
  })
  return nodes
}

export function hasChildren(node) {
  return node.children && node.children.length
}
