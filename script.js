// Loading Screen Control
document.addEventListener('DOMContentLoaded', function() {
	// Add loading class to body to prevent scroll
	document.body.classList.add('loading');
});

window.addEventListener('load', function() {
	const loadingScreen = document.getElementById('loading-screen');
	
	// Minimum loading time for better UX (2 seconds)
	setTimeout(function() {
		loadingScreen.classList.add('fade-out');
		
		// Remove loading screen from DOM after animation
		setTimeout(function() {
			loadingScreen.style.display = 'none';
			// Remove loading class from body to restore scroll
			document.body.classList.remove('loading');
		}, 800); // Match CSS transition duration
	}, 2000);
});

// Slow Motion Scroll Animation Controller
function initSlowScrollAnimations() {
	const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale-in, .animate-fade-in, .animate-stagger');
	
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				// Add a small delay for slow motion effect
				setTimeout(() => {
					entry.target.classList.add('visible');
				}, 200);
			}
		});
	}, {
		threshold: 0.15,
		rootMargin: '0px 0px -100px 0px'
	});
	
	animatedElements.forEach(element => {
		observer.observe(element);
	});
}

document.addEventListener('DOMContentLoaded',function(){
	// Force scroll to top on page load
	window.scrollTo(0, 0);
	
	// Initialize slow scroll animations
	initSlowScrollAnimations();
	
	const toggle=document.querySelector('.nav-toggle');
	const nav=document.querySelector('.nav');
	const header=document.querySelector('.site-header');
	const yearEl=document.getElementById('year');
	if(yearEl){yearEl.textContent=new Date().getFullYear();}
	if(toggle&&nav){
		toggle.addEventListener('click',function(){
			const isOpen=nav.classList.toggle('open');
			toggle.setAttribute('aria-expanded',String(isOpen));
		});
	}
	window.addEventListener('scroll',function(){
		if(window.scrollY>10){header.classList.add('header-solid');}
		else{header.classList.remove('header-solid');}
	});

	// Scroll spy: destaca link ativo do menu
	const links=[...document.querySelectorAll('.nav a[href^="#"]')];
	const sections=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
	const setActive=(id)=>{
		links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${id}`));
	};
	const observer=new IntersectionObserver((entries)=>{
		entries.forEach(entry=>{
			if(entry.isIntersecting){setActive(entry.target.id);} 
		});
	},{threshold:.6});
	sections.forEach(sec=>observer.observe(sec));

	// Enhanced Animation System with Intersection Observer
	const animateElements = document.querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale-in, .animate-fade-in, .animate-stagger');
	
	const animationObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				// Add a small delay before starting animation for more elegance
				setTimeout(() => {
					entry.target.classList.add('animate-in');
				}, 100);
				
				// For staggered animations, trigger children animations with longer delays
				if (entry.target.classList.contains('animate-stagger')) {
					const children = entry.target.children;
					Array.from(children).forEach((child, index) => {
						setTimeout(() => {
							child.style.opacity = '1';
							child.style.transform = 'translateY(0)';
						}, 200 + (index * 150)); // 200ms base delay + 150ms between each child
					});
				}
			}
		});
	}, {
		threshold: 0.15,
		rootMargin: '0px 0px -50px 0px'
	});

	// Observe all animation elements
	animateElements.forEach(el => {
		animationObserver.observe(el);
	});

	// Subtle scroll effects - removed parallax for better performance

	// Smooth reveal animation for content sections
	const contentSections = document.querySelectorAll('.content');
	const sectionObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('flash-arrive');
				setTimeout(() => {
					entry.target.classList.remove('flash-arrive');
				}, 900);
			}
		});
	}, {
		threshold: 0.3
	});

	contentSections.forEach(section => {
		sectionObserver.observe(section);
	});
});

// Ensure page always starts at top when loaded or refreshed
window.addEventListener('beforeunload', function() {
	window.scrollTo(0, 0);
});

// Additional safety measure for page load
window.addEventListener('load', function() {
	window.scrollTo(0, 0);
});

// ===========================================
// CHATBOT INTELIGENTE
// ===========================================

class Chatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.responses = {
            'servicos': {
                text: 'Nossos principais serviços incluem:\n\n🚛 Transporte Rodoviário\n📦 Armazenagem e Distribuição\n🌊 Logística Portuária\n🚢 Despacho Aduaneiro\n📋 Gestão de Estoque\n\nQual serviço te interessa mais?',
                actions: [
                    { text: '💰 Solicitar Orçamento', action: 'quote' },
                    { text: '📞 Falar com Vendedor', action: 'contact' }
                ]
            },
            'quote': {
                text: 'Perfeito! Para solicitar um orçamento, preciso de algumas informações:\n\n• Origem e destino\n• Tipo de carga\n• Peso e dimensões\n• Data de coleta\n\nVou te conectar com nosso comercial!',
                actions: [
                    { text: '📱 WhatsApp', action: 'whatsapp' },
                    { text: '📞 Telefone', action: 'phone' },
                    { text: '📧 E-mail', action: 'email' }
                ]
            },
            'contact': {
                text: 'Nossa equipe comercial está pronta para te atender!\n\n📞 (47) 3046-7300\n📱 WhatsApp: (47) 3046-7300\n📧 contato@logisticagg.com.br\n\nHorário: Seg-Sex 8h às 18h\n\n💼 **Nossos Comerciais:**\n• João Silva - Gerente Comercial\n• Maria Santos - Especialista em Logística\n• Pedro Costa - Consultor de Negócios\n\n🎯 **Especialidades:**\n• Transporte Rodoviário\n• Logística Portuária\n• Despacho Aduaneiro\n• Armazenagem',
                actions: [
                    { text: '📱 WhatsApp', action: 'whatsapp' },
                    { text: '📞 Ligar Agora', action: 'phone' },
                    { text: '👥 Falar com Comercial', action: 'comercial' }
                ]
            },
            'comercial': {
                text: 'Nossa equipe comercial especializada está pronta para te atender!\n\n👨‍💼 **João Silva - Gerente Comercial**\n• Especialista em grandes volumes\n• Experiência: 15 anos\n• WhatsApp: (47) 99999-0001\n\n👩‍💼 **Maria Santos - Especialista Logística**\n• Foco em e-commerce\n• Experiência: 10 anos\n• WhatsApp: (47) 99999-0002\n\n👨‍💻 **Pedro Costa - Consultor de Negócios**\n• Soluções personalizadas\n• Experiência: 8 anos\n• WhatsApp: (47) 99999-0003\n\nQual especialista você gostaria de falar?',
                actions: [
                    { text: '👨‍💼 João Silva', action: 'joao' },
                    { text: '👩‍💼 Maria Santos', action: 'maria' },
                    { text: '👨‍💻 Pedro Costa', action: 'pedro' }
                ]
            },
            'joao': {
                text: 'Conectando você com João Silva - Gerente Comercial...',
                action: 'redirect',
                url: 'https://wa.me/5547999990001?text=Olá%20João!%20Vim%20através%20do%20site%20da%20G&G%20Logística%20e%20gostaria%20de%20conversar%20sobre%20soluções%20logísticas%20para%20grandes%20volumes.'
            },
            'maria': {
                text: 'Conectando você com Maria Santos - Especialista em E-commerce...',
                action: 'redirect',
                url: 'https://wa.me/5547999990002?text=Olá%20Maria!%20Vim%20através%20do%20site%20da%20G&G%20Logística%20e%20preciso%20de%20ajuda%20com%20logística%20para%20e-commerce.'
            },
            'pedro': {
                text: 'Conectando você com Pedro Costa - Consultor de Negócios...',
                action: 'redirect',
                url: 'https://wa.me/5547999990003?text=Olá%20Pedro!%20Vim%20através%20do%20site%20da%20G&G%20Logística%20e%20gostaria%20de%20uma%20solução%20personalizada%20para%20minha%20empresa.'
            },
            'whatsapp': {
                text: 'Redirecionando para o WhatsApp...',
                action: 'redirect',
                url: 'https://wa.me/554730467300?text=Olá%20G&G%20Logística!%20Vim%20através%20do%20site%20e%20gostaria%20de%20um%20orçamento.'
            },
            'phone': {
                text: 'Ligando para nosso comercial...',
                action: 'redirect',
                url: 'tel:+554730467300'
            },
            'email': {
                text: 'Abrindo seu cliente de e-mail...',
                action: 'redirect',
                url: 'mailto:contato@logisticagg.com.br?subject=Orçamento%20Logístico'
            },
            'redes': {
                text: 'Siga-nos nas redes sociais e fique por dentro das novidades da G&G Logística!',
                actions: [
                    { text: '💼 LinkedIn', action: 'linkedin' },
                    { text: '📷 Instagram', action: 'instagram' },
                    { text: '👥 Facebook', action: 'facebook' },
                    { text: '📺 YouTube', action: 'youtube' }
                ]
            },
            'linkedin': {
                text: 'Conectando você com nosso LinkedIn...',
                action: 'redirect',
                url: 'https://www.linkedin.com/company/gg-logistica'
            },
            'instagram': {
                text: 'Abrindo nosso Instagram...',
                action: 'redirect',
                url: 'https://www.instagram.com/gglogistica'
            },
            'facebook': {
                text: 'Abrindo nosso Facebook...',
                action: 'redirect',
                url: 'https://www.facebook.com/gglogistica'
            },
            'youtube': {
                text: 'Abrindo nosso canal no YouTube...',
                action: 'redirect',
                url: 'https://www.youtube.com/@gglogistica'
            }
        };
        
        this.init();
    }
    
    init() {
        this.toggle = document.getElementById('chatbot-toggle');
        this.window = document.getElementById('chatbot-window');
        this.close = document.getElementById('chatbot-close');
        this.input = document.getElementById('chatbot-input');
        this.send = document.getElementById('chatbot-send');
        this.messagesContainer = document.getElementById('chatbot-messages');
        
        this.bindEvents();
    }
    
    bindEvents() {
        this.toggle.addEventListener('click', () => this.toggleChat());
        this.close.addEventListener('click', () => this.closeChat());
        this.send.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        // Botões de ação rápida
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-btn')) {
                const action = e.target.dataset.action;
                this.handleQuickAction(action);
            }
        });
    }
    
    toggleChat() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.window.classList.add('active');
            this.input.focus();
            // Remove badge quando abre
            const badge = document.querySelector('.chatbot-badge');
            if (badge) badge.style.display = 'none';
        } else {
            this.window.classList.remove('active');
        }
    }
    
    closeChat() {
        this.isOpen = false;
        this.window.classList.remove('active');
    }
    
    sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;
        
        this.addMessage(message, 'user');
        this.input.value = '';
        
        // Simula resposta do bot
        setTimeout(() => {
            this.handleUserMessage(message);
        }, 1000);
    }
    
    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = sender === 'bot' ? 
            '<img src="Img/Logo transparente gg.png" alt="G&G" />' :
            '<div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">U</div>';
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                ${avatar}
            </div>
            <div class="message-content">
                <p>${text.replace(/\n/g, '<br>')}</p>
            </div>
        `;
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    addQuickActions(actions) {
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'quick-actions';
        
        actions.forEach(action => {
            const button = document.createElement('button');
            button.className = 'quick-btn';
            button.textContent = action.text;
            button.dataset.action = action.action;
            actionsDiv.appendChild(button);
        });
        
        this.messagesContainer.appendChild(actionsDiv);
        this.scrollToBottom();
    }
    
    handleQuickAction(action) {
        const response = this.responses[action];
        if (!response) return;
        
        // Remove ações anteriores
        const existingActions = this.messagesContainer.querySelector('.quick-actions');
        if (existingActions) existingActions.remove();
        
        this.addMessage(response.text, 'bot');
        
        if (response.action === 'redirect' && response.url) {
            setTimeout(() => {
                window.open(response.url, '_blank');
            }, 1500);
        } else if (response.actions) {
            setTimeout(() => {
                this.addQuickActions(response.actions);
            }, 500);
        }
    }
    
    handleUserMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('serviço') || lowerMessage.includes('servicos')) {
            this.handleQuickAction('servicos');
        } else if (lowerMessage.includes('orçamento') || lowerMessage.includes('preço') || lowerMessage.includes('custo')) {
            this.handleQuickAction('quote');
        } else if (lowerMessage.includes('contato') || lowerMessage.includes('falar') || lowerMessage.includes('vendedor')) {
            this.handleQuickAction('contact');
        } else if (lowerMessage.includes('rede') || lowerMessage.includes('social') || lowerMessage.includes('instagram') || lowerMessage.includes('facebook') || lowerMessage.includes('linkedin') || lowerMessage.includes('youtube')) {
            this.handleQuickAction('redes');
        } else {
            this.addMessage('Desculpe, não entendi. Escolha uma das opções abaixo ou fale com nosso atendimento:', 'bot');
            setTimeout(() => {
                this.addQuickActions([
                    { text: '📦 Nossos Serviços', action: 'servicos' },
                    { text: '💰 Solicitar Orçamento', action: 'quote' },
                    { text: '📞 Falar com Vendedor', action: 'contact' },
                    { text: '📱 Redes Sociais', action: 'redes' }
                ]);
            }, 500);
        }
    }
    
    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Inicializa o chatbot quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    new Chatbot();
});

