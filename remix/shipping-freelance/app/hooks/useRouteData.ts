import { useMatches } from "@remix-run/react";

export const useRouteData = <T>(routeId: string): T | undefined => {
  console.log("----use matchers hit------")
    const matches = useMatches();
    console.log(matches, ' matchers')

    const data = matches.find((match) => match.id === routeId)?.data;
    console.log(data, 'data matchers')
  
    return data as T | undefined;
  };