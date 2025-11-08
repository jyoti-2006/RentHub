# 📞 Retell AI Outbound Call Setup

This document explains how to configure and use the Retell AI outbound call feature for automatic booking confirmation calls.

## Overview

When an admin confirms a booking, the system automatically:
1. Sends a confirmation email to the user
2. Makes an outbound call to the user's phone number using Retell AI

## Configuration

### Environment Variables

Add the following environment variables to your `.env` file:

```env
# Retell AI Configuration
RETELL_API_KEY=key_47254fd3407901e9678eb9f05504
RETELL_AGENT_ID=agent_1bafe9ca9c302f33c15826c22b
RETELL_FROM_NUMBER=+12173933886
```

### Variables Explained

- **RETELL_API_KEY**: Your Retell AI API key (get it from your Retell AI dashboard)
- **RETELL_AGENT_ID**: The ID of the Retell AI agent that will handle the calls
- **RETELL_FROM_NUMBER**: The phone number that will appear as the caller (must be verified in Retell AI)

### Default Values

If environment variables are not set, the system will use these default values:
- API Key: `key_47254fd3407901e9678eb9f05504`
- Agent ID: `agent_1bafe9ca9c302f33c15826c22b`
- From Number: `+12173933886`

**⚠️ Note**: It's recommended to use environment variables for production deployments.

## How It Works

1. **User Books a Vehicle**: User creates a booking through the booking form
2. **Admin Confirms Booking**: Admin clicks "Confirm" on a pending booking
3. **Automatic Call**: System automatically:
   - Formats the user's phone number to E.164 format
   - Makes an API call to Retell AI
   - Initiates an outbound call to the user
   - Passes booking metadata to the call (vehicle name, date, time, etc.)

## Phone Number Formatting

The system automatically formats phone numbers to E.164 format:
- Removes all non-digit characters
- Adds country code (+91 for India if missing)
- Adds + prefix

Examples:
- `8018084672` → `+918018084672`
- `08018084672` → `+918018084672`
- `+918018084672` → `+918018084672` (already formatted)

## Call Metadata

When a call is initiated, the following metadata is passed to Retell AI:
- `booking_id`: The booking ID
- `vehicle_name`: Name of the vehicle
- `vehicle_type`: Type of vehicle (bike, car, scooty)
- `start_date`: Booking start date
- `start_time`: Booking start time
- `duration`: Booking duration in hours
- `user_name`: User's full name

This metadata can be used by your Retell AI agent to personalize the call.

## Error Handling

The system is designed to be resilient:
- If the call fails, the booking confirmation still succeeds
- Errors are logged to the console for debugging
- The booking confirmation process is not blocked by call failures

## Testing

To test the outbound call feature:

1. Ensure your `.env` file has the correct Retell AI credentials
2. Create a test booking as a user
3. As an admin, confirm the booking
4. Check the server logs for call initiation messages
5. The user should receive a call on their registered phone number

## Troubleshooting

### Call Not Being Initiated

1. **Check Phone Number**: Ensure the user has a valid phone number in their profile
2. **Check API Key**: Verify your Retell AI API key is correct
3. **Check Agent ID**: Verify your Retell AI agent ID is correct
4. **Check Logs**: Look for error messages in the server console

### Common Errors

- **"Invalid phone number provided"**: The user's phone number is missing or invalid
- **"API Error"**: Check your Retell AI API key and account status
- **"Request Failed"**: Network issue or Retell AI service unavailable

## Dependencies

The Retell AI call service requires:
- `node-fetch`: For making HTTP requests to Retell AI API

Install it with:
```bash
npm install node-fetch
```

## Files Modified

- `config/retellCallService.js`: New service module for Retell AI calls
- `server-supabase.js`: Integrated call service into booking confirmation endpoint
- `package.json`: Added `node-fetch` dependency

## Support

For issues related to:
- **Retell AI API**: Contact Retell AI support
- **Integration**: Check server logs and ensure all environment variables are set correctly

