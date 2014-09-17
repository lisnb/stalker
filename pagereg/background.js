function toggle() {
    chrome.storage.local.get('turn', function(value) {
        if (value.turn == 'off') {
            chrome.storage.local.set({
                "turn": "on"
            })
            chrome.browserAction.setIcon({
                path: "icons/stalker48.png"
            });
        } else {
            chrome.storage.local.set({
                "turn": "off"
            })
            chrome.browserAction.setIcon({
                path: "icons/stalkeroff.png"
            });
        }
        console.log('now: '+value.turn)
    })
}

chrome.browserAction.onClicked.addListener(toggle);
