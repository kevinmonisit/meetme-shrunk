export function getCookie(name: string): string | null{
  return ('; '+ document.cookie).split(`; ${name}=`).pop()!.split(';')[0];
}

const endpoint_ = 'http://127.0.0.1:5000/o/ParentSet/api';

export async function getLinkHubInfo() {
  const endpoint = getCookie('link_hub_info');
  if (!endpoint) {
    console.log('No link hub info cookie found');
    // return null;
  }

  const response = await fetch(endpoint_, {
    method: "GET",
    headers: {
      "Content-Type": "applications/json"
    }}
  );

  return await response.json();
}