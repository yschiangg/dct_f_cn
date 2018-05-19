function toggleMute() {

var video=document.getElementById("vid")

if(video.muted){
	video.muted = false;
} else {
	video.muted = true;
}

}