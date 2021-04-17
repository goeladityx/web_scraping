const axios = require("axios")
const cheerio = require("cheerio")
const json = require("JSON")
var fs= require("fs")

var arr=[]
var result
// Use the `get` method of axios with the URL of the ButterCMS documentation page as an argument
axios.get('https://collegedunia.com/btech/bangalore-colleges').then((response) => {

        var dict={}
        // `response` is an HTTP response object, whose body is contained in it's `data` attribute
        // Load the web page source code into a cheerio instance
        const $ = cheerio.load(response.data)

        // The pre.highlight.shell CSS selector matches all `pre` elements
        // that have both the `highlight` and `shell` class
        const all_colleges = $('div.automate_client_img_snippet')

        for(let i=0; i < all_colleges.length; i++){
          const colg_name = $(all_colleges[i]).find('h3.jsx-765939686')[0]
          const colg_rat= $(all_colleges[i]).find('span.rating-text')
          const colg_first_fees= $(all_colleges[i]).find('span[title="BE/B.Tech - first year fees"]')
          colg_fees= $(colg_first_fees).prev('span')
          const colg_prev_loc= $(all_colleges[i]).find('span.location-badge')
          colg_loc= colg_prev_loc.children("span.mr-1")
          colg_exams= colg_fees.parent().parent().next("li").children("a").children()[0]
          var college_name, college_ratings, college_fees, college_exams, college_location
          if(colg_name){
            college_name = $(colg_name).text()
            //console.log(college_name)
            dict['Name']= college_name
          }
          if(colg_rat){
            college_ratings = $(colg_rat).text()
            //console.log(college_ratings)
            dict["Ratings"]= college_ratings
          }
          if(colg_fees){
            college_fees = $(colg_fees).text()
            //console.log(college_fees)
            dict["First_Year_Fees"]= college_fees
          }
          if(colg_loc){
            college_location = $(colg_loc).text()
            //console.log(college_location)
            dict["Location"]= college_location
          }
          if(colg_exams){
            college_exams = $(colg_exams).text()
            //console.log(college_exams)
            dict["Exams_Aceepted"]= college_exams
          }
          arr.push(dict)

        }
        college_json= JSON.stringify(arr.slice(0,21))
        //result= JSON.parse(college_json)
        //console.log(result)
        fs.writeFile("Astute_js.json", college_json, function(err){console.log("Done")})

})

//console.log(college_json)
//var result= JSON.parse(college_json)

//college_json= JSON.stringify(dict)
//console.log(college_json)
