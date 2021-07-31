const sortByTitle = (a, b, desc = false) => {
  const titleA = a.title.toLowerCase()
  const titleB = b.title.toLowerCase()
  let compared = 0
  if (titleA > titleB) compared = 1
  if (titleA < titleB) compared = -1

  if (desc) compared * -1
  return compared
}
