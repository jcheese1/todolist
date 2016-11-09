// main.js
var apiKey = "fYnymVzLceWH7zDuBl3jPUtiozsPKQRj";
var databaseName = "plaid-todolist";
var collectionName = "lists";

var totalURL = "https://api.mlab.com/api/1/databases/" + databaseName + "/collections/" + collectionName + "?apiKey=" + apiKey

$(function() {
  $('form').each(function(){
    $(this).find('input').keydown(function(e){
      if (e.which === 13) {
        this.form.submit();
      }
    });
  });

  $('div[class="list"]').each(function(index, item){
    var self = $(this);
    $.getJSON(totalURL, function(data){
      if (data[index].checked === "true") {
        self.find('input[type=checkbox]').attr('checked',true)
        self.find('span').css('textDecoration', 'line-through')
      }
      else if (data[index].checked === "false"){
        self.find('input[type=checkbox]').attr('checked',false)
        self.find('span').css('textDecoration', 'none')
      }
    })
  })

  $('div[class="list"]').each(function(index, item){
    var self = $(this);
    $.getJSON(totalURL, function(data){
      if (data[index].importance === "high") {
        self.css("border-left","15px solid orange")
      }
      else if (data[index].importance === "medium"){
        self.css("border-left","15px solid yellow")
      }
      else if (data[index].importance === "low") {
        self.css("border-left","15px solid green")
      }
    })
  })

  $("#high").on("click", function(){
    $('div[class="list"]').each(function(index, item){
      var self = $(this);
      $.getJSON(totalURL, function(data){
        if (data[index].importance !== "high") {
          self.css("display","none")
        }
        else if (data[index].importance === "high") {
          self.css("display","")
        }
      })
    })
  })

  $("#medium").on("click", function(){
    $('div[class="list"]').each(function(index, item){
      var self = $(this);
      $.getJSON(totalURL, function(data){
        if (data[index].importance !== "medium") {
          self.css("display","none")
        }
        else if (data[index].importance === "medium") {
          self.css("display","")
        }
      })
    })
  })

  $("#low").on("click", function(){
    $('div[class="list"]').each(function(index, item){
      var self = $(this);
      $.getJSON(totalURL, function(data){
        if (data[index].importance !== "low") {
          self.css("display","none")
        }
        else if (data[index].importance === "low") {
          self.css("display","")
        }
      })
    })
  })

  $("#all").on("click", function(){
    $('div[class="list"]').each(function(index, item){
      var self = $(this);
      self.css("display","");
    })
  })

  $(".delete").on("click", function() {
    fetch('add', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        '_id':$(this).closest("div").find('p').text() //here
      })
    })
    .then(data => {
    console.log(data)
    window.location.reload(true)
})
  })

  $(document).on('change', 'input:checkbox', function () {
        var input = $(this).next('span');
        if (this.checked) {
            $(input).css('textDecoration', 'line-through');
            fetch('add', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                '_id':$(this).parent().find('p').text(),
                'task':$(this).next('span').text(),
                'checked':"true"
              })
            })
        }
        else {
            $(input).css('textDecoration', 'none');
            fetch('add', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                '_id':$(this).parent().find('p').text(),
                'task':$(this).next('span').text(),
                'checked':"false"
              })
            })
        }
    })


});
