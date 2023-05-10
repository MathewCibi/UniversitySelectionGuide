var university_id;

function setUniversityId(id) {
    university_id = id;
}

function loadJson() {
    const rating_description = document.getElementById("review_counter_text");
    const accommodation_stars = document.querySelectorAll(".stars.accommodation span")
    console.log(accommodation_stars)
    fetch('../data/data.json')
        .then((response) => response.json())
        .then((json) => {
            var count = Object.keys(json).length;
            for (const key in json) {
                console.log(`${key} : ${json[key]["accommodation"]}`)
                
            }
            rating_description.innerHTML = "Collected from "+ count +" student reviews.";
            console.log(count)
        });
}

function openDB() {
    var db = openDatabase("universityDB", '1.0', 'University Database', 2 * 1024 * 1024);

    db.transaction(function(transaction){
        var sql = 'CREATE TABLE auckland '
            + "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"+
            "item VARCHAR(100) NOT NULL,"+
            "rating STRING NOT NULL)";
        transaction.executeSql(sql, undefined,
            function() {
                alert("Data is created successfully")
            }),function() {
                alert("Table is already being created")
            }
    })
}

