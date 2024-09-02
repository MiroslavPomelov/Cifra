

document.getElementById('keyWord').oninput = function () {
    localStorage.setItem('keyWord', this.value);
}
