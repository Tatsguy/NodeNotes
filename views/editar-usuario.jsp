<%@page import="BD.Conexion"%>
<%@page import="Modelos.Usuario"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Editar Usuario</title>
        <!--ESTILOS-->
        <link rel="shortcut icon" href="images/logoV.png" type="image/x-icon">
        <link rel="stylesheet" href="css/notes.css">
    </head>
    <body>
        <%
            Usuario user = new Usuario();
            Conexion con = new Conexion();
            int idUser = 0;
            HttpSession sesion = request.getSession();
            if (sesion.getAttribute("id") == null) {
                response.sendRedirect("login.jsp");
            } else {
                idUser = Integer.parseInt(sesion.getAttribute("id").toString());
                if (con.getRol(idUser) != 1) {
                    response.sendRedirect("notas.jsp");
                } else {
                    idUser = Integer.parseInt(request.getParameter("id"));
                    user = con.buscarId(idUser);
                }
            }
        %>
        <!--Editar Perfil---------------------------------------------------------------->
        <div class="update-form-container container activated" id="update-form-container">
            <div class="form-container-inner" style="background-color: white; width: 50%; padding: 15px; border-radius: 10px">
                <form action="UpdateUser" id="userForm" method="post" class="form" style="color:black;">
                    <input class="form-input" name="admin" type="text" hidden="true" value="admin">
                    <input class="form-input" name="id" type="text" hidden="true" value="<%=user.getId_user()%>">
                    <p class="instruction">Usuario:</p>
                    <input class="form-input" name="usuario" type="text" value="<%=user.getUsuario()%>">
                    <p class="instruction">Email:</p>
                    <input class="form-input" name="email" type="email" value="<%=user.getEmail()%>">
                    <p class="instruction">Nombre:</p>
                    <input class="form-input" name="nombre" type="text" value="<%=user.getNombre()%>">
                    <p class="instruction">Password:</p>
                    <input class="form-input" type="password" name="password" value="<%=user.getPassword()%>">
                    <div style="display: flex; justify-content: space-around;">
                        <input type="radio" name="rol" id="Admin" <%if(user.getRol()==1){%>checked="true"<%}%> value="1">
                        <label for="Admin">Administrador</label>
                        <input type="radio" name="rol" id="User" <%if(user.getRol()==2){%>checked="true"<%}%>  value="2">
                        <label for="User">Usuario</label>
                    </div>
                    <div class="action-btns-container">
                        <button class="btn form-input" type="submit" id="modify">Modificar Cuenta</button>
                        <a class="btn form-input" id="delete" href="BorrarUsuario?id=<%=user.getId_user()%>">Eliminar Cuenta</a>
                    </div>
                    <a href="administrador.jsp" class="btn form-input" style="display: block;">Volver</a>
                </form>
            </div>
    </body>
</html>
