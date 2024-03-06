const  searchbar = document.querySelector(".searchbar-container");
const profilecontainer = document.querySelector(".profile-container");
const root = document.documentElement.style;
const get =(param) => document.getElementById(`${param}`);
const url = "https://api.github.com/users/";
const noresults = get("no-results");
const btnMode = get("btn-mode");
const modeText = get("mode-text");
const modeIcon = get("mode-icon");
const input= get("input");
const btnsubmit = get("submit");
const avatar= get("avatar");
const UserName = get("name");
const user= get("user");
const date = get("date");
const months = ["Jan","Feb","Mar", "Apr", "May", "Jun","Jul","Aug","Sep","Oct","Nov", "Dec"];
const bio = get("bio");
const repos= get("repos");
const followers= get("followers");
const following = get("following");
const userLocation= get("location");
const page = get("link");
const twitter = get("twitter");
const company = get("building");

let darkMode = false;

btnsubmit.addEventListener("click", function(){
    if( input.value !==  ""){
        getUserData(url +input.value);
    }
});

input.addEventListener("keydown", function(e){
    if( e.key == "Enter"){
        if(e.value !== ""){
            getUserData(url +input.value);
        }
    }
},false
);

input.addEventListener("input",function(){
    noresults.style.display="none";
})

btnMode.addEventListener("click",function(){
    if(darkMode == false){
        darkModeProperties();
    }
    else{
        lightModeProperties();
    }
})

function getUserData(gitUrl) {
    fetch(gitUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            updateProfile(data);
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
            // Handle the error here, for example:
            noresults.style.display = 'block';
        });
}
function updateProfile(data){
    if(data.message !== "Not found"){
        noresults.style.display="none";
        function checkNull(para1,para2){
            if(para1 ==="" || para1 === null ){
                para2.style.opacity=0.5;
                para2.previousElementSibling.style.opacity = 0.5; 
                return false;
            }
            else{
                return true;
            }
        }
        avatar.src= `${data.avatar_url}`;
        UserName.innerText = data.name === null ? data.login : data.name;
        user.innerText = `@${data.login}`;
        user.href = `${data.html_url}`;
        datesegments = data.created_at.split("T").shift().split("-");        
        date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
        bio.innerText = data.bio === null ? "This profile has No bio" :`${data.bio}`;
        repos.innerText = `${data.public_repos}`;
        followers.innerText = `${data.followers}`;
        following.innerText = `${data.following}`;
        userLocation.innerText =checkNull(data.location,userLocation) ? data.location : "Not available";
        page.innerText = checkNull(data.blog , page) ? data.blog : "Not available";
        page.href = checkNull(data.blog , page) ? data.blog : "#";
        twitter.innerText = checkNull(data.twitter_username , twitter) ? data.twitter_username : "Not available";
        twitter.href = checkNull(data.twitter_username , twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
        company.innerText = checkNull(data.company,company) ? data.company : "Not available";
        searchbar.classList.toggle("active");
        profilecontainer.classList.toggle("active");
    }
    else{
        noresults.style.display = "block";
    }
}
function darkModeProperties(){
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    modeText.innerText = "LIGHT";
    modeIcon.src="sun-svgrepo-com.svg";
    root.setProperty("--lm-icon--bg","brightnes(1000%)");
    darkMode = true;
    localStorage.setItem("dark-mode", true);
}
function lightModeProperties(){
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    modeText.innerText = "DARK";
    modeIcon.src="moon.png";
    root.setProperty("--lm-icon--bg","brightnes(100%)");
    darkMode = false;
    localStorage.setItem("dark-mode", false);
}

function init(){
    darkMode = false;

    //HW
  // const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  
    const value = localStorage.getItem("dark-mode");
  
    if(value === null) {
      console.log("null k andar");
      localStorage.setItem("dark-mode", darkMode);
      lightModeProperties();
    }
    else if(value == "true") {
      console.log("truer k andar");
      darkModeProperties();
    }
    else if(value == "false") {
      console.log("false k andar");
      lightModeProperties();
    }
  
    getUserData(url+"tuhin2001");
}
init()
