const URL = 'https://script.google.com/macros/s/AKfycbwxucYVikQgWU6pjc7Ix8VlEWOyFj9odSmCcNxWf8-4PgKB3HRpGO2WjuhakuVgc8C1/exec';

$(document).ready(function() {
	loadData();
});

function loadData(){
	let params = {};
	params.method = 'read1';

	$.post(URL, params, function(data){
        console.log(data);
        if(data.result == 'sus'){
            let userData = data.data;
            for(let i=0;i<userData.length;i++){
                let content = oneRow(i+1, userData[i]);
                $('tbody').append(content);
            }
        }else{

        }
	}).fail(function(data){

	});
}


function oneRow(n, man){
    let html = `
        <tr>
          <th scope="row">${n}</th>
          <td>${man.nickName}</td>
          <td>${man.animalName1}/${man.animalName2}</td>
          <td>${man.wallH1}/${man.wallM1}/${man.wallC1}</td>
          <td>${man.doorM1}/${man.doorD1}</td>
          <td>${man.wallH2}/${man.wallM2}/${man.wallC2}</td>
          <td>${man.doorM2}/${man.doorD2}</td>
          <td>${man.chairNum}/${man.doily}</td>
          <td>${man.hillD}/${man.hillSlope}</td>
        </tr>`;
    return html;
}