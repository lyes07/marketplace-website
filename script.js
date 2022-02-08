var currentUserId = '0';
document.getElementById("signIn").addEventListener("click",inForm);
function inForm(){
    var ht='<form id="inForm"><input type="text" placeholder="E-mail / User Name" id="inUser" style="margin-right:5px;" required><input type="password" placeholder="Password" id="inPassword" style="margin-right:5px;" required><input type="submit" value="Log In" id="button" style="height: 40px; width: 100px; background-color: rgb(0, 255, 136);border-radius: 5px; color: black; font-size: larger;"></form> '; 
    document.getElementById("signIn").remove();
    document.getElementById("inForm").innerHTML = ht;
    }

document.getElementById("signUp").addEventListener("click",upForm);
function upForm(){
    var ht='<form id="upForm"><input type="text" placeholder="User Name" id="upUser" style="margin-right:5px;" required><input type="email" placeholder="E-Mail" id="upEmail" style="margin-right:5px;" required><input type="password" placeholder="Password" id="upPassword" style="margin-right:5px;" required><input type="submit" value="Sign  Up" id="button" style="height: 40px; width: 100px; background-color: rgb(0, 255, 136);border-radius: 5px; color: black; font-size: larger;"></form> '; 
    document.getElementById("signUp").remove();
    document.getElementById("upForm").innerHTML = ht;
    }

document.getElementById("inForm").addEventListener("submit",signIn);
function signIn(e){
    e.preventDefault(); 
    var name = document.getElementById("inUser").value;
    var password = document.getElementById("inPassword").value;
    var xhr = new XMLHttpRequest();
    xhr.open("post" ,"logIn.php", true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("name="+name+"&password="+password);  
    xhr.onload = function(){
        if(this.status == 200){
            var response = this.responseText;
            if(response == "0"){
                alert('User Not Found - Please Reload And Try Again');
                document.location.reload(true);
            }
            else if (response == "ERROR connection to database failed!!") {
                alert(response);
                document.location.reload(true);
            }
            else{
                document.getElementById("head").remove();
                document.getElementById("welcome").remove();
                var str = response.split(';');
                currentUserId = str[0];
                document.getElementById("response").innerHTML = '<h2>Welcome <u><strong>'+str[1]+'</strong></u>, Would you like to add an item?</h2>';
                document.getElementById("addItem").style.visibility = "visible";
            }  
        }
    }
}

document.getElementById("upForm").addEventListener("submit",signUp);
function signUp(e){
    e.preventDefault(); 
    var name = document.getElementById("upUser").value;
    var email = document.getElementById("upEmail").value;
    var password = document.getElementById("upPassword").value;
    var xhr = new XMLHttpRequest();
    xhr.open("post" ,"signUp.php", true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("name="+name+"&email="+email+"&password="+password);  
    xhr.onload = function(){
        if(this.status == 200){
            var response = this.responseText;
            document.getElementById("head").remove();
            document.getElementById("welcome").remove();
            var str = response.split(';');
            currentUserId = str[0];
            document.getElementById("response").innerHTML = '<h2>Welcome <u><strong>'+str[1]+'</strong></u>, Would you like to add an item?</h2>';
            document.getElementById("addItem").style.visibility = "visible";
        }
    }
}

function load(query){
    if(query.length >=1){
        var xhr = new XMLHttpRequest();
        xhr.open("POST","search.php",true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send('query='+query);
        xhr.onload = function(){
            if(this.status == 200){
                var response = JSON.parse(this.responseText);
                var ret = "<div class='list' style='display: flex;flex-direction: column;align-items: center;'>";
                if(response.length>0){
                    for (let index = 0; index < response.length; index++) {
                        ret += "<div style='height: 60px; width: 600px;border: 1px solid rgb(222, 235, 248);border-radius: 5px;padding: 2px 20px 2px 20px;outline: 0;background-color:#f5ffff;display: flex;align-items: center;'>"+"<img src='"+response[index].image+"'width='65' height='58'><ul style='list-style:none'>"+"<li>"+response[index].name+"</li>"+"<li>"+response[index].price+"</li></ul></div>";
                    }
                }
                else{
                    ret +="<div>No Data Found</div>"
                }
                ret += "</div>";
                document.getElementById("search_result").innerHTML=ret;
            }
        }
    }
    else{
        document.getElementById("search_result").innerHTML="";
    }
}

document.getElementById("add").addEventListener("click",addForm);
function addForm(){
    var ht='<form id="addForm"><input type="text" placeholder="Name of Item" id="itemName" style="margin-right:5px;" required><input type="text" placeholder="Price of Item" id="itemPrice" style="margin-right:5px;" required><input type="text" placeholder="Link to Image of Item" id="itemImage" style="margin-right:5px;" required><input type="submit" value="Add Item" id="add" style="height: 40px; width: 105px; background-color: rgb(68, 140, 221);border-radius: 5px; color: black; font-size: larger;"></form> '; 
    document.getElementById("add").remove();
    document.getElementById("addForm").innerHTML = ht;
    }

document.getElementById("addForm").addEventListener("submit",addItem);
function addItem(e){
    e.preventDefault(); 
    if(currentUserId !="0"){
        var name = document.getElementById("itemName").value;
        var price = document.getElementById("itemPrice").value;
        var image = document.getElementById("itemImage").value;
        var sellerId = currentUserId;
        var xhr = new XMLHttpRequest();
        xhr.open("post" ,"addItem.php", true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send("name="+name+"&price="+price+"&image="+image+"&sellerId="+sellerId);
        xhr.onload = function(){
            if(this.status == 200){
                /* var response = this.responseText;
                console.log(response); */
                document.getElementById("addForm").remove();
                document.getElementById("addResponse").innerHTML = 'Item Added Successful';
            }
        }
    }
    else{
        console.log("Current id is 0!!!!!");
    }
}