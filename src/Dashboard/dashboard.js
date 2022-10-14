import { useAuth } from "Auth/auth_provider";
import Database from "providers/db";
import SumaProvider from "providers/suma";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [dashboardValues, setDashboardValues] = useState([]);
  const { userUID, userEmail } = useAuth();
  const database = new Database(userUID, userEmail);
  useEffect(() => {
    document.body.style.backgroundColor = 'white';
    const getDashboardValues = async () => {
      const querySnapshot = await database.getDashboardVerifications();
      const tempValues = [];
      querySnapshot.forEach((doc) => {
        let entry = doc.data();
        tempValues.push({ uid: entry.uid, verification: entry.verification, email: entry.email, date: entry.date })
      });
      setDashboardValues(tempValues);
    };

    getDashboardValues();
  }, []);

  const handleRowClick = (id) => {
  };

  const renderItem = (item) => {
    return <tr
      onClick={() => { handleRowClick(item.uid) }}
      key={item.uid + item.date}>
      <td>{item.date}</td>
      <td>{item.verification}</td>
      <td>{item.email}</td>
      <td>VOTING_CARD</td>
      <td>x</td>
    </tr>
  };

  const handleCreateVerification = async () => {
    const uuidVerification = await bioProvider.createVerification();
    if (uuidVerification === '') {
      alert("Error al generar verificación");
      return;
    }
    try {
      const docRef = await database.addNewVerification(uuidVerification);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const bioProvider = new SumaProvider();
  bioProvider.init();
  return (<div>
    <h1>Bienvenido a la prueba de verificación</h1>
    <p>
      Prueba del SDK de Suma para Seguridata
    </p>
    <div className="dashboard-header">
      <div>
        <input></input>
        <button></button>
      </div>
      <button id="create" onClick={handleCreateVerification}>
        Crear Verificación
      </button>
    </div>
    <table className="dashboard-table">
      <thead className="dashboard-table-header">
        <tr>
          <th>Fecha</th>
          <th>ID de Cliente</th>
          <th>Nombre</th>
          <th>Tipo de Documento</th>
          <th>Resultado ID</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>19/09/2022</td>
          <td>id-jgcardoso2</td>
          <td>GONZALEZ CARDOSO JUAN</td>
          <td>VOTING_CARD</td>
          <td>x</td>
        </tr>
        {
          dashboardValues.map((item) => {
            return renderItem(item);
          })
        }
      </tbody>
    </table>

    <button id="create" onClick={bioProvider.getStatus}>
      Status
    </button>
    <button id="create2" onClick={() => { console.log(bioProvider.token); }}>
      Print token
    </button>
  </div>)
};

export default Dashboard;