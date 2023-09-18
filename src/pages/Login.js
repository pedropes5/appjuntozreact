import React, { useState, useEffect } from "react";
import md5 from "md5";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";
import axios from "axios";
import "../css/Login.css";

function Login(props) {
  const baseUrl = "https://localhost:49088/api/usuarios";
  const cookies = new Cookies();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const InicioSesion = async () => {
    await axios
      .get(baseUrl + `/${form.username}/${md5(form.password)}`) //convirtiendo a md5 la contraseña
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        if (response.length > 0) {
          var respuesta = response[0];
          //seteando cookies
          cookies.set("id", respuesta.id, { path: "/" });
          cookies.set("apellido_paterno", respuesta.apellido_paterno, {
            path: "/",
          });
          cookies.set("apellido_materno", respuesta.apellido_materno, {
            path: "/",
          });
          cookies.set("nombre", respuesta.nombre, { path: "/" });
          cookies.set("correo", respuesta.correo, { path: "/" });
          cookies.set("username", respuesta.username, { path: "/" });
          cookies.set("password", respuesta.password, { path: "/" });
          alert("Bienvenido: " + respuesta.nombre);
          props.history.push("/menu");
        } else {
          alert("Usuario o contraseña no son correctos");
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (cookies.get("id")) {
      props.history.push("/menu");
    }
  }, []);

  //usuario: projas - clave : pedro123
  return (
    <div className="containerPrincipal">
      <div className="containerLogin">
        <div className="form-group">
          <label>Usuario: </label>
          <br />
          <input
            type="text"
            className="form-control"
            name="username"
            onChange={handleChange}
          />
          <br />
          <label>Contraseña: </label>
          <br />
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={handleChange}
          />
          <br />
          <button className="btn btn-primary" onClick={() => InicioSesion()}>
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
