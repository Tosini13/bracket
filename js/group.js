function stratBracket() {
    var bracketNo = document.getElementsByName('play_offs')[0].value;
    var tournament = new Tournament(bracketNo, false);
    tournament.createWinnerBracket();
    var arr = tournament.getWinnerBracket(tournament.finalMatch);
    //console.log(arr.length);
    arr = tournament.bracketFilter(arr, 0);
    console.log(arr.length);
    for (let item of arr) {
        console.log(item.name);
        for (let match of item.matches) {
            console.log(match.home.name + ' vs ' + match.away.name);
        }
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