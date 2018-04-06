$(document).ready(function () {

    $('#scrape-btn').on('click', function () {
        event.preventDefault();
        $.get('/scrape', (data) => {

        });
    });

    $('.save-btn').on('click', function () {
        event.preventDefault();
        const headlineId = $(this).attr('data-id');
        $.post(`/headlines/${headlineId}/save`);
        $(this).parent().parent().empty();
    });


});