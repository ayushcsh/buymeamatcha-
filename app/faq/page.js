'use client'
import React, { useState, useRef, useEffect } from 'react'
import Footer from '@/components/footer'

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  const contentRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    document.title = 'FAQ - Buy Me A Matcha'
    if (isOpen) {
      setHeight(contentRef.current.scrollHeight)
    } else {
      setHeight(0)
    }
  }, [isOpen])

  return (
    <li className="mb-4 w-full bg-white p-4 rounded-lg shadow-md">
      <button
        onClick={onToggle}
        className="text-left w-full font-semibold text-[15px] flex justify-between items-center"
      >
        {question}
        <span className="  text-xl">{isOpen ? '−' : '+'}</span>
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: `${height}px`,
          transition: 'max-height 0.4s ease',
          overflow: 'hidden',
        }}
        className="transition-opacity duration-300 ease-in-out"
      >
        <p className={`mt-2 text-gray-700 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          {answer}
        </p>
      </div>
    </li>
  )
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'What is Buy Me a Matcha?',
      answer: 'Buy Me a Matcha is a platform that allows users to support their favorite creators by sending them donations.',
    },
    {
      question: 'How do I make a donation?',
      answer: "You can make a donation by visiting a creator's page and filling out the donation form.",
    },
    {
      question: 'Is my payment information secure?',
      answer: 'Yes, we use industry-standard encryption to protect your payment information.',
    },
    {
      question: 'Can I get a refund?',
      answer: 'Unfortunately, all donations are final and non-refundable.',
    },
    {
      question: 'How can I contact support?',
      answer: 'You can contact our support team at ayushkumar.nov.2005@gmail.com.',
    },
    {
      question: 'Can I create my own page?',
      answer: 'Yes, you can create your own page by signing up on our platform.',
    },
    {
    question: 'Is it free to use?',
    answer: 'Yes, our basic plan is completely free. We also offer premium features for advanced users.',
  },
  {
    question: 'How can I customize my page?',
    answer: 'Once you log in, go to your dashboard and click on “Customize Page” to change text, colors, and images.',
  },
  ]

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
    
    <div className="faq-container p-6 w-full max-h-screen flex flex-col items-center md:mt-[50px] mt-[10px] sm:mb-[20px]">

      <div className="faq-header font-circular text-2xl md:text-4xl font-bold mb-6 text-[#576d40] ">
        <h1>Frequently Asked Questions</h1>
      </div>

      <ul className="faq-content w- [80vw] md:w-[60vw] mx-auto gap-3 mt-[20px]">
        {faqs.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </ul>

    
    </div>
      <Footer />
    </>
  )
}

export default FAQ
