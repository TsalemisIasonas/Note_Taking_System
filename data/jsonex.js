fetch('./data/data.json')
  .then(response => response.json())
  .then(data => {
    initialUpdateDOM(data);
  })
  .catch(error => {
    alert('Error fetching data:', error);
  });



