const cities = [
    'Palmas',
    'Porto Nacional',
    'Paraíso do Tocantins',
    'Araguaina',
    'Outra Cidade'
  ];
  
  const areas = [
    'Trabalhista',
    'Previdenciário',
    'Consumidor',
    'Família e Sucessões',
    'Imobiliário',
    'Holdings',
    'Outro assunto/Não sei'
  ];
  
  let selectedCity = '';
  let selectedArea = '';
  let currentStep = 'welcome';
  let isTyping = false;
  
  function showTypingIndicator() {
    if (isTyping) return;
    
    isTyping = true;
    const messagesDiv = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typingIndicator';
    
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('div');
      dot.className = 'typing-dot';
      typingDiv.appendChild(dot);
    }
    
    messagesDiv.appendChild(typingDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
  
  function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
    isTyping = false;
  }
  
  function addMessage(message, isBot = true) {
    hideTypingIndicator();
    
    const messagesDiv = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isBot ? 'bot-message' : 'user-message'}`;
    messageDiv.textContent = message;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
  
  function addOptions(options, callback) {
    const messagesDiv = document.getElementById('chatMessages');
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'options-container';
  
    options.forEach(option => {
      const button = document.createElement('button');
      button.className = 'option-button';
      button.textContent = option;
      button.onclick = () => {
        // Primeiro, simula o usuário enviando a mensagem
        addMessage(option, false);
        // Depois processa a seleção
        callback(option);
      };
      optionsContainer.appendChild(button);
    });
  
    messagesDiv.appendChild(optionsContainer);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
  
  function simulateTyping(message, callback) {
    showTypingIndicator();
    setTimeout(() => {
      hideTypingIndicator();
      callback();
    }, 1500);
  }
  
  function handleCitySelection(city) {
    selectedCity = city;
    currentStep = 'area';
    
    simulateTyping('Selecione o assunto de sua questão:', () => {
      addMessage('Selecione o assunto de sua questão:');
      addOptions(areas, handleAreaSelection);
    });
  }
  
  function handleAreaSelection(area) {
    selectedArea = area;
    currentStep = 'contact';
    
    simulateTyping('Por favor, aguarde enquanto conectamos você com um de nossos advogados especialistas.', () => {
      addMessage('Por favor, aguarde enquanto conectamos você com um de nossos advogados especialistas.');
      setTimeout(() => {
        simulateTyping('Entre em contato agora', () => {
          addMessage('Entre em contato agora');
          addOptions(['Falar com o Advogado'], startChat);
        });
      }, 1000);
    });
  }
  
  function startChat() {
    simulateTyping('Conectando com advogado especialista...', () => {
      addMessage('Conectando com advogado especialista...');
    });
  }
  
  function init() {
    simulateTyping('Seja bem-vindo!', () => {
      addMessage('Seja bem-vindo!');
      setTimeout(() => {
        simulateTyping('Selecione a cidade em que você procura por advogado:', () => {
          addMessage('Selecione a cidade em que você procura por advogado:');
          addOptions(cities, handleCitySelection);
        });
      }, 500);
    });
  }
  
  function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message) {
      addMessage(message, false);
      input.value = '';
      simulateTyping('...', () => {
        // Aqui você implementaria a lógica de resposta do bot
      });
    }
  }
  
  // Inicializa o chat quando a página carrega
  window.onload = init;