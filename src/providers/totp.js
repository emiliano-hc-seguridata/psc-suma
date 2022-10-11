class TOTP {
    authorization = "Basic cHNjU2VndXJpZGF0YUU6UHpDPHAwenpXT3JEPg==";
    baseURL = "https://smtp.seguridata.com:5002/totp/"
    token = "";
    app = "PSC";
    imgSize = "8";

    getJsonHeaders = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        return myHeaders;
    }

    systemLogin = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", this.authorization);
        const response = await fetch(this.baseURL + "login", {
            method: 'POST',
            headers: myHeaders,
            body: "",
            redirect: 'follow'
        })
        const jsonResponse = await response.json();
        this.token = jsonResponse['token'];
    };

    registerUser = async (email) => {
        const body = JSON.stringify({
            "user": email,
            "app": this.app,
            "imgsize": this.imgSize
        });

        const response = await fetch(this.baseURL + "register?token=" + this.token, {
            method: 'POST',
            headers: this.getJsonHeaders(),
            body,
            redirect: 'follow'
        })
        const jsonResponse = await response.json();
        return jsonResponse.hasOwnProperty('b64QR') ? jsonResponse['b64QR'] : '';
    }

    validateAccess = async (totpCode, email) => {
        const body = JSON.stringify({
            "user": email,
            "app": this.app,
            "pin": totpCode
        });

        const response = await fetch(this.baseURL + "validate?token=" + this.token, {
            method: 'POST',
            headers: this.getJsonHeaders(),
            body,
            redirect: 'follow'
        });
        const jsonResponse = await response.json();
        return jsonResponse['errorCode'] === 0
    }

}

export default TOTP;