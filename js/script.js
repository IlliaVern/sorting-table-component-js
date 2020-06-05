const requestURL = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}'

const request = new XMLHttpRequest()
request.open('GET', requestURL)

request.responseType = 'json'
request.send()

let tBody = document.querySelector('tbody')

const fillTable = (data) => {

    for (let user of data) {

        let tr = document.createElement('TR')
        let td1 = document.createElement('TD')
        let td2 = document.createElement('TD')
        let td3 = document.createElement('TD')
        let td4 = document.createElement('TD')
        let td5 = document.createElement('TD')

        td1.innerText = user.id
        td2.innerText = user.firstName
        td3.innerText = user.lastName
        td4.innerText = user.email
        td5.innerText = user.phone
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)
        tBody.appendChild(tr)
    }
}

request.onload = () => {
    var usersData = request.response
    fillTable(usersData)
}

document.addEventListener('DOMContentLoaded', () => {

    const getSort = ({target}) => {
        const order = (target.dataset.order = -(target.dataset.order || -1))
        const index = [...target.parentNode.cells].indexOf(target)
        const collator = new Intl.Collator(['en', 'ru'], {numeric: true})
        const comparator = (index, order) => (a, b) => order * collator.compare(
            a.children[index].innerHTML,
            b.children[index].innerHTML
        );

        for (const tBody of target.closest('table').tBodies)
            tBody.append(...[...tBody.rows].sort(comparator(index, order)))

        for (const cell of target.parentNode.cells)
            cell.classList.toggle('sorted', cell === target)
    }

    document.querySelectorAll('.table_sort thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)))

});

// let tableBody = document.getElementById('bodyTable')
// let tds = tableBody.getElementsByTagName('tr');
// console.log(tds);

// for(let i = 0; i<tds.length; i++){
//     tds[i].onclick = function(e){
//     var el = e ? e.target : window.event.srcElement;
//       document.getElementById('clickedUserData').innerText = el.innerText;
//     }
//   }