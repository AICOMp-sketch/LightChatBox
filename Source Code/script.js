document.addEventListener('DOMContentLoaded', function() {
            const messagesContainer = document.getElementById('messages-container');
            const messageInput = document.getElementById('message-input');
            const sendButton = document.getElementById('send-button');
            const typingIndicator = document.getElementById('typing-indicator');
            
            // Scroll to bottom of messages
            function scrollToBottom() {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
            
            // Add a new message
            function addMessage(text, isOutgoing) {
                const now = new Date();
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const timeString = `${hours}:${minutes}`;
                
                const messageElement = document.createElement('div');
                messageElement.className = `message mb-4 flex ${isOutgoing ? 'justify-end' : ''}`;
                
                messageElement.innerHTML = `
                    ${!isOutgoing ? `
                    <div class="w-8 h-8 rounded-full overflow-hidden mr-2">
                        <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/77ee9758-0992-4960-a24c-5b4cf54286cc.png" alt="Chat bot avatar - friendly digital assistant with smile" class="w-full h-full object-cover">
                    </div>
                    ` : ''}
                    <div>
                        <div class="${isOutgoing ? 'bg-indigo-600 text-white rounded-t-2xl rounded-bl-2xl' : 'bg-gray-200 rounded-t-2xl rounded-br-2xl'} px-4 py-2 max-w-xs">
                            <p class="text-sm">${text}</p>
                        </div>
                        <p class="text-xs text-gray-500 mt-1 ${isOutgoing ? 'text-right' : ''}">${timeString}</p>
                    </div>
                    ${isOutgoing ? `
                    <div class="w-8 h-8 rounded-full overflow-hidden ml-2">
                        <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3264b763-4b2f-410d-883c-bf10a97d584e.png" alt="My profile photo - smiling person wearing casual clothes" class="w-full h-full object-cover">
                    </div>
                    ` : ''}
                `;
                
                messagesContainer.appendChild(messageElement);
                scrollToBottom();
            }
            
            // Handle sending a message
            function sendMessage() {
                const message = messageInput.value.trim();
                if (message) {
                    addMessage(message, true);
                    messageInput.value = '';
                    
                    // Show "typing" indicator
                    typingIndicator.style.opacity = '1';
                    
                    // Simulate response after delay
                    setTimeout(() => {
                        typingIndicator.style.opacity = '0';
                        const responses = [
                            "I understand your concern. Let me check that for you.",
                            "Thanks for your message! How can I assist you further?",
                            "Got it! One moment while I look that up...",
                            "I'm happy to help with that!"
                        ];
                        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                        addMessage(randomResponse, false);
                    }, 1500 + Math.random() * 2000);
                }
            }
            
            // Event listeners
            sendButton.addEventListener('click', sendMessage);
            messageInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
            
            // Initial scroll to bottom
            scrollToBottom();
        });
