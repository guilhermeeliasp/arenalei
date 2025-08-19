// ======================= Dados =======================
const itens = [
  { imagem: "download.jpg", titulo: "Charizard VSTAR", descricao: "Rara", preco: "R$ 500", estado: "NM" },
  { imagem: "download.jpg", titulo: "Pikachu Full Art", descricao: "Comum", preco: "R$ 280,00", estado: "Usado - Excelente" },
  { imagem: "download.jpg", titulo: "Mewtwo GX", descricao: "GX", preco: "R$ 150,00", estado: "Usado - Bom" },
  { imagem: "download.jpg", titulo: "Gengar V", descricao: "V", preco: "R$ 220,00", estado: "Novo" },
  { imagem: "download.jpg", titulo: "Blastoise EX", descricao: "EX", preco: "R$ 310,00", estado: "Usado" }
];

const spoilerItens = [
  { imagem: "download.jpg", titulo: "Carta Misteriosa", descricao: "Rara - Exclusiva do leilão", preco: "Surpresa!", estado: "Nova" }
];

const eventos = [
  { data: "15/08/2025", titulo: "Torneio de Sorocaba", local: "Arena Sorocaba", imagem: "download.jpg", descricao: "Um torneio com as melhores cartas e premiações incríveis!" },
  { data: "20/08/2025", titulo: "Encontro de Colecionadores", local: "Centro Pokémon", imagem: "download.jpg", descricao: "Trocas, vendas e novidades exclusivas para colecionadores." }
];

const cartasPorPagina = 4;
let paginaAtual = 1;

// ======================= Catálogo / Paginação =======================
function gerarCatalogo(filtroNome = "", filtroRaridade = "") {
  const catalogo = document.getElementById("catalogoCards");
  const paginacao = document.getElementById("paginacao");

  catalogo.innerHTML = "";
  paginacao.innerHTML = "";

  const itensFiltrados = itens.filter(item => {
    const nomeOk = item.titulo.toLowerCase().includes(filtroNome.toLowerCase());
    const raridadeOk = filtroRaridade === "" || item.descricao.toLowerCase().includes(filtroRaridade.toLowerCase());
    return nomeOk && raridadeOk;
  });

  const totalPaginas = Math.ceil(itensFiltrados.length / cartasPorPagina) || 1;
  if (paginaAtual > totalPaginas) paginaAtual = 1;

  const inicio = (paginaAtual - 1) * cartasPorPagina;
  const fim = inicio + cartasPorPagina;
  const itensPaginados = itensFiltrados.slice(inicio, fim);

  const row = document.createElement("div");
  row.className = "row g-4";

  if (itensPaginados.length === 0) {
    catalogo.innerHTML = `<p class="text-center">Nenhuma carta encontrada.</p>`;
    return;
  }

  itensPaginados.forEach(item => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-md-4 col-lg-3 carta";

    col.innerHTML = `
      <div class="card shadow-sm h-100" data-desc="${item.descricao}">
        <img src="./img/${item.imagem}" class="card-img-top" alt="${item.titulo}">
        <div class="card-body">
          <h5 class="card-title">${item.titulo}</h5>
          <p class="card-text">${item.descricao}</p>
          <p><strong>Preço:</strong> ${item.preco}</p>
          <p><strong>Estado:</strong> ${item.estado}</p>
          <a href="https://wa.me/5515998131672" target="_blank" class="btn btn-success w-100 mt-2 btn-contact">💬 Contatar Vendedor</a>
        </div>
      </div>
    `;

    // Abre modal custom ao clicar na carta
    col.querySelector(".card").addEventListener("click", () => openCardModal(item));

    // Evita abrir modal ao clicar no botão de contato
    col.querySelector(".btn-contact").addEventListener("click", (e) => e.stopPropagation());

    row.appendChild(col);
  });

  catalogo.appendChild(row);

  // Paginação
  const addPageItem = (label, active, disabled, onClick) => {
    const li = document.createElement("li");
    li.className = `page-item ${active ? "active" : ""} ${disabled ? "disabled" : ""}`;
    const a = document.createElement("a");
    a.className = "page-link";
    a.href = "#";
    a.textContent = label;
    a.addEventListener("click", e => { e.preventDefault(); onClick && onClick(); });
    li.appendChild(a);
    paginacao.appendChild(li);
  };

  addPageItem("« Primeira", false, paginaAtual === 1, () => { paginaAtual = 1; gerarCatalogo(filtroNome, filtroRaridade); });

  for (let i = 1; i <= totalPaginas; i++) {
    addPageItem(i, i === paginaAtual, false, () => { paginaAtual = i; gerarCatalogo(filtroNome, filtroRaridade); });
  }

  addPageItem("Última »", false, paginaAtual === totalPaginas, () => { paginaAtual = totalPaginas; gerarCatalogo(filtroNome, filtroRaridade); });
}

// ======================= Modal de Imagem/Descrição =======================
const modal = document.getElementById("cardModal");
const modalImg = document.getElementById("modalImg");
const modalDesc = document.getElementById("modalDesc");
const closeBtn = document.querySelector("#cardModal .close");

function openCardModal(item){
  modalImg.src = `./img/${item.imagem}`;
  modalDesc.innerHTML = `
    <div><strong>${item.titulo}</strong></div>
    <div>${item.descricao}</div>
    <div><strong style='latter-spacing:50px;'>Preço:</strong> ${item.preco} • <strong>Estado:</strong> ${item.estado}</div>
  `;
  modal.style.display = "block";
}

closeBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") modal.style.display = "none";
});

// ======================= Spoiler =======================
function gerarSpoiler() {
  const spoiler = document.getElementById("spoilerCards");
  spoiler.innerHTML = "";
  spoilerItens.forEach(item => {
    spoiler.innerHTML += `
      <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="card shadow-sm h-100" data-desc="${item.descricao}">
          <img src="./img/${item.imagem}" class="card-img-top" alt="${item.titulo}">
          <div class="card-body">
            <h5 class="card-title">${item.titulo}</h5>
            <p class="card-text">${item.descricao}</p>
            <p><strong>Preço:</strong> ${item.preco}</p>
            <p><strong>Estado:</strong> ${item.estado}</p>
          </div>
        </div>
      </div>
    `;
  });

  // Permite ampliar imagem de spoilers também
  spoiler.querySelectorAll(".card").forEach((card, idx) => {
    card.addEventListener("click", () => openCardModal(spoilerItens[idx]));
  });
}

// ======================= Eventos =======================
function gerarEventos() {
  const tabela = document.getElementById("eventosTabela");
  tabela.innerHTML = "";
  eventos.forEach(ev => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${ev.data}</td>
      <td>${ev.titulo}</td>
      <td>${ev.local}</td>
      <td><img src="./img/${ev.imagem}" class="img-thumbnail" style="max-width: 100px; cursor:pointer" alt="${ev.titulo}"></td>
    `;
    tr.querySelector("img").addEventListener("click", () => openCardModal({
      imagem: ev.imagem,
      titulo: ev.titulo,
      descricao: ev.descricao,
      preco: "",
      estado: `Data: ${ev.data} • Local: ${ev.local}`
    }));
    tabela.appendChild(tr);
  });
}

// ======================= Botão Topo =======================
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.addEventListener("scroll", () => {
  document.getElementById("btnTopo").style.display = window.scrollY > 200 ? "block" : "none";
});
document.getElementById("btnTopo").addEventListener("click", scrollToTop);

// ======================= Fundo Animado (Partículas) =======================
const canvas = document.getElementById("fundoAnimado");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particulas = [];

class Particula {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 1.2;
    this.vy = (Math.random() - 0.5) * 1.2;
    this.size = Math.random() * 2 + 1;
    this.hue = 280; // roxo
  }
  desenhar() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, 0.70)`;
    ctx.fill();
  }
  atualizar() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    this.desenhar();
  }
}

function iniciarParticulas(qtd = 120) {
  particulas = [];
  for (let i = 0; i < qtd; i++) particulas.push(new Particula());
}
function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particulas.forEach(p => p.atualizar());
  requestAnimationFrame(animar);
}
iniciarParticulas();
animar();

// ======================= Listeners de filtro/pesquisa =======================
document.addEventListener("DOMContentLoaded", () => {
  gerarCatalogo();
  gerarSpoiler();
  gerarEventos();

  document.getElementById("pesquisa").addEventListener("input", e => {
    paginaAtual = 1;
    gerarCatalogo(e.target.value, document.getElementById("filtroRaridade").value);
  });

  document.getElementById("filtroRaridade").addEventListener("change", e => {
    paginaAtual = 1;
    gerarCatalogo(document.getElementById("pesquisa").value, e.target.value);
  });
});
