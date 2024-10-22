let questionnumber = 1;



function setCookie(name, value, minutes) {
    const date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    const expire = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expire + ";path=/";
}

function startTimer(duration) {
    // nothing for now
}

function pushanswer(buttonname) {
   
    document.getElementById(`button-${buttonname}`).addEventListener('click', function (e) {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('username', get_cookies("username"));
        formdata.append('questionnumber', questionnumber);
        formdata.append('answer', `${buttonname}`);
        fetch('pushquestion.php', {
            method: 'POST',
            body: formdata
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    questionnumber++;
                    loadimage(questionnumber);
                } else {
                    alert('Cevap kaydedilirken bir hata oluştu.');
                }
            })
            .catch(error => {
                console.error('Hata:', error);
            });
    })
}

function loadimage(question_number) {
    const url_params = new URLSearchParams(window.location.search);
    const exam_name = url_params.get("exam-name");
    const start_time = url_params.get("start_time");
    const finish_time = url_params.get("finish_time");
    fetch(`get_questions.php?name=${exam_name}&number=${question_number}`)
        .then(response => response.json())
        .then(data => {
            const imageTag = document.getElementById("questionimage");
            imageTag.src = data.image_path;
        })
        .catch(error => console.error(`HATA : `, error));
}

function get_cookies(cookie_name) {
    let cookies = document.cookie;
    let cookie_array = cookies.split("; ");

    for (let i = 0; i < cookie_array.length; i++) {
        let cookie = cookie_array[i];
        let [name, value] = cookie.split("=");

        if (name === cookie_name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

function get_time_info() {
    const url_params = new URLSearchParams(window.location.search);
    const exam_name = url_params.get("exam-name");

    fetch(`get_time_info.php?name=${exam_name}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network has a problem!");
            }
            return response.json();
        })
        .then(data => {
            const start_time = new Date(data.start_time);
            const finish_time = new Date(data.finish_time);
            const current_time = new Date();
            let remaining_time =0;
            if(current_time >= start_time){
                remaining_time = finish_time-current_time;
                console.log("XD");
            }
            

         
            if (current_time < start_time) {
                document.getElementById('timer-header').innerText = "Sınav henüz başlamadı!";
                document.getElementById('questionimage').style.display = "none"; 
                document.getElementById('button-side').style.display="none";
                document.getElementById('navigation-buttons').style.display="none";
                return;
            } 
            if (remaining_time <= 0) {
                document.getElementById('timer-header').innerText = "Süre doldu!";
                document.getElementById('button-side').style.display="none";
                document.getElementById('navigation-buttons').style.display="none";
                document.getElementById("questionimage").style.display="none";
                
                return;
            }

            const minutes = Math.floor(remaining_time / (1000 * 60));
            const seconds = Math.floor((remaining_time % (1000 * 60)) / 1000);

            console.log(minutes);
            console.log(seconds);

            document.getElementById("minutes").innerHTML = minutes;
            document.getElementById("seconds").innerHTML = seconds;

            // Burada fonksiyonu referans olarak veriyoruz, çağırmıyoruz
            setTimeout(get_time_info, 1000); // Burada get_time_info fonksiyonunu her 1 saniyede bir çağırıyoruz
        })
        .catch((error) => {
            console.error("error:", error);
        });
}


function goToNextQuestion() {
    questionnumber++; 
    loadimage(questionnumber); 
}

function goToPreviousQuestion() {
    if (questionnumber > 1) {
        questionnumber--; 
        loadimage(questionnumber); 
    }
}

// Sayfa yüklendiğinde çalıştırılacak fonksiyonlar
window.onload = function () {
    document.cookie = `current_question=${0}`;
    get_cookies("username");
    loadimage(questionnumber);
    pushanswer("a");
    pushanswer("b");
    pushanswer("c");
    pushanswer("d");
    pushanswer("e");
    get_time_info(); 
    document.getElementById("next-btn").addEventListener("click", goToNextQuestion);
    document.getElementById("prev-btn").addEventListener("click", goToPreviousQuestion);
   
};