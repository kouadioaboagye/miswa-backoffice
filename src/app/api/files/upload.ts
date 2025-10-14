import { getAuthToken } from "@/lib/auth/utils";
import { toast } from "sonner";

/**
 * Upload a single file to your /api/files route.
 */
export const uploadFile = async (file: File): Promise<string> => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Token d'authentification non trouvé");
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("/api/files", {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        // No Content-Type: the browser sets it automatically for FormData
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || `Erreur upload: ${response.status}`);
    }

    const result = await response.json();

    if (result.success && result.url) {
      return result.url;
    } else {
      throw new Error("Format de réponse invalide");
    }
  } catch (error) {
    console.error("Erreur lors de l'upload:", error);
    throw error;
  }
};

/**
 * Upload multiple files and return their URLs.
 * Displays toast success/error for each file.
 */
export const uploadAllFiles = async (files: File[]): Promise<string[]> => {
  if (!files || files.length === 0) return [];

  const uploadPromises = files.map(async (file) => {
    try {
      const fileUrl = await uploadFile(file);
      toast.success(`Fichier "${file.name}" uploadé avec succès`);
      return fileUrl;
    } catch (error) {
      console.error(`Échec upload ${file.name}:`, error);
      toast.error(`Échec de l'upload de ${file.name}`);
      throw error; // propagate error if you want to stop all uploads
    }
  });

  return await Promise.all(uploadPromises);
};
