# 🔧 Troubleshooting Retell AI Call Feature

## Quick Checks

### 1. Verify Server is Running
```bash
npm start
# or
npm run dev
```

### 2. Check Server Logs
When you confirm a booking, watch the server console for:
- `📋 Booking data structure:` - Shows the booking data
- `📞 Extracted phone number:` - Shows if phone number was found
- `📞 Initiating Retell AI call` - Shows call is being made
- `📞 Booking confirmation call initiated successfully` - Success message

### 3. Test the Retell AI Service Directly

You can test the call feature using the test endpoint:

**Using curl:**
```bash
curl -X POST http://localhost:3005/api/test/retell-call \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{"phoneNumber": "+918018084672"}'
```

**Using Postman or browser console:**
```javascript
fetch('http://localhost:3005/api/test/retell-call', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ADMIN_TOKEN'
  },
  body: JSON.stringify({
    phoneNumber: '+918018084672'
  })
})
.then(r => r.json())
.then(console.log);
```

## Common Issues

### Issue 1: "No phone number available"
**Symptoms:** Log shows `⚠️ No phone number available for booking confirmation call`

**Solutions:**
1. Check if user has a phone number in the database
2. Check the booking data structure in logs - Supabase might return data differently
3. Verify the Supabase query is fetching `phone_number` correctly

### Issue 2: "Invalid phone number provided"
**Symptoms:** Call fails with "Invalid phone number provided"

**Solutions:**
1. Ensure phone number is in the user's profile
2. Phone number should be in format: `8018084672` or `+918018084672`
3. Check the `formatPhoneNumber` function is working correctly

### Issue 3: "API Error" from Retell AI
**Symptoms:** Call fails with Retell AI API error

**Solutions:**
1. Verify your Retell AI API key is correct
2. Check your Retell AI account has credits/balance
3. Verify the agent ID is correct
4. Check if the "from_number" is verified in Retell AI dashboard

### Issue 4: Call not being made at all
**Symptoms:** No logs about call initiation

**Solutions:**
1. Check server logs for errors
2. Verify `makeBookingConfirmationCall` is imported correctly
3. Check if the booking confirmation endpoint is being called
4. Verify the phone number exists in the booking data

## Debug Steps

### Step 1: Check Booking Data Structure
When confirming a booking, check the server logs for:
```
📋 Booking data structure: {...}
📋 Users data: {...}
```

This will show you exactly how Supabase returns the data.

### Step 2: Verify Phone Number Format
Check the log:
```
📞 Extracted phone number: +918018084672
```

If it shows `null` or `undefined`, the phone number isn't being extracted correctly.

### Step 3: Test Direct API Call
Use the test endpoint to verify Retell AI is working:
```
POST /api/test/retell-call
```

### Step 4: Check Retell AI Dashboard
1. Log into your Retell AI dashboard
2. Check if calls are being created
3. Check for any error messages
4. Verify your account has sufficient credits

## Environment Variables

Make sure these are set in your `.env` file (optional, defaults are used if not set):
```env
RETELL_API_KEY=key_47254fd3407901e9678eb9f05504
RETELL_AGENT_ID=agent_1bafe9ca9c302f33c15826c22b
RETELL_FROM_NUMBER=+12173933886
```

## Expected Behavior

When an admin confirms a booking:
1. ✅ Booking status updates to "confirmed"
2. ✅ Email is sent (if email exists)
3. ✅ Call is initiated (if phone number exists)
4. ✅ Server logs show call initiation
5. ✅ User receives call on their phone

## Still Not Working?

1. **Check server console** - Look for error messages
2. **Check Retell AI dashboard** - See if calls are being created
3. **Test with the test endpoint** - Verify Retell AI API is working
4. **Check phone number format** - Must be valid E.164 format
5. **Verify user has phone number** - Check database directly

## Contact

If issues persist, check:
- Retell AI API documentation
- Server error logs
- Network connectivity
- Retell AI account status

