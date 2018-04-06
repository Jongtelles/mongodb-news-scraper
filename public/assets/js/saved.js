$(document).ready(function () {

    $('.delete-btn').on('click', function () {
        event.preventDefault();
        const headlineId = $(this).attr('data-id');
        $.post(`/headlines/${headlineId}/remove`);
    });


});