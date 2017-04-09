
exports.CLozeCard=function (front, back) {
  this.cardType = "cloze";
  this.front = front;
  this.back  = back;
  	if (front.search(back) === -1)
  		{
  			throw new Error("error occured with text is not in front");
  	    }	
	else {
		    this.partial = front.replace(back , ".......");
		 }
  }
