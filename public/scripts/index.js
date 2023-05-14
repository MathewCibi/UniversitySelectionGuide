let frame_no = 0;

function swiperChange(swiper) {
  const index_currentSlide = swiper.realIndex;
  changeLogo(index_currentSlide)
  frame_no = index_currentSlide;
}

function animateUniversityTitle() {
  const university_title = document.getElementById("strech_div")
  university_title.style.width = frame_no*10;
}

function select_university_button() {
  if (frame_no == 0) {
    console.log("University of Auckland");
  } else if (frame_no == 1) { 
    console.log("University of Otago")
  }
}

function changeLogo(slide_no) {
  if (slide_no == 0) {
    document.getElementById("university_logo_img").src = "../assets/university_auckland_logo.png";
  } else if (slide_no == 1) {
    document.getElementById("university_logo_img").src = "../assets/otago_university_logo.png";
  }
}
