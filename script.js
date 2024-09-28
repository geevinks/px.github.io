let currentColor = 'black';
const grid = document.getElementById('grid');
const socket = new WebSocket('ws://localhost:8080');

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);

    if (data.type === 'init') {
        // Инициализируем цвет пикселей
        data.pixelData.forEach((color, index) => {
            const pixel = grid.children[index];
            pixel.style.backgroundColor = color;
        });
    } else if (data.type === 'update') {
        const pixel = grid.children[data.index];
        pixel.style.backgroundColor = data.color;
    }
};

// Создание сетки 100x100
for (let i = 0; i < 10000; i++) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixel.addEventListener('click', function () {
        pixel.style.backgroundColor = currentColor;
        // Отправка данных на сервер
        socket.send(JSON.stringify({ type: 'draw', index: Array.from(grid.children).indexOf(pixel), color: currentColor }));
    });
    grid.appendChild(pixel);
}

// Функция выбора цвета
function selectColor(color) {
    currentColor = color;
}
