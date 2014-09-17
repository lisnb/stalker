function store() {
    alert("hello")
    window.localStorage['think'] = "pad"
    alert(window.localStorage['think'])
}
document.getElementById("storebutton").onclick = store;



