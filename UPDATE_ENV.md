# Update .env File with Retell AI Configuration

## Option 1: Run the Script (Recommended)

Run this command to automatically add Retell AI configuration to your `.env` file:

```bash
node scripts/add-retell-env.js
```

## Option 2: Manual Update

Open your `.env` file and add the following lines at the end:

```env
# Retell AI Configuration
RETELL_API_KEY=key_47254fd3407901e9678eb9f05504
RETELL_AGENT_ID=agent_1bafe9ca9c302f33c15826c22b
RETELL_FROM_NUMBER=+12173933886
```

## Current Status

✅ **node-fetch** - Already added to package.json  
✅ **Retell AI Integration** - Already integrated into booking confirmation endpoint  
⏳ **.env Configuration** - Needs to be added (use one of the options above)

## After Updating .env

1. Restart your server:
   ```bash
   npm start
   ```

2. The Retell AI service will now use these environment variables if set, otherwise it will use the default values.

## Default Values (if .env not updated)

The system will work with these default values:
- API Key: `key_47254fd3407901e9678eb9f05504`
- Agent ID: `agent_1bafe9ca9c302f33c15826c22b`
- From Number: `+12173933886`

However, it's recommended to set them in `.env` for better configuration management.

