# 🔧 Solution CORS - Miswa Backoffice

## 📋 Problème
Les requêtes API étaient bloquées par la politique CORS du navigateur, car l'API backend ne retournait pas les en-têtes `Access-Control-Allow-Origin` nécessaires.

## ✅ Solution Implémentée

### 1. Proxy API Next.js
Création d'une route API proxy (`/src/app/api/proxy/[...path]/route.ts`) qui :
- Intercepte toutes les requêtes en développement
- Les redirige vers l'API backend
- Ajoute automatiquement les en-têtes CORS nécessaires
- Supporte GET, POST, PUT, DELETE

### 2. Configuration Axios
Le client Axios (`/src/shared/lib/axios.ts`) utilise maintenant :
- **En développement** : `/api/proxy` (proxy Next.js - sans problème CORS)
- **En production** : `https://api.miswa.ci/api/v1` (API directe)

## 🚀 Comment utiliser

### Redémarrer le serveur
```bash
# Arrêter le serveur actuel (Ctrl+C)
# Puis relancer :
npm run dev
# ou
pnpm dev
# ou
yarn dev
```

### Vérification
Après le redémarrage, vous devriez voir dans la console :
```
🔧 Mode développement : Utilisation du proxy API
```

Et dans les logs du terminal :
```
🔄 Proxy GET request to: https://api.miswa.ci/api/v1/...
```

## 🔍 Comment ça marche

### Avant (avec CORS)
```
Browser → https://api.miswa.ci ❌ CORS Error
```

### Après (avec proxy)
```
Browser → localhost:3000/api/proxy → Next.js Server → https://api.miswa.ci ✅
```

Le navigateur ne fait plus de requêtes directes vers l'API externe, donc pas de problème CORS !

## 📝 Notes importantes

1. **Développement uniquement** : Le proxy n'est utilisé qu'en mode développement
2. **Production** : En production, les requêtes vont directement vers l'API
3. **Backend** : Il faudra quand même configurer CORS sur le backend pour la production

## 🔧 Configuration Backend (à faire côté API)

Pour résoudre définitivement le problème en production, il faut ajouter sur le backend :

```python
# FastAPI/Django
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://backoffice.miswa.ci", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 📚 Ressources
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [CORS Explained](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

