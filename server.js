/***
	
	Project : Multiplayer chat and Q&A Server
	Author : Minic Lin
	Date : 2015.05.04
	Title : 103 second term
			the mid-term school assignment of Network programming 

***/

//server setup
var app = require('http').createServer(handler) 
 , io = require('socket.io').listen(app)
 , fs = require('fs');
app.listen(8165);


//url header
function handler (req, res) { 
 fs.readFile(__dirname + '/chat.html', function (err, data) {
     if (err) { 
                res.writeHead(500);
         return res.end('Error loading chat.html'); 
            }
     res.writeHead(200);
     res.end(data); 
        });
}

//get random in minNum ~ maxNum
function getRandom(minNum, maxNum) {
	return Math.floor( Math.random() * (maxNum - minNum + 1) ) + minNum;
}

//random 
function getRandomArray(minNum, maxNum, n) {	
	var tmpArray = [n];		//儲存產生的陣列
 
	for(var i=0; i<n; i++) {
		//temp of random
		var tmp = 0;		
 
		do {
			//the random is exist
			var exist = false;			
			
			//get random
			tmp = getRandom(minNum, maxNum);	
 
			//check random is exist in array
			if(tmpArray.indexOf(tmp) != -1) exist = true;
 
		} while (exist);	//if no exist than break
 
		tmpArray[i] = tmp;
	}
	return tmpArray;
}


//question
var QandA=[{ q:"誰是萬獸之王？", a:"動物園園長" },
		   { q:"什麽樣的人死後還會出現？", a:"電影中的人" },
		   { q:"什麽帽不能戴？", a:"螺帽" },
		   { q:"什麽水永遠用不完？", a:"淚水" },
		   { q:"什麽東西有五個頭，但人不覺得它怪呢？", a:"手，腳" },
		   { q:"把一隻雞和一隻鵝同時放在冰山上，爲什麽雞死了鵝沒死？", a:"鵝是企鵝" },
		   { q:"那兩個英文字母讓人們喜歡聽，而且聽的人最多？", a:"ＣＤ" },
		   { q:"什麽地方的路最窄？", a:"冤家路窄" },
		   { q:"世界上最小的島是什麽？", a:"馬路上的安全島" },
		   { q:"太平洋的中間是什麽？", a:"是平字" },
		   { q:"什麽字全世界通用？", a:"阿拉伯數字" },
		   { q:"世界拳擊冠軍卻很容易被什麽擊倒？", a:"瞌睡" },
		   { q:"把8分成兩半，是多少？", a:"0" },
		   { q:"什麽時候太陽會從西邊出來？", a:"發誓的時候" },
		   { q:"早晨醒來，每個人都要做的第一件事是什麽？", a:"睜開眼睛" },
		   { q:"一隻餓貓從一隻胖老鼠身旁走過，爲什麽那隻饑餓的老貓竟無動於衷繼續走它的路，連看都沒看這隻老鼠？", a:"瞎貓遇到死耗子" },
		   { q:"小明的媽媽有三個兒子，大獨生子叫大明，二兒子叫二明，三兒子叫什麽？", a:"小明" },
		   { q:"有一個年輕人，他要過一條河去辦事；但是，這條河沒有船也沒有橋。於是他便在上午泳過河，只一個小時的時間他便游到了對岸，當天下午，河水的寬度以及流速都沒有變，更重要的是他的游泳速度也沒有變，更重要的是他的游泳速度也沒有變，可是他竟用了兩個半小時才游到河對岸，你說爲什麽？", a:"兩個半小時加起來就是一個小時" },
		   { q:"用椰子和西瓜打頭哪一個比較痛？", a:"頭比較痛" },
		   { q:"借什麽可以不還？", a:"借光" },
		   { q:"進動物園看到的第一個動物是什麽？", a:"售票員" },
		   { q:"你只要叫它的名字就會把它破壞，它是什麽？", a:"沉默" },
		   { q:"什麽東西經常會來，但卻從沒真正來過？", a:"明天" },
		   { q:"狐狸精最擅長迷惑男人，那麽什麽'精'男女一起迷？", a:"酒精" },
		   { q:"三更半夜回家才發現忘記帶鑰匙，家裏又沒有其他人在，這時你最大的願望是什麽？", a:"門忘了鎖" },
		   { q:"什麽酒不能喝？", a:"碘酒" },
		   { q:"打什麽東西，不必花力氣？", a:"打瞌睡" },
		   { q:"被鱷魚咬和被鲨魚咬後的感覺有什麽不同？", a:"沒有人知道" },
		   { q:"離婚的主要起因是什麽？", a:"結婚" },
		   { q:"9個橙分給13個小朋友，怎麽分才公平？", a:"榨成汁" },
		   { q:"青蛙爲什麽能跳得比樹高？", a:"樹不會跳" },
		   { q:"你知道現代的科學家一般都出生在哪嗎？", a:"醫院裏" },
		   { q:"冬瓜、黃瓜、西瓜、南瓜都能吃，什麽瓜不能吃？", a:"傻瓜" },
		   { q:"什麽車子寸步難行？", a:"風車" },
		   { q:"哪一個月有二十八天？", a:"每個月都有28天" }];

//question index array
var index = getRandomArray(0, 35, 35);
console.log(index);

//count of question
var now = 0;
var restart = false;	

function askQuestion(re) {
	
	if(re == false) {
		//ask question
		io.sockets.emit('message','Question : ',QandA[index[now]]['q']);
	}
}	   

io.sockets.on('connection', function (socket) {
	
	socket.on('addme',function(username) {
		socket.username = username;
		socket.emit('sysmessage', 'SERVER', 'You have connected'); 
		socket.broadcast.emit('sysmessage', 'SERVER', username + ' is on deck');
		socket.send('Question: ',QandA[index[now]]['q']);
		
	});
	
	//listen for playerpoint
	socket.on('win', function(playerpoint) { 
		if(playerpoint >= 5){
		
			//show who win
			io.sockets.emit('sys', 'System' , socket.username +' Win');
		
			//reset index number
			now = 0;
			
			restart = true;
			
			//reset question
			index = getRandomArray(0, 35, 35);
			console.log(index);
			
			//reset client point
			io.sockets.emit('reset', 0);
			askQuestion(restart);
		}
	});
 
	socket.on('sendchat', function(data) { 
	
		io.sockets.emit('chat', socket.username, data);
		if(data == QandA[index[now]]['a']){
			restart = false;
			io.sockets.emit('sys', 'System' , socket.username +' get point');
			socket.emit('point', 'System', 1);
			now ++;
//			console.log(now);
			askQuestion(restart);
		
		}
	});

	//listen for user disconnect
	socket.on('disconnect', function() {
		io.sockets.emit('sysmessage', 'SERVER', socket.username + ' has left the building');
	});
	
});
