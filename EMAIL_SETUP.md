# Email Setup for UnitedHope

## Environment Variables

Create a `.env.local` file in the root of the `unitedhope` folder with the following:

```env
# Email Configuration
SMTP_EMAIL=unitedhope@gmail.com
SMTP_PASSWORD=whqq iuyk asle wuph
ADMIN_EMAIL=unitedhope@gmail.com

# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string_here
```

## Email Templates

The email system is configured to send emails for:

1. **Donation Confirmations** - Sent to donors after they make a donation
2. **Newsletter Subscriptions** - Sent when users subscribe to the newsletter
3. **Contact Form Submissions** - Sent to both the user (confirmation) and admin (notification)

All emails use the UnitedHope branding with USA colors (red/white theme).

## Gmail Setup

If using Gmail, you'll need to:
1. Enable 2-Step Verification on your Google account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use that password in `SMTP_PASSWORD`

## Testing

After setting up the environment variables, restart your development server for the changes to take effect.

