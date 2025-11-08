# 🧪 How to Test Retell AI Call Feature

## Quick Test Steps

### Step 1: Make Sure Server is Running
```bash
npm start
```

You should see:
```
Server running on port 3005
```

### Step 2: Test the Call Feature

#### Option A: Test via Booking Confirmation (Real Scenario)
1. **Create a booking as a user:**
   - Log in as a regular user
   - Book a bike/car/scooty
   - Note the booking ID

2. **Confirm booking as admin:**
   - Log in as admin
   - Go to bookings page
   - Click "Confirm" on the pending booking
   - **Watch the server console** for these logs:
     - `📋 Booking data structure:`
     - `📞 Extracted phone number:`
     - `📞 Initiating Retell AI call`
     - `📞 Booking confirmation call initiated successfully`

3. **Check if call was made:**
   - User should receive a call on their phone
   - Check Retell AI dashboard for call logs

#### Option B: Test Directly (Quick Test)
Use the test endpoint to make a call directly:

**In Browser Console (on admin page):**
```javascript
// Get your admin token from localStorage
const adminToken = localStorage.getItem('adminToken');

// Make test call
fetch('http://localhost:3005/api/test/retell-call', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${adminToken}`
  },
  body: JSON.stringify({
    phoneNumber: '8018084672'  // Your test phone number
  })
})
.then(r => r.json())
.then(data => {
  console.log('Call Result:', data);
  if (data.success) {
    alert('✅ Call initiated! Call ID: ' + data.callId);
  } else {
    alert('❌ Call failed: ' + data.error);
  }
});
```

**Or using curl:**
```bash
curl -X POST http://localhost:3005/api/test/retell-call \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d "{\"phoneNumber\": \"8018084672\"}"
```

## What to Check

### ✅ Success Indicators:
1. **Server Console Shows:**
   ```
   📞 Retell AI outbound call launched successfully!
   Call ID: [some-id]
   ```

2. **API Response:**
   ```json
   {
     "success": true,
     "message": "Test call initiated successfully",
     "callId": "[call-id]"
   }
   ```

3. **Phone Receives Call:**
   - Your phone should ring
   - Caller ID shows the "from_number" (+12173933886)

### ❌ Error Indicators:

**If you see these errors:**

1. **"Invalid phone number provided"**
   - Check phone number format
   - Should be: `8018084672` or `+918018084672`

2. **"API Error" from Retell AI**
   - Check Retell AI API key
   - Check Retell AI account balance
   - Verify agent ID is correct

3. **"No phone number available"**
   - User doesn't have phone number in database
   - Check booking data structure

4. **"Unauthorized" or 401 error**
   - Admin token is missing or invalid
   - Make sure you're logged in as admin

## Debug Checklist

- [ ] Server is running on port 3005
- [ ] Admin is logged in (has adminToken)
- [ ] User has phone number in database
- [ ] Retell AI API key is correct
- [ ] Retell AI account has credits
- [ ] Phone number is in correct format
- [ ] Check server console for detailed logs

## Common Issues & Fixes

### Issue: "Cannot read property 'phone_number' of undefined"
**Fix:** Check if booking.users exists. The Supabase query might need adjustment.

### Issue: Call not being made
**Fix:** 
1. Check server logs for errors
2. Verify phone number exists in user profile
3. Test with the test endpoint first

### Issue: "EADDRINUSE" error
**Fix:** Port 3005 is already in use. Stop the existing process:
```bash
# Find process
netstat -ano | findstr :3005

# Kill process (replace PID with actual process ID)
taskkill /PID [PID] /F
```

## Need Help?

1. Check `TROUBLESHOOTING_RETELL.md` for detailed troubleshooting
2. Check server console logs for specific error messages
3. Verify Retell AI dashboard for call status

