document.addEventListener('DOMContentLoaded', function () {
    console.log('fetch a logo');
        fetch('image/shoeicon.ico')
        .then(response => {
            console.log(response);
            return response.blob();
        })
        .then(blob => {
            console.log(blob);
            document.getElementById('logo').src = URL.createObjectURL(blob);
        })

        .catch(error => {
            console.log('logo error!');
            console.error(error);
        });
    });

/**
 * For the NavBar open close
 */

document.addEventListener('DOMContentLoaded', function () {
    const NavButton = document.getElementById('NavButton');
    const Navbar = document.getElementById('Navbar');
    const Menu = document.getElementById('Menu');

    Navbar.style.right = '-200px';

    // DOM - event: onclick
    NavButton.onclick = function openCloseNav () {
        if (Navbar.style.right === '-200px') {
            Navbar.style.right = '0';
            Menu.src = 'image/close.png';
        } else {
            Navbar.style.right = '-200px';
            Menu.src = 'image/menu.png';
        }
    };
});

/**
  * Definition of About
  *
 */

document.addEventListener('DOMContentLoaded', function () {
    const Description01 = "<p>Take a step beyond the confines of convention with the Blazer x Doyenne collaboration. This European-based skateboarding brand, known for its ungendered approach, has created a design that embraces the unique qualities of every individual. The neutral colors and layered taping, combined with abstract graphics, celebrate the complexities of growth and change. Plus, the durable pineapple canvas upper, made from pineapple waste fabric, ensures you can keep skating, falling, and getting back up again. So don't limit yourself to a box – lace up, blur the lines, and find your perfect harmony.</p>";

    const Description02 = "<p>Doyenne is a design studio and brand run by women who prioritize inclusivity. They're rooted in skateboarding and work at the intersection of philosophy, social equality, and design innovation. By integrating responsible sourcing with accessible design and authentic storytelling, Doyenne creates curated projects and collaborations that put the community first.</p>";
        document.getElementById('WhatisAbout').innerHTML = Description01 + Description02;
});

/**
  * Table
  * https://www.youtube.com/watch?v=_a2dhymoTHw
 */
$(document).ready(function () {
    $('#ShoesList').DataTable({
        ajax: '/DataSet/shoeinfo.json',
        deferRender: true,
        columns: [
            { data: 'brand' },
            { data: 'model' },
            { data: 'designer' },
            { data: 'price' },
            { data: 'releaseDate' }
        ]
    });
});

function queryProduct () {
    let xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xhr.open('get', 'getProduct', true);
    xhr.send(null);
    xhr.onreadystatechange = function () {
        fetch('file:///Users/meganlaw/Downloads/sum/client/DataSet/shoeinfo.json')
        .then(response = response.json())
        .then(data = console.log(data))
        .catch(error = console.error(error));
    };
}

/**
  * This is a function to add client into the subscribe list through Js.
  *
 */
    function addClient () {
        const lastname = document.sample.lastname.value;
        const email = document.sample.email.value;

        const tr = document.createElement('tr');

        const td1 = tr.appendChild(document.createElement('td'));
        const td2 = tr.appendChild(document.createElement('td'));
        const td3 = tr.appendChild(document.createElement('td'));
        const td4 = tr.appendChild(document.createElement('td'));

        td1.innerHTML = lastname;
        td2.innerHTML = email;
        td3.innerHTML = '<input type="button" name="del" value="Delete" onclick="delClient(this);" class="btn-danger">';
        td4.innerHTML = '<input type="button" name="up" value="Update" onclick="UpClient(this);" class="btn-primary">';
        document.getElementById('tbl').appendChild(tr);
    }

function mouseDown () {
    document.getElementById('OrderBtn').style.color = 'red';
    }

/**
 * MouseUp for StaffList
 */

function mouseUp () {
    document.getElementById('OrderBtn').style.color = 'green';
}

OrderBtn.addEventListener('click', () => {
    const close = document.getElementById('order-data');
    if (close.classList.contains('d-none')) {
        (close.classList.remove('d-none'));
    } else {
        close.classList.add('d-none');
    }
});
