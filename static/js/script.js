const areas = [
  'Trabalhista',
  'Previdenciário',
  'Consumidor',
  'Família e Sucessões',
  'Imobiliário',
  'Holdings',
  'Outro assunto'
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

function addOptions(options, callback) {
  const messagesDiv = document.getElementById('chatMessages');
  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'options-container';

  options.forEach(option => {
    const button = document.createElement('button');
    button.className = 'option-button';
    button.textContent = option;
    button.onclick = () => {
      addMessage(option, false);
      callback(option);
    };
    optionsContainer.appendChild(button);
  });

  messagesDiv.appendChild(optionsContainer);
  
  const lastMessage = optionsContainer.previousElementSibling;
  if (lastMessage) {
    const offsetPosition = lastMessage.offsetTop - 70; 
    messagesDiv.scrollTop = offsetPosition;
  }
}

function addMessage(message, isBot = true) {
  hideTypingIndicator();
  
  const messagesDiv = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${isBot ? 'bot-message' : 'user-message'}`;
  messageDiv.textContent = message;
  messagesDiv.appendChild(messageDiv);
  
  if (message === 'Selecione o assunto de sua questão:') {
    const offsetPosition = messageDiv.offsetTop - 20;
    messagesDiv.scrollTop = offsetPosition;
  } else {
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
}

function simulateTyping(message, callback) {
  showTypingIndicator();
  setTimeout(() => {
    hideTypingIndicator();
    callback();
  }, 1500);
}

function redirectToWhatsApp(area) {
  // Redirecionar com base na área selecionada
  switch(area) {
    case 'Trabalhista':
      window.location.href = 'https://api.whatsapp.com/send/?phone=5563992395560&text=Olá%2C+estou+interessado+em+Advogado+Especialista+em+Direito+Trabalhista&type=phone_number&app_absent=0';
      break;
    case 'Previdenciário':
      window.location.href = 'https://api.whatsapp.com/send/?phone=5563992395560&text=Olá%2C+estou+interessado+em+Advogado+Especialista+em+Direito+Previdenciário&type=phone_number&app_absent=0';
      break;
    case 'Consumidor':
      window.location.href = 'https://api.whatsapp.com/send/?phone=5563992395560&text=Olá%2C+estou+interessado+em+Advogado+Especialista+em+Direito+do+Consumidor&type=phone_number&app_absent=0';
      break;
    case 'Família e Sucessões':
      window.location.href = 'https://api.whatsapp.com/send/?phone=5563992395560&text=Olá%2C+estou+interessado+em+Advogado+Especialista+em+Direito+de+Família+e+Sucessões&type=phone_number&app_absent=0';
      break;
    case 'Imobiliário':
      window.location.href = 'https://api.whatsapp.com/send/?phone=5563992395560&text=Olá%2C+estou+interessado+em+Advogado+Especialista+em+Direito+Imobiliário&type=phone_number&app_absent=0';
      break;
    case 'Holdings':
      window.location.href = 'https://api.whatsapp.com/send/?phone=5563992395560&text=Olá%2C+estou+interessado+em+Advogado+Especialista+em+Holdings&type=phone_number&app_absent=0';
      break;
    case 'Outro assunto':
      window.location.href = 'https://api.whatsapp.com/send/?phone=5563992395560&text=Olá%2C+estou+interessado+em+consultar+um+Advogado+sobre+um+assunto+específico&type=phone_number&app_absent=0';
      break;
    default:
      // Caso padrão, se algo der errado
      addMessage('Desculpe, houve um erro. Por favor, tente novamente.');
  }
}

function handleAreaSelection(area) {
  selectedArea = area;
  currentStep = 'contact';
  
  simulateTyping('Por favor, aguarde enquanto conectamos você com um de nossos advogados especialistas.', () => {
    addMessage('Por favor, aguarde enquanto conectamos você com um de nossos advogados especialistas.');
    
    setTimeout(() => {
      redirectToWhatsApp(area);
    }, 1000);
  });
}

function init() {
  simulateTyping('Seja bem-vindo!', () => {
    addMessage('Seja bem-vindo ao escritório Vitorio & Wortmann!');
    setTimeout(() => {
      simulateTyping('Selecione o assunto de sua questão:', () => {
        addMessage('Selecione o assunto de sua questão:');
        addOptions(areas, handleAreaSelection);
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
