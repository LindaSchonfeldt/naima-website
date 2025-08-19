import contactMessage from "../models/contactMessage";

export const submitContactForm = async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'All fields are required '});
  }

  try { //save to database (*add future admin features)
    const newMessage = await contactMessage.create({ name, email, phone, message });

    res.status(201).json({ message: 'Your message has been sent successfully.'});
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ error: 'Failed to submit the contact form. Please try again later.'});
  }
}