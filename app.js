let boxes = document.querySelectorAll(".box")
// console.log(boxes); querySelectorAll RETURNS A NODE-LIST AND INORDER TO ACCESS IT'S INDIVIDUAL ELEMENTS, YOU NEED TO USE A LOOP.
let newGame = document.querySelector("#newGame")
let winnerMsg = document.querySelector(".winnerMsg")
let msgContainer = document.querySelector(".msgContainer")
let reset_btn = document.querySelector(".reset")
let turnX = true;

let count = 0;
boxes.forEach((box)=>{

   box.addEventListener("click" , ()=>{
    if(turnX){ // player X's chance
    box.innerText = "X";
    turnX = false; 
    box.style.color = "red"; //will add red color to X
    }
    else{ //player O's chance
    box.innerText = "O";
    turnX =true; 
    box.style.color = "blue"; //will add blue color to O
    }
    count++;
    // console.log(count);
    box.disabled = true;
    let iswinner = checkWinner();
    if(count==9 && !iswinner){
        draw();
    }
   })
})

const winPattern = 
[   
    [0 , 1 , 2],
    [3 , 4 , 5],
    [6 , 7 , 8],
    [0 , 3 , 6],
    [1 , 4 , 7],
    [2 , 5 , 8],
    [0 , 4 , 8],
    [2 , 4 , 6] 
];
// function to disable boxes after win condition
let disableBoxes = ()=>{
    for (let box of boxes){
        box.disabled = true;
    }
}
    // function to enable boxes during new game condition
let enableBoxes = ()=>{
    for (let box of boxes){
       box.disabled = false;
       box.innerText = "";
    }
}


let restartGame = ()=>{
    turnX = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide")
}

let checkWinner = ()=>{
    for (let pattern of winPattern){
        // console.log(pattern[0],pattern[1],pattern[2]);
        // console.log
        // (boxes[pattern[0]].innerText,
        //  boxes[pattern[1]].innerText,
        //  boxes[pattern[2]].innerText );
        // here we have simply checked the value at each position of the box, from each winning pattern, we have passed the number in the boxes node list, since boxes is a node list returned using the querySelectorAll so its elements can be accessed using the index method just like array, lets save the value inside ie their innerText inside variables for further logic checking
        let pos1Val = (boxes[pattern[0]].innerText); 
        let pos2Val = (boxes[pattern[1]].innerText) ;
        let pos3Val = (boxes[pattern[2]].innerText) ;
    
        if (pos1Val!= "" && pos2Val!= "" && pos3Val!= ""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
               showWinner(pos1Val);
            }
            
        
        }
    }

}

let draw = ()=>{
    if(count==9){
        winnerMsg.innerText = `Opps:( the game is drawn`;
        msgContainer.classList.remove("hide");
        reset_btn.classList.add("hide");
    }
}

let showWinner=(value)=>{
    winnerMsg.innerText = `Congratulations, winner is ${value}`;
    msgContainer.classList.remove("hide");
    reset_btn.classList.add("hide");
    // special feature where when game is won by someone, the reset button should dissapear and new game button will appear, as both do the same function, any one of them should be visible
    disableBoxes();
    
}

newGame.addEventListener("click" , restartGame)
reset_btn.addEventListener("click" , restartGame)