window.onload = function () {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggleSidebar");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });
  

  const nomeUsuario = "Fernanda";
  const hora = new Date().getHours();
  let saudacao = "Boa noite";

  if (hora >= 5 && hora < 12) saudacao = "Bom dia";
  else if (hora >= 12 && hora < 18) saudacao = "Boa tarde";

  const saudacaoEl = document.getElementById("saudacao");
  const projectNameEl = document.getElementById("projectName");
  const dashboards = document.querySelector(".dashboard");
  const projectDetails = document.getElementById("projectDetails");
  const stepsContainer = document.getElementById("projectSteps");
  const projectDescription = document.getElementById("projectDescription");

  saudacaoEl.innerText = `${saudacao}, ${nomeUsuario}!`;

  const searchInput = document.getElementById("searchInput");
  const listItems = document.querySelectorAll(".sidebar ul li");

  // Função para exibir os detalhes do projeto
  function showProjectDetails(projectName) {
    // Ocultar saudação e dashboard
    saudacaoEl.style.display = "none";
    dashboards.style.display = "none";

    // Mostrar título do projeto
    projectNameEl.textContent = projectName;
    projectNameEl.style.display = "block";

    // Mostrar detalhes
    projectDetails.style.display = "block";

    // Atualizar a descrição
    projectDescription.innerText = `Detalhes do projeto: ${projectName}`;
    const carouselImages = [
      "projeto_img1.png",
      "projeto_img2.png",
      "projeto_img3.png"
    ];
    let currentImageIndex = 0;
    
    const carouselImgEl = document.getElementById("carouselImage");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    
    function updateCarouselImage() {
      carouselImgEl.src = carouselImages[currentImageIndex];
    
      // Desabilitar botões nas extremidades
      prevBtn.disabled = currentImageIndex === 0;
      nextBtn.disabled = currentImageIndex === carouselImages.length - 1;
    }
    
    // Botão anterior
    prevBtn.addEventListener("click", () => {
      if (currentImageIndex > 0) {
        currentImageIndex--;
        updateCarouselImage();
      }
    });
    
    // Botão próximo
    nextBtn.addEventListener("click", () => {
      if (currentImageIndex < carouselImages.length - 1) {
        currentImageIndex++;
        updateCarouselImage();
      }
    });
    
    // Atualiza imagem ao abrir projeto
    updateCarouselImage();
    

    // Criar lista de etapas
    stepsContainer.innerHTML = "";  // Limpar etapas anteriores
    const etapas = [
      "Etapa 1", "Etapa 2", "Etapa 3", "Etapa 4", 
      "Etapa 5", "Etapa 6", "Etapa 7", "Etapa 8", "Etapa 9", "Etapa 10"
    ];
    etapas.forEach((etapa, index) => {
      const li = document.createElement("li");
      // Adicionar o nome da etapa
      li.innerHTML = `${etapa}`;
      // Criar o checkbox e adicionar no final
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("step-checkbox");
      checkbox.id = `step${index + 1}`;
      li.appendChild(checkbox);
      // Adicionar o item à lista
      stepsContainer.appendChild(li);
    });

    // Fechar sidebar ao abrir o projeto
    sidebar.classList.add("collapsed");
  }

  // Função para voltar para os dashboards
  function showDashboards() {
    saudacaoEl.style.display = "block";
    dashboards.style.display = "grid";
    projectDetails.style.display = "none";
    projectNameEl.style.display = "none";
  }

  // Adiciona evento de clique para cada projeto
  listItems.forEach(item => {
    item.addEventListener("click", () => {
      const projectName = item.textContent;
      showProjectDetails(projectName);
    });
  });

  // Clique na logo para voltar à home
  document.getElementById("logo").addEventListener("click", showDashboards);

  // Filtro de busca
  searchInput.addEventListener("keyup", function () {
    const filtro = this.value.toLowerCase();
    listItems.forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(filtro) ? "" : "none";
    });
  });

  // Gráfico de barras
  new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: ["Projeto 1", "Projeto 2", "Projeto 3", "Projeto 4", "Projeto 5"],
      datasets: [{
        label: "Dias de execução",
        data: [120, 90, 45, 30, 60],
        backgroundColor: "#1f4e3d",
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#12372A",
          titleColor: "#fff",
          bodyColor: "#fff",
          cornerRadius: 8
        }
      },
      scales: {
        x: {
          ticks: { color: "#12372A", font: { weight: "bold" } },
          grid: { display: false }
        },
        y: {
          beginAtZero: true,
          ticks: { color: "#12372A", font: { weight: "bold" } },
          grid: { color: "rgba(18, 55, 42, 0.1)" }
        }
      }
    }
  });

  // Gráfico de pizza
  new Chart(document.getElementById("pieChart"), {
    type: "doughnut",
    data: {
      labels: ["Finalizados", "Em andamento"],
      datasets: [{
        data: [14, 10],
        backgroundColor: ["#2e7d32", "#f9a825"],
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#ffffff"
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#12372A",
            font: { size: 14, weight: "bold" }
          }
        },
        tooltip: {
          backgroundColor: "#12372A",
          titleColor: "#fff",
          bodyColor: "#fff",
          cornerRadius: 8
        }
      },
      cutout: "65%"
    }
  });
};
