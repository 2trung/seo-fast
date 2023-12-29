// ==UserScript==
// @name         Seofast
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://seo-fast.ru/*
// @icon         https://seo-fast.ru/css/img/favicon.ico
// @downloadURL  https://github.com/2trung/seo-fast/raw/main/main.user.js
// @updateURL    https://github.com/2trung/seo-fast/raw/main/main.user.js
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    var code = `
    function generateTime(inputString) {
            const originalNumber = parseInt(inputString, 10);
            const resultNumber = originalNumber - 1;
            const resultString = resultNumber.toString();
            const randomDigits = Array.from({
                length: 15
            }, () => Math.floor(Math.random() * 10)).join('');
            const finalOutput = resultString + '.' + randomDigits;
            return finalOutput;
        }

        function viewCheck(originDomain, videoId, stage, timerInitial, reportId, taskId, hash) {
            let playerTime = generateTime(timerInitial);
            let playerState = stage;
            $.ajax({
                url: originDomain + '/statica/ajax/ajax-youtube-external.php',
                type: 'POST',
                data: {
                    'hash': hash,
                    'report_id': reportId,
                    'task_id': taskId,
                    'timer': timerInitial,
                    'player_time': playerTime,
                    'video_id': videoId,
                    'stage': stage,
                    'player_state': playerState
                },
                dataType: 'json',
            });
        }

        function start_youtube_view(id) {
            grecaptcha.ready(function() {
                grecaptcha.execute('6LfHYtkUAAAAAOaCxDIvcyIQ1ZgpzMGjS2M6FRn6', {
                    action: 'homepage'
                }).then(function(token) {
                    var url;
                    $.ajax({
                        type: "POST",
                        url: "/site_youtube/ajax/ajax_youtube_nobd.php",
                        data: {
                            'sf': 'start_youtube_view',
                            'id': id,
                            'token': token
                        },
                        success: function(res) {
                            var r = JSON.parse(res);
                            url = r.url;
                            if (r.success == true) {
                                let urlParams = new URLSearchParams(new URL(url).search);
                                let videoId = urlParams.get("video_id");
                                let timer = urlParams.get("timer");
                                let reportId = urlParams.get("report_id");
                                let taskId = urlParams.get("task_id");
                                let hash = urlParams.get("hash");
                                let stage = "1";
                                let originDomain = "https://seo-fast.top";
                                viewCheck(originDomain, videoId, stage, timer, reportId, taskId, hash);
                                window.open("https://www.youtube.com");
                            } else if (r.error) {
                                if (r.error == "off") {
                                    $('#youtube_v' + id).hide();
                                } else {
                                    if (url != null) {
                                        let urlParams = new URLSearchParams(new URL(url).search);
                                        let videoId = urlParams.get("video_id");
                                        let timer = urlParams.get("timer");
                                        let reportId = urlParams.get("report_id");
                                        let taskId = urlParams.get("task_id");
                                        let hash = urlParams.get("hash");
                                        let stage = "1";
                                        let originDomain = "https://seo-fast.top";
                                        viewCheck(originDomain, videoId, stage, timer, reportId, taskId, hash);
                                        window.open("https://www.youtube.com");
                                    }
                                    $('#res_views' + id).html("<div class='youtube_error' style='text-align: center;'>" + r.error + "</div>");
                                }
                            }
                        }
                    });
                });
            });
        }

    `;

    var script = document.createElement('script');
    script.textContent = code;
    document.body.appendChild(script);

})();
