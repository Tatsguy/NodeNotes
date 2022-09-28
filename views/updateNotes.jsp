<%@page import="Modelos.Nota"%>
<%@page import="BD.Conexion"%>
<%
    //ACTUALIZACION DE NOTAS 
    String idNote = request.getParameter("idNote");
    String contenido = request.getParameter("contenido");
    String color = request.getParameter("color");
    String fondo = request.getParameter("fondo");
    int idUser = Integer.parseInt(request.getParameter("idUser"));
    int id = Integer.parseInt(idNote);
    Nota note = new Nota(id, contenido, color, fondo, idUser);
    try {
        Conexion con = new Conexion();
        if (con.buscarNota(id)) {
            // SI LA NOTA EXISTE SOLO SE ACTUALIZA O EN SU DEFECTO SE ELIMINA
            if (idUser == 0) {
                con.borrarNota(note.getId_note());
            } else {
                con.updateNota(note);
            }
        } else {
            // SI NO EXISTE SE INSERTA DESDE 0
            con.insertNota(note);
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
%>