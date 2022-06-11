Notenliste=["C1","D1","E1","F1","G1","A1","H1","Cis","Dis","Fis","Gis","Ais","D1b","E1b","G1b","A1b","H1b"];
Länge=Notenliste.length -1;

function noteNameFromFileName(bildDateiName) {
    let lastSlashPosition =bildDateiName.lastIndexOf("/") //Wir brauchen den letzten Slash, weil danach der Notenname kommt. 
    notenName=bildDateiName.substr (lastSlashPosition + 1,3).replace (".", ""); // Aus der Bilddatei wird der Notenname rausgeschnitten. Und zwar ab der ersten Position nach dem Slash (deswegen +1). 
                                                                            // Der Notenname kann max. 3 Zeichen lang sein. Sollte der Name jedoch nur 2 Zeichen lang sein, würde danach ein Punkt(von ".png") kommen, da
                                                                            // der Punkt in dem Fall das dritte Zeichen nach dem Slash wäre und er deshalb durch nichts ersetzt wird.
    return notenName
}
 
function Random_buttons(params) {// In dieser Funktion werden die unteren Notennamen generiert
    for (let index = 0; index < Knöpfe.length/*28*/; index++) { // Diese Schleife läuft über die Knöpfe unten
        const Knopf = Knöpfe[index]; // Knopf, bei dem die Schleife gerade ist
        Knopf.innerHTML=Notenliste[Math.round(Math.random()*Länge)]; // Wir nehmen eine zufällige Note aus der Notenliste und packen sie in den Knopf       
    } 
    // Hier gibt es das Problem, dass nicht immer zu den Notenbildern auch unten die passenden Knöpfe gegeben sind
    // Lösung: Alle Noten, die oben sind, werden unten als Knöpfe in zufälligen Knöpfen untergebracht
    desk=document.getElementById("desk"); // 
    Noten=desk.getElementsByClassName("note");
    for (let notenNummer = 0; notenNummer < Noten.length /*5*/; notenNummer++){ //Die Schleife läuft über alle Noten
        
        imgId= "card" + notenNummer + "img"; // Die imgId der Note wird aus card + Notennummer + img zusammengesetzt
        Img = document.getElementById (imgId) // Img wird genommen
        bildDateiName= Img.src; // Die Bilddatei wird genommen
        notenName=noteNameFromFileName(bildDateiName)
        const Knopf = Knöpfe[Math.trunc(notenNummer*Knöpfe.length/Notenliste.length)+Math.trunc(Math.random()*Knöpfe.length/Notenliste.length)] // Wir nehmen einen zufälligen Knopf
        Knopf.innerHTML=notenName;  // Wir nehmen den Notennamen und setzten ihn in den Knopf      
    }

}


function handclick1(){
   Randomnotennummer=Math.round(Math.random()*Länge); 
   Randomnote=Notenliste[Randomnotennummer];
    console.log("Text "+Randomnote+" ausgewählt"+" mit der Nummer"+ Randomnotennummer);
    img=document.getElementById("card0img");
    img.src="cards/"+Randomnote+".png"
    Random_buttons()
}

function handclick2(){
    Randomnotennummer=Math.round(Math.random()*Länge);
    Randomnote=Notenliste[Randomnotennummer];
    console.log("Text"+Randomnote+"ausgewählt"+"mit der Nummer"+ Randomnotennummer);
    img=document.getElementById("card1img");
    img.src="cards/"+Randomnote+".png"
    Random_buttons()
}


function handclick3(){
    Randomnotennummer=Math.round(Math.random()*Länge);
    Randomnote=Notenliste[Randomnotennummer];
    console.log("Text"+Randomnote+"ausgewählt"+"mit der Nummer"+ Randomnotennummer);
    img=document.getElementById("card2img");
    img.src="cards/"+Randomnote+".png"
    Random_buttons()
}


function handclick4(){
    Randomnotennummer=Math.round(Math.random()*Länge);
    Randomnote=Notenliste[Randomnotennummer];
    console.log("Text"+Randomnote+"ausgewählt"+"mit der Nummer"+Randomnotennummer);
    img=document.getElementById("card3img");
    img.src="cards/"+Randomnote+".png"
    Random_buttons()

}


function handclick5(){
    Randomnotennummer=Math.round(Math.random()*Länge);
    Randomnote=Notenliste[Randomnotennummer];
    console.log("Text"+Randomnote+"ausgewählt"+"mit der Nummer"+Randomnotennummer);
    img=document.getElementById("card4img");
    img.src="cards/"+Randomnote+".png" 
    Random_buttons()

}

var notekey="violin"
function handclick6(){
    img=document.getElementById("notekey");
    if (notekey=="violin"){
        img.src="images/Bass.png";
        notekey="bass"

    }
    else {
        img.src="images/Violin.png"
        notekey="violin"

    }
    
}

onload=function(){
    noteletter=document.getElementById("noteletter");
    Knöpfe=noteletter.getElementsByClassName("text");
    Random_buttons()

}
var markedNote=0;// Die erste Note ist null und wird markiert
var score=0;//Der Anfangspunktestand beträgt null

function notePressed(p) {
    markedImg = document.getElementById ("card" + markedNote + "img");// Es wird img von der markierten Note ausgewählt
    imgId= "card" + markedNote + "img";
    markedImg = document.getElementById (imgId)
    src= markedImg.src;
    markedNoteName=noteNameFromFileName(src); 
    markedNote = markedNote + 1;// Die Markierung geht auf die nächste Note
    if (markedNote == 5)// Sobald es keine Note mehr gibt, die markiert werden kann, dann wird wieder die Note null markiert und alles wiederholt sich
       markedNote = 0// Die Markierung überträgt sich auf die erste Note
    markedDiv = document.getElementById ("card" + markedNote)// Es wird div von der markierten Note ausgewählt
    markedDiv.classList.add("marked")// Die Höhe wird verändert / Die Note wird markiert  
    for (let index=0; index < 5; index++){// Das ist eine Schleife, die bei der ersten Note beginnt und bis zur 5. Note verläuft
        if (index != markedNote){// Index ist nicht gleich zur markierten Note
            markedDiv = document.getElementById("card" + index)// Es wird die Karte ausgewählt
            markedDiv.classList.remove("marked")// Alle Noten, die nicht ausgewählt sind, nehmen normale Größe an
        }
    }

pressedNoteName=p.target.innerText
if (markedNoteName==pressedNoteName){// Es wird überprüft, ob die richtige Note gedrückt wurde.
    score ++ //Wenn die richtige Note gedrückt wurde, bekommt man einen Punkt.
}
else{
    score --// Wenn jedoch die falsche Note gedrückt wurde, wird ein Punkt abgezogen.
}
   
points = document.getElementById("points")
points.value = score

if (score >= 25){// Sobald die Maximalpunktzahl, 50, erreicht wird,...
    points.value="YOU WON!"//...Erscheint "YOU WON!"
}
}

