$("#buscarLibro").click(function() {
    $("#tabla tbody").children().remove();
    var text = $("#textToSearch").val()
    console.log(text)
    $.get("http://localhost:3000/libros?text="+text, function(data, status){
        console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
        data.forEach(element => {
            
            var row = `<tr><td>${element.titulo}</td><td>${element.autor}</td><td>${element.editorial}</td><td>${element.fecha}</td></tr>`
            $('#tabla tbody').append(row)
        });
    });
}); 