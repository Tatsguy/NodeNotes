<%@page import="Modelos.Nota"%>
<%@page import="Modelos.Usuario"%>
<%@page import="java.util.List"%>
<%@page import="BD.Conexion"%>
<!DOCTYPE html>
<html lang="es">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="author" content="Remember Team">
        <meta name="copyright" content="Remember">
        <meta name="description" content="Interfaz de administraciÃ³n de usuarios">
        <meta name="keywords" content="Administrador, notas, Remember">
        <link rel="shortcut icon" href="images/logoV.png" type="image/x-icon">
        <title>Remember - Administrador</title>
        <link rel="stylesheet" href="css/administrador.css">
        <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet">
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
                user = con.buscarId(idUser);
                if (con.getRol(idUser) != 1) {
                    response.sendRedirect("notas.jsp");
                }
            }
        %>
        <div class="notes">

            <!--SIDEBAR-------------------------------------------------->
            <div class="notes__sidebar">
                <div class="user">
                    <%if (user.getBase64Image() == null) {%>
                    <img class="user-avatar" src="images/notas/usuario-icono.png"/>
                    <%}else{%>
                        <img class="user-avatar" src="data:image/jpg;base64,<%=user.getBase64Image()%>"/>
                    <%}%>
                </div>
                <div class="tools">
                    <button class="closeIcon">
                        <i class="ri-close-line"></i>
                    </button>
                    <div class="tool">
                        <a href="index.html"><i class="ri-home-line"></i>
                            <p class="tool-name">Ir a inicio</p>
                        </a>
                    </div>
                    <div class="tool">
                        <a href="notas.jsp"><i class="ri-booklet-line"></i>
                            <p class="tool-name">Ver notas</p>
                        </a>
                    </div>
                    <div class="tool">
                        <a href="cerrar-sesion.jsp"><i class="ri-door-open-line"></i>
                            <p class="tool-name">Cerrar sesión</p>
                        </a>
                    </div>
                </div>
                <button class="hamburger menuIcon">
                    <i class="ri-menu-line"></i>
                </button>
                <div class="widget">
                    <div class="fecha">
                        <p id="diaSemana" class="diaSemana"></p>
                        <p id="dia" class="dia"></p>
                        <p>de </p>
                        <p id="mes" class="mes"></p>
                        <p>del </p>
                        <p id="year" class="year"></p>
                    </div>
                    <div class="reloj">
                        <p id="horas" class="horas"></p>
                        <p>:</p>
                        <p id="minutos" class="minutos"></p>
                        <p>:</p>
                        <div class="caja-segundos">
                            <p class="ampm" id="ampm"></p>
                            <p class="segundos" id="segundos"></p>
                        </div>
                    </div>
                </div>
            </div>

            <!--TABLAS---------------------------------------------------->
            <div id="app-admin">
                <h1>Bienvenido  <%=user.getUsuario()%></h1>
                <div class="administrator">
                    <div class="table-container">
                        <h2>Usuarios</h2>
                        <div class="table-scroll">
                            <table class="content-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NOMBRE</th>
                                        <th>USUARIO</th>
                                        <th>E-MAIL</th>
                                        <th>ROL</th>
                                        <th>CONTRASEÑA</th>
                                        <th>ACCIONES</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <%
                                        List<Usuario> lista = con.mostrarUsuarios();
                                        for (int i = 0; i < lista.size(); i++) {
                                            String rol = "";
                                            if(lista.get(i).getRol()==1){
                                                rol="Administrador";
                                            }else{
                                                rol="Usuario";
                                            }
                                    %>
                                    <tr style="cursor: pointer;" data-href="editar-usuario.jsp?id=<%=lista.get(i).getId_user()%>">
                                        <td><%=lista.get(i).getId_user()%></td>
                                        <td><%=lista.get(i).getNombre()%></td>
                                        <td><%=lista.get(i).getUsuario()%></td>
                                        <td><%=lista.get(i).getEmail()%></td>
                                        <td><%=rol%></td>
                                        <td><%=lista.get(i).getPassword()%></td>
                                        <td><a style="color: red;" href="BorrarUsuario?id=<%=lista.get(i).getId_user()%>">BORRAR</a></td>
                                    </tr>
                                    <%
                                        }
                                    %>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="admin-tools">
                    <a href="sing-in.jsp" class="admin-btn">Añadir Usuario</a>
                </div>
            </div>
        </div>
        <script src="js/reloj.js"></script>
        <script>
            document.addEventListener("DOMContentLoaded", () => {
                const rows = document.querySelectorAll("tr[data-href]");
                rows.forEach(row => {
                    row.addEventListener("click", () => {
                        window.location.href = row.dataset.href;
                    });
                });
            });
        </script>
    </body>

</html>