
var bookDataFromLocalStorage = [];
var bookCategoryList = [
    { text: "資料庫", value: "database", src: "image/database.jpg" },
    { text: "網際網路", value: "internet", src: "image/internet.jpg" },
    { text: "應用系統整合", value: "system", src: "image/system.jpg" },
    { text: "家庭保健", value: "home", src: "image/home.jpg" },
    { text: "語言", value: "language", src: "image/language.jpg" }
];
//彈跳視窗
$("#add_book").click(function () {
    var myWindow = $("#window"),
        undo = $("#add_book");

    undo.click(function () {
        myWindow.data("kendoWindow").open();
        undo.fadeOut();
    });

    function onClose() {
        undo.fadeIn();
    }

    myWindow.kendoWindow({
        width: "700px",
        title: "新增書籍",
        visible: false,
        actions: [
            "Pin",
            "Minimize",
            "Maximize",
            "Close"
        ],
        close: onClose
    }).data("kendoWindow").center().open();
});


// 載入書籍資料
function loadBookData() {
    bookDataFromLocalStorage = JSON.parse(localStorage.getItem('bookData'));
    if (bookDataFromLocalStorage == null) {
        bookDataFromLocalStorage = bookData;
        localStorage.setItem('bookData', JSON.stringify(bookDataFromLocalStorage));
    }
}
//日期
$(function () {
    $("#datepicker").kendoDatePicker();
    });
$(function () {
    $("#bought_datepicker").kendoDatePicker();
});
$(function () {
    $("#delivered_datepicker").kendoDatePicker();
});
function changePic(img_link) { 
var a=document.getElementById('image');
    a.src=img_link;
}
//價錢
kendo.init($("#book_price"));
    
kendo.init($("#book_amount"));

$("#book_price").keyup(function () {
    $("#book_total").html($("#book_price").val() * $("#book_amount").val());
});
$("#book_amount").keyup(function () {
    $("#book_total").html($("#book_price").val() * $("#book_amount").val());
});
$(function () {
kendo.culture("zh-TW");
$("#bought_datepicker").kendoDatePicker({
    format: "yyyy-MM-dd",
});

$("#delivered_datepicker").kendoDatePicker({
    format: "yyyy-MM-dd",
});
});


           
$(function () {
    loadBookData();
});