import React, { useEffect } from "react";
import { View, Text } from "react-native";

import { getFirestore, doc, getDoc } from "firebase/firestore";
import { firebaseApp } from "../services/firebaseConfig";

const ProfilScreen = () => {

    const db = getFirestore(firebaseApp)

    useEffect(() => {
        const testFirestore = async () => {
            try {
                const docRef = doc(db, "users", "usersdb");
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("✅ Documento:", docSnap.data());
                } else {
                    console.log("⚠️ No se encontró el documento.");
                }
            } catch (error) {
                console.error("❌ Error al conectar con Firestore:", error);
            }
        };

        testFirestore();
    }, []);

    return (
        <View>
            <Text>Perfil</Text>
        </View>
    );
};

export default ProfilScreen;