function cadastrarRegistro(url,nome,game,plataforma) {
    
    // Captura os valores do formulário
    var  url = document.getElementById("url").value;
    var  nome = document.getElementById("nome").value;    
    var  game =  document.getElementById("game").value;;
    var  plataforma = document.getElementById ("plataforma").value;
   
    
    // Cria um objeto com os dados a serem enviados
    var data = {
        url: url, 
        nome: nome,        
        game: game,
        plataforma: plataforma     
            
    };

    // Envia os dados para o servidor
    fetch ('http://localhost:8080/personagem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao cadastrar registro.');
            
        }
        return response.json();
    })
    .then(data => {
        console.log( 'Registro cadastrado com sucesso:', data);
        alert("Cadastro realizado com sucesso !")
        carregarPersonagens();
    })
    .catch(error => {
        console.error('Erro:', error);
    });
     
     document.getElementById("url").value = "";
     document.getElementById("nome").value ="";   
     document.getElementById("game").value ="";
     document.getElementById("plataforma").value ="";    
    
}
    function validarFormulario() { 
        
    var url = document.getElementById('url').value;    
    var nome = document.getElementById('nome').value;
    var game = document.getElementById('game').value;
    var plataforma = document.getElementById('plataforma').value;
   
   
    if (url === '') {
        alert('Por favor, preencha o campo Url.');
        return false;
    }
    

    if (nome === '') {
        alert('Por favor, preencha o campo Nome.');
        return false;
    }

    if (game === '') {
        alert('Por favor, preencha o campo Game.');
        return false;
    }

    if (plataforma === '') {
        alert('Por favor, preencha o campo Plataforma.');
        return false;
    }

    
    // Se a validação passar, você pode chamar a função para salvar os registros
     cadastrarRegistro(url,nome,game,plataforma);

    // Retorna true para permitir o envio do formulário após salvar os registros
    return true;
}

const cardContainer = document.getElementById("card-container");

// URL da API de exemplo (pode ser substituída por uma API real)
const API_URL = "http://localhost:8080/personagem";

// Função para buscar dados da API e renderizar os cards
async function  carregarPersonagens(){
    try {
        // Busca os dados da API
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Erro ao buscar dados da API.");
        }

        const personagens = await response.json();

        // Itera pelos dados e cria os cards
        personagens.forEach((personagem) => {
            const card = document.createElement("div");
            card.className = "card";
            const img = document.createElement("img");
           

            card.innerHTML = `
                <img src="${personagem.url}" alt="Imagem de ${personagem.url}">
               
                <div class="card-content">                
                    <h3>Nome</h3>
                    <p>${personagem.nome}</p>
                    <h3>Game</h3>
                    <p>${personagem.game}</p>
                    <h3>Plataforma</h3>
                    <p>${personagem.plataforma}</p>
                </div>
            `;

            cardContainer.appendChild(card);
            card.appendChild(img);
        });
    } catch (error) {
        console.error("Erro:", error);
        cardContainer.innerHTML = "<p>Erro ao carregar os dados. Tente novamente mais tarde.</p>";
    }
}

// Chama a função para carregar os usuários ao carregar a página


function mudarPagina() {
    // Substitua "https://www.exemplo.com" pelo URL da página para onde deseja redirecionar
    window.location.href = "http://127.0.0.1:5500/tabela.html";
    carregarPersonagens();
}

function volarPagina() {
    // Substitua "https://www.exemplo.com" pelo URL da página para onde deseja redirecionar
    window.location.href = "http://127.0.0.1:5500/index.html";
}

carregarPersonagens();