//exports.john = "John";
var basiccard = require("./BasicCard.js");
var clozecard = require("./clozecard.js");
 var inquirer = require("inquirer");
 var fs = require("fs");
// var answer = process.argv[3];


function start(){
 inquirer.prompt([
 	{
 		type:"list",
 		name:"Card",
 		message:"Choose Card",
		choices: [" Make BasicCard", " Make CLozeCard", "Study flashcards"]
 	}
 	]).then(function(answer){
 	console.log(answer);
 	if (answer.Card === " Make CLozeCard") {
 		
 		clozequestion();
 		
 	} else if (answer.Card === "Make BasicCard"){
	basicquestion();
	}
	else if (answer.Card === "Study flashcard") {
		retrieveData(study);
	}

 });
 }
 

basiccard.BasicCard.prototype.printInfo = function(){
    console.log("Front:" + this.front + "\nBack: " + this.back);
}



 
 function basicquestion(){

 		inquirer.prompt([
	{
		name: "front",
		message: "What would you like to add to the front of this flashcard?",
	},
	{
		name:"back",
		message: "What would you like to add to the back of this flashcard?"
	}
	]).then(function(answers){



	var flashCardSetUp = new basiccard.BasicCard(
		answers.front,
		answers.back
		);
  

  fs.appendFile("user.txt", JSON.stringify(flashCardSetUp) +"\n", function(err){
  	if (err) throw err;
  	console.log("new flashcard was added");
  	flashCardSetUp.printInfo();
  	
  });
});

}
function clozequestion(){
inquirer.prompt([
	{
		name: "front",
		message: "What is  Clozecard?",
	},
	{
		name:"back",
		message: "word?"
	}
	]).then(function(answers){



	var flashCardSetUp = new clozecard.CLozeCard(
		answers.front,
		answers.back
		);
  

  fs.appendFile("user.txt", JSON.stringify(flashCardSetUp) +"\n", function(err){
  	if (err) throw err;
  	console.log("new flashcard was added");
  	//flashCardSetUp.printInfo();
  	//start();
  });


console.log("FRONT" + flashCardSetUp.front);
console.log("BACK" + flashCardSetUp.back);
console.log("PATRIAL" + flashCardSetUp.partial);

});
}

function printAllFlashCards(flashData){
	console.log(flashData);
}
function retrieveData(callbackFunc)
{
		fs.readFile("user.txt", "UTF-8", function(error, data){
		if (error)
		{
			console.log(error);
		}
		else
		{
			var flashData = data.split("\n");
			var filteredData = [];
			//console.log(flashData);
			for(var i = 0; i < flashData.length; i++)
			{
				if(flashData[i].length > 0)
				{
					var obj = JSON.parse(flashData[i]);
					if (obj.cardType === "basic")
					{
						var currentCard = new basiccard.BasicCard(obj.front, obj.back);
						filteredData[i] = currentCard;
					}
					else
					{
						var currentCard = new clozecard.ClozeCard(obj.front, obj.back);
						filteredData[i] = currentCard;
					}
				}	
			}
		}
			// callbackFunc(filteredData);
			callbackFunc(filteredData, 0);
		})
	}




function study(flashData, i){
	inquirer.prompt([
		{
			name: "study",
			message: flashData[i].front
		},
		]).then(function(answers){
			flashData[i].printBack();
			i++;
			if (i<flashData.length){
				study(flashData, i);
			}
			else {
				
				start();

			}
		});
	}

start();

