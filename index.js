
function login(){
    const username= document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const data = {
        username: username,
        password: password
    };

    fetch("login.php",{method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data), 
        
    })
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        if(data.status === 'succes'){
            alert("login succesfull");
            document.getElementById("infotext").textContent = "Giriş Bilgileri Doğru";
            window.location.href = "iletisim.html"
           
        }
        else{
            alert("giriş bilgileri yanlis");
            document.getElementById("infotext").textContent = "Giriş Bilgilerini Kontrol Et";
        } 
    }).catch((error) => {console.error("error:",error);});
}

document.getElementById("btn").onclick = function() {
    login();
}