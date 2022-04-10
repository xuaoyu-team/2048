var cells= [[2,0,0,0],
	[0,32,0,0],
	[0,4,0,0],
	[0,0,2048,0]];

var PLAYING = 0;

var CELL_MOVEING=1;

var GAME_OVER=2; 

var score = 0;


var state = PLAYING;


var effect = true;


function upAction(){
	if(state==CELL_MOVEING){
		return false;
	}
	if(! canMoveUp()){
		return false;
	}

	for(var col = 0; col<4; col++){

		upCol(col);
	}
	return true;
}

function upCol(col){

	for(var row=0; row<4;){
		var current = cells[row][col];
		var nextRow = getNextInCol(col, row+1, 1);

		if(nextRow==-1){
			return;
		}
		var next = cells[nextRow][col];

		if(current == 0){

			cells[row][col] = next;
			cells[nextRow][col]=0;
			if(effect){

				var obj = $("cell"+nextRow+col);
				var top =  row*120+20;
				var left = col*120+20;
				animation.add(obj, top, left);
			}
		}else if(current == next){

			cells[row][col] = next+current;
			cells[nextRow][col]=0;

			score += cells[row][col];

			row++;
			if(effect){

				var obj = $("cell"+nextRow+col);
				var top =  row*120+20;
				var left = col*120+20;
				animation.add(obj, top, left);
			}
		}else{

			row++;
		}
	}
}

function getNextInCol(col, startRow, step){
	var row = startRow;
	while(true){
		if(row<0 || row>=4){
			return -1;
		}
		if(cells[row][col]!=0){
			return row;
		}
		row+=step;
	}
}

function getNextInRow(row, startCol, step){
	var col = startCol;
	while(true){
		if(col<0 || col>=4){
			return -1;
		}
		if(cells[row][col]!=0){
			return col;
		}
		col+=step;
	}
}

function downAction(){
	if(state==CELL_MOVEING){
		return false;
	}
	if(! canMoveDown()){
		return false;
	}

	for(var col = 0; col<4; col++){

		downCol(col);
	}
	return true;
}

function downCol(col){

	for(var row=3; row>=0;){
		var current = cells[row][col];
		var nextRow = getNextInCol(col, row-1, -1);

		if(nextRow==-1){
			return;
		}
		var next = cells[nextRow][col];

		if(current == 0){

			cells[row][col] = next;
			cells[nextRow][col]=0;
			if(effect){

				var obj = $("cell"+nextRow+col);
				var top =  row*120+20;
				var left = col*120+20;
				animation.add(obj, top, left);
			}
		}else if(current == next){

			cells[row][col] = next+current;
			cells[nextRow][col]=0;

			score += cells[row][col];

			row--;

			if(effect){

				var obj = $("cell"+nextRow+col);
				var top =  row*120+20;
				var left = col*120+20;
				animation.add(obj, top, left);
			}
		}else{

			row--;
		}
	}
}

function leftAction(){
	if(state==CELL_MOVEING){
		return false;
	}
	if(! canMoveLeft()){
		return false;
	}

	for(var row = 0; row<4; row++){

		moveLeft(row);
	}
	return true;
}

function moveLeft(row){

	for(var col=0; col<4;){
		var current = cells[row][col];
		var nextCol = getNextInRow(row, col+1, 1);

		if(nextCol==-1){
			return;
		}
		var next = cells[row][nextCol];




		if(current == 0){

			cells[row][col] = next;
			cells[row][nextCol]=0;
			if(effect){

				var obj = $("cell"+row+nextCol);
				var top =  row*120+20;
				var left = col*120+20;
				animation.add(obj, top, left);
			}
		}else if(current == next){

			cells[row][col] = next+current;
			cells[row][nextCol]=0;

			score += cells[row][col];

			col++;
			if(effect){

				var obj = $("cell"+row+nextCol);
				var top =  row*120+20;
				var left = col*120+20;
				animation.add(obj, top, left);
			}
		}else{

			col++;
		}
	}
}

function rightAction(){
	if(state==CELL_MOVEING){
		return false;
	}
	if(! canMoveRight()){
		return false;
	}

	for(var row = 0; row<4; row++){

		moveRight(row);
	}
	return true;
}

function moveRight(row){

	for(var col=3; col>=0;){
		var current = cells[row][col];
		var nextCol = getNextInRow(row, col-1, -1);

		if(nextCol==-1){
			return;
		}
		var next = cells[row][nextCol];




		if(current == 0){

			cells[row][col] = next;
			cells[row][nextCol]=0;
			if(effect){

				var obj = $("cell"+row+nextCol);
				var top =  row*120+20;
				var left = col*120+20;
				animation.add(obj, top, left);
			}
		}else if(current == next){

			cells[row][col] = next+current;
			cells[row][nextCol]=0;


			score += cells[row][col];

			col--;

			if(effect){

				var obj = $("cell"+row+nextCol);
				var top =  row*120+20;
				var left = col*120+20;
				animation.add(obj, top, left);
			}
		}else{

			col--;
		}
	}
}
function canMoveUp(){
	for(var col=0; col<4; col++){
		for(var row=1; row<4; row++){

			if(cells[row][col]!=0 && cells[row-1][col]==0){
				return true;
			}

			if(cells[row][col]!=0 && (cells[row][col] == cells[row-1][col])){
				return true;
			}
		}
	}
	return false;
}

function canMoveDown(){
	for(var col=0; col<4; col++){
		for(var row=0; row<3; row++){

			if(cells[row][col]!=0 && cells[row+1][col]==0){
				return true;
			}

			if(cells[row][col]!=0 && (cells[row][col] == cells[row+1][col])){
				return true;
			}
		}
	}
	return false;
}

function canMoveLeft(){
	for(var col=1; col<4; col++){
		for(var row=0; row<4; row++){

			if(cells[row][col]!=0 && cells[row][col-1]==0){
				return true;
			}

			if(cells[row][col]!=0 && (cells[row][col] == cells[row][col-1])){
				return true;
			}
		}
	}
	return false;
}

function canMoveRight(){
	for(var col=0; col<3; col++){
		for(var row=0; row<4; row++){

			if(cells[row][col]!=0 && cells[row][col+1]==0){
				return true;
			}

			if(cells[row][col]!=0 && (cells[row][col] == cells[row][col+1])){
				return true;
			}
		}
	}
	return false;
}


function test(){
	rightAction();
	state=CELL_MOVEING;
	animation.start(function(){

		randomNumber();
		updateView();
		state = PLAYING;
	});
}


function updateView(){
	for(var row=0; row<4; row++){
		for(var col=0; col<4; col++){
			var n = cells[row][col];
			var cell = $("cell"+row+col);

			cell.className="cell";
			cell.innerHTML = "";
			if(n>0){

				cell.className="cell num"+n;

				cell.innerHTML = n;
			}
		}
	}

	$("score").innerHTML = score;
	$("finalScore").innerHTML = score;

}

function full(){
	for(var row=0; row<4; row++){
		for(var col=0; col<4; col++){
			if(cells[row][col]==0){
				return false;
			}
		}
	}
	return true;
}

function randomNumber(){
	if(full()){
		return false;
	}
	while(true){
		var col = parseInt(Math.random()*4);
		var row = parseInt(Math.random()*4);
		if(cells[row][col]==0){
			var n = Math.random() <0.5 ? 2:4;
			cells[row][col]=n;
			return true;
		}
	}
}
function startAction(){
	$("gameOver").style.display = "none";
	for(var row=0; row<4; row++){
		for(var col=0; col<4; col++){
			cells[row][col]=0;
		}
	}
	score = 0;
	randomNumber();
	randomNumber();
	updateView();
	state = PLAYING;
}

function $(id){
	return document.getElementById(id);
}

function has8192(){
	for(var row=0; row<4; row++){
		for(var col=0; col<4; col++){
			if(cells[row][col]==8192){
				return true;	
			}
		}
	}
}

function hasSpace(){
	for(var row=0; row<4; row++){
		for(var col=0; col<4; col++){
			if(cells[row][col]==0){
				return true;	
			}
		}
	}
}



function gameOver(){

	if(has8192()){
		state = GAME_OVER;
		$("gameOver").style.display = "block";
		return true;
	}


	if(hasSpace()){
		return false;
	}	


	if( canMoveUp() || canMoveDown() || canMoveLeft() || canMoveRight() ){
		return false;
	}
	state = GAME_OVER;
	$("gameOver").style.display = "block";
	return true;
}


window.onload = function(){
	$("newGame").onclick = function(){
		if(state==PLAYING)
			startAction();
	}
	$("restart").onclick = function(){
		if(state==GAME_OVER)
			startAction();
	}
	startAction();

	document.onkeydown=function(event){
		if(state != PLAYING){
			return;
		}
		var move = false;
		switch (event.keyCode) {
		case 37:
			move = leftAction();
			break;
		case 38:
			move = upAction();
			break;
		case 39:
			move = rightAction();
			break;
		case 40:
			move = downAction();
			break;
		}
		if(! move){
			return;
		}
		if(effect){
			state=CELL_MOVEING;
			animation.start(function(){

				updateView();
				state = PLAYING;
				if(! gameOver()){
					setTimeout(function(){
						randomNumber();
						updateView();
					}, 100);
				}
			});
		}else{
			if(! gameOver()){
				setTimeout(function(){
					randomNumber();
					updateView();
				}, 100);
			}

			updateView();
			state = PLAYING;
		}
		gameOver();		
	};
}