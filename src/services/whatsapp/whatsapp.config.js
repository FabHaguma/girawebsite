import WhatsAppMessenger from './whatsapp.js'

// HagumaTech's WhatsApp number with country code, digits only.
const WHATSAPP_NUMBER = '250786072607'

WhatsAppMessenger.configure({
  number: WHATSAPP_NUMBER,
  templates: {
    intake({ plan, name, email, phone, trade }) {
      return `Hi HagumaTech, I'd like to get started on a website: ${plan}.\n\n`
        + `Name: ${name}\n`
        + (email?.trim() ? `Email: ${email.trim()}\n` : '')
        + (phone?.trim() ? `Phone: ${phone.trim()}\n` : '')
        + `Trade / business: ${trade}`
    }
  }
})

export default WhatsAppMessenger
