function createbox(exam_name,exam_shell){
    let container = document.getElementById("main-side");
    let newelement =document.createElement('div');
    newelement.className = "master-class";
    newelement.innerHTML = `
    <div id="photo-box">
     <img src=${exam_shell} alt = "book shell">
    </div>
    <div id="exam-name"> ${exam_name} </div>
    `;
    container.appendChild(newelement);
}
//////////////////////////////////////////////
function get_exam(start_Time,finish_Time){
    const elements = document.querySelectorAll(`.master-class`);
    elements.forEach(element => [
      element.addEventListener('click',function(){
        let exam_name = element.textContent.trim();
        window.location.href = `exam.html?exam-name=${exam_name}`;
      })
    ]);
}
///////////////////////////////////////////////////////////////////

function get_exam_info(){
    document.addEventListener('DOMContentLoaded', function() {
     fetch('get_exam_infos.php')
     .then(response=>{if(!response.ok){throw new Error("Network has a problem!");}
     return response.json();
    })
    .then(data=>{
        data.forEach(examnames => {
            createbox(examnames.examName,examnames.exam_shell);
        });
        get_exam();
    })
    .catch((error) => {console.error("error:",error);});
    });
}

////////////////////////////////////////////////////////////////////



get_exam_info();
