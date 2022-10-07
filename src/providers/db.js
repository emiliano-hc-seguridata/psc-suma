const { addDoc, collection, getDocs } = require("firebase/firestore");
const { db } = require("firebase_config");
const { default: FirebaseRoutes } = require("models/firebase_routes");

class Database {
    constructor(userUID, userEmail){
        this.userEmail = userEmail;
        this.userUID = userUID;
    }
    addNewVerification = async (uuidVerification) => {
        const today = new Date(Date.now());
        return await addDoc(collection(db, FirebaseRoutes.verification), {
            uid: this.userUID,
            email: this.userEmail,
            verification: uuidVerification,
            date: today.toLocaleDateString()
        });
    }
    getDashboardVerifications = async () => await getDocs(collection(db, FirebaseRoutes.verification));


}

export default Database;