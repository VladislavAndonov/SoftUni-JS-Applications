async function solution() {

    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';
    const response = await fetch(url);
    const data = await response.json();
    let main = document.getElementById('main');

    data.forEach(element => {
        let divAccorrion = createElement('div', '', ['class', 'accordion']);
        let divHead = createElement('div', '', ['class', 'head']);
        let span = createElement('span', element.title);
        let button = createElement('button', 'More', ['class', 'button', 'id', element._id]);
        let divExtra = createElement('div', '', ['class', 'extra']);
        let p = createElement('p');

        button.addEventListener('click', toggleFunction);
        divExtra.appendChild(p);
        divAccorrion.appendChild(divExtra);
        divHead.appendChild(button)
        divHead.appendChild(span);
        divAccorrion.appendChild(divHead);
        main.appendChild(divAccorrion);
    });

    async function toggleFunction(event) {
        // const accordion = event.target.parentNode.parentNode;
        const p = event.target.parentNode.parentNode.children[0].children[0];
        const extra = event.target.parentNode.parentNode.children[0];

        let id = event.target.id;
        let url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        p.textContent = data.content
        // console.log(data);
        const hidden = event.target.textContent === 'More';
        extra.style.display = hidden ? 'block' : 'none';
        event.target.textContent = hidden ? 'Less' : 'More';
    }

    function createElement(type, content, attributes = []) {
        const elementType = document.createElement(type);

        if (content) {
            elementType.textContent = content
        };
        
        if (attributes.length > 0) {
            for (let i = 0; i < attributes.length; i += 2) {
                elementType.setAttribute(attributes[i], attributes[i + 1]);
            }
        }
        return elementType;
    }
}
solution();