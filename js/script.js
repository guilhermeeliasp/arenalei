// Dados de cartas
const itens = [
  { imagem: "download.jpg", 
    titulo: "Charizard VSTAR", 
    descricao: "Rara", 
    preco: "R$ 500", 
    estado: "NM" 
  },
  { imagem: "download.jpg", 
    titulo: "Pikachu Full Art", 
    descricao: "Comum", 
    preco: "R$ 280,00", 
    estado: "Usado - Excelente" 
  },
  { imagem: "download.jpg", 
    titulo: "Mewtwo GX", 
    descricao: "GX", 
    preco: "R$ 150,00", 
    estado: "Usado - Bom" 
  },
  { imagem: "download.jpg", 
    titulo: "Gengar V", 
    descricao: "V", 
    preco: "R$ 220,00", 
    estado: "Novo" 
  },
  { imagem: "download.jpg",
     titulo: "Blastoise EX", 
     descricao: "EX", 
     preco: "R$ 310,00", 
     estado: "Usado" 
    }
];

// Spoiler
const spoilerItens = [
  { imagem: "download.jpg", 
    titulo: "Carta Misteriosa", 
    descricao: "Rara - Exclusiva do leilão", 
    preco: "Surpresa!", 
    estado: "Nova" }
];

// Eventos
const eventos = [
  { data: "15/08/2025", 
    titulo: "Torneio de Sorocaba", 
    local: "Arena Sorocaba", 
    imagem: "download.jpg", 
    descricao: "Um torneio com as melhores cartas e premiações incríveis!" 
  },
  { data: "20/08/2025", 
    titulo: "Encontro de Colecionadores", 
    local: "Centro Pokémon", 
    imagem: "download.jpg", 
    descricao: "Trocas, vendas e novidades exclusivas para colecionadores." }
];

const cartasPorPagina = 4;
let paginaAtual = 1;

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

  const totalPaginas = Math.ceil(itensFiltrados.length / cartasPorPagina);
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
      <div class="card shadow-sm h-100">
        <img src="./img/${item.imagem}" class="card-img-top" alt="${item.titulo}">
        <div class="card-body">
          <h5 class="card-title">${item.titulo}</h5>
          <p class="card-text">${item.descricao}</p>
          <p><strong>Preço:</strong> ${item.preco}</p>
          <p><strong>Estado:</strong> ${item.estado}</p>
        </div>
      </div>
    `;

    col.querySelector(".card").addEventListener("click", () => abrirModal(item));
    row.appendChild(col);
  });

  catalogo.appendChild(row);

  // Paginação com primeira e última
  const primeira = document.createElement("li");
  primeira.className = `page-item ${paginaAtual === 1 ? "disabled" : ""}`;
  primeira.innerHTML = `<a class="page-link" href="#">« Primeira</a>`;
  primeira.addEventListener("click", e => {
    e.preventDefault();
    paginaAtual = 1;
    gerarCatalogo(filtroNome, filtroRaridade);
  });
  paginacao.appendChild(primeira);

  for (let i = 1; i <= totalPaginas; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === paginaAtual ? "active" : ""}`;
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.addEventListener("click", e => {
      e.preventDefault();
      paginaAtual = i;
      gerarCatalogo(filtroNome, filtroRaridade);
    });
    paginacao.appendChild(li);
  }

  const ultima = document.createElement("li");
  ultima.className = `page-item ${paginaAtual === totalPaginas ? "disabled" : ""}`;
  ultima.innerHTML = `<a class="page-link" href="#">Última »</a>`;
  ultima.addEventListener("click", e => {
    e.preventDefault();
    paginaAtual = totalPaginas;
    gerarCatalogo(filtroNome, filtroRaridade);
  });
  paginacao.appendChild(ultima);
}

function abrirModal(item) {
  document.getElementById("modalTitulo").textContent = item.titulo;
  document.getElementById("modalImagem").src = `./img/${item.imagem}`;
  document.getElementById("modalDescricao").textContent = item.descricao;
  document.getElementById("modalPreco").textContent = item.preco;
  document.getElementById("modalEstado").textContent = item.estado;
  new bootstrap.Modal(document.getElementById("modalCarta")).show();
}

function gerarSpoiler() {
  const spoiler = document.getElementById("spoilerCards");
  spoiler.innerHTML = "";
  spoilerItens.forEach(item => {
    spoiler.innerHTML += `
      <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="card shadow-sm h-100">
          <img src="./img/${item.imagem}" class="card-img-top">
          <div class="card-body">
            <h5>${item.titulo}</h5>
            <p>${item.descricao}</p>
            <p><strong>Preço:</strong> ${item.preco}</p>
            <p><strong>Estado:</strong> ${item.estado}</p>
          </div>
        </div>
      </div>
    `;
  });
}

function gerarEventos() {
  const tabela = document.getElementById("eventosTabela");
  tabela.innerHTML = "";
  eventos.forEach(ev => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${ev.data}</td>
      <td>${ev.titulo}</td>
      <td>${ev.local}</td>
      <td><img src="./img/${ev.imagem}" class="img-thumbnail" style="max-width: 100px; cursor:pointer"></td>
    `;
    tr.querySelector("img").addEventListener("click", () => abrirModalEvento(ev));
    tabela.appendChild(tr);
  });
}

function abrirModalEvento(ev) {
  document.getElementById("modalEventoTitulo").textContent = ev.titulo;
  document.getElementById("modalEventoImagem").src = `./img/${ev.imagem}`;
  document.getElementById("modalEventoDescricao").textContent = ev.descricao;
  document.getElementById("modalEventoData").textContent = ev.data;
  document.getElementById("modalEventoLocal").textContent = ev.local;
  new bootstrap.Modal(document.getElementById("modalEvento")).show();
}

// Botão topo
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.addEventListener("scroll", () => {
  document.getElementById("btnTopo").style.display = window.scrollY > 200 ? "block" : "none";
});

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
