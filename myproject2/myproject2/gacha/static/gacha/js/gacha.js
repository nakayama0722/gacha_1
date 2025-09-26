const drawBtn = document.getElementById("draw-btn");
const cardInner = document.getElementById("card-inner");
const cardBack = cardInner.querySelector(".card-back");
const cardFront = cardInner.querySelector(".card-front");
const videoContainer = document.getElementById("video-container");

// ランダム色の配列
const colors = [
    "linear-gradient(145deg, #ff6f61, #d84315)", // 赤系
    "linear-gradient(145deg, #42a5f5, #1e88e5)", // 青系
    "linear-gradient(145deg, #66bb6a, #388e3c)", // 緑系
    "linear-gradient(145deg, #ffd54f, #fbc02d)", // 黄色系
    "linear-gradient(145deg, #ab47bc, #8e24aa)", // 紫系
    "linear-gradient(145deg, #ff8a65, #f4511e)"  // オレンジ系
];

// ランダム背景色をセット
function setRandomCardColor() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    cardFront.style.background = randomColor;
    cardBack.style.background = randomColor;
}

function playGachaVideo(videoUrl, itemName, rarity) {
    videoContainer.innerHTML = "";
    cardBack.innerText = "???"; // 動画中は非表示

    const video = document.createElement("video");
    video.src = videoUrl;
    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;
    video.controls = false;

    // ★ 幅と高さをカード内にフィットさせる
    video.style.maxWidth = "90%";
    video.style.maxHeight = "90%";
    video.style.margin = "auto";
    video.style.display = "block";

    videoContainer.appendChild(video);

    video.play().catch(err => console.error("動画再生エラー:", err));

    video.addEventListener("ended", () => {
        videoContainer.innerHTML = "";

        // 結果表示（カード背面）
        cardInner.style.transform = "rotateY(180deg)";
        cardBack.innerText = `${rarity} : ${itemName}`;
    });
}

drawBtn.addEventListener("click", async () => {
    try {
        cardBack.innerText = "???";
        videoContainer.innerHTML = "";
        cardInner.style.transform = "rotateY(0deg)";

        // ★ 背景色をランダムに設定
        setRandomCardColor();

        const res = await fetch("/api/gacha/draw/");
        const data = await res.json();

        // カードを回転（複数回転して減速する）
        cardInner.classList.add("spin");

        cardInner.addEventListener("animationend", function handler() {
            cardInner.classList.remove("spin");
            cardInner.removeEventListener("animationend", handler);

            // 回転終了後に動画再生
            playGachaVideo(data.video, data.item, data.rarity);
        });

    } catch (err) {
        console.error(err);
    }
});
