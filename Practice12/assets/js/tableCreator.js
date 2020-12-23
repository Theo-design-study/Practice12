const requestURL = 'https://jsonplaceholder.typicode.com/users';

const container = document.getElementById('container');

function sendRequest(method, url) {
    return new Promise((resolve, reject) => {
        const requestURL = url;
        const xhr = new XMLHttpRequest();
        xhr.open(method, requestURL);
        xhr.responseType = 'json';

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.status);
            } else {
                resolve(xhr.response);
            }
        }

        xhr.onerror = () => {
            reject(xhr.response);
        }

        xhr.send();
    })
}

sendRequest('GET', requestURL).then(data => {
    let table = document.createElement('table');
    table.className = 'blue lighten-4';

    let titles = ['Id', 'Name', 'Username', 'Company Name', 'City', 'Phone', 'Email', 'Website'];
    let keys = ['id', 'name', 'username', ['company', 'name'], ['address', 'city'], 'phone', 'email', 'website'];

    function addTextCell(row, text, type='td') {
        let cell = document.createElement(type);
        cell.appendChild(document.createTextNode(text));
        row.appendChild(cell);
    }

    function addTextRow(cells, type='td') {
        let row = document.createElement('tr');

        cells.forEach(cell => addTextCell(row, cell, type));

        table.appendChild(row);
    }

    function getProperty(obj, key) {
        if (typeof key === 'string') {
            return obj[key];
        }

        key.forEach(k => {
            obj = obj[k];
        });

        return obj;
    }

    addTextRow(titles, 'th');
    data.forEach(user => addTextRow(keys.map(key => getProperty(user, key))));

    container.appendChild(table);
}).catch(error => {
    container.appendChild(document.createTextNode(`Cannot load the table (${error}).`));
});
