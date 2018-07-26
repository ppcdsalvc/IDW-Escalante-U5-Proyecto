$(function(){
    $('#tbNoticia').DataTable({
      
      language: {
        url:"http://cdn.datatables.net/plug-ins/1.10.12/i18n/Spanish.json"

    },
    responsive:true, 

      ajax:{
        url:"http://localhost:3002/usuarios/v1/noticia/",
        dataSrc: function(datos){
          
          console.log(datos.noticia);
          return datos.noticia;
        }
      },
      columns:[
        {
          data:"titulo"
        },
        {
          data:"autor"
        },
        {
          data:"nota"
          },
          {
            data:"fecha"
          },
          {
            data:"activo"
          },
          {
              targets:6,
              data:"foto",
              render:function(data){
                  return '<img height = "100" width = "100" src = "'+ data +'" /> '; 
              }
          },
          {
            data: function(row){
              console.log(row._id)
              var res = `<button id="btnBorrar" class="btn btn-danger btn-xs"
              onclick="borrar('${row._id}')">
              Eliminar
              </button>`;
              return res
            }
          }
      ]
    });
});

function guardar(){
    var titulo = $('#txtTitulo').val(); 
    var autor = $('#txtAutor').val();
    var nota = $('#txtNota').val();
    var fecha = $('#txtFecha').val();
    var activo = $('#txtActivo').val();
    var foto = $('#txtFoto').val();

    console.log(titulo);
    console.log(autor);
    console.log(nota);
    console.log(fecha);
    console.log(activo);
    console.log(foto);

    $.ajax(
      {
        url:"http://localhost:3002/usuarios/v1/noticia/",
        type:"POST",
        data:{
          titulo:titulo,
          autor:autor,
          nota:nota,
          fecha:fecha,
          activo:activo,
          foto:foto
        }
      }
    )
    .done(
      function(data){
        alert(JSON.stringify(data));

        $('#txtTitulo').val('');
        $('#txtAutor').val('');
        $('#txtNota').val('');
        $('#txtFecha').val('');
        $('#txtActivo').val('');
        $('#txtFoto').val('');
        
        $('#tbNoticia').dataTable().api().ajax.reload();
      }
    )
    .fail(
      function(err){
        alert(err);
      }
    );
   
}

function borrar(id){

  $.ajax(
    {
      url:"http://localhost:3002/usuarios/v1/noticia/"+id,
      type:"delete"

    }
  )
   .done(
     function(data){
       alert(data.msg+id);
       $('#tbNoticia').dataTable().api().ajax.reload();
     }
   )
   .fail(
     function(err){
       alert(err);
     }
   )


}