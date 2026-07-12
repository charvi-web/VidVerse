import { NextResponse } from "next/server";

export async function POST() {
  const apiKey = process.env.CASPARSER_API_KEY;

  if (!apiKey) {
    console.error("CASPARSER_API_KEY is not configured");
    return NextResponse.json(
      { error: "Portfolio import is not configured. Please contact support." },
      { status: 500 }
    );
  }

  try {
    const response = await fetch("https://api.casparser.in/v1/token", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        expiry_minutes: 60,
      }),
    });

    // An upstream proxy can return an empty or non-JSON error body. Do not
    // convert that into a misleading local 500 by unconditionally parsing JSON.
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            data.detail ||
            data.message ||
            data.msg ||
            "Failed to generate portfolio access token",
        },
        {
          status: response.status,
        }
      );
    }

    if (typeof data.access_token !== "string" || !data.access_token) {
      console.error("CASParser token response did not contain access_token");
      return NextResponse.json(
        { error: "Portfolio service returned an invalid access token." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        access_token: data.access_token,
        expires_in: data.expires_in,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Failed to generate CASParser access token", error);
    return NextResponse.json(
      {
        error: "Unable to reach the portfolio service. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}
