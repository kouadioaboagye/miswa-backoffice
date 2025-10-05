// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://api.miswa.ci/api/v1';

export async function POST(request: NextRequest) {
  try {
    // Récupérer le token d'authentification
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace(/^bearer/i, '').trim() || null;

    if (!token) {
      return NextResponse.json(
        { error: 'Token d\'authentification manquant' },
        { status: 401 }
      );
    }

    // Récupérer le FormData de la requête
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    // Vérifier la taille du fichier (optionnel)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Fichier trop volumineux. Taille maximale: 10MB' },
        { status: 400 }
      );
    }

    // Vérifier le type de fichier (optionnel)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Type de fichier non autorisé' },
        { status: 400 }
      );
    }

    // Préparer le FormData pour l'API externe
    const externalFormData = new FormData();
    externalFormData.append('file', file);

    // Envoyer le fichier à l'API externe
    const response = await fetch(`${API_BASE_URL}/upload/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        // Ne pas mettre Content-Type pour FormData
      },
      body: externalFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erreur API externe:', response.status, errorText);
      throw new Error(`Erreur upload API externe: ${response.status}`);
    }

    const data = await response.json();
    
    console.log(data.data);
    // Adapter selon la structure de réponse de votre API
    let fileUrl;
    if (data.url) {
      fileUrl = data.url;
    } else if (data.data && data.data.url) {
      fileUrl = data.data.url;
    } else {
      throw new Error('Format de réponse invalide de l\'API externe');
    }

    return NextResponse.json({ 
      success: true, 
      url: fileUrl,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    });

  } catch (error) {
    console.error('Error in upload route:', error);
    return NextResponse.json(
      { 
        error: 'Impossible d\'uploader le fichier',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Optionnel: Ajouter une méthode GET pour tester la route
export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    message: 'Upload endpoint is working',
    usage: 'Send a POST request with FormData containing a file'
  });
}