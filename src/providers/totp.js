class TOTP {
    authorization = "Basic cHNjU2VndXJpZGF0YUU6UHpDPHAwenpXT3JEPg==";
    token = "";
    app = "PSC";
    imgSize = "8";

    systemLogin = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", this.authorization);
        const response = await fetch("https://smtp.seguridata.com:5002/totp/login", {
            method: 'POST',
            headers: myHeaders,
            body: "",
            redirect: 'follow'
        })
        const jsonResponse = await response.json();
        this.token = jsonResponse['token'];
        console.log(this.token);
    };

    registerUser = (email) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var body = JSON.stringify({
            "user": email,
            "app": this.app,
            "imgsize": this.imgSize
        });


        fetch("https://smtp.seguridata.com:5002/totp/register?token=" + this.token, {
            method: 'POST',
            headers: myHeaders,
            body,
            redirect: 'follow'
        })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

}

export default TOTP;