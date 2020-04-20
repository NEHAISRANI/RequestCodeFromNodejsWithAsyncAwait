console.log("   "+"************WELCOME TO SARAL COURSE************");

const input = require('readline-sync');    //taking user input form user 

function response(saralUrl){
  const axios = require('axios');      // require axios library hit  the api and getting the data from api
  let response=axios.get(saralUrl);    //using axios library it is getting data from url
  return(response)
}
url="http://saral.navgurukul.org/api/courses"      // saral url 
var dataresponse=response(url)                         //getting the response from api
// console.log(apiData) 

const courses_and_id_data=(async(courses)=>{    
  try{
    let course=await(courses)
    allCoursesData=(course["data"]["availableCourses"]) 
    count=0
    coursesidList=[]
    for (var i  of allCoursesData){
      console.log(count,i["name"],i["id"])   //getting saral courses name and id 
      coursesidList.push(i["id"])
      count++
    } 
    return(coursesidList)   // returnin courses id
  }
  catch(err) {
    console.log("something wrong")
  }
})
coursesAndId=courses_and_id_data(dataresponse)


const  getExercise=(async(courseId)=>{
  let coursesidList=await(courseId)
  var user = input.question("enter your courses number \n");
  coursesDataId=coursesidList[user] 
  for (index in allCoursesData){
    if (allCoursesData[index]["id"]==coursesDataId){
        console.log(allCoursesData[index]["name"])
    var Url2="http://saral.navgurukul.org/api/courses/"+coursesDataId+"/exercises"
    responseUrl2=response(Url2)
    return(responseUrl2)
    }
  }
})
url2Data=getExercise(coursesAndId)


const get_data_ChildExercise=(async(getExercisedata)=>{
  let responseUrl2=await(getExercisedata)
  parentExercise=responseUrl2["data"]["data"]
    count=0
    parentId=[]
    for (i in parentExercise){
      console.log(count,parentExercise[i]["name"],parentExercise[i]["id"])
      parentId.push(parentExercise[i]["id"])
      count++
    
      count1=0
      childExercise=parentExercise[i]["childExercises"]
      // console.log(childExercise)
      for (var j in childExercise){
        console.log("\t",count1,childExercise[j]["name"])
        count1++
      }
    }
  return(parentId)
})
parentexerciseData=get_data_ChildExercise(url2Data)

const slugOfCourses=(async(parentId)=>{
  parentIId=await(parentId)
  var user1 = input.question("enter the exerciseId \n");
  slugDic={}
  count=0 
  slugList=[]
  slugidList=[]
  for (var i in parentExercise){
    if (parentExercise[i]["id"]==parentIId[user1]){
      console.log(count,parentExercise[i]["name"]) 
      slugidList.push(parentExercise[i]["id"])
      slugList.push(parentExercise[i]["slug"])
      count++
      childExercise=parentExercise[i]["childExercises"]
      count1=1
      for (var j in childExercise){
          console.log("\t",count1,childExercise[j]["name"])
          slugidList.push(childExercise[j]["id"])
          slugList.push(childExercise[j]["slug"])
          count1++ 
      }
    }
  }
  slugDic["slug"]=(slugList)
  slugDic["child_id"]=(slugidList)
  return(slugDic)

})
slugData=slugOfCourses(parentexerciseData)

const coursesContent=(async(coursesSlug)=>{
  let dic=await(coursesSlug)
  let user2 = input.question("enter your slugindex \n");
  let choose_slug=dic["slug"][user2]
  let slug_id=dic["child_id"][user2]
  var contentUrl=("http://saral.navgurukul.org/api/courses/"+(slug_id)+"/exercise/getBySlug?slug="+(choose_slug))

  url3= await response(contentUrl)  
  console.log(url3.data.content)     // consoling the courses content
})
coursesContent(slugData)
