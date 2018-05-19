function togglePlay() {

var video=document.getElementById("vid")

if(video.paused){
	video.play();
} else {
	video.pause();
}

}