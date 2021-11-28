

console.log(window.location.pathname)
if (window.location.pathname === '/shop' || window.location.pathname === '/home' || window.location.pathname === '/home/') {
	function idleLogout() {
		var t;
		window.onload = resetTimer;
		window.onmousemove = resetTimer;
		window.onmousedown = resetTimer;  // catches touchscreen presses as well
		window.ontouchstart = resetTimer; // catches touchscreen swipes as well
		window.onclick = resetTimer;      // catches touchpad clicks as well
		window.onkeydown = resetTimer;
		window.addEventListener('scroll', resetTimer, true); // improved; see comments
	
		function yourFunction() {
			// your function for too long inactivity goes here
			// e.g. window.location.href = 'logout.php';
			window.location.replace("/")
		}
	
		function resetTimer() {
			clearTimeout(t);
			t = setTimeout(yourFunction, 25000);  // time is in milliseconds
		}
	}
	idleLogout();
}
