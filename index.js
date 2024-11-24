import express from "express";

const app = express();
const porta = 3000;
const host = "0.0.0.0";
var listaMusicas = [];

// Middleware para processar dados de formulários
app.use(express.urlencoded({ extended: true }));

function cadastroMusicaView(req, res) {
  res.send(`
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cadastro de Créditos de Música</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        </head>
        <body>
            <div class="container">
                <h2>Cadastro de Créditos de Música</h2>
                <form method="POST" action="/creditosMusica" id="contactForm" data-sb-form-api-token="API_TOKEN">
                    <div class="mb-3">
                        <label class="form-label" for="nomeDaMusica">Nome da música:</label>
                        <input class="form-control" name="nomeDaMusica" id="nomeDaMusica" type="text" placeholder="Nome da música:"  />
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="nomeDoCantor">Nome do cantor:</label>
                        <input class="form-control" name="nomeDoCantor" id="nomeDoCantor" type="text" placeholder="Nome do cantor:"  />
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="nomeDosCompositores">Nome dos compositores:</label>
                        <textarea class="form-control" name="nomeDosCompositores" id="nomeDosCompositores" placeholder="Nome dos compositores:" style="height: 250px;  width: 540px;" ></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="produzidoPor">Produzido por:</label>
                        <input class="form-control" name="produzidoPor" id="produzidoPor" type="text" placeholder="Produzido por:"  />
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="dataDoLancamento">Data do lançamento:</label>
                        <input class="form-control" name="dataDoLancamento" id="dataDoLancamento" type="text" placeholder="Data do lançamento:"  />
                    </div>
                    <div class="d-grid">
                        <button class="btn btn-primary btn-lg" id="submitButton" type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        </body>
        </html>
    `);
}

function cadastraMusica(req, res) {
  console.log(req.body); // Para depuração, verificar o conteúdo de req.body
  const nomeMusica = req.body.nomeDaMusica;
  const nomeCantor = req.body.nomeDoCantor;
  const nomeCompositores = req.body.nomeDosCompositores;
  const nomeProducao = req.body.produzidoPor;
  const data = req.body.dataDoLancamento;

  //validar campos
  //caso os dados não estiverem válidos nós deveremos retornar um feedback para o usuário

  if (nomeMusica && nomeCantor && nomeCompositores && nomeProducao && data) {
    //dados válidos
    const creditos = {
      nomeMusica,
      nomeCantor,
      nomeCompositores,
      nomeProducao,
      data,
    };
    listaMusicas.push(creditos);

    res.write(`
        <html>
            <head>
                <title>Lista de Músicas</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                <meta charset="utf-8">
            </head>
            <body>
            <div class="container">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nome da Música</th>
                        <th scope="col">Nome do Cantor</th>
                        <th scope="col">Nome dos Compositores</th>
                        <th scope="col">Produzido por</th>
                        <th scope="col">Data do Lançamento</th>
                    </tr>
                </thead>
                <tbody>`);

    for (var i = 0; i < listaMusicas.length; i++) {
      res.write(`<tr>
                                    <td>${listaMusicas[i].nomeMusica}</td>
                                    <td>${listaMusicas[i].nomeCantor}</td>
                                    <td>${listaMusicas[i].nomeCompositores}</td>
                                    <td>${listaMusicas[i].nomeProducao}</td>
                                    <td>${listaMusicas[i].data}</td>
                                </tr>`);
    }

    res.write(`</tbody> 
            </table>
            <a class="btn btn-primary" href="/creditosMusica">Continuar Cadastrando</a>
            <a class="btn btn-secondary" href="/">Voltar para o Menu</a>
            </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
    `);
  } //fim do if de validação
  else {
    //enviar o formulário contendo mensagem de validação
    res.write(`        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cadastro de Créditos de Música</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        </head>
        <body>
            <div class="container">
                <h2>Cadastro de Créditos de Música</h2>
                <form method="POST" action="/creditosMusica" id="contactForm" data-sb-form-api-token="API_TOKEN">
                    <div class="mb-3">
                        <label class="form-label" for="nomeDaMusica">Nome da música:</label>
                        <input class="form-control" name="nomeDaMusica" id="nomeDaMusica" type="text" placeholder="Nome da música:"  value="${nomeMusica}" />
                    `); // linha 26 desse cód
    if (!nomeMusica) {
      res.write(`
        <div class="alert alert-danger" role="alert">
             Por favor você deve informar o nome da música
        </div> `);
    }
    res.write(`</div>
          <div class="mb-3">
            <label class="form-label" for="nomeDoCantor">Nome do cantor:</label>
            <input class="form-control" name="nomeDoCantor" id="nomeDoCantor" type="text" placeholder="Nome do cantor:" value="${nomeCantor}" />
        `);
    if (!nomeCantor) {
      res.write(`
            <div class="alert alert-danger" role="alert">
                 Por favor você deve informar o nome do cantor 
            </div> `);
    }
    res.write(` </div>
                    <div class="mb-3">
                        <label class="form-label" for="nomeDosCompositores">Nome dos compositores:</label>
                        <textarea class="form-control" name="nomeDosCompositores" id="nomeDosCompositores" placeholder="Nome dos compositores:"  style="height: 250px;  width: 540px;" >${
                          nomeCompositores || ""
                        }</textarea>
        `);
    if (!nomeCompositores) {
      res.write(` <div class="alert alert-danger" role="alert">
                 Por favor você deve informar o nome dos compositores
            </div>`);
    }
    res.write(` </div>
                    <div class="mb-3">
                        <label class="form-label" for="produzidoPor">Produzido por:</label>
                        <input class="form-control" name="produzidoPor" id="produzidoPor" type="text" placeholder="Produzido por:" value="${nomeProducao}"  />
        `);
    if (!nomeProducao) {
      res.write(` <div class="alert alert-danger" role="alert">
            Por favor você deve informar o nome dos produtores
       </div>`);
    }
    res.write(`</div>
                    <div class="mb-3">
                        <label class="form-label" for="dataDoLancamento">Data do lançamento:</label>
                        <input class="form-control" name="dataDoLancamento" id="dataDoLancamento" type="text" placeholder="Data do lançamento:" value="${
                          data || ""
                        }" />`);
    if (!data) {
      res.write(`
                <div class="alert alert-danger" role="alert">
                 Por favor, informe a data de lançamento.
                 </div>`);
    }
    res.write(` </div>
        <div class="d-grid">
            <button class="btn btn-primary btn-lg" id="submitButton" type="submit">Enviar</button>
        </div>
    </form>
</div>
</body>
</html>`);
  }

  res.end();
}

function menuView(req, res) {
  res.send(`
        <html>
            <head>
                <title>Cadastro dos Créditos das Músicas</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
            <body>
                <nav class="navbar bg-body-tertiary">
                    <form class="container-fluid justify-content-start" onsubmit="event.preventDefault(); window.location.href='/creditosMusica';">
                        <button class="btn btn-outline-success me-2" type="submit">Cadastrar Música</button>
                    </form>
                </nav>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
    `);
}

app.get("/", menuView);
app.post("/creditosMusica", cadastraMusica);
app.get("/creditosMusica", cadastroMusicaView);
app.listen(porta, host, () => {
  console.log(
    `Servidor iniciado e em execução no endereço http://localhost:3000`
  );
});
