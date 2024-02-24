let close = document.querySelector(".close");

let icon = document.querySelector(".icon-card");
let body = document.querySelector("body");

let listaProdutosHtml = document.querySelector(".list-product");
let listCardHtml = document.querySelector(".list-card");
let iconCardSpan = document.querySelector(".icon-card span");
let listaProdutos = [];
let cards = [];
icon.addEventListener("click", () => {
  body.classList.toggle("showTab");
});

close.addEventListener("click", () => {
  body.classList.toggle("showTab");
});

const adicionaDadosNoHtml = () => {
  listaProdutosHtml.innerHTML = "";
  if (listaProdutos.length > 0) {
    listaProdutos.forEach((produto) => {
      let novoProduto = document.createElement("div");
      novoProduto.classList.add("item");
      novoProduto.dataset.id = produto.id;

      novoProduto.innerHTML = `
     
     <img src="${produto.imagem}" alt="">
           
     <h2>${produto.nome}</h2>
        <div class="price">R$ ${produto.preco}</div>
     <button class="addCard">Por no carrinho</button>
     
     `;
      listaProdutosHtml.appendChild(novoProduto);
    });
  }
};

listaProdutosHtml.addEventListener("click", (e) => {
  let posicaoClick = e.target;
  if (posicaoClick.classList.contains("addCard")) {
    let produto_id = posicaoClick.parentElement.dataset.id;
    adicionaNoCarrinho(produto_id);
  }
});

const adicionaNoCarrinho = (produto_id) => {
  let posicaoDoProdutoNoCard = cards.findIndex(
    (value) => value.produto_id == produto_id
  );
  if (cards.length <= 0) {
    cards = [
      {
        produto_id: produto_id,
        quantidade: 1,
      },
    ];
  } else if (posicaoDoProdutoNoCard < 0) {
    cards.push({
      produto_id: produto_id,
      quantidade: 1,
    });
  } else {
    cards[posicaoDoProdutoNoCard].quantidade += 1;
  }
  adicionaCarrinho();
  adicionaCardMemoria();
};
const adicionaCardMemoria = () => {
  localStorage.setItem("card", JSON.stringify(cards));
};
const adicionaCarrinho = () => {
  listCardHtml.innerHTML = "";
  let totalQuantidade = 0;
  if (cards.length > 0) {
    cards.forEach((card) => {
      totalQuantidade = totalQuantidade + card.quantidade;
      let novoCard = document.createElement("div");
      novoCard.classList.add("item");
      novoCard.dataset.id = card.produto_id;
      let posicaoProduto = listaProdutos.findIndex(
        (value) => value.id == card.produto_id
      );
      let info = listaProdutos[posicaoProduto];
      novoCard.innerHTML = `
      <div class="image">
      <img src="${info.imagem}" alt="">
    </div>
    <div class="name">
     ${info.nome}
    </div>
    <div class="total">
        ${(info.preco * card.quantidade).toFixed(2)}
    </div>
     <div class="qtd">
         <span class="menos"><i class="fa-solid fa-angle-left" style="color: #e68805;"></i></span>
         <span>${card.quantidade}</span>
         <span class="mais"><i class="fa-solid fa-angle-right" style="color:#e68805;"></i></span></span>
     </div>
      `;
      listCardHtml.appendChild(novoCard);
    });
  }

  iconCardSpan.innerText = totalQuantidade;
};

listCardHtml.addEventListener("click", (e) => {
  let posicaoClick = e.target;
  if (
    posicaoClick.classList.contains("menos") ||
    posicaoClick.classList.contains("mais")
  ) {
    let produto_id = posicaoClick.parentElement.parentElement.dataset.id;
    let type = "menos";
    if (posicaoClick.classList.contains("mais")) {
      type = "mais";
    }
    changeQnatidade(produto_id, type);
  }
});

const changeQnatidade = (produto_id, type) => {
  let posicaoItemInCard = cards.findIndex(
    (value) => (value.produto_id == value.produto_id));
    if(posicaoItemInCard >= 0){
      switch (type){
        case 'mais':
          cards[posicaoItemInCard].quantidade +=1;
          break;
        default:
          let valueChange   = cards[posicaoItemInCard].quantidade -1;

          if (valueChange > 0) {
            cards[posicaoItemInCard].quantidade = valueChange
          }else{
            cards.splice(posicaoItemInCard,1)
          }
          break;
      }
    }
    adicionaCardMemoria()
    adicionaCarrinho()
};

const initApp = () => {
  //pegar dados
  fetch("/produtos.json")
    .then((res) => res.json())
    .then((dados) => {
      listaProdutos = dados;

      adicionaDadosNoHtml();
      //pegar card da memoria

      if (localStorage.getItem("card")) {
        cards = JSON.parse(localStorage.getItem("card"));
        adicionaCarrinho();
      }
    });
};

initApp();
