function show_board() {

    let html = "<table>";

    for (let y = 7; y >= 0; y--) {
        html += "<tr>"

        for (let x = 7; x >= 0; x--) {

            let color = change_color(x, y);
            html += "<td style = background-color:"+ color +"></td>"

        }
        html += "</tr>"
    }
    html += "</table>";

    document.getElementById('board').innerHTML = html;
}

function change_color(x, y) {
    if ((x + y) % 2 == 0) {
        return "#179c68";
    }
    else {
        return "#fff798";
    }
}