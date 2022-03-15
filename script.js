function makeApiCall(page){
	var keyword = document.getElementById('user_input').value;
	console.log(document.getElementById('user_input').value); // for debug using
	var url = 'http://universities.hipolabs.com/search?name='+ keyword;
	$.ajax({url: url, dataType: "json"}).then(function(university) {
		console.log(university)
		for (var i = 0; i < 30; i++) {
			console.log(university[i].name)
			var uuid = university[i].name;
			document.getElementById('universitycard').innerHTML +=
            `<div class="card" style="width: 30%;">
            	<div class="card-body">
            	<h5 class="card-title" id = "universityinfo" >${university[i].name}</h5>
            		<p class="card-text"> ${university[i].country} </p>
            		<a href="${university[i].web_pages}" class="btn btn-warning">University Website</a>
            		<br></br>
            		<button type="button" class="btn btn-primary" onclick="universityName='${university[i].name}'" id = "${university[i].name}" value = "${university[i].name}"  data-toggle="modal" data-target="#exampleModal">Add Review</button>
            	</div>
            </div>`
        }

  	})
}
function clearpage(){ //refresh page when click the submit
	document.getElementById('universitycard').innerHTML="";
}
function clearreview(){
    $("#reviewinput").val(''); // clear text
}

$(document).ready(function() {
    $("#user_input").val(''); //clear text
    $("#reviewinput").val('');// clear text
    $('#exampleModal').on('show.bs.modal', function(event) {
        $("#universitynameinput").val(universityName);
    });
});