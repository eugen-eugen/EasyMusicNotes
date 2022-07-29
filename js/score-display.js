
function showScore(displayId, score){
    const scoreStr=score+"";
    const display = document.getElementById (displayId);

    const digitWidgets=display.getElementsByClassName("digit7");
    const shift = digitWidgets.length - scoreStr.length;
    for (let position = 0; position < digitWidgets.length; position++) {

        const digitWidget=digitWidgets[position];
        const above=digitWidget.getElementsByClassName("above")[0];
        const under=digitWidget.getElementsByClassName("under")[0];

        above.className="above";
        under.className="under";
        if (position < shift){
          above.classList.add("above_nothing");
          under.classList.add("under_nothing");
        } else
        {
          above.classList.add("above_"+ scoreStr[position-shift]);
          under.classList.add("under_"+ scoreStr[position-shift]);
        }
    
  }
}