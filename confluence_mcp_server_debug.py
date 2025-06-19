
from mcp.server.fastmcp import FastMCP
from dotenv import load_dotenv
from typing import Optional, Any
import requests
import base64
import os

# Load environment variables
load_dotenv()

# Create FastMCP server instance
mcp = FastMCP("confluence")

# Get environment variables
CONFLUENCE_BASE_URL = os.getenv("CONFLUENCE_BASE_URL")
USERNAME = os.getenv("USERNAME")
API_TOKEN = os.getenv("API_TOKEN")

def make_confluence_request(url: str, method: str = "GET", params: dict = None) -> dict[str, Any] | str:
    if not USERNAME or not API_TOKEN:
        return "Error: Please set your Confluence username and API token"

    auth_string = f"{USERNAME}:{API_TOKEN}"
    base64_auth = base64.b64encode(auth_string.encode("ascii")).decode("ascii")

    headers = {
        "Authorization": f"Basic {base64_auth}",
        "Accept": "application/json"
    }

    try:
        print(f"[DEBUG] Requesting: {url} with method={method} and params={params}")
        if method == "GET":
            response = requests.get(url, headers=headers, params=params, timeout=30)
        else:
            response = requests.request(method, url, headers=headers, json=params, timeout=30)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"[ERROR] RequestException: {e}")
        return f"Error making request: {str(e)}"
    except Exception as e:
        print(f"[ERROR] Exception: {e}")
        return f"Unexpected error: {str(e)}"

@mcp.tool()
def list_spaces(query: Optional[str] = None, limit: Optional[int] = 25) -> str:
    url = f"{CONFLUENCE_BASE_URL}/space"
    params = {
        "limit": limit,
        "expand": "description.plain,homepage"
    }
    if query:
        params["spaceKey"] = query

    print(f"[DEBUG] Calling list_spaces with query={query}, limit={limit}")
    data = make_confluence_request(url, params=params)
    if isinstance(data, str):
        return data

    result = []
    for space in data.get("results", []):
        space_info = (
            f"Space: {space.get('name', 'Unknown')}\n"
            f"Key: {space.get('key', 'Unknown')}\n"
            f"Type: {space.get('type', 'Unknown')}\n"
            f"Description: {space.get('description', {}).get('plain', {}).get('value', 'No description')}"
        )
        result.append(space_info)

    return "\n---\n".join(result) if result else "No spaces found"

if __name__ == "__main__":
    print("[INFO] Starting Confluence FastMCP Server on port 8000")
    mcp.run(transport="http", host="0.0.0.0", port=8000)
