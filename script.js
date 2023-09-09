// https://github.com/cdnjs/cdnjs/blob/master/documents/api.md

var $form = $('form'),label="";

$form.on('submit', function(e) {
  e.preventDefault();
  sQuery = $form.find('input').val();
  searchCDN(sQuery);
});

function searchCDN(sQuery) {

  var html = "";

  $.ajax({
    url: '//api.cdnjs.com/libraries?&fields=version,description,homepage&search=' + sQuery, 
    data: {
      //fields: "version",
      //fields: "description"
    },
    json: "callback",
    dataType: "json",
    success: function(data) {

      //alert(JSON.stringify(data));
      //$("#result").html(JSON.stringify(data));
      console.log(data.results);
      $("#results").html(data.results);

      var data = data.results;

      $.each(data, function(i, result) {
      	name = data[i].name;
        latest = data[i].latest;
        description = data[i].description;
        homepage = data[i].homepage;
        version = data[i].version;
        
        html += '<li class="result '+cssjs(latest,"extOnly")+'">';
        html += '<strong>'+name+'</strong>';
        //html += '<strong><a target="_blank" href="https://www.google.com/search?q='+name+'+'+cssjs(latest,"extOnly")+'">'+name+'</a></strong>';
        html += cssjs(latest)+"</strong><br>";
        html += description+"<br>";
        html += '<span class="cssjsfile">'+latest+'</span>';
        html += '<br>Version: <strong>'+version+'</strong>';
        if (homepage !== null)
        html += '<br><strong><a target="_blank" href="'+homepage+'">'+name+' Home page</a></strong>';
        else
          html += '<br><strong><a target="_blank" href="https://www.google.com/search?q='+name+'+'+cssjs(latest,"extOnly")+'">Search: '+name+'</a></strong>';
        html += "</li>";
      });

      $("#results").html(html);

    },
    error: function(result) {
      alert("Sorry no data found.");
    }
  });

}

/************************/
function cssjs(cssjs, extOnly) {
	
  if(/\.css/i.test(cssjs)){
     ext = "CSS";
     cssjsclass = "info";
  } else {
     ext = "JS";
     cssjsclass = "warning";    
  }
  
  if(extOnly)
    return ext; // pull-right
  else
    return ' <span class="label label-'+cssjsclass+'">'+ext+'</span>'; // pull-right
   
}

/** FILTER **/ 
$("#filter button").each(function() {
  //var result = $('.results').find('.result');
    $(this).on("click", function(){
        var filtertag = $(this).attr('class');
        $('.result').show();
        $('.result:not(.' + filtertag + ')').hide();
    });
});