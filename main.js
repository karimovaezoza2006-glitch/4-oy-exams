fetch("https://69035efbd0f10a340b23ed3d.mockapi.io/api/products")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    // data — bu array bo‘lishi mumkin, ichida product obyektlari
  })
  .catch(error => {
    console.error("Fetch error:", error);
  });
