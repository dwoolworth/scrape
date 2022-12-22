// Returns an array of objects from query string to store in database
export const getNameValuePairs = (searchParams) => {
  const params = []
  searchParams.forEach((val, key) => {
    params.push({ key, val })
  });
  return params
}
