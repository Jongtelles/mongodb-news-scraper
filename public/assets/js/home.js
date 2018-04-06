$(document).ready(function () {

    $('#scrape-btn').on('click', function () {
        event.preventDefault();
        $.get('/scrape', (data) => {

        });
    });

    $('.save-btn').on('click', function () {
        event.preventDefault();
        const headlineId = $(this).attr('data-id');
        $.ajax({
            method: "POST",
            url: `/headlines/${headlineId}`,
            data: {
                body:true
            }
        });
    });


});