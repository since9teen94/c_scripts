import useSWRImmutable from 'swr/immutable'

async function getQuote() {
  let url = 'https://www.officeapi.dev/api/quotes/random'
  let req = await fetch(url)
  let res = await req.json()
  return {
    quote: res.data.content,
    character: `${res.data.character.firstname} ${res.data.character.lastname}`,
  }
}

export default function Home() {
  let { data, isLoading, error, mutate, isValidating } = useSWRImmutable(
    'getQuote',
    getQuote
  )
  if (isLoading) return <h1>Loading Spinner</h1>
  if (isValidating) return <h1>Validating</h1>
  if (error) return <h1>Error</h1>
  return (
    <>
      <p>{`${data.quote}`}</p>
      <p>{` - ${data.character}`}</p>
      <button onClick={mutate}>Click For Another Quote</button>
    </>
  )
}
