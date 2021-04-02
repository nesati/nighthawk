const diacritics = {
    'á': 'a',
    'č': 'c',
    'ď': 'd',
    'é': 'e',
    'ě': 'e',
    'ň': 'n',
    'ó': 'o',
    'ř': 'r',
    'š': 's',
    'ť': 't',
    'ú': 'u',
    'ů': 'u',
    'ý': 'y',
    'ž': 'z'
}
const allowed_chars = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('')

function addImage() {
    const div = document.createElement('div')
    div.innerHTML = `
        <input type="number" class="year" placeholder="2021" onchange="update()">
        <input type="text" class="attribution" placeholder="Zkratka či název zdroje" onchange="update()">
        <input type="text" class="href" placeholder="Odkaz na zdroj" onchange="update()">
    `
    document.getElementById('images').appendChild(div)
    update()
}

window.addEventListener('load', ev => {
    addImage()
    addImage()
    update()
});

// https://stackoverflow.com/questions/4810841/pretty-print-json-using-javascript
function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

function title2file(text, ext) {
    text = text.toLowerCase()
    Object.entries(diacritics).forEach(entry => {
        const [key, value] = entry;
        text = text.replace(key, value)
    });

    let chars = text.split('');
    chars = chars.map(c => {
        if (allowed_chars.indexOf(c) >= 0) {
            return c
        } else {
            return '-'
        }
    })

    text = chars.join('')
    text = text.replace(/-+/g, "-");

    if (text === '') {
        return text
    } else {
        return text+ext
    }
}

function update() {
    const json = {
        "lat": document.getElementById('latitude').value,
        "lng": document.getElementById('longitude').value,
        "title": document.getElementById('title').value,
        "desc": title2file(document.getElementById('title').value, '.html')
    }
    document.getElementById('json').innerHTML = syntaxHighlight(json)

    let html = "<script>\nfunction init() {"

    let i = 1
    document.getElementById('images').childNodes.forEach(div => {
        if (div.nodeType !== 1) {
            return
        }
        console.log(div)
        html += "\nimg"+i+" = "

        const img_data = {
            "url": title2file(document.getElementById('title').value + ' ' + div.querySelector('.year').value, '.jpg'),
            "year": div.querySelector('.year').value,
            "attribution": "<a href='" + div.querySelector('.href').value + "'>" + div.querySelector('.attribution').value + "</a>"
        }

        html += JSON.stringify(img_data, undefined, 2);

        if (i > 1) {
            html += "\ncompare(img"+(i-1)+", img"+i+")\n"
        }

        i++
    });

    html += "\n}\ninit();\n</script>"

    html += document.getElementById('summernote').value
    html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    document.getElementById('html').innerHTML = html
    document.getElementById('nameOfGeneratedHTML').innerHTML = title2file(document.getElementById('title').value, '.html')
}

function submit() {

}