$(document).ready(function(){
  if ($(window).width() > 900) {
     $("#chat-sidenav").removeClass("sidenav");
  }
  if ($(".sidebar-chat").length > 0) {
      var ps_sidebar_list = new PerfectScrollbar(".sidebar-chat", {
         theme: "dark"
      });
   }

   if ($("#sidebarchat").length > 0) {
       var ps_sidebar_chat = new PerfectScrollbar("#sidebarchat", {
          theme: "dark"
       });
    }

    $("#chat-sidenav").sidenav({
       onOpenStart: function() {
          $("#sidebar-list").addClass("sidebar-show");
       },
       onCloseEnd: function() {
          $("#sidebar-list").removeClass("sidebar-show");
       }
    });
});


$(window).on("resize", function() {
   if ($(window).width() > 899) {
      $("#chat-sidenav").removeClass("sidenav");
   }

  if ($(window).width() < 900) {
    $("#chat-sidenav").addClass("sidenav");
  }
});
