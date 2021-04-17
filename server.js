const axios = require("axios")
const cheerio = require("cheerio")

// Use the `get` method of axios with the URL of the ButterCMS documentation page as an argument
axios.get('https://collegedunia.com/btech/bangalore-colleges').then((response) => {
  console.log(response.data)
})
