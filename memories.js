let opened = 0;

function openGift(gift) {
    if (!gift.classList.contains("open")) {
        gift.classList.add("open");
        opened++;

        if (opened === 4) {
            document.getElementById("nextBtn").style.display = "block";
        }
    }
}

function goNext() {
    window.location.href = "final.html";
}
