# 📱 Phone Number Format Guide

## ✅ **No Country Code Needed!**

The system **automatically adds the country code** for you. Users can enter phone numbers in any of these formats:

### Accepted Formats:

1. **10-digit number** (most common):
   - `8018084672` → Automatically becomes `+918018084672`
   - `9040757600` → Automatically becomes `+919040757600`

2. **With leading zero**:
   - `08018084672` → Automatically becomes `+918018084672`
   - The leading `0` is removed and `+91` is added

3. **Already with country code**:
   - `+918018084672` → Used as is
   - `918018084672` → Becomes `+918018084672`

4. **With spaces or dashes**:
   - `801 808 4672` → Automatically becomes `+918018084672`
   - `801-808-4672` → Automatically becomes `+918018084672`

## How It Works

The `formatPhoneNumber()` function automatically:
1. ✅ Removes all non-digit characters (spaces, dashes, etc.)
2. ✅ Removes leading `0` if present
3. ✅ Adds `+91` (India country code) if the number is 10 digits
4. ✅ Keeps existing country code if already present
5. ✅ Formats to E.164 international format (required by Retell AI)

## Examples

| User Input | Formatted Output |
|------------|------------------|
| `8018084672` | `+918018084672` |
| `08018084672` | `+918018084672` |
| `+918018084672` | `+918018084672` |
| `918018084672` | `+918018084672` |
| `801 808 4672` | `+918018084672` |
| `801-808-4672` | `+918018084672` |

## For Other Countries

Currently, the system defaults to **India (+91)** for 10-digit numbers. 

If you need to support other countries, you can:
1. Store phone numbers with country code in the database
2. Or modify the `formatPhoneNumber()` function to detect country codes

## What Users Need to Do

**Nothing!** Just enter their phone number normally:
- ✅ `8018084672` 
- ✅ `08018084672`
- ✅ `+918018084672`

The system handles everything automatically! 🎉

## Database Storage

Phone numbers can be stored in the database in any format:
- `8018084672` ✅
- `08018084672` ✅
- `+918018084672` ✅

The system will format them correctly when making calls.

