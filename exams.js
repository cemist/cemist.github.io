let start_time;
let finish_time;

function createbox(exam_name, exam_shell) {
    const current_time = new Date();

    let container = document.getElementById("main-side");
    let newelement = document.createElement('div');
    newelement.className = "master-class";
    newelement.innerHTML = `
        <div id="photo-box">
            <img src="${exam_shell}" alt="book shell">
        </div>
        <div id="exam-name">${exam_name}</div>
        <h1>Başlama Zamanı: ${start_time}</h1>
        <h1>Bitiş Zamanı: ${finish_time}</h1>
        <button class="exam-button">Sınava Git</button>
    `;

    
    const exam_start_time = new Date(start_time);
    const exam_finish_time = new Date(finish_time);
    const button = newelement.querySelector(".exam-button");
    
    if (current_time >= exam_start_time && current_time <= exam_finish_time) {
        button.classList.add("active"); 
        button.addEventListener('click', function () {
            window.location.href = `exam.html?exam-name=${exam_name}`;
        });
    } else {
        button.classList.add("inactive"); 
        button.disabled = true; 
        button.title = "Sınav zamanı değil"; 
    }

    container.appendChild(newelement);
}

async function get_exam_info() {
    
    try {
        const response = await fetch('get_exam_infos.php');
        if (!response.ok) {
            throw new Error("Network has a problem!");
        }

        const data = await response.json();
       
        for (const examnames of data) {
            await get_time_info(examnames.examName);
            createbox(examnames.examName, examnames.exam_shell); 
        }
    } catch (error) {
        console.error("error:", error);
    }
}

async function get_time_info(exam_name) {
    try {
        const response = await fetch(`get_time_info.php?name=${exam_name}`);
        if (!response.ok) {
            throw new Error("Network has a problem!");
        }

        const data = await response.json();

      
        start_time = data.start_time;
        finish_time = data.finish_time;

         
        console.log(start_time);
        console.log(finish_time);
        

    } catch (error) {
        console.error("error:", error);
    }
}


window.onload = function () {
    get_exam_info();
};