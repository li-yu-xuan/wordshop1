
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
$(function () {
    loadBookData();
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
    format: ["MM/dd/yyyy", "yyyy/MM/dd"],
});

$("#delivered_datepicker").kendoDatePicker({
    format: "yyyy-MM-dd",
});
});
//3位1撇
function moneyFormat() {
    str = $('#book_amount').val();
    console.log(str);
    if (isNaN(str)) {
        return NaN;
    }
    var glue = (typeof glue == 'string') ? glue : ',';
    var digits = str.toString().split('.');
    var integerDigits = digits[0].split("");
    var threeDigits = []; // 用來存放3個位數的陣列
    while (integerDigits.length > 3) {
        threeDigits.unshift(integerDigits.splice(integerDigits.length - 3, 3).join(""));
    }
    threeDigits.unshift(integerDigits.join(""));
    digits[0] = threeDigits.join(glue);
    return digits.join(".");
    var fi = digits.join(".");
    $('#book_amount').innerHTML = fi;

}
$(document).ready(function () {
    $("#book_category").change(function () {
        $(".book-image").attr("src", "image/" + $('#book_category').val() + ".jpg");
    });
});



function reset() {
    setTestData();
    $("#grid").data("kendoGrid").dataSource.read();
}

$(document).ready(function gridtable(options) {

    if (localStorage["bookData"] == undefined) {
        setTestData();
    }

    var dataSource = new kendo.data.DataSource({
        transport: {
            create: function (options) {
                console.log(options);
                var localData = JSON.parse(localStorage["bookData"]);
                options.data.BookId = localData[localData.length - 1].BookId + 1;
                localData.push(options.data);
                localStorage["bookData"] = JSON.stringify(localData);
                options.success(options.data);
            },
            read: function (options) {
                console.log(localStorage["bookData"])
                var localData = JSON.parse(localStorage["bookData"]);
                options.success(localData);

            },
            update: function (options) {
                var localData = JSON.parse(localStorage["bookData"]);

                for (var i = 0; i < localData.length; i++) {
                    if (localData[i].BookId == options.data.BookId) {
                        localData[i].BookName = options.data.BookName;
                        localData[i].BookCategory = options.data.BookCategory;
                        localData[i].BookAuthor = options.data.BookAuthor;
                        localData[i].BookBoughtDate = options.data.BookBoughtDate;
                        localData[i].BookDeliveredDate = options.data.BookDeliveredDate;
                        localData[i].BookPrice = options.data.BookPrice;
                        localData[i].BookAmount = options.data.BookAmount;
                        localData[i].BookTotal = options.data.BookTotal;
                    }
                }
                localStorage["bookData"] = JSON.stringify(localData);
                options.success(options.data);
            },
            destroy: function (options) {
                var localData = JSON.parse(localStorage["bookData"]);
                for (var i = 0; i < localData.length; i++) {
                    if (localData[i].BookId === options.data.BookId) {
                        localData.splice(i, 1);
                        break;
                    }
                }
                localStorage["bookData"] = JSON.stringify(localData);
                options.success(localData);
            },
            save: function (options) {
                if (options.values.name !== "") {
                    // the user changed the name field
                    if (options.values.name !== options.model.name) {
                        console.log("name is modified");
                        options.success(options.data);
                    }
                } else {
                    options.preventDefault();
                    console.log("name cannot be empty");
                }
            }
        },
        schema: {
            model: {
                id: "BookId",
                fields: {
                    BookId: { type: "number", editable: false },
                    BookName: { type: "string" },
                    BookCategory: { type: "string" },
                    BookAuthor: { type: "string" },
                    BookBoughtDate: { type: "string" },
                    BookDeliveredDate: {type: "string"},
                    BookPrice: { type: "number" },
                    BookAmount: { type: "number" },
                    BookTotal: { type: "number" }
                }
            }
        },
        pageSize: 20
    });

    var grid = $("#grid").kendoGrid({
        dataSource: dataSource,
        pageable: true,
        height: 800,
        ///toolbar: [" <label>我想要找.......</label>"],
        columns: [
            { command: "destroy", width: "130px" },
            { field: "BookId", width: "100px", title: "書籍編號" },
            { field: "BookName", width: "100px", title: "書籍名稱" },
            { field: "BookCategory", width: "100px", title: "書籍種類" },
            { field: "BookAuthor", width: "100px", title: "書籍作者" },
            { field: "BookBoughtDate", width: "100px", title: "購買日期" },
            {
              field: "BookDeliveredDate", width: "100px", title: "送達狀態", template: "#if(BookDeliveredDate!=null){#" + "<i class='fas fa-truck' title='#:kendo.toString(BookDeliveredDate,'yyyy-MM-dd')#'></i>" +
                    "#}#"},
            { field: "BookPrice", width: "100px", title: "金額" },
            { field: "BookAmount", width: "100px", title: "數量" },
            { field: "BookTotal", width: "100px", title: "總計" }

        ],
        editable: "incell",
    }).data("kendoGrid");
});

function addbook() {
    new_BookName = $('#book_name').val();
    new_BookCategory = $('#book_category').val();
    new_BookAuthor = $('#book_author').val();
    new_BookBoughtDate = $('#bought_datepicker').val();
    new_BookDeliveredDate = $('#delivered_datepicker').val();
    new_BookPrice = $('#book_price').val();
    new_BookAmount = $('#book_amount').val();
    new_BookTotal = $("#book_amount").val() * $("#book_price").val()

    var localData = JSON.parse(localStorage["bookData"]);
    new_BookId = localData.length + 1;
    console.log(new_BookId);
    var testData3 = [
        { BookId: new_BookId, BookName: new_BookName, BookCategory: new_BookCategory, BookAuthor: new_BookAuthor, BookBoughtDate: new_BookBoughtDate, BookDeliveredDate: new_BookDeliveredDate, BookPrice: new_BookPrice, BookAmount: new_BookAmount, BookTotal: new_BookTotal }
    ];


    localData = localData.concat(testData3);
    localStorage["bookData"] = JSON.stringify(localData);
    $("#grid").data("kendoGrid").dataSource.read();

    $("#dialog").data("kendoWindow").close();


}
$(document).ready(function () {
    function startChange() {
        var startDate = start.value(),
            endDate = end.value();

        if (startDate) {
            startDate = new Date(startDate);
            startDate.setDate(startDate.getDate());
            end.min(startDate);
        } else if (endDate) {
            start.max(new Date(endDate));
        } else {
            endDate = new Date();
            start.max(endDate);
            end.min(endDate);
        }
    }

    function endChange() {
        var endDate = end.value(),
            startDate = start.value();

        if (endDate) {
            endDate = new Date(endDate);
            endDate.setDate(endDate.getDate());
            start.max(endDate);
        } else if (startDate) {
            end.min(new Date(startDate));
        } else {
            endDate = new Date();
            start.max(endDate);
            end.min(endDate);
        }
    }

    var start = $("#bought_datepicker").kendoDatePicker({
        value: new Date(),
        change: startChange, format: "yyyy-MM-dd"
    }).data("kendoDatePicker");

    var end = $("#delivered_datepicker").kendoDatePicker({

        change: endChange, format: "yyyy-MM-dd"
    }).data("kendoDatePicker");

    start.max(end.value());
    end.min(start.value());
});
//3位1撇




////

$(function () {
    loadBookData();
});