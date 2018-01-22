
box = document.getElementsByClassName("all");

score = document.getElementsByTagName("p");

secs = 2000;

bc = new Array(12);
bci = [0,0,0,0,0,0];
b_clicked = [0,0,0,0];

colors = ["black", "red", "green", "indigo", "blue", "yellow"];

var i;
var correct = 0;
var failure_msg = "Sorry, you failed. Try again";
var success_msg = "Think u're good, go again, see if u can make it 5 in a row, you already have 1";

function rand(num){
    return Math.floor(Math.random() * num);
}

function unflip(){
    for(i=0; i<box.length; i++){
        box[i].style.backgroundColor = "gray";
    }
}

function flip_all(){
    for(i=0; i<box.length; i++){
        do{
            x = rand(6);
        }while( bci[x] == 2 );

        bci[x] += 1;
        box[i].style.backgroundColor = colors[x];
        bc[i] = colors[x];
    }
}

function flip( id ){
    if( box[id].style.backgroundColor !== "gray" ){
        return;
    }

    box[id].style.backgroundColor = bc[id];

    if(b_clicked[0] == 0){
        b_clicked[0] = 1;
        b_clicked[2] = id;
    }
    else if((b_clicked[0] == 1) && (b_clicked[1] == 0)){
        b_clicked[1] = 1;
        b_clicked[3] = id;
    }

    if((b_clicked[0] == 1) && (b_clicked[1] == 1)){
        if( box[b_clicked[2]].style.backgroundColor ==  box[b_clicked[3]].style.backgroundColor ){
            correct += 10;
            score[0].innerHTML = "Score: " + correct;
            if( correct % 60 == 0){
                alert("Superb, you got all correctly");
                switch(correct){
                    case 60: times = 5;break;
                    case 120: times = 4;break;
                    case 180: times = 3;break;
                    case 240: times = 2;break;
                    case 300: times = 1;break;
                }
                times -= 1;

                if(times == 4){
                goAgain(success_msg);
                }
                else if(times != 0){
                if(times < 0){times = 5}
                goAgain("Remaining " + times + " times in a row");
                }else{
                    goAgain("You have proven yourself");
                }

            }
        }
        else{
            t = Math.floor(correct / 60);
            if(t < 5 && t >= 1){
            t += 1;
                alert("Tough luck, you almost made it " + t + " time(s)");
            }
            else if(t >= 5){
                alert("Wow, you did it, you really are good");
                goAgain("You could keep going", 1);
            }
            goAgain(failure_msg, 1);
        }

        for(i=0; i<4; i++){
            b_clicked[i] = 0;
        }
    }

}

window.onload = function(){
    unflip();

    alert("You have " + (secs / 1000) + " secs to glance at the color arrangement. If u pick 2 consecutive colors that are the same u score a point, else if u pick a two different colors, you have lost and the game resets");
    alert("Click OK when you're ready");

    flip_all();

    setTimeout(unflip, secs);

}

function goAgain(msg, reset){
    if(msg){
        alert(msg);
    }
    alert("Click OK when you're ready");
    bc = new Array(12);
    bci = [0,0,0,0,0,0];
    b_clicked = [0,0,0,0];
    if(reset){
        correct = 0;
    }
    unflip();
    flip_all();
    setTimeout(unflip, secs);
}
