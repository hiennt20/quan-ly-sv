//    thêm mới học viên

function luuHocVien(){
    $.ajax({
    url: "https://hien-quan-ly-sv.herokuapp.com/users",
    method: "POST",
    data:{
        name: $("#name").val(),
        email: $("#email").val(),
        birthday: $("#year").val(),
        phone: $("#phone").val(),
    }

});
}