var university_id;

function setUniversityId(id) {
    university_id = id;
}

document.addEventListener('DOMContentLoaded', (e) => getInfo());

function getInfo(e) {
    var table = "auckland";
    if (university_id == 1) {
        table = "otago";
    }

    fetch('https://universityselectionguide.onrender.com/getAll?universityID='+table)
    .then((response) => response.json())
    .then((json) => {
        if (json['success'] == true) {
            console.log('Recieved review data from Server!');

            console.log(json['entries']);
            loadJson(json);
        } else {
            getInfo();
        }
    })

    fetch('https://universityselectionguide.onrender.com/getRandom?table_id='+university_id)
    .then((response) => response.json())
    .then((json) => {
        if (json['success']==true) {
            console.log('Recieved opinion Data from the Server!');
            json['message'].forEach((entry) => {
                var name = entry['name'];
                var opinion = entry['opinion'];

                swiper.appendSlide('<div class="swiper-slide"><div class="swiper-slide" data-swiper-autoplay="2000"><div id="opinion_container"><p>'+opinion+'</p><h2>'+name+'</h2></div></div></div>');
            });
            console.log(json);
        }
    })

    
}

function loadJson(json) {
    const rating_description = document.getElementById("review_counter_text");
    const accommodation_stars = document.querySelectorAll(".stars.accommodation span");
    const teaching_stars = document.querySelectorAll(".stars.teaching span");
    const community_stars = document.querySelectorAll(".stars.community span");
    console.log(accommodation_stars)

    var count = json['entries'].length;

    var accommodation = 0;
    var teaching = 0;
    var community = 0;
    for (const element of json['entries']) {
        accommodation += element['accommodation'];
        teaching += element['teaching'];
        community += element['community'];
    }
    accommodation = accommodation/count;
    teaching = teaching/count;
    community = community/count;

    accommodation_stars.forEach((star, index) => {
        accommodation > index ? star.classList.add('active') : star.classList.remove('active');
    });

    teaching_stars.forEach((star, index) => {
        teaching > index ? star.classList.add('active') : star.classList.remove('active');
    });

    community_stars.forEach((star, index) => {
        community > index ? star.classList.add('active') : star.classList.remove('active');
    });

    rating_description.innerHTML = "Collected from "+ count +" student reviews.";
}