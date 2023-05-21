const submitForm = document.getElementById("review_form");
var confetti_time = 0;

document.addEventListener("DOMContentLoaded", (e) => {
    let paramString = window.location.toString().split('?')[1];
    let queryString = new URLSearchParams(paramString);
    if (paramString=="confetti=1") {
        confetti_time=300;
    }
    function reduceTimer() {
        if (confetti_time > 0) {confetti_time--; startConfetti();}
        else {
            stopConfetti();
        }
    }
    setInterval(reduceTimer, 10);
})

var destination = window.location.toString().split('pages/')[0] + "index.html";
function closeForm(dest) {
    destination =  window.location.toString().split('pages/')[0]+"pages/" +dest;
}

submitForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(submitForm);

    var table = formData.get("university");
    var orginal_table = table;
    if (table==null) {
        table=university_id;
    }

    var name = formData.get("name");
    var opinion = formData.get("opinion");
    var accommodation = formData.get("accommodation");
    var teaching = formData.get("teaching");
    var community = formData.get("community");
    
    fetch(`https://universityselectionguide.onrender.com/post?table_id=${table}&name=${name}&opinion=${opinion}&accommodation=${accommodation}&teaching=${teaching}&community=${community}`)
    .then((response) => response.json())
    .then((json) => {
        if (json['success'] == false) {
            alert(json['message']);
            console.log(json['error']);
        } else {
            console.log('Successfully sent data to server!');
            
            alert(json['message']);
            var location = "/index.html?confetti=1";
            if (orginal_table==null) {
                if (table=="0") {location = "/pages/auckland_university_rating.html?confetti=1"}
                else if (table=="1") {location = "/pages/otago_university_rating.html?confetti=1"}
                window.location.href = location;
                return;
            }
            window.location.href = location;
        }
    })
});