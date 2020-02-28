function stratBracket() {
    var tournament = new Tournament(8, false);
    tournament.createWinnerBracket();
    var arr = tournament.showWinnerBracket(tournament.finalMatch, 8);
    //console.log(arr.length);
    arr = tournament.bracketFilter(arr, 2);
    console.log(arr.length);
    for (let item of arr) {
        console.log(item.name);
    }
}

// function changeClass() {
//     this.classList.add('icon-record');
//     this.classList.remove('icon-play');
// }

// function changeIcon() {
//     console.log('ChangeIcon');
//     // icon-play
//     var b = false;
//     var arr = document.getElementsByClassName('icon-play');
//     console.log('arr: ' + arr);
//     for (var i = 0; i < arr.length; i++) {
//         arr[i].onclick = () => {
//             // arr[i].classList.add('icon-record');
//             // arr[i].classList.remove('icon-play');
//             console.log('clicked');
//         };
//     }
// }