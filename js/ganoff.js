var point = 0;
var time = 30;
var count1 = 0;
var count2 = 0;
var count3 = 0;

var work1;
var work2;
var work3;
var	work4;
var	work5;
var	work6;

var ganoff1;
var ganoff2;
var ganoff3;

var pman;
var pman_x;
var pman_y;

var tomato;
var tomato_x;
var tomato_y;

var intervaldraw;
var intervalbye;
var intervaltime;
var intervalpman;
var intervalpmanbye;
var intervaltomato;
var	intervaltomatobye;
var intervalend;

var pointtxt;
var timetxt;

onload = function(){
	start();
	canvas1.addEventListener('click', function(){
		if(count1 == 0){
			main();
		}
	}, false)
	//Tweetボタンの非表示	
	if(count1 < time){
		document.getElementById("tweet-button").style.display="none";
		document.getElementById("reload-button").style.display="none";
	}
}

/*******************メイン********************/
function main(){
	starttxt.clearRect(130, 140, 100, 100);
	point_text();		//ポイントの表示
	time_text();
	canvas1.addEventListener('click', function(e){	//クリックされた場合のイベント
		var rect  = canvas1.getBoundingClientRect();
		var pos_x = e.clientX - rect.left;
		var pos_y = e.clientY - rect.top;
		if(pos_x > work1 && pos_x < work1+32 && pos_y > work2 && pos_y < work2+32){
			ganoff1.clearRect(work1, work2, 32, 32);	//クリックされたら消す
			point++;
			txt_bye();		//ポイントの書き直し
			point_text();
		}else if(pos_x > work3 && pos_x < work3+32 && pos_y > work4 && pos_y < work4+32){
			ganoff2.clearRect(work3, work4, 32, 32);
			point++;
			txt_bye();
			point_text();
		}else if(pos_x > work5 && pos_x < work5+32 && pos_y > work6 && pos_y < work6+32){
			ganoff3.clearRect(work5, work6, 32, 32);
			point++;
			txt_bye();
			point_text();
		}else if(pos_x > pman_x && pos_x < pman_x+32 && pos_y > pman_y && pos_y < pman_y+32){
			pman.clearRect(pman_x, pman_y, 32, 32);
			point = point - 5;
			txt_bye();
			point_text();
		}else if(pos_x > tomato_x && pos_x < tomato_x+32 && pos_y > tomato_y && pos_y < tomato_y+32){
			tomato.clearRect(tomato_x, tomato_y, 32, 32);
			point = point + 5;
			txt_bye();
			point_text();
		}
	}, true);


	//時間の処理

	/**ガノフ**/
	intervaldraw = setInterval(function(){
		if(count1 < time){
			draw();
			count1=count1+2;
		}
	}, 2000);
	intervalbye = setInterval(function(){
		if(count2 < time){
			bye();
			count2=count2+2;
		}
	}, 2000);
	/********/

	/********ピーマン**********/
	var pman_random = Math.random() * 5000;
	intervalpman = setInterval(function(){
		if(count1 < time){
			draw_pman();
		}
	}, pman_random);
	intervalpmanbye = setInterval(function(){
		if(count1 < time){
			bye_pman();
		}
	}, pman_random);
	/*************************/

	/********トマト**********/
	var tomato_random = Math.random() * 5000;
	intervaltomato = setInterval(function(){
		if(count1 < time){
			draw_tomato();
		}
	}, tomato_random);
	intervaltomatobye = setInterval(function(){
		if(count1 < time){
			bye_tomato();
		}
	}, tomato_random);
	/*************************/

	/******終了するときと時間の表示******/
	intervalend = setInterval(function(){
		if(count3 < time){
			count3++;
		}else if(count3 == time){
		end();
		}
	}, 1000)
	/*************************/

	/********時間の表示*************/
	intervaltime = setInterval(function(){
		timetxt_bye();
		time_text();
	}, 1000)
	/******************************/

};
/******************メイン終わり********************/

//ガノフの描画
function draw() {
	//描画コンテキストの取得
	var canvas = document.getElementById('canvas1');
	if(canvas.getContext){
		ganoff1 = canvas.getContext('2d');
		ganoff2 = canvas.getContext('2d');
		ganoff3 = canvas.getContext('2d');
		//Imageオブジェクトを生成
		var img = new Image();
		img.src = "img/ganoff.png?" + new Date().getTime();
		img.onload = function(){
			//画像を描画
			//yの値をポイント表示と被らないようにする
			var max = 268;
			var min = 15;
			work2 = 0;
			work4 = 0;
			work6 = 0;
			work1 = Math.random() * 268;
			work2 = (Math.random() * ((max + 1) - min)) + min;	//15以上の値
			work3 = Math.random() * 268;
			work4 = (Math.random() * ((max + 1) - min)) + min;	//15以上の値
			work5 = Math.random() * 268;
			work6 = (Math.random() * ((max + 1) - min)) + min;	//15以上の値
			ganoff1.drawImage(img, work1, work2);
			ganoff2.drawImage(img, work3, work4);
			ganoff3.drawImage(img, work5, work6);
		}
	}
}
//ピーマン
function draw_pman() {
	//描画コンテキストの取得
	var canvas = document.getElementById('canvas1');
	if(canvas.getContext){
		pman = canvas.getContext('2d');
		//Imageオブジェクトを生成
		var img = new Image();
		img.src = "img/pman.png?" + new Date().getTime();
		img.onload = function(){
			//画像を描画
			//yの値をポイント表示と被らないようにする
			var max = 268;
			var min = 15;
			pman_y = 0;
			pman_x = Math.random() * 268;
			pman_y = (Math.random() * ((max + 1) - min)) + min;
			pman.drawImage(img, pman_x, pman_y);
		}
	}
}
//トマト
function draw_tomato() {
	//描画コンテキストの取得
	var canvas = document.getElementById('canvas1');
	if(canvas.getContext){
		tomato = canvas.getContext('2d');
		//Imageオブジェクトを生成
		var img = new Image();
		img.src = "img/tomato.png?" + new Date().getTime();
		img.onload = function(){
			//画像を描画
			//yの値をポイント表示と被らないようにする
			var max = 268;
			var min = 15;
			tomato_y = 0;
			tomato_x = Math.random() * 268;
			tomato_y = (Math.random() * ((max + 1) - min)) + min;
			tomato.drawImage(img, tomato_x, tomato_y);
		}
	}
}
//ガノフを消す
function bye(){
	ganoff1.clearRect(work1, work2, 32, 32);
	ganoff2.clearRect(work3, work4, 32, 32);
	ganoff3.clearRect(work5, work6, 32, 32);
}
//ピーマンを消す
function bye_pman(){
	pman.clearRect(pman_x, pman_y, 32, 32);
}
//トマトを消す
function bye_tomato(){
	tomato.clearRect(tomato_x, tomato_y, 32, 32);
}
//ポイントの表示
function point_text(){
	var txt_point = "";
	txt_point = "現在のポイント：" + point;
	var canvas = document.getElementById('canvas1');
	if(canvas.getContext){
		pointtxt = canvas.getContext('2d');
		pointtxt.strokeStyle = "blue";
		pointtxt.textAlign = "left";
		pointtxt.textBaseline = "top";
		//point表示の位置
		pointtxt.strokeText(txt_point, 5, 5, 100);
	}
}
//時間の表示
function time_text(){
	var txt_timer = "";
	txt_timer = "TIME：" + count3;
	var canvas = document.getElementById('canvas1');
	if(canvas.getContext){
		timetxt = canvas.getContext('2d');
		timetxt.strokeStyle = "blue";
		timetxt.textAlign = "left";
		timetxt.textBaseline = "top";
		//timeの表示位置
		timetxt.strokeText(txt_timer, 150, 5);
	}
}
//ポイント書き直しのために消す
function txt_bye(){
	pointtxt.clearRect(5, 5, 100, 15);
}
//時間の書き直し
function timetxt_bye(){
	timetxt.clearRect(150, 5, 100, 15);
}
//STARTの表示
function start(){
	var txt_start = "START";
	var canvas = document.getElementById('canvas1');
	if(canvas.getContext){
		starttxt = canvas.getContext('2d');
		starttxt.strokeStyle = "red";
		starttxt.textAlign = "center";
		starttxt.strokeText(txt_start, 150, 150);
	}
}
function reload(){
	location.reload();
}
function end(){
	clearInterval(intervaldraw);
	clearInterval(intervalbye);
	clearInterval(intervaltime);
	clearInterval(intervalpman);
	clearInterval(intervaltomato);
	clearInterval(intervalend);
	clearInterval(intervaltime);
	document.getElementById('tweet-button').style.display = "block";
	document.getElementById('reload-button').style.display = "block";
	document.querySelector('#tweet-button').innerHTML = '<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://kcnmk.html.xdomain.jp/" data-text="' + 'YOUは' + point + 'ガノフGET！　ガノフが食べたくなってきた？"' +  'data-via="beefstr_kasuga" data-size="large" data-hashtags="ganoff2015">Tweet #ganoff2015</a>'
	twttr.widgets.load();
	var txt_end = "";
	txt_end = "YOUは" + point + "ガノフGETできたぜ！！！" + '<br><p clas="kakusan">Twitterで拡散してね</p>';
	document.getElementById("ganoff").innerHTML = txt_end;
}
