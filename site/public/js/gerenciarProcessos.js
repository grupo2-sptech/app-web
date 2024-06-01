document.addEventListener('DOMContentLoaded', function() {
  listaProcessos(1); // Chame a função com um id_setor de exemplo
});

function listaProcessos(id_setor) {
  var cardRedeSocial = document.getElementById('cardRedeSocial');
  var cardPlataforma = document.getElementById('cardPlataforma');
  var cardStreaming = document.getElementById('cardStreaming');
  var cardNoticias = document.getElementById('cardNoticias');
  var cardJogos = document.getElementById('cardJogos');

  fetch(`/gerenciarProcessos/listaProcessos/${id_setor}`, {
      method: 'GET'
  })
  .then(function(resposta) {
      if (!resposta.ok) {
          console.log('Erro na requisição fetch: ', resposta);
          throw new Error('Network response was not ok');
      }
      return resposta.json();
  })
  .then(function(data) {
      data.forEach(function(pj) {
          var isChecked = pj.ativo ? 'checked' : '';
          var card;

          switch (pj.fk_categoria) {
              case 1:
                  card = cardRedeSocial;
                  break;
              case 2:
                  card = cardPlataforma;
                  break;
              case 3:
                  card = cardStreaming;
                  break;
              case 4:
                  card = cardNoticias;
                  break;
              case 5:
                  card = cardJogos;
                  break;
              default:
                  return; // Caso a categoria não seja reconhecida, ignore
          }

          card.innerHTML += `<div class="processo">
              <p style="margin-left: 5%;">${pj.titulo_processo}</p>
              <div class="switch__container">
                  <input id="switch-flat${pj.titulo_processo}" class="switch switch--flat" type="checkbox" ${isChecked}>
                  <label for="switch-flat${pj.titulo_processo}"></label>
              </div>
          </div>`;
      });
  })
  .catch(function(error) {
      console.error('Houve um problema com a solicitação fetch: ', error);
  });
}

function atualizaProcesso(id_setor, id_processo, ativo) {
  fetch(`/gerenciarProcessos/atualizaProcesso/${id_setor}/${id_processo}/${ativo}`, {
      method: 'PUT'
  })
  .then(function(resposta) {
      if (!resposta.ok) {
          console.log('Erro na requisição fetch: ', resposta);
          throw new Error('Network response was not ok');
      }
      return resposta.json();
  })
  .then(function(data) {
      console.log(data);
  })
  .catch(function(error) {
      console.error('Houve um problema com a solicitação fetch: ', error);
  });
}

