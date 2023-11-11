const answer_shade = document.querySelector("#answer_shade");
const correct_answer_box = document.querySelector("#correct_answer_box");
const wrong_answer_box = document.querySelector("#wrong_answer_box");
let currentDroppable = null;

item.onmousedown = function (event) {

    let shiftX = event.clientX - item.getBoundingClientRect().left;
    let shiftY = event.clientY - item.getBoundingClientRect().top;

    item.style.position = 'absolute';
    item.style.zIndex = 1000;
    document.querySelector("#container").append(item);

    moveAt(event.clientX, event.clientY);

    console.log(event.clientX);

    function moveAt(clientX, clientY) {
        item.style.left = (clientX - shiftX - 155) + 'px';
        item.style.top = (clientY - shiftY - 15) + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.clientX, event.clientY);

        item.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        item.hidden = false;

        if (!elemBelow) return;

        let droppableBelow = elemBelow.closest('.recycle_image');
        if (currentDroppable != droppableBelow) {
            if (currentDroppable) { // null when we were not over a droppable before this event
                leaveDroppable(currentDroppable);
            }
            currentDroppable = droppableBelow;
            if (currentDroppable) { // null if we're not coming over a droppable now
                // (maybe just left the droppable)
                enterDroppable(currentDroppable);
            }
        }
    }

    document.addEventListener('mousemove', onMouseMove);

    item.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);

        var gid = sessionStorage.getItem("game_id");
        var t1;


        var pagenum;
        var urlParams = new URLSearchParams(window.location.search);
        pagenum = urlParams.get("pagenum");

        if (pagenum == 1) {
            t1 = sessionStorage.getItem("trash1");
        } else if (pagenum == 2) {
            t1 = sessionStorage.getItem("trash2");
        } else if (pagenum == 3) {
            t1 = sessionStorage.getItem("trash3");
        } else if (pagenum == 4) {
            t1 = sessionStorage.getItem("trash4");
        } else if (pagenum == 5) {
            t1 = sessionStorage.getItem("trash5");
        } else if (pagenum == 6) {
            t1 = sessionStorage.getItem("trash6");
        } else if (pagenum == 7) {
            t1 = sessionStorage.getItem("trash7");
        } else if (pagenum == 8) {
            t1 = sessionStorage.getItem("trash8");
        } else if (pagenum == 9) {
            t1 = sessionStorage.getItem("trash9");
        } else if (pagenum == 10) {
            t1 = sessionStorage.getItem("trash10");
            var url10 = 'https://api.super-cleaner.kro.kr/record/result/' + gid;
            $.ajax({
                url: url10,
                type: 'GET',
                dataType: 'json',
                success: function (data, textStatus, xhr) {
                    console.log(data);
                    sessionStorage.setItem("score", data.score);
                    sessionStorage.setItem("description", data.description);
                    sessionStorage.setItem("result_list", data.result_list);
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log('Error in Operation');
                }
            });
        }
        let player_trash_category_id;



        if (currentDroppable.id == "paper_img") {
            player_trash_category_id = 1;
        } else if (currentDroppable.id == "canbottle_img") {
            player_trash_category_id = 2;
        } else if (currentDroppable.id == "plastic_img") {
            player_trash_category_id = 3;
        } else if (currentDroppable.id == "general_img") {
            player_trash_category_id = 4;
        } else if (currentDroppable.id == "food_img") {
            player_trash_category_id = 5;
        } else if (currentDroppable.id == "bag_img") {
            player_trash_category_id = 6;
        }

        var gid1 = Number(gid);
        var t2 = Number(t1);

        console.log(gid1);
        console.log(t2);
        console.log(player_trash_category_id);
        console.log(typeof(player_trash_category_id));

        $.ajax({
            url: 'https://api.super-cleaner.kro.kr/record/check',
            type: 'POST',
            data: JSON.stringify({
                "game_id": gid1,
                "trash_id": t2,
                "player_trash_category_id": player_trash_category_id
            }),
            contentType: 'application/json',
            success: function (data, textStatus, xhr) {
                console.log(data);
                sessionStorage.setItem("trash_category_name", data.trash.trash_category_name);
                sessionStorage.setItem("is_answer", data.trash.is_answer);

                // 정말 잘했어 !<br>콜라 캔은 캔에 버리면 돼
                // 콜라 캔은 캔에 버려야 해 !<br>이제 알겠지?
                document.getElementById("correct_answer_text").innerHTML = "정말 잘했어 !<br>" + sessionStorage.getItem("trash_name") + "은/는 " + sessionStorage.getItem("trash_category_name") + "에 버리면 돼";
                document.getElementById("wrong_answer_text").innerHTML = sessionStorage.getItem("trash_name") + "은 " + sessionStorage.getItem("trash_category_name") + "에 버려야 해 !<br>이제 알겠지?";
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
            }
        });




        if (sessionStorage.getItem("is_answer") == true) {
            answer_shade.style.height = "100%";
            answer_shade.style.display = "flex";
            correct_answer_box.style.height = "451.66px";
            correct_answer_box.style.display = "flex";
        } else {
            answer_shade.style.height = "100%";
            answer_shade.style.display = "flex";
            wrong_answer_box.style.height = "451.66px";
            wrong_answer_box.style.display = "flex";
        }
        item.onmouseup = null;
    };

};

function enterDroppable(elem) {
    elem.style.background = '';
}

function leaveDroppable(elem) {
    elem.style.background = '';
}

item.ondragstart = function () {
    return false;
};