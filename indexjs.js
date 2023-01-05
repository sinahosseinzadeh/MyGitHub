//this is where all our troubles begin
document.getElementById('btn').addEventListener('click', GitHubProfile)


function saveLocal(username, data){
    // saving in localstorage
    localStorage.setItem(username, data);
}

function readLocal(username){
    // reading from localstorage
    let data = localStorage.getItem(username);
    return data;
}

async function GitHubProfile(){
    let usernameid = document.getElementById('username').value
    //let newobject = window.localStorage.getItem(usernameid);

    document.getElementById('card1').style.display='block'
    //from localstorage
    if(localStorage.getItem(usernameid) == null){
        let response = await fetch(`https://api.github.com/users/${usernameid}`);

        var data = await response.json();

        let data_string = JSON.stringify(data);
        saveLocal(usernameid, data_string);
        document.getElementById("alert").innerHTML = "";
    }
    else{
        let data_string = readLocal(usernameid);
        var data = JSON.parse(data_string);
        document.getElementById("alert").innerHTML = "Data From Loacal Storage";
    }
    //this time from github
    if(data.message){
        let url = 'https://api.github.com/users/' + usernameid
        fetch(url)
        document.getElementById('error').style.display='block'
        document.getElementById('result').style.display='none'
        
    }
    else{
        
        document.getElementById('result').style.display='block'
        document.getElementById('error').style.display='none'
        document.getElementById('profile_picture').src = data.avatar_url
        //document.getElementById('usergit').src = data.url
        document.getElementById('name').innerHTML = data.name
        document.getElementById('location').innerHTML = data.location
        document.getElementById('blog').innerHTML = data.blog
        document.getElementById('bio').innerHTML = data.bio
        //window.localStorage.setItem
    }
}