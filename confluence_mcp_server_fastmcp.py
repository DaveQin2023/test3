
from fastapi import FastAPI
from mcp.server.fastmcp import FastMCP
from dotenv import load_dotenv
from typing import Optional, Any
import requests
import base64
import os

# Load environment variables from .env
load_dotenv()

# Initialize FastMCP server
mcp = FastMCP("confluence")

# Confluence credentials from .env
CONFLUENCE_BASE_URL = os.getenv("CONFLUENCE_BASE_URL")
USERNAME = os.getenv("USERNAME")
API_TOKEN = os.getenv("API_TOKEN")

# Helper to make requests to Confluence REST API
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
        if method == "GET":
            response = requests.get(url, headers=headers, params=params, timeout=30)
        else:
            response = requests.request(method, url, headers=headers, json=params, timeout=30)

        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        return f"Error making request: {str(e)}"
    except Exception as e:
        return f"Unexpected error: {str(e)}"

# Register tool using FastMCP
@mcp.tool()
def list_spaces(query: Optional[str] = None, limit: Optional[int] = 25) -> str:
    url = f"{CONFLUENCE_BASE_URL}/space"
    params = {
        "limit": limit,
        "expand": "description.plain,homepage"
    }
    if query:
        params["spaceKey"] = query

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

# Start FastMCP HTTP server
if __name__ == "__main__":
    mcp.run(transport="http", host="0.0.0.0", port=8000)
