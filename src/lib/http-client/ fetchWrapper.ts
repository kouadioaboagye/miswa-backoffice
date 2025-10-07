import { getAuthSession } from "../auth/utils";

interface RequestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: Record<string, unknown> | FormData;
    headers?: HeadersInit;
    isFormData?: boolean;
    retry?: boolean;
    isRevalidate?: boolean;
}

interface NextRequestInit extends RequestInit {
    next?: {
        revalidate: number;
    };
}

const backendUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchWrapper<T>(remainUrl: string, options: RequestOptions = {}): Promise<T> {
    if (!backendUrl) {
        throw new Error("API URL is not defined in environment variables.");
    }

    const {
        method = "GET",
        body,
        headers,
        isFormData = false,
        isRevalidate = false,
    } = options;

    const session = getAuthSession();
    const token = session?.token;
    if (!token) {
        throw new Error("Token d'authentification non trouvé. Veuillez vous reconnecter.");
    }

    const fetchOptions: NextRequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
            "x-platform": "api",
            "x-platform-token": "api",
            ...(token && { Authorization: `${token}` }),
            ...headers,
        },
    };

    if (isRevalidate) {
        fetchOptions.cache = "no-store"; // Use no-store for debugging
        fetchOptions.next = { revalidate: 60 };
    }

    if (body) {
        if (isFormData && body instanceof FormData) {
            fetchOptions.body = body;
        } else if (typeof body === 'object') {
            fetchOptions.headers = {
                "Content-Type": "application/json",
                ...fetchOptions.headers,
            };
            fetchOptions.body = JSON.stringify(body);
        }
    }

    const fullUrl = `${backendUrl}/${remainUrl}`;

    const response = await fetch(fullUrl, fetchOptions);

    if (response.status === 403 && typeof window !== "undefined") {
        //redirect to the correct page
        //window.location.href = "/login";
    }

    if (!response.ok) {
        let errorData: any = {};
        try {
            errorData = await response.json();
        } catch {
            // If not JSON, fallback to empty object
        }
        const error = new Error(`HTTP error! status: ${response.status}`) as any;
        error.status = response.status;
        error.detail = errorData.detail || errorData;
        throw error;
    }

    return response.json();
}