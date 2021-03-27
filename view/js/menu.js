function print_login_button() {
    $('<li><a href="index.php?page=controller_login&op=list">Login</a></li>').appendTo('.list_menu');
}

function check_if_login() {

    var token = localStorage.getItem('token');

    if (token) {

        ajaxPromise("module/login/controller/controller_login.php.?op=menu&tk="+token)

        .then(function(data_token) {
            data_token = JSON.parse(data_token);

            localStorage.setItem('user', data_token.username);

            $('<li class="dropdown white-text"><a><i class="fa fa-user" aria-hidden="true"></i></a></li>').attr('id', 'li_pro').appendTo('.list_menu');
            $('<ul class="dropdown-menu" id="ul_pro"></ul>').appendTo('#li_pro');
            $('<li><a><span id="img-user"></span></a></li>').appendTo('#ul_pro');
            $('<img class="img-responsive dropdown-toggle" data-toggle="dropdown" src="'+data_token.avatar+'">'+ data_token.username +'</img></span>').appendTo('#img-user');
            $('<li><a id="log_out">Logout</a></li>').appendTo('#ul_pro');
            
        })

        check_time();

    } else {
        print_login_button();
    }
}

function check_logout() {
    $(document).on("click", '#log_out', function() {
        logout();
    });
}

function check_time() {

    var tk = localStorage.getItem('token');

    ajaxPromise("module/login/controller/controller_login.php.?op=time&tk="+tk)

    .then(function(data_time) {
        data_time = JSON.parse(data_time);

        if (Math.floor(Date.now() / 1000) > data_time['exp']) {
            logout();
        }
        
    })

}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
}


$(document).ready(function() {
    check_if_login();
    check_logout();
});