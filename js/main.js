
// js/main.js
// This file contains the JavaScript code for the news ticker functionality
let ticker = document.querySelector('.ticker');
let speed = 20; // default animation duration in seconds

function prevNews() {
    if (!ticker) return;
    ticker.style.animationPlayState = 'paused';
    if (ticker.lastElementChild && ticker.firstElementChild) {
        ticker.insertBefore(ticker.lastElementChild, ticker.firstElementChild);
    }
    ticker.style.animation = 'none';
    void ticker.offsetWidth; // trigger reflow
    ticker.style.animation = `ticker-slide ${speed}s linear infinite`;
}

function nextNews() {
    if (!ticker) return;
    ticker.style.animationPlayState = 'paused';
    if (ticker.firstElementChild) {
        ticker.appendChild(ticker.firstElementChild);
    }
    ticker.style.animation = 'none';
    void ticker.offsetWidth;
    ticker.style.animation = `ticker-slide ${speed}s linear infinite`;
}
// Event listeners for next and previous buttons
$(document).ready(function () {
    // Only show the search modal if the input is empty, otherwise allow form submit
    $('.search-button').click(function (event) {
        var input = $(this).closest('form').find('input[type="text"]').val();
        if (!input) {
            event.preventDefault();
            $('#searchModal').modal('show');
        }
    });
    // Handle the news ticker controls
    $('.next-news').click(function () {
        const $newsItems = $('.news-items');
        const $firstItem = $newsItems.find('.news-item:first');
        $firstItem.appendTo($newsItems);
    });
    $('.prev-news').click(function () {
        const $newsItems = $('.news-items');
        const $lastItem = $newsItems.find('.news-item:last');
        $lastItem.prependTo($newsItems);
    });
    // Pause the news ticker on hover
    $('.news-items').hover(function () {
        $(this).css('animation-play-state', 'paused');
    }, function () {
        $(this).css('animation-play-state', 'running');
    });
});

$(document).ready(function () {
    function showTab(tabId) {
        // সব ট্যাব কন্টেন্ট হাইড করে
        $('.tab-content').hide();

        // নির্দিষ্ট ট্যাব কন্টেন্ট দেখায়
        $('#' + tabId).show();

        // ট্যাব একটিভ ক্লাস পরিবর্তন করে
        $('.tab').removeClass('active');
        $('.tab[data-tab="' + tabId + '"]').addClass('active');
    }

    // প্রথম লোডে Latest ট্যাব দেখায়
    showTab('latest');

    // ট্যাব ক্লিকে কনটেন্ট পরিবর্তন
    $('.tab').on('click', function () {
        var tabId = $(this).data('tab');
        showTab(tabId);
    });

    // যদি নিউজে ক্লিক করলে কিছু করতে চান (যেমন অ্যালার্ট)
    $('.news-link').on('click', function () {
        var newsText = $(this).text().trim();
        alert('You clicked on: ' + newsText);
    });
});