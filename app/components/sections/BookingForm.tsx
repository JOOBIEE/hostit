'use client'

import { useState } from 'react'

const WHATSAPP_NUMBER = '2347082972270'

type FormData = {
  fullName: string
  phone: string
  email: string
  eventDate: string
  eventType: string
  eventTypeOther: string
  eventVenue: string
  hostsRequired: string
  callUpTime: string
  closingTime: string
  outfitPreference: string
  outfitColour: string
  additionalInfo: string
  honeypot: string
}

const initialForm: FormData = {
  fullName: '',
  phone: '',
  email: '',
  eventDate: '',
  eventType: '',
  eventTypeOther: '',
  eventVenue: '',
  hostsRequired: '',
  callUpTime: '',
  closingTime: '',
  outfitPreference: '',
  outfitColour: '',
  additionalInfo: '',
  honeypot: '',
}

export default function BookingForm() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const buildWhatsAppMessage = () => {
    const lines = [
      `*New Booking Enquiry — HostIt Services*`,
      ``,
      `*Full Name:* ${form.fullName}`,
      `*Phone:* ${form.phone}`,
      form.email ? `*Email:* ${form.email}` : '',
      `*Event Date:* ${form.eventDate}`,
      `*Event Type:* ${form.eventType === 'Other' ? form.eventTypeOther : form.eventType}`,
      `*Venue:* ${form.eventVenue}`,
      `*Hosts Required:* ${form.hostsRequired}`,
      `*Call-Up Time:* ${form.callUpTime}`,
      `*Closing Time:* ${form.closingTime}`,
      `*Outfit Preference:* ${form.outfitPreference}`,
      form.outfitColour ? `*Outfit Colour/Theme:* ${form.outfitColour}` : '',
      form.additionalInfo ? `*Additional Info:* ${form.additionalInfo}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    return encodeURIComponent(lines)
  }

  const handleSubmit = async () => {
    setError('')

    if (
      !form.fullName ||
      !form.phone ||
      !form.eventDate ||
      !form.eventType ||
      !form.eventVenue ||
      !form.hostsRequired ||
      !form.callUpTime ||
      !form.closingTime ||
      !form.outfitPreference
    ) {
      setError('Please fill in all required fields.')
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setSubmitting(false)
        return
      }

      setSubmitted(true)

      const message = buildWhatsAppMessage()
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
      window.open(waUrl, '_blank')
    } catch {
      setError('Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section className="booking-success">
        <div className="booking-success__inner">
          <div className="booking-success__icon">✓</div>
          <h2 className="booking-success__title">Enquiry Received</h2>
          <p className="booking-success__text">
            Thank you, {form.fullName.split(' ')[0]}. Your enquiry has been submitted successfully.
          </p>
          <p className="booking-success__text">
            A WhatsApp message has been prepared with your details. If it did not open automatically, please contact us directly at{' '}
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
              +234 708 297 2270
            </a>.
          </p>
          <p className="booking-success__note">
            Please note that this enquiry does not confirm your booking. A member of the HostIt team will contact you with availability and a quotation.
          </p>
          <a href="/" className="btn btn--gold" style={{ marginTop: '2rem', display: 'inline-block' }}>
            Back to Website
          </a>
        </div>
      </section>
    )
  }

  return (
    <section className="booking">
      <div className="booking__inner">
        <div className="booking__header">
          <div className="booking__gold-line" />
          <h1 className="booking__title">HostIt Booking Enquiry</h1>
          <p className="booking__intro">
            Welcome to HostIt Services. Thank you for considering us to be a part of your event. We provide professional, well-trained hosts and hostesses dedicated to creating a warm, seamless guest experience for every occasion.
          </p>
          <p className="booking__intro">
            Kindly complete this short form so we can confirm our availability and prepare an accurate quotation for your event.
          </p>
        </div>

        <div className="booking__form">

          {/* Honeypot — hidden from humans */}
          <input
            type="text"
            name="honeypot"
            value={form.honeypot}
            onChange={handle}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="booking__field">
            <label className="booking__label">Full Name <span>*</span></label>
            <input
              className="booking__input"
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handle}
              placeholder="Your full name"
            />
          </div>

          <div className="booking__field">
            <label className="booking__label">Phone Number <span>*</span> <em>(WhatsApp preferred)</em></label>
            <input
              className="booking__input"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handle}
              placeholder="+234 000 000 0000"
            />
          </div>

          <div className="booking__field">
            <label className="booking__label">Email Address <em>(Optional)</em></label>
            <input
              className="booking__input"
              type="email"
              name="email"
              value={form.email}
              onChange={handle}
              placeholder="your@email.com"
            />
          </div>

          <div className="booking__field">
            <label className="booking__label">Event Date <span>*</span></label>
            <input
              className="booking__input"
              type="date"
              name="eventDate"
              value={form.eventDate}
              onChange={handle}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="booking__field">
            <label className="booking__label">Event Type <span>*</span></label>
            <select
              className="booking__input booking__select"
              name="eventType"
              value={form.eventType}
              onChange={handle}
            >
              <option value="">Select event type</option>
              <option value="Wedding">Wedding</option>
              <option value="Engagement">Engagement</option>
              <option value="Birthday Celebration">Birthday Celebration</option>
              <option value="Corporate Event">Corporate Event</option>
              <option value="Conference">Conference</option>
              <option value="Church Event">Church Event</option>
              <option value="Private Party">Private Party</option>
              <option value="Other">Other (Please specify)</option>
            </select>
          </div>

          {form.eventType === 'Other' && (
            <div className="booking__field">
              <label className="booking__label">Please specify event type <span>*</span></label>
              <input
                className="booking__input"
                type="text"
                name="eventTypeOther"
                value={form.eventTypeOther}
                onChange={handle}
                placeholder="Describe your event"
              />
            </div>
          )}

          <div className="booking__field">
            <label className="booking__label">Event Venue <span>*</span></label>
            <input
              className="booking__input"
              type="text"
              name="eventVenue"
              value={form.eventVenue}
              onChange={handle}
              placeholder="Venue name and location"
            />
          </div>

          <div className="booking__field">
            <label className="booking__label">Number of Hosts/Hostesses Required <span>*</span></label>
            <select
              className="booking__input booking__select"
              name="hostsRequired"
              value={form.hostsRequired}
              onChange={handle}
            >
              <option value="">Select number</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="6">6</option>
              <option value="8">8</option>
              <option value="10+">10+</option>
              <option value="Not sure">Not sure (I'd like a recommendation)</option>
            </select>
          </div>

          <div className="booking__row">
            <div className="booking__field">
              <label className="booking__label">Call-Up Time <span>*</span></label>
              <input
                className="booking__input"
                type="time"
                name="callUpTime"
                value={form.callUpTime}
                onChange={handle}
              />
            </div>
            <div className="booking__field">
              <label className="booking__label">Expected Closing Time <span>*</span></label>
              <input
                className="booking__input"
                type="time"
                name="closingTime"
                value={form.closingTime}
                onChange={handle}
              />
            </div>
          </div>

          <p className="booking__note">
            Please note: Events ending after 9:00 PM attract an additional charge.
          </p>

          <div className="booking__field">
            <label className="booking__label">Preferred Outfit <span>*</span></label>
            <select
              className="booking__input booking__select"
              name="outfitPreference"
              value={form.outfitPreference}
              onChange={handle}
            >
              <option value="">Select outfit preference</option>
              <option value="HostIt Outfit (available for hire)">HostIt Outfit (available for hire)</option>
              <option value="Client-provided outfit">Client-provided outfit</option>
              <option value="I'd like to discuss outfit options">I'd like to discuss outfit options</option>
            </select>
          </div>

          <div className="booking__field">
            <label className="booking__label">Preferred Colour or Theme <em>(Optional)</em></label>
            <input
              className="booking__input"
              type="text"
              name="outfitColour"
              value={form.outfitColour}
              onChange={handle}
              placeholder="e.g. Royal blue, Black and gold"
            />
          </div>

          <div className="booking__field">
            <label className="booking__label">Anything else we should know? <em>(Optional)</em></label>
            <textarea
              className="booking__input booking__textarea"
              name="additionalInfo"
              value={form.additionalInfo}
              onChange={handle}
              placeholder="e.g. event theme, special duties, VIP protocol, guest count, or any additional information."
              rows={4}
            />
          </div>

          {error && (
            <p className="booking__error">{error}</p>
          )}

          <div className="booking__disclaimer">
            <p>
              Please note that completing this enquiry form does <strong>not</strong> automatically confirm your booking. Reservations are secured only after availability has been confirmed and the required booking fee has been received.
            </p>
            <p>
              Once we receive your enquiry, a member of the HostIt team will contact you with your quotation and the next steps.
            </p>
            <p>We look forward to serving you.</p>
          </div>

          <button
            className="booking__submit"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Enquiry'}
          </button>
        </div>
      </div>
    </section>
  )
}