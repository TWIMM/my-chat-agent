class ChatService {
    constructor(robotImageUrl) {
        this.robotImageUrl = robotImageUrl;
        this.init();
    }

    // Initialize the chat by preloading the image and setting up the form submission
    init() {
        this.preloadImage();
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


    // Simulate sending the message to the server
    sendMessageToServer(message) {
        setTimeout(() => {
            this.addToLog(message, false);
        }, 2000);
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
}
