const { WebVerification } = require("vdid-sdk-web");

class SumaProvider {
  uuid = '';
  token = '';
  vdid = new WebVerification("pk_test_GngHeqnzIO/6Qlsb0frz/CQLBgxZJloDWC2JHsgHO70=");
  //Iniciar la instancia de la verificación

  verificationEp = async () => {
    // Llamada al EP createVerification
    try {
      const response = await fetch(
        "https://veridocid.azure-api.net/api/id/v2/createVerification",
        {
          method: "POST",
          headers: {
            "x-api-key": "sk_test_lAbhn2YI41ZIIsZUQckTwBB6WuFu1R6G+FKE4IutMg0=",
          },
          body: JSON.stringify({
            id: "test",
            options: {
              checks: {
                selfie: false,
              },
              redirect_url: "https://verificaciones.sumamexico.com/",
            },
          }),
        }
      );

      if (response.ok) {
        const uuidIdentifier = await response.text();
        this.uuid = uuidIdentifier;
        console.log(uuidIdentifier);
        //Se obtiene el uuid y se pasa para poder crear la verificación
        this.vdid.verifyIdentity(uuidIdentifier, { method: 'popup' });
      } else {
        const error = await response.json();
        console.log("error", error);
      }
    }
    catch (error) {
      console.log("Verefication error:" + error);
    }
  };

  getStatus = async () => {
    // Llamada al EP createVerification
    try {
      const response = await fetch(
        "https://veridocid.azure-api.net/api/id/v2/status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.token,
          },
          body: JSON.stringify({
            uuid: "16a7c56e-4083-43e9-87f0-f390c5bc9eaa",
          })
        }
      );
      console.log(this.uuid);

      if (response.ok) {
        const uuidIdentifier = await response.text();
        console.log(uuidIdentifier);
        //Se obtiene el uuid y se pasa para poder crear la verificación
      } else {
        const error = await response.json();
        console.log("error", error);
      }
    }
    catch (error) {
      alert("getStatus: " + error);
    }
  };


  login = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append("client_id", "g7dncc5cBysQB3dkhLSMEOjLwh0EGkC1");
    urlencoded.append("client_secret", "gBtXLmi2RZ5LNdUj47aE9UpE5EuuRHbbHojGqy_tfDshZr0E7DSD8MBtcB1SMBR4");
    urlencoded.append("audience", "veridocid");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    // @ts-ignore
    fetch("https://veridocid.azure-api.net/api/auth/token", requestOptions)
      .then(response => response.json())
      .then(result => { this.token = result["access_token"]; console.log(result); })
      .catch(error => console.log('error', error));
  };

  createVerification = async () => {
    await this.verificationEp();
    return this.uuid;
  };

  init = () => {
    this.login();
  }
}

export default SumaProvider;