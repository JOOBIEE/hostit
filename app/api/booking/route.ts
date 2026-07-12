import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import { Resend } from 'resend'

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN!,
  useCdn: false,
})

const resend = new Resend(process.env.RESEND_API_KEY!)

function generateBookingId(): string {
  const num = Math.floor(1000 + Math.random() * 9000)
  return `EVT-${num}`
}

function buildEmailHtml(data: any, bookingId: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Georgia, serif; background: #f5f5f5; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 40px auto; background: #ffffff; }
        .header { background: #111111; padding: 32px 40px; text-align: center; }
        .header h1 { color: #C4923A; font-size: 24px; margin: 0; letter-spacing: 2px; font-weight: 400; }
        .header p { color: #888888; font-size: 12px; margin: 8px 0 0; letter-spacing: 1px; text-transform: uppercase; }
        .booking-id { background: #C4923A; color: #000000; text-align: center; padding: 16px; font-size: 18px; letter-spacing: 3px; font-family: monospace; }
        .body { padding: 40px; }
        .section-title { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #C4923A; margin: 32px 0 16px; border-bottom: 1px solid #f0f0f0; padding-bottom: 8px; }
        .field { margin-bottom: 12px; }
        .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888888; margin-bottom: 4px; }
        .field-value { font-size: 15px; color: #0D0D0D; }
        .note { background: #fff8f0; border-left: 3px solid #C4923A; padding: 16px; margin-top: 32px; font-size: 13px; color: #666; line-height: 1.6; }
        .footer { background: #111111; padding: 24px 40px; text-align: center; }
        .footer p { color: #555; font-size: 11px; letter-spacing: 1px; margin: 0; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1>HostIt Services</h1>
          <p>New Booking Enquiry</p>
        </div>

        <div class="booking-id">
          Booking ID: ${bookingId}
        </div>

        <div class="body">
          <div class="section-title">Client Details</div>
          <div class="field">
            <div class="field-label">Full Name</div>
            <div class="field-value">${data.fullName}</div>
          </div>
          <div class="field">
            <div class="field-label">Phone Number</div>
            <div class="field-value">${data.phone}</div>
          </div>
          ${data.email ? `
          <div class="field">
            <div class="field-label">Email Address</div>
            <div class="field-value">${data.email}</div>
          </div>` : ''}

          <div class="section-title">Event Details</div>
          <div class="field">
            <div class="field-label">Event Type</div>
            <div class="field-value">${data.eventType === 'Other' ? data.eventTypeOther : data.eventType}</div>
          </div>
          <div class="field">
            <div class="field-label">Event Date</div>
            <div class="field-value">${data.eventDate}</div>
          </div>
          <div class="field">
            <div class="field-label">Venue</div>
            <div class="field-value">${data.eventVenue}</div>
          </div>
          <div class="field">
            <div class="field-label">Hosts Required</div>
            <div class="field-value">${data.hostsRequired}</div>
          </div>

          <div class="section-title">Schedule & Outfit</div>
          <div class="field">
            <div class="field-label">Call-Up Time</div>
            <div class="field-value">${data.callUpTime}</div>
          </div>
          <div class="field">
            <div class="field-label">Expected Closing Time</div>
            <div class="field-value">${data.closingTime}</div>
          </div>
          <div class="field">
            <div class="field-label">Outfit Preference</div>
            <div class="field-value">${data.outfitPreference}</div>
          </div>
          ${data.outfitColour ? `
          <div class="field">
            <div class="field-label">Outfit Colour / Theme</div>
            <div class="field-value">${data.outfitColour}</div>
          </div>` : ''}

          ${data.additionalInfo ? `
          <div class="section-title">Additional Information</div>
          <div class="field">
            <div class="field-value">${data.additionalInfo}</div>
          </div>` : ''}

          <div class="note">
            Please respond to this client within 24 hours to confirm availability and provide a quotation. Reference Booking ID <strong>${bookingId}</strong> in all communications.
          </div>
        </div>

        <div class="footer">
          <p>© 2026 HostIt Services · hostit.services</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      fullName,
      phone,
      email,
      eventDate,
      eventType,
      eventTypeOther,
      eventVenue,
      hostsRequired,
      callUpTime,
      closingTime,
      outfitPreference,
      outfitColour,
      additionalInfo,
      honeypot,
    } = body

    // Honeypot check
    if (honeypot) {
      return NextResponse.json({ success: true, bookingId: 'EVT-0000' })
    }

    // Validation
    if (
      !fullName ||
      !phone ||
      !eventDate ||
      !eventType ||
      !eventVenue ||
      !hostsRequired ||
      !callUpTime ||
      !closingTime ||
      !outfitPreference
    ) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      )
    }

    const bookingId = generateBookingId()

    // Step 1 — Save to Sanity
    await writeClient.create({
      _type: 'booking',
      bookingId,
      fullName,
      phone,
      email: email || '',
      eventDate,
      eventType,
      eventTypeOther: eventTypeOther || '',
      eventVenue,
      hostsRequired,
      callUpTime,
      closingTime,
      outfitPreference,
      outfitColour: outfitColour || '',
      additionalInfo: additionalInfo || '',
      submittedAt: new Date().toISOString(),
      status: 'new',
    })

    // Step 2 — Send email via Resend
    await resend.emails.send({
      from: 'HostIt Bookings <onboarding@resend.dev>',
      to: process.env.HOSTIT_EMAIL!,
      subject: `New Booking Enquiry — ${bookingId} — ${fullName}`,
      html: buildEmailHtml(body, bookingId),
    })

    return NextResponse.json({ success: true, bookingId })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}