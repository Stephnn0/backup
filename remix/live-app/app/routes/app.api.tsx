import { LoaderFunction, json } from "@remix-run/node";
import React from "react";
import { authenticate } from "~/shopify.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  console.log("----------hit app proxy----------");
  console.log("----------hit----------");

  const { session } = await authenticate.public.appProxy(request);
  console.log(session);

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, OPTIONS", // Allow specified methods
    "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allow specified headers
    "Access-Control-Max-Age": "86400", // Cache preflight requests for 24 hours
  };
  return json({ hello: "hello from remix", headers: headers });
};

const Api = () => {
  return <div>Api</div>;
};

export default Api;
