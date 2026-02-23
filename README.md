# AskRON

AskRON is a Chrome extension + Flask backend that answers navigation questions about the current website using AWS Bedrock (Claude Sonnet).

## How it works

1. You open the extension popup and enter a question.
2. The extension reads the active tab URL.
3. It sends a POST request to `http://127.0.0.1:5000/converse` with:
   - `user_message`
   - `web_name` (current tab URL)
   - `format` (`plain`, `short`, or `steps`)
4. Flask calls Bedrock `converse_stream`, builds the text response, and returns JSON to the popup.

## Project structure

- `converse.py` — Flask API and Bedrock integration
- `requirements.txt` — Python dependencies
- `flaskapp.flaskenv` — Flask app entrypoint (`FLASK_APP=converse.py`)
- `chrome-extension/manifest.json` — Chrome extension manifest
- `chrome-extension/popup.html` — popup UI
- `chrome-extension/popup.js` — popup logic and POST request
- `chrome-extension/background.js` — background service worker
- `chrome-extension/icons/` — extension icon assets

## Prerequisites

- Python 3.10+
- Google Chrome
- AWS account access to Bedrock model `anthropic.claude-3-sonnet-20240229-v1:0` (or custom model)

## Setup

1. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

2. Create a `.env` file in the project root:

   ```env
   AWS_ACCESS_KEY_ID=your_key
   AWS_SECRET_ACCESS_KEY=your_secret
   AWS_REGION=us-west-2
   BEDROCK_MODEL_ID=anthropic.claude-3-sonnet-20240229-v1:0
   ```

3. Run Flask:

   ```bash
   flask run
   ```

   Or:

   ```bash
   python converse.py
   ```

4. Load the extension in Chrome:
   - Open `chrome://extensions`
   - Enable **Developer mode**
   - Click **Load unpacked**
   - Select the `chrome-extension/` folder

## API contract

### Request (`POST /converse`)

```json
{
  "user_message": "How do I find pricing?",
  "web_name": "https://example.com",
  "format": "short"
}
```

### Success response

```json
{
  "success": true,
  "response": "..."
}
```

### Error response

```json
{
  "success": false,
  "error": "..."
}
```

## Notes

- The extension can only call `http://127.0.0.1:5000/*` by default (`host_permissions` in `manifest.json`).
- Icon paths in `manifest.json` are resolved from `chrome-extension/icons/`.
- Current popup submits on button click; Enter-key form submission is not implemented yet.

## Possible improvements

- Add Enter-key submission in popup UX.
- Add response timeout/retry handling in backend.
- Move to AWS profile/role auth instead of static keys in `.env`.
- Add unit tests for `/converse` and popup fetch handling.
