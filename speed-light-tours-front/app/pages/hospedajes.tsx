import React, { useState } from "react";
import DatePicker from "react-datepicker";

export default function Hospedajes() {
  const [rating, setRating] = useState(0);

  const handleStarClick = (index: number) => {
    setRating(index);
  };

  return (
    <>
      {/* Título */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "100px",
          position: "absolute",
          top: "100px",
          left: "30px",
        }}
      >
        <h1>Planeta</h1>
      </div>

      <div style={{ padding: "20px", maxWidth: "300px" }}>
      {/* Botón Entrada */}
      {/*<button
        onClick={}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          width: "100%", // Botón ocupa todo el ancho
        }}
      >
        Entrada
      </button>*/}
    </div>

      {/* Contenedor principal */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr", // Filtros, galería + detalles, precio
          gap: "20px",
          padding: "20px",
          position: "absolute",
          top: "150px",
          left: "10px",
          width: "calc(100% - 40px)",
          boxSizing: "border-box",
        }}
      >
        {/* Filtros */}
        <div
          className="filtros-container"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "20px",
            borderRadius: "0px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            border: "1px solid #ccc",
          }}
        >
          <h2>Filtros</h2>

          {/* Localidad */}
          <div
            className="filtro-section"
            style={{
              marginBottom: "20px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <h3>Localidad</h3>
            <div
              className="checkbox-group"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <label
                  key={num}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <input type="checkbox" />
                  Localidad {num}
                </label>
              ))}
            </div>
          </div>

          {/* Servicios */}
          <div
            className="filtro-section"
            style={{
              marginBottom: "20px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <h3>Servicios</h3>
            <div
              className="checkbox-group"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {[...Array(8)].map((_, index) => (
                <label
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <input type="checkbox" />
                  Servicio {index + 1}
                </label>
              ))}
            </div>
          </div>

          {/* Puntuación */}
          <div
            className="filtro-section"
            style={{
              marginBottom: "20px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <h3>Puntuación</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleStarClick(star)}
                  style={{
                    fontSize: "24px",
                    cursor: "pointer",
                    color: star <= rating ? "gold" : "gray",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Informacion de hospedaje */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr", // Galería y detalles
            gap: "0px",
            height: "300px",
            borderRadius: "0px",
          }}
        >
          {/* Imagenes */}
          <div
            style={{
              backgroundColor: "#ccc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              borderRadius: "0px",
            }}
          >
            <button
              style={{
                position: "absolute",
                left: "10px",
                backgroundColor: "white",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              &lt;
            </button>
            <span>Imagen</span>
            <button
              style={{
                position: "absolute",
                right: "10px",
                backgroundColor: "white",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              &gt;
            </button>
          </div>

          {/* Detalles*/}
          <div
            style={{
              backgroundColor: "#ddd",
              padding: "20px",
              borderRadius: "0px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <h2>Hospedaje</h2>
            <p>Ubicación: Dirección del hospedaje</p>
            <h3>Servicios:</h3>
            <ul>
              <li>Wi-Fi</li>
              <li>Estacionamiento</li>
              <li>Piscina</li>
            </ul>

            <h3>Puntuación</h3>
            <div style={{ display: "flex", gap: "5px" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    fontSize: "24px",
                    cursor: "pointer",
                    color: star <=5 ? "gold" : "gray",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            
          </div>
          {/* Precio */}
        <div
          style={{
            backgroundColor: "#eee",
            padding: "20px",
            borderRadius: "0px",
            display: "flex",
            flexDirection: "column",
            gap: "0px",
            height: "300px", // Igual altura que las otras columnas
            justifyContent: "space-between", // Espaciado entre los elementos
          }}
        >
          <h2>Precio</h2>
          <p>Información del precio</p>
          <p>Información del pago</p>
          <button
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "0px",
              cursor: "pointer",
              fontSize: "16px",
              alignSelf: "center", // Centra el botón horizontalmente
            }}
          >
            Reservar
          </button>
        </div>

        
        </div>
      </div>
    </>
  );
}
