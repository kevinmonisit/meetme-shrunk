export function getCookie(name: string): string | null{
  return ('; '+ document.cookie).split(`; ${name}=`).pop()!.split(';')[0];
}

export async function getLinkHubInfo() {
  const endpoint = getCookie('link_hub_info');
  if (!endpoint) {
    return null;
  }

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "applications/json"
    }}
  );

  const json = await response.json();

  return json;
}