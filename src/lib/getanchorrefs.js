// Returns a distinct list of anchor references or <a> tags in the page
export const getAnchorRefs = async (page) => {
  const anchors = await page.$$eval('a', as => as.map(a => a.href))
  const hrefs = anchors.reduce((acc, a) => {
    const regex = /^http.*/
    const link = a
      .replace(/#$/, '')
      .trim()
    if (link.match(regex)) {
      acc[link] = 1
    }
    return acc
  }, {})
  return Object.keys(hrefs)
}
