$(document).ready(function() {
    apod_load();
    $('.navbar-brand').click(function(){
        window.location.reload();
    });
    // $('#sumbit_picked_date').click(function() {
    //     var date_apod  = $('#picked_date').val();
    //     alert(date_apod);
    
    //     // Gửi yêu cầu AJAX đến tệp PHP
    //     var url = "http://127.0.0.1:8000/v1/apod/?concept_tags=True&date=" + date_apod;

    //     $.ajax({
    //         url: url,
    //         type: 'GET',
    //         success: function(response) {
    //             // Xử lý dữ liệu trả về từ API ở đây
    //             console.log(response);
    //         },
    //         error: function(xhr, status, error) {
    //             console.error(status, error);
    //         }
    //     });
    // });
    
    $('#apod_navbar').click(function(){
        apod_load();
        var apod_page = document.getElementById('mainpage_APOD');
        var eonet_page = document.getElementById('mainpage_EONET');
        eonet_page.style.display = "none";
        apod_page.style.display = "block";
    });
    $('#eonet_navbar').click(function(){
        var apod_page = document.getElementById('mainpage_APOD');
        var eonet_page = document.getElementById('mainpage_EONET');
        eonet_page.style.display = "block";
        apod_page.style.display = "none";
    });
    $('#prev_apod').click(function(){
        getprevAPOD();
        var next_apod = document.getElementById('next_apod');
        next_apod.style.display = "block";
    });
    $('#next_apod').click(function(){
        var currentDate = $('#date_post').text();
        getnextAPOD(currentDate);
    });

});
function apod_load(){
    var next_apod = document.getElementById('next_apod');
    next_apod.style.display = "none";
    $.ajax({
        type: "GET",
        url: "api/apiAPOD_getlastest.php",
        dataType: "json",
        success: function (response) {
            // Kiểm tra xem dữ liệu trả về từ API có tồn tại và hợp lệ không
            if (response && response[0]) {
                // Lấy dữ liệu từ response
                var author = response[0].copyright;
                var date = response[0].date.date.split(' ')[0];
                var title = response[0].title;
                var explanation = response[0].explanation;
                var imageUrl = response[0].hdurl;
                //var translate_explanation = response[0].translate_explanation;
        
                // Cập nhật nội dung của các phần tử HTML trong #img_apod
                $("#author").text(author);
                $("#date_post").text(date);
                $("#title_post").text(title);
                $("#explanation").text(explanation);
                $("#img_apod img").attr("src", imageUrl);
                //$("#explanation_translate").text(translate_explanation);
            } else {
                console.error("Dữ liệu trả về từ API không hợp lệ hoặc không tồn tại.");
            }
        },
        error: function(xhr, status, error) {
            // Xử lý lỗi nếu có
            console.error("Lỗi khi gửi yêu cầu AJAX: " + error);
        }
    });
}
function getprevAPOD(){
    $.ajax({
        type: "GET",
        url: "api/apiAPOD_getprev.php",
        dataType: "json",
        success: function (response) {
            // Kiểm tra xem dữ liệu trả về từ API có tồn tại và hợp lệ không
            if (response && response[0]) {
                // Lấy dữ liệu từ response
                var author = response[0].copyright;
                var date = response[0].date.date.split(' ')[0];
                var title = response[0].title;
                var explanation = response[0].explanation;
                var imageUrl = response[0].hdurl;
                //var translate_explanation = response[0].translate_explanation;
        
                // Cập nhật nội dung của các phần tử HTML trong #img_apod
                $("#author").text(author);
                $("#date_post").text(date);
                $("#title_post").text(title);
                $("#explanation").text(explanation);
                $("#img_apod img").attr("src", imageUrl);
                //$("#explanation_translate").text(translate_explanation);
            } else {
                console.error("Dữ liệu trả về từ API không hợp lệ hoặc không tồn tại.");
            }
        },
        error: function(xhr, status, error) {
            // Xử lý lỗi nếu có
            console.error("Lỗi khi gửi yêu cầu AJAX: " + error);
        }
    });
}
function getnextAPOD(currentDate){
    $.ajax({
        type: "GET",
        url: "api/apiAPOD_getnext.php",
        dataType: "json",
        data: { current_date: currentDate },
        success: function (response) {
            if (response && response[0]) {
                var author = response[0].copyright;
                var date = response[0].date.date.split(' ')[0];
                var title = response[0].title;
                var explanation = response[0].explanation;
                var imageUrl = response[0].hdurl;

                // Cập nhật nội dung trên trang web
                $("#author").text(author);
                $("#date_post").text(date);
                $("#title_post").text(title);
                $("#explanation").text(explanation);
                $("#img_apod img").attr("src", imageUrl);
            } else {
                console.error("Dữ liệu trả về từ API không hợp lệ hoặc không tồn tại.");
            }
        },
        error: function(xhr, status, error) {
            console.error("Lỗi khi gửi yêu cầu AJAX: " + error);
        }
    });
}