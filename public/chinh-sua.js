
      let getLink = new URLSearchParams(window.location.search);
let getId = getLink.get("id");

        $(function(){
            
            $.ajax({
                url: "https://hien-quan-ly-sv.herokuapp.com/users" + "/" + getId,
            context:document.body
            }).done(function(users){
                $("#name").val(users.name);
                $("#year").val(users.birthday);
                $("#email").val(users.email);
                $("#phone").val(users.phone);
               
            })
        })
        function capNhat(){
            $.ajax({
                url: "https://hien-quan-ly-sv.herokuapp.com/users" + "/" + getId,
                method: "PUT",
                data:{
                    "name": $("#name").val(),
                    "email": $("#email").val(),
                    "birthday": $("#year").val(),
                    "phone": $("#phone").val(),
                } 
            }).done(function(){
                window.location.href = "index.html";
            })
        }
