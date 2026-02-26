const api = "http://localhost:8080/pessoas";

async function carregar() {
  try {
    const res = await fetch(api);
    const pessoas = await res.json();

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    pessoas.forEach(p => {
      lista.innerHTML += `
        <li>
          <span><strong>${p.nome}</strong> - ${p.email} - ${p.telefone}</span>
          <div>
            <button onclick="editar('${p._id}', '${p.nome}', '${p.email}', '${p.telefone}')">Editar</button>
            <button onclick="deletar('${p._id}')">Excluir</button>
          </div>
        </li>
      `;
    });
  } catch (error) {
    console.error("Erro ao carregar pessoas:", error);
  }
}

async function salvar() {
  const id = document.getElementById("id").value;
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;

  if (!nome || !email || !telefone) {
    alert("Preencha todos os campos!");
    return;
  }

  const dados = { nome, email, telefone };

  try {
    if (id) {
      // Atualizar
      await fetch(`${api}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });
    } else {
      // Criar novo
      await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });
    }

    limpar();
    carregar();
  } catch (error) {
    console.error("Erro ao salvar:", error);
  }
}

function editar(id, nome, email, telefone) {
  document.getElementById("id").value = id;
  document.getElementById("nome").value = nome;
  document.getElementById("email").value = email;
  document.getElementById("telefone").value = telefone;
}

async function deletar(id) {
  if (confirm("Deseja realmente excluir?")) {
    await fetch(`${api}/${id}`, { method: "DELETE" });
    carregar();
  }
}

function limpar() {
  document.getElementById("id").value = "";
  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
  document.getElementById("telefone").value = "";
}

function buscar() {
  const termo = document.getElementById("busca").value.toLowerCase();
  const itens = document.querySelectorAll("#lista li");

  itens.forEach(item => {
    const nomeTexto = item.querySelector("strong").innerText.toLowerCase();
    if (nomeTexto.includes(termo)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function validarDados(nome, email) {
  // Valida se o nome tem pelo menos 3 letras
  if (nome.length < 3) {
    alert("O nome deve ter pelo menos 3 caracteres.");
    return false;
  }
  // RegEx para validar formato de e-mail padrão
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Por favor, insira um e-mail válido.");
    return false;
  }
  return true;
}

carregar();