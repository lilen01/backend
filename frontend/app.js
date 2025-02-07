const url = "http://127.0.0.1:8080/about";

// Making a GET request using Fetch API
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data); // Handle the data here
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
