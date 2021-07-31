export const sortByTitle = (a, b, dir) => {
  const titleA = a.title.toUpperCase()
  const titleB = b.title.toUpperCase()
  if (titleA > titleB) {
    return 1
  }
  if (titleA < titleB) {
    return -1
  }
  return 0
}

export const sortByTitleDesc = (a, b) => {
  const titleA = a.title.toUpperCase()
  const titleB = b.title.toUpperCase()
  if (titleA > titleB) {
    return -1
  }
  if (titleA < titleB) {
    return 1
  }
  return 0
}
