document.getElementById('minimize').addEventListener('click', () => {
    window.electron.minimize();
});

document.getElementById('close').addEventListener('click', () => {
    window.electron.close();
});

document.getElementById('maximize').addEventListener('click', () => {
    window.electron.maximize();
});

const titleBar = document.querySelector('.title-bar');
titleBar.addEventListener('mousedown', () => {
    const window = require('electron').remote.getCurrentWindow();
    window.startDrag();
});

document.querySelectorAll('.frame-library').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.selection').forEach(el => el.classList.remove('selected'));
        this.classList.add('selected');
    });
});

document.querySelectorAll('.search-sidebar').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.selection').forEach(el => el.classList.remove('selected'));
        this.classList.add('selected');
        const mainContent = document.querySelector('.main-content');
        
        fetch('content/search-content.html')
            .then(response => response.text())
            .then(data => {
                mainContent.innerHTML = data;
            })
            .catch(error => console.error('Error loading HTML content:', error));
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.querySelector('.main-content');
    
    fetch('content/home-content.html')
        .then(response => response.text())
        .then(data => {
            mainContent.innerHTML = data;
        })
        .catch(error => console.error('Error loading HTML content:', error));
});

document.querySelectorAll('.home-sidebar').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.selection').forEach(el => el.classList.remove('selected'));
        this.classList.add('selected');

        const mainContent = document.querySelector('.main-content');
        
        fetch('content/home-content.html')
            .then(response => response.text())
            .then(data => {
                mainContent.innerHTML = data;
            })
            .catch(error => console.error('Error loading HTML content:', error));
    });
});

document.querySelectorAll('.news-sidebar').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.selection').forEach(el => el.classList.remove('selected'));
        this.classList.add('selected');

        const mainContent = document.querySelector('.main-content');
        
        fetch('content/news-content.html')
            .then(response => response.text())
            .then(data => {
                mainContent.innerHTML = data;
            })
            .catch(error => console.error('Error loading HTML content:', error));
    });
});

const redBar = document.getElementById('red-bar');
const sidebarItems = document.querySelectorAll('.home-sidebar, .search-sidebar, .news-sidebar');

function moveRedBarToElement(item) {
    const topPosition = item.offsetTop;
    redBar.style.top = `${topPosition}px`;
}

sidebarItems.forEach((item) => {
    item.addEventListener('click', function () {
        document.querySelectorAll('.selection').forEach(el => el.classList.remove('selected'));
        this.classList.add('selected');
        moveRedBarToElement(this);
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const selectedElement = document.querySelector('.selection.selected');
    if (selectedElement) {
        moveRedBarToElement(selectedElement);
    }
});

const toggleButton = document.getElementById('dark-mode-toggle');
const body = document.body;
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');
const profileArtist = document.querySelector('.profile-artist');

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    sidebar.classList.toggle('dark-mode');
    sidebar.classList.toggle('light-mode');
    mainContent.classList.toggle('dark-mode');
    mainContent.classList.toggle('light-mode');
    profileArtist.classList.toggle('dark-mode');
    profileArtist.classList.toggle('light-mode');

    if (body.classList.contains('dark-mode')) {
        toggleButton.textContent = 'Light Mode';
    } else {
        toggleButton.textContent = 'Dark Mode';
    }
});
