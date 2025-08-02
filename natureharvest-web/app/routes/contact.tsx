import { useState } from "react";
import { motion } from "framer-motion";
import { EnvelopeIcon, PhoneIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sun-yellow via-leaf-light to-sun-orange">
      {/* Navigation */}
      <nav className="bg-logo-black sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="text-2xl font-serif font-bold text-white">
                Nature Harvest
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-white hover:text-sun-yellow transition-colors">
                Home
              </a>
              <a href="/about" className="text-white hover:text-sun-yellow transition-colors">
                About
              </a>
              <a href="/products" className="text-white hover:text-sun-yellow transition-colors">
                Products
              </a>
              <a href="/contact" className="text-sun-yellow font-semibold">
                Contact
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <button className="bg-logo-red text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors">
                Find Store
              </button>
              <button className="bg-logo-red text-white p-2 rounded-full hover:bg-red-600 transition-colors">
                🔍
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
                         <h1 className="text-5xl lg:text-6xl font-serif font-bold text-logo-black mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-natural-600 max-w-3xl mx-auto leading-relaxed">
              We'd love to hear from you! Whether you have questions about our products, 
              want to partner with us, or just want to say hello, we're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gradient-to-br from-white to-sun-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-serif font-bold text-natural-900 mb-4">
                  Send us a Message
                </h2>
                <p className="text-natural-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-natural-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-natural-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-natural-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-natural-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-natural-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-natural-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="product">Product Information</option>
                    <option value="wholesale">Wholesale Partnership</option>
                    <option value="support">Customer Support</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-natural-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-natural-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                                 <button
                   type="submit"
                   className="w-full bg-leaf-dark text-white py-4 px-8 rounded-lg font-semibold hover:bg-leaf-light transition-colors shadow-lg hover:shadow-xl"
                 >
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-serif font-bold text-natural-900 mb-4">
                  Contact Information
                </h2>
                <p className="text-natural-600">
                  Reach out to us through any of these channels. We're here to help!
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: EnvelopeIcon,
                    title: "Email",
                    content: "hello@natureharvest.com",
                    description: "We typically respond within 24 hours"
                  },
                  {
                    icon: PhoneIcon,
                    title: "Phone",
                    content: "1-800-NATURE",
                    description: "Monday - Friday, 9AM - 6PM EST"
                  },
                  {
                    icon: MapPinIcon,
                    title: "Address",
                    content: "123 Juice Street, Fresh City, FC 12345",
                    description: "Visit our headquarters"
                  },
                  {
                    icon: ClockIcon,
                    title: "Business Hours",
                    content: "Monday - Friday: 9AM - 6PM EST",
                    description: "Saturday: 10AM - 4PM EST"
                  }
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-start space-x-4 p-6 bg-natural-50 rounded-xl hover:bg-natural-100 transition-colors"
                  >
                                       <div className="w-12 h-12 bg-leaf-light rounded-full flex items-center justify-center flex-shrink-0">
                     <contact.icon className="w-6 h-6 text-leaf-dark" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-natural-900 mb-1">{contact.title}</h3>
                      <p className="text-natural-700 font-medium">{contact.content}</p>
                      <p className="text-sm text-natural-500 mt-1">{contact.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-r from-sun-yellow via-leaf-light to-sun-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-natural-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-natural-600 max-w-2xl mx-auto">
              Find answers to common questions about our products and services
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "Are your juices 100% natural?",
                answer: "Yes! All Nature Harvest juices are made with 100% natural ingredients. We never use artificial flavors, colors, or preservatives."
              },
              {
                question: "Where can I buy Nature Harvest juices?",
                answer: "Our juices are available at major grocery stores nationwide, as well as through our online store and select health food stores."
              },
              {
                question: "Do you offer wholesale pricing?",
                answer: "Absolutely! We offer competitive wholesale pricing for retailers and restaurants. Contact our sales team for more information."
              },
              {
                question: "What's your return policy?",
                answer: "We stand behind the quality of our products. If you're not completely satisfied, we'll gladly replace or refund your purchase."
              },
              {
                question: "Are your packaging materials recyclable?",
                answer: "Yes, all our packaging is 100% recyclable and we're committed to using sustainable materials throughout our supply chain."
              },
              {
                question: "Do you ship internationally?",
                answer: "Currently, we ship within the United States and Canada. We're working on expanding to other international markets."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <h3 className="font-semibold text-natural-900 mb-3">{faq.question}</h3>
                <p className="text-natural-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gradient-to-br from-white to-sun-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-serif font-bold text-natural-900 mb-4">
              Visit Our Headquarters
            </h2>
            <p className="text-xl text-natural-600 max-w-2xl mx-auto">
              Come see where the magic happens! Our facility is open for tours by appointment.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-leaf-light rounded-2xl p-8 text-center"
          >
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-2xl font-semibold text-natural-900 mb-2">
              Nature Harvest Headquarters
            </h3>
            <p className="text-natural-600 mb-4">
              123 Juice Street<br />
              Fresh City, FC 12345<br />
              United States
            </p>
                         <button className="bg-leaf-dark text-white px-6 py-3 rounded-lg font-semibold hover:bg-leaf-light transition-colors">
              Schedule a Tour
            </button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-logo-red to-leaf-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-serif font-bold text-white">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Whether you're a customer, retailer, or potential partner, we're excited to work with you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                             <a href="/" className="bg-white text-logo-red px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-50 transition-colors shadow-lg">
                Shop Our Products
              </a>
                             <a href="/about" className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-logo-red transition-colors">
                Learn More About Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-natural-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
                             <h3 className="text-2xl font-serif font-bold text-logo-red mb-4">
                Nature Harvest
              </h3>
              <p className="text-natural-300">
                Bringing you the purest flavors nature has to offer.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-natural-300">
                <li><a href="/" className="hover:text-white transition-colors">Citrus Juices</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Apple Juices</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Berry Blends</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Tropical Mixes</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-natural-300">
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">Our Story</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">Sustainability</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-natural-300">
                <li>hello@natureharvest.com</li>
                <li>1-800-NATURE</li>
                <li>123 Juice Street</li>
                <li>Fresh City, FC 12345</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-natural-700 mt-8 pt-8 text-center text-natural-400">
            <p>&copy; 2024 Nature Harvest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 