var tagger = (function(){

  // Secrets "database" table
  var secrets = [];

  function tagsController(){

  }

  function makeClicksController(){
    console.log("Making clicks controller");

    var tagController = {
      names: ["Waldo", "Wizard", "Woof", "Wenda", "Wilma", "Odlaw", "Watcher"],
      tagMode: false,

      toggleTagMode: function(){
        this.tagMode = !this.tagMode;
      },

      handleClick: function(event){
        if (!this.tagMode) {
          this.toggleTagMode();
          console.log(this);
          var relPos = {
            x: event.pageX,
            y: event.pageY
          };
          this.buildSquare(relPos);
        }
        else
        {
          this.killEverything();
          this.toggleTagMode();
        };
      },

      // remove targeting box and menu
      killEverything: function(){
        $("#table").html("");
        $(".target").remove();
      },

      buildSquare: function(relPos){

        $(".container").append(
          $("<div></div>")
          .addClass("box")
          .addClass("target")
          .css("left",relPos.x)
          .css("top", relPos.y)
          );
        this.buildMenu(relPos);
      },

      handleButtonPress: function(){
        if($('.tagged').css("visibility") == "hidden"){
          $('.tagged').css('visibility','visible');
        }
        else
        {
          $('.tagged').css('visibility','hidden');
        }
      },

      // builds the menu, sets up the hover listener, sets up the click listener
      buildMenu: function(relPos){

        // Create the menu
        var targetWidth = parseInt($(".target").css("width"))+15;
        $("#table").html("");
        $("#table")
          .css("left", (parseInt(relPos.x) + targetWidth))
          .css("top", parseInt(relPos.y) - 8);
        this.names.forEach( function (name) {
          $("#table").append($("<li>"+name+"</li>"));
        });

        // Hover on the list listener
        $("li").hover(
          function(){
            $(this).addClass("hover");
          },
          function(){
            $(this).removeClass("hover");
          }
        );

        // Menu click listener
        $("li").click(function(event) {
          name = event.target.innerHTML;
          console.log(name);
          $('.target').append(name);
          $(".target")
            .removeClass("target")
            .addClass("tagged")
            .attr("name", name);
          $("#table").html("");
          this.tagMode = false;
        }.bind(this));
      }
    };
    return tagController;
  };

  return {
    makeClicksController: makeClicksController
  }
})();


// RUN SCRIPT (after page load)
$(function() {
  var cc = tagger.makeClicksController();
  $('#image').click(cc.handleClick.bind(cc));
  $('button').click(cc.handleButtonPress.bind(cc));
});