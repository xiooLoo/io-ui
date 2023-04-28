export function equalsArray(a, b) {
  let m = new Map()
  a.forEach(o => m.set(o, (m.get(o) || 0) + 1))
  b.forEach(o => m.set(o, (m.get(o) || 0) - 1))
  for (let value of m.values()) {
    if (value !== 0) {
      return false
    }
  }
  return true
}
