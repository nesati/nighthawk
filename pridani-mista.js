function addImage() {
    const div = document.createElement('div')
    div.innerHTML = `
        <input type="number" class="year" placeholder="2021">
        <input type="text" class="attribution">
        <input type="text" class="href">
    `
    document.getElementById('images').appendChild(div)
}

document.body.addEventListener('load', ev => {
    addImage()
});
