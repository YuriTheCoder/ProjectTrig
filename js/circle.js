// circle.js

// Variáveis Globais
let angle = 0; // Ângulo em graus
let radiusCircle = 200; // Raio do círculo
let angleSlider; // Slider para controle do ângulo
let decreaseButton, increaseButton; // Botões para ajustar o ângulo

function setup() {
    // Configuração do Canvas
    let canvas = createCanvas(800, 800);
    canvas.parent('circle-container');
    angleMode(DEGREES); // Trabalhar com graus

    // Criação dos Controles
    createControls();
}

function draw() {
    background(255);

    // Translada o sistema de coordenadas para o centro do canvas
    translate(width / 2, height / 2);

    // Desenha o plano cartesiano
    drawCartesianPlane();

    // Desenha o círculo trigonométrico
    stroke(0);
    strokeWeight(2);
    noFill();
    ellipse(0, 0, radiusCircle * 2, radiusCircle * 2);

    // Desenha as funções trigonométricas
    drawTrigFunctions();

    // Exibe o ângulo atual no centro do círculo
    displayAngle();

    // Desenha a legenda das funções
    drawLegend();
}

// Função para criar controles (Slider e Botões)
function createControls() {
    // Slider de Ângulo
    angleSlider = select('#controls').elt;
    angleSlider.innerHTML = ''; // Limpa qualquer conteúdo pré-existente

    // Botão de Decremento
    decreaseButton = createButton('-');
    decreaseButton.parent('controls');
    decreaseButton.mousePressed(() => {
        angle = (angle - 1 + 360) % 360;
        angleSlider.querySelector('input').value = angle;
    });

    // Slider
    let slider = createSlider(0, 360, 0, 1);
    slider.parent('controls');
    slider.style('width', '400px');
    slider.input(() => {
        angle = slider.value();
    });

    // Botão de Incremento
    increaseButton = createButton('+');
    increaseButton.parent('controls');
    increaseButton.mousePressed(() => {
        angle = (angle + 1) % 360;
        angleSlider.querySelector('input').value = angle;
    });
}

// Função para desenhar o plano cartesiano
function drawCartesianPlane() {
    stroke(200);
    strokeWeight(1);

    // Eixo X
    line(-width / 2, 0, width / 2, 0);
    // Eixo Y
    line(0, -height / 2, 0, height / 2);

    // Marcas nos eixos a cada 50 unidades
    for (let i = -radiusCircle; i <= radiusCircle; i += 50) {
        // Marcas no eixo X
        line(i, -5, i, 5);
        // Marcas no eixo Y
        line(-5, i, 5, i);
    }
}

// Função para desenhar as funções trigonométricas
function drawTrigFunctions() {
    // Coordenadas do ponto na circunferência
    let x = radiusCircle * cos(angle);
    let y = radiusCircle * sin(angle);

    // Ponto móvel na circunferência
    fill(0);
    noStroke();
    ellipse(x, -y, 10, 10); // Invertendo y para orientação correta

    // Linha do raio (Hipotenusa)
    stroke(0);
    strokeWeight(2);
    line(0, 0, x, -y);

    // Seno (Vermelho) - Oposto
    stroke(255, 0, 0);
    strokeWeight(2);
    line(x, 0, x, -y);
    // Etiqueta do Seno
    fill(255, 0, 0);
    noStroke();
    textSize(16);
    textAlign(LEFT, CENTER);
    text('Seno', x + 5, (-y) / 2);

    // Cosseno (Azul) - Adjacente
    stroke(0, 0, 255);
    strokeWeight(2);
    line(0, -y, x, -y);
    // Etiqueta do Cosseno
    fill(0, 0, 255);
    noStroke();
    textAlign(CENTER, BOTTOM);
    text('Cosseno', x / 2, -y - 10);

    // Tangente (Verde)
    if (cos(angle) !== 0) {
        let tanX = radiusCircle;
        let tanY = radiusCircle * tan(angle);
        stroke(0, 128, 0);
        strokeWeight(2);
        line(radiusCircle, 0, tanX, -tanY);
        // Linha auxiliar do ponto à tangente
        line(x, -y, tanX, -tanY);
        // Etiqueta da Tangente
        fill(0, 128, 0);
        noStroke();
        textAlign(LEFT, CENTER);
        text('Tangente', tanX + 5, -tanY);
    }

    // Cotangente (Laranja)
    if (sin(angle) !== 0) {
        let cotX = radiusCircle / tan(angle);
        let cotY = radiusCircle;
        stroke(255, 165, 0);
        strokeWeight(2);
        line(0, -radiusCircle, cotX, -radiusCircle);
        // Linha auxiliar do ponto à cotangente
        line(x, -y, cotX, -radiusCircle);
        // Etiqueta da Cotangente
        fill(255, 165, 0);
        noStroke();
        textAlign(CENTER, BOTTOM);
        text('Cotangente', cotX, -radiusCircle - 10);
    }

    // Secante (Roxo)
    if (cos(angle) !== 0) {
        let secX = radiusCircle / cos(angle);
        stroke(128, 0, 128);
        strokeWeight(2);
        line(0, 0, secX, 0);
        // Etiqueta da Secante
        fill(128, 0, 128);
        noStroke();
        textAlign(CENTER, TOP);
        text('Secante', secX, 10);
    }

    // Cossecante (Ciano)
    if (sin(angle) !== 0) {
        let cosecY = radiusCircle / sin(angle);
        stroke(0, 255, 255);
        strokeWeight(2);
        line(0, 0, 0, -cosecY);
        // Etiqueta da Cossecante
        fill(0, 255, 255);
        noStroke();
        textAlign(LEFT, CENTER);
        text('Cossecante', 5, -cosecY);
    }
}

// Função para exibir o ângulo atual no centro do círculo
function displayAngle() {
    fill(0);
    noStroke();
    textSize(20);
    textAlign(CENTER, CENTER);
    text(`${angle.toFixed(1)}°`, 0, 0);
}

// Função para desenhar a legenda das funções trigonométricas
function drawLegend() {
    let startX = -width / 2 + 20;
    let startY = -height / 2 + 20;
    let spacing = 25;

    textSize(16);
    textAlign(LEFT, CENTER);

    // Seno
    stroke(255, 0, 0);
    strokeWeight(2);
    line(startX, startY, startX + 20, startY);
    noStroke();
    fill(255, 0, 0);
    text('Seno', startX + 25, startY);

    // Cosseno
    stroke(0, 0, 255);
    strokeWeight(2);
    line(startX, startY + spacing, startX + 20, startY + spacing);
    noStroke();
    fill(0, 0, 255);
    text('Cosseno', startX + 25, startY + spacing);

    // Tangente
    stroke(0, 128, 0);
    strokeWeight(2);
    line(startX, startY + 2 * spacing, startX + 20, startY + 2 * spacing);
    noStroke();
    fill(0, 128, 0);
    text('Tangente', startX + 25, startY + 2 * spacing);

    // Cotangente
    stroke(255, 165, 0);
    strokeWeight(2);
    line(startX, startY + 3 * spacing, startX + 20, startY + 3 * spacing);
    noStroke();
    fill(255, 165, 0);
    text('Cotangente', startX + 25, startY + 3 * spacing);

    // Secante
    stroke(128, 0, 128);
    strokeWeight(2);
    line(startX, startY + 4 * spacing, startX + 20, startY + 4 * spacing);
    noStroke();
    fill(128, 0, 128);
    text('Secante', startX + 25, startY + 4 * spacing);

    // Cossecante
    stroke(0, 255, 255);
    strokeWeight(2);
    line(startX, startY + 5 * spacing, startX + 20, startY + 5 * spacing);
    noStroke();
    fill(0, 255, 255);
    text('Cossecante', startX + 25, startY + 5 * spacing);
}
