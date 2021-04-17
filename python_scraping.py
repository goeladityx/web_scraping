from urllib.request import Request, urlopen
from bs4 import BeautifulSoup
import pandas as pd
import argparse
import re

req = Request('https://collegedunia.com/btech/bangalore-colleges', headers={'User-Agent': 'Mozilla/5.0'})
content = urlopen(req).read()

soup= BeautifulSoup(content, "html.parser")
all_colleges= soup.find_all("div", {"class": "automate_client_img_snippet"})

scraped_info=[]

for college in all_colleges:
    college_info={}
    college_info['Name']= college.find("h3",{"class": "jsx-765939686"}).text
    
    try:
        college_info['Ratings']= college.find("span", {"class": "rating-text"}).text
    except AttributeError:
        pass
    
    #fees= college.find("span", {"title": "BE/B.Tech - first year fees"})
    try:
        fees= college.find("span", {"title": "BE/B.Tech - first year fees"})
        college_info['First Year Fees']=fees.find_previous_sibling("span").text
    except AttributeError:
        pass
    
    try:
        fees= college.find("span", {"title": "BE/B.Tech - first year fees"})
        college_info['Exam Accepted']=fees.find_next("span").text
        if("/ 10" in college_info['Exam Accepted']):
            college_info['Exam Accepted']=""
    except AttributeError:
        college_info['Exam Accepted']=""
        pass
    
    college.find("span", {"class": "location-badge"})
    college.find_next
    college_info['Location']= college.find("span", {"class": "location-badge"}).text
    
    scraped_info.append(college_info)
    
dataFrame= pd.DataFrame(scraped_info[:20])
dataFrame.to_json("Astute.json", orient="records")