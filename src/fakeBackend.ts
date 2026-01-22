const apiurl = import.meta.env.VITE_FAKE_BACKEND_APIURL as string;
const flowid = import.meta.env.VITE_FAKE_BACKEND_FLOWID as string;
const apikey = import.meta.env.VITE_FAKE_BACKEND_APIKEY as string;

const defaultHeader = {
  "Content-Type": "application/json",
  "x-api-key": apikey,
  "api-version": "1.0",
};

export async function fakeBackendStart(): Promise<{ token: string }> {
  const url = `${apiurl}/omni/start`;
  const params = { configurationId: flowid };

  const response = await fetch(url, {
    method: "POST",
    headers: defaultHeader,
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`omni/start failed: ${response.status} ${text}`);
  }

  const { token } = await response.json();
  return { token };
}
