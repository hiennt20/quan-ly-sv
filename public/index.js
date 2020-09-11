/*
        đổ thông tin của học viên vào web,
        mỗi lần đều phải chạy lại server bằng lệnh cd fake...node.js, sau đó là npm install -> npm start trên git bash
        */
let studentId = 0;
let _currentPage = 1;
let _sortQ = "id";
let order = "desc";
let userLimitPerPage = 10;

$(function () {
  $.ajax({
    url: "https://hien-quan-ly-sv.herokuapp.com/users",
    method: "GET",
    context: document.body,
  }).done(function (users) {
    let htmlString = "";
    for (let user of users) {
      htmlString += `<tr id="tr-${user.id}">
                   <td>${user.name}</td>
                   <td>${user.birthday}</td>
                   <td>${user.email}</td>
                   <td>${user.phone}</td>
                   <td>
                       <a href="chinh-sua.html?id=${user.id}" class="edit">

                           <i class="fa fa-edit"></i>
                           chỉnh sửa
                       </a>|

                       <a href="#" class="remove"  onclick="thongBaoXoa(${user.id})">
                           <i class="fa fa-trash-alt"></i>
                           xóa

                       </a>

                   </td>
                   
               </tr>`;
    }
    $("tbody").html(htmlString);
    renderPageBtn(users);
    //    renderPage();
  });
});

// xóa thông tin học viên
//    gọi thông báo ra bằng js
function thongBaoXoa(id) {
  studentId = id;
  $("#exampleModal").modal("show");
}
function xacNhanXoa() {
  $.ajax({
    url: "https://hien-quan-ly-sv.herokuapp.com/users/" + studentId,
    method: "DELETE",
    // đến đây là đã dữ liệu trên database nhưng còn trang web thì cần reload lại mới nhìn thấy bị xóa
  }).done(function () {
    // cach1 : reload lai trang

    // console.log("Da xoa");
    // location.reload();

    // thay vì phải bấm nút reload thì lệnh này tạo cho trang web tự động reload

    // cach 2: dung dom xoa truc tiep
    // const getTrId = getElementById("tr-${user.id}");
    // getTrId.remove();
    let a = "#" + "tr-" + studentId;
    $(a).remove();
    $("#exampleModal").modal("hide");
  });
  // console.log(studentId);
}

/*ý tưởng phân trang
       render ra toàn bộ danh sách sinh viên
       tạo các nút phân trang tự động 123...
       render có giới hạn số lượng học viên tại từng trang là 10hv và onclick lên từng trang để hiện thị ra danh sách
       */

//    thêm nút hiển thị trang
function renderPageBtn(users) {
  for (let i = 1; i <= Math.ceil(users.length / userLimitPerPage); i++) {
    $("#page-indicator").append(
      `<button class="btn btn-secondary page-btn" onclick="changePage(this)">${i}</button>`
    );
  }
}
// nếu dùng .html() -> nó sẽ thay thế toàn bộ nội dung trước và chỉ hiển thị cái nội dung cuối cùng
// nếu dùng .append() -> giữa các dữ liệu phía trước và chỉ thêm vào phía sau

// render phần tử theo từng trang
function changePage(ele) {
  _currentPage = $(ele).text();
  $("tbody").html("");
  $.ajax({
    url:
      "https://hien-quan-ly-sv.herokuapp.com/users" +
      `?_page=${_currentPage}&_limit=${userLimitPerPage}`,
    method: "GET",
  }).done(function (user) {
    // console.log("done");
    for (let i = 0; i < user.length; i++) {
      $(".table").append(`<tr id="tr-${user[i].id}">
            <td>${user[i].name}</td>
            <td>${user[i].birthday}</td>
            <td>${user[i].email}</td>
            <td>${user[i].phone}</td>
            <td>
                <a href="chinh-sua.html?id=${user.id}" class="edit">
    
                    <i class="fa fa-edit"></i>
                    chỉnh sửa
                </a>|
    
                <a href="#" class="remove"  onclick="thongBaoXoa(${user.id})">
                    <i class="fa fa-trash-alt"></i>
                    xóa
    
                </a>
    
            </td>
            
        </tr>`);
    }
  });
}

/*
    function renderPage(page = 1) {
        $.ajax({
            method: 'GET',
            url: "https://hien-quan-ly-sv.herokuapp.com/users"+`?_page=${_currentPage}&_limit=${userLimitPerPage}&_sort=id&_order=desc`,
            success: function (users) {
                render(users);
            },
            complete: function () {
                $('.loader').hide();
            },
        });
    }
    
    function changePage(ele) {
        _currentPage = $(ele).text();
        $('tbody').html('');
        // $('.loader').show();
        // $('#page-indicator button').removeClass('active');
        // ele.classList.add('active');
        $.ajax({
            type: 'GET',
            url: "https://hien-quan-ly-sv.herokuapp.com/users"+`?_page=${_currentPage}&_limit=${userLimitPerPage}&_sort=id&_order=desc`,
            success: function (users) {
                render(users);
            },
            complete: function () {
                $('.loader').hide();
            },
        });
    }
    function render(users) {
        for (let user of users) {
            renderItem(user);
        }
    }
    
    function renderItem(obj) {
        for (let prop in obj) {
            if (!obj[prop]) {
                obj[prop] = 'Chưa biết';
            }
        }
        $('.table').append( `<tr id="tr-${user.id}">
        <td>${user.name}</td>
        <td>${user.birthday}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>
            <a href="chinh-sua.html?id=${user.id}" class="edit">

                <i class="fa fa-edit"></i>
                chỉnh sửa
            </a>|

            <a href="#" class="remove"  onclick="thongBaoXoa(${user.id})">
                <i class="fa fa-trash-alt"></i>
                xóa

            </a>

        </td>
        
    </tr>`);
    }
    */
