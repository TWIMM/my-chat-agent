
class ChatService {
    constructor(robotImageUrl) {
        this.robotImageUrl = robotImageUrl;
        this.init();
    }

    // Initialize the chat by preloading the image and setting up the form submission
    init() {
        this.preloadImage();
        this.getAiAgentListByUser();
        this.setupFormSubmitHandler();
    }

    // Preload the robot image
    preloadImage() {
        $('<img/>')[0].src = this.robotImageUrl;
    }


    setupFormSubmitHandler() {
        $('form').submit((event) => {
            event.preventDefault();

            console.log("Form submitted"); // Debug log

            var $userInput = $('form').find('input');
            var message = $userInput.val();
            console.log("User input:", message); // Debug log

            if (!_.isEmpty(message)) {
                console.log("Adding user message to log..."); // Debug log
                this.addToLog(message, true);
                this.sendMessageToServer(message);
            }

            $userInput.val('');
        });
    }


    /* // Simulate sending the message to the server
    sendMessageToServer(message) {
        setTimeout(() => {
            this.addToLog(message, false);
        }, 2000);
    } */

    sendMessageToServer(message) {
        const traintrigger = document.querySelector('#widgetselect');

        fetch('/ai-api/train_ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message, name: traintrigger.value }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.response) {
                    this.addToLog(data.response, false); // Display AI's response
                } else {
                    this.addToLog('No response from AI.', false);
                }
            })
            .catch((error) => {
                console.error('Error fetching AI response:', error);
                this.addToLog('Error communicating with AI.', false);
            });
    }


    // Add a message to the chat log
    addToLog(message, user) {
        var $message = $('<div class="message animated"></div>');

        if (!user) {
            var $picture = $('<img src="' + this.robotImageUrl + '"></img>');
            $message.append($picture);
        }

        var $content = $('<div class="content"></div>');
        $content.html(message);
        $message.append($content);

        var $log = $('.log');
        $log.append($message);

        if (user) {
            $message.addClass('user');
        }

        $log.animate({ scrollTop: $log[0].scrollHeight }, "slow", 'linear');

        setTimeout(() => {
            $message.css('opacity', 1); // Ensure visibility

            if (user) {
                $message.addClass('user');
                $message.addClass('fadeInRightBig');
            } else {
                $message.addClass('fadeInLeftBig');
            }
        }, 0);
    }


    async runInternHttpRequest() {
        const response = await fetch('/ai-api/train_ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: traintrigger.value
            })
        });


        if (response.ok) {
            const result = await response.json()
            if (result.success) {
                console.log(result.message);


            }
        }
    }


    async getAiAgentListByUser() {
        const response = await fetch('/ai-api/ai_agent', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });



        // Handle server response
        if (response.ok) {
            const result = await response.json();
            if (result.success) {
                const select = document.getElementById('widgetselect');


                Notiflix.Notify.success('Ai agent list retrieved successfully!');
                result.AiAgent.forEach(element => {
                    const option = document.createElement("option");
                    option.value = element.name;
                    option.textContent = element.name;
                    select.appendChild(option);
                });

                this.runInternHttpRequest();


            } else {
                Notiflix.Notify.success(result.message || 'Ai agent creation failed!');
            }
        } else {
            Notiflix.Notify.failure('An error occurred during Ai agent creation.');
        }
    }
}
