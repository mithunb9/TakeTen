
async function getData(url: string) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const apiUrl = 'https://example.com/api/data';
getData(apiUrl)
  .then(data => console.log(data))
  .catch(error => console.error(error));
