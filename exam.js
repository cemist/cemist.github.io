function loadimage(){
    let question_name="question";
    let question_number=1;
    fetch(`get_questions.php?name=${question_name + question_number}`)
    .then(response => response.json())
    .then(data => {
        const imageTag= document.getElementById("questionimage");
        imageTag.src= data.image_path;
        console.log("the return path is :"+data.image_path);
})
.catch(error => console.error(`HATA : `,error));
}
document.getElementById("btn-1").onclick = function(){
    loadimage();
}
 