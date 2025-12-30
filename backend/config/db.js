import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const options = {
            serverSelectionTimeoutMS: 10000,    
            socketTimeoutMS: 45000,            
            connectTimeoutMS: 10000,           
            maxPoolSize: 5,                    
            minPoolSize: 1,                    
            maxIdleTimeMS: 30000,              
            retryWrites: true,
            w: 'majority'
        };

        console.log("🔄 Tentative connexion MongoDB...");
        const startTime = Date.now();
        
        await mongoose.connect(process.env.MONGODB_URI, options);
        
        const connectionTime = Date.now() - startTime;
        console.log(`✅ MongoDB Connecté en ${connectionTime}ms`);
        
        // Événements de connexion
        mongoose.connection.on('connected', () => {
            console.log("✅ DB Connected - Prêt");
        });

        mongoose.connection.on('error', (err) => {
            console.log("❌ DB Connection Error:", err.message);
        });

        mongoose.connection.on('disconnected', () => {
            console.log("⚠️ DB Déconnecté");
        });

    } catch (error) {
        console.error("💥 ERREUR CRITIQUE MongoDB:", error.message);
        // Ne pas arrêter le serveur, continuer sans DB
        console.log("⚠️ Serveur fonctionne sans MongoDB (mode dégradé)");
    }
};

export default connectDB;