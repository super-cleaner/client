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
        var t1 = sessionStorage.getItem("trash1");
        $.ajax({
            url: 'https://api.super-cleaner.kro.kr/record/check',
            type: 'POST',
            data: {
              "game_id": gid,
              "trash_id": t1
            },
            dataType: 'json',
            success: function (data, textStatus, xhr) {
              console.log(data);
              sessionStorage.setItem("trash_name", data.trash.trash_name);
              sessionStorage.setItem("image_url", data.trash.image_url);
  
              document.getElementById("item").src = sessionStorage.getItem("image_url");
  
              // 정말 잘했어 !<br>콜라 캔은 캔에 버리면 돼
              // 콜라 캔은 캔에 버려야 해 !<br>이제 알겠지?
              document.getElementById("correct_answer_text").innerHTML = "정말 잘했어 !<br>" + sessionStorage.getItem("trash_name") + "은/는 " + sessionStorage.getItem("trash_category_name") + "에 버리면 돼";
              document.getElementById("wrong_answer_text").innerHTML = sessionStorage.getItem("trash_name") + "은 " + sessionStorage.getItem("trash_category_name") +"에 버려야 해 !<br>이제 알겠지?";
          },
            error: function (xhr, textStatus, errorThrown) {
              console.log('Error in Operation');
            }
          });
  



        if (currentDroppable.id == "canbottle_img") {
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