
const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

const larguraMapa = 1800;
const alturaMapa = 1400;

let camera = {
    x: 0,
    y: 0
};

let teclas = {};

let jogador = {
    x: 900,
    y: 700,
    tamanho: 24,
    velocidade: 3
};

let jogoIniciado = false;

// ==========================================
// PAREDES
// ==========================================

const paredes = [
    // Limites do mapa
    { x: 0, y: 0, w: larguraMapa, h: 30 },
    { x: 0, y: alturaMapa - 30, w: larguraMapa, h: 30 },
    { x: 0, y: 0, w: 30, h: alturaMapa },
    { x: larguraMapa - 30, y: 0, w: 30, h: alturaMapa },

    // Cozinha
    { x: 30, y: 300, w: 500, h: 25 },
    { x: 30, y: 300, w: 25, h: 450 },
    { x: 30, y: 725, w: 150, h: 25 },
    { x: 400, y: 725, w: 130, h: 25 },
    { x: 505, y: 325, w: 25, h: 425 },

    // Sala de segurança
    { x: 1270, y: 300, w: 500, h: 25 },
    { x: 1270, y: 300, w: 25, h: 450 },
    { x: 1270, y: 725, w: 150, h: 25 },
    { x: 1640, y: 725, w: 130, h: 25 },
    { x: 1745, y: 325, w: 25, h: 425 },

    // Arcade
    { x: 30, y: 800, w: 500, h: 25 },
    { x: 30, y: 800, w: 25, h: 400 },
    { x: 30, y: 1175, w: 150, h: 25 },
    { x: 400, y: 1175, w: 130, h: 25 },
    { x: 505, y: 825, w: 25, h: 375 },

    // Banheiros
    { x: 1270, y: 800, w: 500, h: 25 },
    { x: 1270, y: 800, w: 25, h: 400 },
    { x: 1270, y: 1175, w: 150, h: 25 },
    { x: 1640, y: 1175, w: 130, h: 25 },
    { x: 1745, y: 825, w: 25, h: 375 },

    // Depósito
    { x: 600, y: 900, w: 600, h: 25 },
    { x: 600, y: 900, w: 25, h: 350 },
    { x: 600, y: 1225, w: 180, h: 25 },
    { x: 1020, y: 1225, w: 180, h: 25 },
    { x: 1175, y: 925, w: 25, h: 325 },

    // Palco
    { x: 600, y: 50, w: 600, h: 25 },
    { x: 600, y: 50, w: 25, h: 230 },
    { x: 1175, y: 50, w: 25, h: 230 },
    { x: 600, y: 255, w: 160, h: 25 },
    { x: 1040, y: 255, w: 160, h: 25 }
];

// ==========================================
// MÓVEIS E OBJETOS QUE BLOQUEIAM
// ==========================================

const obstaculos = [

    // Cozinha
    { x: 80, y: 350, w: 330, h: 55 },
    { x: 80, y: 430, w: 65, h: 180 },
    { x: 350, y: 440, w: 90, h: 100 },
    { x: 170, y: 620, w: 220, h: 60 },

    // Sala de segurança
    { x: 1350, y: 400, w: 250, h: 100 },
    { x: 1370, y: 560, w: 100, h: 80 },
    { x: 1580, y: 560, w: 100, h: 80 },

    // Arcade
    { x: 80, y: 850, w: 80, h: 180 },
    { x: 180, y: 850, w: 80, h: 180 },
    { x: 280, y: 850, w: 80, h: 180 },
    { x: 380, y: 850, w: 80, h: 180 },

    // Banheiros
    { x: 1350, y: 850, w: 130, h: 80 },
    { x: 1510, y: 850, w: 130, h: 80 },
    { x: 1350, y: 1050, w: 120, h: 100 },
    { x: 1510, y: 1050, w: 120, h: 100 },

    // Depósito
    { x: 660, y: 960, w: 150, h: 100 },
    { x: 850, y: 960, w: 150, h: 100 },
    { x: 1030, y: 960, w: 100, h: 120 },

    // Mesas do salão
    { x: 650, y: 380, w: 140, h: 100 },
    { x: 900, y: 380, w: 140, h: 100 },
    { x: 650, y: 550, w: 140, h: 100 },
    { x: 1050, y: 550, w: 140, h: 100 },
    { x: 700, y: 750, w: 140, h: 100 },
    { x: 1000, y: 750, w: 140, h: 100 }
];

// ==========================================
// ANIMATRÔNICOS
// ==========================================

const animatronicos = [
    {
        nome: "Freddy Fazbear",
        tipo: "freddy",
        x: 730,
        y: 160
    },
    {
        nome: "Bonnie",
        tipo: "bonnie",
        x: 850,
        y: 160
    },
    {
        nome: "Chica",
        tipo: "chica",
        x: 970,
        y: 160
    },
    {
        nome: "Foxy",
        tipo: "foxy",
        x: 1080,
        y: 160
    }
];

// ==========================================
// OBJETOS INTERATIVOS
// ==========================================

const objetos = [
    {
        nome: "Pizza",
        x: 250,
        y: 650,
        texto: "Uma pizza deliciosa está sobre a bancada. Parece que acabou de sair do forno!",
        usado: false
    },
    {
        nome: "Bilhete",
        x: 700,
        y: 1050,
        texto: "O bilhete diz: 'Não deixe os animatrônicos sozinhos por muito tempo...'",
        usado: false
    },
    {
        nome: "Presente",
        x: 1080,
        y: 1100,
        texto: "Dentro da caixa existe um brinquedo antigo da Freddy Fazbear's Pizza.",
        usado: false
    },
    {
        nome: "Mesa do segurança",
        x: 1470,
        y: 450,
        texto: "Esta é a sala de segurança. O guarda monitora a pizzaria por esses monitores.",
        usado: false
    },
    {
        nome: "Câmeras",
        x: 1500,
        y: 400,
        texto: "Você olha os monitores. CAM 1: Palco. CAM 2: Salão. CAM 3: Arcade. CAM 4: Cozinha.",
        usado: false
    },
    {
        nome: "Arcade",
        x: 220,
        y: 1080,
        texto: "Você encontrou uma máquina de arcade. Ela ainda funciona!",
        usado: false
    },
    {
        nome: "Armário",
        x: 700,
        y: 1150,
        texto: "Dentro do armário existem peças antigas e alguns objetos esquecidos.",
        usado: false
    },
    {
        nome: "Banheiro",
        x: 1450,
        y: 1000,
        texto: "O banheiro está silencioso. Você pode ouvir o zumbido das lâmpadas.",
        usado: false
    }
];

// ==========================================
// DESENHOS BÁSICOS
// ==========================================

function retangulo(x, y, w, h, cor) {
    ctx.fillStyle = cor;
    ctx.fillRect(x, y, w, h);
}

function texto(texto, x, y, tamanho, cor) {
    ctx.font = tamanho + "px Arial";
    ctx.fillStyle = cor;
    ctx.textAlign = "center";
    ctx.fillText(texto, x, y);
}

function desenharChao() {

    retangulo(0, 0, larguraMapa, alturaMapa, "#39332d");

    // Piso quadriculado
    for (let x = 30; x < larguraMapa; x += 60) {
        for (let y = 30; y < alturaMapa; y += 60) {

            if ((x / 60 + y / 60) % 2 === 0) {
                retangulo(x, y, 60, 60, "#403a33");
            } else {
                retangulo(x, y, 60, 60, "#342e28");
            }

        }
    }
}

// ==========================================
// DECORAÇÃO DAS PAREDES
// ==========================================

function desenharDecoracao() {

    // Pôsteres do salão
    retangulo(550, 350, 70, 100, "#6e2929");
    texto("PARTY", 585, 400, 16, "#f5d27b");

    retangulo(1150, 350, 70, 100, "#273e77");
    texto("FUN", 1185, 400, 16, "#f5d27b");

    retangulo(550, 700, 70, 100, "#477337");
    texto("PIZZA", 585, 750, 16, "#f5d27b");

    retangulo(1150, 700, 70, 100, "#722d68");
    texto("PARTY", 1185, 750, 16, "#f5d27b");

    // Quadros da cozinha
    retangulo(70, 330, 100, 60, "#5a3822");
    retangulo(80, 340, 80, 40, "#d8c8a2");
    texto("MENU", 120, 365, 20, "#5a3822");

    // Quadro da sala de segurança
    retangulo(1650, 350, 70, 100, "#4a4a4a");
    texto("CAM", 1685, 390, 16, "#67d8e9");

    // Quadros do arcade
    retangulo(70, 1150, 100, 40, "#b02d2d");
    texto("ARCADE", 120, 1177, 17, "#fff");

    // Decoração do depósito
    texto("STAFF ONLY", 900, 1230, 18, "#a6a6a6");
}

// ==========================================
// COZINHA
// ==========================================

function desenharCozinha() {

    retangulo(55, 325, 450, 400, "#53463a");

    // Piso da cozinha
    for (let x = 60; x < 500; x += 40) {
        for (let y = 330; y < 720; y += 40) {
            retangulo(x, y, 38, 38, "#69645c");
            retangulo(x + 2, y + 2, 34, 34, "#55514b");
        }
    }

    // Bancada
    retangulo(80, 350, 330, 55, "#9b9b9b");
    retangulo(80, 350, 330, 12, "#c5c5c5");

    // Pia
    retangulo(110, 360, 80, 35, "#333");
    retangulo(120, 365, 60, 25, "#8fa4aa");
    retangulo(145, 350, 10, 15, "#bbb");

    // Fogão
    retangulo(210, 350, 100, 55, "#292929");

    for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.arc(230 + (i % 2) * 40, 365 + Math.floor(i / 2) * 25, 12, 0, Math.PI * 2);
        ctx.fillStyle = "#111";
        ctx.fill();
        ctx.strokeStyle = "#aaa";
        ctx.stroke();
    }

    // Forno
    retangulo(330, 350, 70, 55, "#777");
    retangulo(340, 360, 50, 35, "#222");
    retangulo(345, 365, 40, 25, "#555");

    // Geladeira
    retangulo(80, 430, 65, 170, "#bcbcbc");
    retangulo(85, 435, 55, 80, "#dedede");
    retangulo(85, 520, 55, 75, "#dedede");
    retangulo(130, 450, 5, 30, "#777");
    retangulo(130, 540, 5, 30, "#777");

    // Armários
    retangulo(350, 440, 90, 100, "#7b4a29");
    retangulo(355, 445, 80, 45, "#9b6338");
    retangulo(355, 495, 80, 40, "#9b6338");

    // Pizza na bancada
    ctx.beginPath();
    ctx.arc(250, 650, 30, 0, Math.PI * 2);
    ctx.fillStyle = "#d8a44d";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(250, 650, 24, 0, Math.PI * 2);
    ctx.fillStyle = "#c64b32";
    ctx.fill();

    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(235 + i * 8, 640 + (i % 2) * 15, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#f5d65b";
        ctx.fill();
    }

    texto("COZINHA", 270, 710, 20, "#fff");
}

// ==========================================
// SALA DE SEGURANÇA
// ==========================================

function desenharSeguranca() {

    retangulo(1295, 325, 450, 400, "#34383c");

    // Piso
    for (let x = 1300; x < 1740; x += 40) {
        for (let y = 330; y < 720; y += 40) {
            retangulo(x, y, 38, 38, "#44494d");
        }
    }

    // Mesa
    retangulo(1350, 400, 250, 100, "#6d4225");
    retangulo(1355, 405, 240, 15, "#946537");

    // Monitor 1
    retangulo(1380, 350, 90, 60, "#171717");
    retangulo(1385, 355, 80, 45, "#24434b");
    texto("CAM", 1425, 385, 18, "#75d5e8");

    // Monitor 2
    retangulo(1480, 350, 90, 60, "#171717");
    retangulo(1485, 355, 80, 45, "#24434b");
    texto("CAM", 1525, 385, 18, "#75d5e8");

    // Teclado
    retangulo(1430, 455, 90, 20, "#222");
    retangulo(1435, 460, 80, 10, "#555");

    // Cadeira
    retangulo(1450, 530, 60, 50, "#333");
    retangulo(1460, 580, 40, 35, "#222");

   // Ventilador
    ctx.beginPath();
    ctx.arc(1650, 400, 35, 0, Math.PI * 2);
    ctx.fillStyle = "#555";
    ctx.fill();

    for (let i = 0; i < 4; i++) {

        ctx.save();

        ctx.translate(1650, 400);
        ctx.rotate(i * Math.PI / 2);

        retangulo(-8, -30, 16, 30, "#aaa");

        ctx.restore();

    }

    ctx.beginPath();
    ctx.arc(1650, 400, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#222";
    ctx.fill();

    // Botões
    retangulo(1620, 550, 50, 70, "#222");

    ctx.beginPath();
    ctx.arc(1645, 570, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#c33";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(1645, 600, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#3c3";
    ctx.fill();

    texto("SECURITY OFFICE", 1500, 680, 18, "#fff");
}

// ==========================================
// PALCO
// ==========================================

function desenharPalco() {

    retangulo(625, 75, 550, 180, "#71352c");

    retangulo(640, 90, 520, 150, "#4b2020");

    // Cortinas
    retangulo(640, 90, 40, 150, "#a02f2f");
    retangulo(1120, 90, 40, 150, "#a02f2f");

    for (let x = 680; x < 1120; x += 70) {
        retangulo(x, 90, 20, 150, "#832727");
    }

    // Piso do palco
    retangulo(640, 230, 520, 25, "#8a643e");

    texto("CELEBRATE!", 900, 110, 24, "#f5d16c");

    desenharFreddy(730, 160);
    desenharBonnie(850, 160);
    desenharChica(970, 160);
    desenharFoxy(1080, 160);
}

// ==========================================
// FREDDY
// ==========================================

function desenharFreddy(x, y) {

    // Corpo
    retangulo(x - 25, y + 10, 50, 65, "#79502c");

    // Cabeça
    retangulo(x - 30, y - 35, 60, 50, "#79502c");

    // Orelhas
    retangulo(x - 35, y - 55, 18, 25, "#79502c");
    retangulo(x + 17, y - 55, 18, 25, "#79502c");

    // Focinho
    retangulo(x - 15, y - 5, 30, 20, "#b58b61");

    // Olhos
    retangulo(x - 20, y - 20, 10, 10, "#fff");
    retangulo(x + 10, y - 20, 10, 10, "#fff");

    retangulo(x - 17, y - 17, 5, 5, "#111");
    retangulo(x + 13, y - 17, 5, 5, "#111");

    // Nariz
    retangulo(x - 5, y - 3, 10, 7, "#222");

    // Chapéu
    retangulo(x - 20, y - 60, 40, 10, "#222");
    retangulo(x - 12, y - 75, 24, 18, "#222");

    // Gravata
    retangulo(x - 7, y + 18, 14, 25, "#222");

    // Braços
    retangulo(x - 40, y + 20, 15, 40, "#79502c");
    retangulo(x + 25, y + 20, 15, 40, "#79502c");

    // Pernas
    retangulo(x - 20, y + 70, 15, 25, "#79502c");
    retangulo(x + 5, y + 70, 15, 25, "#79502c");

    texto("FREDDY", x, y + 110, 12, "#fff");
}

// ==========================================
// BONNIE
// ==========================================

function desenharBonnie(x, y) {

    retangulo(x - 25, y + 10, 50, 65, "#6254a8");

    retangulo(x - 30, y - 35, 60, 50, "#6254a8");

    // Orelhas
    retangulo(x - 30, y - 90, 15, 55, "#6254a8");
    retangulo(x + 15, y - 90, 15, 55, "#6254a8");

    retangulo(x - 25, y - 80, 8, 40, "#aaa2d6");
    retangulo(x + 17, y - 80, 8, 40, "#aaa2d6");

    // Olhos
    retangulo(x - 20, y - 20, 10, 10, "#fff");
    retangulo(x + 10, y - 20, 10, 10, "#fff");

    retangulo(x - 17, y - 17, 5, 5, "#111");
    retangulo(x + 13, y - 17, 5, 5, "#111");

    // Focinho
    retangulo(x - 15, y - 5, 30, 20, "#aaa2d6");
    retangulo(x - 5, y - 2, 10, 7, "#222");

    // Gravata borboleta
    retangulo(x - 15, y + 15, 30, 12, "#b72c2c");

    // Braços
    retangulo(x - 40, y + 20, 15, 40, "#6254a8");
    retangulo(x + 25, y + 20, 15, 40, "#6254a8");

    // Pernas
    retangulo(x - 20, y + 70, 15, 25, "#6254a8");
    retangulo(x + 5, y + 70, 15, 25, "#6254a8");

    texto("BONNIE", x, y + 110, 12, "#fff");
}

// ==========================================
// CHICA
// ==========================================

function desenharChica(x, y) {

    retangulo(x - 25, y + 10, 50, 65, "#e0c83d");

    retangulo(x - 30, y - 35, 60, 50, "#e0c83d");

    // Cabeça
    retangulo(x - 30, y - 40, 60, 50, "#e0c83d");

    // Olhos
    retangulo(x - 20, y - 20, 10, 10, "#fff");
    retangulo(x + 10, y - 20, 10, 10, "#fff");

    retangulo(x - 17, y - 17, 5, 5, "#111");
    retangulo(x + 13, y - 17, 5, 5, "#111");

    // Bico
    retangulo(x - 15, y - 5, 30, 15, "#ed8c22");

    // Topo
    retangulo(x - 5, y - 45, 10, 8, "#e0c83d");

    // Babador
    retangulo(x - 25, y + 25, 50, 30, "#fff");
    texto("LET'S", x, y + 37, 9, "#333");
    texto("EAT!", x, y + 48, 9, "#333");

    // Braços
    retangulo(x - 40, y + 20, 15, 40, "#e0c83d");
    retangulo(x + 25, y + 20, 15, 40, "#e0c83d");

    // Pernas
    retangulo(x - 20, y + 70, 15, 25, "#ed8c22");
    retangulo(x + 5, y + 70, 15, 25, "#ed8c22");

    texto("CHICA", x, y + 110, 12, "#fff");
}

// ==========================================
// FOXY
// ==========================================

function desenharFoxy(x, y) {

    retangulo(x - 25, y + 10, 50, 65, "#9c3830");

    retangulo(x - 30, y - 35, 60, 50, "#9c3830");

    // Orelhas
    retangulo(x - 30, y - 60, 15, 30, "#9c3830");
    retangulo(x + 15, y - 60, 15, 30, "#9c3830");

    // Olho
    retangulo(x - 20, y - 20, 10, 10, "#fff");
    retangulo(x - 17, y - 17, 5, 5, "#111");

    // Olho danificado
    retangulo(x + 10, y - 20, 10, 10, "#222");

    // Focinho
    retangulo(x - 15, y - 5, 30, 15, "#b96e55");

    // Dentes
    retangulo(x - 10, y + 5, 5, 8, "#fff");
    retangulo(x, y + 5, 5, 8, "#fff");
    retangulo(x + 10, y + 5, 5, 8, "#fff");

    // Gancho
    retangulo(x + 25, y + 25, 10, 30, "#aaa");
    retangulo(x + 20, y + 50, 15, 10, "#aaa");

    // Braços
    retangulo(x - 40, y + 20, 15, 40, "#9c3830");

    // Pernas
    retangulo(x - 20, y + 70, 15, 25, "#9c3830");
    retangulo(x + 5, y + 70, 15, 25, "#9c3830");

    texto("FOXY", x, y + 110, 12, "#fff");
}

// ==========================================
// SALÃO
// ==========================================

function desenharSalao() {

    // Mesas
    desenharMesa(720, 430);
    desenharMesa(970, 430);
    desenharMesa(720, 600);
    desenharMesa(1120, 600);
    desenharMesa(760, 780);
    desenharMesa(1080, 780);

    // Balões
    desenharBalao(600, 350, "#e63939");
    desenharBalao(630, 350, "#e6c43a");
    desenharBalao(660, 350, "#3498db");

    desenharBalao(1150, 480, "#e63939");
    desenharBalao(1180, 480, "#e6c43a");

    // Caixas de pizza
    retangulo(560, 500, 60, 40, "#c58c42");
    texto("PIZZA", 590, 525, 10, "#333");

    retangulo(1160, 650, 60, 40, "#c58c42");
    texto("PIZZA", 1190, 675, 10, "#333");
}

function desenharMesa(x, y) {

    // Mesa
    ctx.beginPath();
    ctx.arc(x, y, 55, 0, Math.PI * 2);
    ctx.fillStyle = "#b77a3c";
    ctx.fill();

    ctx.strokeStyle = "#6b3c1d";
    ctx.lineWidth = 5;
    ctx.stroke();

    // Pizza
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fillStyle = "#d6a34c";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fillStyle = "#c84c32";
    ctx.fill();

    // Cadeiras
    retangulo(x - 80, y - 15, 25, 30, "#7b4928");
    retangulo(x + 55, y - 15, 25, 30, "#7b4928");
    retangulo(x - 15, y - 80, 30, 25, "#7b4928");
    retangulo(x - 15, y + 55, 30, 25, "#7b4928");
}

function desenharBalao(x, y, cor) {

    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fillStyle = cor;
    ctx.fill();

    retangulo(x - 2, y + 18, 4, 35, "#aaa");
}

// ==========================================
// ARCADE
// ==========================================

function desenharArcade() {

    retangulo(55, 825, 450, 350, "#29253d");

    // Piso
    for (let x = 60; x < 500; x += 40) {
        for (let y = 830; y < 1170; y += 40) {
            retangulo(x, y, 38, 38, "#37304e");
        }
    }

    // Máquinas
    desenharMaquina(120, 850, "#e33434");
    desenharMaquina(220, 850, "#32b8d4");
    desenharMaquina(320, 850, "#e5d334");
    desenharMaquina(420, 850, "#48b34b");

    texto("ARCADE", 270, 1150, 24, "#fff");
}

function desenharMaquina(x, y, cor) {

    retangulo(x, y, 65, 150, "#222");

    retangulo(x + 5, y + 5, 55, 55, cor);

    retangulo(x + 10, y + 10, 45, 45, "#111");

    texto("GAME", x + 32, y + 35, 10, "#fff");

    retangulo(x + 10, y + 75, 45, 30, "#555");

    ctx.beginPath();
    ctx.arc(x + 30, y + 120, 8, 0, Math.PI * 2);
    ctx.fillStyle = "#e33";
    ctx.fill();

    retangulo(x + 10, y + 135, 45, 10, "#777");
}

// ==========================================
// BANHEIROS
// ==========================================

function desenharBanheiros() {

    retangulo(1295, 825, 450, 350, "#514b55");

    // Piso
    for (let x = 1300; x < 1740; x += 40) {
        for (let y = 830; y < 1170; y += 40) {
            retangulo(x, y, 38, 38, "#68636c");
        }
    }

    // Pias
    desenharPia(1350, 850);
    desenharPia(1510, 850);

    // Espelhos
    retangulo(1350, 830, 100, 15, "#b7d8e2");
    retangulo(1510, 830, 100, 15, "#b7d8e2");

    // Cabines
    retangulo(1350, 1050, 120, 100, "#795c69");
    retangulo(1510, 1050, 120, 100, "#795c69");

    // Vasos
    desenharVaso(1400, 1100);
    desenharVaso(1560, 1100);

    texto("BANHEIROS", 1500, 1150, 20, "#fff");
}

function desenharPia(x, y) {

    retangulo(x, y, 100, 50, "#ddd");

    retangulo(x + 10, y + 10, 80, 30, "#9eb8c2");

    retangulo(x + 45, y - 15, 10, 20, "#aaa");
}

function desenharVaso(x, y) {

    retangulo(x - 15, y - 20, 30, 15, "#ddd");

    ctx.beginPath();
    ctx.ellipse(x, y, 20, 25, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#eee";
    ctx.fill();

    ctx.strokeStyle = "#aaa";
    ctx.stroke();
}

// ==========================================
// DEPÓSITO
// ==========================================

function desenharDeposito() {

    retangulo(625, 925, 550, 300, "#4c4034");

    // Caixas
    desenharCaixa(660, 960, 100, 90);
    desenharCaixa(850, 960, 100, 90);
    desenharCaixa(1030, 960, 100, 120);

    desenharCaixa(700, 1080, 80, 70);
    desenharCaixa(900, 1100, 100, 80);

    // Cabeça de animatrônico
    retangulo(820, 1150, 70, 60, "#777");

    retangulo(830, 1160, 15, 15, "#222");
    retangulo(865, 1160, 15, 15, "#222");

    texto("DEPÓSITO", 900, 1200, 20, "#fff");
}

function desenharCaixa(x, y, w, h) {

    retangulo(x, y, w, h, "#9c6938");

    ctx.strokeStyle = "#5b351a";
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, w, h);

    retangulo(x + w / 2 - 5, y, 10, h, "#bd905c");
}

// ==========================================
// DESENHAR PAREDES
// ==========================================

function desenharParedes() {

    for (let parede of paredes) {

        retangulo(
            parede.x,
            parede.y,
            parede.w,
            parede.h,
            "#201a17"
        );

        // Detalhe da parede
        retangulo(
            parede.x,
            parede.y,
            parede.w,
            5,
            "#80603c"
        );

    }
}

// ==========================================
// JOGADOR
// ==========================================

function desenharJogador() {

    let x = jogador.x;
    let y = jogador.y;

    // Pernas
    retangulo(x - 8, y + 5, 7, 12, "#292b48");
    retangulo(x + 1, y + 5, 7, 12, "#292b48");

    // Corpo
    retangulo(x - 10, y - 5, 20, 15, "#4673a8");

    // Camiseta listrada
    retangulo(x - 10, y - 3, 20, 4, "#ddd");
    retangulo(x - 10, y + 3, 20, 4, "#ddd");

    // Cabeça
    retangulo(x - 9, y - 20, 18, 17, "#e4b48d");

    // Cabelo
    retangulo(x - 11, y - 25, 22, 8, "#39251d");
    retangulo(x - 11, y - 20, 5, 10, "#39251d");
    retangulo(x + 6, y - 20, 5, 10, "#39251d");

    // Olhos
    retangulo(x - 5, y - 15, 3, 3, "#222");
    retangulo(x + 3, y - 15, 3, 3, "#222");

    // Lágrimas
    retangulo(x - 6, y - 12, 3, 6, "#69bde9");
    retangulo(x + 4, y - 12, 3, 6, "#69bde9");
}

// ==========================================
// DESENHAR OBJETOS
// ==========================================

function desenharObjetos() {

    for (let objeto of objetos) {

        ctx.fillStyle = "#f2c65d";
        ctx.font = "24px Arial";
        ctx.textAlign = "center";

        if (objeto.nome === "Pizza") {
            ctx.fillText("🍕", objeto.x, objeto.y);
        }

        if (objeto.nome === "Bilhete") {
            ctx.fillText("📄", objeto.x, objeto.y);
        }

        if (objeto.nome === "Presente") {
            ctx.fillText("🎁", objeto.x, objeto.y);
        }

        if (objeto.nome === "Mesa do segurança") {
            ctx.fillText("🖥️", objeto.x, objeto.y);
        }

        if (objeto.nome === "Câmeras") {
            ctx.fillText("📹", objeto.x, objeto.y);
        }

        if (objeto.nome === "Arcade") {
            ctx.fillText("🎮", objeto.x, objeto.y);
        }

        if (objeto.nome === "Armário") {
            ctx.fillText("📦", objeto.x, objeto.y);
        }

        if (objeto.nome === "Banheiro") {
            ctx.fillText("🚽", objeto.x, objeto.y);
        }

    }
}

// ==========================================
// MAPA COMPLETO
// ==========================================

function desenharMapa() {

    desenharChao();

    desenharCozinha();
    desenharSeguranca();
    desenharPalco();
    desenharSalao();
    desenharArcade();
    desenharBanheiros();
    desenharDeposito();

    desenharDecoracao();

    desenharParedes();

    desenharObjetos();

    desenharJogador();
}

// ==========================================
// COLISÃO
// ==========================================

function verificarColisao(x, y) {

    let tamanho = jogador.tamanho / 2;

    let personagem = {
        x: x - tamanho,
        y: y - tamanho,
        w: jogador.tamanho,
        h: jogador.tamanho
    };

    for (let parede of paredes) {

        if (
            personagem.x < parede.x + parede.w &&
            personagem.x + personagem.w > parede.x &&
            personagem.y < parede.y + parede.h &&
            personagem.y + personagem.h > parede.y
        ) {
            return true;
        }

    }

    for (let obstaculo of obstaculos) {

        if (
            personagem.x < obstaculo.x + obstaculo.w &&
            personagem.x + personagem.w > obstaculo.x &&
            personagem.y < obstaculo.y + obstaculo.h &&
            personagem.y + personagem.h > obstaculo.y
        ) {
            return true;
        }

    }

    return false;
}

// ==========================================
// MOVIMENTAÇÃO
// ==========================================

function movimentar() {

    let velocidade = jogador.velocidade;

    let dx = 0;
    let dy = 0;

    if (teclas["w"] || teclas["arrowup"]) {
        dy = -velocidade;
    }

    if (teclas["s"] || teclas["arrowdown"]) {
        dy = velocidade;
    }

    if (teclas["a"] || teclas["arrowleft"]) {
        dx = -velocidade;
    }

    if (teclas["d"] || teclas["arrowright"]) {
        dx = velocidade;
    }

    // Movimento horizontal
    if (!verificarColisao(jogador.x + dx, jogador.y)) {
        jogador.x += dx;
    }

    // Movimento vertical
    if (!verificarColisao(jogador.x, jogador.y + dy)) {
        jogador.y += dy;
    }

}

// ==========================================
// CÂMERA
// ==========================================

function atualizarCamera() {

    camera.x = jogador.x - canvas.width / 2;
    camera.y = jogador.y - canvas.height / 2;

    if (camera.x < 0) camera.x = 0;
    if (camera.y < 0) camera.y = 0;

    if (camera.x > larguraMapa - canvas.width) {
        camera.x = larguraMapa - canvas.width;
    }

    if (camera.y > alturaMapa - canvas.height) {
        camera.y = alturaMapa - canvas.height;
    }
}

// ==========================================
// INTERAÇÕES
// ==========================================

function interagir() {

    // Animatrônicos
    for (let animatronico of animatronicos) {

        let distancia = Math.hypot(
            jogador.x - animatronico.x,
            jogador.y - animatronico.y
        );

        if (distancia < 100) {

            mostrarInteracao(
                animatronico.nome,
                "Você está perto de " + animatronico.nome + ". Ele permanece parado no palco, observando a pizzaria."
            );

            return;
        }

    }

    // Objetos
    for (let objeto of objetos) {

        let distancia = Math.hypot(
            jogador.x - objeto.x,
            jogador.y - objeto.y
        );

        if (distancia < 65) {

            mostrarInteracao(
                objeto.nome,
                objeto.texto
            );

            return;
        }

    }

    // Cômodos
    if (jogador.x < 500 && jogador.y > 300 && jogador.y < 750) {
        mostrarInteracao(
            "Cozinha",
            "Você está na cozinha da pizzaria. O cheiro de pizza está por toda parte."
        );
        return;
    }

    if (jogador.x > 1270 && jogador.y > 300 && jogador.y < 750) {
        mostrarInteracao(
            "Sala de segurança",
            "Uma sala pequena com monitores, mesa, cadeira e um ventilador. É aqui que o segurança monitora a pizzaria."
        );
        return;
    }

    if (jogador.x < 500 && jogador.y > 800) {
        mostrarInteracao(
            "Arcade",
            "Máquinas de jogos estão espalhadas pela sala. Algumas ainda estão ligadas."
        );
        return;
    }

    if (jogador.x > 1270 && jogador.y > 800) {
        mostrarInteracao(
            "Banheiros",
            "Os banheiros da pizzaria. Há pias, espelhos e cabines."
        );
        return;
    }

    if (jogador.y > 900 && jogador.x > 600 && jogador.x < 1200) {
        mostrarInteracao(
            "Depósito",
            "Um depósito cheio de caixas e peças antigas."
        );
        return;
    }

    if (jogador.y < 280 && jogador.x > 600 && jogador.x < 1200) {
        mostrarInteracao(
            "Palco",
            "Os quatro animatrônicos estão no palco. Freddy, Bonnie, Chica e Foxy."
        );
        return;
    }

    mostrarInteracao(
        "Pizzaria",
        "Você está explorando a Freddy Fazbear's Pizza."
    );
}

// ==========================================
// MENSAGENS
// ==========================================

function atualizarMensagem() {

    let mensagem = "Explore a pizzaria...";

    for (let objeto of objetos) {

        let distancia = Math.hypot(
            jogador.x - objeto.x,
            jogador.y - objeto.y
        );

        if (distancia < 65) {
            mensagem = "Pressione E para interagir: " + objeto.nome;
            break;
        }

    }

    for (let animatronico of animatronicos) {

        let distancia = Math.hypot(
            jogador.x - animatronico.x,
            jogador.y - animatronico.y
        );

        if (distancia < 100) {
            mensagem = "Pressione E para examinar " + animatronico.nome;
        }

    }

    document.getElementById("mensagem").textContent = mensagem;
}

// ==========================================
// JANELA DE INTERAÇÃO
// ==========================================

function mostrarInteracao(titulo, mensagem) {

    document.getElementById("tituloInteracao").textContent = titulo;
    document.getElementById("textoInteracao").textContent = mensagem;

    document.getElementById("interacao").classList.remove("escondido");

}

function fecharInteracao() {

    document.getElementById("interacao").classList.add("escondido");

}

// ==========================================
// TECLADO
// ==========================================

document.addEventListener("keydown", function(event) {

    let tecla = event.key.toLowerCase();

    teclas[tecla] = true;

    if (event.key.startsWith("Arrow")) {
        event.preventDefault();
    }

    if (tecla === "e") {

        let janela = document.getElementById("interacao");

        if (!janela.classList.contains("escondido")) {
            fecharInteracao();
        } else {
            interagir();
        }

    }

});

document.addEventListener("keyup", function(event) {

    teclas[event.key.toLowerCase()] = false;

});

// ==========================================
// DESENHO PRINCIPAL
// ==========================================

function desenhar() {

    atualizarCamera();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    ctx.translate(-camera.x, -camera.y);

    desenharMapa();

    ctx.restore();

}

function loop() {

    if (jogoIniciado) {

        movimentar();

        atualizarMensagem();

        desenhar();

    }

    requestAnimationFrame(loop);

}

// ==========================================
// INICIAR
// ==========================================

function iniciarJogo() {

    document.getElementById("inicio").style.display = "none";

    document.getElementById("container").style.display = "flex";

    jogoIniciado = true;

    desenhar();

}

loop();
