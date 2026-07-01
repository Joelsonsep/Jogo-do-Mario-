const telaInicial = document.getElementById("telaInicial");
const botaoJogar = document.getElementById("botaoJogar");
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 600;

let jogoIniciado = false;

const jogador = {
  x: 80,
  y: 460,
  largura: 50,
  altura: 80,
  velocidade: 5,
  pulando: false,
  forcaPulo: 0
};

const princesa = {
  x: 1080,
  y: 440,
  largura: 50,
  altura: 80
};

const despertador = {
  x: 650,
  y: 480,
  raio: 35
};

let teclas = {};
let tempo = "08:55";

botaoJogar.addEventListener("click", iniciarJogo);

function iniciarJogo() {
  telaInicial.style.display = "none";
  canvas.style.display = "block";
  jogoIniciado = true;
  loop();
}

document.addEventListener("keydown", function(e) {
  teclas[e.key] = true;
});

document.addEventListener("keyup", function(e) {
  teclas[e.key] = false;
});

function atualizar() {
  if (teclas["ArrowRight"]) {
    jogador.x += jogador.velocidade;
  }

  if (teclas["ArrowLeft"]) {
    jogador.x -= jogador.velocidade;
  }

  if (teclas[" "] && !jogador.pulando) {
    jogador.pulando = true;
    jogador.forcaPulo = -18;
  }

  jogador.y += jogador.forcaPulo;
  jogador.forcaPulo += 1;

  if (jogador.y >= 460) {
    jogador.y = 460;
    jogador.pulando = false;
  }

  if (jogador.x + jogador.largura >= princesa.x) {
    alert("Você salvou a Princesa Rayaninha antes das 9h!");
    location.reload();
  }
}

function desenhar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // céu
  ctx.fillStyle = "#85cfff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // montanhas
  ctx.fillStyle = "#9d8bd6";
  ctx.beginPath();
  ctx.moveTo(0, 420);
  ctx.lineTo(250, 200);
  ctx.lineTo(500, 420);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(350, 420);
  ctx.lineTo(650, 180);
  ctx.lineTo(950, 420);
  ctx.fill();

  // chão
  ctx.fillStyle = "#4caf50";
  ctx.fillRect(0, 540, canvas.width, 60);

  // castelo
  ctx.fillStyle = "#ffb6d5";
  ctx.fillRect(1030, 320, 120, 220);

  ctx.fillStyle = "#c75c9a";
  ctx.fillRect(1050, 270, 35, 50);
  ctx.fillRect(1100, 270, 35, 50);

  // princesa Rayaninha
  ctx.fillStyle = "#ffd6e8";
  ctx.fillRect(princesa.x, princesa.y, princesa.largura, princesa.altura);

  ctx.fillStyle = "#f4c2c2";
  ctx.beginPath();
  ctx.arc(princesa.x + 25, princesa.y - 15, 25, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffd700";
  ctx.fillRect(princesa.x + 10, princesa.y - 50, 30, 15);

  // Joelson
  ctx.fillStyle = "#2d7d46";
  ctx.fillRect(jogador.x, jogador.y, jogador.largura, jogador.altura);

  ctx.fillStyle = "#f4c2a0";
  ctx.beginPath();
  ctx.arc(jogador.x + 25, jogador.y - 18, 24, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#5a3825";
  ctx.fillRect(jogador.x + 5, jogador.y - 45, 40, 20);

  // despertador chefão
  ctx.fillStyle = "#4b3b73";
  ctx.beginPath();
  ctx.arc(despertador.x, despertador.y, despertador.raio, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(despertador.x - 12, despertador.y - 5, 5, 0, Math.PI * 2);
  ctx.arc(despertador.x + 12, despertador.y - 5, 5, 0, Math.PI * 2);
  ctx.fill();

  // HUD
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText("⏰ " + tempo, 30, 50);
  ctx.fillText("Objetivo: salve Rayaninha antes das 9h!", 350, 50);
}

function loop() {
  if (!jogoIniciado) return;

  atualizar();
  desenhar();

  requestAnimationFrame(loop);
}
