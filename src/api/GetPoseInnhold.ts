import admin from 'firebase-admin';

// Interfaces (assuming these are defined or imported appropriately)
interface SavedCandy {
    name: string;
    amount: number;
}

interface SavedPose {
    candies: SavedCandy[];
    createdAt: number; // Assuming timestamp is stored
}

interface ApiResponse {
  success: boolean;
  pose?: SavedPose; // Updated to use SavedPose
  error?: string;
}

// --- Firebase Admin SDK Initialization (Copied from UploadPoseInnhold) ---
// Use the provided credentials directly
const serviceAccount = {
  type: "service_account",
  project_id: "smaagodtposen",
  private_key_id: "815417685baf6a8ec931d8aed967b4dada30a776",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCpmAF3V02ErY8g\nTdASHmKjAJ5nrqqj5CVXlYXp2kvFEee0EZbd7MO8Uig4olWBcFKbZ0C80VeFg4i8\nL+hDIapkB2VQCB9Fue7Pkg5NPmIeQwZm26V2XzjA6mNc2/IC9jTLUOEGo+kXj3T+\nu5ko2xnGQKULPCm1X+lvfujuyu93gwa0YWboZrZ7Diu8sdGVY+B04RpOUBXk5JGu\nLukIDWaE2ZNGd7b6LI6TJhoy3pKipbaWalrJRA1K3IUuDdUm2RFJirh9LGUDET8J\nmKBxaBWXUPn1EiCVXCE+k3V8+7msrhClfggX+kEbn0nsZ5qoY7W+f264E2JmBdJH\nq3/Cm7w5AgMBAAECggEAF1dwfDhr1uL8W/nZtWSxNrYTFzoXCk+QRCm0MKd23jzE\noyf4l7rKhdTY7FKLajFHbVQcuOAnJ50e6Ke/U94CUZoi+4zioPoiQDdd+IupfXjE\nHMwGTfB1IzgfTNyIxpeUVJdhIUTWBAQemiC/x7vAJGUpUg6JvwjgXBQfgx4zL0OD\n/OO4vuZo4pkZ3pVzYYtLSH/lPqzeLoGoeW0AvZiw2hoPE8sMnoJTQQO8Dh+QVNXs\nVHJHnvauh5dUVbrd8bytbth0aMcHIwRtZDX4KNsQzcPhjNLFb4F3nuJVGMnBMirW\n02makXh4d5x19hzoInk9mFySX0uinpdtzhJB+it5wQKBgQDVpaRIi8X8u6GqWK3d\n1Pzx6BVJ9EWvXYLp+wFjOCrItfRXPo2dSdN6nZ1HPbXXCAcChcxOLW7A0pqmZGfS\nWgZp34z7Lp4jehSGUu2d1l68UQ3rP7Qr3O6kaMWCZrQHFGS94U/EABaIAU+vmguk\ntZrhD8Med9Sq+B1VaT+7d0dcpQKBgQDLNrU9KpZJjlMP/NcNxwYvQ++jb6n+N3bM\nvDfKwwQmhvOBV6mbLV6XNp0AUKvmDRppwIIBrMvyfjitQrB262Z82wJNOONnDdML\ny81IzDcNanUHMh9W2vh3t3AQg91hp0VSXKIeiusMFmy79zr5fDmPRePbNb5g3BVR\nr8KcxnapBQKBgBBuHKQ3m5JEG7qt9zEIICu6XWjCkFlcJ6U22HR47VFiLNhIxztB\nYjIbzOydok5XH7Lh90RL2iiaCaqiLhnPMo8R0hW/EApKaSmrVvq8caypzxg4XfLB\nmtip9gaBP3cL6nNv0GKSXyk2cJpgjmSsUqzcOXUuYfyD+D2JSo1wLtzBAoGAOT/F\nWWEJC9njvqpNb501OdWaymFn861uc4lG8oF0RuJX8YVfy87BSjphirgvZVUlrstE\nFPK4Vi2HDBCwpB/3NI+Cm3y+W8cCQN1+jNazX70xEQDm4VI5E4kDMjPkB2HXXreo\nGJCsXTBoG6Av5h9AHAPliFkgtCrseqHYYtBql30CgYEAqsXLJB7jtSugoJIiwlXW\noSYTpV/K0vdJXEmGM+xYd1FhD6EuEZ1uX/KuDW8u8hjFV1zfYW0tJCfWZEPLKEF5\n3YJNg20lyqhpfxqu5225NiEvQ5eeX7kMXJW9xsih+82ucMtqReT8ghs36bACMMQQ\nA+TEKSK3c8qh8qTuR4yGqTk=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-fbsvc@smaagodtposen.iam.gserviceaccount.com",
  client_id: "100712128906287027030",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40smaagodtposen.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
} as admin.ServiceAccount;

const databaseURL = "https://smaagodtposen-default-rtdb.europe-west1.firebasedatabase.app/";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: databaseURL,
    });
    console.log("Firebase Admin SDK initialized successfully.");
  } catch (error) {
    console.error("Firebase Admin SDK initialization failed:", error);
  }
}

const db = admin.database();
const posesRef = db.ref("poses");

// --- Main API Handler Function for GET ---
export const handleGetPose = async (poseCode: string): Promise<{ status: number; body: ApiResponse }> => {
  if (!poseCode) {
    return {
      status: 400,
      body: { success: false, error: "Pose code is required." },
    };
  }
  poseCode = poseCode.toLowerCase()
  try {
    const snapshot = await posesRef.child(poseCode).once('value');

    if (!snapshot.exists()) {
      console.log(`Pose code not found: ${poseCode}`);
      return {
        status: 404,
        body: { success: false, error: `Pose with code '${poseCode}' not found.` },
      };
    }

    const poseData = snapshot.val() as SavedPose;

    if (!poseData || !Array.isArray(poseData.candies)) {
         console.error(`Invalid data structure found for pose code: ${poseCode}`, poseData);
         return {
            status: 500,
            body: { success: false, error: 'Invalid data format found for this pose.' },
         };
    }

    console.log(`Pose data retrieved successfully for code: ${poseCode}`);

    return {
      status: 200,
      body: { success: true, pose: poseData },
    };

  } catch (error: unknown) {
    console.error(`Error retrieving pose data for code ${poseCode}:`, error);
    let errorMessage = "An unexpected error occurred while fetching the pose.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      status: 500,
      body: { success: false, error: errorMessage },
    };
  }
};
