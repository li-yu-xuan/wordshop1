
var bookDataFromLocalStorage = [];
var bookCategoryList = [
    { text: "資料庫", value: "database", src: "image/database.jpg" },
    { text: "網際網路", value: "internet", src: "image/internet.jpg" },
    { text: "應用系統整合", value: "system", src: "image/system.jpg" },
    { text: "家庭保健", value: "home", src: "image/home.jpg" },
    { text: "語言", value: "language", src: "image/language.jpg" }
];

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
kendo.init($("#book_price"));
    
kendo.init($("#book_amount"));

$("#book_price").keyup(function () {
    $("#book_total").html($("#book_price").val() * $("#book_amount").val());
});
$("#book_amount").keyup(function () {
    $("#book_total").html($("#book_price").val() * $("#book_amount").val());
});


var currentDate = new Date();
var currentHour = currentDate.getHours();
var currentTimeStamp = currentDate.getTime();
if (currentHour >= 12) {
    currentTimeStamp += 86400000 * 2;//时间戳 往后推两天，毫秒
} else {
    currentTimeStamp += 86400000;//时间戳 往后推一天，毫秒
}
var minDate = new Date(currentTimeStamp);

// change事件
function onChange() {
    console.log("change-------->");
}


$("#bought_datepicker").kendoDatePicker({
    value: new Date(),
    culture: "zh-CN" ,
    format: "yyyy-MM-dd",
    change: onChange,     // 检测插件的变化函数
});


$("#delivered_datepicker").kendoDatePicker({
    value: new Date(),
    culture: "zh-CN",
    format: "yyyy-MM-dd",
    change: onChange,
});
    
// 校验用户手动输入的日期格式是否合法
var regDate = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
// 校验进场日期
vm.ifEnterDateValid = function () {
    $scope.moreDate = [];
    var strDate = $("#bought_datepicker").val();
    var endDate = $("#delivered_datepicker").val();
    if (!strDate || !endDate) {
        toaster.error({ title: "提示", body: "起始日期或结束日期不得为空！" });
        vm.dateValid = false;
    } else {
        if (!regDate.test(strDate) || !regDate.test(endDate)) {
            toaster.error({ title: "提示", body: "起始日期或结束日期格式非法，请修改为yyyy-MM-dd，例如：2018-03-16！" });
            vm.dateValid = false;
        } else {
            if (strDate + "" > endDate + "") {
                toaster.error({ title: "提示", body: "起始日期不能大于结束日期！" });
                vm.dateValid = false;
            } else {
                // 最小日期 从填表开始，未超过12点，第二个工作日；否则第三个工作日
                var currentDate = new Date();
                var currentHour = currentDate.getHours();
                var currentTimeStamp = currentDate.getTime();
                if (currentHour >= 12) {
                    currentTimeStamp += 86400000 * 2;
                } else {
                    currentTimeStamp += 86400000;
                }
                var minDate = new Date(currentTimeStamp);
                var minMonth = minDate.getMonth() + 1;
                minMonth = minMonth > 9 ? minMonth : '0' + minMonth;
                var minYMD = minDate.getFullYear() + '-' + minMonth + '-' + minDate.getDate();
                if (strDate + "" < minYMD + "" || endDate + "" < minYMD + "") {
                    toaster.error({ title: "提示", body: "自系统提交时间起，若未超过当日12点，起始日期从第二个工作日开始选；若超过当日12点，起始日期从第三个工作日开始选！" });
                    vm.dateValid = false;
                } else {
                    // 范围不得超过31天
                    var startTimeStamp = new Date(strDate).getTime();
                    var endTimeStamp = new Date(endDate).getTime();
                    var range = (endTimeStamp - startTimeStamp) / (24 * 60 * 60 * 1000);
                    if (range > 31) {
                        toaster.error({ title: "提示", body: "起始日期与结束日期不得超过31天！" });
                        vm.dateValid = false;
                    } else {
                        var pushDate = strDate + '~' + endDate;
                        //var moreDateStr = $scope.moreDate.join(",");
                        //if(moreDateStr.indexOf(pushDate) != '-1'){
                        //    toaster.error({title: "提示" , body: "该时间段已添加，请重新选择时间！"} );
                        //}else{
                        //    $scope.moreDate.push(pushDate);
                        //}
                        //$("#datepickerStar").val("");
                        //$("#datepickerEnd").val("");
                        $scope.moreDate.push(pushDate);
                    }
                }
            }
        }
    }

}             
$(function () {
    loadBookData();
});