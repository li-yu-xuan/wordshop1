
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

$(document).ready(function () {
    $("#book_grid").kendoGrid({
        dataSource: {
            datatype:"json",
            schema: {
                model: {
                    fields: {
                        BookId: { type: "number" },
                        BookCategory: { type: "string" },
                        BookName: { type: "string" },
                        BookAuthor: { type: "string" },
                        BookBoughtDate: { type: "string" },
                        BookPublisher: { type: "string" },
                        BookDeliveredDate: { type: "string" },
                        BookPrice: { type: "number" },
                        BookAmount: { type: "number" },
                        BookTotal: { type: "number" }
                    }
                }
            },
            pageSize: 20
        },
        height: 600,
        weight:600,
        scrollable: true,
        sortable: true,
        filterable: true,
        pageable: {
            input: true,
            numeric: false
        },
        columns: [       
            { command: ["destroy"] },
            { field: "BookId", title: "書籍編號" },
            { field: "BookCategory", title: "書籍種類" },
            { field: "BookName", title: "書籍名稱" },
            { field: "BookAuthor", title: "書籍作者" },
            { field: "BookBoughtDate", title: "購買日期" },
            { field: "BookPublisher", title: "出版社"},
            { field: "BookDeliveredDate", title: "送達日期" },
            { field: "BookPrice", title: "書籍價錢" },
            { field: "BookAmount", title: "書籍數量"},
            { field: "BookTotal",title:"書籍總計" }
        ]
    });
    });

$(function () {
    loadBookData();
});