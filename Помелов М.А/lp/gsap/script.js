let tl = gsap.timeline();

var point = document.querySelector("div");


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// point.addEventListener("mouseover", function () {
//     this.style.backgroundColor = "transparent";
//     const max = 50;
//     let x = point.style.top = `${Math.floor(Math.random() * (max + 1))}%`
//     let y = point.style.left = `${Math.floor(Math.random() * max + 1)}%`
//     tl.add()
//         .to('.circle', { x: x, duration: 1 })
//         .to('.circle', { backgroundColor: getRandomColor, duration: 1 })
//         .to('.circle', { y: y, duration: 1 });
// });

point.addEventListener("mouseover", function () {
    this.style.backgroundColor = "transparent";
    const max = 50;
    let x = point.style.top = `${Math.floor(Math.random() * (max + 1))}%`
    let y = point.style.left = `${Math.floor(Math.random() * max + 1)}%`
    tl.add()
        .to('.circle', { x: x, y: y,  backgroundColor: getRandomColor, duration: 1 })
});
