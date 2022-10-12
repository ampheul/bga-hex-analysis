(function () {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var bookmarklet = document.getElementById('bookmarklet');
	bookmarklet.href = 'javascript:'+this.responseText.replace('\n','');
    }
    xhttp.open("GET", "bookmarklet.js", true);
    xhttp.send();
})();
