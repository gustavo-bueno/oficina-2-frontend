import { NextResponse } from "next/server";

export async function POST() {
  // Hardcoded response data
  const response = {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY3YWJhNjYzODMzY2IxZDNkMGYwYjIyZiIsIm5vbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwic2VuaGEiOiIkMmEkMDgkUzFGeE02bmNaVHBnM1BRUmNQcnAxT2ZpTnFQekhVSUNQV1lIVFRmVUQxU3FEQi5lZGtldEsiLCJhZG1pbiI6dHJ1ZSwiX192IjowfSwiaWF0IjoxNzM5MzY2MTQ5fQ.Gqh57SEN7dkODf1WrkeZZJdtlAsC2peNYh7OaIL5xuw",
    nome: "user",
    email: "user@gmail.com",
    senha: "user",
    admin: true,
  };

  return NextResponse.json(response, { status: 200 });
}
