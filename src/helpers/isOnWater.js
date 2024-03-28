async function isOnWater(marker) {
  try {
    const url = `https://isitwater-com.p.rapidapi.com/?latitude=${marker[0]}&longitude=${marker[1]}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "53bcb488dcmsh1aac4446be446f4p1ef27fjsnd209779f242b",
        "X-RapidAPI-Host": "isitwater-com.p.rapidapi.com",
      },
    };
    const data = await fetch(url, options);

    const dataJson = await data.json();
    console.log(dataJson);
    // return dataJson.isWater;
  } catch (error) {
    alert("⚠ Something went wrong! Please try again...");
  }
}
export default isOnWater;
