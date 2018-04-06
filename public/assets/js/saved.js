$(document).ready(function () {

    $('.delete-btn').on('click', function () {
        event.preventDefault();
        const headlineId = $(this).attr('data-id')
        $.ajax({
            method: "POST",
            url: `/headlines/${headlineId}`,
            data: {
                body: false
            }
        })
    });


});