type ApiProps = {
    method: "POST" | "GET" | "PUT" | "DELETE";
    path: string;
    body?: any;
    token?: string;
  };
  
  export const api = async <T>({
    method,
    path,
    body,
    token,
  }: ApiProps): Promise<T> => {
    if (!process.env.NEXT_PUBLIC_API_URL)
      throw new Error("API_URL not configured");
  
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers,
    });
  
    if (!res.ok) {
      console.log(res);
      console.log(await res.json());
      throw new Error("An error occurred");
    }
  
    const data = await res.json();
    return data;
  };
  