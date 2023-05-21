const questions = document.querySelectorAll('.question_answer');

questions.forEach(function(question) {
    const btn = question.querySelector('.question_btn');
    btn.addEventListener("click", function() {
        questions.forEach(function(item) {
            if (item !== question) {
                item.classList.remove("show_text");
            }
        })
        question.classList.toggle("show_text");
    })
})