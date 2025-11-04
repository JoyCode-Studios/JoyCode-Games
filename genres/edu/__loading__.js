pc.script.createLoadingScreen(function (app) {
    var showSplash = function () {
        // Create splash wrapper
        var wrapper = document.createElement('div');
        wrapper.id = 'application-splash-wrapper';
        document.body.appendChild(wrapper);

        // Create splash container
        var splash = document.createElement('div');
        splash.id = 'application-splash';
        wrapper.appendChild(splash);
        splash.style.display = 'none';

        // Add logo image
        var logo = document.createElement('img');
        logo.src = 'https://games.joycode.co.uk/firewise.png';
        splash.appendChild(logo);
        logo.onload = function () {
            splash.style.display = 'block';
        };

        // Create progress bar container
        var container = document.createElement('div');
        container.id = 'progress-bar-container';
        splash.appendChild(container);

        // Create progress bar
        var bar = document.createElement('div');
        bar.id = 'progress-bar';
        container.appendChild(bar);
    };

    var hideSplash = function () {
        var splash = document.getElementById('application-splash-wrapper');
        if (splash && splash.parentElement) {
            splash.parentElement.removeChild(splash);
        }
    };

    var setProgress = function (value) {
        var bar = document.getElementById('progress-bar');
        if (bar) {
            value = Math.min(1, Math.max(0, value));
            bar.style.width = (value * 100) + '%';
        }
    };

    var createCss = function () {
        var css = `
            body {
                background-color: #283538;
            }

            #application-splash-wrapper {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                background-color: #283538;
            }

            #application-splash {
                position: absolute;
                top: calc(50% - 28px);
                width: 264px;
                left: calc(50% - 132px);
            }

            #application-splash img {
                width: 100%;
            }

            #progress-bar-container {
                margin: 20px auto 0 auto;
                height: 2px;
                width: 100%;
                background-color: #1d292c;
            }

            #progress-bar {
                width: 0%;
                height: 100%;
                background-color: #f60;
            }

            @media (max-width: 480px) {
                #application-splash {
                    width: 170px;
                    left: calc(50% - 85px);
                }
            }
        `;

        var style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    };

    createCss();
    showSplash();

    app.on('preload:end', function () {
        app.off('preload:progress');
    });

    app.on('preload:progress', setProgress);
    app.on('start', hideSplash);
});